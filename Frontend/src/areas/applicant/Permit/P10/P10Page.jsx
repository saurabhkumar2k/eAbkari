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
  };

  return (
    <div className="p10-container select-none text-slate-800 animate-fade">
      
      {/* Premium Header Banner matching requested style */}
      <div className="w-full bg-[#003366] text-white py-3.5 px-6 rounded-t-xl mb-6 shadow-sm text-center flex items-center justify-center">
        <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white leading-tight uppercase font-sans">
          P-10 (Permit for Service of Indian Liquor and Foreign Liquor at a place other than the licensed premises)
        </h1>
      </div>

      {!submitSuccess && (
        <>
          {/* Horizontal Stepper matching the card styling in the image */}
          <div className="p10-stepper p10-stepper-card bg-slate-50 border border-slate-200 shadow-sm overflow-x-auto select-none">
            <div className="flex items-center justify-between min-w-[780px] relative px-2">
              
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
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl border transition-all duration-300 flex-1 justify-center cursor-pointer ${
                        isActive
                          ? "bg-[#1d4ed8] border-[#1d4ed8] text-white shadow-lg shadow-blue-100 scale-[1.02]"
                          : isCompleted
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-white border-slate-200 text-slate-500"
                      }`}
                    >
                      {/* Circle Number */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isActive 
                          ? "bg-white text-blue-600 font-black shadow-sm"
                          : isCompleted
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                      </div>

                      {/* Text tags */}
                      <div className="text-left leading-snug">
                        <p className={`p10-step-title uppercase tracking-wider font-extrabold ${isActive ? "text-blue-100" : isCompleted ? "text-emerald-600" : "text-slate-400"}`}>
                          {st.label}
                        </p>
                        <p className={`p10-step-label whitespace-nowrap ${isActive ? "text-white" : isCompleted ? "text-emerald-900" : "text-slate-700"}`}>
                          {st.desc}
                        </p>
                      </div>
                    </div>

                    {/* Chevron separator */}
                    {idx < steps.length - 1 && (
                      <span className="text-slate-350 text-xl font-bold px-2 select-none">&gt;</span>
                    )}
                  </React.Fragment>
                );
              })}

            </div>
          </div>

          {/* Form Content Body Card */}
          <div className="p10-form-card p-6 sm:p-8 text-left">
            
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
                onFileSelect={(file) => setSelectedFiles(file ? [file] : [])}
              />      
            )}

            {/* Step 4: Liquor Details */}
            {currentStep === 4 && (
              <LiquorDetailsPage 
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
                showToast={showToast}
                onNextStep={() => {
                  setCurrentStep(5);
                  if (showToast) showToast("Moving to Step-5 Declaration");
                }}
              />
            )}

            {/* Step 5: Declaration & digital signature */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 border border-teal-100">
                    <Award className="w-6 h-6 text-[#0d9488]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Statutory Undertaking</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Review standard declarations and digital endorsement signature.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  
                  {/* Informational advice */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                      !
                    </div>
                    <div className="text-xs text-slate-700 font-semibold leading-relaxed">
                      <p className="font-bold text-slate-900">Legal Endorsement Notice</p>
                      <p className="text-slate-500 font-medium mt-0.5">
                        Under Section 10 of the Delhi Excise Act, 2009, making false representations or serving illicit non-duty paid/commercial stock carries mandatory penalty of up to 3 years imprisonment and ₹1,00,000 fine.
                      </p>
                    </div>
                  </div>

               

                  {/* Declaration checkboxes */}
                  <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formData.undertakingAccept}
                        onChange={(e) => handleInputChange("undertakingAccept", e.target.checked)}
                        className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5 accent-blue-600"
                      />
                      <span className="text-xs font-bold text-slate-800 leading-normal">
                        I hereby solemnly affirm and declare that the statements made above are true to the best of my knowledge and belief, and that I will serve only duty paid liquor procured from authorized L-2 retail vends. *
                      </span>
                    </label>
                    {errors.undertakingAccept && <p className="text-[11px] text-red-650 font-black pl-7">{errors.undertakingAccept}</p>}
                  </div>

                  {/* Signature field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Applicant Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        value={formData.signatureName}
                        onChange={(e) => handleInputChange("signatureName", e.target.value.toUpperCase())}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black font-serif tracking-wider text-slate-800 transition text-center ${
                          errors.signatureName ? "border-red-500" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                        }`}
                        placeholder=""
                        disabled={true}
                        
                      />
                      {errors.signatureName && <p className="text-[11px] text-red-600 font-bold">{errors.signatureName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Place <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        value={formData.signingPlace}
                        onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                          errors.signingPlace ? "border-red-500" : "border-slate-250 focus:border-blue-500"
                        }`}
                        placeholder="New Delhi"
                        disabled={true}
                      />
                      {errors.signingPlace && <p className="text-[11px] text-red-650 font-black">{errors.signingPlace}</p>}
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* Action buttons footer for step Wizard */}
            <div className="p10-footer border-t border-slate-100 font-sans">
              <button 
                type="button" 
                onClick={handleBack}
                className="p10-btn bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentStep === 1 ? "Change Permit Type" : "Back"}</span>
              </button>

              <button 
                type="button" 
                onClick={handleNext}
                className="p10-btn bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-md font-sans"
              >
                <span>{currentStep === 5 ? "Submit Permit-P10 Application" : "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </>
      )}

      {/* Redirect to the GetPermit page after a successful submission */}
      {submitSuccess && (
        <GetPermit
          applicationIdNo={submittedApplicationIdNo}
          showToast={showToast}
          onBackToDashboard={() => {
            setSubmitSuccess(false);
            setSubmittedApplicationIdNo(null);
            setCurrentStep(1);
            onBackToDashboard();
          }}
        />
      )}

    </div>
  );
}
