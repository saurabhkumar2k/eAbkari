

import React, { useState,useRef, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    FirstName: '',
   LastName: '',
   FatherHusbandName: '',
    DateOfBirth: '',
    Gender: '',
    Occupation: '',
    AddressLine1: '',
    AddressLine2: '',
    City: '',
    StateUT: '',
    District: '',
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
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);

      
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };


const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));

  // 🔥 clear error on typing
  setErrors((prev) => ({
    ...prev,
    [name]: ""
  }));
};


const handleSubmit = async (e) => {
  debugger;
  e.preventDefault();

  const formDataToSend = new FormData(e.target);

formDataToSend.set(
  "IsPunishableOffence",
  formData.IsPunishableOffence
  
);

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
  `Registration Successful!\n\n Your Registration ID: ${response.data.regId},\n\n Your User ID: ${response.data.userId}`
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
      City: "",
      StateUT: "",
      District: "",
      PIN: "",
      Mobile: "",
      Email: "",
      Photo:"",
      PanNo: "",
      SecretQuestionId: "",
      SecretAnswer: "",
      IsPunishableOffence: "N",
      UserId: "",
    });

    // Optional: clear dependent dropdown data if you use them
    setDistricts([]);
     setPreview(null); 
 if (fileRef.current) {
    fileRef.current.value = "";
  }


    // setSubDivisions([]);
  } catch (error) {
  // ASP.NET Core model validation errors
  if (error.response?.data?.errors) {
    setErrors(error.response.data.errors);
    return;
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
          <form className="reg-grid" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="reg-field reg-field-full">
              <label className="reg-label">First Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>


<input
  type="text"
  name="FirstName"
  value={formData.FirstName}
  onChange={handleChange}
  placeholder="Enter first name"
  className="reg-input"
/>



              </div>
              {errors.FirstName && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.FirstName} </span>)}
            </div>


            <div className="reg-field">
              <label className="reg-label">Last Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>
                <input type="text" name="LastName"value={formData.LastName} onChange={handleChange} placeholder="Enter last name" className="reg-input"/>
              </div>
                         {errors.LastName && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.LastName[0]} </span>)}
            </div>

            <div className="reg-field">
              <label className="reg-label">Father / Husband Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>
                <input type="text" name="FatherHusbandName" value={formData.FatherHusbandName} onChange={handleChange} placeholder="Enter father / husband name" className="reg-input" />
              </div>
                          {errors.FatherHusbandName && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.FatherHusbandName[0]} </span>)}
            </div>

            <div className="reg-field">
              <label className="reg-label">Date of Birth <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                {/* <input type="text" placeholder="DD/MM/YYYY" className="reg-input" /> */}

                <input
  type="date"
  name="DateOfBirth"
  value={formData.DateOfBirth}
  onChange={handleChange}
  className="reg-input"
/>
                <div className="reg-input-icon-right"><CalendarSvg className="icon-xs" /></div>
              </div>
              {errors.DateOfBirth && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.DateOfBirth[0]} </span>)}
            </div>








            <div className="reg-field">
              <label className="reg-label">Gender <span className="reg-required">*</span></label>
              <div className="reg-radio-group">
                <label className="reg-radio-label">
                  <input type="radio" name="Gender" value="M" checked={formData.Gender === 'M'} onChange={handleChange}/>Male
                </label>
                <label className="reg-radio-label">
                  <input type="radio" name="Gender" value="F" checked={formData.Gender === 'F'} onChange={handleChange}/> Female
                </label>
                <label className="reg-radio-label">
                  <input type="radio" name="Gender" value="O" checked={formData.Gender === 'O'} onChange={handleChange}/> Other
                </label>
              </div>
              {errors.Gender && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.Gender[0]} </span>)}
            </div>





            <div className="reg-field">
              <label className="reg-label">Occupation <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><BriefcaseSvg className="icon-xs" /></div>
                {/* <select className="reg-select">
                  <option>Select occupation</option>
                </select> */}
                <input type="text" name="Occupation" value={formData.Occupation} onChange={handleChange} placeholder="Enter occupation" className="reg-input" />
                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
                 </div>
                {errors.Occupation && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.Occupation[0]} </span>)}
             
            </div>

            <div className="reg-field reg-field-full">
              <label className="reg-label">Address Line 1 <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} placeholder="Enter address line 1" className="reg-input" />
              </div>
              {errors.AddressLine1 && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.AddressLine1[0]} </span>)}
            </div>

            <div className="reg-field reg-field-full">
              <label className="reg-label">Address Line 2 (Optional)</label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" name="AddressLine2" value={formData.AddressLine2} onChange={handleChange} placeholder="Enter address line 2" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">City <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" name="City" value={formData.City} onChange={handleChange} placeholder="Enter city" className="reg-input" />
              </div>
              {errors.City && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.City[0]} </span>)}
            </div>

            <div className="reg-field">
              <label className="reg-label">State <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                {/* <select className="reg-select">
                  <option>Select state</option>
                </select> */}


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
    <option key={item.stateCode} value={item.stateCode}>
      {item.stateName}
    </option>
  ))}
