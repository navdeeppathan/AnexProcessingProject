import React, { useEffect, useState } from "react";

// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css";
// import "summernote/dist/summernote-bs4.css"; // Required for Summernote styling
import $ from "jquery";

import {
  Box,
  Modal,
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  CircularProgress,
  Autocomplete,
  IconButton,
  Select,
  MenuItem,
  FormControl,
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
  const companyId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.company_id;
    return user_id || null;
  };

  const loginId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.login_id;
    return user_id || null;
  };

  function generateRandomString() {
    const prefix = "ANNEX";
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // 7-digit random number
    return prefix + randomNumber;
  }

  const [carriers, setCarriers] = useState([
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

  const [formData, setFormData] = useState({
    ref_name: "",
    ref_name2: "",
    ref_name3: "",
    ref_name4: "",
    login_id: loginId(),
    annex_id: generateRandomString(),
    company_id: companyId(),
    action: "Create Annex Form ",
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

  useEffect(() => {
    carriers.forEach((carrier, index) => {
      if (carrier.name.length >= 4) {
        fetchCompanyData(carrier.name, "carrier", index);
      }
    });
  }, [carriers]);

  useEffect(() => {
    if (formData.company_name.length >= 4) {
      fetchCompanyData(formData.company_name, "company");
    }
  }, [formData.company_name]);

  useEffect(() => {
    if (formData.consignee_name.length >= 4) {
      fetchCompanyData(formData.consignee_name, "consignee");
    }
  }, [formData.consignee_name]);

  useEffect(() => {
    if (
      formData.waste_processor_name &&
      formData.waste_processor_name.length >= 4
    ) {
      fetchCompanyData(formData.waste_processor_name, "waste_processor");
    }
  }, [formData.waste_processor_name]);

  useEffect(() => {
    if (
      formData.processing_facility_name &&
      formData.processing_facility_name.length >= 4
    ) {
      fetchCompanyData(
        formData.processing_facility_name,
        "processing_facility"
      );
    }
  }, [formData.processing_facility_name]);

  const handleChangee = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [suggestions, setSuggestions] = useState([]);
  const fetchCompanyData = async (value, searchType) => {
    if (!value || value.length < 3) return;

    let type;
    if (searchType === "company") type = 1;
    else if (searchType === "consignee") type = 2;
    else if (searchType === "carrier") type = 5;
    else if (searchType === "waste_processor") type = 6;
    else if (searchType === "processing_facility") type = 7;

    const form = new FormData();
    form.append("search", value);
    form.append("id", companyId());
    form.append("type", type);
    form.append("action", "formdata");

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/formdata",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();
      if (data.data) {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(`Error fetching ${searchType} data:`, error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (event, value, reason, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (reason === "input") fetchCompanyData(value, field);
  };

  const handleSelect = (event, selectedCompany, field) => {
    if (!selectedCompany) return;
    const fieldMapping = {
      company_name: [
        "company_name",
        "address",
        "contact_person",
        "contact_number",
        "fax",
        "email",
      ],
      consignee_name: [
        "consignee_name",
        "consignee_address",
        "contPerson",
        "consignee_contact",
        "fax2",
        "email2",
      ],
      waste_processor_name: [
        "waste_processor_name",
        "waste_processor_address",
        "waste_processor_contact_person",
        "waste_processor_tel",
        "waste_processor_email",
      ],
      processing_facility_name: [
        "processing_facility_name",
        "processing_facility_address",
        "processing_facility_contact_per",
        "processing_facility_tel",
        "processing_facility_fax",
        "processing_facility_email",
      ],
    };

    setFormData((prev) => ({
      ...prev,
      ...Object.fromEntries(
        fieldMapping[field].map((key) => [key, selectedCompany[key] || ""])
      ),
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [carrierSuggestions, setCarrierSuggestions] = useState([]);
    
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
    if (carriers.length < 6) {
      setCarriers([
        ...carriers,
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
    //model
    // setModalOpen(true);
    // console.log(formData);
    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataToSend.append(key, formData[key]);
    // });
    // formDataToSend.append("carriers", JSON.stringify(carriers));
    const lowercaseEmailKeys = [
      "email",
      "email2",
      "waste_processor_email",
      "processing_facility_email",
    ];

    const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("carriers", JSON.stringify(carriers));
    
      // Convert specific email fields to lowercase
      Object.keys(formData).forEach((key) => {
        let value = formData[key];
        if (lowercaseEmailKeys.includes(key)) {
          value = value?.toLowerCase().trim();
        }
        formDataToSend.append(key, value);
      });

    // Normalize carrier emails (all to lowercase & trimmed)
    const normalizedCarriers = carriers.map((carrier) => ({
      ...carrier,
      email: carrier.email?.toLowerCase().trim() || "",
    }));

    try {
      setLoading(true);
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
        setLoading(false);
        console.log("response:-", response.data);
        if (data?.success) {
          Swal.fire({
            title: "Success!",
            text: data?.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          setSuccess(data?.message);
          setTimeout(() => {
            setSuccess("");
          }, 10000);
          setFormData({
            ref_name: "",
            ref_name2: "",
            ref_name3: "",
            ref_name4: "",
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
              means_of_transport: "",
              date_of_transport: "",
              departure_date: "",
            },
          ]);
        }
      } else {
        setError(data.message || "Failed to create form");

        // Display the errors in Swal.fire
        Swal.fire({
          title: "Validation Errors",
          html: "All fields are required!!!!", // Using `html` to allow for formatted text
          icon: "error",
          showConfirmButton: true,
        });
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
      setLoading(true);
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
        setLoading(false);
        setSuccess("Form created successfully!");

        window.location.href = "/dashboard/draft";
        setFormData({
          ref_name: "",
          ref_name2: "",
          ref_name3: "",

          ref_name4: "",

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
            // departure_date: "",
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

  const fetchCarrierData = async (value, index) => {
    if (!value || value.length < 3) return; // Fetch only after 3+ characters
    // setLoading(true);

    const form = new FormData();
    form.append("search", value);
    form.append("id", companyId());
    form.append("type", 5); // Carrier Type
    form.append("action", "formdata");

    try {
     
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/formdata",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      setCarrierSuggestions(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching carrier data:", error);
      setCarrierSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCarrierSelect = (index, selectedCarrier) => {
    if (!selectedCarrier) return;

    setCarriers((prevCarriers) =>
      prevCarriers.map((carrier, i) =>
        i === index
          ? {
              ...carrier,
              name: selectedCarrier.name || "",
              address: selectedCarrier.address || "",
              contact_person: selectedCarrier.contact_person || "",
              phone: selectedCarrier.phone || "",
              fax: selectedCarrier.fax || "",
              email: selectedCarrier.email || "",
              means_of_transport: selectedCarrier.means_of_transport || "",
              date_of_transport: selectedCarrier.date_of_transport || "",
            }
          : carrier
      )
    );
  };

  const handleCarrierInputChange = (index, value, reason) => {
    setCarriers((prevCarriers) =>
      prevCarriers.map((carrier, i) =>
        i === index ? { ...carrier, name: value } : carrier
      )
    );
    if (reason === "input") fetchCarrierData(value, index);
  };

  if (loading) {
    <p className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
      <p className="text-black font-medium text-xl">Loading...</p>
    </p>;
  }

  // const [modalOpen, setModalOpen] = useState(false);
  
    if (loading) {
      return (
        <p className="flex flex-col items-center justify-center h-screen">
          <CircularProgress />
          <p className="text-black font-medium text-xl">Loading...</p>
       </p>
      );
    }
  return (
    
    <div className="bg-[#F8F9FA]">
      <form onSubmit={handleSubmit}>
        <Box p={3} display="flex" flexDirection="column" gap={3}>
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
            {/* <Box display="flex" mb={2}>/ */}
            {/* <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                Send for Signature
              </Button> */}
            {/* </Box> */}
          </div>

          <div>
            {error && <p className="error-message">{error}</p>}
            {success && (
              <p className="text-green-500 font-semibold text-2xl ">
                {success}
              </p>
            )}
          </div>

          <Box p={2} borderRadius={2} bgcolor="white">
            <Grid container spacing={2}>
              {/*ref_name*/}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" fontWeight="bold">
                Reference 1:
                </Typography>

                <TextField
                  label=""
                  fullWidth
                  name="ref_name"
                  value={formData.ref_name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" fontWeight="bold">
                Reference 2:
                </Typography>

                <TextField
                  required
                  label=""
                  fullWidth
                  name="ref_name2"
                  value={formData.ref_name2}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" fontWeight="bold">
                Reference 3:
                </Typography>

                <TextField
                  required
                  label=""
                  fullWidth
                  name="ref_name3"
                  value={formData.ref_name3}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" fontWeight="bold">
                Reference 4:
                </Typography>

                <TextField
                  required
                  label=""
                  fullWidth
                  name="ref_name4"
                  value={formData.ref_name4}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Section: Consignment Information */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1. Person who arranges the shipments:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => option.company_name}
                    loading={loading}
                    onChange={(event, newValue) =>
                      handleSelect(event, newValue, "company_name")
                    }
                    onInputChange={(event, newInputValue, reason) =>
                      handleInputChange(
                        event,
                        newInputValue,
                        reason,
                        "company_name"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    onChange={handleChangee}
                    value={formData.address}
                    label="Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="contact_person"
                    onChange={handleChangee}
                    value={formData.contact_person}
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="contact_number"
                    required
                    value={formData.contact_number}
                    onChange={handleChangee}
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
                    onChange={handleChangee}
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
                    onChange={handleChangee}
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
            <Box p={2} borderRadius={2} bgcolor="white" mt={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                2. Consignee:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => option.consignee_name}
                    loading={loading}
                    onChange={(event, newValue) =>
                      handleSelect(event, newValue, "consignee_name")
                    }
                    onInputChange={(event, newInputValue, reason) =>
                      handleInputChange(
                        event,
                        newInputValue,
                        reason,
                        "consignee_name"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        fullWidth
                        label="Name"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    name="consignee_address"
                    onChange={handleChangee}
                    value={formData.consignee_address}
                    label="Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="contPerson"
                    value={formData.contPerson}
                    onChange={handleChangee}
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="consignee_contact"
                    required
                    value={formData.consignee_contact}
                    onChange={handleChangee}
                    label="Tel"
                    inputProps={{ maxLength: 10 }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="fax2"
                    value={formData.fax2}
                    onChange={handleChangee}
                    label="Fax"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="email2"
                    type="email"
                    value={formData.email2}
                    onChange={handleChangee}
                    label="Email"
                    variant="outlined"
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
                  label=""
                  fullWidth
                  name="number_of_shipments"
                  required
                  value={formData.number_of_shipments}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  Actual Weight:
                </Typography>

                <TextField
                  label="Tonnes (Mg) m³:"
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
                  4. Actual Date of Shipment:
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
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
            </Grid>
          </Box>

          {/* Section: Consignee */}

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                5. Carriers Information
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
                    <Grid sx={{ marginTop: 2 }} item xs={12} sm={4}>
                      <Autocomplete
                        freeSolo
                        options={carrierSuggestions}
                        getOptionLabel={(option) => option.name || ""}
                        loading={loading}
                        onChange={(event, newValue) =>
                          handleCarrierSelect(index, newValue)
                        }
                        onInputChange={(event, newInputValue, reason) =>
                          handleCarrierInputChange(index, newInputValue, reason)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Name"
                            variant="outlined"
                          />
                        )}
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
                        label="Tel"
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
                    <Grid item xs={12} sm={4}>
                      {/* <TextField
                        fullWidth
                        name="means_of_transport"
                        label="Means of Transport"
                        value={carrier.means_of_transport}
                        onChange={(e) => handleCarrierChange(index, e)}
                        variant="outlined"
                        margin="normal"
                      /> */}
                       <FormControl fullWidth margin="normal">
                        <InputLabel id={`means-of-transport-label-${index}`}>Means of Transport</InputLabel>
                        <Select
                          labelId={`means-of-transport-label-${index}`}
                          id={`means-of-transport-${index}`}
                          name="means_of_transport"
                          value={carrier.means_of_transport}
                          onChange={(e) => handleCarrierChange(index, e)}
                          label="Means of Transport"
                        >
                          <MenuItem value="By Road">By Road</MenuItem>
                          <MenuItem value="By Sea">By Sea</MenuItem>
                          <MenuItem value="By Air">By Air</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  disabled={carriers.length === 6}
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

          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                6. Waste generator (Original producer/new producer/collector):
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) =>
                      option.waste_processor_name || ""
                    }
                    loading={loading}
                    onChange={(event, newValue) =>
                      handleSelect(event, newValue, "waste_processor_name")
                    }
                    onInputChange={(event, newInputValue, reason) =>
                      handleInputChange(
                        event,
                        newInputValue,
                        reason,
                        "waste_processor_name"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="waste_processor_address"
                    onChange={handleChange}
                    value={formData.waste_processor_address}
                    label="Address"
                    variant="outlined"
                    required
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
              </Grid>
            </Box>
          </div>

          {/* Section: Recovery facility */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="white">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                7. Recovery Facility:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) =>
                      option.processing_facility_name || ""
                    }
                    loading={loading}
                    onChange={(event, newValue) =>
                      handleSelect(event, newValue, "processing_facility_name")
                    }
                    onInputChange={(event, newInputValue, reason) =>
                      handleInputChange(
                        event,
                        newInputValue,
                        reason,
                        "processing_facility_name"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_address"
                    required
                    onChange={handleChange}
                    value={formData.processing_facility_address}
                    label="Address"
                    variant="outlined"
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="processing_facility_tel"
                    required
                    value={formData.processing_facility_tel}
                    onChange={handleChange}
                    label="Tel"
                    inputProps={{ maxLength: 10 }}
                    variant="outlined"
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
                9. Usual description of the waste:
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
                10. Waste identification (fill in relevant codes):
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
                13. Signature upon receipt of the waste by the consignee:
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
                14. Shipment received at recovery facility:
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
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                'Save as Draft'
               )} 
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
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                'Send for Signature'
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

// Import jQuery for Summernote to work
// const EmailModel = ({ openModal, setOpenModal }) => {
//   const [message, setMessage] = useState("");
//   // Handle editor change
//   const handleEditorChange = (content) => {
//     setMessage(content);
//   };
//   const handleCloseModal = () => setOpenModal(false);

//   const handleSubmit = () => {
//     console.log("Message:", message);
//     handleCloseModal();
//   };

//   return (
//     <Modal open={openModal} onClose={handleCloseModal}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 600,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <Typography variant="h6">Add Message & Attachment</Typography>

//         {/* Summernote Editor */}
//         <ReactSummernote
//           value={message}
//           options={{
//             height: 300,
//             minHeight: 200,
//             maxHeight: 500,
//             focus: true,
//             dialogsInBody: true,
//             placeholder: "Enter your message here",
//             toolbar: [
//               ["style", ["bold", "italic", "underline", "clear"]],
//               ["font", ["strikethrough", "superscript", "subscript"]],
//               ["color", ["color"]],
//               ["para", ["ul", "ol", "paragraph"]],
//               ["insert", ["link", "picture", "table", "hr"]],
//               ["view", ["fullscreen", "codeview", "help"]],
//             ],
//           }}
//           onChange={handleEditorChange}
//         />

//         {/* File Upload Button */}
//         <Button variant="outlined" component="label">
//           Upload Attachments
//           <input type="file" multiple hidden />
//         </Button>

//         {/* Submit Button */}
//         <Button variant="contained" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>
//     </Modal>
//   );
// };
