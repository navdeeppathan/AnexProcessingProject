import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SimpleHeader from "../utils/SimpleHeader";
import { Button } from "@mui/material";

const DigitalSignature = () => {
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
  const handleSaveSignature = () => {
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

  // Generate PDF with Signature
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const content = document.getElementById("pdf-content");

    if (content) {
      content.style.background = "white";

      const canvas = await html2canvas(content, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 3,
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
      pdf.save("Digital_Signature.pdf");
    }
  };

  return (
    <div>
      <SimpleHeader />

      {/* Digital Signature Section */}
      <div className="flex flex-col items-center justify-center mt-20">
        <div>
          <div className="relative rounded-lg p-4">
            {/* Corner Borders */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-400"></div>

            {/* Signature Pad */}
            <SignatureCanvas
              ref={sigPad}
              penColor="black"
              canvasProps={{
                className: "w-full h-40 sm:h-56 md:h-64 lg:h-72 ",
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-10">
            {/* Upload Signature Button */}
            <div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="signatureInput"
                className="hidden"
                onChange={handleFileUpload}
              />

              <Button
                variant="outlined"
                onClick={() =>
                  document.getElementById("signatureInput").click()
                }
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              >
                Browse Signature
              </Button>

              {/* Display Uploaded Signature */}
              {uploadedSignature && !signatureData && (
                <img
                  src={uploadedSignature}
                  alt="Uploaded Signature"
                  className="border w-full h-20 object-contain bg-white"
                />
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="contained" onClick={handleSaveSignature}>
                Save
              </Button>
              <Button
                variant="contained"
                onClick={handleClearSignature}
                // className="bg-red-500 hover:bg-red-600 text-white"
              >
                Clear
              </Button>
            </div>
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

          {/* Download PDF Button */}
          <div>
            <Button variant="contained" fullWidth onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignature;
