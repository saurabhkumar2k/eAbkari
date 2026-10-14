import React, { useState, useMemo, useEffect } from "react";
import P10Page from "./P10/P10Page";
import {
  Calendar,
  Building2,
  Check,
  Info,
  FileText,
  Upload,
  User,
  Sparkles,
  ShieldAlert,
  Printer,
  QrCode,
  Building,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { getOwnerTypes } from "../../../api/permitApi";

// Helper to extract an array from various .NET API response structures
const extractList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["data", "Data", "result", "Result", "items", "Items", "list", "List", "ownerTypes", "types"]) {
      if (Array.isArray(payload[key])) return payload[key];
    }
    const firstArray = Object.values(payload).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
  }
  return [];
};

export default function NewPermitWizard({ onBackToDashboard, showToast, onSubmitPermit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPermitId, setSelectedPermitId] = useState("P-10");
  const [ownerType, setOwnerType] = useState("");
  const [ownerTypes, setOwnerTypes] = useState([]);
  const [isLoadingOwnerTypes, setIsLoadingOwnerTypes] = useState(false);

  // State for Step 3 details
  const [permitDetails, setPermitDetails] = useState({
    // Shared / Default
    email: "vishal@kristalspirits.com",
    mobile: "9266024141",
    signingPlace: "New Delhi",
    undertakingAccept: true,
    signatureName: "VISHAL DEVILAL JAISWAL",

    // P-10: Occasional details
    occasionName: "Silver Jubilee Wedding Anniversary Gala",
    hostName: "VISHAL DEVILAL JAISWAL",
    eventDate: "2026-06-25",
    servingStartTime: "18:30",
    servingEndTime: "23:45",
    estimatedGuests: "180",
    venueAddress: "The Grand Ballroom, Hotel Imperial, Janpath, Connaught Place, New Delhi 110001",
    sourcingShed: "Vedic Retail Licensed Shop (L-2), Block-E Mayapuri",
    landlordNoc: "Yes",
    policeNotified: "Yes",

    // P-10A: Special Event details
    corporateTitle: "Global Tech Summit & Exhibition 2026",
    hostOrganization: "Kristal Spirits & Allied Ventures Pvt Ltd",
    eventStartDate: "2026-07-10",
    eventEndDate: "2026-07-12",
    boothCount: "5",
    expectedFootfall: "1200",
    exhibitionVenue: "Hall No. 12-A, Pragati Maidan Exhibition Complex, New Delhi 110001",
    securityAgencyName: "SafeForce Security Services Ltd",
    policeNocRef: "P-NOC-DL-990211",

    // P-11: Liquor Exhibitor details
    tradeshowTitle: "Delhi Craft Spirits Expo & Distillery Forum",
    boothCode: "STALL-E24",
    brandsShowcase: "Amrut Single Malt, Paul John Select Cask, GianChand Single Malt, Black Dog Extra Rare",
    sampleServingMl: "30",
    distributorLicenseNum: "WS-FL-DL-2026-1029",
    importLogRef: "IMP-ENTRY-2026-302"
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [permitReceipt, setPermitReceipt] = useState(null);

  // 5 Step Wizard Flow
  const steps = [
    { num: 1, label: "Basic Details" },
    { num: 2, label: "Permit Selection" },
    { num: 3, label: "Event Details" },
    { num: 4, label: "Documents" },
    { num: 5, label: "Review & Submit" }
  ];

  // Default fallback owner types
  const getDefaultOwnerTypes = () => [
    { id: "Proprietorship", name: "Proprietorship Firm" },
    { id: "Partnership", name: "Partnership / LLP" },
    { id: "Private Limited", name: "Private Limited Company" },
    { id: "Public Limited", name: "Public Limited Company" },
    { id: "Society/Trust", name: "Registered Society / Trust" },
    { id: "Club/Association", name: "Club / Cooperative Association" },
    { id: "Individual", name: "Individual Citizen" }
  ];

  // Fetch owner types from API
  const fetchOwnerTypes = async () => {
    setIsLoadingOwnerTypes(true);
    try {
      const response = await getOwnerTypes();
      console.log("Raw OwnerTypes API Response:", response.data);

      const rawList = extractList(response.data);

      if (rawList.length > 0) {
        const formattedTypes = rawList.map((type, index) => {
          if (typeof type !== "object" || type === null) {
            return { id: String(type), name: String(type) };
          }

          // Case-insensitive resolution for both ID and display name
          const id =
            type.ID ??
            type.OTID ??
            type.OwnerTypeId ??
            type.OwnerTypeCode ??
            type.Id ??
            type.Code ??
            type.Value ??
            type.id ??
            type.code ??
            type.value ??
            type.ownerTypeId ??
            type.ownerTypeCode ??
            String(index + 1);

          const name =
            type.OwnerTypeName ??
            type.OTName ??
            type.Name ??
            type.Label ??
            type.Description ??
            type.ownerTypeName ??
            type.name ??
            type.label ??
            type.text ??
            type.displayName ??
            String(id);

          return {
            id: String(id).trim(),
            name: String(name).trim()
          };
        });

        console.log("Formatted Owner Types:", formattedTypes);
        setOwnerTypes(formattedTypes);
      } else {
        console.warn("API returned no records, falling back to default list.");
        setOwnerTypes(getDefaultOwnerTypes());
      }
    } catch (error) {
      console.error("Error fetching owner types:", error);
      if (showToast) {
        showToast("Failed to load owner types from server. Using defaults.", "info");
      }
      setOwnerTypes(getDefaultOwnerTypes());
    } finally {
      setIsLoadingOwnerTypes(false);
    }
  };

  useEffect(() => {
    fetchOwnerTypes();
  }, []);

  const permits = [
    {
      id: "P-10",
      code: "61",
      title: "Occasional Service Permit",
      subbadge: "Temporary Event Permit",
      description: "Permit for serving Indian Liquor and/or Foreign Liquor at a place other than licensed premises for private functions, ceremonies, social gatherings and special events.",
      icon: Calendar,
      themeColor: "text-blue-600 bg-blue-100 border-blue-200"
    },
    {
      id: "P-10A",
      code: "51",
      title: "Special Event Service Permit",
      subbadge: "Special Event",
      description: "Permit for serving Indian Liquor and/or Foreign Liquor at a venue other than licensed premises for exhibitions, conferences, corporate functions and large public events.",
      icon: Sparkles,
      themeColor: "text-violet-600 bg-violet-100 border-violet-200"
    },
    {
      id: "P-11",
      code: "62",
      title: "Liquor Exhibitor Permit",
      subbadge: "Exhibition Permit",
      description: "Permit issued to liquor exhibitors for display, exhibition, promotion and showcasing of liquor products during approved exhibitions and trade events.",
      icon: Building2,
      themeColor: "text-emerald-600 bg-emerald-100 border-emerald-200"
    }
  ];

  const filteredPermits = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return permits.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleInputChange = (field, value) => {
    setPermitDetails((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateDetailsStep = () => {
    const errors = {};
    if (selectedPermitId === "61" || selectedPermitId === "P-10") {
      if (!permitDetails.occasionName.trim()) errors.occasionName = "Occasion details or title is required";
      if (!permitDetails.hostName.trim()) errors.hostName = "Host/Organiser name is required";
      if (!permitDetails.eventDate) errors.eventDate = "Permit execution date is required";
      if (!permitDetails.venueAddress.trim()) errors.venueAddress = "Complete event venue address is required";
      if (Number(permitDetails.estimatedGuests) <= 0) errors.estimatedGuests = "Guest density counter must be a valid number";
    } else if (selectedPermitId === "51" || selectedPermitId === "P-10A") {
      if (!permitDetails.corporateTitle.trim()) errors.corporateTitle = "Corporate event or exhibition title is required";
      if (!permitDetails.eventStartDate) errors.eventStartDate = "Event starting date is required";
      if (!permitDetails.exhibitionVenue.trim()) errors.exhibitionVenue = "Physical exhibition hall coordinates required";
    } else if (selectedPermitId === "62" || selectedPermitId === "P-11") {
      if (!permitDetails.tradeshowTitle.trim()) errors.tradeshowTitle = "Exposition or trade event title is required";
      if (!permitDetails.brandsShowcase.trim()) errors.brandsShowcase = "Spirits list for display/showcase is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!ownerType) {
        if (showToast) showToast("Please select owner type first.", "error");
        return;
      }
      setCurrentStep(2);
      if (showToast) showToast("Basic details saved. Moving to Permit Selection.");
    } else if (currentStep === 2) {
      if (!selectedPermitId) {
        if (showToast) showToast("Please select a permit type to continue.", "error");
        return;
      }
      setCurrentStep(3);
      if (showToast) showToast("Moving to Step 3: Event Details.");
    } else if (currentStep === 3) {
      if (validateDetailsStep()) {
        setCurrentStep(4);
        if (showToast) showToast("Event details saved. Moving to Documents Upload.");
      } else {
        if (showToast) showToast("Kindly complete highlighted mandatory fields.", "error");
      }
    } else if (currentStep === 4) {
      setCurrentStep(5);
      if (showToast) showToast("Moving to Step 5: Review & Submit.");
    } else if (currentStep === 5) {
      if (!permitDetails.signatureName.trim()) {
        setFormErrors({ signatureName: "Signature declaration endorsement required" });
        if (showToast) showToast("Please sign the digital undertaking.", "error");
        return;
      }
      handleFinalSubmission();
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBackToDashboard();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmission = () => {
    const referenceNum = `${selectedPermitId}-TRN-${Math.floor(100000 + Math.random() * 900000)}`;
    const feesMap = { "P-10": "₹ 15,000", "P-10A": "₹ 50,050", "P-11": "₹ 25,000" };
    const dateStamp = new Date().toLocaleDateString("en-IN");
    const chosenPermit = permits.find((p) => p.id === selectedPermitId);

    const receipt = {
      permitNo: referenceNum,
      permitCode: selectedPermitId,
      permitTitle: chosenPermit?.title || "Excise Permit",
      subbadge: chosenPermit?.subbadge || "Permit",
      applicantName: permitDetails.signatureName,
      permitStartDate: selectedPermitId === "P-10" ? permitDetails.eventDate : selectedPermitId === "P-10A" ? permitDetails.eventStartDate : dateStamp,
      permitEndDate: selectedPermitId === "P-10" ? permitDetails.eventDate : selectedPermitId === "P-10A" ? permitDetails.eventEndDate : dateStamp,
      venue: selectedPermitId === "P-10" ? permitDetails.venueAddress : selectedPermitId === "P-10A" ? permitDetails.exhibitionVenue : permitDetails.tradeshowTitle,
      feePaid: feesMap[selectedPermitId] || "₹ 0",
      generatedAt: dateStamp,
      status: "APPROVED - ACTIVE"
    };

    setPermitReceipt(receipt);
    setSubmitSuccess(true);
    if (onSubmitPermit) {
      onSubmitPermit({
        id: referenceNum,
        permitType: (chosenPermit?.title || "") + ` (${selectedPermitId})`,
        sourcePremise: "Authorized Central Excise Warehousing",
        destPremise: selectedPermitId === "P-10" || selectedPermitId === "61" ? permitDetails.venueAddress : selectedPermitId === "P-10A" || selectedPermitId === "51" ? permitDetails.exhibitionVenue : "Trade Complex",
        consignmentDetails: selectedPermitId === "P-10" || selectedPermitId === "61" ? "Spirits for private catering event" : "Exhibition showcase samples",
        carrierLicense: "DL-1LM-TEMP-PASS",
        status: "Approved",
        submittedDate: dateStamp,
        remarks: "Transit permit instant pass issued"
      });
    }
    if (showToast) showToast(`${selectedPermitId} permit issued successfully with instant QR Code status!`, "success");
  };

  const triggerReceiptPrint = () => {
    if (showToast) showToast("Formatting print job for local thermal gate pass recorder...", "success");
    window.print();
  };

  // If user selected P-10 and reaches Step 3, direct to the detailed P10Page
  if (selectedPermitId === "P-10" && currentStep >= 3) {
    return (
      <P10Page 
        onBackToDashboard={() => setCurrentStep(2)}
        showToast={showToast}
        onSubmitPermit={onSubmitPermit}
      />
    );
  }

  return (
    <div className="app-registartion-page">
      {/* Header Banner */}
      <div className="permit-banner relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-800/10 pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10 text-left">
          <div className="permit-banner-icon shrink-0 border border-white/20">
            <FileText className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="text-left space-y-0.5">
            <h1 className="permit-banner-title tracking-tight leading-tight">
              New Permit Application
            </h1>
            <p className="permit-banner-subtitle font-medium opacity-90">
              Complete the basic details to start your permit application.
            </p>
          </div>
        </div>

        {/* Skyline Sketch */}
        <div className="hidden md:block relative z-10 opacity-70 h-14 w-80 select-none pointer-events-none">
          <svg className="h-full w-full text-white" viewBox="0 0 300 60" fill="currentColor">
            <path d="M220,55 C215,50 210,40 215,35 C218,32 222,35 225,40 C228,35 232,32 235,35 C240,40 235,50 230,55 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M217,55 C213,46 215,42 220,44" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M233,55 C237,46 235,42 230,44" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M140,55 L140,25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M180,55 L180,25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M140,25 L180,25 L180,20 L140,20 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M145,20 L175,20 L160,10 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M150,55 L150,38 C150,33 170,33 170,38 L170,55" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="160" cy="22" r="1.5" fill="currentColor" />
            <path d="M90,55 L93,10 L97,10 L100,55 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="91.5" y1="45" x2="98.5" y2="45" stroke="currentColor" strokeWidth="1" />
            <line x1="92" y1="35" x2="98" y2="35" stroke="currentColor" strokeWidth="1" />
            <line x1="92.5" y1="25" x2="97.5" y2="25" stroke="currentColor" strokeWidth="1" />
            <line x1="93" y1="18" x2="97" y2="18" stroke="currentColor" strokeWidth="1" />
            <path d="M94.5,10 L94.5,4 L95.5,4 L95.5,10" stroke="currentColor" strokeWidth="1" />
            <path d="M10,55 L50,55 L65,40 L130,40 L145,55 L290,55" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="0" y1="55" x2="300" y2="55" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Stepper */}
      {!submitSuccess && (
        <div className="wizard-stepper select-none overflow-x-auto">
          <div className="step-row min-w-[750px] relative">
            {steps.map((st, idx) => {
              const isChecked = st.num < currentStep;
              const isActive = st.num === currentStep;
              return (
                <div key={st.num} className="step-item">
                  <div
                    onClick={() => {
                      if (st.num < currentStep) {
                        setCurrentStep(st.num);
                      }
                    }}
                    className={`step-circle cursor-pointer transition-all duration-300 ${
                      isChecked 
                        ? "step-completed shadow-md shadow-emerald-100" 
                        : isActive 
                        ? "step-active shadow-md shadow-blue-100 scale-105" 
                        : ""
                    }`}
                  >
                    {isChecked ? <Check className="w-5 h-5 stroke-[3.5]" /> : <span>{st.num}</span>}
                  </div>
                  <div className={`step-title ${
                    isActive ? "text-[#2563eb]" : isChecked ? "text-[#16a34a]" : ""
                  }`}>
                    {st.label}
                  </div>
                  {idx < steps.length - 1 && <div className="step-line" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Flow Content */}
      {!submitSuccess ? (
        <div className="space-y-6">

          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <div className="wizard-card animate-fade">
              <div className="wizard-content space-y-6">
                <div className="section-header">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                    <User className="w-6 h-6 text-[#1d4ed8]" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h2>Basic Details</h2>
                    <p>Enter the basic information related to the permit application.</p>
                  </div>
                </div>

                <div className="form-group text-left">
                  <label className="text-xs font-bold text-slate-700 block text-left">
                    Owner Type <span className="text-red-500 font-bold">*</span>
                  </label>
                  
                  <div className="relative max-w-full text-left">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-5 h-5 text-blue-500" />
                    </div>
                    <select
                      value={ownerType}
                      onChange={(e) => setOwnerType(e.target.value)}
                      className="form-control w-full bg-slate-50/50 pl-12 pr-10 py-3.5 focus:outline-none focus:border-blue-500 font-bold text-slate-700 appearance-none cursor-pointer transition-all"
                      disabled={isLoadingOwnerTypes}
                    >
                      <option value="">
                        {isLoadingOwnerTypes ? "Loading owner types from registry..." : "-- Select Owner Type --"}
                      </option>
                      {ownerTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={fetchOwnerTypes}
                    className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition"
                    disabled={isLoadingOwnerTypes}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOwnerTypes ? 'animate-spin' : ''}`} />
                    {isLoadingOwnerTypes ? 'Refreshing...' : 'Refresh owner types'}
                  </button>
                </div>

                <div className="info-box select-none text-left">
                  <p className="info-title">Please select the permit category carefully.</p>
                  <p className="info-text">Applicable fees, documents and approval workflow depend on the selected permit type.</p>
                </div>

                <div className="wizard-footer pt-6 border-t border-slate-100">
                  <div />
                  <div className="footer-actions">
                    <button
                      type="button"
                      onClick={() => showToast && showToast("Draft saved successfully!")}
                      className="btn-draft hover:bg-slate-50 transition"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="btn-next hover:bg-blue-700 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Permit Selection */}
          {currentStep === 2 && (
            <div className="permit-selection-container animate-fade">
              <div className="permit-header">
                <h1>Select Permit Type</h1>
                <p>Choose the permit type you want to apply for</p>
              </div>

              <div className="permit-info-banner select-none text-left">
                <Info className="w-5 h-5 shrink-0" />
                <span>Please select the appropriate permit type. Permit conditions, fees and required documents may vary depending on the selected permit.</span>
              </div>

              <div className="permit-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search permits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="permit-search"
                />
              </div>

              <div className="permit-count">
                {filteredPermits.length} Permit{filteredPermits.length !== 1 ? "s" : ""} Available
              </div>

              <div className="permit-grid">
                {filteredPermits.map((p) => {
                  const isSelected = selectedPermitId === p.id;
                  const IconComponent = p.icon;
                  return (
                    <div 
                      key={p.id} 
                      onClick={() => setSelectedPermitId(p.id)}
                      className={`permit-card${isSelected ? " selected" : ""}`}
                    >
                      <div className="permit-icon">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="permit-code">{p.code}</div>
                      <h3 className="permit-title">{p.title}</h3>
                      <p className="permit-description">{p.description}</p>
                      <div className="permit-footer">
                        <span className="permit-tag">{p.subbadge}</span>
                        <span className="permit-link">View Guidelines</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPermits.length === 0 && (
                <div className="text-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl mt-6">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">No matching special permits or transport passes found.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Refine your search input filter or query.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Event Details (For P-10A & P-11) */}
          {currentStep === 3 && (
            <div className="wizard-card animate-fade text-left">
              <div className="wizard-content space-y-6">
                <div className="section-header pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#1e40af] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                      Active Docket Type: {selectedPermitId}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-800 mt-2">Excise Permission Record Form</h2>
                    <p className="text-xs text-slate-500 font-semibold">Please complete the relevant security clearance parameters below:</p>
                  </div>
                </div>

                {selectedPermitId === "P-10A" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Exhibition / Gala Corporate Title *</label>
                      <input 
                        type="text" 
                        value={permitDetails.corporateTitle}
                        onChange={(e) => handleInputChange("corporateTitle", e.target.value)}
                        className="form-control"
                        placeholder="e.g. IT Trade Show 2026"
                      />
                      {formErrors.corporateTitle && <span className="text-xs text-red-500 font-bold mt-1">{formErrors.corporateTitle}</span>}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Host Organization *</label>
                      <input 
                        type="text" 
                        value={permitDetails.hostOrganization}
                        onChange={(e) => handleInputChange("hostOrganization", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Duration (Starts) *</label>
                      <input 
                        type="date" 
                        value={permitDetails.eventStartDate}
                        onChange={(e) => handleInputChange("eventStartDate", e.target.value)}
                        className="form-control font-medium"
                      />
                      {formErrors.eventStartDate && <span className="text-xs text-red-500 font-bold mt-1">{formErrors.eventStartDate}</span>}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Duration (Ends)</label>
                      <input 
                        type="date" 
                        value={permitDetails.eventEndDate}
                        onChange={(e) => handleInputChange("eventEndDate", e.target.value)}
                        className="form-control font-medium"
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Number of Serving Booths</label>
                      <input 
                        type="number" 
                        value={permitDetails.boothCount}
                        onChange={(e) => handleInputChange("boothCount", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Private Security Agency Reference</label>
                      <input 
                        type="text" 
                        value={permitDetails.securityAgencyName}
                        onChange={(e) => handleInputChange("securityAgencyName", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Pragati Maidan / Venue Coordinates *</label>
                      <textarea 
                        value={permitDetails.exhibitionVenue}
                        onChange={(e) => handleInputChange("exhibitionVenue", e.target.value)}
                        className="textarea-box font-medium text-xs"
                        rows={2}
                      />
                      {formErrors.exhibitionVenue && <span className="text-xs text-red-500 font-bold mt-1">{formErrors.exhibitionVenue}</span>}
                    </div>
                  </div>
                )}

                {selectedPermitId === "P-11" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Tradeshow Title *</label>
                      <input 
                        type="text" 
                        value={permitDetails.tradeshowTitle}
                        onChange={(e) => handleInputChange("tradeshowTitle", e.target.value)}
                        className="form-control"
                      />
                      {formErrors.tradeshowTitle && <span className="text-xs text-red-500 font-bold mt-1">{formErrors.tradeshowTitle}</span>}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Booth/Stall Code Number</label>
                      <input 
                        type="text" 
                        value={permitDetails.boothCode}
                        onChange={(e) => handleInputChange("boothCode", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Sample Serving Size Limit (ml)</label>
                      <input 
                        type="text" 
                        value={permitDetails.sampleServingMl}
                        onChange={(e) => handleInputChange("sampleServingMl", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Wholesale License Permit Association</label>
                      <input 
                        type="text" 
                        value={permitDetails.distributorLicenseNum}
                        onChange={(e) => handleInputChange("distributorLicenseNum", e.target.value)}
                        className="form-control font-mono"
                      />
                    </div>

                    <div className="form-group md:col-span-2 shadow-sm border border-slate-100 p-4 rounded-xl bg-slate-50">
                      <label className="text-xs font-extrabold text-slate-700 block mb-2 uppercase">Spirits / Beverage Brands Showcasing Details *</label>
                      <textarea 
                        value={permitDetails.brandsShowcase}
                        onChange={(e) => handleInputChange("brandsShowcase", e.target.value)}
                        className="textarea-box text-xs bg-white"
                        rows={2}
                      />
                      {formErrors.brandsShowcase && <span className="text-xs text-red-500 font-bold mt-1">{formErrors.brandsShowcase}</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Documents Upload */}
          {currentStep === 4 && (
            <div className="wizard-card animate-fade text-left">
              <div className="wizard-content space-y-6">
                <div className="section-header pb-4 border-b border-slate-100">
                  <div>
                    <h2>Support compliance documents</h2>
                    <p className="text-xs text-slate-500 font-semibold">Delhi Excise Law mandates strict certification clearances on public gatherings. Files are pre-validated beneath 10MB.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Venue Booking Letter / Hall NOC *</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Valid venue reservation invoice signed with landlord seal</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Mapped: venue_booking_invoice.pdf
                      </span>
                      <button 
                        type="button"
                        onClick={() => showToast && showToast("File venue_booking_invoice.pdf uploaded.")}
                        className="text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100 border border-slate-200 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        <Upload className="w-3 h-3 text-slate-400" /> Replace
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Local Police Station Intimation Acknowledgment *</h4>
                      <p className="text-[10px] text-slate-400 font-medium font-sans">Stamp intimation copy notifying territorial sub-division of gathering</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Mapped: police_station_acknowledgment.pdf
                      </span>
                      <button 
                        type="button"
                        onClick={() => showToast && showToast("File station acknowledgment updated.")}
                        className="text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100 border border-slate-200 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        <Upload className="w-3 h-3 text-slate-400" /> Replace
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Gathering site seating layout & fire-exits blueprint *</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Blueprint mapping beverage booths, security checkpoints and emergency exits</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Mapped: layout_fire_safety_exits.pdf
                      </span>
                      <button 
                        type="button"
                        onClick={() => showToast && showToast("Layout plan refreshed.")}
                        className="text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100 border border-slate-200 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        <Upload className="w-3 h-3 text-slate-400" /> Replace
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 p-4 rounded-xl hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Excise fee payment deposit receipt / Challan</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Bank reference code deposit proving government fee clearance</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Mapped: excise_challan_15k_cleared.pdf
                      </span>
                      <button 
                        type="button"
                        onClick={() => showToast && showToast("Fee receipt uploaded.")}
                        className="text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 bg-slate-100 border border-slate-200 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        <Upload className="w-3 h-3 text-slate-400" /> Replace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Undertaking */}
          {currentStep === 5 && (
            <div className="wizard-card animate-fade text-left">
              <div className="wizard-content space-y-6">
                <div className="section-header pb-4 border-b border-slate-100">
                  <div>
                    <h2>Statutory review & Signature docket</h2>
                    <p className="text-xs text-slate-500 font-semibold">Please authenticate and affirm the underlying commitment declarations:</p>
                  </div>
                </div>

                <div className="bg-red-50 text-red-950 p-4 border border-red-100 rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div className="applicant-alert-text">
                    <p className="font-extrabold uppercase text-red-900 mb-0.5">Excise Penalty Warning Notice Under Code-24</p>
                    Filing misleading parameters regarding gatherings, serving hours past midnight without extra permits, or sourcing cargo from non-bonded retail outlets results in flat penalties of ₹ 2,00,000, prosecution, and automatic blacklisting under NCT Excise regulations.
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <p className="text-[11px] font-black tracking-wider uppercase text-slate-400">File Summary Pre-Review</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black font-sans">Permit Scope</span>
                      <span className="text-slate-800 font-bold">{selectedPermitId}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black font-sans">Contact Mobile</span>
                      <span className="text-slate-700 font-mono font-bold">{permitDetails.mobile}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black font-sans">Authority Zone</span>
                      <span className="text-slate-700 font-mono font-bold">West Delhi Excise</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black font-sans">Scheduled Date</span>
                      <span className="text-slate-700 font-bold">{selectedPermitId === "P-10" ? permitDetails.eventDate : "Exhibition Timeline"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="legal-accept"
                      checked={permitDetails.undertakingAccept}
                      onChange={(e) => handleInputChange("undertakingAccept", e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300 pointer-events-auto"
                    />
                    <label htmlFor="legal-accept" className="text-xs text-slate-600 leading-relaxed font-semibold cursor-pointer">
                      I/We solemnly declare that the scheduled showcase spirits are sourced certified from bounded warehouse deposits, police station intimation stands verified, and serving timings remain fully restricted between daylight hours.
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Authorized Signatory Name *</label>
                      <input 
                        type="text" 
                        value={permitDetails.signatureName}
                        onChange={(e) => handleInputChange("signatureName", e.target.value)}
                        className="form-control"
                      />
                      {formErrors.signatureName && <span className="text-xs text-red-500 font-bold mt-1 block">{formErrors.signatureName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Signing Reference Location</label>
                      <input 
                        type="text" 
                        value={permitDetails.signingPlace}
                        onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Navigation Controls Footer */}
          {currentStep > 1 && (
            <div className="wizard-footer mt-6 bg-transparent border-t border-slate-200/60 pt-6">
              <button 
                type="button" 
                onClick={handleBack}
                className="btn-draft hover:bg-slate-50 transition"
              >
                Back
              </button>

              <div className="footer-actions">
                <button
                  type="button"
                  onClick={() => showToast && showToast("Draft saved successfully in background registry!")}
                  className="btn-draft hover:bg-slate-50 transition"
                >
                  Save Draft
                </button>
                <button 
                  type="button" 
                  onClick={handleContinue}
                  className="btn-next hover:bg-blue-700 transition"
                >
                  {currentStep === 5 ? "Issue Special Permit" : "Continue"}
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Permit Success Gate Pass View */
        <div className="space-y-6 animate-fade">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 max-w-2xl mx-auto space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />

            <div className="flex items-start justify-between border-b border-dashed border-slate-200 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-100 rounded px-2.5 py-0.5">
                    EXCISE NCT GOVERNMENT OF DELHI
                  </span>
                  <span className="text-[10px] font-mono font-black text-slate-400">OFFICIAL PASS</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-2 uppercase">Excise Special Day Transit Pass</h2>
                <p className="text-xs text-slate-500 font-bold font-mono">CODE: {permitReceipt?.permitNo}</p>
              </div>

              <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600/30 text-emerald-600 flex flex-col items-center justify-center rotate-12 shrink-0 select-none bg-emerald-50/50">
                <span className="text-[9px] font-black uppercase">APPROVED</span>
                <span className="text-[7px] font-black tracking-widest font-mono">DELHI</span>
                <div className="h-0.5 w-8 bg-emerald-500 my-0.5" />
                <span className="text-[7px] font-black">EXCISE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 space-y-2">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Permit Class Authorized</span>
                  <span className="text-slate-800 font-black mt-1 inline-block">{permitReceipt?.permitTitle}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Specific Endorsement</span>
                  <span className="text-slate-600 font-semibold">{permitReceipt?.subbadge}</span>
                </div>
              </div>

              <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 space-y-2">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Authorized Signatory / Host</span>
                  <span className="text-slate-800 font-black mt-1 inline-block">{permitReceipt?.applicantName}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Clearance Fee Settled</span>
                  <span className="text-emerald-700 font-black">{permitReceipt?.feePaid}</span>
                </div>
              </div>

              <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 sm:col-span-2">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Approved Venue Coordinates</span>
                <span className="text-slate-700 font-bold">{permitReceipt?.venue}</span>
              </div>

              <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 sm:col-span-2 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Pass Validity Span</span>
                  <span className="text-slate-700 font-bold">
                    From <span className="font-mono text-slate-900 underline">{permitReceipt?.permitStartDate}</span> To <span className="font-mono text-slate-900 underline">{permitReceipt?.permitEndDate}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Transit Code</span>
                  <span className="text-slate-800 font-bold font-mono text-[10px] bg-slate-200 px-1 rounded-sm">{permitReceipt?.permitNo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="p-1 border border-slate-200 rounded-lg shrink-0 bg-white">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-slate-800 uppercase leading-none">Instant QR Pass Validated</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                    Scan pass during transit checks with Delhi Excise Mobile app of local circle inspectors.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-500 uppercase font-black leading-none">Excise Registrar</p>
                <div className="h-4 w-12 border-b border-slate-300 mx-auto my-1 inline-block" />
                <p className="text-[10px] font-bold text-slate-500 leading-none">NCT of Delhi Gov</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setPermitReceipt(null);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition"
            >
              Register Another Permit
            </button>

            <button
              onClick={triggerReceiptPrint}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition shadow-md font-sans"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print Permit Gate-Pass</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer transition border-none"
            >
              Exit to Dashboard
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center max-w-2xl mx-auto">
            <p className="text-[11px] text-slate-500 font-medium">
              Note: This pass is saved in your active tracking permit lists. Click &quot;Applied Permit&quot; in the Premise dropdown on the top menu to access digital copies persistently.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}