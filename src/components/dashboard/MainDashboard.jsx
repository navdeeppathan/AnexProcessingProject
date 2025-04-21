// import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import { Card, Box } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Annex ID search
  const [totalForms, setTotalForm] = useState(0);
  const [totalEmails, setTotalEmail] = useState(0);
  const [doneSignatures, setSignature] = useState(0);

  //download pdf
  const [loadingpdf, setLoadingpdf] = useState(false);
  const [selectedAnnexId, setSelectedAnnexId] = useState(null);
  const handleSettingsClick = (annex_id) => {
    console.log("handleSettingsClick:-", annex_id);
    setSelectedAnnexId(annex_id);
    // setLoadingpdf(true);
    // setTimeout(() => {
    //   document.getElementById("download-btn")?.click();
    // }, 500);
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const companyId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.company_id || null;
  };

  const loginId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.login_id || null;
  };

  const fetchFormData = async () => {
    // setLoading(true);
    setError("");

    try {
      const url = `https://annex.sofinish.co.uk/api/companyforms?id=${companyId()}&action=companydashboard&company_id=${companyId()}&login_id=${loginId()}&from=${fromDate}&to=${toDate}&search=${searchQuery}`;

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
      setFormData(data.applications);
      setSignature(data.total_done_signatures);
      setTotalEmail(data.total_emails);
      setTotalForm(data.total_forms);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, [fromDate, toDate, searchQuery]);

  // Pagination logic
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return formData.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress />
        <p className="text-black font-medium text-xl">Loading...</p>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 text-center mt-5">Error: {error}</p>;

  return (
    <div className="px-5 min-h-screen">
      <main className="flex-1 p-5 bg-[#f4f4f9]">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            className="create-btn"
            onClick={() => navigate("/dashboard/annex-form")}
          >
            Create ANNEX Form
          </button>
        </header>

        {/* Statistics */}
        <div className="stats-cards grid grid-cols-4 gap-4 mb-4">
          <div className="card purple">
            Total Number of Annex Forms <h2>{totalForms}</h2>
          </div>
          <div className="card light-blue">
            Total Requests <h2>{totalEmails}</h2>
          </div>
          <div className="card blue">
            Pending Signatures <h2>{totalEmails - doneSignatures}</h2>
          </div>
          <div className="card orange">
            Done Signatures <h2>{doneSignatures}</h2>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex justify-between items-center mb-4">
          <TextField
            type="date"
            label="From Date"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-100"
          />
          <TextField
            type="date"
            label="To Date"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-100"
          />
          <TextField
            type="text"
            label="Search by Annex Number"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-100"
          />
        </div>

        {/* Data Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Annex</th>
              <th>Reference Name</th>
              <th colSpan="3">Request - Pending - Signed</th>
              <th>Status</th>
              <th>Created Date</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().length > 0 ? (
              getPaginatedData()
                .filter(
                  (company) =>
                    company?.email_count - company?.signature_count !== 0
                )
                .map((company) => (
                  <tr key={company?.id}>
                    <td>{company?.annex_id}</td>
                    <td>{company?.ref_name}</td>
                    <td colSpan="3">
                      <span className="total">{company?.email_count}</span> -
                      <span className="pending">
                        {company?.email_count - company?.signature_count}
                      </span>{" "}
                      -
                      <span className="complete">
                        {company?.signature_count}
                      </span>
                    </td>
                    <td>
                      <span className="status active">Active</span>
                    </td>
                    <td>
                      <span className="complete">
                        {new Date(company?.created_at).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}
                      </span>
                    </td>
                    <td colSpan="2" className="flex gap-2">
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#6b46c1" }}
                        onClick={() =>
                          navigate(`/dashboard/anexV/${company?.id}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleSettingsClick(company?.id)}
                        variant="contained"
                        sx={{ bgcolor: "#6b46c1" }}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="contained"
          >
            Previous
          </Button>
          <span className="text-lg font-semibold">Page {currentPage}</span>
          <Button
            onClick={nextPage}
            disabled={currentPage * itemsPerPage >= formData.length}
            variant="contained"
          >
            Next
          </Button>
        </div>
      </main>

      <div className="">
        {selectedAnnexId && (
          <PdfDownload
            id={selectedAnnexId}
            // loadingpdf={loadingpdf}
            // setLoadingpdf={setLoadingpdf}
          />
        )}
      </div>
    </div>
  );
};

export default MainDashboard;

const PdfDownload = ({ id }) => {
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

  console.log("formdata:-", id);

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
    const pdfContainer = formRef.current;
    if (!pdfContainer) return;

    setLoadingPDF(true);

    // Make the container visible
    Object.assign(pdfContainer.style, {
      position: "relative",
      opacity: "1",
      width: "100%",
      height: "auto",
    });

    await new Promise((resolve) => setTimeout(resolve, 100)); // Give DOM time to render

    try {
      const canvas = await html2canvas(pdfContainer, {
        scale: window.devicePixelRatio || 3,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight > 297 ? 300 : imgHeight
      );

      pdf.save(`Annex-${id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // setLoadingpdf(false);
      setLoadingPDF(false);

      setTimeout(() => {
        Object.assign(pdfContainer.style, {
          position: "fixed",
          opacity: "0",
          width: "0",
          height: "0",
        });
      }, 500);
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
    <div>
      {formData?.map(
        (item) => (
          // item?.signature && item.signature.length > 0 ? (
          <Card className="p-8">
            <div className="bg-white p-6 shadow-lg">
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
                  <h5 className="text-sm md:text-base text-center font-semibold">
                    {/* CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105 */}
                    {item?.annex_id}
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
                            />
                          )}
                        </div>
                      </div>
                    </Box>
                    <Box className="border  p-4">
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
                        <div>
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
                      <Box key={data?.id} className="border  p-4">
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
                              {item?.signature?.some(
                                (sign) => sign.signed_by === data?.email
                              )
                                ? "(signed)"
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
                    ))}
                  </div>
                  {item?.waste_generator.map((data2) => (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <Box className={`border p-4`}>
                          <h3 className="font-semibold">
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
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                        <div className="grid grid-cols-1 ">
                          <Box className={`border p-4 `}>
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
                        <Box className={`border p-4 `}>
                          <h3 className="font-semibold">
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
                                />
                              )}
                            </div>
                          </div>
                        </Box>

                        <Box className={`border p-4 `}>
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
                          </div>
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
                        <Box className={`border p-4 `}>
                          <h3 className="font-semibold">
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
                                {/* (signed) */}
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
                                />
                              )}
                            </div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
                          <h3 className="font-semibold">
                            13. Signature upon receipt of the waste by the
                            consignee:
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
                                <span className="text-black mr-1">
                                  Signature:
                                </span>
                                {/* <div className="border-b border-black w-28"></div> */}
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
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </Box>
                      </div>
                      <div className="grid grid-cols-1 ">
                        <Box className={`border p-4 `}>
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
                                <span className="text-black mr-1">
                                  Signature:
                                </span>
                                {/* <div className="border-b border-black w-28"></div> */}
                              </div>
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
                                />
                              )}
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
                        Information accompanying shipments of green-listed waste
                        and destined for recovery or waste destined for
                        laboratory analysis pursuant to Regulation (EC) No
                        1013/2006.
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
                        B1100, B3010, and B3020 are restricted to particular
                        waste streams only, as indicated in Annex IIIA.
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
              <div className="px-24 flex justify-center items-center gap-4">
                <Button
                  id="download-btn"
                  onClick={handleDownloadPDF}
                  variant="contained"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>
        )
        // ) : null
      )}
    </div>
  );
};