</select>

                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
                </div>
                {/* {errors.StateUT && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.StateUT[0]} </span>)} */}
              
            </div>

            <div className="reg-field">
              <label className="reg-label">District <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                {/* <select className="reg-select">
                  <option>Select district</option>
                </select> */}


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


                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
                </div>
                {errors.District && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.District[0]} </span>)}
              
            </div>

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












            <div className="reg-field">
              <label className="reg-label">PIN Code <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" name="PIN" value={formData.PIN} onChange={handleChange} placeholder="Enter PIN code" className="reg-input" />
              </div>
              {errors.PIN && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.PIN[0]} </span>)}
            </div>

            <div className="reg-field">
              <label className="reg-label">Mobile Number <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><PhoneSvg className="icon-xs" /></div>
                <input type="tel" name="Mobile" value={formData.Mobile} onChange={handleChange} placeholder="Enter mobile number" maxLength={10} className="reg-input" pattern="[0-9]{10}" title="Enter a valid 10-digit mobile number" />
              </div>
              {errors.Mobile && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.Mobile[0]} </span>)}
            </div>

            <div className="reg-field">
              <label className="reg-label">Email Address <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MailSvg className="icon-xs" /></div>
                <input type="email"name="Email" value={formData.Email} onChange={handleChange}placeholder="Enter email address" className="reg-input"
/>
              </div>
              {errors.Email && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.Email} </span>)}
            </div>



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
      value={formData.PanNo}
      onChange={handleChange}
      placeholder="ABCDE1234F"
      className="reg-input"
    />
  </div>
</div>



            <div className="reg-field">
              
              <label className="reg-label">Secret Question <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><ShieldCheckSvg className="icon-xs" /></div>
                {/* <select className="reg-select">
                  <option>Select secret question</option>
                </select> */}

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



                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
                {errors.SecretQuestionId && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.SecretQuestionId[0]} </span>)}
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Secret Answer <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><LockSvg className="icon-xs" /></div>
                <input type="text" value={formData.SecretAnswer} onChange={handleChange} name="SecretAnswer" placeholder="Enter secret answer" className="reg-input" />
              </div>
              {errors.SecretAnswer && (
  <span className="text-danger" style={{ marginTop: "1px", display: "block" , color: "red"}}> {errors.SecretAnswer[0]} </span>)}
            </div>

      <div className="reg-field-row reg-field-full">
  <div>
    {/* Preview above the upload control */}
  {preview && (
  <div style={{ marginBottom: "10px" }}>
    <img
      src={preview}
      alt="Preview"
      style={{
        width: "150px",
        height: "120px",
        objectFit: "contain",
        border: "1px solid #d1d5db",
        borderRadius: "4px",
        backgroundColor: "#fff"
      }}
    />
  </div>
)}

    {/* Upload control */}
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

<input
  type="checkbox"
  name="IsPunishableOffence"
  className="reg-checkbox"
  checked={formData.IsPunishableOffence === "Y"}
  onChange={(e) =>
    setFormData({
      ...formData,
      IsPunishableOffence: e.target.checked ? "Y" : "N"
    })
  }
/>
<span>Pursuable Offence</span>

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


