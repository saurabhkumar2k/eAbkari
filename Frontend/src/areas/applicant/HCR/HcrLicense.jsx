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
import SelectLicenseType from "../components/SelectLicenseType";

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

  // HCR Brand associated state
  const [associatedBrands, setAssociatedBrands] = useState([]);

  // Brand registration sub-form state (inside step 4)
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

  // Premises Details States (inside step 5)
  const [premisesForm, setPremisesForm] = useState({
    premiseAddress: "Star Class Annex Area, Indira Gandhi Int'l Airport Runway, New Delhi",
    mcdTradeLicenseNum: "MCD-99120-DEL-HCR",
    pincode: "110037",
    hasFireNoc: true,
    hasTaxCompliance: true,
    declarationsChecked: false
  });
  const [premisesErrors, setPremisesErrors] = useState({});

  // Documents State (inside step 6)
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

  // Step names dictionary
  const steps = [
    { num: 1, label: "Basic Details", sub: "Done" },
    { num: 2, label: "License Category", sub: "Done" },
    { num: 3, label: "Select License", sub: "Active" },
    { num: 4, label: "Brand Registration", sub: "Liquor Brands" },
    { num: 5, label: "Premise Details", sub: "Safety / Address" },
    { num: 6, label: "Documents", sub: "Uploads" },
    { num: 7, label: "Review & Submit", sub: "Success Finalize" }
  ];

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
      if(aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if(aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
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
    if(!premisesForm.premiseAddress.trim()) {
      errors.premiseAddress = "Premises installation facility address cannot be blank";
    }
    if(!premisesForm.pincode.trim() || premisesForm.pincode.length !== 6) {
      errors.pincode = "Valid 6-digit Delhi Pin code required";
    }
    if(!premisesForm.mcdTradeLicenseNum.trim()) {
      errors.mcdTradeLicenseNum = "MCD Trade clearance certificate index ID required";
    }
    if(!premisesForm.declarationsChecked) {
      errors.declarationsChecked = "You must acknowledge structural policy terms";
    }

    if (Object.keys(errors).length > 0) {
      setPremisesErrors(errors);
      triggerToast('Please tick the affirmations and verify entry inputs.', 'error');
      return;
    }

    setPremisesErrors({});
    setCurrentStep(6);
  };

  // Final Action Filing
  const handleFinalSubmit = () => {
    // Submit creation success state
    const applicationNo = `AP-HCR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReceipt({
      applicationNo,
      licenseId: selectedLicenseId,
      fee: selectedLicenseId === "L-15" ? "₹ 3,25,000" : "₹ 2,80,000",
      date: new Date().toLocaleDateString('en-IN'),
      brandsCount: associatedBrands.length,
      address: premisesForm.premiseAddress,
      pincode: premisesForm.pincode
    });
    setCurrentStep(7);
    showToast("Excise Star Classified Restaurant Privilege Code application created!");
  };

  return (
    <div className="brand-registration-page select-none text-slate-800">
      
      {/* Toast Notifier */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl transition-all border transform translate-y-0 animate-bounce duration-300 ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toast.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-3 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex-grow">

        {/* Dynamic Wizard Steps Indicator Row (32px vertical separation from header) */}
        {currentStep < 7 && (
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 mb-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[700px] relative">
              {/* Connector dots bar */}
              <div className="absolute top-5 left-0 right-0 -translate-y-1/2 h-[2px] bg-slate-100 z-0 px-12">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300" 
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps.map((st, i) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <div key={st.num} className="flex flex-col items-center flex-1 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs border-2 transition ${
                      isCompleted ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-50" :
                      isActive ? "bg-blue-700 border-blue-700 text-white shadow-md shadow-blue-50 scale-110" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <span>{st.num}</span>}
                    </div>
                    <span className={`text-[11px] font-extrabold mt-2 whitespace-nowrap ${
                      isActive ? "text-blue-700" : isCompleted ? "text-emerald-700" : "text-slate-500"
                    }`}>
                      {st.label}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">{st.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP CONTROLLER CONTENT */}
        <div className="min-h-[450px]">
          
          {/* STEP 3: SELECT LICENSE TYPE */}
          {currentStep === 3 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <SelectLicenseType 
                selectedType={selectedLicenseId}
                onSelectType={(id) => setSelectedLicenseId(id)}
                onBack={onBackToDashboard}
                onContinue={() => setCurrentStep(4)}
              />
              
              {/* Active select step continue helper */}
              <div className="flex items-center justify-end mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary px-8 py-3.5"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: BRAND REGISTRATION / ASSOCIATION (THE DYNAMIC REQUESTED PAGE!) */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade text-left">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 4: Packaged Liquor Brand Association</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Register the wholesale/retail bottle codes and trademark names associated with this HCR License profile.</p>
                </div>
                <div className="text-xs font-bold text-blue-700 bg-blue-50 py-1.5 px-3.5 rounded-full mt-2 sm:mt-0 max-w-max">
                  Licence Chosen: <span className="font-extrabold">{selectedLicenseId}</span>
                </div>
              </div>

              {/* Glassmorphism Input Form Card */}
              <div className="brand-card">
                <div className="flex items-center gap-2 mb-6">
                  <TagIcon className="w-5 h-5 text-blue-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Add Brand Specifications</h3>
                </div>

                <form onSubmit={handleSaveBrand} className="space-y-6">
                  <div className="form-grid">
                    
                    {/* 1. Category Dropdown */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Liquor Category *</label>
                      <select 
                        value={brandForm.category}
                        onChange={handleBrandCategoryChange}
                        className="select-box"
                      >
                        <option value="">Select Category</option>
                        <option value="Country Liquor">Country Liquor</option>
                        <option value="Indian Liquor">Indian Liquor</option>
                      </select>
                    </div>

                    {/* 2. Kind of Liquor */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Kind of Liquor</label>
                      <select
                        value={brandForm.kindOfLiquor}
                        onChange={handleBrandKindChange}
                        className="select-box"
                      >
                        <option value="">Select Kind</option>
                        {kindOfLiquorOptions[brandForm.category]?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Liquor Type */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Liquor Type</label>
                      <select
                        value={brandForm.liquorType}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, liquorType: e.target.value }))}
                        className="select-box"
                      >
                        <option value="">Select Type</option>
                        {liquorTypeOptions[brandForm.kindOfLiquor]?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* 4. Old Brand ID */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Old Brand ID (Reference)</label>
                      <input 
                        type="text"
                        placeholder="e.g. OLD-EXC-4412"
                        value={brandForm.oldBrandId}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, oldBrandId: e.target.value }))}
                        className="input-box"
                      />
                    </div>

                    {/* 5. Brand Code */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Brand Code</label>
                      <select
                        value={brandForm.brandCode}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, brandCode: e.target.value }))}
                        className="select-box"
                      >
                        {brandCodeOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* 6. Measurment volume */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Quarts Measure</label>
                      <input
                        type="text"
                        placeholder="e.g. 750 Ml"
                        value={brandForm.measure}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, measure: e.target.value }))}
                        className="input-box"
                      />
                    </div>

                    {/* 7. Brand Name (Spanning Full width) */}
                    <div className="form-group full-width">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Brand Name *</label>
                      <textarea
                        rows="2"
                        placeholder="Enter full legislative trademark name (e.g. BACARDI WHITE SUPERIOR RUM)"
                        value={brandForm.brandName}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, brandName: e.target.value }))}
                        className="textarea-box"
                      />
                      {brandFormErrors.brandName && (
                        <span className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {brandFormErrors.brandName}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Add Brand Action Row */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Form</span>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary bg-indigo-700 hover:bg-indigo-800"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Brand to Profile</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* DYNAMIC REGISTERED BRANDS TABLE (Displayed since defaults to Indian/Country Liquor) */}
              <div className="table-card">
                
                <div className="table-header">
                  <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span>Brand Associations List</span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] py-0.5 px-2 rounded-full font-extrabold">
                        {associatedBrands.length} Associated
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Below are the custom entities registered for brand validation with Delhi Excise.</p>
                  </div>

                  {/* Simple live search box */}
                  <input
                    type="text"
                    placeholder="Search linked brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                  />
                </div>

                {/* Table Layout */}
                {filteredBrands.length === 0 ? (
                  <div className="empty-state">
                    <Sliders className="w-10 h-10 text-slate-300 mx-auto mb-3 animate-pulse" />
                    <p className="font-bold text-sm text-slate-700">No records available. Please search or add a brand.</p>
                    <p className="text-xs text-slate-400 mt-1">Fill the brand form fields above to attach brands to your star classification package.</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Brand ID</th>
                          <th>Brand Code</th>
                          <th>Brand Name</th>
                          <th>Liquor Type</th>
                          <th>Quarts Measure</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBrands.map(b => (
                          <tr key={b.id} className="hover:bg-slate-50/50 transition">
                            <td className="font-mono text-xs font-bold text-blue-700">{b.id}</td>
                            <td className="font-mono text-xs text-slate-600">{b.brandCode}</td>
                            <td>
                              <div className="flex flex-col">
                                <span className="font-bold text-xs text-slate-900">{b.brandName}</span>
                                <span className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">{b.category} / {b.kindOfLiquor}</span>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-800">{b.liquorType}</span>
                                <span className="text-[10px] text-slate-400">{b.kindOfLiquor.split(' (')[0]}</span>
                              </div>
                            </td>
                            <td className="font-mono text-xs text-slate-600">{b.measure}</td>
                            <td>
                              <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider py-1 px-2 rounded-md border border-emerald-100">
                                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                {b.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <button
                                onClick={() => handleRemoveBrand(b.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                                title="Remove associated brand"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Wizard navigation and proceed controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Go Back</span>
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if(associatedBrands.length === 0) {
                        triggerToast("Tip: Registering at least 1 brand is recommended, but you may proceed as draft.", "info");
                      }
                      setCurrentStep(5);
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Premises Details</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: PREMISE DETAILS */}
          {currentStep === 5 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6 text-left">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-700" />
                  <span>Step 5: Premise & Structural Layout Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Specify layout dimensions, local authorities compliance, and physical location coordinates of Star Class premises.</p>
              </div>

              <form onSubmit={handlePremisesSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address Textarea */}
                  <div className="form-group md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Exact Premise Delivery Address *</label>
                    <textarea
                      rows="2"
                      value={premisesForm.premiseAddress}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, premiseAddress: e.target.value }))}
                      className="textarea-box"
                      placeholder="Enter licensed delivery area location"
                    />
                    {premisesErrors.premiseAddress && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.premiseAddress}</span>}
                  </div>

                  {/* Pincode */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Delhi Area Pin Code *</label>
                    <input 
                      type="text"
                      maxLength="6"
                      value={premisesForm.pincode}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, pincode: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. 110037"
                    />
                    {premisesErrors.pincode && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.pincode}</span>}
                  </div>

                  {/* MCD Certificate Id */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">MCD Trade Clearance Registration ID *</label>
                    <input 
                      type="text"
                      value={premisesForm.mcdTradeLicenseNum}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, mcdTradeLicenseNum: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. MCD-889-HCR"
                    />
                    {premisesErrors.mcdTradeLicenseNum && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.mcdTradeLicenseNum}</span>}
                  </div>

                  {/* Affirmations toggles */}
                  <div className="md:col-span-2 border-t border-slate-100 pt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <input 
                        id="nocFire"
                        type="checkbox"
                        checked={premisesForm.hasFireNoc}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasFireNoc: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-blue-600 cursor-pointer"
                      />
                      <label htmlFor="nocFire" className="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none">
                        Certified Fire Security NOC: Confirm that local Fire Department audit and escape routes have been authorized for Star service class layout.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        id="taxAff"
                        type="checkbox"
                        checked={premisesForm.hasTaxCompliance}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasTaxCompliance: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-blue-600 cursor-pointer"
                      />
                      <label htmlFor="taxAff" className="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none">
                        Pro-rata Tax Affirmation: Confirm that all municipal taxes, commercial levies, and excise excise dues for the property have been settled.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        id="policyChecked"
                        type="checkbox"
                        checked={premisesForm.declarationsChecked}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, declarationsChecked: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-blue-600 cursor-pointer"
                      />
                      <label htmlFor="policyChecked" className="text-xs font-bold text-slate-800 leading-relaxed cursor-pointer select-none">
                        I hereby declare and affirm that the locations structural maps are verified, compliant with municipal norms and I accept absolute liability for regulatory deviation. <span className="text-rose-600">*</span>
                      </label>
                    </div>
                    {premisesErrors.declarationsChecked && <span className="text-xs text-rose-600 font-bold block mt-1">{premisesErrors.declarationsChecked}</span>}
                  </div>
                </div>

                {/* Back and Continue */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="btn btn-secondary"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1.5" />
                    <span>Go Back</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <span>Proceed to Documents</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 6: DOCUMENTS & UPLOADS */}
          {currentStep === 6 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6 text-left">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-700" />
                  <span>Step 6: Compliance Documentation Upload</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Upload verified legislative documents to authorize the digital privilege card generation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {/* Custom upload slots */}
                {[
                  { key: 'fireNocDoc', title: 'Fire NOC Certificate', desc: 'Authorized PDF file copy under DFS Delhi agency.' },
                  { key: 'mcdTradeDoc', title: 'MCD Health & Trade License', desc: 'Valid municipal certificate scan copy.' },
                  { key: 'vatRegDoc', title: 'VAT / GST Commercial registration', desc: 'Signed tax invoice or portal filing document.' },
                  { key: 'identityProof', title: 'Director ID Proof copy', desc: 'Certified Aadhar / PAN / Board Resolution copy.' }
                ].map(doc => {
                  return (
                    <div key={doc.key} className="p-5 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{doc.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 font-semibold">{doc.desc}</p>
                      </div>

                      {/* Fake upload simulation field */}
                      <div className="mt-4 flex items-center justify-between gap-4 bg-white border border-slate-200 p-2.5 rounded-xl">
                        <span className="text-[11px] text-slate-500 font-bold truncate">
                          {documents[doc.key] ? documents[doc.key] : "No document uploaded yet"}
                        </span>
                        
                        {documents[doc.key] ? (
                          <button
                            onClick={() => setDocuments(prev => ({ ...prev, [doc.key]: null }))}
                            className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setDocuments(prev => ({ ...prev, [doc.key]: `excise_attachment_${doc.key}.pdf` }));
                              triggerToast(`${doc.title} uploaded successfully!`);
                            }}
                            className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition cursor-pointer shrink-0"
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
              <div className="blue-info-alert mt-6 text-left">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Verification SLA Notice:</strong> Uploading dummy or invalid documents will result in instant rejection of the applicant dossier by physical auditing officers. Review details before remitting file fees.
                </p>
              </div>

              {/* Back and Submit Application actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Go Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="btn btn-primary bg-emerald-600 hover:bg-emerald-700"
                >
                  <FileCheck className="w-4 h-4 mr-1.5" />
                  <span>Register & File Application</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: RECEIPT SUCCESS DETAIL CARD (HIGH POLISH) */}
          {currentStep === 7 && successReceipt && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-8 animate-fade text-slate-800 select-none">
              <div className="relative w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
                <Check className="w-10 h-10 stroke-[3]" />
                <span className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-25"></span>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  HCR Application Filed Successfully
                </h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
                  Excise privilege dossier generated for category <span className="font-extrabold text-slate-800">{successReceipt.licenseId}</span>. Associated brand parameters have been logged and locked for municipal clearance.
                </p>
              </div>

              {/* Structured Receipt Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-sm max-w-lg mx-auto">
                <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-400 uppercase tracking-widest font-mono">Dossier Docket Record</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide uppercase">PENDING INSPECT</span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">File Reference No</span>
                    <span className="font-mono font-black text-slate-800 text-sm select-all">{successReceipt.applicationNo}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">License Class</span>
                    <span className="font-bold text-blue-700 text-sm">{successReceipt.licenseId} Premium Class</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Filing Timestamp</span>
                    <span className="font-bold text-slate-800 text-sm">{successReceipt.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Linked Liquor Brands</span>
                    <span className="font-extrabold text-blue-600 text-sm">{successReceipt.brandsCount} Registered</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Structure Premise Address</span>
                    <span className="font-semibold text-slate-600 text-xs block leading-relaxed">{successReceipt.address} (Pincode: {successReceipt.pincode})</span>
                  </div>
                </div>
              </div>

              {/* Success primary buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={onBackToDashboard}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer border-none"
                >
                  Return to Portal Home
                </button>
                <button
                  onClick={() => {
                    showToast("Excise Star Classified Docket receipt generated and saved!");
                  }}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition cursor-pointer border-none shadow-md"
                >
                  Download Docket Summary Receipt
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
