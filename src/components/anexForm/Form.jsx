import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";

const Form = () => {
  const generateId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user).user_id;
    return user_id;
  };

  const [formData, setFormData] = useState({
    user_id: generateId(),
    company_name: "",
    address: "",
    contact_number: "",
    contact_person: "",
    fax: "",
    email: "",
    //
    consignee_name: "",
    consignee_address: "",
    consignee_contact: "",
    contPerson: "",
    fax2: "",
    email2: "",

    //
    public_agency: "",
    //
    number_of_shipments: 0,
    //
    aShipdate: "",
    //
    firstAdd: "",
    first_port_name: "",
    first_port_arrival_date: "",
    first_port_departure_date: "",
    first_contPerson: "",
    first_contNum: "",
    first_fax: "",
    first_email: "",
    first_meanTrans: "",
    //

    //
    secondAdd: "",
    second_port_name: "",
    second_port_arrival_date: "",
    second_contPerson: "",
    second_contNum: "",
    second_fax: "",
    second_email: "",
    second_meanTrans: "",
    //

    //
    thirdAdd: "",
    third_port_name: "",
    third_port_arrival_date: "",
    third_contPerson: "",
    third_contNum: "",
    third_fax: "",
    third_email: "",
    third_meanTrans: "",
    //

    preferred_carrier_name: "",
    preferred_carrier_arrival_date: "",
    preferred_carrier_departure_date: "",
    //
    waste_processor_name: "",
    waste_processor_address: "",
    waste_processor_contact_person: "",
    waste_processor_tel: "",
    waste_processor_fax: "",
    waste_processor_email: "",
    waste_processor_meansof_trans: "",
    waste_processor_dateof_trans: "",

    //
    processing_facility_name: "",
    processing_facility_address: "",
    processing_facility_contact_per: "",
    processing_facility_tel: "",
    processing_facility_fax: "",
    processing_facility_email: "",

    //
    recovery_operation_name: "",

    //
    usual_des_of_the_waste: "",

    //
    countriesOrstates_exp_dis: "",
    countriesOrstates_transit: "",
    countriesOrstates_imprt_arr: "",

    //
    declaration_name: "",
    declaration_date: "",
    //
    signature_exp_dis: "",
    signature_transit: "",
    signature_imprt_arr: "",
    //
    license_number: "",
    approval_details: "",
    waste_amount: 0,
    toxic_content: 1,
    local_authority_confirmation: 1,
    waste_transport_status: "",
    shipment_received_at_facility: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    console.log(formData);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Company created successfully!");

        setFormData({
          company_name: "",
          address: "",
          contact_number: "",
          contact_person: "",
          fax: "",
          email: "",
          //
          consignee_name: "",
          consignee_address: "",
          consignee_contact: "",
          contPerson: "",
          fax2: "",
          email2: "",

          //
          public_agency: "",
          //
          number_of_shipments: 0,
          //
          aShipdate: "",
          //
          firstAdd: "",
          first_port_name: "",
          first_port_arrival_date: "",
          first_port_departure_date: "",
          first_contPerson: "",
          first_contNum: "",
          first_fax: "",
          first_email: "",
          first_meanTrans: "",
          //

          //
          secondAdd: "",
          second_port_name: "",
          second_port_arrival_date: "",
          second_contPerson: "",
          second_contNum: "",
          second_fax: "",
          second_email: "",
          second_meanTrans: "",
          //

          //
          thirdAdd: "",
          third_port_name: "",
          third_port_arrival_date: "",
          third_contPerson: "",
          third_contNum: "",
          third_fax: "",
          third_email: "",
          third_meanTrans: "",
          //

          preferred_carrier_name: "",
          preferred_carrier_arrival_date: "",
          preferred_carrier_departure_date: "",
          //
          waste_processor_name: "",
          waste_processor_address: "",
          waste_processor_contact_person: "",
          waste_processor_tel: "",
          waste_processor_fax: "",
          waste_processor_email: "",
          waste_processor_meansof_trans: "",
          waste_processor_dateof_trans: "",

          //
          processing_facility_name: "",
          processing_facility_address: "",
          processing_facility_contact_per: "",
          processing_facility_tel: "",
          processing_facility_fax: "",
          processing_facility_email: "",

          //
          recovery_operation_name: "",

          //
          usual_des_of_the_waste: "",

          //
          countriesOrstates_exp_dis: "",
          countriesOrstates_transit: "",
          countriesOrstates_imprt_arr: "",

          //
          declaration_name: "",
          declaration_date: "",
          //
          signature_exp_dis: "",
          signature_transit: "",
          signature_imprt_arr: "",
          //
          license_number: "",
          approval_details: "",
          waste_amount: 0,
          toxic_content: 1,
          local_authority_confirmation: 1,
          waste_transport_status: "",
          shipment_received_at_facility: "",
        });
      } else {
        setError(data.message || "Failed to create company");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA]">
      <form onSubmit={handleSubmit}>
        <Box p={3} display="flex" flexDirection="column" gap={3}>
          {/* Form Title */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Annex Form
            </Typography>

            {/* Send for Signature Button */}
            <Box display="flex" mb={2}>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                Send for Signature
              </Button>
            </Box>
          </div>
          <div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </div>

          {/* Section: Consignment Information */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1. Consignment Information:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                    fullWidth
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    fullWidth
                    label="Tel"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    fullWidth
                    label="Fax"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Section: Consignee */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                2. Consignee:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="consignee_name"
                    value={formData.consignee_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="consignee_address"
                    value={formData.consignee_address}
                    onChange={handleChange}
                    label="Address"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="contPerson"
                    value={formData.contPerson}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                    defaultValue="Lorem ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="consignee_contact"
                    value={formData.consignee_contact}
                    onChange={handleChange}
                    label="Tel"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="fax2"
                    value={formData.fax2}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="email2"
                    value={formData.email2}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Section: Actual Quantity & Date of Shipment */}
          <Box p={2} borderRadius={2} bgcolor="white">
            <Grid container spacing={2}>
              {/* Actual Quantity */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  3. Actual Quantity:
                </Typography>

                <TextField
                  label="49 DRUMS – Tonnes (Mg) m³:"
                  fullWidth
                  name="number_of_shipments"
                  value={formData.number_of_shipments}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Actual Date of Shipment */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  4. Actual Date of Shipment:
                </Typography>

                <TextField
                  name="aShipdate"
                  type="date"
                  value={formData.aShipdate}
                  onChange={handleChange}
                  label="Date"
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/*policy agency */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  4. Public Agency:
                </Typography>

                <TextField
                  name="public_agency"
                  value={formData.public_agency}
                  onChange={handleChange}
                  label="Public Agency"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Section: Consignee */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5.(a) First Carrier:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_port_name"
                    value={formData.first_port_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="firstAdd"
                    value={formData.firstAdd}
                    onChange={handleChange}
                    label="Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_contPerson"
                    value={formData.first_contPerson}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_contNum"
                    value={formData.first_contNum}
                    onChange={handleChange}
                    label="Tel"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_fax"
                    value={formData.first_fax}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_email"
                    value={formData.first_email}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="first_meanTrans"
                    value={formData.first_meanTrans}
                    onChange={handleChange}
                    label="Means of transport "
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="first_port_arrival_date"
                    value={formData.first_port_arrival_date}
                    onChange={handleChange}
                    label="Date of transport"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="first_port_departure_date"
                    value={formData.first_port_departure_date}
                    onChange={handleChange}
                    label="Date of Departure"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5.(b) Second Carrier:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_port_name"
                    value={formData.second_port_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="secondAdd"
                    value={formData.secondAdd}
                    onChange={handleChange}
                    label="Address"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_contPerson"
                    value={formData.second_contPerson}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                    defaultValue="Lorem ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_contNum"
                    value={formData.second_contNum}
                    onChange={handleChange}
                    label="Tel"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_fax"
                    value={formData.second_fax}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_email"
                    value={formData.second_email}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="second_meanTrans"
                    value={formData.second_meanTrans}
                    onChange={handleChange}
                    label="Means of transport "
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="second_port_arrival_date"
                    value={formData.second_port_arrival_date}
                    onChange={handleChange}
                    label="Date of transport"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5.(c) Third Carrier:
              </Typography>
              <div className="space-y-5">
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_port_name"
                        value={formData.third_port_name}
                        onChange={handleChange}
                        label="Name"
                        variant="outlined"
                        defaultValue="Lorem Ipsum"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="thirdAdd"
                        value={formData.thirdAdd}
                        onChange={handleChange}
                        label="Address"
                        variant="outlined"
                        defaultValue="Lorem ipsum dolor sit mate"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_contPerson"
                        value={formData.third_contPerson}
                        onChange={handleChange}
                        label="Contact Person"
                        variant="outlined"
                        defaultValue="Lorem ipsum"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_contNum"
                        value={formData.third_contNum}
                        onChange={handleChange}
                        label="Tel"
                        variant="outlined"
                        defaultValue="01234567890"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_fax"
                        value={formData.third_fax}
                        onChange={handleChange}
                        label="Fax"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_email"
                        value={formData.third_email}
                        onChange={handleChange}
                        label="Email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_meanTrans"
                        value={formData.third_meanTrans}
                        onChange={handleChange}
                        label="Means of transport "
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="third_port_arrival_date"
                        value={formData.third_port_arrival_date}
                        onChange={handleChange}
                        label="Date of transport"
                        variant="outlined"
                        type="date"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#5C5C5C",
                        border: "1px solid #A8A8A8",
                        borderRadius: "8px",
                        textTransform: "none",
                      }}
                      endIcon={<AddIcon sx={{ color: "#141B34" }} />}
                    >
                      Add Carrier
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5.(d) Preferred Carrier:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="preferred_carrier_name"
                    value={formData.preferred_carrier_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="preferred_carrier_arrival_date"
                    value={formData.preferred_carrier_arrival_date}
                    onChange={handleChange}
                    label="Date of Arrival"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="preferred_carrier_departure_date"
                    value={formData.preferred_carrier_departure_date}
                    onChange={handleChange}
                    label="Date of Departure"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                6.Waste generator (Original producer/new producer/collector):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_name"
                    value={formData.waste_processor_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_address"
                    value={formData.waste_processor_address}
                    onChange={handleChange}
                    label="Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_contact_person"
                    value={formData.waste_processor_contact_person}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_tel"
                    value={formData.waste_processor_tel}
                    onChange={handleChange}
                    label="Tel"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_fax"
                    value={formData.waste_processor_fax}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_email"
                    value={formData.waste_processor_email}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_meansof_trans"
                    value={formData.waste_processor_meansof_trans}
                    onChange={handleChange}
                    label="Means of transport"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="waste_processor_dateof_trans"
                    value={formData.waste_processor_dateof_trans}
                    onChange={handleChange}
                    label="Date of transport"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Section: Consignee */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                7. Recovery facility:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_name"
                    value={formData.processing_facility_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_address"
                    value={formData.processing_facility_address}
                    onChange={handleChange}
                    label="Address"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_contact_per"
                    value={formData.processing_facility_contact_per}
                    onChange={handleChange}
                    label="Contact Person"
                    variant="outlined"
                    defaultValue="Lorem ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_tel"
                    value={formData.processing_facility_tel}
                    onChange={handleChange}
                    label="Tel"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_fax"
                    value={formData.processing_facility_fax}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_email"
                    value={formData.processing_facility_email}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                8. Recovery operation (or if appropriate disposal operation in
                the case of waste referred to in Article 3(4)):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="recovery_operation_name"
                    value={formData.recovery_operation_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                9. Usual description of the waste:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="usual_des_of_the_waste"
                    value={formData.usual_des_of_the_waste}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* <div>
            <Box p={2} borderRadius={2} bgcolor="#F8F9FA">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                10. Waste identification (fill in relevant codes):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(i)Basel Annex IX:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(ii)OECD (if different from (i)"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(iii)Annex IIA(4)"
                    variant="outlined"
                    defaultValue="Lorem ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Tel"
                    variant="(iv)Annex IIIA(5)"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(v)    EC list of wastes: "
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(vi)National code: "
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="(vii)Other (specify):"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div> */}

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                11. Countries/states concerned:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="countriesOrstates_exp_dis"
                    value={formData.countriesOrstates_exp_dis}
                    onChange={handleChange}
                    label="Export/dispatch:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="countriesOrstates_transit"
                    value={formData.countriesOrstates_transit}
                    onChange={handleChange}
                    label="Transit:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="countriesOrstates_imprt_arr"
                    value={formData.countriesOrstates_imprt_arr}
                    onChange={handleChange}
                    label="Import/arrival:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                12. Declaration of the person who arranges the shipment:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="declaration_name"
                    value={formData.declaration_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="declaration_date"
                    value={formData.declaration_date}
                    onChange={handleChange}
                    label="Date"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                13. Signature upon receipt of the waste by the consignee:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="signature_exp_dis"
                    value={formData.signature_exp_dis}
                    onChange={handleChange}
                    label="Export/dispatch:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="signature_transit"
                    value={formData.signature_transit}
                    onChange={handleChange}
                    label="Transit:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="signature_imprt_arr"
                    value={formData.signature_imprt_arr}
                    onChange={handleChange}
                    label="Import/arrival:"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                14. Other
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    label="License Number:"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="approval_details"
                    value={formData.approval_details}
                    onChange={handleChange}
                    label="Approval Details"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_amount"
                    value={formData.waste_amount}
                    onChange={handleChange}
                    label="Waste Amount:"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_transport_status"
                    value={formData.waste_transport_status}
                    onChange={handleChange}
                    label="Waste Transport Status:"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="shipment_received_at_facility"
                    value={formData.shipment_received_at_facility}
                    onChange={handleChange}
                    label="Shipment Received At Facility:"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box display="flex" justifyContent="end">
              <Button
                variant="contained"
                type="submit"
                startIcon={!loading && <EmailIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Send for Signature"
                )}
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Form;
