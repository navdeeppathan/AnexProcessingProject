import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DashboardHeader from "../utils/DashboardHeader";
import SimpleHeader from "../utils/SimpleHeader";

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
    <div>
      <div>
        <SimpleHeader />
      </div>
      <div className="p-8">
        <div ref={formRef} className=" p-6 shadow-lg bg-white">
          <h2 className="text-xl font-bold text-center mb-4">ANNEX VII</h2>
          <p className="text-center text-sm mb-2">
            Information accompanying shipments of waste
          </p>

          {/* Consignment Information */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">1. Consignor</h3>
            <p>Name: WasteTech LTD</p>
            <p>Address: 123 Kensington Road, London, UK</p>
            <p>Email: info@wastetech.co.uk</p>
          </div>

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
    </div>
  );
};

export default PDFMaker;
