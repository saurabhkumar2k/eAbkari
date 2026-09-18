import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  ChevronDown,
  FileText,
  User,
  Award,
  Building,
  Briefcase,
  LayoutGrid,
  Hotel,
  Factory,
  ShoppingCart,
  Package,
  Compass,
  Upload,
  CheckCircle2,
  Coins,
  Info,
  ArrowRight,
  FileCheck
} from "lucide-react";
import LicenseCategory from "./LicenseCategory";
import HcrLicenseWizard from "./HCR/HcrLicense";
import HcrLicenseWizard_M from "./HCR/HcrLicenseWizard_M";
import L30SelectLicense from "./L30/L30SelectLicense";
import WholesaleLicenseWizard from "./Wholesale/WholesaleLicense";
import MtpLicenseWizard from "./MNTP/MtpLicenseWizard";

export default function NewLicense({ setActiveTab, showToast }) {
  // Wizard States
  const [newLicStep, setNewLicStep] = useState(2);
  const [newLicData, setNewLicData] = useState({
    entityType: "Private Limited",
    licenseType: "L-1 Wholesale Vend of Indian Liquor",
    selectedSubLicense: "L-1 (A) Domestic Registered Indian Spirits Wholesale",
    applicantName: "Delhi Retail & Distribution Corp",
    tradeName: "Okhla Spirits & Beverages",
    pincode: "110020",
    premiseAddress: "Plot 104, Okhla Industrial Area Phase-III, New Delhi",
    hasFireNoc: false,
    hasTaxCompliance: false,
    declarationsChecked: false,
    mcdTradeLicenseNum: "MCD-99120-DEL"
  });

  const [appSubmissionCompleted, setAppSubmissionCompleted] = useState(false);
  const [isHCRFlowActive, setIsHCRFlowActive] = useState(false);
  const [isWholesaleFlowActive, setIsWholesaleFlowActive] = useState(false);
  const [isL30FlowActive, setIsL30FlowActive] = useState(false);
  const [isMtpFlowActive, setIsMtpFlowActive] = useState(false);


  const calculateTotalFeeObj = () => {
    let base = 200000;
    if (newLicData.licenseType && (newLicData.licenseType.includes("L-1 ") || newLicData.licenseType.includes("L-1 ("))) base = 250000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("L-10")) base = 150000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("L-15")) base = 300000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("M&TP")) base = 200000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("L-30")) base = 100000;
    
    let offset = 0;
    const sub = newLicData.selectedSubLicense || "";
    if (sub.includes("L-1F") || sub.includes("Imported")) offset = 50000;
    else if (sub.includes("L-1B") || sub.includes("Bulk") || sub.includes("Country Liquor")) offset = -50000;
    else if (sub.includes("Premium") || sub.includes("L-10 (B)") || sub.includes("Boutique")) offset = 30000;
    else if (sub.includes("Transit") || sub.includes("L-10F") || sub.includes("Duty-Free")) offset = 100000;
    else if (sub.includes("Resort") || sub.includes("L-15 (B)")) offset = 20005;
    else if (sub.includes("Microbrewery") || sub.includes("L-15 (C)")) offset = 150000;
    else if (sub.includes("Gymkhana") || sub.includes("L-22 (B)")) offset = 40000;
    else if (sub.includes("Cabana") || sub.includes("L-22 (C)")) offset = 80000;
    else if (sub.includes("Transport")) offset = 150050;
    else if (sub.includes("Scent")) offset = 30000;

    return base + offset;
  };

  const getActiveCategory = () => {
    const t = newLicData.licenseType || "";
    if (t.includes("L-15") || t.includes("L-22")) return "HCR";
    if (t.includes("M&TP")) return "M&TP";
    if (t.includes("L-10")) return "Retail";
    if (t.includes("L-1 ") || t.includes("L-1 (") || t.includes("L-1 Wholesale")) return "Wholesale";
    if (t.includes("L-30")) return "L-30";
    return "HCR"; // default fallback
  };

  const getPriceFormatted = () => {
    const total = calculateTotalFeeObj();
    return "₹ " + total.toLocaleString("en-IN");
  };

  const getSubLicenseOptions = () => {
    const mainType = newLicData.licenseType || "";
    if (mainType.includes("L-1 (") || mainType.includes("L-1 ")) {
      return [
        {
          id: "L-1 (A) Domestic Registered Indian Spirits Wholesale",
          code: "L-1A",
          title: "Domestic IMFL Wholesale",
          desc: "General wholesale distribution privilege of registered Indian Made Foreign Liquor across all NCT of Delhi zone warehouses.",
          feeText: "₹ 2,50,000 (Base Filing Fee)",
          badge: "Most Common"
        },
        {
          id: "L-1F Bonded Warehouse (Imported Foreign Liquor)",
          code: "L-1F",
          title: "Imported Foreign Liquor Bonded Hub",
          desc: "Customs-bonded warehouse franchise license for premium bottled-in-origin (BIO) spirits, wines, and craft beers.",
          feeText: "₹ 3,00,000 (+ ₹ 50,000 Bond Premium)",
          badge: "Premium Vault"
        },
        {
          id: "L-1B Country Liquor & Bulk Beer Supply",
          code: "L-1B",
          title: "Country Spirits & Bulk Draft Beer",
          desc: "Excise privilege bond for general distribution of country liquors and raw bulk drafts in approved storage vats.",
          feeText: "₹ 2,00,000 (- ₹ 50,000 Mass Exemption)",
          badge: "Industrial"
        }
      ];
    } else if (mainType.includes("L-10")) {
      return [
        {
          id: "L-10 (A) General Departmental Retail Vend",
          code: "L-10A",
          title: "Standard Departmental Liquor Vend",
          desc: "Retail distribution of beer, wine, and general standard liquors within departmental formats under government guidelines.",
          feeText: "₹ 1,50,000 (Base Filing Fee)",
          badge: "Standard"
        },
        {
          id: "L-10 (B) Premium Boutique Retail Vend",
          code: "L-10B",
          title: "Premium Mall Boutique Spirits Vend",
          desc: "Exclusive temperature-controlled boutique-style walk-in retail gallery for high-end single malts, craft liquors, and wines.",
          feeText: "₹ 1,80,000 (+ ₹ 30,000 Boutique Levy)",
          badge: "Selected Formats"
        },
        {
          id: "L-10F Transit Hub Premium Terminal Vend",
          code: "L-10F",
          title: "Transit Hub & Airport Duty-Free",
          desc: "Ferry luxury retail permit inside international departure docks, rapid transit boarding lounges, or duty-bonded segments.",
          feeText: "₹ 2,50,000 (+ ₹ 1,00,000 Transit Premium)",
          badge: "Transit Zone Only"
        }
      ];
    } else if (mainType.includes("L-15")) {
      return [
        {
          id: "L-15 (A) Star Classified Hotel Bar Service",
          code: "L-15A",
          title: "Star Classified Hotel Main Bar",
          desc: "General service of foreign and domestic high spirits inside classified hotels, including integrated guest room service vends.",
          feeText: "₹ 3,00,000 (Base Filing Fee)",
          badge: "All-Inclusive"
        },
        {
          id: "L-15 (B) Heritage Resort & Outdoor Deck Lounge",
          code: "L-15B",
          title: "Heritage Resort / Open Cabana Bar",
          desc: "Scenic open-air resort bar, pool deck counters, aesthetic garden lounges, and designated banquet hospitality pavilions.",
          feeText: "₹ 3,20,015 (+ ₹ 20,015 Scenic Svg)",
          badge: "Boutique Resort"
        },
        {
          id: "L-15 (C) Restro-Bar with On-Site Microbrewery",
          code: "L-15C",
          title: "Artisanal Restro-Bar & Microbrewery",
          desc: "Dedicated in-site micro-brewing equipment installation setup for fresh draught craft beers, alongside star bar service.",
          feeText: "₹ 4,50,000 (+ ₹ 1,50,000 Brewer Endorsement)",
          badge: "On-Site Brew"
        }
      ];
    } else {
      return [
        {
          id: "L-22 (A) Resident Club & Association Bar Unit",
          code: "L-22A",
          title: "Resident Club & Association Bar",
          desc: "Exclusive members-only non-commercial liquor service permit within registered co-operative societies or apartment associations.",
          feeText: "₹ 2,00,000 (Base Filing Fee)",
          badge: "Private Board"
        },
        {
          id: "L-22 (B) Gymkhana & Sports Club Lounge",
          code: "L-22B",
          title: "Gymkhana or Sports Club Bar Pavilion",
          desc: "High-scale privilege club bar, executive sports lounges, golf club pavilions, and recreational board salons.",
          feeText: "₹ 2,40,000 (+ ₹ 40,000 Sports Premium)",
          badge: "Premium Club"
        },
        {
          id: "L-22 (C) Private Club Event Multi-Cabana",
          code: "L-22C",
          title: "Private Club Cabana Garden Bar",
          desc: "Permit for multiple scattered drink stations, pool-side gazebos, and affiliated premium lawns within a single club boundary.",
          feeText: "₹ 2,80,000 (+ ₹ 80,000 Cabana Add-On)",
          badge: "Multi-Catering"
        }
      ];
    }
  };

 return (
    <div className="new-license-root">
      <div className="new-license-container">
        {isMtpFlowActive ? (
          <MtpLicenseWizard
            onBackToDashboard={() => {
              setIsMtpFlowActive(false);
              setNewLicStep(2);
            }}
            showToast={showToast}
            rootData={newLicData}
          />
        ) : isL30FlowActive ? (
          <L30SelectLicense
            applicant={newLicData}
            onChange={(key, value) => setNewLicData(prev => ({ ...prev, [key]: value }))}
            selectedType={newLicData.selectedSubLicense || "L-30"}
            onSelectType={(code) => {
              setNewLicData(prev => ({ ...prev, selectedSubLicense: code }));
              showToast(`Selected L-30 License Type: ${code}`);
            }}
            onBack={() => {
              setIsL30FlowActive(false);
              setNewLicStep(2);
            }}
            onContinue={() => {
              setIsL30FlowActive(false);
              setAppSubmissionCompleted(true);
              showToast("L-30 License Application submitted successfully!");
            }}
          />
        ) : isHCRFlowActive ? (
          <HcrLicenseWizard 
            onBackToDashboard={() => {
              setIsHCRFlowActive(false);
              setNewLicStep(2);
            }} 
            showToast={showToast} 
            rootData={newLicData}
          />
        ) : isWholesaleFlowActive ? (
          <WholesaleLicenseWizard
            onBackToDashboard={() => {
              setIsWholesaleFlowActive(false);
              setNewLicStep(2);
            }}
            showToast={showToast}
            rootData={newLicData}
          />
        ) : appSubmissionCompleted ? (
          /* SUCCESS SCREEN - HIGH-END DESIGN */
          <div className="nl-success-card animate-fade">
            <div className="nl-success-icon-wrap animate-pulse-subtle">
              <Check className="nl-success-icon-svg" />
              <span className="nl-success-icon-ping"></span>
            </div>
            
            <div className="nl-success-header">
              <h2 className="nl-success-title">
                Application Submitted Successfully
              </h2>
              <p className="nl-success-desc">
                Your application for a new excise privilege license has been logged. The Department of Excise, Government of NCT of Delhi will process the physical inspection shortly.
              </p>
            </div>

            {/* Structured Receipts Badge */}
            <div className="nl-receipt-card">
              <div className="nl-receipt-header">
                <span className="nl-receipt-header-lbl">Transaction Receipt</span>
                <span className="nl-receipt-header-badge">PAID & FILED</span>
              </div>

              <div className="nl-receipt-grid">
                <div>
                  <span className="nl-receipt-field-lbl">Application Ref</span>
                  <span className="nl-receipt-mono-val">AP-2026-EX-88021</span>
                </div>
                <div>
                  <span className="nl-receipt-field-lbl">License Category</span>
                  <span className="nl-receipt-brand-val">
                    {newLicData.licenseType ? newLicData.licenseType.split(" ")[0] : "L-1"}
                  </span>
                </div>
                <div className="nl-receipt-full-col">
                  <span className="nl-receipt-field-lbl">Applicant Entity</span>
                  <span className="nl-receipt-bold-val">{newLicData.applicantName || "Delhi Retail & Distribution Corp"}</span>
                </div>
                <div className="nl-receipt-full-col">
                  <span className="nl-receipt-field-lbl">Premises Address</span>
                  <span className="nl-receipt-addr-val">{newLicData.premiseAddress || "Plot 104, Okhla Industrial Area Phase-III, New Delhi"}</span>
                </div>
                <div>
                  <span className="nl-receipt-field-lbl">Fee Remitted</span>
                  <span className="nl-receipt-fee-val">
                    {getPriceFormatted()}
                  </span>
                </div>
                <div>
                  <span className="nl-receipt-field-lbl">Filing Date</span>
                  <span className="nl-receipt-date-val">01/06/2026</span>
                </div>
              </div>
            </div>

            <div className="nl-success-actions">
              <button
                onClick={() => {
                  setAppSubmissionCompleted(false);
                  setNewLicStep(2);
                  setActiveTab("Home");
                }}
                className="nl-btn-return"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => {
                  showToast("PDF license filing receipt generated and saved to device!");
                }}
                className="nl-btn-print"
              >
                Print Signed Copy
              </button>
            </div>
          </div>
        ) : (
          /* PROGRESSIVE 5-STEP LICENSE WIZARD */
          <div className="nl-wizard-wrap animate-fade">

            {/* 1. HERO BANNER WITH DELHI SKYLINE ILLUSTRATION AND BREADCRUMB */}
            <div className="nl-hero-banner">
              {/* Left part */}
              <div className="nl-hero-left">
                <div className="nl-hero-icon-box">
                  <FileText className="nl-hero-icon-svg" />
                </div>
                <div className="nl-hero-text-wrap">
                  {/* Breadcrumbs */}
                  <nav className="nl-breadcrumbs">
                    <span className="nl-bread-link" onClick={() => setActiveTab("Home")}>Home</span>
                    <ChevronRight className="nl-bread-chevron" />
                    <span className="nl-bread-mid">License</span>
                    <ChevronRight className="nl-bread-chevron" />
                    <span className="nl-bread-current">New License Application</span>
                  </nav>
                  
                  <h2 className="nl-hero-title science-heading">
                    New License Application
                  </h2>
                  <p className="nl-hero-subtitle">
                    {newLicStep === 2 
                      ? "Select the license category that best fits your requirement, review details, and submit."
                      : "Let's get started! Fill in the basic details to begin your new license application."
                    }
                  </p>
                </div>
              </div>

              {/* Right part: Stylized SVG Delhi Skyline monument illustration */}
              <div className="nl-skyline-wrap">
                <svg viewBox="0 0 320 100" className="nl-skyline-svg">
                  {/* Qutub Minar */}
                  <g>
                    <path d="M 40,100 L 48,15 L 52,15 L 60,100 Z" />
                    <rect x="46" y="35" width="8" height="4" rx="1" />
                    <rect x="44" y="60" width="12" height="4" rx="1" />
                    <rect x="42" y="80" width="16" height="4" rx="1" />
                    <line x1="50" y1="15" x2="50" y2="5" stroke="currentColor" strokeWidth="2" />
                  </g>
                  
                  {/* India Gate */}
                  <g>
                    <rect x="100" y="45" width="12" height="55" />
                    <rect x="138" y="45" width="12" height="55" />
                    <rect x="94" y="32" width="62" height="13" />
                    <rect x="90" y="25" width="70" height="7" rx="1" />
                    <path d="M 104,25 C 104,12 146,12 146,25 Z" />
                    <path d="M 112,100 L 112,65 C 112,53 138,53 138,65 L 138,100 Z" />
                  </g>

                  {/* Lotus Temple */}
                  <g>
                    <path d="M 220,100 C 210,60 230,50 230,50 C 230,50 250,60 240,100 Z" />
                    <path d="M 200,100 C 200,70 215,70 220,100 Z" />
                    <path d="M 240,100 C 245,70 260,70 260,100 Z" />
                    <path d="M 185,100 C 195,80 212,85 212,100 Z" />
                    <path d="M 248,100 C 248,85 265,80 275,100 Z" />
                  </g>
                  
                  {/* Baseline ground */}
                  <line x1="10" y1="100" x2="310" y2="100" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>

            {/* 3. ACTIVE STEP DETAIL CONTENT (24px padding / equal heights / custom cards) */}
            <div className="nl-step-content-area">
              
              {newLicStep === 1 && (
                /* STEP 1: BASIC DETAILS CARD */
                <div className="nl-basic-card animate-fade">
                  <div className="nl-basic-header">
                    <div className="nl-basic-icon-wrap">
                      <User className="nl-basic-icon-svg" />
                    </div>

                    <div className="basic-details-content">
                      <h2 className="nl-basic-title">
                        Basic Details
                      </h2>
                    </div>
                  </div>

                  {/* Field Forms Grid (Two Column Layout) */}
                  <div className="nl-form-grid">
                    
                    {/* Owner Type field with field icons and custom arrow inside layout */}
                    <div className="nl-form-field">
                      <label className="nl-form-label">
                        Owner Type <span className="nl-req-star">*</span>
                      </label>
                      <div className="nl-field-input-box">
                        <User className="nl-field-icon-left" />
                        <select
                          value={newLicData.entityType}
                          onChange={(e) => setNewLicData({ ...newLicData, entityType: e.target.value })}
                          className="nl-select-input"
                        >
                          <option value="Individual Proprietorship">Individual Proprietorship</option>
                          <option value="Partnership Firm">Partnership Firm</option>
                          <option value="Private Limited Company">Private Limited Company</option>
                          <option value="Public Limited Company">Public Limited Company</option>
                          <option value="Society / Trust">Society / Trust</option>
                        </select>
                        <ChevronDown className="nl-select-arrow" />
                      </div>
                      <p className="nl-field-hint">Specify the legally incorporated category of applicant business enterprise.</p>
                    </div>

                    {/* Category of License Applied for */}
                    <div className="nl-form-field">
                      <label className="nl-form-label">
                        Category of License Applied For <span className="nl-req-star">*</span>
                      </label>
                      <div className="nl-field-input-box">
                        <Award className="nl-field-icon-left" />
                        <select
                          value={newLicData.licenseType}
                          onChange={(e) => {
                            const val = e.target.value;
                            let defaultSub = "L-1 (A) Domestic Registered Indian Spirits Wholesale";
                            if (val.includes("L-10")) {
                              defaultSub = "L-10 (A) General Departmental Retail Vend";
                            } else if (val.includes("L-15")) {
                              defaultSub = "L-15 (A) Star Classified Hotel Bar Service";
                            } else if (val.includes("L-22")) {
                              defaultSub = "L-22 (A) Resident Club & Association Bar Unit";
                            }
                            setNewLicData({ ...newLicData, licenseType: val, selectedSubLicense: defaultSub });
                          }}
                          className="nl-select-input"
                        >
                          <option value="L-1 (Wholesale Vend of Indian Liquor)">L-1 (Wholesale Vend of Indian Liquor)</option>
                          <option value="L-10 (Retail Departmental Store)">L-10 (Retail Departmental Store)</option>
                          <option value="L-15 (Hotel Bar - Star Classified)">L-15 (Hotel Bar - Star Classified)</option>
                          <option value="L-22 (Club Bar)">L-22 (Club Bar)</option>
                        </select>
                        <ChevronDown className="nl-select-arrow" />
                      </div>
                      <p className="nl-field-hint">These categories represent excise divisions governed under GNCTD Act.</p>
                    </div>

                  </div>
                </div>
              )}

              {newLicStep === 2 && (
                <LicenseCategory
                  newLicData={newLicData}
                  setNewLicData={setNewLicData}
                  showToast={showToast}
                  getActiveCategory={getActiveCategory}
                  onSelectCategory={(catId) => {
                    if (catId === "MTP" || catId === "M&TP") {
                      setIsMtpFlowActive(true);
                    } else if (catId === "HCR") {
                      setIsHCRFlowActive(true);
                    } else if (catId === "Wholesale") {
                      setIsWholesaleFlowActive(true);
                    } else if (catId === "L-30") {
                      setIsL30FlowActive(true);
                    }
                  }}
                />
              )}
            </div>

            {/* 4. BLUE INFORMATION ALERT */}
            <div className="nl-info-alert animate-fade">
              <Info className="nl-info-icon" />
              <div className="nl-info-text-col">
                <p className="nl-info-headline">Filing Instructions Warning</p>
                <p className="nl-info-body">
                  Please ensure all the details provided are correct. You can save as draft and continue later. Draft credentials are saved locally for 30 calendar days.
                </p>
              </div>
            </div>

            {/* 5. ACTION CONTROLS / FOOTER BUTTONS (Bottom Right Aligned) */}
            <div className="nl-actions-bar">
              <button
                type="button"
                onClick={() => {
                  if (newLicStep > 2) {
                    setNewLicStep(newLicStep - 1);
                  } else {
                    setActiveTab("Home");
                  }
                }}
                className="nl-btn-cancel"
              >
                <span>{newLicStep === 2 ? "Cancel Application" : "Go Back"}</span>
              </button>

              <div className="nl-actions-group">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Filing details successfully saved as draft! You can access it anytime from Applied tab.");
                  }}
                  className="nl-btn-draft"
                >
                  <span>Save as Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // VALIDATIONS & ROUTING FOR NEXT
                    if (newLicStep === 2) {
                      const activeCat = getActiveCategory();
                      if (activeCat === "MTP" || activeCat === "M&TP") {
                        setIsMtpFlowActive(true);
                        return;
                      }
                      if (activeCat === "L-30") {
                        setIsL30FlowActive(true);
                        return;
                      }
                      if (activeCat === "HCR") {
                        setIsHCRFlowActive(true);
                        return;
                      }
                      if (activeCat === "Wholesale") {
                        setIsWholesaleFlowActive(true);
                        return;
                      }
                      // Fire submit Success
                      setAppSubmissionCompleted(true);
                      showToast("Privilege Excise License Application filed successfully!");
                      return;
                    }

                    // Advance step
                    setNewLicStep(newLicStep + 1);
                  }}
                  className="nl-btn-next"
                >
                  <span>
                    {newLicStep === 2 
                      ? (["HCR", "Wholesale", "L-30", "MTP", "M&TP"].includes(getActiveCategory()) ? "Proceed to Select License" : "Submit & Pay")
                      : "Next Step"}
                  </span>
                  <ArrowRight className="nl-btn-arrow-icon" />
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
