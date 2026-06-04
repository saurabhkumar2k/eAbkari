import React, { useState } from "react";
import {
  User,
  Building2,
  Calendar,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Upload,
  Bookmark,
  FileCheck2,
  Lock,
  Warehouse,
  ShieldAlert,
  Info,
  DollarSign,
  Printer,
  Sparkles
} from "lucide-react";

export default function L1AndL31License({ onBackToSelect, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Applicant Details
    applicantName: "VISHAL DEVILAL JAISWAL",
    companyName: "KRISTAL SPIRITS PVT LTD",
    dob: "1980-01-01",
    fatherName: "DEVILAL JAISWAL",
    occupation: "business",
    address1: "B-96, FIRST FLOOR, MAYAPURI, INDUSTRIAL AREA, PHASE-I, NE",
    address2: "Phase-I, Mayapuri",
    state: "Delhi",
    district: "West",
    subDivision: "Rajouri Garden",
    pin: "110064",
    email: "vishal@kristalspirits.com",
    mobile: "9266024141",
    landline: "011-45672910",
    panNo: "AAFCM6267M",

    // Step 2: Warehouse Details
    warehouseName: "Kristal Mayapuri Bonded Depot",
    warehouseAddress: "B-96, Mayapuri Industrial Area, Phase-I, West Delhi, 110064",
    warehouseSize: "12500", // Sq. ft
    hasFireSprinklers: "Yes",
    cctvProvider: "SecureVision CCTV Systems Ltd",
    lockerCount: "12",
    hasTemperatureControl: "Yes",

    // Step 3: Additional Details
    annualTurnover: "45.50", // Crores
    bankGuaranteeRef: "BG-2026-NCT-99120",
    bankGuaranteeAmount: "5000000", // 50 Lakhs
    pastExpYears: "8",
    deliveryVehicles: "6",
    priorLicensesDelhi: "Yes",

    // Step 4: Personal Documents (Files Status)
    personalPanUploaded: true,
    personalAadhaarUploaded: true,
    partnershipDeedUploaded: true,
    itrReturnUploaded: true,

    // Step 5: Site Documents (Files Status)
    leaseDeedUploaded: true,
    fireNocUploaded: true,
    mcdTradeLicenseUploaded: true,
    buildingPlanUploaded: true,

    // Step 6: Declaration
    undertakingAccept: false,
    signatureName: "VISHAL DEVILAL JAISWAL",
    signingPlace: "New Delhi"
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const steps = [
    { num: 1, label: "Step-1", sub: "Applicant Details" },
    { num: 2, label: "Step-2", sub: "Warehouse Details" },
    { num: 3, label: "Step-3", sub: "Additional Details" },
    { num: 4, label: "Step-4", sub: "Personal Document" },
    { num: 5, label: "Step-5", sub: "Site Document" },
    { num: 6, label: "Step-6", sub: "Declaration" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.companyName || !formData.companyName.trim()) {
        errors.companyName = "Name of Company/Firm/LLP/Society/Individual is required";
      }
      if (!formData.address1 || !formData.address1.trim()) {
        errors.address1 = "Address 1 is required";
      }
      if (!formData.pin || formData.pin.length !== 6) {
        errors.pin = "Enter a valid 6-digit PIN code";
      }
      if (!formData.email || !formData.email.includes("@")) {
        errors.email = "Enter a valid email address";
      }
      if (!formData.mobile || formData.mobile.length < 10) {
        errors.mobile = "Enter a valid mobile number";
      }
      if (!formData.panNo || formData.panNo.length !== 10) {
        errors.panNo = "Enter a valid 10-character PAN number";
      }
    } else if (step === 2) {
      if (!formData.warehouseName || !formData.warehouseName.trim()) {
        errors.warehouseName = "Warehouse Name is required";
      }
      if (!formData.warehouseAddress || !formData.warehouseAddress.trim()) {
        errors.warehouseAddress = "Warehouse Address is required";
      }
      if (!formData.warehouseSize || Number(formData.warehouseSize) < 500) {
        errors.warehouseSize = "Warehouse area must be at least 500 Sq. Ft";
      }
    } else if (step === 3) {
      if (!formData.annualTurnover || Number(formData.annualTurnover) <= 0) {
        errors.annualTurnover = "Prior and anticipated annual turnover must be positive";
      }
      if (!formData.bankGuaranteeRef || !formData.bankGuaranteeRef.trim()) {
        errors.bankGuaranteeRef = "Bank Guarantee / Security reference number is required";
      }
    } else if (step === 6) {
      if (!formData.undertakingAccept) {
        errors.undertakingAccept = "You must select and accept the regulatory undertaking declarations";
      }
      if (!formData.signatureName || !formData.signatureName.trim()) {
        errors.signatureName = "Authorized signatory signature name is required";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
        if (showToast) showToast(`Step ${currentStep} completed successfully!`);
      } else {
        // Trigger final submit
        handleFinalSubmission();
      }
    } else {
      if (showToast) showToast("Please review marked fields before advancing.", "error");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmission = () => {
    const appNo = `AP-L1L31-${Math.floor(100000 + Math.random() * 900000)}`;
    const feeAmount = 850000; // 8.5 Lakhs combined fee
    const receipt = {
      applicationNo: appNo,
      applicantName: formData.applicantName,
      companyName: formData.companyName,
      exciseFee: "₹ 8,50,000",
      bondGuarantee: "₹ 50,000",
      totalFeePaid: "₹ 9,00,000",
      dateFiled: new Date().toLocaleDateString("en-IN"),
      warehouseAddress: formData.warehouseAddress,
      pincode: formData.pin,
      district: formData.district,
      status: "Filing Registered"
    };

    setReceiptData(receipt);
    setSubmitSuccess(true);
    if (showToast) showToast("Integrated L-1 & L-31 Excise application docket registered successfully!");
  };

  const triggerMockPrint = () => {
    if (showToast) showToast("Printing license application dossier to connected local PDF writer...", "success");
    window.print();
  };

  return (
    <div className="brand-registration-page select-none text-slate-800 animate-fade">
      
      {/* Top Banner Area with complete descriptive branding */}
      <div className="w-full bg-[#1e40af] text-white py-3.5 px-6 rounded-2xl shadow-md mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Warehouse className="w-6 h-6 text-yellow-300" />
          <h1 className="text-sm md:text-base font-extrabold tracking-wide uppercase">
            L1 (License for Wholesale Vend of Indian Liquor) and L31 (License for Warehouse for storage of Indian Liquor)
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-blue-800 py-1 px-3 rounded-lg text-xs font-bold font-mono">
          <span>PORTAL VER:</span>
          <span className="text-yellow-300">2026.06.A</span>
        </div>
      </div>

      {/* 6 Step Progress Wizard Bar Header */}
      {!submitSuccess && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 mb-6 select-none overflow-x-auto">
          <div className="flex items-center justify-between min-w-[768px] relative px-4">
            
            {/* Horizontal progress bar line connector */}
            <div className="absolute top-[22px] left-8 right-8 -translate-y-1/2 h-[3px] bg-slate-100 z-0">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              />
            </div>

            {/* Steps map */}
            {steps.map((st) => {
              const isActive = currentStep === st.num;
              const isCompleted = currentStep > st.num;
              return (
                <div key={st.num} className="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    onClick={() => {
                      // Allow arbitrary jumps only to completed steps for superior navigation
                      if (st.num < currentStep) {
                        setCurrentStep(st.num);
                      }
                    }}
                    className={`w-11 h-11 rounded-full flex flex-col items-center justify-center font-black text-sm border-2 cursor-pointer transition-all duration-300 ${
                      isCompleted 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100" 
                        : isActive 
                        ? "bg-[#1d4ed8] border-[#1d4ed8] text-white shadow-md shadow-blue-100 scale-110" 
                        : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3.5]" /> : <span>{st.num}</span>}
                  </div>
                  <span className={`text-[11px] font-extrabold mt-2 whitespace-nowrap ${
                    isActive ? "text-[#1d4ed8]" : isCompleted ? "text-emerald-700" : "text-slate-500"
                  }`}>
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{st.sub}</span>
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* Main Form Box body */}
      {!submitSuccess ? (
        <div className="space-y-6">
          
          {/* Internal Title Box Header */}
          <div className="bg-[#5c6b73] text-white p-3 rounded-lg text-center font-bold text-sm select-none uppercase tracking-wider">
            {steps[currentStep - 1].sub}
          </div>

          <div className="brand-card mb-6">
            
            {/* Step 1: APPLICANT DETAILS FORM BLOCK */}
            {currentStep === 1 && (
              <div className="animate-fade text-left space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Applicant Name (ReadOnly style as per image) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Applicant Name</label>
                    <input 
                      type="text" 
                      value={formData.applicantName} 
                      readOnly
                      disabled
                      className="input-box bg-slate-100 text-slate-700 font-semibold cursor-not-allowed border-slate-200"
                    />
                  </div>

                  {/* Name of Company/Firm/LLP/Society/Individual * (Required editable) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Name of Company/Firm/LLP/Society/Individual <span className="text-red-500 font-black">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. KRISTAL SPIRITS PVT LTD"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className={`input-box ${formErrors.companyName ? "border-red-500 focus:border-red-500 focus:shadow-red-50" : ""}`}
                    />
                    {formErrors.companyName && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.companyName}</span>
                    )}
                  </div>

                  {/* Date of Birth (ReadOnly as per image) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Date of Birth</label>
                    <input 
                      type="text" 
                      value="01/01/1980" 
                      disabled
                      readOnly
                      className="input-box bg-slate-100 text-slate-700 font-semibold cursor-not-allowed border-slate-200"
                    />
                  </div>

                  {/* Father/Husband Name (ReadOnly as per image) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Father/Husband Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherName} 
                      disabled
                      readOnly
                      className="input-box bg-slate-100 text-slate-700 font-semibold cursor-not-allowed border-slate-200"
                    />
                  </div>

                  {/* Occupation (ReadOnly as per image) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Occupation</label>
                    <input 
                      type="text" 
                      value={formData.occupation} 
                      disabled
                      readOnly
                      className="input-box bg-slate-100 text-slate-700 font-semibold cursor-not-allowed border-slate-200"
                    />
                  </div>

                  {/* Address 1 (Editable with long pre-filled text) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Address 1</label>
                    <input 
                      type="text" 
                      value={formData.address1}
                      onChange={(e) => handleInputChange("address1", e.target.value)}
                      className={`input-box ${formErrors.address1 ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {formErrors.address1 && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.address1}</span>
                    )}
                  </div>

                  {/* Address 2 */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Address 2</label>
                    <input 
                      type="text" 
                      placeholder="Line 2 of Address"
                      value={formData.address2}
                      onChange={(e) => handleInputChange("address2", e.target.value)}
                      className="input-box"
                    />
                  </div>

                  {/* State (Select list with prefilled Delhi) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">State</label>
                    <select 
                      value={formData.state} 
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="select-box"
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Punjab">Punjab</option>
                    </select>
                  </div>

                  {/* District (Select list with default West) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">District</label>
                    <select 
                      value={formData.district} 
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="select-box"
                    >
                      <option value="West">West</option>
                      <option value="North West">North West</option>
                      <option value="South Delhi">South Delhi</option>
                      <option value="Central Delhi">Central Delhi</option>
                      <option value="East Delhi">East Delhi</option>
                    </select>
                  </div>

                  {/* Sub Division (Select list with default Rajouri Garden) */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Sub Division</label>
                    <select 
                      value={formData.subDivision} 
                      onChange={(e) => handleInputChange("subDivision", e.target.value)}
                      className="select-box"
                    >
                      <option value="Rajouri Garden">Rajouri Garden</option>
                      <option value="Punjabi Bagh">Punjabi Bagh</option>
                      <option value="Patel Nagar">Patel Nagar</option>
                      <option value="Dwarka">Dwarka</option>
                    </select>
                  </div>

                  {/* PIN */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">PIN</label>
                    <input 
                      type="text" 
                      value={formData.pin}
                      maxLength={6}
                      onChange={(e) => handleInputChange("pin", e.target.value)}
                      className={`input-box ${formErrors.pin ? "border-red-500" : ""}`}
                    />
                    {formErrors.pin && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.pin}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`input-box ${formErrors.email ? "border-red-500" : ""}`}
                    />
                    {formErrors.email && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mobile</label>
                    <input 
                      type="text" 
                      value={formData.mobile}
                      maxLength={12}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      className={`input-box ${formErrors.mobile ? "border-red-500" : ""}`}
                    />
                    {formErrors.mobile && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.mobile}</span>
                    )}
                  </div>

                  {/* Landline */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Landline</label>
                    <input 
                      type="text" 
                      value={formData.landline}
                      onChange={(e) => handleInputChange("landline", e.target.value)}
                      className="input-box"
                      placeholder="e.g. 011-23348812"
                    />
                  </div>

                  {/* PAN NO */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">PAN No</label>
                    <input 
                      type="text" 
                      value={formData.panNo}
                      maxLength={10}
                      onChange={(e) => handleInputChange("panNo", e.target.value.toUpperCase())}
                      className={`input-box font-mono ${formErrors.panNo ? "border-red-500" : ""}`}
                    />
                    {formErrors.panNo && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.panNo}</span>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* Step 2: WAREHOUSE DETAILS FORM BLOCK */}
            {currentStep === 2 && (
              <div className="animate-fade text-left space-y-6">
                <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 font-semibold leading-relaxed">
                    Under L-31 guidelines, standard commercial warehouses inside municipal zones of Delhi must pass structural and temperature parameters to ensure standard shelf stability of spirits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Warehouse Name */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Warehouse Trading Name *</label>
                    <input 
                      type="text" 
                      value={formData.warehouseName}
                      onChange={(e) => handleInputChange("warehouseName", e.target.value)}
                      className={`input-box ${formErrors.warehouseName ? "border-red-500" : ""}`}
                    />
                    {formErrors.warehouseName && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.warehouseName}</span>
                    )}
                  </div>

                  {/* Physical Area Sq.Ft */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Total Area (In Square Feet) *</label>
                    <input 
                      type="number" 
                      value={formData.warehouseSize}
                      onChange={(e) => handleInputChange("warehouseSize", e.target.value)}
                      className={`input-box ${formErrors.warehouseSize ? "border-red-500" : ""}`}
                    />
                    {formErrors.warehouseSize && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.warehouseSize}</span>
                    )}
                  </div>

                  {/* Warehouse address */}
                  <div className="form-group md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Bonded Warehouse Physical Address *</label>
                    <textarea 
                      value={formData.warehouseAddress}
                      onChange={(e) => handleInputChange("warehouseAddress", e.target.value)}
                      className={`textarea-box ${formErrors.warehouseAddress ? "border-red-500" : ""}`}
                    />
                    {formErrors.warehouseAddress && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.warehouseAddress}</span>
                    )}
                  </div>

                  {/* Fire Sprinklers Fitted */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Automatic Fire Sprinklers Fitted?</label>
                    <select 
                      value={formData.hasFireSprinklers}
                      onChange={(e) => handleInputChange("hasFireSprinklers", e.target.value)}
                      className="select-box"
                    >
                      <option value="Yes">Yes, compliant with DFS norms</option>
                      <option value="No">No / Pending Audit Inspection</option>
                    </select>
                  </div>

                  {/* CCTV Vendor */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">CCTV Safety System Provider</label>
                    <input 
                      type="text" 
                      value={formData.cctvProvider}
                      onChange={(e) => handleInputChange("cctvProvider", e.target.value)}
                      className="input-box"
                    />
                  </div>

                  {/* Locker Count */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Storage Vaults / High-Security Dry Bays</label>
                    <input 
                      type="number" 
                      value={formData.lockerCount}
                      onChange={(e) => handleInputChange("lockerCount", e.target.value)}
                      className="input-box"
                    />
                  </div>

                  {/* AC Temperature controls */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">HVAC System installed (Cool Cellar Mode)</label>
                    <select 
                      value={formData.hasTemperatureControl}
                      onChange={(e) => handleInputChange("hasTemperatureControl", e.target.value)}
                      className="select-box"
                    >
                      <option value="Yes">Yes, Constant temperature maintained </option>
                      <option value="No">No, Standard thermal circulation only</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* Step 3: ADDITIONAL DETAILS FORM BLOCK */}
            {currentStep === 3 && (
              <div className="animate-fade text-left space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Annual Turn over */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Anticipated Excise Turnover (INR in Crores) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={formData.annualTurnover}
                      onChange={(e) => handleInputChange("annualTurnover", e.target.value)}
                      className={`input-box ${formErrors.annualTurnover ? "border-red-500" : ""}`}
                    />
                    {formErrors.annualTurnover && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.annualTurnover}</span>
                    )}
                  </div>

                  {/* Security Bank BG Ref */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Excise Security Guarantee Reference No *</label>
                    <input 
                      type="text" 
                      value={formData.bankGuaranteeRef}
                      onChange={(e) => handleInputChange("bankGuaranteeRef", e.target.value)}
                      className={`input-box ${formErrors.bankGuaranteeRef ? "border-red-500" : ""}`}
                    />
                    {formErrors.bankGuaranteeRef && (
                      <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.bankGuaranteeRef}</span>
                    )}
                  </div>

                  {/* Security amount */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Guarantee Bond Amount (INR)</label>
                    <select 
                      value={formData.bankGuaranteeAmount}
                      onChange={(e) => handleInputChange("bankGuaranteeAmount", e.target.value)}
                      className="select-box"
                    >
                      <option value="5000000">₹ 50,00,000 (standard limit)</option>
                      <option value="10000000">₹ 1,00,00,000 (extended limit)</option>
                      <option value="25000000">₹ 2,50,00,000 (premium merchant status)</option>
                    </select>
                  </div>

                  {/* Past Exp years */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Years of Active Spirits Import/Supply Experience</label>
                    <input 
                      type="number" 
                      value={formData.pastExpYears}
                      onChange={(e) => handleInputChange("pastExpYears", e.target.value)}
                      className="input-box"
                    />
                  </div>

                  {/* Delivery Vehicles */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Fleet size of Insured Delivery Carriers (Excise Permit Registered)</label>
                    <input 
                      type="number" 
                      value={formData.deliveryVehicles}
                      onChange={(e) => handleInputChange("deliveryVehicles", e.target.value)}
                      className="input-box"
                    />
                  </div>

                  {/* Prior Delhi Licenses held */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Previously held Licenses under Delhi Excise Act 2010?</label>
                    <select 
                      value={formData.priorLicensesDelhi}
                      onChange={(e) => handleInputChange("priorLicensesDelhi", e.target.value)}
                      className="select-box"
                    >
                      <option value="Yes">Yes, non-revoked track record</option>
                      <option value="No">No / Fresh Corporate Applicant</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* Step 4: PERSONAL DOCUMENT FILE MANAGEMENT */}
            {currentStep === 4 && (
              <div className="animate-fade text-left space-y-6">
                <div className="bg-purple-50 text-purple-950 p-4 rounded-xl border border-purple-100 flex items-start gap-2.5">
                  <Bookmark className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    Please map and endorse your core personal identification proofs. Attach certified PDF documents (file sizes must remain below 10MB per document).
                  </div>
                </div>

                <div className="space-y-4">
                  {/* File 1: Personal PAN */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">PAN Card of Board Directors / Applicant *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Acceptable formats: PDF, JPEG (Color scan mandatory)</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: pan_card_full.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("File pan_card_full.pdf re-uploaded."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* File 2: Aadhaar Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Aadhaar Card Identifications *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">E-Aadhaar PDF certified by UIDAI seal</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: aadhaar_signed.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("Aadhaar proof updated."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* File 3: Partnership Deed */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Partnership Deed / Board Resolution Certificate *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Corporate certificate mapping authorizations under directors board approval</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: resolution_board_delhi.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("Deed file modified."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* File 4: Income Tax Return */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Income Tax Return Acknowledgment Receipts (Past 3 FY)</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Combined PDF containing certified filings filed with ITR departments</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: itr_returns_3_yr_combined.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("ITR files uploaded."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Step 5: SITE DOCUMENT FILE MANAGEMENT */}
            {currentStep === 5 && (
              <div className="animate-fade text-left space-y-6">
                <div className="bg-amber-50 text-amber-950 p-4 rounded-xl border border-amber-100 flex items-start gap-2.5">
                  <Warehouse className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    Warehouse Premises Deeds are inspected under Delhi Fire Services & Municipal Excise laws. Please upload certified blueprint surveys.
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Deed 1: Registered Lease Deed */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-amber-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Registered Warehouse Lease Deed / Ownership Papers *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Registered deed papers showing full possession details</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: registered_lease_mayapuri.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("Lease deed updated."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* Deed 2: Fire Safety NOC */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-amber-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Delhi Fire Services NOC (No Objection Certificate) *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">NOC affirming safety exits and automatic fire suppression controls</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: dfs_noc_clearance_2026.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("Fire safety NOC updated."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* Deed 3: MCD Trade License */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-amber-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">MCD Commercial Trade License *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Approval for operations of commercial storage depot</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: mcd_commercial_license.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("MCD copy re-uploaded."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                  {/* Deed 4: Approved Site layout plan map */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:border-amber-400 hover:bg-slate-50/50 transition">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Licensed Premise Blue Site Layout Blueprint *</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Detailed architect-signed architectural drawing detailing dry stack bays</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Mapped: arch_layout_stamps_2026.pdf
                      </span>
                      <button 
                        onClick={() => { if (showToast) showToast("Site plan blueprint replaced."); }}
                        className="btn-secondary text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-500" /> Replace
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Step 6: STATUTORY DECLARATIONS & UNDERTAKING */}
            {currentStep === 6 && (
              <div className="animate-fade text-left space-y-6">
                <div className="bg-red-50 text-red-950 p-4 rounded-xl border border-red-100 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    <p className="font-extrabold text-red-950 uppercase mb-1">Legal Notice & Liability under GNCTD Act</p>
                    Any false claim or misleading declaration submitted will cause instant forfeiture of safety deposits of ₹ 5,00,000, summary rejection of licenses, and booking of criminal liabilities under Delhi Excise Act 2010.
                  </div>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl space-y-4">
                  {/* Checkbox 1 */}
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox"
                      id="acceptCheck"
                      checked={formData.undertakingAccept}
                      onChange={(e) => handleInputChange("undertakingAccept", e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 border-slate-300 pointer-events-auto"
                    />
                    <label htmlFor="acceptCheck" className="text-xs text-slate-700 leading-relaxed font-semibold cursor-pointer">
                      I/We hereby solemnly declare that the applicant company has not been declared guilty of any non-bailable offense locally. The warehouse parcel at <strong>{formData.warehouseAddress}</strong> corresponds exactly to registered lease clearances.
                    </label>
                  </div>
                  {formErrors.undertakingAccept && (
                    <span className="text-xs text-red-500 font-extrabold block">{formErrors.undertakingAccept}</span>
                  )}

                  {/* Pre-filled sign box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Digital signature Name *</label>
                      <input 
                        type="text" 
                        value={formData.signatureName}
                        onChange={(e) => handleInputChange("signatureName", e.target.value)}
                        className="input-box border-slate-300"
                      />
                      {formErrors.signatureName && (
                        <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.signatureName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Signing Location</label>
                      <input 
                        type="text" 
                        value={formData.signingPlace}
                        onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                        className="input-box border-slate-300"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Action buttons footer for Next & Back navigation */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200">
              <button 
                type="button" 
                onClick={() => {
                  if (currentStep === 1) {
                    onBackToSelect();
                  } else {
                    handlePrevStep();
                  }
                }}
                className="btn btn-secondary border border-slate-200 px-6"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>{currentStep === 1 ? "Exit Wizard" : "Previous Step"}</span>
              </button>

              <button 
                type="button" 
                onClick={handleNextStep}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 px-8"
              >
                <span>{currentStep === 6 ? "File Joint Application" : "Next Step"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

          {/* Core instruction info container card at very bottom */}
          <div className="blue-info-alert flex items-start text-left bg-blue-50 border border-blue-200 p-4 rounded-xl gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider mb-1">State Excise Desk Guidelines</h4>
              <p className="text-[11px] text-blue-700 font-semibold leading-relaxed">
                Applying jointly for L-1 Wholesale distribution and L-31 Bonded Warehouse simplifies tax and audit evaluations from Department personnel. Joint applications are typically audited in a synchronized timeline of 7 working days.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* High-End interactive receipt success view */
        <div className="success-card space-y-8 max-w-3xl mx-auto border border-slate-200 animate-fade">
          <div className="success-icon relative shadow-md shadow-emerald-100">
            <Check className="w-12 h-12 text-emerald-700 stroke-[3.5]" />
            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-15" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              Joint Application Submitted <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Your synchronized L-1 + L-31 joint liquor wholesale & bonded storage application bundle is successfully filed.
            </p>
          </div>

          {/* Application Detail Sheet Block */}
          <div className="border border-slate-200 rounded-2xl p-6 text-left space-y-4 bg-slate-50/50">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <span className="text-xs uppercase font-extrabold text-slate-400 font-mono">DOCKET REGISTRATION</span>
              <span className="text-xs font-black text-blue-700 font-mono">{receiptData?.applicationNo}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Applicant entity</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.companyName}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Primary Representative</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.applicantName}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">License Fee Paid (L1+L31 Combined)</p>
                <p className="text-emerald-700 font-extrabold mt-0.5">{receiptData?.totalFeePaid}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Filing Date Stamp</p>
                <p className="text-slate-850 font-bold mt-0.5">{receiptData?.dateFiled}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Bonded Depot storage parcel</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.warehouseAddress} - District WEST (Circle {receiptData?.district})</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2.5 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
              <span className="status-badge bg-blue-100 text-blue-850 border border-blue-200 uppercase tracking-wider font-black text-[9px] px-2.5 py-1">
                EXCISE FLOW: SYNCHRONIZED REVIEW
              </span>
              <p className="text-[10px] text-indigo-900 leading-relaxed font-semibold">
                Your dossier has been routed to Circle officers West & Okhla audit inspectors. Physical storage inspection clearance schedule will be sent via SMS/Email shortly.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              type="button" 
              onClick={triggerMockPrint} 
              className="btn btn-secondary border border-slate-300 w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span>Print Application Copy</span>
            </button>

            <button 
              type="button" 
              onClick={onBackToSelect} 
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-8 py-3"
            >
              <FileCheck2 className="w-4 h-4 stroke-[2.5]" />
              <span>Return to Wholesale Menu</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
