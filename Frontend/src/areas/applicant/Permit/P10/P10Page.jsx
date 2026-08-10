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
