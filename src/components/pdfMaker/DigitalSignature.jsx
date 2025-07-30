import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import SimpleHeader from "../utils/SimpleHeader";
import { Box, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DigitalSignature = () => {
  const navigate = useNavigate();
  const sigPad = useRef(null);

  const [signatureData, setSignatureData] = useState(null);
  const [nameForSignature, setNameForSignature] = useState("");
  const [uploadedStamp, setUploadedStamp] = useState(null);

  useEffect(() => {
    const storedSignature = localStorage.getItem("savedSignature");
    if (storedSignature) {
      setSignatureData(storedSignature);
    }
  }, []);

  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
    setSignatureData(null);
    localStorage.removeItem("savedSignature");
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.size > 500 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please upload an image smaller than 500KB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      setSignatureData(base64Image);
      localStorage.setItem("savedSignature", base64Image);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleStampUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.size > 500 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please upload an image smaller than 500KB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedStamp(e.target.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleNameToSignature = () => {
    if (!nameForSignature.trim()) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 100;

    ctx.font = "40px 'Great Vibes', cursive";
    ctx.fillStyle = "black";
    ctx.fillText(nameForSignature, 10, 60);

    const dataUrl = canvas.toDataURL();
    sigPad.current?.clear();
    sigPad.current?.fromDataURL(dataUrl);

    setSignatureData(dataUrl);
    localStorage.setItem("savedSignature", dataUrl);
  };

  const handleSaveSignature = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
  
    let stampImage = null;
    let signatureImage = null;
  
    // Load stamp first (draw it first, behind)
    if (uploadedStamp) {
      stampImage = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = uploadedStamp;
      });
      ctx.drawImage(stampImage, 0, 0, 500, 200); // Draw stamp first (fills canvas)
    }
  
    // Load signature and draw on top of stamp
    if (sigPad.current && !sigPad.current.isEmpty()) {
      const signatureURL = sigPad.current.toDataURL();
  
      signatureImage = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = signatureURL;
      });
  
      // Draw signature over the stamp
      ctx.drawImage(signatureImage, 0, 0, 500, 200);
    }
  
    const finalImage = canvas.toDataURL("image/png");
    setSignatureData(finalImage);
    localStorage.setItem("savedSignature", finalImage);
    navigate(-1); // Go back
  };
  
  return (
    <div className="bg-gray-100">
      <SimpleHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFFFFF",
          m: 2,
          p: 4,
        }}
      >
        {/* Input name to convert into signature */}
        <div className="my-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={nameForSignature}
            onChange={(e) => setNameForSignature(e.target.value)}
            className="border p-2 rounded mr-4"
          />
          <Button variant="outlined" onClick={handleNameToSignature}>
            Convert to Signature
          </Button>
        </div>

        {/* Drawing pad */}
        <div className="relative rounded-lg p-4 border border-gray-300">
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{ className: "w-full h-40 sm:h-56 md:h-64 lg:h-72" }}
          />
        </div>

        {/* Upload buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-6">
          {/* Signature Upload */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="signatureInput"
            className="hidden"
            onChange={handleSignatureUpload}
          />
          <Button
            variant="outlined"
            onClick={() => document.getElementById("signatureInput").click()}
          >
            Upload Signature
          </Button>

          {/* Stamp Upload */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="stampInput"
            className="hidden"
            onChange={handleStampUpload}
          />
          <Button
            variant="outlined"
            onClick={() => document.getElementById("stampInput").click()}
          >
            Upload Stamp
          </Button>

          {/* Clear / Save */}
          <Button variant="contained" onClick={handleClearSignature}>
            Try Again
          </Button>
          <Button variant="contained" onClick={handleSaveSignature}>
            Save
          </Button>
        </div>

        {/* Preview */}
        <div className="my-6">
          <h2 className="text-lg font-bold mt-6">Final Preview</h2>
          <div className="border p-4 w-96 mt-4 rounded-lg shadow-md bg-gray-100">
            {!signatureData && <p>No Signature Added</p>}
            {signatureData && (
              <img
                src={signatureData}
                alt="Merged Signature"
                className="w-full h-24 object-contain bg-white"
              />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DigitalSignature;
