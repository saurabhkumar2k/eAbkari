

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserSvg,
  CalendarSvg,
  BriefcaseSvg,
  MapPinSvg,
  PhoneSvg,
  MailSvg,
  ShieldCheckSvg,
  LockSvg,
  CloudUploadSvg,
  SendSvg,
  InfoSvg,
  ShieldSvg,
  TimerSvg,
  RefreshCwSvg,
  HeadphonesSvg,
  ChevronDownSvg
} from '../../Style/images/Icons';
export default function Registration({ onNavigateToLogin }) {

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [subDivisions, setSubDivisions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    FatherHusbandName: '',
    DateOfBirth: '',
    Gender: '',
    Occupation: '',
    AddressLine1: '',
    AddressLine2: '',
    StateUT: '',
    District: '',
    PoliceStation: '',
    PIN: '',
    Mobile: '',
    Email: '',
    photo: '',
    SecretQuestionId: '',
    SecretAnswer: '',
    IsPunishableOffence: 'N'
  });




  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, []);


  useEffect(() => {
    if (formData.StateUT) {
      fetchDistricts(formData.StateUT);
    }
  }, [formData.StateUT]);


  const fetchStates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5214/api/LGDiretory/getState"
      );
      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchQuestion = async () => {

    try {
      const response = await axios.get(
        "http://localhost:5214/api/LGDiretory/Question"
      );
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };





  const fetchDistricts = async (stateCode) => {
    try {
      const res = await axios.get(
        "http://localhost:5214/api/LGDiretory/GetDistrict",
        {
          params: { Statecode: stateCode }
        }
      );

      setDistricts(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchSubDivisions = async (districtCode) => {
    try {
      const res = await axios.get(
        "http://localhost:5214/api/LGDiretory/GetSubDivision",
        {
          params: { DistrictCode: districtCode }
        }
      );

      setSubDivisions(res.data);
    } catch (err) {
      console.log(err);
    }
  };



const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("Only JPG and PNG files are allowed.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Photo size should not exceed 2MB.");
    return;
  }

  // Actual File object save karo
  setPhoto(file);

  // Filename
  setFileName(file.name);

  // Preview
  const previewUrl = URL.createObjectURL(file);
  setPhotoPreview(previewUrl);
};


  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value
  //   }));

  //   // 🔥 clear error on typing
  //   setErrors((prev) => ({
  //     ...prev,
  //     [name]: ""
  //   }));
  // };

 const handleChange = (e) => {
    debugger;
    const { name, value, type, checked } = e.target;

    let fieldValue = type === "checkbox" ? checked : value;

    if (name === "PIN") {
      fieldValue = value.replace(/\D/g, "").slice(0, 6);

      if (fieldValue.length >= 3 && !fieldValue.startsWith("110")) {
        setErrors((prev) => ({
          ...prev,
          PIN: ["PIN Code must start with 110."]
        }));
        return;
      }
    }

    if (name === "Mobile") {
      fieldValue = value.replace(/\D/g, "").slice(0, 10);

      if (fieldValue.length === 10) {
        checkMobileExists(fieldValue);
      }
    }




    if (name === "PanNo") {
      fieldValue = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
    }



    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    // ✅ PAN validation after updating value
    if (name === "PanNo") {
      setErrors((prev) => ({
        ...prev,
        PanNo:
          fieldValue.length > 0 &&
            !/^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/.test(fieldValue)
            ? ["Invalid PAN format"]
            : ""
      }));
    } else if (name === "PIN") {
      if (fieldValue.length >= 3 && !fieldValue.startsWith("110")) {
        setErrors((prev) => ({
          ...prev,
          PIN: ["PIN Code must start with 110."]
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: ""
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  const checkMobileExists = async (mobile) => {
    try {
      const response = await axios.get(
        `http://localhost:5214/api/UserRegistration/check-mobile/${mobile}`
      );

      const data = response.data; // ✅

      if (response.data.exists) {
        setErrors((prev) => ({
          ...prev,
          Mobile: ["This mobile number is already registered."]
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          Mobile: ""
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };



  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    const formDataToSend = new FormData(e.target);

    formDataToSend.set(
      "IsPunishableOffence",
      formData.IsPunishableOffence

    );

if (photo) {
  formDataToSend.set("Photo", photo);
}


    // Check all values being sent
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }





    try {
      const response = await axios.post(
        "http://localhost:5214/api/UserRegistration/register",
        formDataToSend
      );

      //     alert(`Registration successful! Reg ID: ${response.data.regId}`);

      // alert(`Registration successful! Reg ID: ${response.data.regId}, User ID: ${response.data.userId}`);


      alert(
        // `Registration Successful!\n\n Your Registration ID: ${response.data.regId},\n\n  User ID: ${response.data.userId}`

         `Registration Successful!\n\n User ID: ${response.data.userId}`
      );

      // navigate("/login");

      setTimeout(() => {
        navigate("/Login");
      }, 2000);

      // Reset all fields to blank/default values
      setFormData({
        FirstName: "",
        LastName: "",
        FatherHusbandName: "",
        DateOfBirth: "",
        Gender: "",
        Occupation: "",
        AddressLine1: "",
        AddressLine2: "",
        StateUT: "",
        District: "",
        PoliceStation: "",
        PIN: "",
        Mobile: "",
        Email: "",
        Photo: "",
        PanNo: "",
        SecretQuestionId: "",
        SecretAnswer: "",
        IsPunishableOffence: "N",
        UserId: "",
      });

      // Optional: clear dependent dropdown data if you use them
      setDistricts([]);
      setPreview(null);
      setFileName("");
      if (fileRef.current) {
        fileRef.current.value = "";
      }


      // setSubDivisions([]);
    } catch (error) {
      // ASP.NET Core model validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data ||
        "";

      // Duplicate mobile validation
      if (
        typeof message === "string" &&
        (
          message.includes("UX_MM_US_REG_Mobile") ||
          message.includes("duplicate key") ||
          message.includes("Mobile")
        )
      ) {
        alert("This mobile number is already registered.");
        return;
      }

      alert(message || "Registration failed.");
      console.error("Registration error:", error.response?.data || error.message);
    }
  };




  return (


    <div className="registration-view">
      {/* Registration Banner */}
      <section className="reg-banner">
        <div className="reg-banner-overlay" />
        <img
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="reg-banner-bg"
        />
        <div className="container reg-banner-content">
          <div className="reg-header-box">
            <div className="reg-icon-circle">
              <UserSvg className="icon-lg reg-color-white" />
              <div className="reg-icon-plus">+</div>
            </div>
            <div>
              <h1 className="reg-main-title">User Registration</h1>
              <p className="reg-main-subtitle">Create your account to access the portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Card */}
      <section className="container reg-form-section">
        <div className="reg-card">
          <form className="registration-grid" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className= "registration-wrapper">
            <div className="registration-section">
  <div className="registration-section-header">
    <h3 className="registration-section-title">
      Personal Information
    </h3>
  </div>

  <div className="registration-fields">

    {/* First Name */}
    <div className="registration-field">
      <label className="registration-label">
        First Name <span className="registration-required">*</span>
      </label>

      <div className="registration-input-group">
        <div className="registration-input-icon">
          <UserSvg className="icon-xs" />
        </div>

        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="registration-input"
        />
      </div>

      {errors.FirstName && (
        <span className="registration-error">
          {errors.FirstName}
        </span>
      )}
    </div>


    {/* Middle Name */}
    <div className="registration-field">
      <label className="registration-label">
        Middle Name
      </label>

      <div className="registration-input-group">
        <div className="registration-input-icon">
          <UserSvg className="icon-xs" />
        </div>

        <input
          type="text"
          name="MiddleName"
          value={formData.MiddleName}
          onChange={handleChange}
          placeholder="Enter middle name"
          className="registration-input"
        />
      </div>
    </div>


    {/* Last Name */}
    <div className="registration-field">
      <label className="registration-label">
        Last Name
      </label>

      <div className="registration-input-group">
        <div className="registration-input-icon">
          <UserSvg className="icon-xs" />
        </div>

        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          placeholder="Enter last name"
          className="registration-input"
        />
      </div>
    </div>


    {/* Father / Husband Name */}
    <div className="registration-field">
      <label className="registration-label">
        Father / Husband Name{" "}
        <span className="registration-required">*</span>
      </label>

      <div className="registration-input-group">
        <div className="registration-input-icon">
          <UserSvg className="icon-xs" />
        </div>

        <input
          type="text"
          name="FatherHusbandName"
          value={formData.FatherHusbandName}
          onChange={handleChange}
          placeholder="Enter father / husband name"
          className="registration-input"
        />
      </div>

      {errors.FatherHusbandName && (
        <span className="registration-error">
          {errors.FatherHusbandName[0]}
        </span>
      )}
    </div>


    {/* Date of Birth */}
    <div className="registration-field">
      <label className="registration-label">
        Date of Birth{" "}
        <span className="registration-required">*</span>
      </label>

      <div className="registration-input-group">
        <input
          type="date"
          name="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
          className="registration-input"
        />
      </div>

      {errors.DateOfBirth && (
        <span className="registration-error">
          {errors.DateOfBirth[0]}
        </span>
      )}
    </div>


    {/* Gender */}
    <div className="registration-field">
      <label className="registration-label">
        Gender <span className="registration-required">*</span>
      </label>

      <div className="registration-radio-group">
        <label className="registration-radio-label">
          <input
            type="radio"
            name="Gender"
            value="M"
            checked={formData.Gender === "M"}
            onChange={handleChange}
          />
          <span>Male</span>
        </label>

        <label className="registration-radio-label">
          <input
            type="radio"
            name="Gender"
            value="F"
            checked={formData.Gender === "F"}
            onChange={handleChange}
          />
          <span>Female</span>
        </label>

        <label className="registration-radio-label">
          <input
            type="radio"
            name="Gender"
            value="O"
            checked={formData.Gender === "O"}
            onChange={handleChange}
          />
          <span>Other</span>
        </label>
      </div>

      {errors.Gender && (
        <span className="registration-error">
          {errors.Gender[0]}
        </span>
      )}
    </div>

    {/* Occupation */}
    <div className="registration-field">
      <label className="registration-label">
        Occupation <span className="registration-required">*</span>
      </label>

      <div className="registration-input-group">
        <div className="registration-input-icon">
          <BriefcaseSvg className="icon-xs" />
        </div>

        <input type="text" name="Occupation" value={formData.Occupation}
          onChange={handleChange} placeholder="Enter occupation" className="registration-input" />
      </div>

      {errors.Occupation && (
        <span className="registration-error">{errors.Occupation[0]}</span>
      )}
    </div>
    </div>
</div>
</div>
           {/* =========================================================
    ADDRESS DETAILS
    ========================================================= */}

<div className="registration-wrapper address-wrapper">

  <div className="registration-section address-section">

    {/* Section Header */}
    <div className="registration-section-header">
      <h3 className="registration-section-title">
        Address Details
      </h3>
    </div>


    <div className="registration-fields">


      {/* =====================================================
          ADDRESS LINE 1 - FULL WIDTH
          ===================================================== */}

      <div className="reg-field reg-field-full">
        <label className="reg-label">
          Address Line 1{" "}
          <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="AddressLine1"
            value={formData.AddressLine1}
            onChange={handleChange}
            placeholder="Enter address line 1"
            className="reg-input"
          />
        </div>

        {errors.AddressLine1 && (
          <span className="registration-error">
            {errors.AddressLine1[0]}
          </span>
        )}
      </div>


      {/* =====================================================
          ADDRESS LINE 2 - FULL WIDTH
          ===================================================== */}

      <div className="reg-field reg-field-full">
        <label className="reg-label">
          Address Line 2 (Optional)
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="AddressLine2"
            value={formData.AddressLine2}
            onChange={handleChange}
            placeholder="Enter address line 2"
            className="reg-input"
          />
        </div>
      </div>


      {/* =====================================================
          STATE
          ===================================================== */}

      <div className="reg-field">
        <label className="reg-label">
          State <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <select
            name="StateUT"
            className="reg-select"
            value={formData.StateUT}
            onChange={(e) =>
              setFormData({
                ...formData,
                StateUT: e.target.value
              })
            }
          >
            <option value="">Select State</option>

            {states.map((item) => (
              <option
                key={item.stateCode}
                value={item.stateCode}
              >
                {item.stateName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDownSvg className="icon-xs" />
          </div>
        </div>
      </div>

      {/* =====================================================
          DISTRICT
          ===================================================== */}

      <div className="reg-field">
        <label className="reg-label">
          District <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <select
            className="reg-select"
            name="District"
            value={formData.District}
            onChange={(e) => {
              handleChange(e);
              fetchSubDivisions(e.target.value);
            }}
          >
            <option value="">Select District</option>

            {districts.map((item) => (
              <option
                key={item.districtCode}
                value={item.districtCode}
              >
                {item.districtName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDownSvg className="icon-xs" />
          </div>
        </div>

        {errors.District && (
          <span className="registration-error">
            {errors.District[0]}
          </span>
        )}
      </div>


      {/* =====================================================
          SUB DIVISION
          ===================================================== */}

      <div className="reg-field">
        <label className="reg-label">
          Sub Division <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <select
            className="reg-select"
            name="SubDivision"
            value={formData.SubDivision}
            onChange={handleChange}
          >
            <option value="">Select Sub Division</option>

            {subDivisions.map((item) => (
              <option
                key={item.subDivisionCode}
                value={item.subDivisionCode}
              >
                {item.subDivisionName}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDownSvg className="icon-xs" />
          </div>
        </div>
      </div>
      
       {/* POLICE STATION */}

      <div className="reg-field">
        <label className="reg-label">
          Police Station <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="Police Station"
            value={formData['Police Station']}
            onChange={handleChange}
            placeholder="Enter police station"
            className="reg-input"
          />
        </div>

        {errors['Police Station'] && (
          <span className="registration-error">
            {errors['Police Station'][0]}
          </span>
        )}
      </div>

      {/* =====================================================
          PIN CODE
          ===================================================== */}

      <div className="reg-field">
        <label className="reg-label">
          PIN Code <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MapPinSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="PIN"
            value={formData.PIN}
            onChange={handleChange}
            maxLength={6}
            placeholder="11XXXX"
            className="reg-input"
          />
        </div>

        {errors.PIN && (
          <span className="registration-error">
            {errors.PIN[0]}
          </span>
        )}
      </div>


      {/* =====================================================
          MOBILE NUMBER
          ===================================================== */}

     


    </div>
  </div>
</div>
            {/* =========================================================
    CONTACT DETAILS
    ========================================================= */}

<div className="registration-wrapper contact-wrapper">

  <div className="registration-section contact-section">

    {/* Section Header */}
    <div className="registration-section-header">
      <h3 className="registration-section-title">
        Contact Details
      </h3>
    </div>

    <div className="registration-fields">

      {/* Email Address */}
      <div className="reg-field">
        <label className="reg-label">
          Email Address{" "}
          <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <MailSvg className="icon-xs" />
          </div>

          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="reg-input"
          />
        </div>

        {errors.Email && (
          <span className="registration-error">
            {errors.Email}
          </span>
        )}
      </div>


      {/* PAN Number */}
      <div className="reg-field">
        <label className="reg-label">
          PAN No <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <LockSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="PanNo"
            value={formData.PanNo || ""}
            onChange={handleChange}
            placeholder="ABCDE1234F"
            className="reg-input"
          />
        </div>

        {errors.PanNo && (
          <span className="registration-error">
            {errors.PanNo}
          </span>
        )}
      </div>
       
        <div className="reg-field">
        <label className="reg-label">
          Mobile Number <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <PhoneSvg className="icon-xs" />
          </div>

          <input
            type="tel"
            name="Mobile"
            value={formData.Mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            maxLength={10}
            className="reg-input"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
          />
        </div>

        {errors.Mobile && (
          <span className="registration-error">
            {errors.Mobile[0]}
          </span>
        )}
      </div>

    </div>
  </div>
</div>
           <div className="registration-wrapper other-details-wrapper">
  <div className="registration-section other-details-section">

    <div className="registration-section-header">
      <h3 className="registration-section-title">
        Other Details
      </h3>
    </div>

    <div className="registration-fields">

      {/* Secret Question */}
      <div className="reg-field">
        <label className="reg-label">
          Secret Question <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <ShieldCheckSvg className="icon-xs" />
          </div>

          <select
            name="SecretQuestionId"
            className="reg-select"
            value={formData.SecretQuestionId}
            onChange={(e) =>
              setFormData({
                ...formData,
                SecretQuestionId: e.target.value
              })
            }
          >
            <option value="">Select Secret Question</option>

            {questions.map((item) => (
              <option
                key={item.secretQuestionId}
                value={item.secretQuestionId}
              >
                {item.secretQuestion}
              </option>
            ))}
          </select>

          <div className="reg-input-icon-right">
            <ChevronDownSvg className="icon-xs" />
          </div>
        </div>

        {errors.SecretQuestionId && (
          <span className="registration-error">
            {errors.SecretQuestionId[0]}
          </span>
        )}
      </div>

      {/* Secret Answer */}
      <div className="reg-field">
        <label className="reg-label">
          Secret Answer <span className="reg-required">*</span>
        </label>

        <div className="reg-input-group">
          <div className="reg-input-icon">
            <LockSvg className="icon-xs" />
          </div>

          <input
            type="text"
            name="SecretAnswer"
            value={formData.SecretAnswer}
            onChange={handleChange}
            placeholder="Enter secret answer"
            className="reg-input"
          />
        </div>

        {errors.SecretAnswer && (
          <span className="registration-error">
            {errors.SecretAnswer[0]}
          </span>
        )}
      </div>

    </div>
  </div>
</div>

           <div className="reg-field">
  <label className="reg-label">
    Upload Photo <span className="reg-required">*</span>
  </label>

<<<<<<< Updated upstream
  <div className="photo-upload-row">

    {/* Upload Box */}
    <div
      className="upload-placeholder"
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];

        if (file) {
          handlePhotoChange({
            target: {
              files: [file],
            },
          });
        }
      }}
    >
      <CloudUploadSvg className="icon-md reg-color-primary" />

<div className="upload-content">
  {fileName ? (
    <>
      <div className="upload-text">
        {fileName}
      </div>

      <div className="upload-hint">
        Click to change photo
      </div>
    </>
  ) : (
    <>
      <div className="upload-text">
        Click to upload or drag & drop
      </div>

      <div className="upload-hint">
        JPG, PNG (Max. 2MB)
      </div>
    </>
  )}
</div>

   <input
  id="photo-upload"
  type="file"
  name="photo"
  accept="image/jpeg,image/png"
  onChange={handlePhotoChange}
  ref={fileRef}
  className="photo-input"
/>
    </div>

    {/* Photo Preview */}
    {photoPreview && (
      <div className="photo-preview">
        <img
          src={photoPreview}
          alt="Photo Preview"
        />
      </div>
    )}

  </div>
</div>
=======
                {/* Upload control */}
                <div className="reg-field reg-field-full">
                  <label className="reg-label">Upload Photo <span className="reg-required">*</span></label>
                <div className="upload-placeholder">
                  <CloudUploadSvg className="icon-md reg-color-primary" />
                  <div>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      ref={fileRef}
                      className="photo-input"
                    />
                    <div className="upload-hint">JPG, PNG (Max. 2MB)</div>
                  </div>
                </div>
                </div>
              </div>
             
            </div>
>>>>>>> Stashed changes
              <div className=" reg-field-full">
                <input type="checkbox" name="IsPunishableOffence" className="reg-checkbox" checked={formData.IsPunishableOffence === "Y"}
                  onChange={(e) => setFormData({ ...formData, IsPunishableOffence: e.target.checked ? "Y" : "N" }) } />
                <span className="punishable-offence">Has the Applicant ever been Blacklisted/Convicted of any Offence Punishable under Delhi Excise Act 2009, as was Previously Applicable to Delhi</span>
              </div>

            {/* Form Actions */}
            <div className="reg-actions-row col-span-full">
              <button type="submit" className="btn-reg-submit">
                <SendSvg className="icon-xs" />
                Submit
              </button>
              <button type="button" className="btn-reg-cancel">
                Cancel
              </button>
            </div>
            <div className="login-link-footer">
              <p className="login-link-text">
                Already have an account?
                <button
                  type="button"
                  onClick={() => onNavigateToLogin()}
                  className="login-here-btn"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="container reg-feature-strip">
        <div className="reg-feature-grid">
          <div className="reg-feature-item">
            <div className="reg-feature-icon blue">
              <ShieldSvg className="icon-md" />
            </div>
            <div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-desc">Your data is protected with highest security standards</p>
            </div>
          </div>
          <div className="reg-feature-item">
            <div className="reg-feature-icon green">
              <TimerSvg className="icon-md" />
            </div>
            <div>
              <h3 className="feature-title">Quick & Easy</h3>
              <p className="feature-desc">Simple process with minimal steps to get started</p>
            </div>
          </div>
          <div className="reg-feature-item">
            <div className="reg-feature-icon purple">
              <RefreshCwSvg className="icon-md" />
            </div>
            <div>
              <h3 className="feature-title">Transparent Process</h3>
              <p className="feature-desc">Track your application status in real-time</p>
            </div>
          </div>
          <div className="reg-feature-item">
            <div className="reg-feature-icon orange">
              <HeadphonesSvg className="icon-md" />
            </div>
            <div>
              <h3 className="feature-title">Help & Support</h3>
              <p className="feature-desc">24/7 assistance for all your queries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


