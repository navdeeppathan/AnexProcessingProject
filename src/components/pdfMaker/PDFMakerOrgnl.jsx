import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card, Box, Button } from "@mui/material";
import SimpleHeader from "../utils/SimpleHeader";
import { useNavigate } from "react-router-dom";

const PDFMakerOrgnl = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleDigitalSignature = () => {
    navigate("/digital-signature");
  };

  // console.log(formRef.current);

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
        <div className="bg-white p-6 shadow-lg">
          <div ref={formRef}>
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
                    <strong>Address:</strong> 50 Cambridge Road - London IG11
                    8FG UK
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
                    <h3 className="font-semibold">
                      4. Actual Date of Shipment
                    </h3>
                    <p>12/06/2024</p>
                  </Box>
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      4. Actual Date of Shipment
                    </h3>
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

              {/* bullet points */}
              <div className="mt-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Information accompanying shipments of green-listed waste and
                    destined for recovery or waste destined for laboratory
                    analysis pursuant to Regulation (EC) No 1013/2006.
                  </li>
                  <li>
                    If more than three carriers, attach information as required
                    in blocks 5 (a), (b), (c).
                  </li>
                  <li>
                    When the person who arranges the shipment is not the
                    producer or collector, information about the producer or
                    collector shall be provided.
                  </li>
                  <li>
                    The relevant code(s) as indicated in Annex IIIA to
                    Regulation (EC) No 1013/2006 are to be used, as appropriate
                    in sequence. Certain Basel entries such as B1100, B3010, and
                    B3020 are restricted to particular waste streams only, as
                    indicated in Annex IIIA.
                  </li>
                  <li>
                    The BEU codes listed in Annex IIIB to Regulation (EC) No
                    1013/2006 are to be used.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Signature Section */}
          {/* Buttons */}
          <div className="px-24 flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                onClick={handleDigitalSignature}
                sx={{ borderColor: "#A8A8A8", color: "black" }}
              >
                Browse Signature
              </Button>
              <Button
                variant="contained"
                onClick={handleDigitalSignature}
                sx={{ bgcolor: "#5C75C5" }}
              >
                Digital signature
              </Button>
            </div>
            <div className=" mt-4">
              <p className="font-semibold">Signature: ____________________</p>
              <p>Date: 12/06/2024</p>
            </div>
            <div>
              <Button
                onClick={handleDownloadPDF}
                variant="contained"
                // disabled
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PDFMakerOrgnl;
