import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  X, 
  Save, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Sliders, 
  Layers, 
  Activity, 
  Hash, 
  Barcode, 
  GlassWater, 
  Tag as TagIcon, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  ChevronsUpDown,
  Filter,
  Download,
  Clock,
  Briefcase
} from 'lucide-react';

// Predefined Brand Data for dynamic dropdown options
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

// Initial brand dataset for simulation purposes
const INITIAL_BRANDS_POOL = [
  { id: 'BL-9812', oldBrandId: 'OLD-9122', brandCode: 'BC-EXC-DEL-001', brandName: 'SOLAN NO.1 RARE PREMIUM MALT', category: 'Indian Liquor', kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)', liquorType: 'Whisky', measure: '750 Ml', status: 'Approved', timestamp: 1711213010000 },
  { id: 'BL-4309', oldBrandId: 'OLD-2211', brandCode: 'BC-EXC-DEL-003', brandName: 'OLD MONK SUPREME XXX INTEGRITY RUM', category: 'Indian Liquor', kindOfLiquor: 'Indian Made Foreign Liquor (IMFL)', liquorType: 'Rum', measure: '750 Ml', status: 'Approved', timestamp: 1711213123000 },
  { id: 'BL-7756', oldBrandId: 'OLD-5012', brandCode: 'BC-EXC-DEL-002', brandName: 'DELHI DESI MASALA SPECIAL SPIRIT', category: 'Country Liquor', kindOfLiquor: 'Country Spirit (Spiced)', liquorType: 'Masala Premium 50°', measure: '375 Ml', status: 'Approved', timestamp: 1711213233000 },
  { id: 'BL-1209', oldBrandId: 'OLD-8041', brandCode: 'BC-EXC-DEL-004', brandName: 'GLENFIDDICH 12 YEARS SINGLE MALT SCOTCH', category: 'Indian Liquor', kindOfLiquor: 'Foreign Liquor (Imported FL)', liquorType: 'Single Malt Whisky', measure: '700 Ml', status: 'Active', timestamp: 1711213344000 },
  { id: 'BL-6081', oldBrandId: 'OLD-3877', brandCode: 'BC-EXC-DEL-005', brandName: 'BIRA 91 BOOM STRONG BEER LAGER', category: 'Indian Liquor', kindOfLiquor: 'Beer (Domestic)', liquorType: 'Strong Beer', measure: '650 Ml', status: 'Active', timestamp: 1711213455000 },
  { id: 'BL-8812', oldBrandId: 'OLD-0011', brandCode: 'BC-EXC-DEL-002', brandName: 'DELHI DHAMAKA DUMDAAR PLAIN GRADE', category: 'Country Liquor', kindOfLiquor: 'Country Spirit (Plain)', liquorType: 'Plain Spirit 36°', measure: '180 Ml', status: 'Approved', timestamp: 1711213566000 },
  { id: 'BL-3342', oldBrandId: 'OLD-3312', brandCode: 'BC-EXC-DEL-001', brandName: 'SULA SHIRAZ RED RESERVE COLLECTION', category: 'Indian Liquor', kindOfLiquor: 'Wine (Domestic)', liquorType: 'Shiraz Red Wine', measure: '750 Ml', status: 'Active', timestamp: 1711213677000 },
  { id: 'BL-9011', oldBrandId: 'OLD-4412', brandCode: 'BC-EXC-DEL-004', brandName: 'MOET & CHANDON IMPERIAL BRUT CHAMPAGNE', category: 'Indian Liquor', kindOfLiquor: 'Wine (Imported)', liquorType: 'Imported Champagne', measure: '750 Ml', status: 'Pending Approval', timestamp: 1711213788000 }
];

