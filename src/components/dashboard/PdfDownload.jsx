import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button ,Card } from "@mui/material";


const PdfDownload = ( ) => {
      const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  const companyId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.company_id || null;
    } catch {
      return null;
    }
  };

  const loginId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.login_id || null;
    } catch {
      return null;
    }
  };

  // console.log("formdata:-", id);

  const fetchFormData = async (id) => {
    setLoading(true);
    setError("");
    try {
      const url = `https://annex.sofinish.co.uk/api/forms/${id}?action=DownloadPdf&company_id=${companyId()}&login_id=${loginId()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFormData(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchFormData(id);
    }
  }, [id]);

  // console.log(formRef.current);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const handleDownloadPDF = async () => {
    const containers = document.querySelectorAll(".annex-card"); // each card has this class
    if (!containers.length) return;

    setLoadingPDF(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");

      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];

        // Make container visible
        Object.assign(container.style, {
          position: "relative",
          opacity: "1",
          width: "100%",
          height: "auto",
        });

        await new Promise((resolve) => setTimeout(resolve, 100)); // let DOM render

        const canvas = await html2canvas(container, {
          scale: window.devicePixelRatio || 2,
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i !== 0) pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight > 297 ? 297 : imgHeight
        );
      }

      pdf.save(`AnnexForm.pdf`);
      window.location.reload('/dashboard');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoadingPDF(false);

      // Optionally reset style (if you had them hidden by default)
      containers.forEach((container) => {
        Object.assign(container.style, {
          position: "fixed",
          opacity: "0",
          width: "0",
          height: "0",
        });
      });
    }
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
    <div className="px-2">
        <div className="px-12 flex justify-end items-center gap-4 py-5">
        <Button
          className="no-print"
          id="download-btn"
          onClick={handleDownloadPDF}
          variant="contained"
        >
          Download PDF
        </Button>
      </div>
      {formData?.map((item, idx) => (
        <div key={idx} className="px-12">
          <Card className="p-8 px-10 annex-card print-only bg-white">
            <div className="bg-white">
              <div ref={formRef}>
                <div className="flex flex-col items-center space-y-2">
                  <h2 className="text-xl font-bold text-center ">ANNEX VII</h2>

                  <div className=" p-2 items-center flex flex-col ">
                    <p className="text-sm ">
                      INFORMATION ACCOMPANYING SHIPMENTS OF WASTES REFERRED TO
                      IN ARTICLE 3(2) AND (4)
                    </p>
                    <p className="text-sm">
                      (revised version as per Official Journal of the European
                      Union 22.12.2020 L431/13) REGULATION (EU) 2020/2174
                    </p>
                  </div>
                  <h5 className="text-sm md:text-base text-center font-bold">
                    {item?.ref_name} -{item?.ref_name2}-{item?.ref_name3}-
                    {item?.ref_name4}
                  </h5>
                </div>
                <div className="py-5 px-12">
                  <div className="py-3">
                    <h4 className="text-base md:text-xl   font-bold">
                      Consignment Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <Box className="border  p-4 ">
                      <h3 className="font-bold">
                        1. Person who arranges the shipment
                      </h3>
                      <div className="flex justify-between">
                        <div>
                          <p>
                            Name:
                            {item?.company_name}
                          </p>
                          <p>
                            Address: {item?.address}
                          </p>
                          <p>
                            Contact Person:{" "}
                            {item?.contact_person}
                          </p>
                          <p>
                            Fax: {item?.fax}
                          </p>
                          <p>
                            Email: {item?.email}
                          </p>
                          <p>
                            Contact Number: {item?.contact_number}
                          </p>
                        </div>
                        {/* <div>
                          {item?.signature?.some(
                            (sign) => sign.signed_by === item?.email
                          ) && (
                            <img
                              crossOrigin="anonymous"
                              src={`https://annex.sofinish.co.uk/${
                                item?.signature?.find(
                                  (sign) => sign.signed_by === item?.email
                                )?.signature_path || ""
                              }`}
                              alt="Signature"
                              className="w-30 h-10"
                            />
                          )}
                        </div> */}
                      </div>
                    </Box>
                    <Box className="border  p-4">
                      <h3 className="font-bold">2. Consignee</h3>
                      <div className="flex  justify-between">
                        <div>
                          <p>
                            Name: {item?.consignee_name}
                          </p>
                          <p>
                            Address:
                            {item?.consignee_address}
                          </p>
                          <p>
                            Contact Person: {item?.contPerson}
                          </p>
                          <p>
                            Fax: {item?.fax2}
                          </p>
                          <p>
                            Email:
                            {item?.email2}
                          </p>
                          <p>
                            Contact Number:
                            {item?.consignee_contact}
                          </p>
                        </div>
                        {/* <div>
                          {item?.signature?.some(
                            (sign) => sign.signed_by === item?.email2
                          ) && (
                            <img
                              src={`https://annex.sofinish.co.uk/${
                                item?.signature?.find(
                                  (sign) => sign.signed_by === item?.email2
                                )?.signature_path || ""
                              }`}
                              alt="Signature"
                              className="w-30 h-10"
                            />
                          )}
                        </div> */}
                      </div>
                    </Box>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <Box className={`border p-4 `}>
                      <div className="flex">
                        <h3 className="font-bold mr-1">3. Actual Quantity:</h3>
                        <p>
                          {item?.number_of_shipments}&nbsp;-&nbsp;
                          <span className="font-bold mr-1">
                            Tonnes(Mg) m3:
                          </span>
                          {item?.weight}
                        </p>
                      </div>
                    </Box>
                    <Box className={`border p-4 `}>
                      <h3 className="font-bold">
                        4. Actual Date of Shipment
                      </h3>
                      <p>{item?.aShipdate && new Date(item.aShipdate).toLocaleDateString('en-GB')}</p>
                    </Box>
                  </div>
                  <div
                    className={`grid grid-cols-1 ${
                      item?.carriers?.length === 1
                        ? "md:grid-cols-3"
                        : item.carriers.length === 2
                        ? "md:grid-cols-3"
                        : item.carriers.length === 4
                        ? "md:grid-cols-3"
                        : item.carriers.length === 5
                        ? "md:grid-cols-3 md:[&>*:nth-child(n+4)]:col-span-2"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {[...item?.carriers, {}, {}, {}].slice(0, 3).map((data, index) => (
                      <Box key={data?.id} className="border  p-4">
                        <h3 className="font-bold">
                          5.({String.fromCharCode(97 + index)}){" "}
                          {ordinalSuffix(index)} Carrier
                        </h3>
                        <div className="flex  justify-between">
                          <div>
                            <p>
                              Name: {data?.name}
                            </p>
                            <p>
                              Address:
                              {data?.address}
                            </p>
                            <p>
                              Contact Person:
                              {data?.contact_person}
                            </p>
                            <p>
                              Tel:
                              {data?.phone}
                            </p>
                            <p>
                              Fax:
                              {data?.fax}
                            </p>
                            <p>
                              Email:
                              {data?.email}
                            </p>
                            <p>
                              Means of Transport:
                              {data?.means_of_transport}
                            </p>
                            <p>
                              Date of Transfer:
                              {data?.date_of_transport}
                            </p>
                            <p>
                              Signature:
                              {item?.signature?.some(
                                (sign) => sign.signed_by === data?.email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === data?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{marginTop: "-1rem",marginLeft: "6rem"}}
                                />
                              )}
                            </p>
                          </div>
                        </div>
                      </Box>
                    ))}
                  </div>
                  {item?.waste_generator.map((data2) => (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <Box className={`border p-4`}>
                          <h3 className="font-bold">
                            6. Waste generator (Original producer/new
                            producer/collector):
                          </h3>
                          <div className="flex justify-between">
                            <div>
                              <p>
                                Name
                                {data2?.name}
                              </p>
                              <p>
                                Address:
                                {data2?.address}
                              </p>
                              <p className="mr-2">
                                  Contact Person:
                                {data2?.contact_person}
                              </p>
                              <p className="mr-2">
                                Mobile:
                                {data2?.mobile}
                              </p>
                              <p className="mr-2">
                                Email:
                                {data2?.email}
                              </p>
                            </div>
                            <div>
                              {item?.signature?.some(
                                (sign) => sign.signed_by === data2?.email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === data2?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "5rem" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                        <div className="grid grid-cols-1 ">
                          <Box className={`border p-4 `}>
                            <h3 className="font-bold mr-1">
                              8. Recovery operation (or if appropriate disposal<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;operation in the case of waste referred to in<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;Article 3(4)):
                              <span>{item?.recovery_operation_name}</span>
                            </h3>
                          </Box>
                          <Box className="border  p-4">
                            <h3 className="font-bold">
                              9. Usual description of the waste:
                            </h3>
                            <p> &nbsp;&nbsp;&nbsp;&nbsp;{item?.usual_des_of_the_waste}</p>
                          </Box>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            7. Recovery facility:
                          </h3>
                          <div className="flex  justify-between">
                            <div>
                              <p className="mr-2">
                                Name:
                                {data2?.recovery_name}
                              </p>
                              <p className="mr-2">
                                Address:
                                {data2?.recovery_address}
                              </p> 
                              <p className="mr-2">
                                
                                  Contact Person:
                                
                                {data2?.recovery_contact}
                              </p>
                              <p className="mr-2">
                                Tel:
                                {data2?.recovery_tel}
                              </p>
                              <p className="mr-2">
                                Fax:
                                {data2?.recovery_fax}
                              </p>
                              <p>
                                Email:
                                {data2?.recovery_email}
                              </p>
                            </div>
                            <div className="flex justify-end mt-auto">
                              {item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) =>
                                        sign.signed_by === data2?.recovery_email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "13rem" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>

                        <Box className={`border p-4 `}>
                            <h3>  
                            <span className="font-bold"> 10. Waste identification </span>(fill in relevant codes):
                          </h3>
                          <div className="flex  justify-between">
                            <div>
                              <p className="mr-2">
                                (i) Basel Annex IX:
                                {item?.basel_annex_ix}
                              </p>
                              <p className="mr-2">
                                (ii) OECD (if different from (i) ):
                                {item?.oecd_ii}
                              </p>
                              <p className="mr-2">
                                (iii) Annex IIA(4):
                                {item?.annex_iia4}
                              </p>
                              <p className="mr-2">
                                (iv) Annex IIIA(5):
                                {item?.annex_iia5}
                              </p>
                              <p className="mr-2">
                                (v) EC list of wastes:
                                {item?.ec_list_of_wastes}
                              </p>
                              <p className="mr-2">
                                (vi) National code:
                                {item?.national_code}
                              </p>
                              <p className="mr-2">
                                (vii) Other (specify):
                                {item?.other_specify}
                              </p>
                            </div>
                          </div>
                        </Box>
                      </div>

                      <div className="grid grid-cols-1 ">
                        <Box className="border  p-4">
                          <h3 className="font-bold">
                            11. Countries/states concerned:
                          </h3>
                        </Box>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 ">
                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className=""> <strong>Export/dispatch: </strong></h3>
                            <p className="">
                              <strong>{item?.countriesOrstates_exp_dis}</strong>
                            </p>
                          </div>
                        </Box>

                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className=""><strong>Transit:</strong></h3>
                            <p className="">
                              <strong>{item?.countriesOrstates_transit}</strong>
                            </p>
                          </div>
                        </Box>
                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className=""><strong>Import/arrival:</strong></h3>
                            <p className="">
                              <strong>{item?.countriesOrstates_imprt_arr}</strong>
                            </p>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            12. Declaration of the person who arranges the
                            shipment: I certify that the above information is
                            complete and correct to the best of my knowledge.
                          </h3>
                          <div className="flex mt-2 justify-between">
                            <div className="flex items-center justify-between w-full ">
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
                                {/*  */}
                              </p>
                            </div>
                            <div>
                              {item?.signature?.some(
                                (sign) => sign.signed_by === item?.email
                              ) && (
                                <img
                                  crossOrigin="anonymous"
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === item?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "4px" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            13. Signature upon receipt of the waste by the
                            consignee:
                          </h3>
                          <div className="flex mt-2 justify-between">
                            <div className="flex items-center justify-between w-full ">
                            <p>
                                <strong className="mr-2">Name:</strong>
                                {item?.signature_exp_dis}
                              </p>
                              <p>
                                <strong className="mr-2">Date:</strong>
                                {item?.signature_transit}
                              </p>
                              <p>
                                <strong className="mr-2">Signature:</strong>
                                {/* <div className="w-28"></div> */}
                                {item?.signature?.some(
                                  (sign) => sign.signed_by === item?.email2
                                ) && (
                                  <img
                                    src={`https://annex.sofinish.co.uk/${
                                      item?.signature?.find(
                                        (sign) =>
                                          sign.signed_by === item?.email2
                                      )?.signature_path || ""
                                    }`}
                                    alt="Signature"
                                    className="w-30 h-10"
                                    style={{ marginTop: "-5px" }}
                                  />
                                )}
                              </p>
                            </div>
                            <div></div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold text-center">
                            TO BE COMPLETED BY THE RECOVERY FACILITY
                          </h3>
                          <h3 className="font-bold mt-1">
                            14. Shipment received at recovery facility. Quantity
                            received: ____________________ Tonnes (Mg) m³:
                          </h3>
                          <div className="flex mt-3  justify-between">
                            <div className="w-full flex items-center  justify-between">
                              <div className="flex">
                                <span className="text-black mr-1">Name:</span>
                                <div className=" w-28">
                                  {item?.shipment_facility_name}
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-black mr-1">Date:</span>
                                <div className=" w-28">
                                  {item?.shipment_facility_date}
                                </div>
                              </div>
                              <div className="flex">
                                {/* <span className="text-black mr-1">
                                  Signature:
                                </span>
                                <div className="border-b border-black w-28"></div> */}
                              </div>
                            </div>
                            {/* <div className="flex justify-end mt-auto">
                              {item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) =>
                                        sign.signed_by === data2?.recovery_email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "13rem" }}
                                />
                              )}
                            </div> */}
                          </div>
                        </Box>
                      </div>
                    </>
                  ))}
                  {/* bullet points */}
                  <div className="mt-2">
                    <ol className="pl-5 space-y-2 list-decimal">
                      <li>
                        Information accompanying shipments of green-listed waste and destined for recovery or waste destined for laboratory analysis pursuant to Regulation (EC) No 1013/2006.
                      </li>
                      <li>
                        If more than three carriers, attach information as required in blocks 5 (a), (b), (c).
                      </li>
                      <li>
                        When the person who arranges the shipment is not the producer or collector, information about the producer or collector shall be provided.
                      </li>
                      <li>
                        The relevant code(s) as indicated in Annex IIIA to Regulation (EC) No 1013/2006 are to be used, as appropriate in sequence. Certain Basel entries such as B1100, B3010, and B3020 are restricted to particular waste streams only, as indicated in Annex IIIA.
                      </li>
                      <li>
                        The BEU codes listed in Annex IIIB to Regulation (EC) No 1013/2006 are to be used.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 annex-card print-only bg-white">
            <div className="bg-white">
              <div ref={formRef}>
                <div className="flex flex-col items-center space-y-2">
                  <h2 className="text-xl font-bold text-center ">ANNEX VII</h2>

                  <div className=" p-2 items-center flex flex-col ">
                    <p className="text-sm ">
                      INFORMATION ACCOMPANYING SHIPMENTS OF WASTES REFERRED TO
                      IN ARTICLE 3(2) AND (4)
                    </p>
                    <p className="text-sm">
                      (revised version as per Official Journal of the European
                      Union 22.12.2020 L431/13) REGULATION (EU) 2020/2174
                    </p>
                  </div>

                  <h5 className="text-sm md:text-base text-center font-bold">
                    {item?.ref_name} -{item?.ref_name2}-{item?.ref_name3}-
                    {item?.ref_name4}
                  </h5>
                </div>

                <div className="py-5 px-12">
                  <div className="py-3">
                    <h4 className="text-base md:text-xl   font-bold">
                      Consignment Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <Box className="border  p-4 ">
                      <h3 className="font-bold">
                        1. Person who arranges the shipment
                      </h3>
                      <div className="flex justify-between">
                        <div>
                          <p>
                            <strong>Name:</strong>
                            {item?.company_name}
                          </p>
                          <p>
                            <strong>Address:</strong> {item?.address}
                          </p>
                          <p>
                            <strong>Contact Person:</strong>{" "}
                            {item?.contact_person}
                          </p>
                          <p>
                            <strong>Fax:</strong> {item?.fax}
                          </p>
                          <p>
                            <strong>Email:</strong> {item?.email}
                          </p>
                          <p>
                            <strong>Contact Number:</strong>{" "}
                            {item?.contact_number}
                          </p>
                        </div>
                        {/* <div>
                          {item?.signature?.some(
                            (sign) => sign.signed_by === item?.email
                          ) && (
                            <img
                              crossOrigin="anonymous"
                              src={`https://annex.sofinish.co.uk/${
                                item?.signature?.find(
                                  (sign) => sign.signed_by === item?.email
                                )?.signature_path || ""
                              }`}
                              alt="Signature"
                              className="w-30 h-10"
                            />
                          )}
                        </div> */}
                      </div>
                    </Box>
                    <Box className="border  p-4">
                      <h3 className="font-bold">2. Consignee</h3>
                      <div className="flex  justify-between">
                        <div>
                          <p>
                            <strong>Name:</strong> {item?.consignee_name}
                          </p>
                          <p>
                            <strong>Address:</strong>
                            {item?.consignee_address}
                          </p>
                          <p>
                            <strong>Contact Person:</strong> {item?.contPerson}
                          </p>
                          <p>
                            <strong>Fax:</strong> {item?.fax2}
                          </p>
                          <p>
                            <strong>Email:</strong>
                            {item?.email2}
                          </p>
                          <p>
                            <strong>Contact Number:</strong>
                            {item?.consignee_contact}
                          </p>
                        </div>
                        {/* <div>
                          {item?.signature?.some(
                            (sign) => sign.signed_by === item?.email2
                          ) && (
                            <img
                              src={`https://annex.sofinish.co.uk/${
                                item?.signature?.find(
                                  (sign) => sign.signed_by === item?.email2
                                )?.signature_path || ""
                              }`}
                              alt="Signature"
                              className="w-30 h-10"
                            />
                          )}
                        </div> */}
                      </div>
                    </Box>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <Box className={`border p-4 `}>
                      <div className="flex">
                        <h3 className="font-bold mr-1">3. Actual Quantity:</h3>
                        <p>
                          {item?.number_of_shipments}&nbsp;-&nbsp;
                          <span className="font-bold mr-1">
                            Tonnes(Mg) m3:
                          </span>
                          {item?.weight}
                        </p>
                      </div>
                    </Box>
                    <Box className={`border p-4 `}>
                      <h3 className="font-bold">
                        4. Actual Date of Shipment
                      </h3>
                      <p>{item?.aShipdate}</p>
                    </Box>
                  </div>
                  <div
                    className={`grid grid-cols-1 ${
                      item?.carriers?.length === 1
                        ? "md:grid-cols-3"
                        : item.carriers.length === 2
                        ? "md:grid-cols-3"
                        : item.carriers.length === 4
                        ? "md:grid-cols-3"
                        : item.carriers.length === 5
                        ? "md:grid-cols-3"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {/* {item?.carriers.map((data, index) => (
                        <Box key={data?.id} className="border  p-4">
                          <h3 className="font-bold">
                            5.({String.fromCharCode(97 + index)}){" "}
                            {ordinalSuffix(index)} Carrier
                          </h3>
                          <div className="flex  justify-between">
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
                              <p>
                                <strong>Means of Transport:</strong>
                                {data?.means_of_transport}
                              </p>
                              <p>
                                <strong>Date of Transfer:</strong>
                                {data?.date_of_transport}
                              </p>
                              <p>
                                <strong>Signature:</strong>
                                {item?.signature?.some(
                                  (sign) => sign.signed_by === data?.email
                                )
                                  ? ""
                                  : ""}
                              </p>
                            </div>
                            <div>
                              {item?.signature?.some(
                                (sign) => sign.signed_by === data?.email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === data?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                      ))} */}
                    {[...Array(6)].map((_, index) => {
                      const data = item?.carriers?.[index];

                      return (
                        <Box key={data?.id || index} className="border p-4">
                          <h3 className="font-bold">
                            5.({String.fromCharCode(97 + index +3)}){" "}
                            {ordinalSuffix(index+3)} Carrier
                          </h3>
                          <div className="flex justify-between items-center">
                            <div>
                              <p>
                                <strong>Name:</strong> {data?.name || ""}
                              </p>
                              <p>
                                <strong>Address:</strong> {data?.address || ""}
                              </p>
                              <p>
                                <strong>Contact Person:</strong>{" "}
                                {data?.contact_person || ""}
                              </p>
                              <p>
                                <strong>Tel:</strong> {data?.phone || ""}
                              </p>
                              <p>
                                <strong>Fax:</strong> {data?.fax || ""}
                              </p>
                              <p>
                                <strong>Email:</strong> {data?.email || ""}
                              </p>
                              <p>
                                <strong>Means of Transport:</strong>{" "}
                                {data?.means_of_transport || ""}
                              </p>
                              <p>
                                <strong>Date of Transfer:</strong>{" "}
                                {data?.date_of_transport
                                  ? new Date(
                                      data.date_of_transport
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })
                                  : ""}
                              </p>
                              <p>
                                <strong>Signature:</strong>{" "}
                                {item?.signature?.some(
                                  (sign) => sign.signed_by === data?.email
                                ) && (
                                  <img
                                    src={`https://annex.sofinish.co.uk/${
                                      item?.signature?.find(
                                        (sign) => sign.signed_by === data?.email
                                      )?.signature_path || ""
                                    }`}
                                    alt="Signature"
                                    className="w-30 h-10"
                                    style={{marginTop: "-1rem", marginLeft: "6rem"}}
                                  />
                                )}
                              </p>
                            </div>
                          </div>
                        </Box>
                      );
                    })}
                  </div>
                  {item?.waste_generator.map((data2) => (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <Box className={`border p-4`}>
                          <h3 className="font-bold">
                            6. Waste generator (Original producer/new
                            producer/collector):
                          </h3>
                          <div className="flex justify-between">
                            <div>
                              <p>
                                <strong>Name:</strong>
                                {data2?.name}
                              </p>
                              <p>
                                <strong>Address:</strong>
                                {data2?.address}
                              </p>
                              <p>
                                <strong className="mr-2">
                                  Contact Person:
                                </strong>
                                {data2?.contact_person}
                              </p>
                              <p>
                                <strong className="mr-2">Mobile:</strong>
                                {data2?.mobile}
                              </p>
                              <p>
                                <strong className="mr-2">Email:</strong>
                                {data2?.email}
                              </p>
                            </div>
                            <div>
                              {item?.signature?.some(
                                (sign) => sign.signed_by === data2?.email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === data2?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "5rem" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                        <div className="grid grid-cols-1 ">
                          <Box className={`border p-4 `}>
                            <h3 className="font-bold mr-1">
                              8. Recovery operation (or if appropriate disposal<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;operation in the case of waste referred to in<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;Article 3(4)):
                              <span>{item?.recovery_operation_name}</span>
                            </h3>
                          </Box>
                          <Box className="border  p-4">
                            <h3 className="font-bold">
                              9. Usual description of the waste:
                            </h3>
                            <p> &nbsp;&nbsp;&nbsp;&nbsp;{item?.usual_des_of_the_waste}</p>
                          </Box>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            7. Recovery facility:
                          </h3>
                          <div className="flex  justify-between">
                            <div>
                              <p>
                                <strong className="mr-2">Name:</strong>
                                {data2?.recovery_name}
                              </p>
                              <p>
                                <strong className="mr-2">Address:</strong>
                                {data2?.recovery_address}
                              </p>
                              <p>
                                <strong className="mr-2">
                                  Contact Person:
                                </strong>
                                {data2?.recovery_contact}
                              </p>
                              <p>
                                <strong className="mr-2">Tel:</strong>
                                {data2?.recovery_tel}
                              </p>
                              <p>
                                <strong className="mr-2">Fax:</strong>
                                {data2?.recovery_fax}
                              </p>
                              <p>
                                <strong className="mr-2">Email:</strong>
                                {data2?.recovery_email}
                              </p>
                            </div>
                            <div className="flex justify-end mt-auto">
                              {item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) =>
                                        sign.signed_by === data2?.recovery_email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "13rem" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>

                        <Box className={`border p-4 `}>
                          <h3 >
                            <span className="font-bold"> 10. Waste identification </span>(fill in relevant codes):
                          </h3>
                          <div className="flex  justify-between">
                            <div>
                              <p className="mr-2">
                                <strong>(i) Basel Annex IX:</strong>
                                {item?.basel_annex_ix}
                              </p>
                              <p className="mr-2">
                                <strong>
                                  (ii) OECD (if different from (i) ):
                                </strong>
                                {item?.oecd_ii}
                              </p>
                              <p className="mr-2">
                                <strong>(iii) Annex IIA(4):</strong>
                                {item?.annex_iia4}
                              </p>
                              <p className="mr-2">
                                <strong>(iv) Annex IIIA(5):</strong>
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
                                <strong>(vii) Other (specify):</strong>
                                {item?.other_specify}
                              </p>
                            </div>
                          </div>
                        </Box>
                      </div>

                      <div className="grid grid-cols-1 ">
                        <Box className="border  p-4">
                          <h3 className="font-bold">
                            11. Countries/states concerned:
                          </h3>
                        </Box>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 ">
                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className="">Export/dispatch:</h3>
                            <p className="">
                              {item?.countriesOrstates_exp_dis}
                            </p>
                          </div>
                        </Box>

                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className="">Transit:</h3>
                            <p className="">
                              {item?.countriesOrstates_transit}
                            </p>
                          </div>
                        </Box>
                        <Box className="border  p-4">
                          <div className="text-center">
                            <h3 className="">Import/arrival:</h3>
                            <p className="">
                              {item?.countriesOrstates_imprt_arr}
                            </p>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            12. Declaration of the person who arranges the
                            shipment: I certify that the above information is
                            complete and correct to the best of my knowledge.
                          </h3>
                          <div className="flex mt-2 justify-between">
                            <div className="flex items-center justify-between w-full ">
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
                                {/*  */}
                              </p>
                            </div>
                            <div>
                              {item?.signature?.some(
                                (sign) => sign.signed_by === item?.email
                              ) && (
                                <img
                                  crossOrigin="anonymous"
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) => sign.signed_by === item?.email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "4px" }}
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold">
                            13. Signature upon receipt of the waste by the
                            consignee:
                          </h3>
                          <div className="flex mt-2 justify-between">
                            <div className="flex items-center justify-between w-full ">
                            <p>
                                <strong className="mr-2">Name:</strong>
                                {item?.signature_exp_dis}
                              </p>
                              <p>
                                <strong className="mr-2">Date:</strong>
                                {item?.signature_transit}
                              </p>
                              <p>
                                <strong className="mr-2">Signature:</strong>
                                {/* <div className="w-28"></div> */}
                                {item?.signature?.some(
                                  (sign) => sign.signed_by === item?.email2
                                ) && (
                                  <img
                                    src={`https://annex.sofinish.co.uk/${
                                      item?.signature?.find(
                                        (sign) =>
                                          sign.signed_by === item?.email2
                                      )?.signature_path || ""
                                    }`}
                                    alt="Signature"
                                    className="w-30 h-10"
                                    style={{ marginTop: "-5px" }}
                                  />
                                )}
                              </p>
                            </div>
                            <div></div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-bold text-center">
                            TO BE COMPLETED BY THE RECOVERY FACILITY
                          </h3>
                          <h3 className="font-bold mt-1">
                            14. Shipment received at recovery facility. Quantity
                            received: ____________________ Tonnes (Mg) m³
                          </h3>
                          <div className="flex mt-3  justify-between">
                            <div className="w-full flex items-center  justify-between">
                              <div className="flex">
                                <span className="text-black mr-1">Name:</span>
                                <div className="w-28">
                                  {item?.shipment_facility_name}
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-black mr-1">Date:</span>
                                <div className="w-28">
                                  {item?.shipment_facility_date}
                                </div>
                              </div>
                              <div className="flex">
                                {/* <span className="text-black mr-1">
                                  Signature:
                                </span> */}
                                {/* <div className="w-28"></div> */}
                              </div>
                            </div>
                            {/* <div className="flex justify-end mt-auto">
                              {item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              ) && (
                                <img
                                  src={`https://annex.sofinish.co.uk/${
                                    item?.signature?.find(
                                      (sign) =>
                                        sign.signed_by === data2?.recovery_email
                                    )?.signature_path || ""
                                  }`}
                                  alt="Signature"
                                  className="w-30 h-10"
                                  style={{ marginTop: "13rem" }}
                                />
                              )}
                            </div> */}
                          </div>
                        </Box>
                      </div>
                    </>
                  ))}
                  {/* bullet points */}
                  <div className="mt-2">
                    <ol className="pl-5 space-y-2 list-decimal">
                      <li>
                        Information accompanying shipments of green-listed waste and destined for recovery or waste destined for laboratory analysis pursuant to Regulation (EC) No 1013/2006.
                      </li>
                      <li>
                        If more than three carriers, attach information as required in blocks 5 (a), (b), (c).
                      </li>
                      <li>
                        When the person who arranges the shipment is not the producer or collector, information about the producer or collector shall be provided.
                      </li>
                      <li>
                        The relevant code(s) as indicated in Annex IIIA to Regulation (EC) No 1013/2006 are to be used, as appropriate in sequence. Certain Basel entries such as B1100, B3010, and B3020 are restricted to particular waste streams only, as indicated in Annex IIIA.
                      </li>
                      <li>
                        The BEU codes listed in Annex IIIB to Regulation (EC) No 1013/2006 are to be used.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* Signature Section */}
              {/* Buttons */}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default PdfDownload;