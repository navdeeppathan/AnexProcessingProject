import React, { useEffect, useRef, useState } from "react";
import "./AnnexVII.css";
import AnnexVLeftForm from "./AnnexVLeftForm";
import { CircularProgress } from "@mui/material";
import { Card, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Tick Icon
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MailIcon from "@mui/icons-material/Mail";

import { useParams } from "react-router-dom";
const AnnexVII = () => {
  const { id } = useParams();
  // console.log(id);
  const [message, setMessage] = useState("");

  const sendReminderEmail = async () => {
    const companyId = () => {
      const user = localStorage.getItem("user");
      const user_id = JSON.parse(user)?.company_id;
      return user_id || NULL;
    };

    const loginId = () => {
      const user = localStorage.getItem("user");
      const user_id = JSON.parse(user)?.login_id;
      return user_id || NULL;
    };
    setMessage("");
    try {
      const url = `https://annex.sofinish.co.uk/api/send-bulk-emails/${id}?action=SendMailtoAll&company_id=${companyId()}&login_id=${loginId()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`Failed to send email: ${response.status}`);

      setMessage("Reminder emails sent successfully!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  // if (error) return <p className="error-message">{error}</p>;
  const CheckIcon = () => (
    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
      <span className="text-white text-xs">✓</span>
    </div>
  );

  //form data

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formRef = useRef();

  useEffect(() => {
    const fetchFormData = async () => {
      const companyId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.company_id;
        return user_id || NULL;
      };

      const loginId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.login_id;
        return user_id || NULL;
      };
      setLoading(true);
      setError("");
      try {
        const url = `https://annex.sofinish.co.uk/api/forms/${id}?action=GetAnnexForm&annex_id=${id}&company_id=${companyId()}&login_id=${loginId()}`;
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
        console.log("data:-", data);

        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  console.log("kjsklhdgkj:-p", formData);

  if (loading)
    return (
      <p className="flex flex-col items-center justify-center min-h-screen">
        <CircularProgress />
        <p className="text-black font-medium text-xl">wait...</p>
      </p>
    );
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#FFF5EC]"; // Yellow for pending
      case "approved":
        return "bg-[#EEF8EC]"; // Green for approved
      case "rejected":
        return "bg-red-300";
      // Red for rejected
      case "pending-email":
        return "bg-[#7D6CC8]";
      default:
        return "bg-white"; // Gray for unknown statuses
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="text-green-500 text-2xl" />;
      case "pending":
        return <RemoveCircleIcon className="text-orange-500 text-2xl" />;
      case "pending-email":
        return <MailIcon className="text-[#7D6CC8] text-2xl" />;
      case "success-email":
        return <MailIcon className="text-green-500 text-2xl" />;
      default:
        return;
    }
  };

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  console.log(user);

  const shipmentProgress = (total, emails) => {
    const percentage = (emails / total) * 100;
    return percentage;
  };

  return (
    <div className="w-full flex flex-col p-6 min-h-screen ">
      {/* header */}
      <div>
        <header className="flex justify-end items-center">
          {/* {formData?.map((item) => (
            <h1 className="text-xl font-bold text-center flex-grow ">
              {item?.annex_id}
            </h1>
          ))} */}
          {/* CMAU2312086 - BLMCB0258247 - CMA CGM - MEX202405 */}

          {user?.role_id === 3 ? (
            ""
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: "#6F5CC5" }}
              onClick={sendReminderEmail}
              className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"
            >
              Send Reminder to All
            </Button>
          )}

          {/* <button className="create-btn">Create ANNEX Form</button> */}
        </header>
      </div>

      {/* left-section && right-section */}
      {formData?.map((item) => (
        <div key={item.id} className="flex gap-2">
          {item?.signature && item.signature.length > 0 ? (
            // item?.signature.map((sign) => (
            <>
              {/* ---------------Left-section ------------------------------*/}
              <div className="min-h-screen w-[75%]">
                <Card className="p-2">
                  <div className="">
                    <div ref={formRef}>
                      <div className="flex flex-col items-center space-y-2">
                        <h2 className="text-xl font-bold text-center ">
                          ANNEX VII
                        </h2>
                        <div className=" p-2 items-center flex flex-col ">
                          <p className="text-sm ">
                            INFORMATION ACCOMPANYING SHIPMENTS OF WASTES
                            REFERRED TO IN ARTICLE 3(2) AND (4)
                          </p>
                          <p className="text-sm">
                            (revised version as per Official Journal of the
                            European Union 22.12.2020 L431/13) REGULATION (EU)
                            2020/2174
                          </p>
                        </div>
                        <h5 className="text-sm md:text-base text-center font-semibold">
                          {/* CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105 */}
                          {item?.annex_id}
                        </h5>
                      </div>

                      {/* Grid Layout for Responsive Sections */}

                      <div className="">
                        <div className="py-1">
                          <h4 className="text-base md:text-xl   font-semibold">
                            Consignment Information
                          </h4>
                        </div>
                        <div className={` grid grid-cols-1 md:grid-cols-2 `}>
                          <Box
                            className={`border p-4 ${getStatusColor(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email
                              )
                                ? "approved"
                                : "pending"
                            )}`}
                          >
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
                                  <strong>Contact Person:</strong>
                                  {item?.contact_person}
                                </p>
                                <p>
                                  <strong>Tel:</strong>
                                  {item?.contact_number}
                                </p>
                                <p>
                                  <strong>Fax:</strong>
                                  {item?.fax}
                                </p>
                                <p>
                                  <strong>Email:</strong>
                                  {item?.email}
                                </p>
                              </div>
                              <div className="flex justify-end mt-auto">
                                <div className="flex flex-col items-center space-y-2">
                                  {item?.signature?.some(
                                    (sign) => sign.signed_by === item?.email
                                  ) && (
                                    <img
                                      src={`https://annex.sofinish.co.uk/${
                                        item?.signature?.find(
                                          (sign) =>
                                            sign.signed_by === item?.email
                                        )?.signature_path || ""
                                      }`}
                                      alt="Signature"
                                      className="w-30 h-10"
                                    />
                                  )}
                                  {getStatusIcon(
                                    item?.signature?.some(
                                      (sign) => sign.signed_by === item?.email
                                    )
                                      ? "completed"
                                      : "pending"
                                  )}
                                </div>
                              </div>
                            </div>
                          </Box>
                          <Box
                            className={`border p-4 ${getStatusColor(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email2
                              )
                                ? "approved"
                                : "pending"
                            )}`}
                          >
                            <h3 className="font-bold">2. Consignee</h3>
                            <div className="flex  justify-between">
                              <div>
                                <p>
                                  <strong>Name:</strong> {item?.consignee_name}
                                </p>
                                <p>
                                  <strong>Address:</strong>{" "}
                                  {item?.consignee_address}
                                </p>
                                <p>
                                  <strong>Contact Person:</strong>{" "}
                                  {item?.contPerson}
                                </p>
                                <p>
                                  <strong>Tel:</strong>
                                  {item?.consignee_contact}
                                </p>
                                <p>
                                  <strong>Fax:</strong>
                                  {item?.fax2}
                                </p>
                                <p>
                                  <strong>Email:</strong>
                                  {item?.email2}
                                </p>
                              </div>
                              <div className="flex justify-end mt-auto">
                                <div className="flex flex-col items-center space-y-2">
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
                                    />
                                  )}
                                  {getStatusIcon(
                                    item?.signature?.some(
                                      (sign) => sign.signed_by === item?.email2
                                    )
                                      ? "completed"
                                      : "pending"
                                  )}
                                </div>
                              </div>
                            </div>
                          </Box>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2  ">
                          <Box className={`border p-4 `}>
                            <div className="flex">
                              <h3 className="font-bold mr-1">
                                3. Actual Quantity:
                              </h3>
                              <p>
                                {item?.number_of_shipments}&nbsp;-&nbsp;
                                <span className="font-semibold mr-1">
                                  Tonnes(Mg) m3:
                                </span>
                                {item?.weight}
                              </p>
                            </div>
                          </Box>

                          <Box className={`border p-4 `}>
                            <div className="flex">
                              <h3 className="font-bold mr-1">
                                4. Actual Date of Shipment:
                              </h3>
                              <p className="font-semibold">{item?.aShipdate}</p>
                            </div>
                          </Box>
                        </div>
                        <div
                          className={`grid grid-cols-1 ${
                            item?.carriers?.length === 1
                              ? "md:grid-cols-1"
                              : item.carriers.length === 2
                              ? "md:grid-cols-2"
                              : item.carriers.length === 4
                              ? "md:grid-cols-2"
                              : item.carriers.length === 5
                              ? "md:grid-cols-3 md:[&>*:nth-child(n+4)]:col-span-2"
                              : "md:grid-cols-3"
                          }`}
                        >
                          {item?.carriers.map((data, index) => (
                            <Box
                              key={data?.id}
                              className={`border p-4 ${getStatusColor(
                                item?.signature?.some(
                                  (sign) => sign.signed_by === data?.email
                                )
                                  ? "approved"
                                  : "pending"
                              )}`}
                            >
                              <h3 className="font-bold">
                                5.({String.fromCharCode(97 + index)}){" "}
                                {ordinalSuffix(index)} Carrier
                              </h3>
                              <div className="flex justify-between">
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
                                      ? "(signed)"
                                      : ""}
                                  </p>
                                </div>
                                <div className="flex justify-end mt-auto">
                                  <div className="flex flex-col items-center space-y-2">
                                    {item?.signature?.some(
                                      (sign) => sign.signed_by === data?.email
                                    ) && (
                                      <img
                                        src={`https://annex.sofinish.co.uk/${
                                          item?.signature?.find(
                                            (sign) =>
                                              sign.signed_by === data?.email
                                          )?.signature_path || ""
                                        }`}
                                        alt="Signature"
                                        className="w-30 h-10"
                                      />
                                    )}

                                    {getStatusIcon(
                                      item?.signature?.some(
                                        (sign) => sign.signed_by === data?.email
                                      )
                                        ? "completed"
                                        : "pending"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Box>
                          ))}
                        </div>
                        {item?.waste_generator.map((data2) => (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 ">
                              <Box
                                className={`border p-4 ${getStatusColor(
                                  item?.signature?.some(
                                    (sign) => sign.signed_by === data2?.email
                                  )
                                    ? "approved"
                                    : "pending"
                                )}`}
                              >
                                <h3 className="font-bold">
                                  6. Waste generator (Original producer/new
                                  producer/collector):
                                </h3>
                                <div className="flex  justify-between">
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
                                  <div className="flex justify-end mt-auto">
                                    <div className="flex flex-col items-center space-y-2">
                                      {item?.signature?.some(
                                        (sign) =>
                                          sign.signed_by === data2?.email
                                      ) && (
                                        <img
                                          src={`https://annex.sofinish.co.uk/${
                                            item?.signature?.find(
                                              (sign) =>
                                                sign.signed_by === data2?.email
                                            )?.signature_path || ""
                                          }`}
                                          alt="Signature"
                                          className="w-30 h-10"
                                        />
                                      )}
                                      {getStatusIcon(
                                        item?.signature?.some(
                                          (sign) =>
                                            sign.signed_by === data2?.email
                                        )
                                          ? "completed"
                                          : "pending"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Box>
                              <div className="grid grid-cols-1 ">
                                <Box
                                  className={`border p-4 ${getStatusColor()}`}
                                >
                                  <h3 className="font-bold mr-1">
                                    8. Recovery operation (or if appropriate
                                    disposal operation in the case of waste
                                    referred to in Article 3(4)):
                                    <span>{item?.recovery_operation_name}</span>
                                  </h3>
                                </Box>
                                <Box className="border  p-4">
                                  <h3 className="font-bold">
                                    9. Usual description of the waste:
                                  </h3>
                                  <p>{item?.usual_des_of_the_waste}</p>
                                </Box>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 ">
                              <Box
                                className={`border p-4 ${getStatusColor(
                                  item?.signature?.some(
                                    (sign) =>
                                      sign.signed_by === data2?.recovery_email
                                  )
                                    ? "approved"
                                    : "pending"
                                )}`}
                              >
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
                                    <div className="flex flex-col items-center space-y-2">
                                      {item?.signature?.some(
                                        (sign) =>
                                          sign.signed_by ===
                                          data2?.recovery_email
                                      ) && (
                                        <img
                                          src={`https://annex.sofinish.co.uk/${
                                            item?.signature?.find(
                                              (sign) =>
                                                sign.signed_by ===
                                                data2?.recovery_email
                                            )?.signature_path || ""
                                          }`}
                                          alt="Signature"
                                          className="w-30 h-10"
                                        />
                                      )}
                                      {getStatusIcon(
                                        item?.signature?.some(
                                          (sign) =>
                                            sign.signed_by ===
                                            data2?.recovery_email
                                        )
                                          ? "completed"
                                          : "pending"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Box>

                              <Box className={`border p-4 ${getStatusColor()}`}>
                                <h3 className="font-bold">
                                  10. Waste identification (fill in relevant
                                  codes):
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
                                  <div className="flex justify-end mt-auto">
                                    {getStatusIcon()}
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
                                  <h3 className="font-bold">
                                    Export/dispatch:
                                  </h3>
                                  <p className="font-medium">
                                    {item?.countriesOrstates_exp_dis}
                                  </p>
                                </div>
                              </Box>

                              <Box className="border  p-4">
                                <div className="text-center">
                                  <h3 className="font-bold">Transit:</h3>
                                  <p className="font-medium">
                                    {item?.countriesOrstates_transit}
                                  </p>
                                </div>
                              </Box>
                              <Box className="border  p-4">
                                <div className="text-center">
                                  <h3 className="font-bold">Import/arrival:</h3>
                                  <p className="font-medium">
                                    {item?.countriesOrstates_imprt_arr}
                                  </p>
                                </div>
                              </Box>
                            </div>

                            <div className="grid grid-cols-1 ">
                              <Box className={`border p-4 ${getStatusColor()}`}>
                                <h3 className="font-bold">
                                  12. Declaration of the person who arranges the
                                  shipment:
                                  <span className="font-medium">
                                    I certify that the above information is
                                    complete and correct to the best of my
                                    knowledge.
                                  </span>
                                </h3>
                                <div className="flex mt-2 justify-between">
                                  <div className="flex items-center justify-between w-full ">
                                    <p>
                                      <strong className="font-bold mr-2">
                                        Name:
                                      </strong>
                                      {item?.declaration_name}
                                    </p>
                                    <p>
                                      <strong className="font-bold mr-2">
                                        Date:
                                      </strong>
                                      {item?.declaration_date}
                                    </p>
                                    <p>
                                      <strong className="font-bold mr-2">
                                        Signature:
                                      </strong>
                                      {/* (signed) */}
                                    </p>
                                  </div>

                                  <div className="flex justify-end mt-auto">
                                    <div className="flex flex-col items-center space-y-1">
                                      {item?.signature?.some(
                                        (sign) => sign.signed_by === item?.email
                                      ) && (
                                        <img
                                          src={`https://annex.sofinish.co.uk/${
                                            item?.signature?.find(
                                              (sign) =>
                                                sign.signed_by === item?.email
                                            )?.signature_path || ""
                                          }`}
                                          alt="Signature"
                                          className="w-30 h-10"
                                        />
                                      )}
                                      {getStatusIcon(
                                        item?.signature?.some(
                                          (sign) =>
                                            sign.signed_by === item?.email
                                        )
                                          ? "completed"
                                          : "pending"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>
                            <div className="grid grid-cols-1 ">
                              <Box className={`border p-4 ${getStatusColor()}`}>
                                <h3 className="font-bold">
                                  13. Signature upon receipt of the waste by the
                                  consignee:
                                </h3>
                                <div className="flex mt-2 justify-between">
                                  <div className="flex items-center justify-between w-full ">
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Name:
                                      </span>
                                      <div className="border-b border-black w-28">
                                        {item?.signature_exp_dis}
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Date:
                                      </span>
                                      <div className="border-b border-black w-28">
                                        {item?.signature_transit}
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Signature:
                                      </span>
                                      {/* <div className="border-b border-black w-28"></div> */}
                                    </div>
                                  </div>
                                  <div className="flex justify-end mt-auto">
                                    <div className="flex flex-col items-center space-y-1">
                                      {item?.signature?.some(
                                        (sign) =>
                                          sign.signed_by === item?.email2
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
                                        />
                                      )}
                                      {getStatusIcon(
                                        item?.signature?.some(
                                          (sign) =>
                                            sign.signed_by === item?.email2
                                        )
                                          ? "completed"
                                          : "pending"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>
                            <div className="grid grid-cols-1 ">
                              <Box className={`border p-4 ${getStatusColor()}`}>
                                <h3 className="font-bold text-center">
                                  TO BE COMPLETED BY THE RECOVERY FACILITY
                                </h3>
                                <h3 className="font-bold mt-1">
                                  14. Shipment received at recovery facility.
                                  Quantity received: ____________________ Tonnes
                                  (Mg) m³
                                </h3>
                                <div className="flex mt-3  justify-between">
                                  <div className="w-full flex items-center  justify-between">
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Name:
                                      </span>
                                      <div className="border-b border-black w-28">
                                        {item?.shipment_facility_name}
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Date:
                                      </span>
                                      <div className="border-b border-black w-28">
                                        {item?.shipment_facility_date}
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <span className="text-black font-bold mr-1">
                                        Signature:
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-end mt-auto">
                                    <div className="flex items-center space-y-1">
                                      {item?.signature?.some(
                                        (sign) =>
                                          sign.signed_by ===
                                          data2?.recovery_email
                                      ) && (
                                        <img
                                          src={`https://annex.sofinish.co.uk/${
                                            item?.signature?.find(
                                              (sign) =>
                                                sign.signed_by ===
                                                data2?.recovery_email
                                            )?.signature_path || ""
                                          }`}
                                          alt="Signature"
                                          className="w-30 h-10"
                                        />
                                      )}
                                      {getStatusIcon(
                                        item?.signature?.some(
                                          (sign) =>
                                            sign.signed_by ===
                                            data2?.recovery_email
                                        )
                                          ? "completed"
                                          : "pending"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>
                          </>
                        ))}
                        {/* bullet points */}
                        <div className="mt-2">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>
                              Information accompanying shipments of green-listed
                              waste and destined for recovery or waste destined
                              for laboratory analysis pursuant to Regulation
                              (EC) No 1013/2006.
                            </li>
                            <li>
                              If more than three carriers, attach information as
                              required in blocks 5 (a), (b), (c).
                            </li>
                            <li>
                              When the person who arranges the shipment is not
                              the producer or collector, information about the
                              producer or collector shall be provided.
                            </li>
                            <li>
                              The relevant code(s) as indicated in Annex IIIA to
                              Regulation (EC) No 1013/2006 are to be used, as
                              appropriate in sequence. Certain Basel entries
                              such as B1100, B3010, and B3020 are restricted to
                              particular waste streams only, as indicated in
                              Annex IIIA.
                            </li>
                            <li>
                              The BEU codes listed in Annex IIIB to Regulation
                              (EC) No 1013/2006 are to be used.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* ---------Right-section------------------------------- */}
              <div className="flex-1 w-[25%] ">
                <div className="bg-white rounded-lg shadow p-2">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Shipment Progress
                    </h2>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${shipmentProgress(7, 3)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {shipmentProgress(7, 3).toFixed(2)}%
                    </span>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-4">
                    <div className="flex w-full justify-between items-center border-b">
                      {/* Left Side Content */}
                      <div className="space-y-2">
                        <h2 className="font-semibold">
                          1. Person who arranges the shipment
                        </h2>
                        <div className="space-y-0.2">
                          <p>
                            <strong>Name:</strong>
                            {item?.company_name}
                          </p>
                          <p>
                            <strong>Phone:</strong>
                            {item?.contact_number}
                          </p>
                        </div>
                      </div>

                      {/* Right Side Icons */}
                      <div className="flex space-x-2">
                        {getStatusIcon(
                          item?.signature?.some(
                            (sign) => sign.signed_by === item?.email
                          )
                            ? "success-email"
                            : "pending-email"
                        )}
                        {getStatusIcon(
                          item?.signature?.some(
                            (sign) => sign.signed_by === item?.email
                          )
                            ? "completed"
                            : "pending"
                        )}
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="flex w-full justify-between items-center border-b">
                      {/* Left Side Content */}
                      <div className="space-y-2">
                        <h2 className="font-semibold">2. Consignee</h2>
                        <div className="space-y-0.2">
                          <p>
                            <strong>Name:</strong> {item?.consignee_name}
                          </p>
                          <p>
                            <strong>Phone:</strong>
                            {item?.contact_number}
                          </p>
                        </div>
                      </div>

                      {/* Right Side Icons */}
                      <div className="flex space-x-2">
                        {getStatusIcon(
                          item?.signature?.some(
                            (sign) => sign.signed_by === item?.email2
                          )
                            ? "success-email"
                            : "pending-email"
                        )}
                        {getStatusIcon(
                          item?.signature?.some(
                            (sign) => sign.signed_by === item?.email2
                          )
                            ? "completed"
                            : "pending"
                        )}
                      </div>
                    </div>
                    {/* 3 */}
                    {item?.carriers.map((data, index) => (
                      <div className="flex w-full justify-between items-center border-b">
                        {/* Left Side Content */}

                        <div key={index} className="space-y-2">
                          <h3 className="font-semibold">
                            5.({String.fromCharCode(97 + index)}){" "}
                            {ordinalSuffix(index)} Carrier
                          </h3>

                          <div className="space-y-0.2">
                            <p>
                              <strong>Name:</strong> {data?.name}
                            </p>

                            <p>
                              <strong>Phone:</strong>
                              {data?.phone}
                            </p>
                          </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex space-x-2">
                          {getStatusIcon(
                            item?.signature?.some(
                              (sign) => sign.signed_by === data?.email
                            )
                              ? "success-email"
                              : "pending-email"
                          )}
                          {getStatusIcon(
                            item?.signature?.some(
                              (sign) => sign.signed_by === data?.email
                            )
                              ? "completed"
                              : "pending"
                          )}
                        </div>
                      </div>
                    ))}

                    {/* 4 */}
                    {item?.waste_generator.map((data2) => (
                      <>
                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              6. Waste generator (Original producer/new
                              producer/collector):
                            </h2>
                            <p>
                              <strong>Name:</strong>
                              {data2?.name}
                            </p>
                            <p>
                              <strong>Phone:</strong>
                              {data2?.mobile}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex space-x-2">
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === data2?.email
                              )
                                ? "success-email"
                                : "pending-email"
                            )}
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === data2?.email
                              )
                                ? "completed"
                                : "pending"
                            )}
                          </div>
                        </div>
                        {/* 5 */}
                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              7. Recovery facility
                            </h2>
                            <p>
                              <strong>Name:</strong>
                              {data2?.recovery_name}
                            </p>
                            <p>
                              <strong>Phone:</strong>
                              {data2?.recovery_tel}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex space-x-2">
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              )
                                ? "success-email"
                                : "pending-email"
                            )}
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              )
                                ? "completed"
                                : "pending"
                            )}
                          </div>
                        </div>

                        {/* 6 */}

                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              10. Waste identification (fill in relevant codes)
                            </h2>
                            <p>
                              <strong>(i) Basel Annex IX:</strong>
                              {item?.basel_annex_ix}
                            </p>
                            <p>
                              <strong>(i) Basel Annex IX:</strong>
                              {item?.basel_annex_ix}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          {/* <div className="flex space-x-2">
                        {getStatusIcon("pending-email")}
                        {getStatusIcon("pending")}
                      </div> */}
                        </div>
                        {/* 7 */}
                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              12. Declaration of the person who arranges the
                              shipment
                            </h2>
                            <p>
                              <strong>Name:</strong>
                              {item?.declaration_name}
                            </p>
                            <p>
                              <strong>Date:</strong>
                              {item?.item?.declaration_date}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex space-x-2">
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email
                              )
                                ? "success-email"
                                : "pending-email"
                            )}
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email
                              )
                                ? "completed"
                                : "pending"
                            )}
                          </div>
                        </div>
                        {/* 8 */}
                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              13. Signature upon receipt of the waste by the
                              consignee:
                            </h2>
                            <p>
                              <strong>Name:</strong>
                              {item?.signature_exp_dis}
                            </p>
                            <p>
                              <strong>Phone:</strong>
                              {item?.signature_transit}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex space-x-2">
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email2
                              )
                                ? "success-email"
                                : "pending-email"
                            )}
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) => sign.signed_by === item?.email2
                              )
                                ? "completed"
                                : "pending"
                            )}
                          </div>
                        </div>

                        {/* 9 */}
                        <div className="flex w-full justify-between items-center border-b">
                          {/* Left Side Content */}
                          <div className="space-y-2">
                            <h2 className="font-semibold">
                              14. Shipment received at recovery facility
                            </h2>
                            <p>
                              <strong>Name:</strong>
                              {item?.shipment_facility_name}
                            </p>
                            <p>
                              <strong>Phone:</strong>
                              {item?.shipment_facility_date}
                            </p>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex space-x-2">
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              )
                                ? "success-email"
                                : "pending-email"
                            )}
                            {getStatusIcon(
                              item?.signature?.some(
                                (sign) =>
                                  sign.signed_by === data2?.recovery_email
                              )
                                ? "completed"
                                : "pending"
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // ))
            <Page item={item} /> // Handle empty array case
          )}
        </div>
      ))}
    </div>
  );
};

