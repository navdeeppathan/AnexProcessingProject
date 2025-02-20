import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card, Box } from "@mui/material";
import SimpleHeader from "../utils/SimpleHeader";

const PDFMakerOrgnl = () => {
  const formRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(formRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("waste_shipment_form.pdf");
  };

  return (
    <div>
      <div>
        <SimpleHeader />
      </div>
      <Card className="p-8">
        <div ref={formRef} className="bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-xl font-bold text-center ">ANNEX VII</h2>

            <div className=" p-2 items-center flex flex-col ">
              <p className="text-sm ">
                INFORMATION ACCOMPANYING SHIPMENTS OF WASTES REFERRED TO IN
                ARTICLE 3(2) AND (4)
              </p>
              <p className="text-sm">
                (revised version as per Official Journal of the European Union
                22.12.2020 L431/13) REGULATION (EU) 2020/2174
              </p>
            </div>
            <h5 className="text-sm md:text-base text-center font-semibold">
              CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105
            </h5>
          </div>

          {/* Grid Layout for Responsive Sections */}
          <div className="py-10 px-24 ">
            <div className="py-1">
              <h4 className="text-base md:text-xl   font-semibold">
                Consignment Information
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <Box className="border  p-4 ">
                <h3 className="font-semibold">1. Consignment Information</h3>
                <p>
                  <strong>Name:</strong> METAZN LTD
                </p>
                <p>
                  <strong>Address:</strong> 50 Cambridge Road - London IG11 8FG
                  UK
                </p>
                <p>
                  <strong>Contact Person:</strong> Roger Matheus
                </p>
              </Box>
              <Box className="border  p-4">
                <h3 className="font-semibold">2. Consignee</h3>
                <p>
                  <strong>Name:</strong> METALSIDER 2 SPA
                </p>
                <p>
                  <strong>Address:</strong> Via Villavara 15B - Modena 41122
                  ITALY
                </p>
                <p>
                  <strong>Contact Person:</strong> Bianca Baruffaldi
                </p>
              </Box>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2  ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
              <div className="grid grid-cols-1 ">
                <Box className="border  p-4">
                  <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                  <p>12/06/2024</p>
                </Box>
                <Box className="border  p-4">
                  <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                  <p>12/06/2024</p>
                </Box>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>

              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
            </div>

            <div className="grid grid-cols-1 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>

              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
              <Box className="border  p-4">
                <h3 className="font-semibold">4. Actual Date of Shipment</h3>
                <p>12/06/2024</p>
              </Box>
            </div>

            <div className="grid grid-cols-1 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
            </div>
            <div className="grid grid-cols-1 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
            </div>
            <div className="grid grid-cols-1 ">
              <Box className="border  p-4">
                <h3 className="font-semibold">3. Actual Quantity</h3>
                <p>49 Drums - 24.306 Tonnes</p>
              </Box>
            </div>
          </div>

          {/* Signature Section */}
          <div className="text-center mt-4">
            <p className="font-semibold">Signature: ____________________</p>
            <p>Date: 12/06/2024</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PDFMakerOrgnl;
