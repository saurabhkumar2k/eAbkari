import React, { useState } from "react";
import ApplicantDetails from "./ApplicantDetails";
import EventDetailsPage from "./EventDetails";
import IdentityDetailsPage from "./IdentityDetailPage";
import LiquorDetailsPage from "./LiquorDetailPage";
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

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Applicant Details
    applicantName: "MR. DEVENDER MITTAL",
    dob: "1980-01-01",
    fatherName: "MR. G. S. MITTAL",
    occupation: "BUSINESS",
    panNo: "AAKCA2158M",
    address1: "A-3, DISTRICT CENTRE",
    address2: "SELECT CITY WALK SAKET NEW DELHI",
    state: "Delhi",
    district: "South",
    subDivision: "Saket",
    pin: "110017",
    email: "devender@advempl.com",
    mobile: "9811042727",
    landline: "",
    fax: "",

    // Step 2: Event Details
    premisesType: "Farmhouse",
    premiseName: "The Kundan Farmhouse",
    premiseAddress: "Kapashera Estate, Opp Petrol Pump, Kapashera, New Delhi 110037",
    venueCategory: "Farmhouse",
    venueAddress: "The Kundan Farmhouse, Kapashera Estate, Opp Petrol Pump, Kapashera, New Delhi 110037",
    latitude: "28.5284",
    longitude: "77.0851",
    eventType: "Birthday",
    occasionName: "Birthday Special Reception Event",
    servingStartDate: "2026-06-25",
    servingEndDate: "2026-06-25",
    startTime: "18:30",
    endTime: "23:45",
    estimatedGuests: "180",
    isVenueLicensed: "No",

    // Step 3: Identity Details
    idProofType: "Aadhaar Card",
    idNumber: "482019348821",
    idProofFileName: "aadhaar_card_devender.pdf",
    idProofFileUrl: "#",

    // Step 4: Liquor Details
    sourcingType: "From Licensed Retail Vend (L-2)",
    sourcingShed: "Vedic Retail Licensed Shop (L-2), Block-E Mayapuri",
    brandsToServe: "WHISKY - SINGLE MALT (750ml), SINGLE MALT WHISKY - IMPORTED (700ml), BEER - PREMIUM LAGER (650ml)",
    qtyImfl: "30",
    qtyImported: "18",
    qtyBeerWine: "72",
    estimatedCost: "145000",
    liquorItems: [
      {
        id: 1,
        liquorType: "WHISKY - SINGLE MALT",
        liquorCategory: "IMFL (Indian Manufactured Foreign Liquor)",
        bottleSize: 750,
        quantity: 30,
      },
      {
        id: 2,
        liquorType: "SINGLE MALT WHISKY - IMPORTED",
        liquorCategory: "Imported Liquor (Foreign Sourced / BIO)",
        bottleSize: 700,
        quantity: 18,
      },
      {
        id: 3,
        liquorType: "BEER - PREMIUM LAGER",
        liquorCategory: "Beer / Wine spirits",
        bottleSize: 650,
        quantity: 72,
      }
    ],

    // Step 5: Declaration
    undertakingAccept: true,
    signatureName: "DEVENDER MITTAL",
    signingPlace: "New Delhi"
  });

  const [errors, setErrors] = useState({});

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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        if (showToast) showToast(`Moving to ${steps[currentStep].desc}`);
      } else {
        handleFinalSubmission();
      }
    } else {
      if (showToast) showToast("Please correct the highlighted validation errors before continuing.", "error");
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBackToDashboard();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmission = () => {
    const referenceNum = `P10-TRN-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStamp = new Date().toLocaleDateString("en-IN");
    
    const receipt = {
      permitNo: referenceNum,
      permitCode: "P-10",
      permitTitle: "Occasional Permit for Serving Liquor",
      applicantName: formData.signatureName,
      permitStartDate: formData.servingStartDate,
      permitEndDate: formData.servingEndDate,
      venue: formData.venueAddress,
      feePaid: "₹ 15,000",
      generatedAt: dateStamp,
      status: "APPROVED - ACTIVE",
      panNo: formData.panNo,
      sourcingShed: formData.sourcingShed,
      email: formData.email,
      mobile: formData.mobile,
      startTime: formData.startTime,
      endTime: formData.endTime
    };

    setPermitReceipt(receipt);
    setSubmitSuccess(true);
    
    if (onSubmitPermit) {
      onSubmitPermit({
        id: referenceNum,
        permitType: "Service/Liquor at other premises (P-10)",
        sourcePremise: formData.sourcingShed,
        destPremise: formData.venueAddress,
        consignmentDetails: `${formData.qtyImfl} IMFL, ${formData.qtyImported} IFL, ${formData.qtyBeerWine} Beer/Wine bottles`,
        carrierLicense: "DL-1LM-TEMP-PASS-09",
        status: "Approved",
        submittedDate: dateStamp,
        remarks: "Transit permit instant gateway pass issued"
      });
    }
    if (showToast) showToast("P-10 Special Occasional Permit approved and signed successfully!", "success");
  };

  const triggerPrint = () => {
    if (showToast) showToast("Initializing printer spooler for local thermal receipts...");
    window.print();
  };  return (
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
                      <label className="text-xs font-bold text-slate-700">Applicant Digital Signature (Enter Full Name) <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        value={formData.signatureName}
                        onChange={(e) => handleInputChange("signatureName", e.target.value.toUpperCase())}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black font-serif tracking-wider text-slate-800 transition text-center ${errors.signatureName ? "border-red-500" : "border-slate-250 focus:border-blue-500 focus:bg-white"}`}
                        placeholder="DEVENDER MITTAL"
                      />
                      {errors.signatureName && <p className="text-[11px] text-red-600 font-bold">{errors.signatureName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Place of Signing <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        value={formData.signingPlace}
                        onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${errors.signingPlace ? "border-red-500" : "border-slate-250 focus:border-blue-500"}`}
                        placeholder="New Delhi"
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
                <span>{currentStep === 5 ? "Submit & Approve P-10" : "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </>
      )}

      {/* Success Receipt State View */}
      {submitSuccess && permitReceipt && (
        <div className="space-y-6 animate-fade">
          
          <div className="bg-white border-2 border-emerald-500/80 shadow-md rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-2xl mx-auto relative overflow-hidden">
            
            {/* Success Confirmed Banner */}
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Approved Permit Issued</h2>
              <p className="text-xs text-slate-500 font-bold">Your private occasional P-10 permit has been registered on the Delhi Excise registry.</p>
            </div>

            {/* Print Friendly Invoice Receipt Card */}
            <div className="border border-slate-200 rounded-3xl bg-slate-50/50 p-5 text-left space-y-4 font-mono select-text print:p-0 print:border-none">
              
              {/* Receipt Header Title */}
              <div className="pb-3 border-b border-dashed border-slate-300 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-900">DELHI EXCISE ACT - FORM P-10</h3>
                  <p className="text-[10px] text-slate-500 font-bold">REGISTRY TRANSACTION RECORD</p>
                </div>
                <div className="bg-[#eff6ff] text-[#1d4ed8] font-bold text-[10px] px-2 py-0.5 rounded border border-[#dbeafe] uppercase">
                  Approved
                </div>
              </div>

              {/* Grid content standard labels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
                
                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Permit Number:</span>
                  <span className="text-slate-900 font-bold tracking-wider">{permitReceipt.permitNo}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Ref PAN Number:</span>
                  <span className="text-slate-900 font-bold">{permitReceipt.panNo}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Applicant Licensee:</span>
                  <span className="text-slate-900 font-extrabold">{permitReceipt.applicantName}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Service Contact:</span>
                  <span className="text-slate-900 font-extrabold">{permitReceipt.mobile}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Event Venue Address:</span>
                  <span className="text-slate-900 font-bold leading-normal text-[11px] block">{permitReceipt.venue}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Scheduled Execution Date:</span>
                  <span className="text-slate-900 font-bold text-[11px]">{permitReceipt.permitStartDate}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Serving Duration hours:</span>
                  <span className="text-slate-900 font-medium text-[11px]">{permitReceipt.startTime} - {permitReceipt.endTime}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Sourcing Stock supplier:</span>
                  <span className="text-slate-900 font-bold text-[11px] leading-relaxed">{permitReceipt.sourcingShed}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Statutory Fee Paid:</span>
                  <span className="text-blue-700 font-black text-sm">{permitReceipt.feePaid}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Issue Date stamp:</span>
                  <span className="text-slate-900 font-bold">{permitReceipt.generatedAt}</span>
                </div>

              </div>

              {/* Graphic QR Verification segment replicating real government layouts */}
              <div className="mt-4 pt-4 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 select-none">
                <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 shrink-0">
                  <QrCode className="w-16 h-16 text-slate-800" />
                </div>
                <div className="space-y-1 text-left sm:flex-1">
                  <p className="text-[10px] font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographically Signed</span>
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    This is a computer-generated statutory transit pass and does not require a physical ink seal signature. scan QR code to verify live credentials against registry portal.
                  </p>
                </div>
              </div>

            </div>

            {/* Card Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              
              <button
                type="button"
                onClick={triggerPrint}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-sm"
              >
                <Printer className="w-4 h-4" />
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
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-250 rounded-xl text-xs font-bold cursor-pointer transition"
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
