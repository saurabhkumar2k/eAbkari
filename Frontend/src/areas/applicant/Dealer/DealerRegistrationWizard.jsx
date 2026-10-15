import React, { useState } from "react";
import {
  User,
  Building2,
  Calendar,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building,
  Hash,
  Compass,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Printer,
  RotateCcw,
  Sparkles,
  Warehouse,
  ShieldAlert,
  Info,
  DollarSign
} from "lucide-react";

export default function DealerRegistrationWizard({
  onBackToDashboard,
  showToast,
  onSubmitDealer,
  onNavigateToApplied,
  profile = {}
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // STEP 1: Applicant Details
  const [applicantData, setApplicantData] = useState({
    applicantName: profile.firstName
      ? `${profile.firstName} ${profile.lastName || ""}`.trim().toUpperCase()
      : "RAMESH CHANDRA",
    dob: profile.dob || "1982-08-14",
    fatherName: profile.fatherName || "KAILASH CHANDRA",
    gender: "Male",
    occupation: "BUSINESS / WHOLESALE DISTRIBUTOR",
    panNo: profile.pan || "AAACS0409A",
    aadhaarNo: "XXXX-XXXX-4592",

    address1: profile.address || "Plot No. 42, Okhla Industrial Area, Phase-III",
    address2: "Near Modi Mill Flyover",
    state: "Delhi",
    district: "South East Delhi",
    subDivision: "Kalkaji",
    policeStation: "Okhla Industrial Area PS",
    pin: "110020",

    mobile: profile.mobile || "9811234567",
    email: profile.email || "ramesh.chandra@delhispiritstrade.in",
    landline: "011-26814455"
  });

  // STEP 2: Additional Details (Dealer & Warehouse Details)
  const [additionalData, setAdditionalData] = useState({
    firmName: "Imperial Spirits Trade Corp",
    constitutionType: "Private Limited Company",
    proprietorName: "Ramesh Chandra",
    firmPan: "AAACS0409A",
    gstin: "07AAACS0409A1ZP",
    dealerCategory: "L-13 Wholesale import bond storage",

    warehouseName: "Imperial Okhla Bonded Storage Depot",
    warehouseAddress: "Plot No. 42, Shed B, Okhla Industrial Area Phase-III, New Delhi - 110020",
    warehouseArea: "12500", // Sq. ft
    possessionStatus: "Owned",
    storageCapacity: "25000 Cases",
    hasColdStorage: "Yes",

    annualTurnover: "45.50", // Crores
    bankGuaranteeRef: "BG-2026-NCT-99120",
    securityDeposit: "500000", // 5 Lakhs
    cctvInstalled: "Yes",
    fireNocOperational: "Yes"
  });

  // STEP 3: Personal Document
  const [documents, setDocuments] = useState({
    firmPanDoc: { name: "Firm_PAN_AAACS0409A.pdf", size: "1.2 MB", uploaded: true },
    gstCertDoc: { name: "GST_REG06_Delhi.pdf", size: "2.1 MB", uploaded: true },
    proprietorIdDoc: { name: "Proprietor_Aadhaar_PAN.pdf", size: "1.8 MB", uploaded: true },
    warehouseLeaseDoc: { name: "Registered_Storage_Deed.pdf", size: "3.4 MB", uploaded: true },
    fireNocDoc: { name: "Delhi_Fire_Service_NOC.pdf", size: "1.5 MB", uploaded: true },
    sitePlanDoc: { name: "Warehouse_Layout_CCTV_Grid.pdf", size: "4.2 MB", uploaded: true }
  });

  // STEP 4: Declaration
  const [declarations, setDeclarations] = useState({
    truthfulParticulars: true,
    noConviction: true,
    abideByRules: true,
    surveillanceCompliance: true,
    signatoryName: "Ramesh Chandra",
    designation: "Authorized Director",
    place: "New Delhi",
    date: new Date().toLocaleDateString("en-IN")
  });

  const [formErrors, setFormErrors] = useState({});

  // 4 Steps definition
  const wizardSteps = [
    { num: 1, label: "Applicant Details" },
    { num: 2, label: "Additional Details" },
    { num: 3, label: "Personal Document" },
    { num: 4, label: "Declaration" }
  ];

  const handleApplicantChange = (field, val) => {
    setApplicantData((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAdditionalChange = (field, val) => {
    setAdditionalData((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleDocToggle = (docKey) => {
    setDocuments((prev) => {
      const current = prev[docKey];
      if (current.uploaded) {
        if (showToast) showToast(`Removed ${current.name}`, "info");
        return {
          ...prev,
          [docKey]: { ...current, uploaded: false }
        };
      } else {
        if (showToast) showToast(`Document uploaded successfully!`, "success");
        return {
          ...prev,
          [docKey]: { ...current, uploaded: true }
        };
      }
    });
  };

  // Step Validations
  const validateStep1 = () => {
    const errors = {};
    if (!applicantData.applicantName.trim()) errors.applicantName = "Applicant Name is required";
    if (!applicantData.dob) errors.dob = "Date of Birth is required";
    if (!applicantData.occupation.trim()) errors.occupation = "Occupation is required";
    if (!applicantData.panNo.trim() || applicantData.panNo.trim().length !== 10) {
      errors.panNo = "Valid 10-digit PAN is required";
    }
    if (!applicantData.address1.trim()) errors.address1 = "Address Line 1 is required";
    if (!applicantData.district) errors.district = "District is required";
    if (!applicantData.policeStation.trim()) errors.policeStation = "Police Station is required";
    if (!applicantData.pin || applicantData.pin.trim().length !== 6) {
      errors.pin = "Valid 6-digit PIN is required";
    }
    if (!applicantData.mobile || applicantData.mobile.trim().length !== 10) {
      errors.mobile = "Valid 10-digit Mobile is required";
    }
    if (!applicantData.email || !applicantData.email.includes("@")) {
      errors.email = "Valid Email is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!additionalData.firmName.trim()) errors.firmName = "Firm / Business Name is required";
    if (!additionalData.proprietorName.trim()) errors.proprietorName = "Proprietor / Representative Name is required";
    if (!additionalData.firmPan.trim() || additionalData.firmPan.trim().length !== 10) {
      errors.firmPan = "Valid 10-digit PAN is required";
    }
    if (!additionalData.gstin.trim() || additionalData.gstin.trim().length !== 15) {
      errors.gstin = "Valid 15-character GSTIN is required";
    }
    if (!additionalData.warehouseAddress.trim()) errors.warehouseAddress = "Warehouse Address is required";
    if (!additionalData.warehouseArea || Number(additionalData.warehouseArea) <= 0) {
      errors.warehouseArea = "Warehouse Area must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const requiredDocs = ["firmPanDoc", "gstCertDoc", "proprietorIdDoc", "warehouseLeaseDoc", "fireNocDoc"];
    const missing = requiredDocs.some((key) => !documents[key].uploaded);
    if (missing) {
      if (showToast) showToast("Please upload all mandatory documents to proceed.", "error");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (
      !declarations.truthfulParticulars ||
      !declarations.noConviction ||
      !declarations.abideByRules ||
      !declarations.surveillanceCompliance
    ) {
      if (showToast) showToast("Please accept all statutory undertakings.", "error");
      return false;
    }
    if (!declarations.signatoryName.trim()) {
      if (showToast) showToast("Authorized Signatory Name is required.", "error");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        if (showToast) showToast("Applicant Details verified. Proceeding to Additional Details.");
      } else {
        if (showToast) showToast("Please complete all required fields marked in red.", "error");
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        if (showToast) showToast("Additional Details saved. Proceeding to Document Upload.");
      } else {
        if (showToast) showToast("Please complete required dealer and warehouse details.", "error");
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
        if (showToast) showToast("Statutory documents attached. Proceeding to Declaration.");
      }
    } else if (currentStep === 4) {
      if (validateStep4()) {
        handleFinalSubmit();
      }
    }
  };

  const handleFinalSubmit = () => {
    const referenceNum = `DLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString("en-GB");

    const newDealerRecord = {
      id: referenceNum,
      firmName: additionalData.firmName,
      ownerName: additionalData.proprietorName,
      licenseType: additionalData.dealerCategory,
      categoryClass: additionalData.dealerCategory.includes("Retail") ? "Retail" : "Wholesale",
      panNum: additionalData.firmPan.toUpperCase(),
      gstinNum: additionalData.gstin.toUpperCase(),
      warehouseAddress: additionalData.warehouseAddress,
      status: "Under Assessment",
      submittedDate: todayStr,
      securityDeposit: `₹ ${Number(additionalData.securityDeposit).toLocaleString("en-IN")} (Bond Verification)`,
      currentLevel: "Trade Scrutiny Cell",
      remarks: "Verification of bonded store space under technical review",
      appraisalStages: [
        {
          label: "Credentials Audit",
          status: "completed",
          date: todayStr,
          officer: "Trade Scrutiny Desk",
          note: "Identity credentials verified"
        },
        {
          label: "Tax Clearance Verification",
          status: "in-progress",
          date: "Ongoing",
          officer: "Revenue Audit Cell",
          note: "Delhi GST & VAT clearance under verification"
        },
        {
          label: "Stockroom Security Inspection",
          status: "pending",
          date: "Pending",
          officer: "Excise Inspector (Bonds)",
          note: "Site inspection to be scheduled"
        },
        {
          label: "Trade Authorization Active",
          status: "pending",
          date: "Pending",
          officer: "Deputy Commissioner (Trade)",
          note: "Pending inspection completion"
        }
      ]
    };

    if (onSubmitDealer) {
      onSubmitDealer(newDealerRecord);
    }

    setSubmittedData(newDealerRecord);
    setSubmitted(true);
    if (showToast) {
      showToast(`Dealer registration ${referenceNum} filed under administrative scrutiny ledger!`, "success");
    }
  };

  // SUCCESS SUBMITTED VIEW
  if (submitted && submittedData) {
    return (
      <div className="dealer-wizard-container">
        {/* Navigation Top Bar */}
        <div className="dealer-nav-bar">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="dealer-back-btn"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="dealer-breadcrumb">
            <span>Dealer</span>
            <span>/</span>
            <span className="dealer-breadcrumb-active">Registration Receipt</span>
          </div>
        </div>

        <div className="dealer-success-card animate-fade">
          <div className="dealer-success-badge">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="dealer-success-title">
            Trade Dealer Registration Docket Filed!
          </h2>

          <p className="dealer-success-desc">
            The registration request for{" "}
            <strong className="text-slate-800">{submittedData.firmName}</strong>{" "}
            has been securely registered in the Delhi Excise Trade Ledger under reference{" "}
            <span className="dealer-ref-badge">{submittedData.id}</span>.
            PAN and GSTIN clearance verification is currently in progress.
          </p>

          <div className="dealer-summary-box">
            <div className="dealer-summary-grid">
              <div>
                <span className="dealer-summary-label">Application ID</span>
                <p className="dealer-summary-val font-mono text-blue-700">{submittedData.id}</p>
              </div>
              <div>
                <span className="dealer-summary-label">Submission Date</span>
                <p className="dealer-summary-val">{submittedData.submittedDate}</p>
              </div>
              <div>
                <span className="dealer-summary-label">Firm Name</span>
                <p className="dealer-summary-val">{submittedData.firmName}</p>
              </div>
              <div>
                <span className="dealer-summary-label">Proprietor / Representative</span>
                <p className="dealer-summary-val">{submittedData.ownerName}</p>
              </div>
              <div>
                <span className="dealer-summary-label">Dealer Category</span>
                <p className="dealer-summary-val">{submittedData.licenseType}</p>
              </div>
              <div>
                <span className="dealer-summary-label">Initial Status</span>
                <p className="dealer-summary-val text-amber-600 font-bold">Under Scrutiny Cell</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (showToast) showToast("Opening connected PDF print spooler...", "info");
                window.print();
              }}
              className="dealer-back-btn"
            >
              <Printer className="w-4 h-4" />
              <span>Print Application Docket</span>
            </button>

            {onNavigateToApplied && (
              <button
                type="button"
                onClick={onNavigateToApplied}
                className="dealer-btn-next"
              >
                <Building2 className="w-4 h-4" />
                <span>View in Applied Dealers Register</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
              }}
              className="dealer-back-btn"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Register Another Dealer</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dealer-wizard-container">
      {/* Top Header Breadcrumb and Back Action */}
      <div className="dealer-nav-bar">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="dealer-back-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="dealer-breadcrumb">
          <span>Excise Portal</span>
          <span>/</span>
          <span>Trade Dealer</span>
          <span>/</span>
          <span className="dealer-breadcrumb-active">Dealer Registration</span>
        </div>
      </div>

      {/* Top Banner with branding */}
      <div className="dealer-banner">
        <div>
          <h1 className="dealer-banner-title">
            <Warehouse className="w-5 h-5 text-yellow-300" />
            Excise Dealer & Sub-Dealer Registration Portal
          </h1>
          <p className="dealer-banner-subtitle">
            Statutory four-step filing for wholesale & retail spirit dealers, stockists and bonded warehouses (NCT of Delhi)
          </p>
        </div>
        <div className="dealer-portal-tag">
          FORM D-1 / 2026-27
        </div>
      </div>

      {/* 4 SLANTED / TRAPEZOID STEPPER TABS (Matching Screenshot) */}
      <div className="dealer-skew-bar">
        {wizardSteps.map((st) => {
          const isActive = currentStep === st.num;
          const isCompleted = currentStep > st.num;

          return (
            <div
              key={st.num}
              onClick={() => {
                // Allow clicking previous steps or current step
                if (st.num <= currentStep) {
                  setCurrentStep(st.num);
                }
              }}
              className={`dealer-skew-tab ${
                isActive ? "active" : isCompleted ? "completed" : ""
              }`}
              title={`Step ${st.num}: ${st.label}`}
            >
              <div className="dealer-skew-tab-inner">
                <div className="dealer-skew-num-box">
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  ) : (
                    <span className="dealer-skew-num">{st.num}</span>
                  )}
                </div>
                <span className="dealer-skew-label">{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN STEP CONTENT CARD */}
      <div className="dealer-content-wrapper">
        
        {/* STEP 1: APPLICANT DETAILS */}
        {currentStep === 1 && (
          <div>
            <div className="dealer-grey-header">Applicant Details</div>
            <div className="dealer-form-card">
              
              {/* Notice Banner */}
              <div className="dealer-info-notice">
                <User className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="dealer-info-title">Pre-filed Registered Profile Information</h4>
                  <p className="dealer-info-desc">
                    These applicant details are loaded automatically from your online registry records. You can review and verify the demographic, residential, and verification fields.
                  </p>
                </div>
              </div>

              {/* Sub-section 1: Personal Details */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">1</span>
                  <h3 className="dealer-sub-title">Personal Details</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Applicant Name */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Applicant Name <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input uppercase ${formErrors.applicantName ? "has-error" : ""}`}
                      value={applicantData.applicantName}
                      onChange={(e) => handleApplicantChange("applicantName", e.target.value.toUpperCase())}
                      placeholder="ENTER FULL LEGAL NAME"
                    />
                    {formErrors.applicantName && (
                      <span className="dealer-error-msg">{formErrors.applicantName}</span>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Date of Birth <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="date"
                      className={`dealer-input ${formErrors.dob ? "has-error" : ""}`}
                      value={applicantData.dob}
                      onChange={(e) => handleApplicantChange("dob", e.target.value)}
                    />
                    {formErrors.dob && (
                      <span className="dealer-error-msg">{formErrors.dob}</span>
                    )}
                  </div>

                  {/* Father's / Husband's Name */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Father / Husband Name <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className="dealer-input uppercase"
                      value={applicantData.fatherName}
                      onChange={(e) => handleApplicantChange("fatherName", e.target.value.toUpperCase())}
                      placeholder="FATHER'S FULL NAME"
                    />
                  </div>

                  {/* Gender */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Gender</label>
                    <select
                      className="dealer-select"
                      value={applicantData.gender}
                      onChange={(e) => handleApplicantChange("gender", e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Occupation <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input uppercase ${formErrors.occupation ? "has-error" : ""}`}
                      value={applicantData.occupation}
                      onChange={(e) => handleApplicantChange("occupation", e.target.value.toUpperCase())}
                      placeholder="BUSINESS / SERVICE"
                    />
                    {formErrors.occupation && (
                      <span className="dealer-error-msg">{formErrors.occupation}</span>
                    )}
                  </div>

                  {/* PAN Card Number */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Individual / Director PAN <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      className={`dealer-input uppercase font-mono ${formErrors.panNo ? "has-error" : ""}`}
                      value={applicantData.panNo}
                      onChange={(e) => handleApplicantChange("panNo", e.target.value.toUpperCase())}
                      placeholder="AAACS0409A"
                    />
                    {formErrors.panNo && (
                      <span className="dealer-error-msg">{formErrors.panNo}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-section 2: Residential Address Details */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">2</span>
                  <h3 className="dealer-sub-title">Residential / Registered Address Details</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Address Line 1 */}
                  <div className="dealer-form-group dealer-col-span-2">
                    <label className="dealer-form-label">
                      Address Line 1 <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input ${formErrors.address1 ? "has-error" : ""}`}
                      value={applicantData.address1}
                      onChange={(e) => handleApplicantChange("address1", e.target.value)}
                      placeholder="Premises / Plot No., Building Name, Street"
                    />
                    {formErrors.address1 && (
                      <span className="dealer-error-msg">{formErrors.address1}</span>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Address Line 2</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={applicantData.address2}
                      onChange={(e) => handleApplicantChange("address2", e.target.value)}
                      placeholder="Locality / Landmark"
                    />
                  </div>

                  {/* State */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      State <span className="dealer-req">*</span>
                    </label>
                    <select
                      className="dealer-select"
                      value={applicantData.state}
                      onChange={(e) => handleApplicantChange("state", e.target.value)}
                    >
                      <option value="Delhi">Delhi (NCT)</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>

                  {/* District */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      District <span className="dealer-req">*</span>
                    </label>
                    <select
                      className={`dealer-select ${formErrors.district ? "has-error" : ""}`}
                      value={applicantData.district}
                      onChange={(e) => handleApplicantChange("district", e.target.value)}
                    >
                      <option value="Central Delhi">Central Delhi</option>
                      <option value="East Delhi">East Delhi</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="North Delhi">North Delhi</option>
                      <option value="North East Delhi">North East Delhi</option>
                      <option value="North West Delhi">North West Delhi</option>
                      <option value="Shahdara">Shahdara</option>
                      <option value="South Delhi">South Delhi</option>
                      <option value="South East Delhi">South East Delhi</option>
                      <option value="South West Delhi">South West Delhi</option>
                      <option value="West Delhi">West Delhi</option>
                    </select>
                  </div>

                  {/* Sub Division */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Sub-Division / Tehsil</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={applicantData.subDivision}
                      onChange={(e) => handleApplicantChange("subDivision", e.target.value)}
                      placeholder="e.g. Kalkaji / Chanakyapuri"
                    />
                  </div>

                  {/* Police Station */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Jurisdiction Police Station <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input ${formErrors.policeStation ? "has-error" : ""}`}
                      value={applicantData.policeStation}
                      onChange={(e) => handleApplicantChange("policeStation", e.target.value)}
                      placeholder="e.g. Okhla PS / Connaught Place PS"
                    />
                    {formErrors.policeStation && (
                      <span className="dealer-error-msg">{formErrors.policeStation}</span>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Postal PIN Code <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      className={`dealer-input font-mono ${formErrors.pin ? "has-error" : ""}`}
                      value={applicantData.pin}
                      onChange={(e) => handleApplicantChange("pin", e.target.value)}
                      placeholder="110020"
                    />
                    {formErrors.pin && (
                      <span className="dealer-error-msg">{formErrors.pin}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Contact & Communication */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">3</span>
                  <h3 className="dealer-sub-title">Contact & Communication Details</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Mobile Number */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Mobile Number <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      className={`dealer-input font-mono ${formErrors.mobile ? "has-error" : ""}`}
                      value={applicantData.mobile}
                      onChange={(e) => handleApplicantChange("mobile", e.target.value)}
                      placeholder="9811234567"
                    />
                    {formErrors.mobile && (
                      <span className="dealer-error-msg">{formErrors.mobile}</span>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Email Address <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="email"
                      className={`dealer-input ${formErrors.email ? "has-error" : ""}`}
                      value={applicantData.email}
                      onChange={(e) => handleApplicantChange("email", e.target.value)}
                      placeholder="name@domain.com"
                    />
                    {formErrors.email && (
                      <span className="dealer-error-msg">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Landline */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Landline / Office Contact</label>
                    <input
                      type="text"
                      className="dealer-input font-mono"
                      value={applicantData.landline}
                      onChange={(e) => handleApplicantChange("landline", e.target.value)}
                      placeholder="011-26814455"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Button Row */}
              <div className="dealer-btn-row">
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  className="dealer-btn-prev"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="dealer-btn-next"
                >
                  <span>Next: Additional Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 2: ADDITIONAL DETAILS */}
        {currentStep === 2 && (
          <div>
            <div className="dealer-grey-header">Additional Details</div>
            <div className="dealer-form-card">
              
              {/* Notice Banner */}
              <div className="dealer-info-notice">
                <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="dealer-info-title">Firm Credentials & Warehouse Logistics Information</h4>
                  <p className="dealer-info-desc">
                    Specify the registered commercial business structure, tax identifiers, licensed spirit category, and physical storage warehouse parameters.
                  </p>
                </div>
              </div>

              {/* Sub-section 1: Firm Business Identity */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">1</span>
                  <h3 className="dealer-sub-title">Registered Commercial Entity Details</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Firm Name */}
                  <div className="dealer-form-group dealer-col-span-2">
                    <label className="dealer-form-label">
                      Registered Firm / Business Name <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input ${formErrors.firmName ? "has-error" : ""}`}
                      value={additionalData.firmName}
                      onChange={(e) => handleAdditionalChange("firmName", e.target.value)}
                      placeholder="e.g. Imperial Spirits Trade Corp"
                    />
                    {formErrors.firmName && (
                      <span className="dealer-error-msg">{formErrors.firmName}</span>
                    )}
                  </div>

                  {/* Constitution of Business */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Constitution of Business <span className="dealer-req">*</span>
                    </label>
                    <select
                      className="dealer-select"
                      value={additionalData.constitutionType}
                      onChange={(e) => handleAdditionalChange("constitutionType", e.target.value)}
                    >
                      <option value="Private Limited Company">Private Limited Company</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                      <option value="Public Limited Company">Public Limited Company</option>
                    </select>
                  </div>

                  {/* Proprietor / Managing Director Name */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Proprietor / Representative Name <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`dealer-input ${formErrors.proprietorName ? "has-error" : ""}`}
                      value={additionalData.proprietorName}
                      onChange={(e) => handleAdditionalChange("proprietorName", e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                    />
                    {formErrors.proprietorName && (
                      <span className="dealer-error-msg">{formErrors.proprietorName}</span>
                    )}
                  </div>

                  {/* Firm PAN */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Firm Income Tax PAN <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      className={`dealer-input uppercase font-mono ${formErrors.firmPan ? "has-error" : ""}`}
                      value={additionalData.firmPan}
                      onChange={(e) => handleAdditionalChange("firmPan", e.target.value.toUpperCase())}
                      placeholder="AAACS0409A"
                    />
                    {formErrors.firmPan && (
                      <span className="dealer-error-msg">{formErrors.firmPan}</span>
                    )}
                  </div>

                  {/* GSTIN */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      State GSTIN ID / Number <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      className={`dealer-input uppercase font-mono ${formErrors.gstin ? "has-error" : ""}`}
                      value={additionalData.gstin}
                      onChange={(e) => handleAdditionalChange("gstin", e.target.value.toUpperCase())}
                      placeholder="07AAACS0409A1ZP"
                    />
                    {formErrors.gstin && (
                      <span className="dealer-error-msg">{formErrors.gstin}</span>
                    )}
                  </div>

                  {/* Dealer Category */}
                  <div className="dealer-form-group dealer-col-span-3">
                    <label className="dealer-form-label">
                      Excise Dealer Category Class <span className="dealer-req">*</span>
                    </label>
                    <select
                      className="dealer-select"
                      value={additionalData.dealerCategory}
                      onChange={(e) => handleAdditionalChange("dealerCategory", e.target.value)}
                    >
                      <option value="L-13 Wholesale import bond storage">L-13 Wholesale import bond storage</option>
                      <option value="L-15 Wholesale custom bond ware-house">L-15 Wholesale custom bond ware-house</option>
                      <option value="L-2 Retail Vend of Beer & Wine">L-2 Retail Vend of Beer & Wine</option>
                      <option value="L-3 Retail Vend of Indian Liquor">L-3 Retail Vend of Indian Liquor</option>
                      <option value="Wholesale Stockist & Institutional Distributor">Wholesale Stockist & Institutional Distributor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sub-section 2: Bonded Warehouse / Storage Facility */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">2</span>
                  <h3 className="dealer-sub-title">Bonded Warehouse & Storage Facility</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Warehouse Name */}
                  <div className="dealer-form-group dealer-col-span-2">
                    <label className="dealer-form-label">Warehouse Depot Name</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={additionalData.warehouseName}
                      onChange={(e) => handleAdditionalChange("warehouseName", e.target.value)}
                      placeholder="Imperial Okhla Bonded Storage Depot"
                    />
                  </div>

                  {/* Possession Status */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Premises Possession Status</label>
                    <select
                      className="dealer-select"
                      value={additionalData.possessionStatus}
                      onChange={(e) => handleAdditionalChange("possessionStatus", e.target.value)}
                    >
                      <option value="Owned">Owned</option>
                      <option value="Registered Lease Deed">Registered Lease Deed</option>
                      <option value="Rented / Tenancy">Rented / Tenancy</option>
                    </select>
                  </div>

                  {/* Warehouse Complete Address */}
                  <div className="dealer-form-group dealer-col-span-3">
                    <label className="dealer-form-label">
                      Warehouse Location Address <span className="dealer-req">*</span>
                    </label>
                    <textarea
                      rows={2}
                      className={`dealer-textarea ${formErrors.warehouseAddress ? "has-error" : ""}`}
                      value={additionalData.warehouseAddress}
                      onChange={(e) => handleAdditionalChange("warehouseAddress", e.target.value)}
                      placeholder="Plot number, industrial cluster, shed, sector, PIN..."
                    />
                    {formErrors.warehouseAddress && (
                      <span className="dealer-error-msg">{formErrors.warehouseAddress}</span>
                    )}
                  </div>

                  {/* Carpet Area */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Carpet Area (Sq. Ft.) <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="number"
                      className={`dealer-input ${formErrors.warehouseArea ? "has-error" : ""}`}
                      value={additionalData.warehouseArea}
                      onChange={(e) => handleAdditionalChange("warehouseArea", e.target.value)}
                      placeholder="12500"
                    />
                  </div>

                  {/* Storage Capacity */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Storage Capacity (Cases / Litres)</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={additionalData.storageCapacity}
                      onChange={(e) => handleAdditionalChange("storageCapacity", e.target.value)}
                      placeholder="25000 Cases"
                    />
                  </div>

                  {/* Temperature Control */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Cold Storage / Temperature Control</label>
                    <select
                      className="dealer-select"
                      value={additionalData.hasColdStorage}
                      onChange={(e) => handleAdditionalChange("hasColdStorage", e.target.value)}
                    >
                      <option value="Yes">Yes (Available)</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Financials & Security */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">3</span>
                  <h3 className="dealer-sub-title">Financial Standing & Statutory Security</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Annual Turnover */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Estimated Annual Turnover (₹ Crores)</label>
                    <input
                      type="text"
                      className="dealer-input font-mono"
                      value={additionalData.annualTurnover}
                      onChange={(e) => handleAdditionalChange("annualTurnover", e.target.value)}
                      placeholder="45.50"
                    />
                  </div>

                  {/* Bank Guarantee Ref */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Bank Guarantee Security Ref</label>
                    <input
                      type="text"
                      className="dealer-input font-mono uppercase"
                      value={additionalData.bankGuaranteeRef}
                      onChange={(e) => handleAdditionalChange("bankGuaranteeRef", e.target.value.toUpperCase())}
                      placeholder="BG-2026-NCT-99120"
                    />
                  </div>

                  {/* Security Deposit Amount */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Security Deposit Amount (₹)</label>
                    <input
                      type="text"
                      className="dealer-input font-mono"
                      value={additionalData.securityDeposit}
                      onChange={(e) => handleAdditionalChange("securityDeposit", e.target.value)}
                      placeholder="500000"
                    />
                  </div>

                  {/* CCTV */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">24x7 IP Surveillance Installed</label>
                    <select
                      className="dealer-select"
                      value={additionalData.cctvInstalled}
                      onChange={(e) => handleAdditionalChange("cctvInstalled", e.target.value)}
                    >
                      <option value="Yes">Yes (Certified & Online)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Fire Safety */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Fire Hydrants & Sprinklers Active</label>
                    <select
                      className="dealer-select"
                      value={additionalData.fireNocOperational}
                      onChange={(e) => handleAdditionalChange("fireNocOperational", e.target.value)}
                    >
                      <option value="Yes">Yes (Delhi Fire Service Approved)</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottom Button Row */}
              <div className="dealer-btn-row">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="dealer-btn-prev"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: Applicant Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="dealer-btn-next"
                >
                  <span>Next: Personal Document</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: PERSONAL DOCUMENT */}
        {currentStep === 3 && (
          <div>
            <div className="dealer-grey-header">Personal Document</div>
            <div className="dealer-form-card">
              
              {/* Notice Banner */}
              <div className="dealer-info-notice">
                <FileCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="dealer-info-title">Statutory Document Verification Dossier</h4>
                  <p className="dealer-info-desc">
                    Upload self-attested copies of firm incorporation certificates, tax registrations, warehouse ownership deeds, and statutory safety NOCs (Max size: 5 MB per document).
                  </p>
                </div>
              </div>

              {/* Document items list */}
              <div className="space-y-3">
                {/* 1. Firm PAN Card */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Firm / Business Income Tax PAN Card <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.firmPanDoc.uploaded
                          ? `Attached: ${documents.firmPanDoc.name} (${documents.firmPanDoc.size})`
                          : "Mandatory: Self-attested copy of Firm PAN"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("firmPanDoc")}
                    className={`dealer-upload-btn ${documents.firmPanDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.firmPanDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. GSTIN Certificate */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Delhi GST Registration Certificate (Form GST REG-06) <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.gstCertDoc.uploaded
                          ? `Attached: ${documents.gstCertDoc.name} (${documents.gstCertDoc.size})`
                          : "Mandatory: Principal place of business must reflect registered warehouse"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("gstCertDoc")}
                    className={`dealer-upload-btn ${documents.gstCertDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.gstCertDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. Proprietor / Partner Identity Proof */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Identity & Residence Proof of Proprietor / Partners <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.proprietorIdDoc.uploaded
                          ? `Attached: ${documents.proprietorIdDoc.name} (${documents.proprietorIdDoc.size})`
                          : "Mandatory: Aadhaar Card, Passport or Voter ID"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("proprietorIdDoc")}
                    className={`dealer-upload-btn ${documents.proprietorIdDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.proprietorIdDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 4. Warehouse Lease / Title Deed */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Warehouse Registered Lease Deed / Ownership Title <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.warehouseLeaseDoc.uploaded
                          ? `Attached: ${documents.warehouseLeaseDoc.name} (${documents.warehouseLeaseDoc.size})`
                          : "Mandatory: Registered lease with validity matching excise financial year"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("warehouseLeaseDoc")}
                    className={`dealer-upload-btn ${documents.warehouseLeaseDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.warehouseLeaseDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 5. Fire Safety NOC */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Delhi Fire Service Safety Clearance / NOC <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.fireNocDoc.uploaded
                          ? `Attached: ${documents.fireNocDoc.name} (${documents.fireNocDoc.size})`
                          : "Mandatory: Current valid fire safety certificate"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("fireNocDoc")}
                    className={`dealer-upload-btn ${documents.fireNocDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.fireNocDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 6. Site Layout & CCTV Plan */}
                <div className="dealer-doc-item">
                  <div className="dealer-doc-info">
                    <div className="dealer-doc-icon">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="dealer-doc-name">
                        Architectural Storage Layout & CCTV Grid Plan <span className="dealer-req">*</span>
                      </h4>
                      <p className="dealer-doc-meta">
                        {documents.sitePlanDoc.uploaded
                          ? `Attached: ${documents.sitePlanDoc.name} (${documents.sitePlanDoc.size})`
                          : "Mandatory: Detailed scaled layout of bays, bonded stacks and camera feeds"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDocToggle("sitePlanDoc")}
                    className={`dealer-upload-btn ${documents.sitePlanDoc.uploaded ? "uploaded" : "pending"}`}
                  >
                    {documents.sitePlanDoc.uploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Button Row */}
              <div className="dealer-btn-row">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="dealer-btn-prev"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: Additional Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="dealer-btn-next"
                >
                  <span>Next: Declaration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: DECLARATION */}
        {currentStep === 4 && (
          <div>
            <div className="dealer-grey-header">Declaration</div>
            <div className="dealer-form-card">
              
              {/* Notice Banner */}
              <div className="dealer-info-notice">
                <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="dealer-info-title">Statutory Legal Undertaking & Regulatory Compliance</h4>
                  <p className="dealer-info-desc">
                    Under the provisions of Section 12 & 35 of the Delhi Excise Act, 2009 and the Delhi Excise Rules, 2010. Read each declaration and confirm assent.
                  </p>
                </div>
              </div>

              {/* Declaration Checkboxes */}
              <div className="dealer-declaration-box">
                <div className="dealer-declaration-item">
                  <input
                    type="checkbox"
                    id="dec1"
                    className="dealer-checkbox"
                    checked={declarations.truthfulParticulars}
                    onChange={(e) =>
                      setDeclarations((prev) => ({ ...prev, truthfulParticulars: e.target.checked }))
                    }
                  />
                  <label htmlFor="dec1" className="dealer-dec-text cursor-pointer">
                    <strong>Accuracy of Information:</strong> I/We solemnly declare that the particulars furnished in this application, along with the appended attachments, are true, correct, and complete in all respects.
                  </label>
                </div>

                <div className="dealer-declaration-item">
                  <input
                    type="checkbox"
                    id="dec2"
                    className="dealer-checkbox"
                    checked={declarations.noConviction}
                    onChange={(e) =>
                      setDeclarations((prev) => ({ ...prev, noConviction: e.target.checked }))
                    }
                  />
                  <label htmlFor="dec2" className="dealer-dec-text cursor-pointer">
                    <strong>Absence of Criminal Conviction:</strong> I/We certify that neither the firm nor any proprietor, partner, or director has ever been convicted of any offense under the Delhi Excise Act, 2009, NDPS Act, or any cognizable criminal code.
                  </label>
                </div>

                <div className="dealer-declaration-item">
                  <input
                    type="checkbox"
                    id="dec3"
                    className="dealer-checkbox"
                    checked={declarations.abideByRules}
                    onChange={(e) =>
                      setDeclarations((prev) => ({ ...prev, abideByRules: e.target.checked }))
                    }
                  />
                  <label htmlFor="dec3" className="dealer-dec-text cursor-pointer">
                    <strong>Regulatory Compliance:</strong> I/We undertake to strictly comply with all conditions of authorization, excise orders, statutory guidelines, tax liabilities, and directives issued by the Excise Commissioner of NCT Delhi.
                  </label>
                </div>

                <div className="dealer-declaration-item">
                  <input
                    type="checkbox"
                    id="dec4"
                    className="dealer-checkbox"
                    checked={declarations.surveillanceCompliance}
                    onChange={(e) =>
                      setDeclarations((prev) => ({ ...prev, surveillanceCompliance: e.target.checked }))
                    }
                  />
                  <label htmlFor="dec4" className="dealer-dec-text cursor-pointer">
                    <strong>Stock Audits & 24x7 Surveillance:</strong> I/We agree to maintain synchronized digital stock registers, RFID transit pass documentation, and continuous live IP CCTV feeds for remote inspection by Departmental Scrutiny Cells.
                  </label>
                </div>
              </div>

              {/* Signatory Coordinates */}
              <div className="dealer-sub-section">
                <div className="dealer-sub-header">
                  <span className="dealer-sub-num">✓</span>
                  <h3 className="dealer-sub-title">Authorized Signatory Coordinates</h3>
                </div>

                <div className="dealer-grid-3">
                  {/* Signatory Name */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">
                      Authorized Signatory Full Name <span className="dealer-req">*</span>
                    </label>
                    <input
                      type="text"
                      className="dealer-input uppercase font-bold"
                      value={declarations.signatoryName}
                      onChange={(e) =>
                        setDeclarations((prev) => ({ ...prev, signatoryName: e.target.value.toUpperCase() }))
                      }
                      placeholder="RAMESH CHANDRA"
                    />
                  </div>

                  {/* Designation */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Signatory Designation</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={declarations.designation}
                      onChange={(e) =>
                        setDeclarations((prev) => ({ ...prev, designation: e.target.value }))
                      }
                      placeholder="Authorized Director / Proprietor"
                    />
                  </div>

                  {/* Place */}
                  <div className="dealer-form-group">
                    <label className="dealer-form-label">Place of Execution</label>
                    <input
                      type="text"
                      className="dealer-input"
                      value={declarations.place}
                      onChange={(e) =>
                        setDeclarations((prev) => ({ ...prev, place: e.target.value }))
                      }
                      placeholder="New Delhi"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Button Row */}
              <div className="dealer-btn-row">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="dealer-btn-prev"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: Personal Document</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="dealer-btn-submit"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Dealer Registration</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
