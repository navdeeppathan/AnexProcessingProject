import React, { useEffect, useRef, useState } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card, Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const PdfDownload = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();

  console.log("formdata", formData?.company_name);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://annex.sofinish.co.uk/api/forms/18",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("data:-", data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  // console.log(formRef.current);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(formRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("waste_shipment_form.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const ordinalSuffix = (num) => {
    const suffixes = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
    ];
    return suffixes[num] || `${num + 1}th`; // Fallback for large numbers
  };
  return (
    <div>
      {formData?.map((item) => (
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
                    (revised version as per Official Journal of the European
                    Union 22.12.2020 L431/13) REGULATION (EU) 2020/2174
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
                    <h3 className="font-semibold">
                      1. Consignment Information
                    </h3>
                    <p>
                      <strong className="mr-2">Name:</strong>
                      {item?.company_name}
                    </p>
                    <p>
                      <strong className="mr-2">Address:</strong> {item?.address}
                    </p>
                    <p>
                      <strong className="mr-2">Contact Person:</strong>{" "}
                      {item?.contact_person}
                    </p>
                  </Box>
                  <Box className="border  p-4">
                    <h3 className="font-semibold">2. Consignee</h3>
                    <p>
                      <strong className="mr-2">Name:</strong>{" "}
                      {item?.consignee_name}
                    </p>
                    <p>
                      <strong className="mr-2">Address:</strong>{" "}
                      {item?.consignee_address}
                    </p>
                    <p>
                      <strong className="mr-2">Contact Person:</strong>{" "}
                      {item?.contPerson}
                    </p>
                  </Box>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2  ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">3. Actual Quantity</h3>
                    <p> {item?.number_of_shipments}</p>
                  </Box>
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      4. Actual Date of Shipment
                    </h3>
                    <p>{item?.aShipdate}</p>
                  </Box>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-${item?.carriers?.length}`}
                >
                  {item?.carriers.map((data, index) => (
                    <Box key={data?.id} className="border  p-4">
                      <h3 className="font-semibold">
                        5.({String.fromCharCode(97 + index)}){" "}
                        {ordinalSuffix(index)} Carrier
                      </h3>
                      <p>
                        <strong className="mr-2">Name:</strong> {data?.name}
                      </p>
                      <p>
                        <strong className="mr-2">Address:</strong>
                        {data?.address}
                      </p>
                      <p>
                        <strong className="mr-2">Contact Person:</strong>
                        {data?.contact_person}
                      </p>
                      <p>
                        <strong className="mr-2">Tel:</strong>
                        {data?.phone}
                      </p>
                      <p>
                        <strong className="mr-2">Fax:</strong>
                        {data?.fax}
                      </p>
                      <p>
                        <strong className="mr-2">Email:</strong>
                        {data?.email}
                      </p>
                      <p>
                        <strong className="mr-2">Means of Transport:</strong>
                        {data?.means_of_transport}
                      </p>
                      <p>
                        <strong className="mr-2">Date of Transfer:</strong>
                        {data?.date_of_transport}
                      </p>
                      <p>
                        <strong className="mr-2">Signature:</strong>
                        (signed)
                      </p>
                    </Box>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      6. Waste generator (Original producer/new
                      producer/collector):
                    </h3>
                    <p>
                      <strong className="mr-2">Name:</strong>
                      {item?.waste_processor_name}
                    </p>
                    <p>
                      <strong className="mr-2">Address:</strong>
                      {item?.waste_processor_address}
                    </p>
                    <p>
                      <strong className="mr-2">Contact Person:</strong>
                      {item?.waste_processor_contact_person}
                    </p>
                    <p>
                      <strong className="mr-2">Mobile:</strong>
                      {item?.waste_processor_tel}
                    </p>
                    <p>
                      <strong className="mr-2">Email:</strong>
                      {item?.waste_processor_email}
                    </p>
                  </Box>
                  <div className="grid grid-cols-1 ">
                    <Box className="border  p-4">
                      <h3 className="font-semibold">
                        8. Recovery operation (or if appropriate disposal
                        operation in the case of waste referred to in Article
                        3(4)):
                      </h3>
                      <p>{item?.recovery_operation_name}</p>
                    </Box>
                    <Box className="border  p-4">
                      <h3 className="font-semibold">
                        9. Usual description of the waste:
                      </h3>
                      <p>{item?.usual_des_of_the_waste}</p>
                    </Box>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">7. Recovery facility:</h3>
                    <p>
                      <strong className="mr-2">Name:</strong>
                      {item?.processing_facility_name}
                    </p>
                    <p>
                      <strong className="mr-2">Address:</strong>
                      {item?.processing_facility_address}
                    </p>
                    <p>
                      <strong className="mr-2">Contact Person:</strong>
                      {item?.processing_facility_contact_per}
                    </p>
                    <p>
                      <strong className="mr-2">Tel:</strong>
                      {item?.processing_facility_tel}
                    </p>
                    <p>
                      <strong className="mr-2">Fax:</strong>
                      {item?.processing_facility_fax}
                    </p>
                    <p>
                      <strong className="mr-2">Email:</strong>
                      {item?.processing_facility_email}
                    </p>
                  </Box>

                  <Box className="border p-4">
                    <h3 className="font-semibold">
                      10. Waste identification (fill in relevant codes):
                    </h3>
                    <p className="mr-2">
                      <strong>(i) Basel Annex IX:</strong>
                      {item?.basel_annex_ix}
                    </p>
                    <p className="mr-2">
                      <strong>(ii) OECD (if different from (i) )</strong>
                      {item?.oecd_ii}
                    </p>
                    <p className="mr-2">
                      <strong>(iii) Annex IIA(4)</strong>
                      {item?.annex_iia4}
                    </p>
                    <p className="mr-2">
                      <strong>(iv) Annex IIIA(5)</strong>
                      {item?.annex_iia5}
                    </p>
                    <p className="mr-2">
                      <strong>(v) EC list of wastes:</strong>
                      {item?.ec_list_of_wastes}
                    </p>
                    <p className="mr-2">
                      <strong>(vi) National code:</strong>
                      {item?.national_code}
                    </p>
                    <p className="mr-2">
                      <strong>(vii) Other (specify): HS CODE: 26201900:</strong>
                      {item?.other_specify}
                    </p>
                  </Box>
                </div>

                <div className="grid grid-cols-1 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      11. Countries/states concerned:
                    </h3>
                  </Box>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 ">
                  <Box className="border  p-4">
                    <p>{item?.countriesOrstates_exp_dis}</p>
                  </Box>

                  <Box className="border  p-4">
                    <p>{item?.countriesOrstates_transit}</p>
                  </Box>
                  <Box className="border  p-4">
                    <p>{item?.countriesOrstates_imprt_arr}</p>
                  </Box>
                </div>

                <div className="grid grid-cols-1 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      12. Declaration of the person who arranges the shipment: I
                      certify that the above information is complete and correct
                      to the best of my knowledge.
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p>
                        <strong className="mr-2">Name:</strong>
                        {item?.declaration_name}
                      </p>
                      <p>
                        <strong className="mr-2">Date:</strong>
                        {item?.declaration_date}
                      </p>
                      <p>
                        <strong className="mr-2">Signature:</strong>
                        (signed)
                      </p>
                    </div>
                  </Box>
                </div>
                <div className="grid grid-cols-1 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      13. Signature upon receipt of the waste by the consignee:
                    </h3>
                    <div className="flex items-center justify-between mt-2 ">
                      <div className="flex">
                        <span className="text-black mr-1">Name:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                      <div className="flex">
                        <span className="text-black mr-1">Date:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                      <div className="flex">
                        <span className="text-black mr-1">Signature:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                    </div>
                  </Box>
                </div>
                <div className="grid grid-cols-1 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold text-center">
                      TO BE COMPLETED BY THE RECOVERY FACILITY
                    </h3>
                    <h3 className="font-semibold mt-1">
                      14. Shipment received at recovery facility. Quantity
                      received: ____________________ Tonnes (Mg) m³
                    </h3>
                    <div className="flex items-center mt-2 justify-between">
                      <div className="flex">
                        <span className="text-black mr-1">Name:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                      <div className="flex">
                        <span className="text-black mr-1">Date:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                      <div className="flex">
                        <span className="text-black mr-1">Signature:</span>
                        <div className="border-b border-black w-56"></div>
                      </div>
                    </div>
                  </Box>
                </div>

                {/* bullet points */}
                <div className="mt-2">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Information accompanying shipments of green-listed waste
                      and destined for recovery or waste destined for laboratory
                      analysis pursuant to Regulation (EC) No 1013/2006.
                    </li>
                    <li>
                      If more than three carriers, attach information as
                      required in blocks 5 (a), (b), (c).
                    </li>
                    <li>
                      When the person who arranges the shipment is not the
                      producer or collector, information about the producer or
                      collector shall be provided.
                    </li>
                    <li>
                      The relevant code(s) as indicated in Annex IIIA to
                      Regulation (EC) No 1013/2006 are to be used, as
                      appropriate in sequence. Certain Basel entries such as
                      B1100, B3010, and B3020 are restricted to particular waste
                      streams only, as indicated in Annex IIIA.
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
            <div className="px-24 flex  items-center gap-4">
              <div className="">
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
      ))}
    </div>
  );
};

export default PdfDownload;
