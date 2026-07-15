import React, { useState, useEffect, useMemo } from 'react';
import { Plus, 
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
  ArrowLeft,
  ChevronsUpDown,
  Filter,
  Download,
  Clock,
  Briefcase
} from 'lucide-react';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5214";
const API = `${API_BASE_URL}/api/LiquorBrand`;
const LIQUOR_MASTER_API = `${API_BASE_URL}/api/LiquorMaster`;
const routeValue = (value) => encodeURIComponent(value);
const normalizeCode = (value) => String(value ?? '').trim().toLowerCase();

const getValue = (item, ...keys) => {
  for (const key of keys) {
    if (item?.[key] !== undefined && item?.[key] !== null) {
      return item[key];
    }
  }
  return '';
};

const toArray = (data) => Array.isArray(data) ? data : [];
const MAX_VISIBLE_PAGES = 10;

export default function LiquorBrandRegistration({ onNavigateHome }) {

const [brandsList, setBrandsList] = useState([]);

const [categories, setCategories] = useState([]);

const [kinds, setKinds] = useState([]);

const [types, setTypes] = useState([]);

const [measures, setMeasures] = useState([]);

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const getCategoryDesc = (catCode, source = categories) => {
    const category = source.find(item => getValue(item, 'liquorCatCode', 'LiquorCatCode') === catCode);
    return getValue(category, 'liquorCatDesc', 'LiquorCatDesc') || catCode;
  };

  const getKindDesc = (kindCode, source = kinds) => {
    const kind = source.find(item => getValue(item, 'liquorKindCode', 'LiquorKindCode') === kindCode);
    return getValue(kind, 'liquorKindDesc', 'LiquorKindDesc') || kindCode;
  };

  const getTypeDesc = (typeCode, source = types) => {
    const type = source.find(item => getValue(item, 'liquorTypeCode', 'LiquorTypeCode') === typeCode);
    return getValue(type, 'liquorTypeDesc', 'LiquorTypeDesc') || typeCode;
  };

  const getMeasureValue = (measure) => {
    return getValue(measure, 'measureScale', 'MeasureScale', 'measureUpper', 'MeasureUpper', 'measureCode', 'MeasureCode');
  };

  const getMeasureLabel = (measure) => {
    const detail = getValue(measure, 'measureDetail', 'MeasureDetail');
    const scale = getValue(measure, 'measureScale', 'MeasureScale');
    const unit = getValue(measure, 'measureUnit', 'MeasureUnit');
    const code = getValue(measure, 'measureCode', 'MeasureCode');

    if (detail) return detail;
    if (scale || unit) return `${scale} ${unit}`.trim();
    return code;
  };

  const mapBrand = (brand, lookup = {}) => {
    const categorySource = lookup.categories || categories;
    const kindSource = lookup.kinds || kinds;
    const typeSource = lookup.types || types;
    const catCode = getValue(brand, 'liquorCatCode', 'LiquorCatCode');
    const kindCode = getValue(brand, 'liquorKindCode', 'LiquorKindCode');
    const typeCode = getValue(brand, 'liquorTypeCode', 'LiquorTypeCode');
    const brandCode = getValue(brand, 'liquorBrandCode', 'LiquorBrandCode');
    const measure = getValue(brand, 'quartsMeasure', 'QuartsMeasure');
    const key = [catCode, kindCode, typeCode, brandCode].join('|');

    return {
      key,
      id: brandCode,
      oldBrandId: getValue(brand, 'brandNameAlias', 'BrandNameAlias') || 'N/A',
      brandCode,
      brandName: getValue(brand, 'liquorBrandDesc', 'LiquorBrandDesc'),
      category: catCode,
      categoryName: getCategoryDesc(catCode, categorySource),
      kindOfLiquor: kindCode,
      kindOfLiquorName: getKindDesc(kindCode, kindSource),
      liquorType: typeCode,
      liquorTypeName: getTypeDesc(typeCode, typeSource),
      measure: measure === '' ? '' : String(measure),
      status: 'Active',
      timestamp: brandCode || '',
      raw: brand
    };
  };

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const categoriesResponse = await axios.get(`${API}/categories`);
      const categoryList = toArray(categoriesResponse.data);
      setCategories(categoryList);

      try {
        const brandsResponse = await axios.get(API);
        setBrandsList(toArray(brandsResponse.data).map(brand => mapBrand(brand, { categories: categoryList })));
      } catch (brandError) {
        console.error('Liquor brand grid API failed:', brandError);
        setBrandsList([]);
        showToastMsg('Category loaded, but brand grid API failed.', 'error');
      }

   
    } catch (error) {
      console.error('Liquor category API failed:', error);
      showToastMsg('Unable to load liquor brand master data from API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Toast trigger helper
  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadKindsForCategory = async (catCode) => {
    if (!catCode) {
      setKinds([]);
      setTypes([]);
      return;
    }

    const url = `${API}/kinds/${routeValue(catCode)}`;
    try {
      console.log('Liquor kind API:', url);
      const response = await axios.get(url);
      const kindList = toArray(response.data);
      console.log('Liquor kind response:', kindList);
      setKinds(kindList);
      setTypes([]);
    } catch (error) {
      console.error('Liquor kind API failed:', error);
      setKinds([]);
      setTypes([]);
      showToastMsg('Unable to load kind of liquor list.', 'error');
    }
  };

  const loadTypesForKind = async (catCode, kindCode) => {
    if (!catCode || !kindCode) {
      setTypes([]);
      return;
    }

    const url = `${API}/types/${routeValue(catCode)}/${routeValue(kindCode)}`;
    try {
      setTypes([]);
      console.log('Liquor type API:', url);
      const response = await axios.get(url);
      const typeList = toArray(response.data);
      console.log('Liquor type response:', typeList);
      setTypes(typeList);
    } catch (error) {
      console.error('Liquor type API failed:', error);
      setTypes([]);
      showToastMsg('Unable to load liquor type list.', 'error');
    }
  };

  // Handle category change: resets kindOfLiquor & liquorType
  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: value,
      kindOfLiquor: '',
      liquorType: '',
      measure: ''
    }));
    setFormErrors(prev => ({ ...prev, category: '', kindOfLiquor: '', liquorType: '', measure: '' }));
    setMeasures([]);
    await loadKindsForCategory(value);
  };

  // Handle Kind of Liquor Change: resets liquorType
  const handleKindOfChange = async (e) => {
    const value = e.target.value;
    const selectedCategory = formData.category;
    setFormData(prev => ({
      ...prev,
      kindOfLiquor: value,
      liquorType: '',
      measure: ''
    }));
    setFormErrors(prev => ({ ...prev, kindOfLiquor: '', liquorType: '', measure: '' }));
    setMeasures([]);
    await loadTypesForKind(selectedCategory, value);
  };

