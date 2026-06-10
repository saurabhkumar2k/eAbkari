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
import HcrLicenseWizard from "./HCR/HcrLicense" // Import the HCR license wizard components
import WholesaleLicenseWizard from "./Wholesale/WholesaleLicense";

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

  const calculateTotalFeeObj = () => {
    let base = 200000;
    if (newLicData.licenseType && (newLicData.licenseType.includes("L-1 ") || newLicData.licenseType.includes("L-1 ("))) base = 250000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("L-10")) base = 150000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("L-15")) base = 300000;
    else if (newLicData.licenseType && newLicData.licenseType.includes("M&TP")) base = 200000;
    
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
    else if (sub.includes("Transport") || sub.includes("M&TP-3")) offset = 150050;
    else if (sub.includes("Scent") || sub.includes("M&TP-2")) offset = 30000;

    return base + offset;
  };

  const getActiveCategory = () => {
    const t = newLicData.licenseType || "";
    if (t.includes("L-15") || t.includes("L-22")) return "HCR";
    if (t.includes("M&TP")) return "M&TP";
    if (t.includes("L-10")) return "Retail";
    if (t.includes("L-1 ") || t.includes("L-1 (") || t.includes("L-1 Wholesale")) return "Wholesale";
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
    } else if (mainType.includes("M&TP")) {
      return [
        {
          id: "M&TP-1 Bulk Formulation Industrial License",
          code: "M&TP-1",
          title: "Bulk Medicine & Toilet Formulations",
          desc: "Industrial excise franchise permit for distilling, bulk blending, and formulating commercial medicinal spirits and toiletries.",
          feeText: "₹ 2,00,000 (Base Filing Fee)",
          badge: "Industrial"
        },
        {
          id: "M&TP-2 Medical Spirit Fine-Scent Lab Retailer",
          code: "M&TP-2",
          title: "Scientific Lab & Scent Bonded Retailer",
          desc: "Special excise custody clearance for clinical laboratories, research institutes, or high-purity perfume manufacturing units.",
          feeText: "₹ 2,30,000 (+ ₹ 30,000 Safety Levy)",
          badge: "Clinical Standard"
        },
        {
          id: "M&TP-3 Fast-Transit Bulk Carrier Permit",
          code: "M&TP-3",
          title: "Inter-State Transport & Bulk Warehousing",
          desc: "Dedicated logistics privilege license for fleet transport tankers, inter-state spirit delivery lines, and secure depot depots.",
          feeText: "₹ 3,50,050 (+ ₹ 1,50,050 Transport Premium)",
          badge: "Logistics Hub"
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
    <div className="flex-grow w-full py-8 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {isHCRFlowActive ? (
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-8 animate-fade select-none">
            <div className="relative w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse-subtle">
              <Check className="w-10 h-10 stroke-[3]" />
              <span className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-25"></span>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Application Submitted Successfully
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Your application for a new excise privilege license has been logged. The Department of Excise, Government of NCT of Delhi will process the physical inspection shortly.
              </p>
            </div>

            {/* Structured Receipts Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-sm max-w-lg mx-auto">
              <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                <span className="font-bold text-slate-400 uppercase tracking-widest">Transaction Receipt</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide uppercase">PAID & FILED</span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs">
                <div>
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Application Ref</span>
                  <span className="font-mono font-black text-slate-800 text-sm">AP-2026-EX-88021</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">License Category</span>
                  <span className="font-bold text-blue-700 text-sm">
                    {newLicData.licenseType ? newLicData.licenseType.split(" ")[0] : "L-1"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Applicant Entity</span>
                  <span className="font-bold text-slate-800 text-sm">{newLicData.applicantName || "Delhi Retail & Distribution Corp"}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Premises Address</span>
                  <span className="font-semibold text-slate-600 block leading-relaxed">{newLicData.premiseAddress || "Plot 104, Okhla Industrial Area Phase-III, New Delhi"}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Fee Remitted</span>
                  <span className="font-extrabold text-blue-600 text-base">
                    {getPriceFormatted()}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">Filing Date</span>
                  <span className="font-bold text-slate-700 text-sm">01/06/2026</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setAppSubmissionCompleted(false);
                  setNewLicStep(2);
                  setActiveTab("Home");
                }}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer border-none"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => {
                  showToast("PDF license filing receipt generated and saved to device!");
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition cursor-pointer border-none shadow-md"
              >
                Print Signed Copy
              </button>
            </div>
          </div>
        ) : (
          /* PROGRESSIVE 5-STEP LICENSE WIZARD */
          <div className="space-y-8 animate-fade">

            {/* 1. HERO BANNER WITH DELHI SKYLINE ILLUSTRATION AND BREADCRUMB */}
            <div className="new-license-banner p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left part */}
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-white/90 border border-blue-200 text-blue-600 rounded-2xl shadow-sm flex-shrink-0">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 text-left">
                  {/* Breadcrumbs */}
                  <nav className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                    <span className="cursor-pointer hover:underline" onClick={() => setActiveTab("Home")}>Home</span>
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-500">License</span>
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-900">New License Application</span>
                  </nav>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none science-heading">
                    New License Application
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-semibold">
                    {newLicStep === 2 
                      ? "Select the license category that best fits your requirement, review details, and submit."
                      : "Let's get started! Fill in the basic details to begin your new license application."
                    }
                  </p>
                </div>
              </div>

              {/* Right part: Stylized SVG Delhi Skyline monument illustration */}
              <div className="w-full md:w-64 lg:w-80 flex-shrink-0 opacity-90 block">
                <svg viewBox="0 0 320 100" className="w-full h-auto text-blue-800/20 fill-current">
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
            <div className="min-h-[340px]">
              
              {newLicStep === 1 && (
                /* STEP 1: BASIC DETAILS CARD */
                <div className="basic-details-card p-6 sm:p-8 space-y-6 text-left animate-fade">
                  <div className="basic-details-header">
                    <div className="basic-details-icon">
                      <User className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="basic-details-content">
                      <h2 className="basic-details-title">
                        Basic Details
                      </h2>
                    </div>
                  </div>

                  {/* Field Forms Grid (Two Column Layout) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Owner Type field with field icons and custom arrow inside layout */}
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                        Owner Type <span className="text-red-500">*</span>
                      </label>
                      <div className="field-icon-container">
                        <User className="field-icon-left" />
                        <select
                          value={newLicData.entityType}
                          onChange={(e) => setNewLicData({ ...newLicData, entityType: e.target.value })}
                          className="rounded-custom-field focus:ring-4 focus:ring-blue-100 cursor-pointer"
                        >
                          <option value="Individual Proprietorship">Individual Proprietorship</option>
                          <option value="Partnership Firm">Partnership Firm</option>
                          <option value="Private Limited Company">Private Limited Company</option>
                          <option value="Public Limited Company">Public Limited Company</option>
                          <option value="Society / Trust">Society / Trust</option>
                        </select>
                        <ChevronDown className="custom-select-arrow" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold">Specify the legally incorporated category of applicant business enterprise.</p>
                    </div>

                    {/* Category of License Applied for */}
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                        Category of License Applied For <span className="text-red-500">*</span>
                      </label>
                      <div className="field-icon-container">
                        <Award className="field-icon-left" />
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
                          className="rounded-custom-field focus:ring-4 focus:ring-blue-100 cursor-pointer"
                        >
                          <option value="L-1 (Wholesale Vend of Indian Liquor)">L-1 (Wholesale Vend of Indian Liquor)</option>
                          <option value="L-10 (Retail Departmental Store)">L-10 (Retail Departmental Store)</option>
                          <option value="L-15 (Hotel Bar - Star Classified)">L-15 (Hotel Bar - Star Classified)</option>
                          <option value="L-22 (Club Bar)">L-22 (Club Bar)</option>
                        </select>
                        <ChevronDown className="custom-select-arrow" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold">These categories represent excise divisions governed under GNCTD Act.</p>
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
                />
              )}

            </div>

            {/* 4. BLUE INFORMATION ALERT */}
            <div className="blue-info-alert animate-fade select-none text-left">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-black text-blue-950">Filing Instructions Warning</p>
                <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                  Please ensure all the details provided are correct. You can save as draft and continue later. Draft credentials are saved locally for 30 calendar days.
                </p>
              </div>
            </div>

            {/* 5. ACTION CONTROLS / FOOTER BUTTONS (Bottom Right Aligned) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 flex-wrap gap-4 select-none">
              <button
                type="button"
                onClick={() => {
                  if (newLicStep > 2) {
                    setNewLicStep(newLicStep - 1);
                  } else {
                    setActiveTab("Home");
                  }
                }}
                className="outline-draft-btn"
              >
                <span>{newLicStep === 2 ? "Cancel Application" : "Go Back"}</span>
              </button>

              <div className="flex items-center gap-3 text-right">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Filing details successfully saved as draft! You can access it anytime from Applied tab.");
                  }}
                  className="outline-draft-btn border-blue-200 hover:border-blue-400 text-blue-700"
                >
                  <span>Save as Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // VALIDATIONS & ROUTING FOR NEXT
                    if (newLicStep === 2) {
                      if (getActiveCategory() === "HCR") {
                        setIsHCRFlowActive(true);
                        return;
                      }
                      if (getActiveCategory() === "Wholesale") {
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
                  className="blue-gradient-next-btn"
                >
                  <span>
                    {newLicStep === 2 
                      ? (["HCR", "Wholesale"].includes(getActiveCategory()) ? "Proceed to Select License" : "Submit & Pay")
                      : "Next Step"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
