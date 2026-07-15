import React, { useState, useEffect, useMemo } from "react";
import { 
  Building, 
  Warehouse, 
  Wine, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  ArrowRight,
  Plus,
  Trash2,
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sliders,
  Boxes,
  X,
  Lock,
  Anchor,
  FileText,
  Tag as TagIcon
} from "lucide-react";
import SelectWholesaleType from "./SelectWholesale";
import ApplicantDetails from "../../../components/Applicant_Details";
import { createApplicant } from "../../../Model/Applicant";


//import { SelectWholesaleType } from "./SelectWholesale";

import L1AndL31License from "./L1_L31License";
import L1FAndL31License from "./L1F_L32License";




const brandCodeOptions = [
  { value: 'BC-WS-IMFL-101', label: 'BC-WS-IMFL-101 (Import Class)' },
  { value: 'BC-WS-IMFL-102', label: 'BC-WS-IMFL-102 (Standard Bulk)' },
  { value: 'BC-WS-IMFL-103', label: 'BC-WS-IMFL-103 (Warehouse Premium)' },
  { value: 'BC-WS-CL-301', label: 'BC-WS-CL-301 (Country Spirit Standard)' }
];

const kindOfLiquorOptions = {
  'Indian Liquor': [
    { value: 'Indian Made Foreign Liquor (IMFL)', label: 'Indian Made Foreign Liquor (IMFL)' },
    { value: 'Foreign Liquor (Imported FL)', label: 'Foreign Liquor (Imported FL)' },
    { value: 'Beer (Domestic)', label: 'Beer (Domestic)' },
    { value: 'Beer (Imported/Premium)', label: 'Beer (Imported/Premium)' }
  ],
  'Country Liquor': [
    { value: 'Country Spirit (Plain)', label: 'Country Spirit (Plain)' },
    { value: 'Country Spirit (Spiced)', label: 'Country Spirit (Spiced)' }
  ]
};

const liquorTypeOptions = {
  'Indian Made Foreign Liquor (IMFL)': [
    { value: 'Whisky Premium', label: 'Whisky Premium' },
    { value: 'Rum Golden', label: 'Rum Golden' },
    { value: 'Vodka Select', label: 'Vodka Select' }
  ],
  'Foreign Liquor (Imported FL)': [
    { value: 'Scotch Double Aged', label: 'Scotch Double Aged' },
    { value: 'Cognac VSOP', label: 'Cognac VSOP' }
  ],
  'Beer (Domestic)': [
    { value: 'Strong Premium', label: 'Strong Premium' },
    { value: 'Mild Pilsner', label: 'Mild Pilsner' }
  ],
  'Beer (Imported/Premium)': [
    { value: 'Lager Crown Class', label: 'Lager Crown Class' }
  ],
  'Country Spirit (Plain)': [
    { value: 'Plain Spirit 36°', label: 'Plain Spirit 36° Proof' }
  ],
  'Country Spirit (Spiced)': [
    { value: 'Spiced Elixir 50°', label: 'Spiced Elixir 50° Proof' }
  ]
};

