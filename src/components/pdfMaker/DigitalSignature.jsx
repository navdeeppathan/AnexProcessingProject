import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

import SimpleHeader from "../utils/SimpleHeader";
import { Box, Button } from "@mui/material";
import Swal from "sweetalert2";

const DigitalSignature = () => {
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
    const savedSignature = localStorage.getItem("savedSignature");
    if (savedSignature) {
      setSignatureData(savedSignature);
    }
  }, []);

  // Handle File Upload (Browser Button)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedSignature(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Capture Digital Signature and Save to localStorage
  const handleSaveSignature = async () => {
    if (sigPad.current) {
      const signature = sigPad.current.toDataURL();
      setSignatureData(signature);
      localStorage.setItem("savedSignature", signature);
    }
  };

  // Clear Signature Pad
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
    setSignatureData(null);
    localStorage.removeItem("savedSignature");
  };

  // API Call to Save Signature
  const handleUploadSignature = async () => {
    if (!userId) {
      Swal.fire("Error", "User ID not found", "error");
      return;
    }

    const signatures = signatureData || uploadedSignature;
    if (!signatures) {
      Swal.fire("Error", "No signature to upload", "error");
      return;
    }

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/signatures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, signatures }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Signature uploaded successfully", "success");
      } else {
        Swal.fire(
          "Error",
          result.message || "Failed to upload signature",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Network error", "error");
    }
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
          <div className="my-6">
            <h2 className="text-lg font-bold mt-6">Signature Preview</h2>
            <div
              id="pdf-content"
              className="border p-4 w-96 mt-4 rounded-lg shadow-md"
              style={{ background: "#f3f4f6" }}
            >
              {!signatureData && !uploadedSignature && (
                <p>No Signature Added</p>
              )}
              {signatureData && (
                <img
                  src={signatureData}
                  alt="Digital Signature"
                  className="w-full h-20 object-contain bg-white"
                />
              )}
              {!signatureData && uploadedSignature && (
                <img
                  src={uploadedSignature}
                  alt="Uploaded Signature"
                  className="border w-full h-20 object-contain bg-white"
                />
              )}
            </div>
          </div>

          {/* Upload to API Button */}
          <div>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUploadSignature}
            >
              Upload Signature
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DigitalSignature;