const loadMeasures = async (catCode, kindCode, typeCode) => {
  if (!catCode || !kindCode || !typeCode) {
    setMeasures([]);
    return;
  }

  try {
    const response = await axios.get(
      `${API}/LiquorMeasure/${routeValue(catCode)}/${routeValue(kindCode)}/${routeValue(typeCode)}`
    );

    setMeasures(toArray(response.data));
  } catch (error) {
    console.error("Liquor measure API failed:", error);
    setMeasures([]);
    showToastMsg("Unable to load measure list.", "error");
  }
};
  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Load baseline samples for demonstration/easier interaction
  const loadDefaultSamples = async () => {
    try {
      await loadInitialData();
      setCurrentPage(1);
      showToastMsg('Liquor brand data refreshed from API.', 'info');
    } catch (error) {
      showToastMsg('Unable to refresh liquor brand data.', 'error');
    }
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
    setKinds([]);
    setTypes([]);
    setMeasures([]);
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
  const handleSave = async (e) => {
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

    if (formData.measure && !Number.isInteger(Number(formData.measure))) {
      errors.measure = 'Quarts Measure must be a whole number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg('Please check and fill the required fields highlights.', 'error');
      return;
    }

    const payload = {
      liquorCatCode: formData.category,
      liquorKindCode: formData.kindOfLiquor,
      liquorTypeCode: formData.liquorType,
      liquorBrandDesc: formData.brandName.trim().toUpperCase(),
      brandNameAlias: formData.oldBrandId.trim() || null,
      quartsMeasure: formData.measure ? parseInt(formData.measure, 10) : null
    };

    setIsSaving(true);
    try {
      const selectedCategory = formData.category;
      const selectedKind = formData.kindOfLiquor;
      const selectedType = formData.liquorType;

      const response = await axios.post(API, payload);
      showToastMsg('Brand saved successfully.', 'success');
      window.alert('Brand saved successfully.');
      const responseData = response?.data ?? {};
      const savedBrand = mapBrand({
        ...responseData,
        liquorCatCode: getValue(responseData, 'liquorCatCode', 'LiquorCatCode') || payload.liquorCatCode,
        liquorKindCode: getValue(responseData, 'liquorKindCode', 'LiquorKindCode') || payload.liquorKindCode,
        liquorTypeCode: getValue(responseData, 'liquorTypeCode', 'LiquorTypeCode') || payload.liquorTypeCode,
        liquorBrandDesc: getValue(responseData, 'liquorBrandDesc', 'LiquorBrandDesc') || payload.liquorBrandDesc,
        brandNameAlias: getValue(responseData, 'brandNameAlias', 'BrandNameAlias') || payload.brandNameAlias,
        quartsMeasure: getValue(responseData, 'quartsMeasure', 'QuartsMeasure') || payload.quartsMeasure
      });
      setBrandsList(prev => [savedBrand, ...prev.filter(item => item.key !== savedBrand.key)]);
      
      setFormData({
        category: selectedCategory,
        kindOfLiquor: selectedKind,
        liquorType: selectedType,
        oldBrandId: '',
        brandCode: savedBrand.brandCode || '',
        measure: '',
        brandName: ''
      });
      setFormErrors({});
      setMeasures([]);
      setCurrentPage(1);
    } catch (error) {
      showToastMsg('Unable to save liquor brand record.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete brand record helper
  const handleDeleteBrand = async (brand) => {
    try {
      await axios.delete(API, {
        params: {
          catCode: brand.category,
          kindCode: brand.kindOfLiquor,
          typeCode: brand.liquorType,
          brandCode: brand.brandCode
        }
      });
      setBrandsList(prev => prev.filter(item => item.key !== brand.key));
      showToastMsg(`Removed registry: ${brand.brandName}`, 'info');
    } catch (error) {
      showToastMsg('Unable to delete liquor brand record.', 'error');
    }
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

    let filtered = brandsList.filter(item => normalizeCode(item.category) === normalizeCode(currentCategoryFilter));

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        String(item.brandName ?? '').toLowerCase().includes(query) ||
        String(item.id ?? '').toLowerCase().includes(query) ||
        String(item.brandCode ?? '').toLowerCase().includes(query) ||
        String(getTypeDesc(item.liquorType) ?? '').toLowerCase().includes(query) ||
        String(getKindDesc(item.kindOfLiquor) ?? '').toLowerCase().includes(query)
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
  }, [brandsList, formData.category, searchTerm, sortColumn, sortDirection, kinds, types]);

  // Pagination calculation
  const totalItems = processedBrands.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBrands = useMemo(() => {
    return processedBrands.slice(startIndex, startIndex + pageSize);
  }, [processedBrands, startIndex, pageSize]);

  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];

    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
  }, [currentPage, totalPages]);

  // Keep page index within bounds on data change
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const showTable = Boolean(formData.category);

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
                {brandsList.filter(b => getCategoryDesc(b.category).toLowerCase().includes('indian')).length}
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
                {brandsList.filter(b => getCategoryDesc(b.category).toLowerCase().includes('country')).length}
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
                      {categories.map(category => {
                        const code = getValue(category, 'liquorCatCode', 'LiquorCatCode');
                        const label = getValue(category, 'liquorCatDesc', 'LiquorCatDesc');
                        return <option key={code} value={code}>{label}</option>;
                      })}
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
                <label htmlFor="kindOfLiquor" className="form-label form-label-flex"> Kind of Liquor {formData.category && 
                <span className="text-rose-600 font-bold">*</span>}
                </label>
                <div className="field-wrapper">
                <Layers className="field-icon" />
                <select
                id="kindOfLiquor"
                value={formData.kindOfLiquor}
                onChange={handleKindOfChange}
                disabled={!formData.category}
                style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '3rem' }}
                className={`field-control brand-select ${
                !formData.category ? 'field-disabled' :
                formErrors.kindOfLiquor ? 'field-error-border' : '' 
              }`} >  
                <option value="">Select Kind of Liquor</option>
                {kinds.map(kind => {
                const code = getValue(kind, 'liquorKindCode', 'LiquorKindCode');
                const label = getValue(kind, 'liquorKindDesc', 'LiquorKindDesc');
                return <option key={code} value={code}>{label}</option>;
                })}
                </select>
                <div className="select-arrow">
                <ChevronRight className="select-arrow-icon" />
                </div>
                </div>
                {!formData.category && (
               <span className="field-helper">
                Select a Liquor Category to unlock Kind of Liquor
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
                    Liquor Type {formData.kindOfLiquor &&  <span className="form-label-required">*</span>}
                  </label>
                  <div className="field-wrapper">
                    <Activity className="field-icon" />
                    <select
                      id="liquorType"
                      value={formData.liquorType}
                      onChange={async (e) => {
                      const typeCode = e.target.value;

                      handleInputChange("liquorType", typeCode);

                       setMeasures([]);

                       await loadMeasures(
                          formData.category,
                           formData.kindOfLiquor,
                            typeCode
                             );
                          }}
                      disabled={!formData.kindOfLiquor}
                      style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '3rem' }}
                      className={`field-control brand-select ${
                         !formData.kindOfLiquor ? 'field-disabled' :
                        formErrors.liquorType ? 'field-error-border' : ''
                      }`}
                    >
                      <option value="">Select Liquor Type</option>
                      {types.map(type => {
                        const code = getValue(type, 'liquorTypeCode', 'LiquorTypeCode');
                        const label = getValue(type, 'liquorTypeDesc', 'LiquorTypeDesc');
                        return <option key={code} value={code}>{label}</option>;
                      })}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div>
                  </div>
                  {!formData.kindOfLiquor && (
                    <span className="field-helper block">
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

                

                {/* 5. Brand Code */}
               <div className="form-group form-group-flex">
                  <label htmlFor="brandCode" className="form-label form-label-flex">
                    Brand Code
                  </label>
                  <div className="field-wrapper">
                    <Barcode className="field-icon" />
                    <input
                      id="brandCode"
                      type="text"
                      placeholder="Generated by API after save"
                      value={formData.brandCode}
                      readOnly
                      className="field-control brand-select"
                    />
                    {/* <div className="select-arrow">
                      <ChevronRight className="select-arrow-icon" />
                    </div> */}
                  </div>
                  <span className="field-helper block">Brand code is generated automatically by the backend.</span>
                </div>

                {/* 6. Quarts Measure */}
                <div className="form-group form-group-flex">
                  <label htmlFor="measure" className="form-label form-label-flex">
                    Quarts / Measure Size
                  </label>
                  <div className="field-wrapper">
                    <GlassWater className="field-icon" />
                    <select
                      id="measure"
                      value={formData.measure}
                      onChange={(e) => handleInputChange('measure', e.target.value)}
                      style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '3rem' }}
                      className={`field-control brand-select ${
                        formErrors.measure ? 'border-red-500' : ''
                      }`}
                    >
                     <option value="">Select Measure</option>

{measures.map((measure) => (
  <option key={measure} value={measure}>
    {measure}
  </option>
))}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {formErrors.measure ? (
                    <span className="field-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.measure}
                    </span>
                  ) : (
                    <span className="field-helper block">Select bottle capacity from liquor measure master.</span>
                  )}
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
                          disabled={isSaving}
                          className="btn-save btn-icon-flex"
                        >
                          <Save className="btn-icon" />
                          <span>{isSaving ? 'Saving...' : 'Save Record'}</span>
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
                         key={brand.key}
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
                              {brand.kindOfLiquorName}
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
                            onClick={() => handleDeleteBrand(brand)}
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
                    {visiblePageNumbers.map((val) => (
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
