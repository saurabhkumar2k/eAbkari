import React, { useState, useEffect, useMemo } from "react";
import {
  Building,
  Utensils,
  GlassWater,
  Plane,
  Train,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  ArrowRight,
  ArrowLeft,
  Save,
  RotateCcw,
  X,
  Plus,
  Trash2,
  FileCheck,
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sliders,
  Layers,
  Activity,
  Hash,
  Barcode,
  Search,
  ChevronsUpDown,
  Tag as TagIcon
} from "lucide-react";
import SelectLicenseType from "./SelectLicense";
import L20 from "./L20";
import HcrApplicantDetails from "./HcrApplicantDetail";

// Option lists duplicate from LiquorBrandRegistration for ease of access inside modular feature folder
const brandCodeOptions = [
  { value: 'BC-EXC-DEL-001', label: 'BC-EXC-DEL-001 (Premium Class A)' },
  { value: 'BC-EXC-DEL-002', label: 'BC-EXC-DEL-002 (Economy Plain)' },
  { value: 'BC-EXC-DEL-003', label: 'BC-EXC-DEL-003 (Special Reserve)' },
  { value: 'BC-EXC-DEL-004', label: 'BC-EXC-DEL-004 (Imported Malt)' },
  { value: 'BC-EXC-DEL-005', label: 'BC-EXC-DEL-005 (Standard Mild)' }
];

const kindOfLiquorOptions = {
  'Country Liquor': [
    { value: 'Country Spirit (Plain)', label: 'Country Spirit (Plain)' },
    { value: 'Country Spirit (Spiced)', label: 'Country Spirit (Spiced)' },
    { value: 'Country Rum', label: 'Country Rum' }
  ],
  'Indian Liquor': [
    { value: 'Indian Made Foreign Liquor (IMFL)', label: 'Indian Made Foreign Liquor (IMFL)' },
    { value: 'Foreign Liquor (Imported FL)', label: 'Foreign Liquor (Imported FL)' },
    { value: 'Beer (Domestic)', label: 'Beer (Domestic)' },
    { value: 'Beer (Imported/Premium)', label: 'Beer (Imported/Premium)' },
    { value: 'Wine (Domestic)', label: 'Wine (Domestic)' },
    { value: 'Wine (Imported)', label: 'Wine (Imported)' }
  ]
};

const liquorTypeOptions = {
  'Country Spirit (Plain)': [
    { value: 'Plain Spirit 36°', label: 'Plain Spirit 36° Proof' },
    { value: 'Plain Spirit 40°', label: 'Plain Spirit 40° Proof' }
  ],
  'Country Spirit (Spiced)': [
    { value: 'Spiced Spirit 50°', label: 'Spiced Spirit 50° Proof' },
    { value: 'Masala Premium 50°', label: 'Masala Premium 50° Proof' }
  ],
  'Country Rum': [
    { value: 'Country Rum Dark', label: 'Country Rum Dark' }
  ],
  'Indian Made Foreign Liquor (IMFL)': [
    { value: 'Whisky', label: 'Whisky' },
    { value: 'Rum', label: 'Rum' },
    { value: 'Vodka', label: 'Vodka' },
    { value: 'Gin', label: 'Gin' },
    { value: 'Brandy', label: 'Brandy' }
  ],
  'Foreign Liquor (Imported FL)': [
    { value: 'Single Malt Whisky', label: 'Single Malt Whisky' },
    { value: 'Premium Scotch', label: 'Premium Scotch' },
    { value: 'Bourbon Whisky', label: 'Bourbon Whisky' },
    { value: 'Imported Gin', label: 'Imported Gin' },
    { value: 'Imported Vodka', label: 'Imported Vodka' }
  ],
  'Beer (Domestic)': [
    { value: 'Strong Beer', label: 'Strong Beer' },
    { value: 'Mild Lager', label: 'Mild Lager' },
    { value: 'Draft Beer', label: 'Draft Beer' }
  ],
  'Beer (Imported/Premium)': [
    { value: 'Imported Premium IPA', label: 'Imported Premium IPA' },
    { value: 'International Stout', label: 'International Stout' },
    { value: 'Premium Pilsner', label: 'Premium Pilsner' }
  ],
  'Wine (Domestic)': [
    { value: 'Shiraz Red Wine', label: 'Shiraz Red Wine' },
    { value: 'Sauvignon White Wine', label: 'Sauvignon White Wine' },
    { value: 'Sparkling Rose', label: 'Sparkling Rose' }
  ],
  'Wine (Imported)': [
    { value: 'Imported Champagne', label: 'Imported Champagne' },
    { value: 'Premium Bordeaux Red', label: 'Premium Bordeaux Red' },
    { value: 'Chardonnay White', label: 'Chardonnay White' }
  ]
};

