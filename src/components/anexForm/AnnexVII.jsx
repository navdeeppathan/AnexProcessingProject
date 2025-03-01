import React, { useEffect, useState } from "react";
import "./AnnexVII.css";

const AnnexVII = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://annex.sofinish.co.uk/api/forms/1",
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
        console.log("annexV data:-", data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);
  const sendReminderEmail = async () => {
    setMessage("");
    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/send-bulk-emails/1",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`Failed to send email: ${response.status}`);

      setMessage("Reminder emails sent successfully!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };
  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="error-message">{error}</p>;
  const CheckIcon = () => (
    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
      <span className="text-white text-xs">✓</span>
    </div>
  );
  const steps = [
    {
      id: 1,
      title: "Consignment Information",
      status: "completed",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 2,
      title: "Consignee",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 3,
      title: "(a) First Carrier",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 4,
      title: "(b) Second Carrier",
      status: "completed",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 5,
      title: "(c) Third Carrier",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 6,
      title: "Waste generator (Original producer/new producer/collector)",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 7,
      title: "Recovery facility",
      status: "completed",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 8,
      title: "Waste Identification (fill in relevant code(s))",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 9,
      title: "Declaration of the person who arranges the shipment",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 10,
      title: "Signature upon receipt of the waste by the consignee",
      status: "completed",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
    {
      id: 11,
      title: "Shipment received at recovery facility",
      status: "pending",
      name: "Mercosun LTD",
      phone: "+4221234567899",
    },
  ];
  return (
    <div className="w-full flex flex-col p-10 ">
      {/* header */}
      <div>
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            CMAU2312086 - BLMCB0258247 - CMA CGM - MEX202405
          </h1>
          <button
            onClick={sendReminderEmail}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Send Reminder to All
          </button>

          {/* <button className="create-btn">Create ANNEX Form</button> */}
        </header>
      </div>

      {/* left-section && right-section */}
      <div className="flex gap-2">
        {/* Left-section */}
        <main className="p-4">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-2">ANNEX VII</h1>
            <p className="text-sm text-gray-600">
              INFORMATION ACCOMPANYING SHIPMENTS OF WASTE AS REFERRED TO IN
              ARTICLE 3(2) AND (4)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">1. Consignment Information</h2>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Company:</span>{" "}
                  {formData.company_name}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Address:</span>{" "}
                  {formData.address}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Contact:</span>
                  {formData.contact_number}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
              </div>
            </div>

            {/* Consignee */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">2. Consignee</h2>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Company:</span>{" "}
                  {formData.consignee_name}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Address:</span>{" "}
                  {formData.consignee_address}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Contact:</span>{" "}
                  {formData.consignee_contact}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span> {formData.email2}
                </div>
              </div>
            </div>

            {/* Actual Quantity */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">3. Actual Quantity</h2>
              <div className="text-sm">
                <span className="font-medium">Tonnes (Mg):</span>
                {formData.number_of_shipments}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">4. Actual Quantity</h2>
              <div className="text-sm">
                <span className="font-medium">Tonnes (Mg):</span>{" "}
                {formData.number_of_shipments}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">5.(a) First Carrier</h2>
              <div className="text-sm">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Company:</span>{" "}
                    {formData.first_port_name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Address:</span>{" "}
                    {formData.firstAdd}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Contact:</span>{" "}
                    {formData.first_contPerson}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {formData.first_contNum}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Fax:</span>{" "}
                    {formData.first_fax}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">5.(b) Second Carrier:</h2>
              <div className="text-sm">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Company:</span>{" "}
                    {formData.second_port_name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Address:</span>{" "}
                    {formData.secondAdd}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Contact:</span>{" "}
                    {formData.second_contPerson}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {formData.second_email}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">5.(c) Third Carrier:</h2>
              <div className="text-sm">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Company:</span>{" "}
                    {formData.third_port_name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Address:</span>{" "}
                    {formData.thirdAdd}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Contact:</span>{" "}
                    {formData.third_contPerson}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {formData.third_email}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                6. Waste generator (Original producer/new producer/collector):
              </h2>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Company:</span>{" "}
                  {formData.waste_processor_name}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Address:</span>{" "}
                  {formData.waste_processor_address}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Contact:</span>
                  {formData.waste_processor_tel}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span>
                  {formData.waste_processor_email}
                </div>
              </div>
            </div>

            {/* Recovery Facility */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">7. Recovery Facility</h2>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Facility Name:</span>{" "}
                  {formData.processing_facility_name}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Address:</span>{" "}
                  {formData.processing_facility_address}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Contact:</span>{" "}
                  {formData.processing_facility_tel}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {formData.processing_facility_email}
                </div>
              </div>
            </div>

            {/* Waste Identification */}
            <div className="border rounded-lg p-4 ">
              <h2 className="font-semibold mb-3">
                8. Recovery operation (or if appropriate disposal operation in
                the case of waste referred to in Article 3(4)):
              </h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <p>{formData.recovery_operation_name}</p>
                </div>
              </div>
            </div>

            {/* Declaration Section */}
            <div className=" border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                9. Usual description of the waste:
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      {formData.usual_des_of_the_waste}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                10. Waste identification (fill in relevant codes):
              </h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <ul>
                    <li>(i)Basel Annex IX: B1100</li>
                    <li>(ii) OECD (if different from (i))</li>
                    <li>(iii)Annex IIA(4)</li>
                    <li>(iv) Annex IIIA(5)</li>
                    <li>(v) EC list of wastes: 110502</li>
                    <li>(vi) National code: </li>
                    <li>(vii) Other (specify): HS CODE: 26201900</li>
                  </ul>
                  {/* <p className="text-sm font-medium mb-2"></p>
                    <p className="text-sm font-medium mb-2">(ii) OECD (if different from (i))</p>
                    <p className="text-sm font-medium mb-2">(iii)Annex IIA(4)</p>
                    <p className="text-sm font-medium mb-2">(iv) Annex IIIA(5)</p>
                    <p className="text-sm font-medium mb-2">(v)  EC list of wastes: 110502</p>
                    <p className="text-sm font-medium mb-2">(vi) National code: </p>
                    <p className="text-sm font-medium mb-2">(vii)  Other (specify): HS CODE: 26201900</p> */}
                </div>
              </div>
            </div>

            <div className="col-span-2 border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                11. Countries/states concerned:
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border p-3">
                  <p className="text-sm font-medium">Export/dispatch:</p>
                  <p className="text-blue-600 font-semibold underline">
                    {formData.countriesOrstates_exp_dis}
                  </p>
                </div>
                <div className="border p-3">
                  <p className="text-sm font-medium">Transit:</p>
                  <p className="text-gray-600">
                    {formData.countriesOrstates_transit}
                  </p>
                </div>
                <div className="border p-3">
                  <p className="text-sm font-medium">Import/arrival:</p>
                  <p className="font-semibold">
                    {formData.countriesOrstates_imprt_arr}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                12. Declaration of the person who arranges the shipment: I
                certify that the above information is complete and correct to
                the best of my knowledge:
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Name:{formData.declaration_name}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Date: {formData.declaration_date}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Signature: {formData.signature_exp_dis}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 border rounded-lg p-4">
              <h2 className="font-semibold mb-3">
                13.Signature upon receipt of the waste by the consignee:
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Name: {formData.signature_transit}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Date: {formData.signature_transit}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">Signature: (Signed)</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 border rounded-lg p-4">
              <h2 className="font-semibold mb-3 text-center">
                TO BE COMPLETED BY THE RECOVERY FACILITY
              </h2>
              <h2 className="font-semibold mb-3">
                14. Shipment received at recovery facility. Quantity received:
                ____________________Tonnes (Mg) m³
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <p className="text-sm font-medium">
                    Name: {formData.shipment_received_at_facility}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">Date: </p>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">Signature: </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-600">
            <ul>
              <li>
                Information accompanying shipments of green-listed waste and
                destined for recovery or waste destined for laboratory analysis
                pursuant to Regulation (EC) No 1013/2006.
              </li>
              <li>
                If more than three carriers, attach information as required in
                blocks 5 (a), (b), (c).
              </li>
              <li>
                When the person who arranges the shipment is not the producer or
                collector, information about the producer or collector shall be
                provided.
              </li>
              <li>
                The relevant code(s) as indicated in Annex IIIA to Regulation
                (EC) No 1013/2006 are to be used, as appropriate in sequence.
                Certain Basel entries such as B1100, B3010, and B3020 are
                restricted to particular waste streams only, as indicated in
                Annex IIIA.
              </li>
              <li>
                The BEU codes listed in Annex IIIB to Regulation (EC) No
                1013/2006 are to be used.
              </li>
            </ul>
          </div>
        </main>

        {/* Right-section */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Shipment Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full w-2/5"></div>
              </div>
              <span className="text-sm text-gray-600">40%</span>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckIcon />
                      ) : (
                        <CheckIcon />
                        // <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <div className="text-sm text-gray-500">
                        <div>Name: {step.name}</div>
                        <div>Phone: {step.phone}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      step.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {step.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnexVII;
