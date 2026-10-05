import React, { useState } from "react";
import {
  FlaskConical,
  Building2,
  Check,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer
} from "lucide-react";
import SelectMtpLicenseType from "./SelectMtpLicenseTitle.jsx";
import { MTP_LICENSES_DATA } from "./MtpLicensesData.jsx";

export default function MtpLicenseWizard({
  onBackToDashboard,
  showToast = () => {},
  rootData = {}
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLicenseCode, setSelectedLicenseCode] = useState("L-1 (M&TP)");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [mtpFormData, setMtpFormData] = useState({
    // Step 2: Applicant & Unit Details
    applicantName: rootData.applicantName || "Delhi Pharmaceutical Formulation Works Pvt Ltd",
    entityType: rootData.entityType || "Private Limited Company",
    tradeName: "Okhla Bio-Formulations & Labs",
    cinNumber: "U24233DL2018PTC339102",
    panNumber: "AABCD1234E",
    gstinNumber: "07AABCD1234E1Z5",
    drugLicenseNumber: "DL-DRUG-20B-88912 / DL-25-MFG-4401",
    drugLicenseIssueDate: "12-Jan-2023",
    drugLicenseValidity: "31-Dec-2028",
    plantAddress: "Plot No. 48, Okhla Industrial Area Phase-II, New Delhi - 110020",
    district: "South East Delhi",
    pinCode: "110020",
    authorizedSignatory: "Dr. Rajeshwar Prasad (Director & Chemist)",
    officialEmail: "regulatory@delhibioform.com",
    contactMobile: "9871122334",

    // Step 3: Drug & Formulation Particulars
    notifiedDrugNames: "Morphine Sulphate API, Codeine Phosphate, Ethylmorphine Hydrochloride, Rectified Spirit 95% v/v",
    formulationCategory: "Liquid Oral Tonics, Analgesic Syrups & Controlled Elixirs",
    annualQuotaRequested: "15,000 Litres / 250 Kg API",
    storageVaultSpecs: "RCC Reinforced Double-Locked Fireproof Safe Vault with 24x7 CCTV & Biometric Ingress",
    chiefPharmacistName: "Sunil Verma, B.Pharm (Regn No: DEL-PHARM-19402)",
    pharmacistMobile: "9810987654",
    labTestingFacility: "In-house High Performance Liquid Chromatography (HPLC) & Chemical Assay Unit",
    priorExciseClearance: "Yes - Compliant with GNCTD Excise Audits",

    // Step 4: Documents Uploaded
    drugControllerLicUploaded: true,
    plantLayoutPlanUploaded: true,
    fireSafetyNocUploaded: true,
    pollutionControlUploaded: true,
    pharmacistAffidavitUploaded: true,
    directorsKycUploaded: true,

    // Step 5: Declarations
    undertakingAccepted: false,
    statutoryFeesConfirmed: false
  });

  const [errors, setErrors] = useState({});

  const wizardSteps = [
    { num: 1, label: "Step-1", title: "Select License Type (DD09/DD10)" },
    { num: 2, label: "Step-2", title: "Applicant & Enterprise Profile" },
    { num: 3, label: "Step-3", title: "Drug Formulations & Security Vault" },
    { num: 4, label: "Step-4", title: "Statutory Document Uploads" },
    { num: 5, label: "Step-5", title: "Review & Digital Submission" }
  ];

  const handleInputChange = (field, value) => {
    setMtpFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const getLicenseMeta = (code) => {
    const found = MTP_LICENSES_DATA.find(
      (item) =>
        item.id === code ||
        item.code === code ||
        item.shortCode === code ||
        item.id.replace(/\s+/g, "") === String(code).replace(/\s+/g, "")
    );

    if (found) {
      return {
        code: found.code,
        name: found.title,
        fullTitle: found.fullTitle,
        category: found.categoryLabel,
        feeFormatted: found.feeFormatted,
        bond: found.bondFormatted,
        tag: found.badge,
        validity: found.validity,
        isPermit: found.isPermit
      };
    }

    return {
      code: code || "L-1 (M&TP)",
      name: "Medicinal & Toilet Preparations Licence",
      fullTitle: "M&TP / Dangerous Drugs (GNCTD Excise Department)",
      category: "M&TP Branch",
      feeFormatted: "₹ 2,00,000 / Year",
      bond: "₹ 50,000 Security Deposit",
      tag: "Statutory Licence",
      validity: "1 Year (Renewable)",
      isPermit: false
    };
  };

  const currentLicMeta = getLicenseMeta(selectedLicenseCode);

  const validateCurrentStep = () => {
    const errs = {};
    if (currentStep === 2) {
      if (!mtpFormData.applicantName?.trim()) errs.applicantName = "Applicant enterprise name is required";
      if (!mtpFormData.drugLicenseNumber?.trim()) errs.drugLicenseNumber = "Drug Controller License number is required";
      if (!mtpFormData.plantAddress?.trim()) errs.plantAddress = "Plant / premise address is required";
      if (!mtpFormData.contactMobile?.trim()) errs.contactMobile = "Contact mobile number is required";
    } else if (currentStep === 3) {
      if (!mtpFormData.notifiedDrugNames?.trim()) errs.notifiedDrugNames = "Specify notified drug / spirit details";
      if (!mtpFormData.annualQuotaRequested?.trim()) errs.annualQuotaRequested = "Annual quota requirement is required";
      if (!mtpFormData.chiefPharmacistName?.trim()) errs.chiefPharmacistName = "Approved Chief Pharmacist name & registration is required";
    } else if (currentStep === 4) {
      if (!mtpFormData.drugControllerLicUploaded) errs.drugControllerLicUploaded = "Drug controller license is required";
      if (!mtpFormData.plantLayoutPlanUploaded) errs.plantLayoutPlanUploaded = "Factory / vault blueprint plan is required";
    } else if (currentStep === 5) {
      if (!mtpFormData.undertakingAccepted) {
        showToast("Please accept statutory undertaking and declaration terms", "error");
        return false;
      }
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast("Please complete required highlighted fields", "error");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSubmitted(true);
      showToast(`Application for ${currentLicMeta.code} filed successfully!`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onBackToDashboard();
    }
  };

  return (
    <div className="mtp-container">
      {/* Success Screen */}
      {isSubmitted ? (
        <div className="mtp-success-card">
          <div className="mtp-success-icon-wrap">
            <Check />
          </div>

          <div>
            <div className="mtp-success-badge">
              <ShieldCheck />
              <span>Application Logged with State Drug Controller</span>
            </div>
            <h2 className="mtp-success-title">
              {currentLicMeta.code} License Application Filed
            </h2>
            <p className="mtp-success-desc">
              Your statutory filing for <strong>{currentLicMeta.name}</strong> has been registered with the Department of Excise & Drugs Control, GNCTD. Joint technical scrutiny of the plant and secure storage vault has been scheduled.
            </p>
          </div>

          {/* Receipt Summary Card */}
          <div className="mtp-receipt-card">
            <div className="mtp-receipt-top">
              <span className="mtp-receipt-top-lbl">Official Filing Receipt</span>
              <span className="mtp-receipt-top-pill">
                FILED & ACKNOWLEDGED
              </span>
            </div>

            <div className="mtp-receipt-grid">
              <div className="mtp-spec-col">
                <span className="mtp-spec-lbl">Application Ref</span>
                <span className="mtp-review-val-bold mtp-review-val-mono">
                  MTP-DD-2026-8941
                </span>
              </div>
              <div className="mtp-spec-col">
                <span className="mtp-spec-lbl">License Category</span>
                <span className="mtp-review-val-primary mtp-review-val-mono">
                  {currentLicMeta.code}
                </span>
              </div>
              <div className="mtp-spec-col mtp-receipt-col-2">
                <span className="mtp-spec-lbl">Applicant Enterprise</span>
                <span className="mtp-review-val-bold">{mtpFormData.applicantName}</span>
              </div>
              <div className="mtp-spec-col mtp-receipt-col-2">
                <span className="mtp-spec-lbl">Plant / Premises Location</span>
                <span className="mtp-review-sub">{mtpFormData.plantAddress}</span>
              </div>
              <div className="mtp-spec-col">
                <span className="mtp-spec-lbl">Application Status</span>
                <span className="mtp-review-val-bold text-emerald-600">
                  Under Scrutiny
                </span>
              </div>
              <div className="mtp-spec-col">
                <span className="mtp-spec-lbl">Inspection Scheduled</span>
                <span className="mtp-review-val-bold">Within 7 Working Days</span>
              </div>
            </div>
          </div>

          <div className="mtp-success-actions">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                onBackToDashboard();
              }}
              className="mtp-btn mtp-btn-secondary"
            >
              Return to Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                window.print();
                showToast("Filing receipt dossier printed!");
              }}
              className="mtp-btn mtp-btn-primary"
            >
              <Printer />
              <span>Print Stamped Acknowledgement</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Step Progress Tracker (Permit-style stepper) */}
          <div className="mtp-stepper-card">
            <div className="mtp-stepper-inner">
              {wizardSteps.map((step, idx) => {
                const isActive = currentStep === step.num;
                const isDone = currentStep > step.num;

                return (
                  <React.Fragment key={step.num}>
                    <div
                      className={`mtp-step-item ${
                        isActive ? "mtp-step-active" : isDone ? "mtp-step-completed" : ""
                      }`}
                    >
                      <div className="mtp-step-bubble">
                        {isDone ? <Check /> : step.num}
                      </div>
                      <div className="mtp-step-texts">
                        <span className="mtp-step-lbl">
                          {step.label}
                        </span>
                        <span className="mtp-step-name">
                          {step.title}
                        </span>
                      </div>
                    </div>
                    {idx < wizardSteps.length - 1 && (
                      <div className="mtp-step-divider" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Select License Type Cards */}
          {currentStep === 1 && (
            <SelectMtpLicenseType
              selectedType={selectedLicenseCode}
              onSelectType={(code) => setSelectedLicenseCode(code)}
              onBack={onBackToDashboard}
              onContinue={(code) => {
                if (code) setSelectedLicenseCode(code);
                setCurrentStep(2);
              }}
            />
          )}

          {/* STEP 2: Applicant & Enterprise Profile */}
          {currentStep === 2 && (
            <div className="mtp-form-card">
              <div className="mtp-form-header">
                <div className="mtp-form-header-left">
                  <div className="mtp-form-icon-wrap">
                    <Building2 />
                  </div>
                  <div>
                    <h3 className="mtp-form-title">
                      Step 2: Applicant & Enterprise Profile
                    </h3>
                    <p className="mtp-form-subtitle">
                      Applying for <strong className="mtp-review-val-primary">{currentLicMeta.code}</strong> — {currentLicMeta.name}
                    </p>
                  </div>
                </div>
                <span className="mtp-form-badge">
                  {currentLicMeta.code}
                </span>
              </div>

              <div className="mtp-grid-2">
                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Applicant Enterprise / Factory Name <span className="mtp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.applicantName}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                    className={`mtp-input ${errors.applicantName ? "mtp-input-error" : ""}`}
                    placeholder="e.g. Delhi Bio-Formulations Ltd"
                  />
                  {errors.applicantName && <p className="mtp-error-text">{errors.applicantName}</p>}
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Constitution / Legal Ownership Type
                  </label>
                  <select
                    value={mtpFormData.entityType}
                    onChange={(e) => handleInputChange("entityType", e.target.value)}
                    className="mtp-select"
                  >
                    <option value="Private Limited Company">Private Limited Company</option>
                    <option value="Public Limited Company">Public Limited Company</option>
                    <option value="Partnership Enterprise">Partnership Enterprise</option>
                    <option value="Proprietorship Concern">Proprietorship Concern</option>
                    <option value="Government Autonomous Body">Government Autonomous Body</option>
                  </select>
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    State Drug Controller License Number <span className="mtp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.drugLicenseNumber}
                    onChange={(e) => handleInputChange("drugLicenseNumber", e.target.value)}
                    className={`mtp-input mtp-input-mono ${errors.drugLicenseNumber ? "mtp-input-error" : ""}`}
                    placeholder="Form 25/26 or Form 20B/21B Reference"
                  />
                  {errors.drugLicenseNumber && <p className="mtp-error-text">{errors.drugLicenseNumber}</p>}
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Drug License Validity Period
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.drugLicenseValidity}
                    onChange={(e) => handleInputChange("drugLicenseValidity", e.target.value)}
                    className="mtp-input mtp-input-mono"
                  />
                </div>

                <div className="mtp-field-group mtp-col-full">
                  <label className="mtp-label">
                    Manufacturing / Warehouse Physical Address <span className="mtp-required">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={mtpFormData.plantAddress}
                    onChange={(e) => handleInputChange("plantAddress", e.target.value)}
                    className={`mtp-textarea ${errors.plantAddress ? "mtp-input-error" : ""}`}
                    placeholder="Complete industrial plot, road, and pin code"
                  />
                  {errors.plantAddress && <p className="mtp-error-text">{errors.plantAddress}</p>}
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Authorized Signatory & Designation
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.authorizedSignatory}
                    onChange={(e) => handleInputChange("authorizedSignatory", e.target.value)}
                    className="mtp-input"
                  />
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Official Contact Mobile <span className="mtp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.contactMobile}
                    onChange={(e) => handleInputChange("contactMobile", e.target.value)}
                    className={`mtp-input mtp-input-mono ${errors.contactMobile ? "mtp-input-error" : ""}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.contactMobile && <p className="mtp-error-text">{errors.contactMobile}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Drug Formulations & Security Vault */}
          {currentStep === 3 && (
            <div className="mtp-form-card">
              <div className="mtp-form-header">
                <div className="mtp-form-header-left">
                  <div className="mtp-form-icon-wrap">
                    <FlaskConical />
                  </div>
                  <div>
                    <h3 className="mtp-form-title">
                      Step 3: Notified Drugs & Security Vault Particulars
                    </h3>
                    <p className="mtp-form-subtitle">
                      Specify active pharmaceutical ingredients, quota requests, and vault double-lock specifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mtp-grid-2">
                <div className="mtp-field-group mtp-col-full">
                  <label className="mtp-label">
                    Notified Manufactured Drug Names / Raw Active Ingredients (APIs) <span className="mtp-required">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={mtpFormData.notifiedDrugNames}
                    onChange={(e) => handleInputChange("notifiedDrugNames", e.target.value)}
                    className={`mtp-textarea ${errors.notifiedDrugNames ? "mtp-input-error" : ""}`}
                    placeholder="e.g. Morphine, Codeine, Rectified Spirit, Special Denatured Spirit"
                  />
                  {errors.notifiedDrugNames && <p className="mtp-error-text">{errors.notifiedDrugNames}</p>}
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Annual Spirit / Drug Consumption Quota Requested <span className="mtp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.annualQuotaRequested}
                    onChange={(e) => handleInputChange("annualQuotaRequested", e.target.value)}
                    className={`mtp-input ${errors.annualQuotaRequested ? "mtp-input-error" : ""}`}
                    placeholder="e.g. 15,000 Litres / 200 Kg"
                  />
                  {errors.annualQuotaRequested && <p className="mtp-error-text">{errors.annualQuotaRequested}</p>}
                </div>

                <div className="mtp-field-group">
                  <label className="mtp-label">
                    Approved Chief Pharmacist / Technical Director <span className="mtp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={mtpFormData.chiefPharmacistName}
                    onChange={(e) => handleInputChange("chiefPharmacistName", e.target.value)}
                    className={`mtp-input ${errors.chiefPharmacistName ? "mtp-input-error" : ""}`}
                    placeholder="Pharmacist Full Name & Pharmacy Council Regn No"
                  />
                  {errors.chiefPharmacistName && <p className="mtp-error-text">{errors.chiefPharmacistName}</p>}
                </div>

                <div className="mtp-field-group mtp-col-full">
                  <label className="mtp-label">
                    Secure Storage Vault / Strong Room Specifications
                  </label>
                  <textarea
                    rows={2}
                    value={mtpFormData.storageVaultSpecs}
                    onChange={(e) => handleInputChange("storageVaultSpecs", e.target.value)}
                    className="mtp-textarea"
                  />
                </div>

                <div className="mtp-callout mtp-col-full">
                  <Lock className="mtp-callout-icon" />
                  <div className="mtp-callout-text">
                    <strong>Mandatory Statutory Vault Mandate</strong>
                    Under the Delhi Dangerous Drugs & M&TP Rules, all raw materials, stock bottles, and formulation ledgers must be safeguarded inside an approved double-locked vault inspected prior to grant of license.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Statutory Document Uploads */}
          {currentStep === 4 && (
            <div className="mtp-form-card">
              <div className="mtp-form-header">
                <div className="mtp-form-header-left">
                  <div className="mtp-form-icon-wrap">
                    <FileText />
                  </div>
                  <div>
                    <h3 className="mtp-form-title">
                      Step 4: Statutory Document Dossier
                    </h3>
                    <p className="mtp-form-subtitle">
                      Upload digitally verified licenses, premise blueprints, and NOC certifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mtp-field-group">
                {[
                  {
                    key: "drugControllerLicUploaded",
                    label: "Drug Controller Manufacturing/Wholesale License (Form 25/26/20B)",
                    mand: true
                  },
                  {
                    key: "plantLayoutPlanUploaded",
                    label: "Plant / Storage Vault Blueprint Layout Plan",
                    mand: true
                  },
                  {
                    key: "fireSafetyNocUploaded",
                    label: "Delhi Fire Service NOC & Flameproof Certificate",
                    mand: true
                  },
                  {
                    key: "pollutionControlUploaded",
                    label: "Delhi Pollution Control Committee (DPCC) Clearance",
                    mand: false
                  },
                  {
                    key: "pharmacistAffidavitUploaded",
                    label: "Registered Pharmacist Appointment Affidavit & Degree",
                    mand: true
                  }
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="mtp-doc-item"
                  >
                    <div className="mtp-doc-left">
                      <div className="mtp-doc-icon">
                        <FileText />
                      </div>
                      <div>
                        <span className="mtp-doc-title">
                          {doc.label} {doc.mand && <span className="mtp-required">*</span>}
                        </span>
                        <span className="mtp-doc-status-text">
                          PDF Attached (Digitally Verified)
                        </span>
                      </div>
                    </div>

                    <div className="mtp-doc-actions">
                      <span className="mtp-doc-ready-pill">
                        <CheckCircle2 /> Ready
                      </span>
                      <label className="mtp-upload-btn-label">
                        Re-upload
                        <input type="file" className="mtp-file-hidden" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Review & Digital Submission */}
          {currentStep === 5 && (
            <div className="mtp-form-card">
              <div className="mtp-form-header">
                <div className="mtp-form-header-left">
                  <div className="mtp-form-icon-wrap">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h3 className="mtp-form-title">
                      Step 5: Review Application Dossier & Statutory Declaration
                    </h3>
                    <p className="mtp-form-subtitle">
                      Review application particulars for <strong className="mtp-review-val-primary">{currentLicMeta.code}</strong> before digital token signing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mtp-review-summary-box">
                <div className="mtp-review-grid">
                  <div className="mtp-spec-col">
                    <span className="mtp-review-lbl">Selected License</span>
                    <span className="mtp-review-val-primary">{currentLicMeta.code}</span>
                    <span className="mtp-review-sub">{currentLicMeta.name}</span>
                  </div>

                  <div className="mtp-spec-col">
                    <span className="mtp-review-lbl">Applicant Enterprise</span>
                    <span className="mtp-review-val-bold">{mtpFormData.applicantName}</span>
                    <span className="mtp-review-sub mtp-review-val-mono">PAN: {mtpFormData.panNumber}</span>
                  </div>

                  <div className="mtp-spec-col">
                    <span className="mtp-review-lbl">Application Status</span>
                    <span className="mtp-review-fee-highlight text-blue-700">
                      Under Scrutiny
                    </span>
                    <span className="mtp-review-sub">Validity: 1 Year (Renewable)</span>
                  </div>

                  <div className="mtp-spec-col mtp-review-col-2">
                    <span className="mtp-review-lbl">Plant / Warehouse Location</span>
                    <span className="mtp-review-sub">{mtpFormData.plantAddress}</span>
                  </div>

                  <div className="mtp-spec-col">
                    <span className="mtp-review-lbl">Drug Controller License</span>
                    <span className="mtp-review-val-bold mtp-review-val-mono">{mtpFormData.drugLicenseNumber}</span>
                  </div>
                </div>
              </div>

              {/* Undertaking Checkbox */}
              <label className="mtp-undertaking-box">
                <input
                  type="checkbox"
                  checked={mtpFormData.undertakingAccepted}
                  onChange={(e) => handleInputChange("undertakingAccepted", e.target.checked)}
                  className="mtp-checkbox"
                />
                <span className="mtp-undertaking-text">
                  I hereby solemnly declare that all particulars regarding drug formulations, batch testing records, storage vault security, and statutory licenses are accurate and comply with the <strong>Delhi Dangerous Drugs Rules</strong> and <strong>M&TP Act</strong>.
                </span>
              </label>
            </div>
          )}

          {/* Bottom Navigation Actions */}
          {currentStep > 1 && (
            <div className="mtp-actions-bar">
              <button
                type="button"
                onClick={handleBack}
                className="mtp-btn mtp-btn-secondary"
              >
                <ArrowLeft />
                <span>Previous Step</span>
              </button>

              <div className="mtp-actions-right">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Draft saved successfully for 30 days!");
                  }}
                  className="mtp-btn mtp-btn-outline"
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="mtp-btn mtp-btn-primary"
                >
                  <span>{currentStep === 5 ? `Submit ${currentLicMeta.code} Application` : "Continue Next"}</span>
                  <ArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
