import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

import SimpleHeader from "../utils/SimpleHeader";
import { Box, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DigitalSignature = () => {
  const navigate = useNavigate();
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };
  const user = getUserFromLocalStorage();
  const userId = user?.user_id;

  const sigPad = useRef(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [signatureData, setSignatureData] = useState(null);

  // Load signature from localStorage on mount
  useEffect(() => {
    const storedSignature = localStorage.getItem("savedSignature");
    if (storedSignature) {
      setSignatureData(storedSignature);
    }

    // const storedUploadedSignature = localStorage.getItem("uploadedSignature");
    // if (storedUploadedSignature) {
    //   setUploadedSignature(storedUploadedSignature);
    // }
  }, []);
  // const base64ToFile = (base64String, fileName) => {
  //   const arr = base64String.split(",");
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], fileName, { type: mime });
  // };

  // const file2 = base64ToFile(uploadedSignature, "uploadImg.png");
  // console.log("uploaded file:-", file2.name);

  // Capture Digital Signature and Save to localStorage
  const handleSaveSignature = async () => {
    if (sigPad.current) {
      const signature = sigPad.current.toDataURL();
      setSignatureData(signature);
      localStorage.setItem("savedSignature", signature);
      navigate(-1);
    }
    setSignatureData(null);
  };

  // Clear Signature Pad
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
    setSignatureData(null);
    // setUploadedSignature(null);
    localStorage.removeItem("savedSignature");
    // localStorage.removeItem("uploadedSignature");
  };

  // API Call to Save Signature
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setSignatureData(base64Image);
        localStorage.setItem("savedSignature", base64Image);
      };
      reader.readAsDataURL(file);
    }
    setTimeout(() => {
      navigate(-1);
    }, 2000);
    setSignatureData(null);
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
        <div>
          <div className="relative rounded-lg p-4">
            {/* Corner Borders */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-400"></div>
            <SignatureCanvas
              ref={sigPad}
              penColor="black"
              canvasProps={{ className: "w-full h-40 sm:h-56 md:h-64 lg:h-72" }}
            />
          </div>

          <div className="flex items-center justify-between mt-10">
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="signatureInput"
              className="hidden"
              onChange={handleFileUpload}
            />

            <Button
              variant="outlined"
              onClick={() => document.getElementById("signatureInput").click()}
            >
              Browse Signature
            </Button>

            <Button variant="contained" onClick={handleClearSignature}>
              Try Again
            </Button>

            <Button variant="contained" onClick={handleSaveSignature}>
              Save
            </Button>
          </div>

          {/* Signature Preview */}
          {/* Signature Preview */}
          <div className="my-6">
            <h2 className="text-lg font-bold mt-6">Signature Preview</h2>
            <div
              className="border p-4 w-96 mt-4 rounded-lg shadow-md"
              style={{ background: "#f3f4f6" }}
            >
              {!signatureData && <p>No Signature Added</p>}
              {signatureData && (
                <img
                  src={signatureData}
                  alt="Digital Signature"
                  className="w-full h-20 object-contain bg-white"
                />
              )}
            </div>
          </div>

          {/* Upload to API Button */}
          {/* <div>
            <Button
              variant="contained"
              fullWidth
              // onClick={handleUploadSignature}
            >
              Upload Signature
            </Button>
          </div> */}
        </div>
      </Box>
    </div>
  );
};

export default DigitalSignature;