export default function WholesaleLicenseWizard({ onBackToDashboard, showToast, rootData = {} }) {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedLicenseId, setSelectedLicenseId] = useState("");
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [associatedBrands, setAssociatedBrands] = useState([]);
  const [toast, setToast] = useState(null);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [applicant, setApplicant] = useState(createApplicant());
  const [ownerTypes, setOwnerTypes] = useState([]);
  // Brand form state
  const [brandForm, setBrandForm] = useState({
    category: 'Indian Liquor',
    kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
    liquorType: 'Whisky Premium',
    oldBrandId: '',
    brandCode: 'BC-WS-IMFL-101',
    measure: '750 Ml',
    brandName: ''
  });
  const [brandFormErrors, setBrandFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('brandName');
  const [sortDirection, setSortDirection] = useState('asc');

  const [licenseGroups, setLicenseGroups] = useState([]);

  // Warehouse physical premise details
  const [premisesForm, setPremisesForm] = useState({
    warehouseAddress: "Plot C4, Okhla Industrial Area Phase-III, Commercial Warehouse Hub, New Delhi",
    mcdTradeLicenseNum: "MCD-WHOLESALE-2910-DEL",
    pincode: "110020",
    warehouseSqFeet: "12500",
    hasFireSprinklers: true,
    hasCctvCoverage: true,
    declarationsChecked: false
  });
  const [premisesErrors, setPremisesErrors] = useState({});

  // Documents
  const [documents, setDocuments] = useState({
    fireSafetyAudit: null,
    bondedLogisticsClearance: null,
    incorporationCertificate: null,
    exciseBondReceipt: null
  });


const handleApplicantChange = (field, value) => {
  setApplicant((prev) => ({
    ...prev,
    [field]: value,
  }));
};

useEffect(() => {
  if (!applicant.ownerType) return;

  fetchLicenseCategories();
}, [applicant.ownerType]);

const fetchLicenseCategories = async () => {
  debugger;
  try {
    const res = await fetch(
      "http://localhost:5214/api/LiquorMaster/GetWholesaleLicenseeCategory"
    );

    const data = await res.json();

    console.log(data);

    setLicenseGroups(data);
  } catch (err) {
    console.log(err);
  }
};

console.log("OwnerType:", applicant?.ownerType);
console.log("SelectedLicenseId:", selectedLicenseId);


useEffect(() => {
  console.log("Calling OwnerType API...");

  fetch("http://localhost:5214/api/LGDiretory/GetOwnerTypes")
    .then((res) => {
      console.log("Status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("OwnerTypes:", data);
      setOwnerTypes(data);
    })
    .catch((err) => console.error("API Error:", err));
}, []);




  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const steps = [
    { num: 1, label: "Basic Details", sub: "Done" },
    { num: 2, label: "License Category", sub: "Done" },
    { num: 3, label: "Select License", sub: "Wholesale Selection" },
    { num: 4, label: "Brand Register", sub: "Supply Inventory" },
    { num: 5, label: "Warehouse Premise", sub: "Security & Size" },
    { num: 6, label: "Bond Documents", sub: "Excise File Uploads" },
    { num: 7, label: "Submit & Pay", sub: "Filing Receipt" }
  ];

  const handleSaveBrand = (e) => {
    e.preventDefault();
    const errors = {};

    if (!brandForm.brandName || brandForm.brandName.trim() === '') {
      errors.brandName = 'Please enter a valid brand trademark name';
    }

    if (Object.keys(errors).length > 0) {
      setBrandFormErrors(errors);
      triggerToast('Verify brand form fields.', 'error');
      return;
    }

    const newBrand = {
      id: `WS-BL-${Math.floor(1000 + Math.random() * 9000)}`,
      brandName: brandForm.brandName.toUpperCase().trim(),
      category: brandForm.category,
      kindOfLiquor: brandForm.kindOfLiquor,
      liquorType: brandForm.liquorType,
      oldBrandId: brandForm.oldBrandId || 'N/A',
      brandCode: brandForm.brandCode,
      measure: brandForm.measure || '750 Ml',
      status: 'Associated'
    };

    setAssociatedBrands(prev => [newBrand, ...prev]);
    setBrandForm({
      category: 'Indian Liquor',
      kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
      liquorType: 'Whisky Premium',
      oldBrandId: '',
      brandCode: 'BC-WS-IMFL-101',
      measure: '750 Ml',
      brandName: ''
    });
    setBrandFormErrors({});
    triggerToast('Bulk Brand successfully mapped to the wholesale distribution dossier.');
  };

  const handleRemoveBrand = (id) => {
    setAssociatedBrands(prev => prev.filter(b => b.id !== id));
    triggerToast('Brand association unlinked.', 'info');
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    const kindDefault = cat === 'Country Liquor' ? 'Country Spirit (Plain)' : 'Indian Made Foreign Liquor (IMFL)';
    const typeDefault = cat === 'Country Liquor' ? 'Plain Spirit 36°' : 'Whisky Premium';
    setBrandForm(prev => ({
      ...prev,
      category: cat,
      kindOfLiquor: kindDefault,
      liquorType: typeDefault
    }));
  };

  const handleKindChange = (e) => {
    const kind = e.target.value;
    const list = liquorTypeOptions[kind] || [];
    const typeDefault = list.length > 0 ? list[0].value : '';
    setBrandForm(prev => ({
      ...prev,
      kindOfLiquor: kind,
      liquorType: typeDefault
    }));
  };

  // Filter linked brands for view
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
    return result;
  }, [associatedBrands, searchTerm]);

  // Validate Step 5
  const handlePremisesSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!premisesForm.warehouseAddress.trim()) {
      errors.warehouseAddress = "Standard commercial storage parcel address is required";
    }
    if (!premisesForm.pincode.trim() || premisesForm.pincode.length !== 6) {
      errors.pincode = "Input valid 6-digit Delhi Pin code";
    }
    if (!premisesForm.warehouseSqFeet || Number(premisesForm.warehouseSqFeet) < 500) {
      errors.warehouseSqFeet = "Bonded Warehouse space must be at least 500 Sq. Ft";
    }
    if (!premisesForm.declarationsChecked) {
      errors.declarationsChecked = "You must confirm strict compliance terms";
    }

    if (Object.keys(errors).length > 0) {
      setPremisesErrors(errors);
      triggerToast('Please clarify warehouse layout constraints.', 'error');
      return;
    }

    setPremisesErrors({});
    setCurrentStep(6);
  };

  // Submit & Get Receipt
  const handleFinalSubmit = () => {
    const applicationNo = `AP-WHOLESALE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReceipt({
      applicationNo,
      licenseId: selectedLicenseId,
      fee: selectedLicenseId.startsWith("L-1") ? "₹ 8,50,000" : "₹ 4,20,000",
      date: new Date().toLocaleDateString('en-IN'),
      brandsCount: associatedBrands.length,
      address: premisesForm.warehouseAddress,
      sqFeet: premisesForm.warehouseSqFeet,
      pincode: premisesForm.pincode
    });
    setCurrentStep(7);
    showToast("Wholesale Vend Privileges application docket registered!");
  };
console.log("Parent ownerType:", applicant.ownerType);
console.log("Parent catCode:", selectedLicenseId);
if (selectedLicenseId === "10" && currentStep > 3) {
  return (
<L1AndL31License
  ownerType={applicant.ownerType}
  catCode={selectedLicenseId}
  onBackToSelect={() => {
    setSelectedLicenseId("");
    setCurrentStep(3);
  }}
  showToast={showToast || triggerToast}
/>
  );
}

if (selectedLicenseId === "16" && currentStep > 3) {
  return (
<L1FAndL31License
  ownerType={applicant.ownerType}
  catCode={selectedLicenseId}
  onBackToSelect={() => {
    setSelectedLicenseId("");
    setCurrentStep(3);
  }}
  showToast={showToast || triggerToast}
/>
  );
}










  return (
    <div className="wholesale-page">
      
      {/* Internal Custom Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl transition-all border transform translate-y-0 animate-bounce duration-300 ${
          toast.type === 'success' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
          toast.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
          'bg-slate-50 text-slate-800 border-slate-200'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-3 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="wholesale-container">
        
        {/* Step Wizard Row */}
        {currentStep < 7 && (
          <div className="wizard-container">
            <div className="wizard-step">
              
              {/* Connector line */}
              <div className="absolute top-5 left-0 right-0 -translate-y-1/2 h-[2px] bg-slate-100 z-0 px-12">
                <div 
                  className="h-full bg-purple-600 transition-all duration-300" 
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps.map((st) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <div key={st.num} className="flex flex-col items-center flex-1 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs border-2 transition ${
                      isCompleted ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-50" :
                      isActive ? "bg-purple-700 border-purple-700 text-white shadow-md shadow-purple-50 scale-110" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <span>{st.num}</span>}
                    </div>
                    <span className={`text-[11px] font-extrabold mt-2 whitespace-nowrap ${
                      isActive ? "text-purple-700" : isCompleted ? "text-emerald-700" : "text-slate-500"
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

        {/* Wizard Main Content body */}
        <div className="min-h-[450px]">
          
          {/* STEP 3: SELECT WHOLESALE LICENSE TYPE */}
          {currentStep === 3 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
<SelectWholesaleType
  applicant={applicant}
  onChange={handleApplicantChange}
  licenseGroups={licenseGroups}
  selectedType={selectedLicenseId}
  ownerTypes={ownerTypes}
  onSelectType={(id) => {
  setSelectedLicenseId(id);
  setCurrentStep(4);
}}
  onBack={onBackToDashboard}
/>
              
              {/* Continue button row */}
              <div className="flex items-center justify-end mt-8 pt-6 border-t border-slate-100">
<div className="flex items-center justify-end mt-8 pt-6 border-t border-slate-100">
  <button
    onClick={() => {
      if (!applicant?.ownerType) {
        alert("Please select Owner Type");
        return;
      }

      if (!selectedLicenseId) {
        alert("Please select License Type");
        return;
      }

      setCurrentStep(4);
    }}
    className="btn btn-primary bg-purple-700 hover:bg-purple-800 px-8 py-3.5"
  >
    <span>Continue Application</span>
    <ArrowRight className="w-4 h-4 ml-1.5" />
  </button>
</div>
              </div>
            </div>
          )}

          {/* STEP 4: WHOLESALE BRAND ASSOCIATION */}
          {currentStep === 4 && (
            <div className="text-left">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 4: Wholesale Packaged Liquor Category Registration</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Register bottle bulk metrics and safety trademarks associated with Wholesale License class {selectedLicenseId}.</p>
                </div>
                <div className="text-xs font-bold text-purple-700 bg-purple-50 py-1.5 px-3.5 rounded-full mt-2 sm:mt-0 max-w-max">
                  Selected Privilege: <span className="font-extrabold">{selectedLicenseId}</span>
                </div>
              </div>

              {/* Form Input elements wrapper */}
              <div className="brand-card">
                <div className="flex items-center gap-2 mb-6">
                  <TagIcon className="w-5 h-5 text-purple-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Add Wholesale Brand Particulars</h3>
                </div>

                <form onSubmit={handleSaveBrand} className="space-y-6">
                  <div className="form-grid">
                    
                    {/* Category */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Liquor Category *</label>
                      <select
                        value={brandForm.category}
                        onChange={handleCategoryChange}
                        className="select-box"
                      >
                        <option value="Indian Liquor">Indian Liquor</option>
                        <option value="Country Liquor">Country Liquor</option>
                      </select>
                    </div>

                    {/* Kind of Liquor */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Kind of Liquor</label>
                      <select
                        value={brandForm.kindOfLiquor}
                        onChange={handleKindChange}
                        className="select-box"
                      >
                        {kindOfLiquorOptions[brandForm.category]?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Liquor Type */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Liquor Specific Type</label>
                      <select
                        value={brandForm.liquorType}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, liquorType: e.target.value }))}
                        className="select-box"
                      >
                        {liquorTypeOptions[brandForm.kindOfLiquor]?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Old Brand ID */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Old Brand ID Reference</label>
                      <input 
                        type="text"
                        placeholder="e.g. OLD-WS-993"
                        value={brandForm.oldBrandId}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, oldBrandId: e.target.value }))}
                        className="input-box"
                      />
                    </div>

                    {/* Brand Code */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Wholesale Brand Code</label>
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

                    {/* Measure size */}
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Packaging Measure (Ml)</label>
                      <input 
                        type="text"
                        placeholder="e.g. 750 Ml"
                        value={brandForm.measure}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, measure: e.target.value }))}
                        className="input-box"
                      />
                    </div>

                    {/* Brand Name */}
                    <div className="form-group full-width">
                      <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Registered Brand Trade Name *</label>
                      <textarea
                        rows="2"
                        placeholder="Enter full legislative brand name (e.g. GLENFIDDICH 12 SINGLE MALT SCOTCH)"
                        value={brandForm.brandName}
                        onChange={(e) => setBrandForm(prev => ({ ...prev, brandName: e.target.value }))}
                        className="textarea-box"
                      />
                      {brandFormErrors.brandName && (
                        <span className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {brandFormErrors.brandName}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Actions inside Step 4 */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setBrandForm({
                        category: 'Indian Liquor',
                        kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)',
                        liquorType: 'Whisky Premium',
                        oldBrandId: '',
                        brandCode: 'BC-WS-IMFL-101',
                        measure: '750 Ml',
                        brandName: ''
                      })}
                      className="secondary-btn"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Form</span>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary bg-purple-700 hover:bg-purple-800"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Brand to Docket</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Brands linked status table */}
              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span>Wholesale Associated Brands</span>
                      <span className="bg-purple-100 text-purple-800 text-[10px] py-0.5 px-2.5 rounded-full font-black">
                        {associatedBrands.length} Brands Listed
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Physical distribution batches require validation of each code prior to state excise custom transit passes creation.</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Search listed brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                  />
                </div>

                {filteredBrands.length === 0 ? (
                  <div className="empty-state">
                    <Sliders className="w-10 h-10 text-slate-300 mx-auto mb-3 animate-pulse" />
                    <p className="font-bold text-sm text-slate-700">No records available. Please add a brand above.</p>
                    <p className="text-xs text-slate-400 mt-1">Fill out the brand registration inputs above to attach authorized supplies to your wholesale profile.</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Brand ID</th>
                          <th>Brand Code</th>
                          <th>Brand Name</th>
                          <th>Specific Liquor Type</th>
                          <th>Packaging Size</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBrands.map(b => (
                          <tr key={b.id} className="hover:bg-slate-50/50 transition">
                            <td className="font-mono text-xs font-bold text-purple-700">{b.id}</td>
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
                                Link Saved
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

              {/* Proceed Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="secondary-btn"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Go Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (associatedBrands.length === 0) {
                      triggerToast("You should map at least 1 brand to proceed optimally.", "info");
                    }
                    setCurrentStep(5);
                  }}
                  className="btn btn-primary bg-purple-700 hover:bg-purple-800"
                >
                  <span>Proceed to Warehouse Details</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: WAREHOUSE DETAILS */}
          {currentStep === 5 && (
            <div className="wizard-content">
              <div className="border-b border-slate-100 pb-4 mb-6 text-left">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-purple-700" />
                  <span>Step 5: Warehouse Hub Physical Specs</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Specify layout dimensions, local authorities compliance, and physical location coordinates of Star Class premises.</p>
              </div>

              <form onSubmit={handlePremisesSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Exact Warehouse Address */}
                  <div className="form-group md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Exact Physical Warehouse Address *</label>
                    <textarea
                      rows="2"
                      value={premisesForm.warehouseAddress}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, warehouseAddress: e.target.value }))}
                      className="textarea-box"
                      placeholder="Enter licensed bulk depot layout address"
                    />
                    {premisesErrors.warehouseAddress && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.warehouseAddress}</span>}
                  </div>

                  {/* Area pin code */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Delhi Area Pin Code *</label>
                    <input 
                      type="text"
                      maxLength="6"
                      value={premisesForm.pincode}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, pincode: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. 110020"
                    />
                    {premisesErrors.pincode && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.pincode}</span>}
                  </div>

                  {/* Bonded Area Area space size */}
                  <div className="form-group">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Bonded Warehouse Covered Area Size (Sq. Ft) *</label>
                    <input 
                      type="number"
                      value={premisesForm.warehouseSqFeet}
                      onChange={(e) => setPremisesForm(prev => ({ ...prev, warehouseSqFeet: e.target.value }))}
                      className="input-box"
                      placeholder="e.g. 12500"
                    />
                    {premisesErrors.warehouseSqFeet && <span className="text-xs text-rose-600 font-bold mt-1">{premisesErrors.warehouseSqFeet}</span>}
                  </div>

                  {/* Checklist options */}
                  <div className="md:col-span-2 border-t border-slate-100 pt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <input 
                        id="sprinklers"
                        type="checkbox"
                        checked={premisesForm.hasFireSprinklers}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasFireSprinklers: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-purple-600 cursor-pointer"
                      />
                      <label htmlFor="sprinklers" className="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none">
                        Certified Fire Sprinklers Audit: Confirm that industrial heavy water-cascade fire extinguishers are functional.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        id="cctv"
                        type="checkbox"
                        checked={premisesForm.hasCctvCoverage}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, hasCctvCoverage: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-purple-600 cursor-pointer"
                      />
                      <label htmlFor="cctv" className="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none">
                        Excise CCTV feed linkage: Confirm full 24x7 security surveillance feeds are linkable to Delhi Excise monitoring desks.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        id="policyChecked"
                        type="checkbox"
                        checked={premisesForm.declarationsChecked}
                        onChange={(e) => setPremisesForm(prev => ({ ...prev, declarationsChecked: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-purple-600 cursor-pointer"
                      />
                      <label htmlFor="policyChecked" className="text-xs font-bold text-slate-800 leading-relaxed cursor-pointer select-none">
                        I hereby declare that this high volume distribution terminal is compliant with state fire & logistics guidelines. <span className="text-rose-600">*</span>
                      </label>
                    </div>
                    {premisesErrors.declarationsChecked && <span className="text-xs text-rose-600 font-bold block mt-1">{premisesErrors.declarationsChecked}</span>}
                  </div>

                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="secondary-btn"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1.5" />
                    <span>Go Back</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary bg-purple-700 hover:bg-purple-800"
                  >
                    <span>Proceed to Bond Files</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 6: DOCUMENTS & FILE UPLOADS */}
          {currentStep === 6 && (
            <div className="wizard-content">
              <div className="border-b border-slate-100 pb-4 mb-6 text-left">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-700" />
                  <span>Step 6: Bonded Warehouse Security Documentation</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Upload verified legislative documents to authorize the digital privilege card generation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  { key: 'fireSafetyAudit', title: 'DFS Industrial Fire Audit', desc: 'Authorized structural safety document with safety blueprints.' },
                  { key: 'bondedLogisticsClearance', title: 'Bonded Warehouse clearance', desc: 'Permit map authorized by local logistics directorate.' },
                  { key: 'incorporationCertificate', title: 'Company Registration Certificate', desc: 'Valid MCA incorporation file scan copy.' },
                  { key: 'exciseBondReceipt', title: 'Excise Security Bond Receipt', desc: 'Signed receipt scan copy for security deposit.' }
                ].map((doc) => {
                  return (
                    <div key={doc.key} className="p-5 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{doc.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 font-semibold">{doc.desc}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4 bg-white border border-slate-200 p-2.5 rounded-xl">
                        <span className="text-[11px] text-slate-500 font-bold truncate">
                          {documents[doc.key] ? documents[doc.key] : "No file attached yet"}
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
                              setDocuments(prev => ({ ...prev, [doc.key]: `bonded_attachment_${doc.key}.pdf` }));
                              triggerToast(`${doc.title} uploaded successfully!`);
                            }}
                            className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-purple-100 hover:bg-purple-100 transition cursor-pointer shrink-0"
                          >
                            Upload PDF
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative prompt notice */}
              <div className="blue-info-alert mt-6 text-left">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Verification SLA Notice:</strong> Industrial wholesale licenses require up to 14 working days of back-end verifications. Ensure all uploaded company tax structures precisely match corporate registers.
                </p>
              </div>

              {/* Back and submit */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="continue-btn-icon"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Go Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="btn btn-primary bg-purple-700 hover:bg-purple-800"
                >
                  <FileCheck className="w-4 h-4 mr-1.5" />
                  <span>Register & File Bulk Application</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: RECEIPTS OR FINALS MATCHING HIGH END DESIGN */}
          {currentStep === 7 && successReceipt && (
              <div className="success-container">
                <div className="success-icon-wrapper">
                <Check className="success-check-icon" />
                <span className="success-ring"></span>
              </div>
              
              <div className="success-header">
                <h2 className="success-title">
                  Wholesale Privilege Filed Successfully
                </h2>
              <p className="success-description">
                  Excise bulk supply docket generated for category 
              <span className="success-license">{successReceipt.licenseId}</span>. Warehouse coordinates have been registered.
                </p>
              </div>

              {/* Structured Docket summary */}
               <div className="docket-card">
                  <div className="docket-header">
                  <span className="docket-title">Dossier Docket Record</span>
                  <span className="docket-status"> PENDING INSPECT </span>
                </div>

                <div className="docket-grid">
                  <div>
                    <span className="docket-label">File Reference No</span>
                    <span className="docket-value docket-mono">{successReceipt.applicationNo}</span>
                  </div>
                  <div>
                    <span className="docket-label">License Class</span>
                    <span className="docket-license"> {successReceipt.licenseId} Wholesale </span>
                  </div>
                  <div>
                    <span className="docket-label">Filing Timestamp</span>
                    <span className="docket-value">{successReceipt.date}</span>
                  </div>
                          <div>
          <span className="docket-label">Linked Liquor Brands</span>
          <span className="docket-brand-count">
            {successReceipt.brandsCount} Registered
          </span>
        </div>

        <div>
          <span className="docket-label">Warehouse Size</span>
          <span className="docket-value">
            {successReceipt.sqFeet} Sq. Ft
          </span>
        </div>

        <div>
          <span className="docket-label">Initial Deposit Fee</span>
          <span className="docket-fee">
            {successReceipt.fee}
          </span>
        </div>

        <div className="full-width">
          <span className="docket-label">
            Facility Layout Location
          </span>

          <span className="docket-address">
            {successReceipt.address}
            (Pincode: {successReceipt.pincode})
          </span>
        </div>
                </div>
              </div>

              {/* Actions row */}
              <div className="receipt-actions">
                <button
                  onClick={onBackToDashboard}
                  className="btn-home"
                >
                  Return to Portal Home
                </button>
                <button
                  onClick={() => {
                    showToast("Excise Wholesale Docket summary report saved!");
                  }}
                    className="btn-download"
                >
                  Download Corporate Docket Receipt
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
