import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SimpleHeader from "../utils/SimpleHeader";
import { Button } from "@mui/material";

const DigitalSignature = () => {
  const sigPad = useRef(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [signatureData, setSignatureData] = useState(null);

  // Handle File Upload (Browser Button)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedSignature(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Capture Digital Signature
  const handleSaveSignature = () => {
    if (sigPad.current) {
      setSignatureData(sigPad.current.toDataURL());
    }
  };

  // Clear Signature Pad
  const handleClearSignature = () => {
    sigPad.current.clear();
    setSignatureData(null);
  };

  // Generate PDF with Fix
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const content = document.getElementById("pdf-content");

    if (content) {
      // ✅ Force `html2canvas` to ignore unsupported color formats
      content.style.background = "white";

      const canvas = await html2canvas(content, {
        backgroundColor: "#ffffff", // ✅ Force sRGB white background
        useCORS: true, // ✅ Prevent CORS issues for images
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
      pdf.save("Digital_Signature.pdf");
    }
  };

  return (
    <div>
      <div>
        <SimpleHeader />
      </div>

      {/* Digital Signature Section */}
      <div className="flex flex-col items-center justify-center mt-20">
        <div>
          <div className="relative rounded-lg p-4">
            {/* Corner Borders */}

            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-400"></div>

            {/* Hidden File Input */}
            <SignatureCanvas
              ref={sigPad}
              penColor="black"
              canvasProps={{ className: "w-full h-full" }}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            {/* Browse Signature button */}
            <div>
              <input
                type="file"
                accept="image/*"
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

              {uploadedSignature && (
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
                className=" "
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="my-6">
            <h2 className="text-lg font-bold mt-6 ">Signature Preview</h2>
            <div
              id="pdf-content"
              className="border p-4 w-96 mt-4 rounded-lg shadow-md"
              style={{ background: "#f3f4f6" }}
            >
              {signatureData && (
                <img
                  src={signatureData}
                  alt="Digital Signature"
                  className="w-full h-20 object-contain bg-white"
                />
              )}
              {uploadedSignature && (
                <img
                  src={uploadedSignature}
                  alt="Uploaded Signature"
                  className="border w-full h-20 object-contain bg-white"
                />
              )}
            </div>
          </div>
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