export default function HcrLicenseWizard({ onBackToDashboard, showToast, rootData = {} }) {
  // We represent HCR Wizard Steps corresponding to user's requested screenshot layout:
  // Step 3: Select License
  // Step 4: Brand Registration (the previous Brand Register module)
  // Step 5: Premise Details
  // Step 6: Documents
  // Step 7: Review & Submit (Submit completion)
  const [currentStep, setCurrentStep] = useState(3);

  // Selected HCR license code
  const [selectedLicenseId, setSelectedLicenseId] = useState("L-15");

  // HCR Applicant Profile State
  const [applicantForm, setApplicantForm] = useState({
    applicantName: "RAMESH KUMAR",
    dob: "1985-05-15",
    fatherName: "SURESH KUMAR",
    occupation: "HOTELIER",
    panNo: "ABCDE1234F",
    address1: "74, KHAN MARKET",
    address2: "NEAR METRO STATION",
    state: "Delhi",
    district: "South",
    subDivision: "Saket",
    pin: "110003",
    mobile: "9876543210",
    email: "ramesh.kumar@hotels.in",
    landline: "",
    fax: ""
  });

  // HCR Resturant Profile State
  const [siteForm, setSiteForm] = useState({
    restaurantName: "",
    address1: "",
    address2: "",
    state: "",
    district: "",
    subDivision: "",
    policeStation: "",
    pin: "",
    constituency: "",
    ward: "",
    email: "",
    mobile: "",
    landline: "",
    fax: "",
    pan: ""
  });

  const [applicantErrors, setApplicantErrors] = useState({});

  // L-20 Train Details State
  const [trainForm, setTrainForm] = useState({
    exciseYear: "2025-2026",
    operatingCompany: "Indian Railways Catering and Tourism Corporation (IRCTC)",
    trainName: "Palace on Wheels Premium",
    trainNumber: "12953",
    tempStoreAddress: "Platform 1, New Delhi Railway Station Warehouse, New Delhi",
    trainOrigin: "New Delhi Railway Station (NDLS)",
    trainRoutes: ["New Delhi", "Jaipur", "Udaipur", "Jaisalmer"],
    numCompartments: "14",
    numSeatCovers: "42",
    numDispensingCounters: "2",
    numManagers: "3",
    numKitchenStaff: "8",
    numUtilityEmployees: "12",
    numTrainAttendants: "20"
  });
  const [trainErrors, setTrainErrors] = useState({});

  // HCR Brand associated state
  const [associatedBrands, setAssociatedBrands] = useState([]);

  // Brand registration sub-form state
  const [brandForm, setBrandForm] = useState({
    category: 'Indian Liquor', // default selection
    kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
    liquorType: 'Whisky',
    oldBrandId: '',
    brandCode: 'BC-EXC-DEL-001',
    measure: '750 Ml',
    brandName: ''
  });

  const [brandFormErrors, setBrandFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('brandName');
  const [sortDirection, setSortDirection] = useState('asc');

  // Premises Details States (inside step 5 for non-L20)
  const [premisesForm, setPremisesForm] = useState({
    premiseAddress: "Star Class Annex Area, Indira Gandhi Int'l Airport Runway, New Delhi",
    mcdTradeLicenseNum: "MCD-99120-DEL-HCR",
    pincode: "110037",
    hasFireNoc: true,
    hasTaxCompliance: true,
    declarationsChecked: false
  });
  const [premisesErrors, setPremisesErrors] = useState({});

  // Documents State
  const [documents, setDocuments] = useState({
    fireNocDoc: null,
    mcdTradeDoc: null,
    vatRegDoc: null,
    identityProof: null
  });

  const [toast, setToast] = useState(null);
  const [successReceipt, setSuccessReceipt] = useState(null);

  // Auto clear toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Helper trigger
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Dynamic license steps computed mapping
  const currentLicenseSteps = useMemo(() => {
    const list = [
      { num: 1, id: "basic", label: "Basic Details", sub: "Done" },
      { num: 2, id: "category", label: "License Category", sub: "Done" },
      { num: 3, id: "select", label: "Select License", sub: "Active" },
      { num: 4, id: "applicant", label: "Applicant Details", sub: "Demographics" }
    ];

    let nextNum = 5;
    if (selectedLicenseId === "L-20") {
      list.push({ num: nextNum++, id: "train", label: "Train Details", sub: "L-20 Specific" });
    }

    list.push({ num: nextNum++, id: "brand", label: "Restaurant Details", sub: "Site Address" });

    if (selectedLicenseId !== "L-20") {
      list.push({ num: nextNum++, id: "premises", label: "Premise Details", sub: "Safety / Address" });
    }

    list.push({ num: nextNum++, id: "documents", label: "Documents", sub: "Uploads" });
    list.push({ num: nextNum++, id: "review", label: "Review & Submit", sub: "Success Finalize" });

    return list;
  }, [selectedLicenseId]);

  // Applicant Submission validation helper
  const handleApplicantSubmit = () => {
    const errors = {};
    if (!applicantForm.applicantName.trim()) {
      errors.applicantName = "Applicant Name is required";
    }
    if (!applicantForm.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!applicantForm.occupation.trim()) {
      errors.occupation = "Occupation is required";
    }
    if (!applicantForm.panNo.trim() || applicantForm.panNo.length !== 10) {
      errors.panNo = "Valid 10-digit PAN number is required";
    }
    if (!applicantForm.address1.trim()) {
      errors.address1 = "Address Line 1 is required";
    }
    if (!applicantForm.pin.trim() || applicantForm.pin.length !== 6) {
      errors.pin = "Valid 6-digit pin code is required";
    }
    if (!applicantForm.mobile.trim() || applicantForm.mobile.length !== 10) {
      errors.mobile = "Valid 10-digit mobile number is required";
    }
    if (!applicantForm.email.trim() || !applicantForm.email.includes("@")) {
      errors.email = "Valid email address is required";
    }

    if (Object.keys(errors).length > 0) {
      setApplicantErrors(errors);
      triggerToast("Please verify required fields in primary applicant profile.", "error");
      return false;
    }
    setApplicantErrors({});
    return true;
  };

  const handelResturantDetails = () => {
    const errors = {};
    if (!siteForm.restaurantName.trim()) {
      errors.restaurantName = "Resturant Name is required";
    }
  }

  // Train Submission validation helper
  const handleTrainSubmit = () => {
    const errors = {};
    if (!trainForm.operatingCompany.trim()) {
      errors.operatingCompany = "Operating company/board is required";
    }
    if (!trainForm.trainName.trim()) {
      errors.trainName = "Train Name is required";
    }
    if (!trainForm.trainNumber.trim()) {
      errors.trainNumber = "Train Number is required";
    }
    if (!trainForm.tempStoreAddress.trim()) {
      errors.tempStoreAddress = "Temporary store warehouse address is required";
    }
    if (!trainForm.trainOrigin.trim()) {
      errors.trainOrigin = "Originating train station is required";
    }
    if (!trainForm.trainRoutes || trainForm.trainRoutes.length === 0) {
      errors.trainRoutes = "Please specify at least one route stop/junction";
    }
    if (!trainForm.numCompartments) {
      errors.numCompartments = "Number of compartments is required";
    }
    if (!trainForm.numSeatCovers) {
      errors.numSeatCovers = "Number of dining seat covers is required";
    }
    if (!trainForm.numDispensingCounters) {
      errors.numDispensingCounters = "Number of dispensing counters is required";
    }

    if (Object.keys(errors).length > 0) {
      setTrainErrors(errors);
      triggerToast("Please specify the statutory train route and setup fields.", "error");
      return false;
    }
    setTrainErrors({});
    return true;
  };

  // Brand association save helper
  const handleSaveBrand = (e) => {
    e.preventDefault();
    const errors = {};

    if (!brandForm.category) {
      errors.category = 'Liquor category is required';
    }
    if (!brandForm.brandName || brandForm.brandName.trim() === '') {
      errors.brandName = 'Brand name is blank';
    }
    if (!brandForm.kindOfLiquor) {
      errors.kindOfLiquor = 'Kind of liquor is required';
    }
    if (!brandForm.liquorType) {
      errors.liquorType = 'Liquor Specific Type is required';
    }

    if (Object.keys(errors).length > 0) {
      setBrandFormErrors(errors);
      triggerToast('Please clarify form errors.', 'error');
      return;
    }

    const newBrand = {
      id: `BL-${Math.floor(1000 + Math.random() * 9000)}`,
      brandName: brandForm.brandName.toUpperCase().trim(),
      category: brandForm.category,
      kindOfLiquor: brandForm.kindOfLiquor,
      liquorType: brandForm.liquorType,
      oldBrandId: brandForm.oldBrandId || 'N/A',
      brandCode: brandForm.brandCode || 'BC-EXC-DEL-001',
      measure: brandForm.measure || '750 Ml',
      status: 'Associated'
    };

    setAssociatedBrands(prev => [newBrand, ...prev]);
    setBrandForm({
      category: 'Indian Liquor',
      kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
      liquorType: 'Whisky',
      oldBrandId: '',
      brandCode: 'BC-EXC-DEL-001',
      measure: '750 Ml',
      brandName: ''
    });
    setBrandFormErrors({});
    triggerToast('Brand successfully linked to HCR application registry!');
  };

  // Remove Brand item helper
  const handleRemoveBrand = (id) => {
    setAssociatedBrands(prev => prev.filter(b => b.id !== id));
    triggerToast('Removed brand link.', 'info');
  };

  // Sorting logic for Step 4 list
  const filteredBrands = useMemo(() => {
    let result = [...associatedBrands];
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(b =>
        b.brandName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.liquorType.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => {
      let aVal = String(a[sortColumn]).toLowerCase();
      let bVal = String(b[sortColumn]).toLowerCase();
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [associatedBrands, searchTerm, sortColumn, sortDirection]);

  // Handle category change, reset children
  const handleBrandCategoryChange = (e) => {
    const cat = e.target.value;
    const kindDefault = cat === 'Country Liquor' ? 'Country Spirit (Plain)' : 'Indian Made Foreign Liquor (IMFL)';
    const typeDefault = cat === 'Country Liquor' ? 'Plain Spirit 36°' : 'Whisky';
    setBrandForm(prev => ({
      ...prev,
      category: cat,
      kindOfLiquor: kindDefault,
      liquorType: typeDefault
    }));
  };

  // Handle Kind change, reset children
  const handleBrandKindChange = (e) => {
    const kind = e.target.value;
    const list = liquorTypeOptions[kind] || [];
    const typeDefault = list.length > 0 ? list[0].value : '';
    setBrandForm(prev => ({
      ...prev,
      kindOfLiquor: kind,
      liquorType: typeDefault
    }));
  };

  // Premises Submission & Validation
  const handlePremisesSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!premisesForm.premiseAddress.trim()) {
      errors.premiseAddress = "Premises installation facility address cannot be blank";
    }
    if (!premisesForm.pincode.trim() || premisesForm.pincode.length !== 6) {
      errors.pincode = "Valid 6-digit Delhi Pin code required";
    }
    if (!premisesForm.mcdTradeLicenseNum.trim()) {
      errors.mcdTradeLicenseNum = "MCD Trade clearance certificate index ID required";
    }
    if (!premisesForm.declarationsChecked) {
      errors.declarationsChecked = "You must acknowledge structural policy terms";
    }

    if (Object.keys(errors).length > 0) {
      setPremisesErrors(errors);
      triggerToast('Please tick the affirmations and verify entry inputs.', 'error');
      return;
    }

    setPremisesErrors({});
    setCurrentStep(7); // Proceed to Documents (Step 7)
  };

  // Final Action Filing
  const handleFinalSubmit = () => {
    // Submit creation success state
    const applicationNo = `AP-HCR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReceipt({
      applicationNo,
      licenseId: selectedLicenseId,
      fee: selectedLicenseId === "L-15" ? "₹ 3,25,000" : selectedLicenseId === "L-20" ? "₹ 2,00,000" : "₹ 2,80,000",
      date: new Date().toLocaleDateString('en-IN'),
      brandsCount: associatedBrands.length,
      address: selectedLicenseId === "L-20" ? trainForm.tempStoreAddress : premisesForm.premiseAddress,
      pincode: selectedLicenseId === "L-20" ? "110001" : premisesForm.pincode
    });
    setCurrentStep(8); // Proceed to Final Receipt (Step 8)
    showToast("Excise Star Classified Restaurant Privilege Code application created!");
  };

  return (
    <div className="brand-registration-page select-none text-slate-800">

      {/* Toast Notifier */}
      {toast && (
        <div className={`hcr-toast hcr-toast-${toast.type}`}>
          {toast.type === "success" && (
            <CheckCircle2 className="hcr-toast-icon hcr-success-icon" />
          )}

          {toast.type === "error" && (
            <AlertCircle className="hcr-toast-icon hcr-error-icon" />
          )}

          <span className="hcr-toast-message">
            {toast.message}
          </span>

          <button
            onClick={() => setToast(null)}
            className="hcr-toast-close"
          >
            <X className="hcr-toast-close-icon" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="hcr-container">

        {/* Dynamic Wizard Steps Indicator Row (32px vertical separation from header) */}
        {currentStep < 8 && (
          <div className="hcr-dynamic">
            <div className="hcr-stepper">
              {/* Connector dots bar */}
              <div className="hcr-step-progress">
                <div
                  className="hcr-step-progress-fill"
                  style={{
                    width: `${((currentStep - 1) / (currentLicenseSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {currentLicenseSteps.map((st) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <div key={st.id} className="hcr-step-item">
                    <div className={`hcr-step-circle ${isCompleted ? "hcr-step-completed" : isActive ? "hcr-step-active" : "hcr-step-pending"}`}>  {isCompleted ? (
                      <Check className="hcr-step-check" />
                    ) : (
                      <span>{st.num}</span>
                    )}
                    </div>
                    <span
                      className={`hcr-step-label ${isActive
                        ? "hcr-step-label-active"
                        : isCompleted
                          ? "hcr-step-label-completed"
                          : "hcr-step-label-pending"
                        }`}
                    >
                      {st.label}
                    </span>

                    <span className="hcr-step-subtitle">
                      {st.sub}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP CONTROLLER CONTENT */}
        <div className="hcr-content-area">

          {/* STEP 3: SELECT LICENSE TYPE */}
          {currentStep === 3 && (
            <div className="hcr-license-card">
              <SelectLicenseType
                selectedType={selectedLicenseId}
                onSelectType={(id) => setSelectedLicenseId(id)}
                onBack={onBackToDashboard}
                onContinue={() => setCurrentStep(4)}
              />


              {/* Active select step continue helper */}
              <div className="hcr-license-footer">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary hcr-continue-btn"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="hcr-arrow-icon" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: APPLICANT DETAILS (COMMON FIRST STEP FOR ALL HCR LICENSES) */}
          {currentStep === 4 && (
            <div className="hcr-form-section">
              <div className="hcr-step-header">
                <div>
                  <h2 className="hcr-step-title font-sans">Step 4: Applicant Personal & Profile Details</h2>
                  <p className="hcr-step-description font-sans">
                    Verify legal, identification, demographic, and resident contact coordinates for receipt-docket generation.
                  </p>
                </div>
                <div className="hcr-license-badge">
                  Licence Chosen: <span className="hcr-license-badge-value">{selectedLicenseId}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <HcrApplicantDetails
                  formData={applicantForm}
                  onChange={(key, val) => setApplicantForm(prev => ({ ...prev, [key]: val }))}
                  errors={applicantErrors}
                />
              </div>

              {/* Navigation for Applicant details step */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (handleApplicantSubmit()) {
                        setCurrentStep(5); // Go to next step (Step 5 which is Train Details for L-20, or Brand Registration for others)
                      }
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Next Step</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: LUXURY TRAIN DETAILS (L-20 LICENSE EXCLUSIVE) */}
          {currentStep === 5 && selectedLicenseId === "L-20" && (
            <div className="hcr-form-section animate-fade">
              <div className="hcr-step-header">
                <div>
                  <h2 className="hcr-step-title font-sans">Step 5: L-20 Luxury Train Service Configurations</h2>
                  <p className="hcr-step-description font-sans">
                    Configure operating corporation, transit routes, stops, compartment maps, and staff dimensions.
                  </p>
                </div>
                <div className="hcr-license-badge">
                  Licence Chosen: <span className="hcr-license-badge-value">{selectedLicenseId}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <L20
                  formData={trainForm}
                  onChange={(key, val) => setTrainForm(prev => ({ ...prev, [key]: val }))}
                  errors={trainErrors}
                />
              </div>

              {/* Navigation for Train details step */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)} // Back to Applicant details
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (handleTrainSubmit()) {
                        setCurrentStep(6); // Go to Brand Registration (Step 6 for L-20)
                      }
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Restaurant Details</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC PACKAGED LIQUOR BRAND REGISTRATION / ASSOCIATION */}
          {((currentStep === 5 && selectedLicenseId !== "L-20") || (currentStep === 6 && selectedLicenseId === "L-20")) && (
            <div className="hcr-form-section">

              {/* Section Header */}
              <div className="hcr-step-header">
                <div>
                  <h2 className="hcr-step-title font-sans">
                    {/* Step {selectedLicenseId === "L-20" ? 6 : 5}: Packaged Liquor Brand Association */}
                    Step {selectedLicenseId === "L-20" ? 6 : 5}: Restaurant Details
                  </h2>
                  <p className="hcr-step-description font-sans">
                    Restaurant Details associated with this HCR License profile.
                  </p>
                </div>
                <div className="hcr-license-badge">
                  Licence Chosen: <span className="hcr-license-badge-value">{selectedLicenseId}</span>
                </div>
              </div>

              {/* Glassmorphism Input Form Card */}
              <div className="brand-card">
                <div className="hcr-brand-header">
                  <TagIcon className="hcr-brand-icon" />
                  <h3 className="hcr-brand-title font-sans"> Add Restaurant Details </h3>
                </div>

                <form onSubmit={handleSaveBrand} className="space-y-6">
                  <div className="form-grid">

                    {/* 1. Restaurant Name */}

                    {/* <div className="form-group">
                      <label className="hcr-form-label">
                        <span>Restaurant Name</span>
                        <span className="required">*</span>
                      </label>
                      <div className="reg-input-group">
                        <div className="reg-input-icon">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Restaurant Name"
                          className={`reg-input uppercase font-bold text-slate-800 ${errors.restaurantName ? "error" : ""
                            }`}
                          value={formData.restaurantName || ""}
                          onChange={(e) => onChange("SiteForm", e.target.value.toUpperCase())}                         
                        />
                      </div>
                      {errors.restaurantName && (
                        <p className="error-text">{errors.restaurantName}</p>
                      )}
                    </div> */}

                    <div className="form-group full-width">
                      <label className="hcr-form-label">                  
                        <span>Restaurant Name</span>
                        <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="Enter Restaurant Name"
                        value={siteForm.restaurantName}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            restaurantName: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>


                    {/* 2. Restaurant Address 1 */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        <span>Restaurant Address 1</span>
                        <span className="required">*</span>
                      </label>

                      <textarea
                        rows="2"
                        placeholder="Address Line 1"
                        value={siteForm.address1}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            address1: e.target.value
                          }))
                        }
                        className="textarea-box"
                      />
                    </div>

                    {/* 3. Restaurant Address 2 */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Restaurant Address 2
                      </label>

                      <textarea
                        rows="2"
                        placeholder="Address Line 2"
                        value={siteForm.address2}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            address2: e.target.value
                          }))
                        }
                        className="textarea-box"
                      />
                    </div>

                    {/* 4. Restaurant State */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        <span>Restaurant State</span>
                        <span className="required">*</span>
                      </label>

                      <select
                        value={siteForm.state}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            state: e.target.value
                          }))
                        }
                        className="select-box"
                      >
                        <option value="">Select State</option>
                        <option value="Delhi">Delhi</option>
                        {/* {stateOptions.map(state => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))} */}
                      </select>
                    </div>


                    {/* 5. District */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        <span>Restaurant District</span>
                        <span className="required">*</span>                       
                      </label>

                      <select
                        value={siteForm.district}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            district: e.target.value
                          }))
                        }
                        className="select-box"
                      >
                        <option value="">Select District</option>
                        <option value="South">South</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Central">Central</option>
                        <option value="North">North</option>
                        <option value="East">East</option>
                        <option value="West">West</option>

                        {/* {districtOptions.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))} */}
                      </select>
                    </div>

                    {/* 6. Sub Division */}
                    <div className="form-group">
                      <label className="hcr-form-label">                      
                        <span>Restaurant Sub Division</span>
                        <span className="required">*</span>
                      </label>

                      <select
                        value={siteForm.subDivision}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            subDivision: e.target.value
                          }))
                        }
                        className="select-box"
                      >
                        <option value="">Select Sub Division</option>
                        <option value="Saket">Saket</option>
                        <option value="Vasant Vihar">Vasant Vihar</option>
                        <option value="Hauz Khas">Hauz Khas</option>
                        <option value="Mehrauli">Mehrauli</option>
                        <option value="Kalkaji">Kalkaji</option>

                        {/* {subDivisionOptions.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))} */}
                      </select>
                    </div>

                    {/* 7. Police Station */}
                    <div className="form-group">
                      <label className="hcr-form-label">                       
                        <span>Police Station</span>
                        <span className="required">*</span>
                      </label>

                      <select
                        value={siteForm.policeStation}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            policeStation: e.target.value
                          }))
                        }
                        className="select-box"
                      >
                        <option value="">Select Police Station</option>
                        <option value="Hauz Khas">Hauz Khas</option>
                        <option value="Mehrauli">Mehrauli</option>
                        <option value="Kalkaji">Kalkaji</option>

                        {/* {policeStationOptions.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))} */}
                      </select>
                    </div>


                    {/* 8. Restaurant PIN */}
                    <div className="form-group">
                      <label className="hcr-form-label">                       
                        <span>Restaurant PIN</span>
                        <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={6}
                        placeholder="PIN Code"
                        value={siteForm.pin}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            pin: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>


                    {/* 9. Constituency Area */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Constituency Area
                        <span>Restaurant Name</span>
                        <span className="required">*</span>
                      </label>

                      <select
                        value={siteForm.constituency}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            constituency: e.target.value
                          }))
                        }
                        className="select-box"
                      >
                        <option value="">Select Constituency</option>
                        <option value="Hauz Khas">Hauz Khas</option>
                        <option value="Mehrauli">Mehrauli</option>

                        {/* {constituencyOptions.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))} */}
                      </select>
                    </div>



                    {/* 10. Ward Name */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Ward Name
                      </label>

                      <input
                        type="text"
                        placeholder="Ward Name"
                        value={siteForm.ward}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            ward: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>


                    {/* 11. Restaurant Email */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Restaurant Email 
                        <span>Restaurant Email</span>
                        <span className="required">*</span>
                      </label>

                      <input
                        type="email"
                        placeholder="restaurant@email.com"
                        value={siteForm.email}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            email: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>


                    {/* 12. Restaurant Mobile */}
                    <div className="form-group">
                      <label className="hcr-form-label">                        
                        <span>Restaurant Mobile</span>
                        <span className="required">*</span>
                      </label>

                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={siteForm.mobile}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            mobile: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>


                    {/* 13. Restaurant Landline */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Restaurant Landline
                      </label>

                      <input
                        type="text"
                        placeholder="Landline Number"
                        value={siteForm.landline}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            landline: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>
                    {/* 14. Restaurant Fax */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Restaurant Fax
                      </label>

                      <input
                        type="text"
                        placeholder="Fax Number"
                        value={siteForm.fax}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            fax: e.target.value
                          }))
                        }
                        className="input-box"
                      />
                    </div>

                    {/* 15. Restaurant PAN */}
                    <div className="form-group">
                      <label className="hcr-form-label">
                        Restaurant PAN
                      </label>

                      <input
                        type="text"
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        style={{ textTransform: "uppercase" }}
                        value={siteForm.pan}
                        onChange={(e) =>
                          setSiteForm(prev => ({
                            ...prev,
                            pan: e.target.value.toUpperCase()
                          }))
                        }
                        className="input-box"
                      />
                    </div>

                  </div>


                  {/* Add Brand Action Row */}
                  {/* <div className="hcr-action-row">
                    <button
                      type="button"
                      onClick={() => setBrandForm({
                        category: 'Indian Liquor',
                        kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
                        liquorType: 'Whisky',
                        oldBrandId: '',
                        brandCode: 'BC-EXC-DEL-001',
                        measure: '750 Ml',
                        brandName: ''
                      })}
                      className="btn btn-secondary"
                    >
                      <RotateCcw className="hcr-action-icon" />
                      <span>Reset Form</span>
                    </button>
                    <button type="submit" className="btn btn-primary hcr-reset-btn">
                      <Plus className="w-4 h-4" />
                      <span>Add Brand to Profile</span>
                    </button>
                  </div> */}
                </form>
              </div>

              {/* Wizard navigation and proceed controls */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedLicenseId === "L-20") {
                      setCurrentStep(5); // Back to luxury train carriage details (Step 5)
                    } else {
                      setCurrentStep(4); // Back to generic applicant profile details (Step 4)
                    }
                  }}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (associatedBrands.length === 0) {
                        triggerToast("Tip: Registering at least 1 brand is recommended, but you may proceed as draft.", "info");
                      }

                      if (selectedLicenseId === "L-20") {
                        setCurrentStep(7); // Proceed directly to Documents (Step 7 for L-20; skipping Premise Details)
                      } else {
                        setCurrentStep(6); // Proceed to Premises Details (Step 6 for non-L20)
                      }
                    }}
                    className="btn btn-primary"
                  >
                    <span>{selectedLicenseId === "L-20" ? "Proceed to Documents" : "Proceed to Premises Details"}</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 6: PREMISE DETAILS (NON L-20 ONLY) */}
          {currentStep === 6 && selectedLicenseId !== "L-20" && (
            <div className="hcr-step-card animate-fade">
              <div className="hcr-step-card-header">
                <h3 className="hcr-step-card-title">
                  <Building className="hcr-step-card-icon" />
                  <span className="font-sans">Step 6: Premise & Structural Layout Details</span>
                </h3>
                <p className="hcr-step-card-description font-sans">Specify layout dimensions, local authorities compliance, and physical location coordinates of Star Class premises.</p>
              </div>

              <form onSubmit={handlePremisesSubmit} className="hcr-premises-form">
                <div className="hcr-form-grid">
                  {/* Address Textarea */}
                  <div className="form-group hcr-grid-span-2">
                    <label className="hcr-form-label">Exact Premise Delivery Address *</label>
                    <textarea
                      rows="2"
                      value={premisesForm.premiseAddress}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, premiseAddress: e.target.value }))}
                      className="textarea-box"
                      placeholder="Enter licensed delivery area location"
                    />
                    {premisesErrors.premiseAddress && <span className="hcr-field-error"> {premisesErrors.premiseAddress}</span>}
                  </div>

                  {/* Pincode */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Delhi Area Pin Code *
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={premisesForm.pincode}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, pincode: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. 110037"
                    />
                    {premisesErrors.pincode && <span className="hcr-field-error">{premisesErrors.pincode}</span>}
                  </div>

                  {/* MCD Certificate Id */}
                  <div className="form-group">
                    <label className="hcr-form-label">MCD Trade Clearance Registration ID *</label>
                    <input
                      type="text"
                      value={premisesForm.mcdTradeLicenseNum}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, mcdTradeLicenseNum: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. MCD-889-HCR"
                    />
                    {premisesErrors.mcdTradeLicenseNum && <span className="hcr-field-error">{premisesErrors.mcdTradeLicenseNum}</span>}
                  </div>

                  {/* Affirmations toggles */}
                  <div className="hcr-declaration-section">
                    <div className="hcr-checkbox-row">
                      <input
                        id="nocFire"
                        type="checkbox"
                        checked={premisesForm.hasFireNoc}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasFireNoc: e.target.checked }))}
                        className="hcr-checkbox"
                      />
                      <label htmlFor="nocFire" className="hcr-checkbox-label">
                        Certified Fire Security NOC: Confirm that local Fire Department audit and escape routes have been authorized for Star service class layout.
                      </label>
                    </div>

                    <div className="hcr-checkbox-row">
                      <input
                        id="taxAff"
                        type="checkbox"
                        checked={premisesForm.hasTaxCompliance}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasTaxCompliance: e.target.checked }))}
                        className="hcr-checkbox"
                      />
                      <label htmlFor="taxAff" className="hcr-checkbox-label">
                        Pro-rata Tax Affirmation: Confirm that all municipal taxes, commercial levies, and excise excise dues for the property have been settled.
                      </label>
                    </div>

                    <div className="hcr-checkbox-row">
                      <input
                        id="policyChecked"
                        type="checkbox"
                        checked={premisesForm.declarationsChecked}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, declarationsChecked: e.target.checked }))}
                        className="hcr-checkbox"
                      />
                      <label htmlFor="policyChecked" className="hcr-checkbox-label hcr-checkbox-label-required">
                        I hereby declare and affirm that the locations structural maps are verified, compliant with municipal norms and I accept absolute liability for regulatory deviation.
                        <span className="hcr-required">*</span>
                      </label>
                    </div>
                    {premisesErrors.declarationsChecked && <span className="hcr-field-error">{premisesErrors.declarationsChecked}</span>}
                  </div>
                </div>

                {/* Back and Continue */}
                <div className="hcr-step-navigation">
                  <button type="button" onClick={() => setCurrentStep(5)} className="btn btn-secondary">
                    <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                    <span>Go Back</span>
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <span>Proceed to Documents</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 7: DOCUMENTS & UPLOADS */}
          {currentStep === 7 && (
            <div className="hcr-step-card animate-fade">

              <div className="hcr-step-card-header">
                <h3 className="hcr-step-card-title">
                  <Upload className="hcr-step-card-icon" />
                  <span className="font-sans">Step 7: Compliance Documentation Upload</span>
                </h3>

                <p className="hcr-step-card-description font-sans">
                  Upload verified legislative documents to authorize the
                  digital privilege card generation.
                </p>
              </div>

              <div className="hcr-document-grid">
                {/* Custom upload slots */}
                {[
                  { key: 'fireNocDoc', title: 'Fire NOC Certificate', desc: 'Authorized PDF file copy under DFS Delhi agency.' },
                  { key: 'mcdTradeDoc', title: 'MCD Health & Trade License', desc: 'Valid municipal certificate scan copy.' },
                  { key: 'vatRegDoc', title: 'VAT / GST Commercial registration', desc: 'Signed tax invoice or portal filing document.' },
                  { key: 'identityProof', title: 'Director ID Proof copy', desc: 'Certified Aadhar / PAN / Board Resolution copy.' }
                ].map(doc => {
                  return (
                    <div key={doc.key} className="hcr-document-card">
                      <div>
                        <h4 className="hcr-document-title">
                          {doc.title}
                        </h4>

                        <p className="hcr-document-description">
                          {doc.desc}
                        </p>
                      </div>

                      {/* Fake upload simulation field */}
                      <div className="hcr-upload-box">
                        <span className="hcr-upload-filename">
                          {documents[doc.key]
                            ? documents[doc.key]
                            : "No document uploaded yet"}
                        </span>

                        {documents[doc.key] ? (
                          <button
                            onClick={() =>
                              setDocuments(prev => ({
                                ...prev,
                                [doc.key]: null
                              }))
                            }
                            className="hcr-remove-upload-btn"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setDocuments(prev => ({
                                ...prev,
                                [doc.key]: `excise_attachment_${doc.key}.pdf`
                              }));
                              triggerToast(`${doc.title} uploaded successfully!`);
                            }}
                            className="hcr-upload-btn"
                          >
                            Upload PDF
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative prompt */}
              <div className="hcr-info-alert">
                <Info className="hcr-info-alert-icon" />

                <p className="hcr-info-alert-text">
                  <strong>Verification SLA Notice:</strong> Uploading dummy or
                  invalid documents will result in instant rejection of the
                  applicant dossier by physical auditing officers. Review details
                  before remitting file fees.
                </p>
              </div>

              {/* Back and Submit Application actions */}
              <div className="hcr-submit-actions">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="btn btn-success"
                >
                  <FileCheck className="hcr-nav-icon hcr-nav-icon-right" />
                  <span>Register & File Application</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: RECEIPT SUCCESS DETAIL CARD (HIGH POLISH) */}
          {currentStep === 8 && successReceipt && (
            <div className="hcr-success-card">
              <div className="hcr-success-icon-wrapper">
                <Check className="hcr-success-icon" />
                <span className="hcr-success-ring"></span>
              </div>

              <div className="hcr-success-content">
                <h2 className="hcr-success-title">
                  HCR Application Filed Successfully
                </h2>
                <p className="hcr-success-description">
                  Excise privilege dossier generated for category  <span className="hcr-success-license">{successReceipt.licenseId}</span>. Associated brand parameters have been logged and locked for municipal clearance.
                </p>
              </div>

              {/* Structured Receipt Info */}
              <div className="hcr-receipt-card">
                <div className="hcr-receipt-header">
                  <span className="hcr-receipt-title">Dossier Docket Record</span>
                  <span className="hcr-receipt-status"> PENDING INSPECT </span>
                </div>

                <div className="hcr-receipt-grid">
                  <div className="hcr-receipt-item">
                    <span className="hcr-receipt-label"> File Reference No </span>
                    <span className="hcr-receipt-value hcr-receipt-reference"> {successReceipt.applicationNo} </span>
                  </div>
                  <div className="hcr-receipt-item">
                    <span className="hcr-receipt-label"> License Class </span>
                    <span className="hcr-receipt-value hcr-receipt-license">{successReceipt.licenseId} Premium Class </span>
                  </div>
                  <div className="hcr-receipt-item">
                    <span className="hcr-receipt-label"> Filing Timestamp </span>
                    <span className="hcr-receipt-value"> {successReceipt.date} </span>
                  </div>
                  <div className="hcr-receipt-item">
                    <span className="hcr-receipt-label"> Linked Liquor Brand </span>
                    <span className="hcr-receipt-value hcr-receipt-brand-count"> {successReceipt.brandsCount} Registered </span>
                  </div>
                  <div className="hcr-receipt-item hcr-receipt-item-full">
                    <span className="hcr-receipt-label"> Structure Premise Address </span>
                    <span className="hcr-receipt-address"> {successReceipt.address} (Pincode: {successReceipt.pincode}) </span>
                  </div>
                </div>
              </div>

              {/* Success primary buttons */}
              <div className="hcr-success-actions">
                <button onClick={onBackToDashboard} className="hcr-btn-secondary">
                  Return to Portal Home
                </button>
                <button onClick={() => {
                  showToast("Excise Star Classified Docket receipt generated and saved!");
                }}
                  className="hcr-btn-download"
                >
                  Download Docket Summary Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div >
    </div >
  );
}
