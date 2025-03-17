import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Card, Box, Button, CircularProgress } from "@mui/material";
import SimpleHeader from "../utils/SimpleHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PDFMakerOrgnl = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();

  const [formId, setFormId] = useState(null);
  // console.log("formdata", formData);

  // useEffect(() => {
  const storedData = localStorage.getItem("formData");
  const item = JSON.parse(storedData);

  // setFormData(data);
  // console.log(storedData2.id);
  // }, []);
  const [formData, setFormData] = useState(null);

  const handleDigitalSignature = () => {
    // localStorage.setItem("formId", formId);
    navigate(`/digital-signature`);
  };

  // console.log(data);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(formRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("waste_shipment_form.pdf");
  };

  // if (loading)
  //   return (
  //     <p className="flex flex-col items-center justify-center h-screen">
  //       <CircularProgress />
  //       <p className="text-black font-medium text-xl">Loading...</p>
  //     </p>
  //   );
  // if (error) return <p>Error: {error}</p>;
  // if (error)
  //   return (
  //     <p className="flex flex-col items-center justify-center h-screen">
  //       <ErrorOutlineIcon />
  //       <p className="text-black font-medium text-xl">
  //         <p>Error: {error}</p>
  //       </p>
  //     </p>
  //   );
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

  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  let emailData = localStorage.getItem("emailData");
  // console.log(emailData);
  let img = localStorage.getItem("savedSignature");

  const handleForm = async (id) => {
    // setFormId(id);

    const file = base64ToFile(img, "signature.png");
    if (!file) {
      return;
    }
    const formData2 = new FormData();
    formData2.append("form_id", id);
    formData2.append("signed_by", emailData);
    formData2.append("signature", file);

    // console.log(formData2);

    try {
      // console.log("clicked");

      const response = await fetch(
        "https://annex.sofinish.co.uk/api/signatures",
        {
          method: "POST",
          body: formData2, // Send FormData
        }
      );

      const result = await response.json();
      console.log("dskjbhhgjsdlalg:-", result);
      if (response.ok) {
        Swal.fire("Success", "Signature uploaded successfully", "success");
        localStorage.removeItem("savedSignature");
        navigate("/thankyou");
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
  console.log(formId);

  return (
    <div>
      <div>
        <SimpleHeader />
      </div>
      {/* {formData?.map((item) => ( */}
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
                    <strong>Name:</strong>
                    {item?.company_name}
                  </p>
                  <p>
                    <strong>Address:</strong> {item?.address}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {item?.contact_person}
                  </p>
                </Box>
                <Box className="border  p-4">
                  <h3 className="font-semibold">2. Consignee</h3>
                  <p>
                    <strong>Name:</strong> {item?.consignee_name}
                  </p>
                  <p>
                    <strong>Address:</strong> <strong>Name:</strong>{" "}
                    {item?.consignee_address}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {item?.contPerson}
                  </p>
                </Box>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3  ">
                <Box className="border  p-4">
                  <h3 className="font-semibold">3. Actual Quantity</h3>
                  <p> {item?.number_of_shipments}</p>
                </Box>
                <Box className="border  p-4">
                  <h3 className="font-semibold">4. Weight</h3>
                  <p> {item?.weight}</p>
                </Box>
                <Box className="border  p-4">
                  <h3 className="font-semibold">5. Actual Date of Shipment</h3>
                  <p>{item?.aShipdate}</p>
                </Box>
              </div>
              <div
                className={`grid grid-cols-1   ${
                  item?.carriers?.length && item?.carriers?.length === 1
                    ? "md:grid-cols-1"
                    : item.carriers.length > 4
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {item?.carriers.map((data, index) => (
                  <Box key={data?.id} className="border  p-4">
                    <h3 className="font-semibold">
                      6.({String.fromCharCode(97 + index)}){" "}
                      {ordinalSuffix(index)} Carrier
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>
                          <strong>Name:</strong> {data?.name}
                        </p>
                        <p>
                          <strong>Address:</strong>
                          {data?.address}
                        </p>
                        <p>
                          <strong>Contact Person:</strong>
                          {data?.contact_person}
                        </p>
                        <p>
                          <strong>Tel:</strong>
                          {data?.phone}
                        </p>
                        <p>
                          <strong>Fax:</strong>
                          {data?.fax}
                        </p>
                        <p>
                          <strong>Email:</strong>
                          {data?.email}
                        </p>
                        {/* <p>
                            <strong>Means of Transport:</strong>
                            {data?.means_of_transport}
                          </p>
                          <p>
                            <strong>Date of Transfer:</strong>
                            {data?.date_of_transport}
                          </p> */}
                        <p>
                          <strong>Signature:</strong>
                          (signed)
                        </p>
                      </div>
                      {data?.email === emailData && (
                        <img
                          src={img}
                          alt="Signature"
                          className="h-12 cursor-pointer"
                        />
                      )}
                    </div>
                  </Box>
                ))}
              </div>
              {item?.waste_generator.map((data, index) => (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <Box className="border  p-4">
                      <h3 className="font-semibold">
                        7. Waste generator (Original producer/new
                        producer/collector):
                      </h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p>
                            <strong>Name:</strong>
                            {data?.name}
                          </p>
                          <p>
                            <strong>Address:</strong>
                            {data?.address}
                          </p>
                          <p>
                            <strong className="mr-2">Contact Person:</strong>
                            {data?.contact_person}
                          </p>
                          <p>
                            <strong className="mr-2">Mobile:</strong>
                            {data?.mobile}
                          </p>
                          <p>
                            <strong className="mr-2">Email:</strong>
                            {data?.email}
                          </p>
                        </div>
                        {data?.email === emailData && (
                          <img
                            src={img}
                            alt="Signature"
                            className="h-12 cursor-pointer"
                          />
                        )}
                      </div>
                    </Box>

                    <div className="grid grid-cols-1 ">
                      <Box className="border  p-4">
                        <h3 className="font-semibold">
                          9. Recovery operation (or if appropriate disposal
                          operation in the case of waste referred to in Article
                          3(4)):
                        </h3>
                        <p>
                          <strong className="mr-2">R-code / D-code:</strong>
                          {item?.recovery_operation_name}
                        </p>
                      </Box>
                      <Box className="border  p-4">
                        <h3 className="font-semibold">
                          10. Usual description of the waste:
                        </h3>
                        <p>{item?.usual_des_of_the_waste}</p>
                      </Box>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <Box className="border  p-4">
                      <h3 className="font-semibold">8. Recovery facility:</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p>
                            <strong className="mr-2">Name:</strong>
                            {data?.recovery_name}
                          </p>
                          <p>
                            <strong className="mr-2">Address:</strong>
                            {data?.recovery_address}
                          </p>
                          <p>
                            <strong className="mr-2">Contact Person:</strong>
                            {data?.recovery_contact}
                          </p>
                          <p>
                            <strong className="mr-2">Tel:</strong>
                            {data?.recovery_tel}
                          </p>
                          <p>
                            <strong className="mr-2">Fax:</strong>
                            {data?.recovery_fax}
                          </p>
                          <p>
                            <strong className="mr-2">Email:</strong>
                            {item?.recovery_email}
                          </p>
                        </div>
                        {item?.email === emailData && (
                          <img
                            src={img}
                            alt="Signature"
                            className="h-12 cursor-pointer"
                          />
                        )}
                      </div>
                    </Box>

                    <Box className="border p-4">
                      <h3 className="font-semibold">
                        11. Waste identification (fill in relevant codes):
                      </h3>
                      <div>
                        {/* Waste Identification Codes */}

                        <div className="space-y-2.5">
                          <p className="mr-2">
                            <strong>(i) Basel Annex IX:</strong>{" "}
                            {item?.basel_annex_ix}
                          </p>

                          <p className="mr-2">
                            <strong>(ii) OECD (if different from (i)):</strong>{" "}
                            {item?.oecd_ii}
                          </p>
                          <p className="mr-2">
                            <strong>(iii) Annex IIA(4):</strong>{" "}
                            {item?.annex_iia4}
                          </p>
                          <p className="mr-2">
                            <strong>(iv) Annex IIIA(5):</strong>{" "}
                            {item?.annex_iia5}
                          </p>
                          <p className="mr-2">
                            <strong>(v) EC list of wastes:</strong>{" "}
                            {item?.ec_list_of_wastes}
                          </p>
                          <p className="mr-2">
                            <strong>(vi) National code:</strong>{" "}
                            {item?.national_code}
                          </p>
                          <p className="mr-2">
                            <strong>
                              (vii) Other (specify): HS CODE: 26201900:
                            </strong>{" "}
                            {item?.other_specify}
                          </p>
                        </div>
                      </div>
                    </Box>
                  </div>
                </>
              ))}
              <div className="grid grid-cols-1 ">
                <Box className="border  p-4">
                  <h3 className="font-semibold">
                    12. Countries/states concerned:
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
                    13. Declaration of the person who arranges the shipment: I
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
                    14. Signature upon receipt of the waste by the consignee:
                  </h3>
                  <div className="flex items-center justify-between mt-2 ">
                    <div className="flex">
                      <span className="text-black mr-1">Name:</span>
                      <div className="border-b border-black w-56">
                        {item?.signature_exp_dis}
                      </div>
                    </div>
                    <div className="flex">
                      <span className="text-black mr-1">Date:</span>
                      <div className="border-b border-black w-56">
                        {item?.signature_transit}
                      </div>
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
                    15. Shipment received at recovery facility. Quantity
                    received: ____________________ Tonnes (Mg) m³
                  </h3>
                  <div className="flex items-center mt-2 justify-between">
                    <div className="flex">
                      <span className="text-black mr-1">Name:</span>
                      <div className="border-b border-black w-56">
                        {item?.shipment_facility_name}
                      </div>
                    </div>
                    <div className="flex">
                      <span className="text-black mr-1">Date:</span>
                      <div className="border-b border-black w-56">
                        {item?.shipment_facility_date}
                      </div>
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
                // onClick={handleDigitalSignature(item.annex_id)}
                sx={{ bgcolor: "#5C75C5" }}
              >
                Digital signature
              </Button>
            </div>
            {/* Middle: Drag Signature Message & Preview */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Drag your signature and place in your box
              </span>

              <img src={img} alt="Signature" className="h-12 cursor-pointer" />
            </div>
            <div>
              <Button
                // onClick={handleDownloadPDF}
                onClick={() => handleForm(item.id)}
                variant="contained"
                // disabled
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {/* ))} */}
    </div>
  );
};

export default PDFMakerOrgnl;
