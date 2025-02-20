import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import SimpleHeader from "../utils/SimpleHeader";
import { Box, Card } from "@mui/material";

const PDFMaker = () => {
  const formRef = useRef();

  // Print the form
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  // Generate PDF
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(formRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("waste_shipment_form.pdf");
  };

  return (
    <Card>
      <div>
        <SimpleHeader />
      </div>
      <div className="p-8">
        <div ref={formRef} className=" p-6 shadow-lg bg-white">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-center mb-4">ANNEX VII</h2>
            <p className="text-center text-sm mb-2">
              INFORMATION ACCOMPANYING SHIPMENTS OF WASTES REFERRED TO IN
              ARTICLE 3(2) AND (4)(revised version as per Official Journal of
              the European Union 22.12.2020 L431/13) REGULATION (EU) 2020/2174
            </p>
            <h5>CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105</h5>
          </div>
          <div>
            <h3>Consignment Information</h3>
          </div>
          {/* Consignment Information */}
          {/* <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">1. Consignment Information</h3>
            <p>Name: WasteTech LTD</p>
            <p>Address: 123 Kensington Road, London, UK</p>
            <p>Email: info@wastetech.co.uk</p>
          </div> */}
          <Box className="border-b pb-4 mb-4">
            <h3 className="font-semibold">1. Consignment Information</h3>
            <p>Name: WasteTech LTD</p>
            <p>Address: 123 Kensington Road, London, UK</p>
            <p>Email: info@wastetech.co.uk</p>
          </Box>

          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">2. Consignee</h3>
            <p>Name: Waste Italia SPA</p>
            <p>Address: 456 Green Avenue, Milan, Italy</p>
            <p>Email: contact@wasteitalia.it</p>
          </div>

          {/* Additional Sections */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">3. Quantity & Shipment Date</h3>
            <p>Actual Quantity: 49 Drums - 24.306 Tonnes</p>
            <p>Date of Shipment: 12/08/2024</p>
          </div>

          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">4. Waste Identification</h3>
            <p>Waste Type: Zinc Scrap</p>
            <p>Waste Code: EWC 12 01 04</p>
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
      </div>
    </Card>
  );
};

export default PDFMaker;