export default function LiquorBrandRegistration({ onNavigateHome }) {
  // Persistence state
  const [brandsList, setBrandsList] = useState(() => {
    const saved = localStorage.getItem('excise_brands_registry');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return []; // Empty initially as per requirements: "Initial State: Empty table body"
  });

  // Form State
  const [formData, setFormData] = useState({
    category: '',
    kindOfLiquor: '',
    liquorType: '',
    oldBrandId: '',
    brandCode: '',
    measure: '',
    brandName: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Table Filters & Sort Logic
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' | 'desc'
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Clear toast after 4s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sync to localStorage
  const saveToLocalStorage = (list) => {
    localStorage.setItem('excise_brands_registry', JSON.stringify(list));
  };

  // Toast trigger helper
  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Handle category change: resets kindOfLiquor & liquorType
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: value,
      kindOfLiquor: '',
      liquorType: ''
    }));
    setFormErrors(prev => ({ ...prev, category: '' }));
  };

  // Handle Kind of Liquor Change: resets liquorType
  const handleKindOfChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      kindOfLiquor: value,
      liquorType: ''
    }));
    setFormErrors(prev => ({ ...prev, kindOfLiquor: '' }));
  };

  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Load baseline samples for demonstration/easier interaction
  const loadDefaultSamples = () => {
    setBrandsList(INITIAL_BRANDS_POOL);
    saveToLocalStorage(INITIAL_BRANDS_POOL);
    setCurrentPage(1);
    showToastMsg('Baseline brand registries loaded successfully for simulation!', 'info');
  };

  // Form Reset
  const handleReset = () => {
    setFormData({
      category: '',
      kindOfLiquor: '',
      liquorType: '',
      oldBrandId: '',
      brandCode: '',
      measure: '',
      brandName: ''
    });
    setFormErrors({});
    showToastMsg('Brand registration form has been reset to defaults.', 'info');
  };

  // Form Cancel
  const handleCancel = () => {
    handleReset();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  // Form Validation and Submission
  const handleSave = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.category) {
      errors.category = 'Liquor category is highly required';
    }
    if (!formData.brandName || formData.brandName.trim() === '') {
      errors.brandName = 'Brand Name cannot be left blank';
    }
    
    // Additional validations
    if (formData.category) {
      if (!formData.kindOfLiquor) {
        errors.kindOfLiquor = 'Kind of liquor is required';
      }
      if (!formData.liquorType) {
        errors.liquorType = 'Liquor Specific Type is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg('Please check and fill the required fields highlights.', 'error');
      return;
    }

    // Create a new Brand entry
    const newId = `BL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBrandItem = {
      id: newId,
      oldBrandId: formData.oldBrandId || `N/A`,
      brandCode: formData.brandCode || 'BC-EXC-DEL-001',
      brandName: formData.brandName.trim().toUpperCase(),
      category: formData.category,
      kindOfLiquor: formData.kindOfLiquor,
      liquorType: formData.liquorType,
      measure: formData.measure ? formData.measure.trim() : '750 Ml',
      status: 'Active',
      timestamp: Date.now()
    };

    const updatedList = [newBrandItem, ...brandsList];
    setBrandsList(updatedList);
    saveToLocalStorage(updatedList);
    showToastMsg(`New Brand "${newBrandItem.brandName}" filed & registered with ID ${newId}!`);
    
    // Reset form fields
    setFormData({
      category: '',
      kindOfLiquor: '',
      liquorType: '',
      oldBrandId: '',
      brandCode: '',
      measure: '',
      brandName: ''
    });
    setFormErrors({});
    setCurrentPage(1);
  };

  // Delete brand record helper
  const handleDeleteBrand = (id, name) => {
    const updatedList = brandsList.filter(b => b.id !== id);
    setBrandsList(updatedList);
    saveToLocalStorage(updatedList);
    showToastMsg(`Removed registry: ${name}`, 'info');
  };

  // Sort helper
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter & Sort brands list
  const processedBrands = useMemo(() => {
    // Only display dynamic table when "Country Liquor" or "Indian Liquor" is selected
    // Note: To be fully functional, we either show the filtered search, but the prompt says:
    // "When user selects Country Liquor OR Indian Liquor: Display an empty data table below... Table features Search..."
    // So if category is set, or if we have general list, let's filter the list based on the chosen Category as well! 
    const currentCategoryFilter = formData.category;
    
    // If category is not selected, the table shouldn't exist / should not display as requested:
    // "When user selects: Country Liquor OR Indian Liquor Display an empty data table below the form."
    if (!currentCategoryFilter) {
      return [];
    }

    let filtered = brandsList.filter(item => item.category === currentCategoryFilter);

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.brandName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.brandCode.toLowerCase().includes(query) ||
        item.liquorType.toLowerCase().includes(query) ||
        item.kindOfLiquor.toLowerCase().includes(query)
      );
    }

    // Apply Sorting
    return [...filtered].sort((a, b) => {
      let aVal = a[sortColumn] ? String(a[sortColumn]).toLowerCase() : '';
      let bVal = b[sortColumn] ? String(b[sortColumn]).toLowerCase() : '';

      // Numeric check for timestamp or measures with numbers
      if (sortColumn === 'timestamp') {
        aVal = a.timestamp || 0;
        bVal = b.timestamp || 0;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (sortColumn === 'measure') {
        // Parse numbers out of Ml
        const aNum = parseFloat(aVal) || 0;
        const bNum = parseFloat(bVal) || 0;
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [brandsList, formData.category, searchTerm, sortColumn, sortDirection]);

  // Pagination calculation
  const totalItems = processedBrands.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBrands = useMemo(() => {
    return processedBrands.slice(startIndex, startIndex + pageSize);
  }, [processedBrands, startIndex, pageSize]);

  // Keep page index within bounds on data change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const showTable = formData.category === 'Country Liquor' || formData.category === 'Indian Liquor';

  return (
    <div className="brand-registration-page">
      
      {/* Toast Alert Notifications */}
      {toast && (
        <div className={`brand-toast ${
          toast.type === 'success' ? 'brand-toast-success' :
          toast.type === 'error' ? 'brand-toast-error' :
          'brand-toast-info'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="toast-icon-success" />}
          {toast.type === 'error' && <AlertCircle className="toast-icon-error" />}
          {toast.type === 'info' && <Info className="toast-icon-info" />}
          <span className="toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="toast-close-btn">
            <X className="btn-icon" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="brand-container">
        
        {/* Navigation Breadcrumbs / Portal Header */}
        <div className="brand-header">
          <div className="brand-header-flex">
            <div>
              <div className="brand-subtitle">Master Registries</div>
              <h1 className="brand-title">Liquor Brand Registration</h1>
            </div>
          </div>
          
          {/* Simulation Helper */}
          <button
            onClick={loadDefaultSamples}
            className="btn-load-sample"
          >
            <Clock className="btn-load-sample-icon" />
            <span>Load Sample Dataset</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon-wrapper stat-icon-blue">
              <Sliders className="stat-card-icon" />
            </div>
            <div>
              <p>Total Active Brands</p>
              <h3>{brandsList.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon-wrapper stat-icon-emerald">
              <Activity className="stat-card-icon" />
            </div>
            <div>
              <p>Indian Liquor Registries</p>
              <h3>
                {brandsList.filter(b => b.category === 'Indian Liquor').length}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon-wrapper stat-icon-amber">
              <Layers className="stat-card-icon" />
            </div>
            <div>
              <p>Country Liquor Registries</p>
              <h3>
                {brandsList.filter(b => b.category === 'Country Liquor').length}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon-wrapper stat-icon-slate">
              <Clock className="stat-card-icon" />
            </div>
            <div>
              <p>Latest Pending Review</p>
              <h3>
                {brandsList.filter(b => b.status === "Pending Approval").length}
              </h3>
            </div>
          </div>
        </div>

        {/* 1. GLASSMORPHISM FORM CARD WITH BLUE ACCENT ACCORDING TO SPEC */}
        <div id="liquor-brand-form-card" className="brand-card">
          
          {/* Blue Top Border */}
          <div className="brand-card-accent" />
          
          <div className="brand-card-header brand-card-header-flex">
            <div className="brand-card-header-icon">
              <Sliders />
            </div>
            <div>
              <h2 className="brand-card-title">Brand Parameters & Specifications</h2>
              <p className="brand-card-subtitle">Fill out physical characteristics, category groupings, and official measure metrics.</p>
            </div>
          </div>

          <div className="brand-card-body">
            <form onSubmit={handleSave} className="brand-form">
              
              {/* Form Grid */}
              <div className="form-grid">
                
                {/* 1. Category Dropdown */}
                <div className="form-group form-group-flex">
                  <label htmlFor="category" className="form-label form-label-flex">
                    Liquor Category <span className="form-label-required">*</span>
                  </label>
                  <div className="field-wrapper">
                    <Sliders className="field-icon" />
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className={`field-control brand-select ${
                        formErrors.category ? 'field-error-border' : ''
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Country Liquor">Country Liquor</option>
                      <option value="Indian Liquor">Indian Liquor</option>
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div>
                  </div>
                  {formErrors.category && (
                    <span className="field-error">
                      <AlertCircle className="field-error-icon" />
                      {formErrors.category}
                    </span>
                  )}
                </div>

                {/* 2. Kind of Liquor (Responsive options based on category) */}
                <div className="form-group form-group-flex">
                  <label htmlFor="kindOfLiquor" className="form-label form-label-flex">
                    Kind of Liquor {formData.category && <span className="form-label-required">*</span>}
                  </label>
                  <div className="field-wrapper">
                    <Layers className="field-icon" />
                    <select
                      id="kindOfLiquor"
                      value={formData.kindOfLiquor}
                      onChange={handleKindOfChange}
                      disabled={!formData.category}
                      className={`field-control brand-select ${
                        !formData.category ? 'field-disabled' :
                        formErrors.kindOfLiquor ? 'field-error-border' : ''
                      }`}
                    >
                      <option value="">Select Kind of Liquor</option>
                      {formData.category && kindOfLiquorOptions[formData.category]?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div>
                  </div>
                  {!formData.category && (
                    <span className="field-helper">
                      Select a Liquor Category to unlock Kind of Liquor.
                    </span>
                  )}
                  {formErrors.kindOfLiquor && (
                    <span className="field-error">
                      <AlertCircle className="field-error-icon" />
                      {formErrors.kindOfLiquor}
                    </span>
                  )}
                </div>

                {/* 3. Liquor Type (Responsive options based on Kind of Liquor) */}
                <div className="form-group form-group-flex">
                  <label htmlFor="liquorType" className="form-label form-label-flex">
                    Liquor Type {formData.kindOfLiquor && <span className="form-label-required">*</span>}
                  </label>
                  <div className="field-wrapper">
                    <Activity className="field-icon" />
                    <select
                      id="liquorType"
                      value={formData.liquorType}
                      onChange={(e) => handleInputChange('liquorType', e.target.value)}
                      disabled={!formData.kindOfLiquor}
                      className={`field-control brand-select ${
                        !formData.kindOfLiquor ? 'field-disabled' :
                        formErrors.liquorType ? 'field-error-border' : ''
                      }`}
                    >
                      <option value="">Select Liquor Type</option>
                      {formData.kindOfLiquor && liquorTypeOptions[formData.kindOfLiquor]?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div>
                  </div>
                  {!formData.kindOfLiquor && (
                    <span className="field-helper">
                      Select Kind of Liquor to unlock specific Liquor Type.
                    </span>
                  )}
                  {formErrors.liquorType && (
                    <span className="field-error">
                      <AlertCircle className="field-error-icon" />
                      {formErrors.liquorType}
                    </span>
                  )}
                </div>

                {/* 4. Old Brand ID */}
                <div className="form-group form-group-flex">
                  <label htmlFor="oldBrandId" className="form-label form-label-flex">
                    Old Brand ID
                  </label>
                  <div className="field-wrapper">
                    <Hash className="field-icon" />
                    <input
                      id="oldBrandId"
                      type="text"
                      placeholder="e.g. OLD-EXC-4581"
                      value={formData.oldBrandId}
                      onChange={(e) => handleInputChange('oldBrandId', e.target.value)}
                      className="field-control brand-input"
                    />
                  </div>
                  <span className="field-helper">Optional reference index for legacy brand profiles.</span>
                </div>

                {/* 5. Brand Code Dropdown */}
                <div className="form-group form-group-flex">
                  <label htmlFor="brandCode" className="form-label form-label-flex">
                    Brand Code
                  </label>
                  <div className="field-wrapper">
                    <Barcode className="field-icon" />
                    <select
                      id="brandCode"
                      value={formData.brandCode}
                      onChange={(e) => handleInputChange('brandCode', e.target.value)}
                      className="field-control brand-select"
                    >
                      <option value="">Select Brand Code</option>
                      {brandCodeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div>
                  </div>
                  <span className="field-helper">Select a pre-allocated structural tariff billing code.</span>
                </div>

                {/* 6. Quarts Measure */}
                <div className="form-group form-group-flex">
                  <label htmlFor="measure" className="form-label form-label-flex">
                    Quarts / Measure Size
                  </label>
                  <div className="field-wrapper">
                    <GlassWater className="field-icon" />
                    <input
                      id="measure"
                      type="text"
                      placeholder="e.g. 750 Ml, 375 Ml, 180 Ml"
                      value={formData.measure}
                      onChange={(e) => handleInputChange('measure', e.target.value)}
                      className="field-control brand-input"
                    />
                  </div>
                  <span className="field-helper">Specify volume capacity per individual bottle unit.</span>
                </div>

              </div>

              {/* 7. Brand Name (Textarea spanning full width) */}
              <div className="form-group full-width form-group-flex">
                <label htmlFor="brandName" className="form-label form-label-flex">
                  Brand Name <span className="form-label-required">*</span>
                </label>
                <div className="textarea-wrapper">
                  <TagIcon className="textarea-icon" />
                  <textarea
                    id="brandName"
                    rows="2"
                    placeholder="Enter full legislative trademark name (e.g. JOHNNIE WALKER WHITE PLATINUM SELECTION)"
                    value={formData.brandName}
                    onChange={(e) => handleInputChange('brandName', e.target.value)}
                    className={`brand-textarea ${
                      formErrors.brandName ? 'field-error-border' : ''
                    }`}
                  />
                </div>
                {formErrors.brandName ? (
                  <span className="field-error">
                    <AlertCircle className="field-error-icon" />
                    {formErrors.brandName}
                  </span>
                ) : (
                  <span className="field-helper">Ensure brand spelling aligns precisely with intellectual property registrations.</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-reset btn-icon-flex"
                >
                  <RotateCcw className="btn-icon" />
                  <span>Reset Fields</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel btn-icon-flex"
                >
                  <X className="btn-icon" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="btn-save btn-icon-flex"
                >
                  <Save className="btn-icon" />
                  <span>Save Record</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* 2. DYNAMICALLY RENDERED DATA TABLE SECTION */}
        {showTable ? (
          <div className="table-card brand-table-card">
            
            {/* Table Control Header */}
            <div className="table-header">
              
              <div className="table-header-row">
                
                <div>
                  <h3 className="table-title">
                    <span>Registered Brands - {formData.category}</span>
                    <span className="table-badge">
                      {processedBrands.length} Record(s)
                    </span>
                  </h3>
                  <p className="table-subtitle">Live index of certified brand identities under active application states.</p>
                </div>

                {/* Table search & page-size adjustment row */}
                <div className="table-controls">
                  
                  {/* Search box built in */}
                  <div className="search-wrapper">
                    <Search className="search-icon-fixed" />
                    <input
                      type="text"
                      placeholder="Search brand name, ID, code..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset page
                      }}
                      className="table-search search-input-custom"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="search-clear-btn"
                      >
                        <X className="search-clear-icon" />
                      </button>
                    )}
                  </div>

                  {/* Size Adjuster */}
                  <div className="page-size-wrapper">
                    <span className="page-size-label">Page Size:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="page-size-select"
                    >
                      <option value={5}>5 Records</option>
                      <option value={10}>10 Records</option>
                      <option value={20}>20 Records</option>
                      <option value={50}>50 Records</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* Empty table fallback vs. populating table body */}
            {paginatedBrands.length === 0 ? (
              <div className="empty-table-state">
                <div className="empty-icon-wrapper">
                  <Sliders className="empty-icon" />
                </div>
                <h4 className="empty-title">No records available</h4>
                <p className="empty-text">
                  {searchTerm ? 'No brands matching your search criteria were detected.' : 'No records available. Please search or add a brand.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn-clear-filter"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto w-full relative">
                
                {/* Responsive horizontal scrollable table with Sticky Header */}
                <table className="registry-table text-left">
                  
                  <thead className="table-thead">
                    <tr>
                      {/* Brand ID header */}
                      <th 
                        onClick={() => handleSort('id')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Brand ID</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
                      
                      {/* Brand Code header */}
                      <th 
                        onClick={() => handleSort('brandCode')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Brand Code</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
 
                      {/* Brand Name header */}
                      <th 
                        onClick={() => handleSort('brandName')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Brand Name</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
 
                      {/* Liquor Type header */}
                      <th 
                        onClick={() => handleSort('liquorType')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Liquor Type</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
 
                      {/* Measure size header */}
                      <th 
                        onClick={() => handleSort('measure')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Quarts Measure</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
 
                      {/* Status header */}
                      <th 
                        onClick={() => handleSort('status')}
                        className="table-header-cell"
                      >
                        <div className="table-header-inner">
                          <span>Status</span>
                          <ChevronsUpDown className="sort-icon" />
                        </div>
                      </th>
 
                      {/* Explicit actions header */}
                      <th className="table-header-cell text-right">
                        <span className="uppercase tracking-wider">Action</span>
                      </th>
                    </tr>
                  </thead>
 
                  <tbody className="divide-y divide-slate-100">
                    {paginatedBrands.map((brand) => (
                      <tr 
                        key={brand.id}
                        className="table-row"
                      >
                        
                        {/* 1. ID Column */}
                        <td className="table-cell">
                          <span className="id-badge">
                            {brand.id}
                          </span>
                        </td>

                        {/* 2. Brand Code Column */}
                        <td className="table-cell">
                          <span className="brand-code-text">
                            {brand.brandCode}
                          </span>
                          {brand.oldBrandId && brand.oldBrandId !== 'N/A' && (
                            <span className="old-id-ref">Ref: {brand.oldBrandId}</span>
                          )}
                        </td>

                        {/* 3. Brand Name Column */}
                        <td className="table-cell-wrap">
                          <div className="cell-flex-column">
                            <span className="brand-name-display">
                              {brand.brandName}
                            </span>
                            <span className="brand-category-ref">
                              {brand.category} / {brand.kindOfLiquor}
                            </span>
                          </div>
                        </td>

                        {/* 4. Liquor Type Column */}
                        <td className="table-cell">
                          <div className="cell-flex-column">
                            <span className="liquor-type-text">
                              {brand.liquorType}
                            </span>
                            <span className="liquor-kind-text">
                              {brand.kindOfLiquor.split(' (')[0]}
                            </span>
                          </div>
                        </td>

                        {/* 5. Measure size Column */}
                        <td className="table-cell">
                          <span className="measure-text-display">
                            {brand.measure}
                          </span>
                        </td>

                        {/* 6. Status Badge Column */}
                        <td className="table-cell">
                          <span className={`status-badge ${
                            brand.status === 'Approved' ? 'status-approved' :
                            brand.status === 'Active' ? 'status-active' :
                            'status-pending'
                          }`}>
                            <span className={`status-indicator-dot ${
                              brand.status === 'Approved' ? 'dot-approved' :
                              brand.status === 'Active' ? 'dot-active' :
                              'dot-pending'
                            }`} />
                            {brand.status}
                          </span>
                        </td>

                        {/* 7. Delete trash item Column */}
                        <td className="action-cell">
                          <button
                            onClick={() => handleDeleteBrand(brand.id, brand.brandName)}
                            className="btn-delete-record"
                            title="Remove registration record"
                          >
                            <Trash2 className="btn-delete-icon" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

            {/* Pagination Controls Footer - 1-10 Pages as requested */}
            {totalPages > 0 && (
              <div className="pagination-bar">
                
                {/* Progress metadata */}
                <div className="pagination-info">
                  Showing <span className="info-bold">{totalItems === 0 ? 0 : startIndex + 1}</span> to <span className="info-bold">{Math.min(startIndex + pageSize, totalItems)}</span> of <span className="info-bold">{totalItems}</span> registered brand entries
                </div>

                {/* Arrow navigation UI */}
                <div className="pagination-buttons-group">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`page-btn ${
                      currentPage === 1 ? 'page-btn-disabled' : 'page-btn-normal'
                    }`}
                  >
                    <ChevronLeft className="btn-icon" />
                  </button>

                  {/* Discrete page numbers up to 1-10 pages constraint */}
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((val) => (
                      <button
                        key={val}
                        onClick={() => setCurrentPage(val)}
                        className={`page-btn ${
                          currentPage === val 
                            ? 'page-btn-active' 
                            : 'page-btn-normal'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`page-btn ${
                      currentPage === totalPages ? 'page-btn-disabled' : 'page-btn-normal'
                    }`}
                  >
                    <ChevronRight className="btn-icon" />
                  </button>
                </div>

              </div>
            )}

          </div>
        ) : (
          <div className="preview-mode-banner">
            <Info className="preview-icon" />
            <div>
              <h4 className="preview-title">Excise Database Preview Mode</h4>
              <p className="preview-description">
                Please select either <strong>Country Liquor</strong> or <strong>Indian Liquor</strong> in the <strong>Liquor Category dropdown</strong> above to instantiate the registered brand identities database preview table.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
