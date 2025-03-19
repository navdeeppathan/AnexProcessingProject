import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import DraftsIcon from "@mui/icons-material/Drafts";
import Swal from "sweetalert2";

const Form = () => {
  const generateId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.company_id;
    return user_id;
  };

  function generateRandomString() {
    const prefix = "CMAU";
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // 7-digit random number
    return prefix + randomNumber;
  }
  // const annexid = generateRandomString();
  // console.log("asjd:---", annexid);

  const [formData, setFormData] = useState({
    user_id: generateId(),
    annex_id: generateRandomString(),

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
    shipment_facility_name: "",
    shipment_facility_date: "",

    //
    public_agency: "",
    //
    number_of_shipments: 0,
    weight: 0,

    //
    aShipdate: "",
    //

    // preferred_carrier_name: "",
    // preferred_carrier_arrival_date: "",
    // preferred_carrier_departure_date: "",
    //
    waste_processor_name: "",
    waste_processor_address: "",
    waste_processor_contact_person: "",
    waste_processor_tel: "",
    // waste_processor_fax: "",
    waste_processor_email: "",
    // waste_processor_meansof_trans: "",
    // waste_processor_dateof_trans: "",

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
    // signature_imprt_arr: "",
    //
    // license_number: "",
    // approval_details: "",
    waste_amount: 0,
    toxic_content: 1,
    local_authority_confirmation: 1,
    // waste_transport_status: "",
    // shipment_received_at_facility: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [carriers, setCarriers] = useState([
    {
      name: "",
      address: "",
      contact_person: "",
      phone: "",
      fax: "",
      email: "",
      // means_of_transport: "",
      // date_of_transport: "",
      // departure_date: "",
    },
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCarrierChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCarriers = [...carriers];
    updatedCarriers[index][name] = value;
    setCarriers(updatedCarriers);
  };

  // Add a new empty carrier to the list
  const addCarrier = () => {
    if (carriers.length < 5) {
      setCarriers([
        ...carriers,
        {
          name: "",
          address: "",
          contact_person: "",
          phone: "",
          fax: "",
          email: "",
          // means_of_transport: "",
          // date_of_transport: "",
          // departure_date: "",
        },
      ]);
    }
  };

  // Remove a carrier by index
  const removeCarrier = (index) => {
    if (carriers.length > 1) {
      setCarriers(carriers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    console.log(carriers);
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // console.log(formData);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("carriers", JSON.stringify(carriers));

    // console.log("Form Data Entries:");
    let isEmpty = false;
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
      if (!pair[1]) {
        isEmpty = true;
      }
    }
    if (isEmpty) {
      alert("All fields are required");
      isEmpty = false;
      return;
    }

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log("dataform submit:", data);
      if (response.ok) {
        if (data?.message) {
          Swal.fire({
            title: "Success!",
            text: data?.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
        setSuccess(data?.message);
        setTimeout(() => {
          setSuccess("");
        }, 10000);
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
          weight: 0,

          //
          aShipdate: "",
          //

          // preferred_carrier_name: "",
          // preferred_carrier_arrival_date: "",
          // preferred_carrier_departure_date: "",
          //
          waste_processor_name: "",
          waste_processor_address: "",
          waste_processor_contact_person: "",
          waste_processor_tel: "",
          // waste_processor_fax: "",
          waste_processor_email: "",
          // waste_processor_meansof_trans: "",
          // waste_processor_dateof_trans: "",

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
          shipment_facility_name: "",
          shipment_facility_date: "",

          //
          declaration_name: "",
          declaration_date: "",
          //
          signature_exp_dis: "",
          signature_transit: "",
          signature_imprt_arr: "",
          //
          basel_annex_ix: "",
          oecd_ii: "",
          annex_iia4: "",
          annex_iiia5: "",
          ec_list_of_wastes: "",
          national_code: "",
          other_specify: "",
          //

          license_number: "",
          approval_details: "",
          waste_amount: 0,
          toxic_content: 1,
          local_authority_confirmation: 1,
          waste_transport_status: "",
          shipment_received_at_facility: "",
        });
        setCarriers([
          {
            name: "",
            address: "",
            contact_person: "",
            phone: "",
            fax: "",
            email: "",
            // means_of_transport: "",
            // date_of_transport: "",
            // departure_date: "",
          },
        ]);
      } else {
        setError(data?.message || "Failed to create form");
        Swal.fire({
          title: "Error!",
          text: data?.message,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    } catch (error) {
      // console.log("eroor:-", error);
      setError("Network error. Please try again.");
      Swal.fire({
        title: "Error!",
        text: error?.message || "Network error. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async (e) => {
    console.log(carriers);
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // console.log(formData);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("carriers", JSON.stringify(carriers));
    formDataToSend.append("draft", 1);
    console.log("Form Data Entries:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log("dataform submit:", data);
      if (response.ok) {
        setSuccess("Company created successfully!");

        window.location.href = "/dashboard/draft";
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
          weight: 0,

          //
          aShipdate: "",
          //

          // preferred_carrier_name: "",
          // preferred_carrier_arrival_date: "",
          // preferred_carrier_departure_date: "",
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
          shipment_facility_name: "",
          shipment_facility_date: "",

          //
          declaration_name: "",
          declaration_date: "",
          //
          signature_exp_dis: "",
          signature_transit: "",
          signature_imprt_arr: "",
          //
          basel_annex_ix: "",
          oecd_ii: "",
          annex_iia4: "",
          annex_iiia5: "",
          ec_list_of_wastes: "",
          national_code: "",
          other_specify: "",
          //

          license_number: "",
          approval_details: "",
          waste_amount: 0,
          toxic_content: 1,
          local_authority_confirmation: 1,
          waste_transport_status: "",
          shipment_received_at_facility: "",
        });
        setCarriers([
          {
            name: "",
            address: "",
            contact_person: "",
            phone: "",
            fax: "",
            email: "",
            means_of_transport: "",
            date_of_transport: "",
            departure_date: "",
          },
        ]);
      } else {
        setError(data.message || "Failed to create company");
      }
    } catch (error) {
      // console.log("eroor:-", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <p className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
      <p className="text-black font-medium text-xl">Loading...</p>
    </p>;
  }

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
            {success && (
              <p className="text-green-500 font-semibold text-2xl ">
                {success}
              </p>
            )}
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
                    label="Address"
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
                    inputProps={{ maxLength: 10 }}
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
                    type="email"
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
                    inputProps={{ maxLength: 10 }}
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
                    type="email"
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

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  4. Actual Weight:
                </Typography>

                <TextField
                  label="Weight"
                  fullWidth
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Actual Date of Shipment */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  5. Actual Date of Shipment:
                </Typography>

                <TextField
                  name="aShipdate"
                  type="date"
                  value={formData.aShipdate}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/*policy agency */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  6. Public Agency:
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
                Carriers Information
              </Typography>

              {carriers.map((carrier, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
                    Carrier {index + 1}
                  </Typography>

                  {carriers.length > 1 && (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => removeCarrier(index)}
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={carrier.name}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={carrier.address}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="contact_person"
                        label="Contact Person"
                        value={carrier.contact_person}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={carrier.phone}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        inputProps={{ maxLength: 10 }}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="fax"
                        label="Fax"
                        value={carrier.fax}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={carrier.email}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="means_of_transport"
                        label="Means of Transport"
                        value={carrier.means_of_transport}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="date_of_transport"
                        type="date"
                        value={carrier.date_of_transport}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name="departure_date"
                        type="date"
                        value={carrier.departure_date}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid> */}
                  </Grid>
                </Box>
              ))}

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  disabled={carriers.length === 5}
                  variant="outlined"
                  onClick={addCarrier}
                  startIcon={<AddIcon />}
                  sx={{
                    color: "#5C5C5C",
                    border: "1px solid #A8A8A8",
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Add Carrier
                </Button>
              </Box>
            </Box>
          </div>
          {/* <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5. Preferred Carrier:
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
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div> */}

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                7.Waste generator (Original producer/new producer/collector):
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
                    inputProps={{ maxLength: 10 }}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_fax"
                    value={formData.waste_processor_fax}
                    onChange={handleChange}
                    label="Fax"
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_email"
                    value={formData.waste_processor_email}
                    onChange={handleChange}
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_meansof_trans"
                    value={formData.waste_processor_meansof_trans}
                    onChange={handleChange}
                    label="Means of transport"
                    variant="outlined"
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="waste_processor_dateof_trans"
                    value={formData.waste_processor_dateof_trans}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid> */}
              </Grid>
            </Box>
          </div>

          {/* Section: Consignee */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                8. Recovery facility:
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
                    inputProps={{ maxLength: 10 }}
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
                    type="email"
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
                9. Recovery operation (or if appropriate disposal operation in
                the case of waste referred to in Article 3(4)):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="recovery_operation_name"
                    value={formData.recovery_operation_name}
                    onChange={handleChange}
                    label="R-code / D-code:"
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
                10. Usual description of the waste:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="usual_des_of_the_waste"
                    value={formData.usual_des_of_the_waste}
                    onChange={handleChange}
                    label="Description"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="#F8F9FA">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                11. Waste identification (fill in relevant codes):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="basel_annex_ix"
                    value={formData.basel_annex_ix}
                    onChange={handleChange}
                    label="(i)Basel Annex IX:"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="oecd_ii"
                    value={formData.oecd_ii}
                    onChange={handleChange}
                    label="(ii)OECD (if different from (i)"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="annex_iia4_tel"
                    value={formData.annex_iia4}
                    onChange={handleChange}
                    label="(iii)Annex IIA(4)"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="annex_iiia5_tel"
                    value={formData.annex_iiia5}
                    onChange={handleChange}
                    label="(iv)Annex IIIA(5)"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="ec_list_of_wastes"
                    value={formData.ec_list_of_wastes}
                    onChange={handleChange}
                    label="(v)EC list of wastes: "
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="national_code"
                    value={formData.national_code}
                    onChange={handleChange}
                    label="(vi)National code: "
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="other_specify"
                    value={formData.other_specify}
                    onChange={handleChange}
                    label="(vii)Other (specify):"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                12. Countries/states concerned:
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
                13. Declaration of the person who arranges the shipment:
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="declaration_date"
                    value={formData.declaration_date}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                14. Signature upon receipt of the waste by the consignee:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="signature_exp_dis"
                    value={formData.signature_exp_dis}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="Date"
                    name="signature_transit"
                    value={formData.signature_transit}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                15. Shipment received at recovery facility:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="shipment_facility_name"
                    value={formData.shipment_facility_name}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    name="shipment_facility_date"
                    value={formData.shipment_facility_date}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                15. Other
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
                    type="number"
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
          </div> */}

          <div>
            <Box display="flex" justifyContent="end" gap={2}>
              <Button
                variant="contained"
                startIcon={<DraftsIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
                onClick={handleDraft}
              >
                {/* {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : ( */}
                Save as Draft
                {/* )} */}
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={<EmailIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                {/* {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : ( */}
                Send for Signature
                {/* )} */}
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Form;