const Page = ({ item }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#FFF5EC]"; // Yellow for pending
      case "approved":
        return "bg-[#EEF8EC]"; // Green for approved
      case "rejected":
        return "bg-red-300";
      // Red for rejected
      case "pending-email":
        return "bg-[#7D6CC8]";
      default:
        return "bg-white"; // Gray for unknown statuses
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="text-green-500 text-2xl" />;
      case "pending":
        return <RemoveCircleIcon className="text-orange-500 text-2xl" />;
      case "pending-email":
        return <MailIcon className="text-[#7D6CC8] text-2xl" />;
      case "success-email":
        return <MailIcon className="text-green-500 text-2xl" />;
      default:
        return;
    }
  };

  const shipmentProgress = (total, emails) => {
    const percentage = (emails / total) * 100;
    return percentage;
  };
  return (
    <>
      {/* ---------------Left-section ------------------------------*/}
      <div className="min-h-screen w-[75%]">
        <Card className="p-2">
          <div className="">
            <div>
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
                  {/* CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105 */}
                  {item?.annex_id}
                </h5>
              </div>

              {/* Grid Layout for Responsive Sections */}

              <div className="">
                <div className="py-1">
                  <h4 className="text-base md:text-xl   font-semibold">
                    Consignment Information
                  </h4>
                </div>
                <div className={` grid grid-cols-1 md:grid-cols-2 `}>
                  <Box className={`border p-4 ${getStatusColor("pending")}`}>
                    <h3 className="font-semibold">
                      1. Person who arranges the shipment
                    </h3>
                    <div className="flex  justify-between">
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
                          <strong>Tel:</strong>
                          {item?.contact_number}
                        </p>
                        <p>
                          <strong>Fax:</strong>
                          {item?.fax}
                        </p>
                        <p>
                          <strong>Email:</strong>
                          {item?.email}
                        </p>
                      </div>
                      <div className="flex justify-end mt-auto">
                        {getStatusIcon("pending")}
                      </div>
                    </div>
                  </Box>
                  <Box className={`border p-4 ${getStatusColor("pending")}`}>
                    <h3 className="font-semibold">2. Consignee</h3>
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
                          <strong>Tel:</strong>
                          {item?.consignee_contact}
                        </p>
                        <p>
                          <strong>Fax:</strong>
                          {item?.fax2}
                        </p>
                        <p>
                          <strong>Email:</strong>
                          {item?.email2}
                        </p>
                      </div>
                      <div className="flex justify-end mt-auto">
                        {getStatusIcon("pending")}
                      </div>
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
                        <span className="font-semibold mr-1">
                          Tonnes(Mg) m3:
                        </span>
                        {item?.weight}
                      </p>
                    </div>
                  </Box>
                  <Box className={`border p-4 `}>
                    <h3 className="font-semibold">
                      4. Actual Date of Shipment
                    </h3>
                    <p>{item?.aShipdate}</p>
                  </Box>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    item?.carriers?.length === 1
                      ? "md:grid-cols-1"
                      : item.carriers.length === 2
                      ? "md:grid-cols-2"
                      : item.carriers.length === 4
                      ? "md:grid-cols-2"
                      : item.carriers.length === 5
                      ? "md:grid-cols-3 md:[&>*:nth-child(n+4)]:col-span-2"
                      : "md:grid-cols-3"
                  }`}
                >
                  {item?.carriers.map((data, index) => (
                    <Box
                      key={data?.id}
                      className={`border p-4 ${getStatusColor("pending")}`}
                    >
                      <h3 className="font-semibold">
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
                            (signed)
                          </p>
                        </div>
                        <div className="flex justify-end mt-auto">
                          {getStatusIcon("pending")}
                        </div>
                      </div>
                    </Box>
                  ))}
                </div>
                {item?.waste_generator.map((data2) => (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                      <Box
                        className={`border p-4 ${getStatusColor("pending")}`}
                      >
                        <h3 className="font-semibold">
                          6. Waste generator (Original producer/new
                          producer/collector):
                        </h3>
                        <div className="flex  justify-between">
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
                              <strong className="mr-2">Contact Person:</strong>
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
                          <div className="flex justify-end mt-auto">
                            {getStatusIcon("pending")}
                          </div>
                        </div>
                      </Box>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 ${getStatusColor()}`}>
                          <h3 className="font-bold mr-1">
                            8. Recovery operation (or if appropriate disposal
                            operation in the case of waste referred to in
                            Article 3(4)):
                            <span>{item?.recovery_operation_name}</span>
                          </h3>
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
                      <Box
                        className={`border p-4 ${getStatusColor("pending")}`}
                      >
                        <h3 className="font-semibold">7. Recovery facility:</h3>
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
                              <strong className="mr-2">Contact Person:</strong>
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
                            {getStatusIcon("pending")}
                          </div>
                        </div>
                      </Box>

                      <Box className={`border p-4 ${getStatusColor()}`}>
                        <h3 className="font-semibold">
                          10. Waste identification (fill in relevant codes):
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
                          <div className="flex justify-end mt-auto">
                            {getStatusIcon()}
                          </div>
                        </div>
                      </Box>
                    </div>
                  </>
                ))}
                <div className="grid grid-cols-1 ">
                  <Box className="border  p-4">
                    <h3 className="font-semibold">
                      11. Countries/states concerned:
                    </h3>
                  </Box>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 ">
                  <Box className="border  p-4">
                    <div className="text-center">
                      <h3 className="font-bold">Export/dispatch:</h3>
                      <p className="font-medium">
                        {item?.countriesOrstates_exp_dis}
                      </p>
                    </div>
                  </Box>

                  <Box className="border  p-4">
                    <div className="text-center">
                      <h3 className="font-bold">Transit:</h3>
                      <p className="font-medium">
                        {item?.countriesOrstates_transit}
                      </p>
                    </div>
                  </Box>
                  <Box className="border  p-4">
                    <div className="text-center">
                      <h3 className="font-bold">Import/arrival:</h3>
                      <p className="font-medium">
                        {item?.countriesOrstates_imprt_arr}
                      </p>
                    </div>
                  </Box>
                </div>

                <div className="grid grid-cols-1 ">
                  <Box className={`border p-4 ${getStatusColor()}`}>
                    <h3 className="font-semibold">
                      12. Declaration of the person who arranges the shipment: I
                      certify that the above information is complete and correct
                      to the best of my knowledge.
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
                          {/* (signed) */}
                        </p>
                      </div>

                      <div className="flex justify-end mt-auto">
                        {getStatusIcon("pending")}
                      </div>
                    </div>
                  </Box>
                </div>
                <div className="grid grid-cols-1 ">
                  <Box className={`border p-4 ${getStatusColor()}`}>
                    <h3 className="font-semibold">
                      13. Signature upon receipt of the waste by the consignee:
                    </h3>
                    <div className="flex mt-2 justify-between">
                      <div className="flex items-center justify-between w-full ">
                        <div className="flex">
                          <span className="text-black mr-1">Name:</span>
                          <div className="border-b border-black w-28">
                            {item?.signature_exp_dis}
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-black mr-1">Date:</span>
                          <div className="border-b border-black w-28">
                            {item?.signature_transit}
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-black mr-1">Signature:</span>
                          <div className="border-b border-black w-28"></div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-auto">
                        {getStatusIcon("pending")}
                      </div>
                    </div>
                  </Box>
                </div>
                <div className="grid grid-cols-1 ">
                  <Box className={`border p-4 ${getStatusColor()}`}>
                    <h3 className="font-semibold text-center">
                      TO BE COMPLETED BY THE RECOVERY FACILITY
                    </h3>
                    <h3 className="font-semibold mt-1">
                      14. Shipment received at recovery facility. Quantity
                      received: ____________________ Tonnes (Mg) m³
                    </h3>
                    <div className="flex mt-3  justify-between">
                      <div className="w-full flex items-center  justify-between">
                        <div className="flex">
                          <span className="text-black mr-1">Name:</span>
                          <div className="border-b border-black w-28">
                            {item?.shipment_facility_name}
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-black mr-1">Date:</span>
                          <div className="border-b border-black w-28">
                            {item?.shipment_facility_date}
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-black mr-1">Signature:</span>
                          <div className="border-b border-black w-28"></div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-auto">
                        {getStatusIcon("pending")}
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
          </div>
        </Card>
      </div>

      {/* ---------Right-section------------------------------- */}
      <div className="flex-1 w-[25%] ">
        <div className="bg-white rounded-lg shadow p-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Shipment Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${shipmentProgress(7, 3)}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {shipmentProgress(7, 3).toFixed(2)}%
            </span>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">1. Consignment Information</h2>
                <div className="space-y-0.2">
                  <p>
                    <strong>Name:</strong>
                    {item?.company_name}
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    {item?.contact_number}
                  </p>
                </div>
              </div>

              {/* Right Side Icons */}
              <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div>
            </div>
            {/* 2 */}
            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">2. Consignee</h2>
                <div className="space-y-0.2">
                  <p>
                    <strong>Name:</strong> {item?.consignee_name}
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    {item?.contact_number}
                  </p>
                </div>
              </div>

              {/* Right Side Icons */}
              <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div>
            </div>
            {/* 3 */}
            {item?.carriers.map((data, index) => (
              <div className="flex w-full justify-between items-center border-b">
                {/* Left Side Content */}

                <div key={index} className="space-y-2">
                  <h3 className="font-semibold">
                    5.({String.fromCharCode(97 + index)}) {ordinalSuffix(index)}{" "}
                    Carrier
                  </h3>

                  <div className="space-y-0.2">
                    <p>
                      <strong>Name:</strong> {data?.name}
                    </p>

                    <p>
                      <strong>Phone:</strong>
                      {data?.phone}
                    </p>
                  </div>
                </div>

                {/* Right Side Icons */}
                <div className="flex space-x-2">
                  {getStatusIcon("pending-email")}
                  {getStatusIcon("pending")}
                </div>
              </div>
            ))}

            {/* 4 */}
            {item?.waste_generator.map((data2) => (
              <>
                <div className="flex w-full justify-between items-center border-b">
                  {/* Left Side Content */}
                  <div className="space-y-2">
                    <h2 className="font-semibold">
                      6. Waste generator (Original producer/new
                      producer/collector):
                    </h2>
                    <p>
                      <strong>Name:</strong>
                      {data2?.name}
                    </p>
                    <p>
                      <strong>Phone:</strong>
                      {data2?.mobile}
                    </p>
                  </div>

                  {/* Right Side Icons */}
                  <div className="flex space-x-2">
                    {getStatusIcon("pending-email")}
                    {getStatusIcon("pending")}
                  </div>
                </div>
                {/* 5 */}
                <div className="flex w-full justify-between items-center border-b">
                  {/* Left Side Content */}
                  <div className="space-y-2">
                    <h2 className="font-semibold">7. Recovery facility</h2>
                    <p>
                      <strong>Name:</strong>
                      {data2?.recovery_name}
                    </p>
                    <p>
                      <strong>Phone:</strong>
                      {data2?.recovery_tel}
                    </p>
                  </div>

                  {/* Right Side Icons */}
                  <div className="flex space-x-2">
                    {getStatusIcon("pending-email")}
                    {getStatusIcon("pending")}
                  </div>
                </div>
              </>
            ))}
            {/* 6 */}

            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">
                  10. Waste identification (fill in relevant codes)
                </h2>
                <p>
                  <strong>(i) Basel Annex IX:</strong>
                  {item?.basel_annex_ix}
                </p>
                <p>
                  <strong>(i) Basel Annex IX:</strong>
                  {item?.basel_annex_ix}
                </p>
              </div>

              {/* Right Side Icons */}
              {/* <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div> */}
            </div>
            {/* 7 */}
            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">
                  12. Declaration of the person who arranges the shipment
                </h2>
                <p>
                  <strong>Name:</strong>
                  {item?.declaration_name}
                </p>
                <p>
                  <strong>Name:</strong>
                  {item?.declaration_name}
                </p>
              </div>

              {/* Right Side Icons */}
              <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div>
            </div>
            {/* 8 */}
            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">
                  14. Signature upon receipt of the waste by the consignee:
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {item?.signature_exp_dis}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span>{" "}
                  {item?.signature_transit}
                </p>
              </div>

              {/* Right Side Icons */}
              <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div>
            </div>

            {/* 9 */}
            <div className="flex w-full justify-between items-center border-b">
              {/* Left Side Content */}
              <div className="space-y-2">
                <h2 className="font-semibold">
                  15. Shipment received at recovery facility
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {item?.shipment_facility_name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span>{" "}
                  {item?.shipment_facility_date}
                </p>
              </div>

              {/* Right Side Icons */}
              <div className="flex space-x-2">
                {getStatusIcon("pending-email")}
                {getStatusIcon("pending")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnexVII;
