import React, { useState, useEffect } from "react";
import { applyPermit, getApplicantByRegId, getPermitP10 } from "../../../../api/permitApi";
import ApplicantDetails from "./ApplicantDetails";
import EventDetailsPage from "./EventDetails";
import IdentityDetailsPage from "./IdentityDetailPage";
import LiquorDetailsPage from "./LiquorDetailPage";
import GetPermit from "./GetPermit";
import {
  User,
  Calendar,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Shield,
  Info,
  Building,
  Printer,
  QrCode,
  MapPin,
  Clock,
  Check,
  Building2,
  Lock,
  Package,
  Award,
  CreditCard,
  AlertTriangle
} from "lucide-react";

export default function P10Page({ onBackToDashboard, showToast, onSubmitPermit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [permitReceipt, setPermitReceipt] = useState(null);
  const [submittedApplicationIdNo, setSubmittedApplicationIdNo] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Applicant Details — populated by ApplicantDetails.jsx via GetApplicantByRegId
    applicantName: "",
    dob: "",
    fatherName: "",
    occupation: "",
    panNo: "",
    address1: "",
    address2: "",
    state: "",
    district: "",
    subDivision: "",
    pin: "",
    email: "",
    mobile: "",
    landline: "",
    fax: "",
    licenseType: "4",
    finYear: "2",
    regId: Number(localStorage.getItem("regId")) || null,

    // Step 2: Event Details
    premisesType: "Farmhouse",
    premiseName: "",
    premiseAddress: "",
    venueCategory: "",
    venueAddress: "",
    latitude: "",
    longitude: "",
    eventType: "Birthday",
    occasionName: "",
    servingStartDate: "",
    servingEndDate: "",
    startTime: "",
    endTime: "",
    estimatedGuests: "",
    isVenueLicensed: "",

    // Step 3: Identity Details
    idProofType: "",
    idNumber: "",
    idProofFileName: "",
    idProofFileUrl: "#",

    // Step 4: Liquor Details
    sourcingType: "",
    eventendtime: "",
    brandsToServe: "",
    qtyImfl: "",
    qtyImported: "",
    qtyBeerWine: "",
    estimatedCost: "",
    liquorItems: [
      {
        id: 1,
        liquorType: "",
        liquorCategory: "",
        bottleSize: 0,
        quantity: 0,
      }
    ],

    // Step 5: Declaration
    undertakingAccept: true,
    signatureName: "", // Will be populated from API
    signingPlace: "New Delhi"
  });

  const [errors, setErrors] = useState({});

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const regId = localStorage.getItem("regId");
      
      if (!regId) {
        console.warn("No RegId found in localStorage");
        setFormData(prev => ({
          ...prev,
          signatureName: "",
          applicantName: ""
        }));
        return;
      }

      setLoadingUser(true);
      try {
        const response = await getApplicantByRegId(regId);
        console.log("User Details Response:", response.data);

        const userData = response.data;

        // ========== FIX: Extract FirstName and LastName ==========
        // Try to get FirstName and LastName from various possible field names
        const firstName = userData.firstName || 
                         userData.FirstName || 
                         userData.firstname || 
                         userData.Firstname || 
                         userData.fName || 
                         userData.FName || 
                         "";

        const lastName = userData.lastName || 
                        userData.LastName || 
                        userData.lastname || 
                        userData.Lastname || 
                        userData.lName || 
                        userData.LName || 
                        "";

        // Concatenate FirstName and LastName
        const fullName = [firstName, lastName]
          .filter(name => name && name.trim() !== "")
          .join(" ")
          .trim();

        // If fullName is empty, try other fallback fields
        const userName = fullName || 
                        userData.applicantName || 
                        userData.userName || 
                        userData.UserName || 
                        userData.name || 
                        userData.Name || 
                        userData.fullName || 
                        userData.FullName 
                        

        const userEmail = userData.email || userData.Email || userData.mail || userData.Mail || "";
        const userMobile = userData.mobile || userData.Mobile || userData.phone || userData.Phone || "";
        const userPanNo = userData.panNo || userData.PanNo || userData.pan || userData.Pan || "";
        
        // Extract father/husband name
        const fatherName = userData.fatherHusbandName || 
                          userData.FatherHusbandName || 
                          userData.fatherName || 
                          userData.FatherName || 
                          "";

        // Extract date of birth
        const rawDob = userData.dateOfBirth || 
                   userData.DateOfBirth || 
                   userData.dob || 
                   userData.Dob || 
                   "";
        const formattedDob = rawDob
  ? new Date(rawDob).toISOString().split("T")[0]
  : "";
        // Extract address
        const address1 = userData.addressLine1 || 
                        userData.AddressLine1 || 
                        userData.address1 || 
                        userData.Address1 || 
                        userData.presentAddress || 
                        "";

        const address2 = userData.addressLine2 || 
                        userData.AddressLine2 || 
                        userData.address2 || 
                        userData.Address2 || 
                        "";

        // Extract state, district, etc.
        const state = userData.stateUT || 
                     userData.StateUT || 
                     userData.state || 
                     userData.State || 
                     "";

        const district = userData.district || 
                        userData.District || 
                        "";

        const subDivision = userData.subDivision || 
                           userData.SubDivision || 
                           "";

        const pin = userData.pin || 
                   userData.PIN || 
                   userData.pincode || 
                   userData.Pincode || 
                   "";

        // Update form data with user details
        setFormData(prev => ({
          ...prev,
          // Applicant name (full name)
          applicantName: userName,
          // Signature name (full name in uppercase)
          signatureName: userName.toUpperCase(),
          // Other details
          email: userEmail,
          mobile: userMobile || prev.mobile,
          panNo: userPanNo || prev.panNo,
          dob: formattedDob || prev.dob,
          fatherName: fatherName || prev.fatherName,
          occupation: userData.occupation || userData.Occupation || prev.occupation,
          address1: address1 || prev.address1,
          address2: address2 || prev.address2,
          state: state || prev.state,
          district: district || prev.district,
          subDivision: subDivision || prev.subDivision,
          pin: pin || prev.pin,
        }));

        if (showToast) {
          showToast(`Welcome ${userName}!`, "success");
        }

      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Set default name if API fails
        setFormData(prev => ({
          ...prev,
          applicantName: "",
          signatureName: ""
        }));
        if (showToast) {
          showToast("Could not load user details. Using default values.", "error");
        }
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this runs once on mount

  const steps = [
    { num: 1, label: "Step 1", desc: "Applicant Details" },
    { num: 2, label: "Step 2", desc: "Event Details" },
    { num: 3, label: "Step 3", desc: "Identity Details" },
    { num: 4, label: "Step 4", desc: "Liquor Details" },
    { num: 5, label: "Step 5", desc: "Declaration" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.applicantName.trim()) newErrors.applicantName = "Applicant name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
      if (!formData.panNo.trim()) newErrors.panNo = "PAN no is required";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.trim())) {
        newErrors.panNo = "Invalid PAN card format (e.g. ABCDE1234F)";
      }
      if (!formData.address1.trim()) newErrors.address1 = "Address line 1 is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.pin.trim()) newErrors.pin = "PIN is required";
      if (!/^\d{6}$/.test(formData.pin.trim())) {
        newErrors.pin = "PIN code must be a 6-digit number";
      }
      if (!formData.email.trim()) newErrors.email = "Email address is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email formatting";
      }
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
      if (!/^\d{10}$/.test(formData.mobile.trim())) {
        newErrors.mobile = "Mobile count must be exactly 10 digits";
      }
    }

    if (step === 2) {
      if (!formData.premiseName || !formData.premiseName.trim()) {
        newErrors.premiseName = "Premise name selection is required";
      }
      if (!formData.venueAddress || !formData.venueAddress.trim()) {
        newErrors.venueAddress = "Full premise address selection is required";
      }
      if (!formData.servingStartDate) newErrors.servingStartDate = "Start date required";
      if (!formData.startTime) newErrors.startTime = "Start execution time required";
      if (!formData.endTime) newErrors.endTime = "End execution time required";
      if (!formData.estimatedGuests || Number(formData.estimatedGuests) <= 0) {
        newErrors.estimatedGuests = "Please specify expected guest headcount";
      }
    }

    if (step === 3) {
      if (!formData.idProofType) {
        newErrors.idProofType = "Id proof type selection is required";
      }
      if (!formData.idNumber || !formData.idNumber.trim()) {
        newErrors.idNumber = "Id proof identification number is required";
      }
      if (!formData.idProofFileName) {
        newErrors.idProofFileName = "Id proof document copy upload is required";
      }
    }

    if (step === 4) {
      if (!formData.liquorItems || formData.liquorItems.length === 0) {
        newErrors.liquorItems = "At least one row of liquor details is required";
      } else {
        formData.liquorItems.forEach((item, idx) => {
          if (!item.liquorType || !item.liquorType.trim()) {
            newErrors[`liquorItem_${idx}_type`] = "Liquor type is required";
          }
          if (!item.liquorCategory) {
            newErrors[`liquorItem_${idx}_category`] = "Liquor category is required";
          }
          if (Number(item.bottleSize) <= 0) {
            newErrors[`liquorItem_${idx}_size`] = "Bottle size is required";
          }
          if (Number(item.quantity) <= 0) {
            newErrors[`liquorItem_${idx}_qty`] = "Quantity is required";
          }
        });
      }
    }

    if (step === 5) {
      if (!formData.undertakingAccept) {
        newErrors.undertakingAccept = "Agreement to statutory conditions required";
      }
      if (!formData.signatureName.trim()) {
        newErrors.signatureName = "Please digitally sign with your full legal name";
      }
      if (!formData.signingPlace.trim()) {
        newErrors.signingPlace = "Signature location / place is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep))
      return;

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Step
      await handleFinalSubmission();
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBackToDashboard();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmission = async () => {
    if (!formData.regId) {
      if (showToast) showToast("Session expired. Please log in again.", "error");
      return;
    }

    const form = new FormData();

    // Step 1: Applicant Details
    form.append("ApplicantName", formData.applicantName);
    form.append("DateOfBirth", formData.dob);
    form.append("FatherHusbandName", formData.fatherName);
    form.append("Occupation", formData.occupation);
    form.append("PanNo", formData.panNo);

    form.append("PresentAddress", formData.address1);
    form.append("PermanentAddress", formData.address2);

    form.append("StateUT", formData.state);
    form.append("District", formData.district);
    form.append("SubDivision", formData.subDivision);
    form.append("PIN", formData.pin);

    form.append("Mobile", formData.mobile);
    form.append("Email", formData.email);
    form.append("LandLine", formData.landline);

    // Step 2: Event Details
    form.append("PremiseType", formData.premisesType);
    form.append("PremiseName", formData.premiseName);
    form.append("PremiseAddress", formData.premiseAddress);

    form.append("Latitude", formData.latitude);
    form.append("Longitude", formData.longitude);

    form.append("EventType", formData.eventType);

    form.append("PremiseGuestNo", formData.estimatedGuests);

    form.append("PremiseStartEventDate", formData.servingStartDate);
    form.append("PremiseEndEventDate", formData.servingEndDate);

    form.append("PremiseStartTime", formData.startTime);
    form.append("PremiseEndTime", formData.endTime);

    form.append("ApplicantMobile", formData.mobile);
    form.append("TypeOfIdProof", formData.idProofType);
    form.append("ProofIdNo", formData.idNumber);

    // Other Details
    form.append("LicenseType", formData.licenseType);
    form.append("FinYear", formData.finYear);
    form.append("RegId", formData.regId);

    // Liquor Details
    (formData.liquorItems || []).forEach((item, index) => {
      form.append(`P10LiquorDetails[${index}].LiquorType`, item.liquorType);
      form.append(`P10LiquorDetails[${index}].LiquorCategory`, item.liquorCategory);
      form.append(`P10LiquorDetails[${index}].LiquorBottleSize`, item.bottleSize);
      form.append(`P10LiquorDetails[${index}].Quantity`, item.quantity);
    });

    console.log("Files to submit:", selectedFiles);
    selectedFiles.forEach((file, index) => {
      form.append(`LicenseApplicationUploadedDocument[${index}].DocUrl`, file);
      form.append(`LicenseApplicationUploadedDocument[${index}].DocStatus`, "P");
      form.append(`LicenseApplicationUploadedDocument[${index}].MobileNo`, formData.mobile);
    });

    try {
      const response = await applyPermit(form);
      const apiData = response.data || {};
      console.log("Submit response:", apiData);

      const pick = (...vals) => vals.find(v => v !== undefined && v !== null && v !== "") ?? "";
      // Unwrap common wrapper shapes so we can find the newly created ApplicationIdNo
      const payload = apiData.data || apiData.result || apiData;
      const newApplicationIdNo = pick(
        payload.applicationIdNo, payload.ApplicationIdNo,
        payload.applicationIdno, payload.ApplicationIdno
      );

      if (!newApplicationIdNo) {
        console.warn("Submit response did not include an ApplicationIdNo:", apiData);
      }

      alert("Form submitted successfully!");
      setSubmittedApplicationIdNo(newApplicationIdNo);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error.response?.data || error);
      if (showToast) showToast("Application submission failed", "error");
    }
  };

  const triggerPrint = () => {
    if (showToast) showToast("Initializing printer spooler for local thermal receipts...");
    window.print();
  };  return (
    <div className="p10-container">
      
      {/* Premium Header Banner matching requested style */}
      <div className="p10-header-banner">
        <h1 className="p10-header-title">
          P-10 (Permit for Service of Indian Liquor and Foreign Liquor at a place other than the licensed premises)
        </h1>
      </div>

      {!submitSuccess && (
        <>
          {/* Horizontal Stepper matching the card styling in the image */}
          <div className="p10-stepper-card">
            <div className="p10-stepper-inner">
              
              {/* Stepper block list with chevron dividers */}
              {steps.map((st, idx) => {
                const isActive = st.num === currentStep;
                const isCompleted = st.num < currentStep;

                return (
                  <React.Fragment key={st.num}>
                    <div 
                      onClick={() => {
                        if (isCompleted) setCurrentStep(st.num);
                      }}
                      className={`p10-step-item ${
                        isActive
                          ? "p10-step-active"
                          : isCompleted
                          ? "p10-step-completed"
                          : ""
                      }`}
                    >
                      {/* Circle Number */}
                      <div className="p10-step-num">
                        {isCompleted ? <Check className="p10-step-num-icon" /> : st.num}
                      </div>

                      {/* Text tags */}
                      <div className="p10-step-text-wrap">
                        <p className="p10-step-title">
                          {st.label}
                        </p>
                        <p className="p10-step-desc">
                          {st.desc}
                        </p>
                      </div>
                    </div>

                    {/* Chevron separator */}
                    {idx < steps.length - 1 && (
                      <span className="p10-step-chevron">&gt;</span>
                    )}
                  </React.Fragment>
                );
              })}

            </div>
          </div>

          {/* Form Content Body Card or Standalone Liquor Details Page */}
          {currentStep === 4 ? (
            <LiquorDetailsPage 
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
              showToast={showToast}
              onBackStep={handleBack}
              onNextStep={() => {
                setCurrentStep(5);
                if (showToast) showToast("Moving to Step-5 Declaration");
              }}
            />
          ) : (
            <div className="p10-form-card">
              
              {/* Step 1: Applicant Details */}
              {currentStep === 1 && (
                <ApplicantDetails 
                  formData={formData}
                  onChange={handleInputChange}
                  errors={errors}
                />
              )}

              {/* Step 2: Event Details */}
              {currentStep === 2 && (
                <EventDetailsPage 
                  formData={formData}
                  onChange={handleInputChange}
                  errors={errors}
                />
              )}

              {/* Step 3: Identity Details */}
              {currentStep === 3 && (
                <IdentityDetailsPage 
                  formData={formData}
                  onChange={handleInputChange}
                  errors={errors}
                  showToast={showToast}
                />
              )}

              {/* Step 5: Declaration & digital signature */}
              {currentStep === 5 && (
                <div className="p10-declaration-section">
                  <div className="p10-declaration-header">
                    <div className="p10-declaration-icon-wrap">
                      <Award style={{ width: '1.5rem', height: '1.5rem', color: '#0d9488' }} />
                    </div>
                    <div className="p10-declaration-title-wrap">
                      <h2 className="p10-declaration-title">Statutory Undertaking</h2>
                      <p className="p10-declaration-subtitle">
                        Review standard declarations and digital endorsement signature.
                      </p>
                    </div>
                  </div>

                  <div className="p10-declaration-body">
                    
                    {/* Informational advice */}
                    <div className="p10-notice-card">
                      <div className="p10-notice-badge">
                        !
                      </div>
                      <div className="p10-notice-content">
                        <p className="p10-notice-title">Legal Endorsement Notice</p>
                        <p className="p10-notice-desc">
                          Under Section 10 of the Delhi Excise Act, 2009, making false representations or serving illicit non-duty paid/commercial stock carries mandatory penalty of up to 3 years imprisonment and ₹1,00,000 fine.
                        </p>
                      </div>
                    </div>

                    {/* Declaration checkboxes */}
                    <div className="p10-checkbox-box">
                      <label className="p10-checkbox-label">
                        <input 
                          type="checkbox"
                          checked={formData.undertakingAccept || false}
                          onChange={(e) => handleInputChange("undertakingAccept", e.target.checked)}
                          className="p10-checkbox"
                        />
                        <span className="p10-checkbox-text">
                          I hereby solemnly affirm and declare that the statements made above are true to the best of my knowledge and belief, and that I will serve only duty paid liquor procured from authorized L-2 retail vends. *
                        </span>
                      </label>
                      {errors.undertakingAccept && <p className="p10-error-text">{errors.undertakingAccept}</p>}
                    </div>

                    {/* Signature field */}
                    <div className="p10-signature-grid">
                      
                      <div className="p10-field-group">
                        <label className="p10-field-label">Applicant Digital Signature (Enter Full Name) <span className="p10-required">*</span></label>
                        <input 
                          type="text"
                          value={formData.signatureName || ""}
                          onChange={(e) => handleInputChange("signatureName", e.target.value.toUpperCase())}
                          className={`p10-input p10-signature-input ${errors.signatureName ? "p10-input-error" : ""}`}
                          placeholder="DEVENDER MITTAL"
                        />
                        {errors.signatureName && <p className="p10-error-text">{errors.signatureName}</p>}
                      </div>

                      <div className="p10-field-group">
                        <label className="p10-field-label">Place of Signing <span className="p10-required">*</span></label>
                        <input 
                          type="text"
                          value={formData.signingPlace || ""}
                          onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                          className={`p10-input ${errors.signingPlace ? "p10-input-error" : ""}`}
                          placeholder="New Delhi"
                        />
                        {errors.signingPlace && <p className="p10-error-text">{errors.signingPlace}</p>}
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* Action buttons footer for step Wizard */}
              <div className="p10-footer">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="p10-btn p10-btn-back"
                >
                  <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                  <span>{currentStep === 1 ? "Change Permit Type" : "Back"}</span>
                </button>

                <button 
                  type="button" 
                  onClick={handleNext}
                  className="p10-btn p10-btn-next"
                >
                  <span>{currentStep === 5 ? "Submit & Approve P-10" : "Next"}</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>

            </div>
          )}
        </>
      )}

      {/* Success Receipt State View */}
      {submitSuccess && permitReceipt && (
        <div className="p10-receipt-wrapper">
          
          <div className="p10-receipt-card">
            
            {/* Success Confirmed Banner */}
            <div className="p10-success-icon-wrap">
              <CheckCircle2 className="p10-success-icon" />
            </div>

            <div className="p10-receipt-header">
              <h2 className="p10-receipt-title">Approved Permit Issued</h2>
              <p className="p10-receipt-subtitle">Your private occasional P-10 permit has been registered on the Delhi Excise registry.</p>
            </div>

            {/* Print Friendly Invoice Receipt Card */}
            <div className="p10-receipt-body">
              
              {/* Receipt Header Title */}
              <div className="p10-receipt-top">
                <div>
                  <h3 className="p10-receipt-doc-title">DELHI EXCISE ACT - FORM P-10</h3>
                  <p className="p10-receipt-doc-subtitle">REGISTRY TRANSACTION RECORD</p>
                </div>
                <div className="p10-status-badge">
                  Approved
                </div>
              </div>

              {/* Grid content standard labels */}
              <div className="p10-receipt-grid">
                
                <div>
                  <span className="p10-grid-label">Permit Number:</span>
                  <span className="p10-grid-value-bold">{permitReceipt.permitNo}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Ref PAN Number:</span>
                  <span className="p10-grid-value-bold">{permitReceipt.panNo}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Applicant Licensee:</span>
                  <span className="p10-grid-value-black">{permitReceipt.applicantName}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Service Contact:</span>
                  <span className="p10-grid-value-black">{permitReceipt.mobile}</span>
                </div>

                <div className="p10-grid-col-2">
                  <span className="p10-grid-label">Event Venue Address:</span>
                  <span className="p10-grid-value-block">{permitReceipt.venue}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Scheduled Execution Date:</span>
                  <span className="p10-grid-value">{permitReceipt.permitStartDate}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Serving Duration hours:</span>
                  <span className="p10-grid-value">{permitReceipt.startTime} - {permitReceipt.endTime}</span>
                </div>

                <div className="p10-grid-col-2">
                  <span className="p10-grid-label">Sourcing Stock supplier:</span>
                  <span className="p10-grid-value">{permitReceipt.sourcingShed}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Statutory Fee Paid:</span>
                  <span className="p10-grid-fee">{permitReceipt.feePaid}</span>
                </div>

                <div>
                  <span className="p10-grid-label">Issue Date stamp:</span>
                  <span className="p10-grid-value-bold">{permitReceipt.generatedAt}</span>
                </div>

              </div>

              {/* Graphic QR Verification segment replicating real government layouts */}
              <div className="p10-qr-box">
                <div className="p10-qr-wrap">
                  <QrCode className="p10-qr-code" />
                </div>
                <div className="p10-qr-info">
                  <p className="p10-qr-title">
                    <ShieldCheck className="p10-shield-icon" />
                    <span>Cryptographically Signed</span>
                  </p>
                  <p className="p10-qr-text">
                    This is a computer-generated statutory transit pass and does not require a physical ink seal signature. scan QR code to verify live credentials against registry portal.
                  </p>
                </div>
              </div>

            </div>

            {/* Card Buttons */}
            <div className="p10-receipt-actions">
              
              <button
                type="button"
                onClick={triggerPrint}
                className="p10-btn p10-btn-print"
              >
                <Printer style={{ width: '1rem', height: '1rem' }} />
                <span>Print Transit Gate Pass</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setPermitReceipt(null);
                  setCurrentStep(1);
                  onBackToDashboard();
                }}
                className="p10-btn p10-btn-finish"
              >
                Finish & Go to Dashboard
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
