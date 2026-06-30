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

const getValue = (item, ...keys) => {
  for (const key of keys) {
    if (item?.[key] !== undefined && item?.[key] !== null) {
      return item[key];
    }
  }
  return '';
};

const toArray = (data) => Array.isArray(data) ? data : [];

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

    if (formData.measure && Number.isNaN(Number(formData.measure))) {
      errors.measure = 'Quarts Measure must be a number';
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
      quartsMeasure: formData.measure ? Number(formData.measure) : null
    };

    setIsSaving(true);
    try {
      const response = await axios.post(API, payload);
      const savedBrand = mapBrand(response.data);
      setBrandsList(prev => [savedBrand, ...prev.filter(item => item.key !== savedBrand.key)]);
      showToastMsg(`New Brand "${savedBrand.brandName}" registered with code ${savedBrand.brandCode}.`);
      
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

    let filtered = brandsList.filter(item => item.category === currentCategoryFilter);

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.brandName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.brandCode.toLowerCase().includes(query) ||
        getTypeDesc(item.liquorType).toLowerCase().includes(query) ||
        getKindDesc(item.kindOfLiquor).toLowerCase().includes(query)
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

  const showTable = Boolean(formData.category);

  return (
    <div className="brand-registration-page flex flex-col font-sans text-slate-800">
      
      {/* Toast Alert Notifications */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl transition-all border transform translate-y-0 animate-bounce duration-300 ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toast.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-3 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="brand-container flex-grow">
        
        {/* Navigation Breadcrumbs / Portal Header */}
        <div className="brand-header">
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="p-2 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition cursor-pointer text-slate-600 shadow-sm flex items-center justify-center group"
              title="Go back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="brand-subtitle">Master Registries</div>
              <h1 className="brand-title">Liquor Brand Registration</h1>
            </div>
          </div>
          
          {/* Simulation Helper */}
          <button
            onClick={loadDefaultSamples}
            className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 py-2.5 px-4 rounded-xl cursor-pointer transition select-none flex items-center gap-2 self-start sm:self-center"
          >
            <Clock className="w-4 h-4 text-blue-700" />
            <span>{isLoading ? 'Loading...' : 'Refresh API Data'}</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <p>Total Active Brands</p>
              <h3>{brandsList.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p>Indian Liquor Registries</p>
              <h3>
                {brandsList.filter(b => getCategoryDesc(b.category).toLowerCase().includes('indian')).length}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p>Country Liquor Registries</p>
              <h3>
                {brandsList.filter(b => getCategoryDesc(b.category).toLowerCase().includes('country')).length}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-xl">
              <Clock className="w-6 h-6" />
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
          
          <div className="brand-card-header flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Brand Parameters & Specifications</h2>
              <p className="text-xs text-slate-500 mt-0.5">Fill out physical characteristics, category groupings, and official measure metrics.</p>
            </div>
          </div>

          <div className="brand-card-body">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Form Grid */}
              <div className="form-grid">
                
                {/* 1. Category Dropdown */}
                <div className="form-group flex flex-col">
                  <label htmlFor="category" className="form-label flex items-center gap-1.5">
                    Liquor Category <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <div className="field-wrapper">
                    <Sliders className="field-icon" />
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '3rem' }}
                      className={`field-control brand-select ${
                        formErrors.category ? 'border-red-500' : ''
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
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {formErrors.category && (
                    <span className="field-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.category}
                    </span>
                  )}
                </div>

                {/* 2. Kind of Liquor (Responsive options based on category) */}
                <div className="form-group flex flex-col">
                  <label htmlFor="kindOfLiquor" className="form-label flex items-center gap-1.5">
                    Kind of Liquor {formData.category && <span className="text-rose-600 font-bold">*</span>}
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
                        !formData.category ? 'bg-slate-100 text-slate-400 cursor-not-allowed' :
                        formErrors.kindOfLiquor ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Kind of Liquor</option>
                      {kinds.map(kind => {
                        const code = getValue(kind, 'liquorKindCode', 'LiquorKindCode');
                        const label = getValue(kind, 'liquorKindDesc', 'LiquorKindDesc');
                        return <option key={code} value={code}>{label}</option>;
                      })}
                    </select>
                    <div className="select-arrow">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {!formData.category && (
                    <span className="field-helper block">
                      Select a Liquor Category to unlock Kind of Liquor.
                    </span>
                  )}
                  {formErrors.kindOfLiquor && (
                    <span className="field-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.kindOfLiquor}
                    </span>
                  )}
                </div>

                {/* 3. Liquor Type (Responsive options based on Kind of Liquor) */}
                <div className="form-group flex flex-col">
                  <label htmlFor="liquorType" className="form-label flex items-center gap-1.5">
                    Liquor Type {formData.kindOfLiquor && <span className="text-rose-600 font-bold">*</span>}
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
                        !formData.kindOfLiquor ? 'bg-slate-100 text-slate-400 cursor-not-allowed' :
                        formErrors.liquorType ? 'border-red-500' : ''
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
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {!formData.kindOfLiquor && (
                    <span className="field-helper block">
                      Select Kind of Liquor to unlock specific Liquor Type.
                    </span>
                  )}
                  {formErrors.liquorType && (
                    <span className="field-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.liquorType}
                    </span>
                  )}
                </div>

                

                {/* 5. Brand Code */}
                <div className="form-group flex flex-col">
                  <label htmlFor="brandCode" className="form-label flex items-center gap-1.5">
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
                      className="field-control brand-input bg-slate-100 text-slate-400 cursor-not-allowed"
                    />
                    {/* <div className="select-arrow">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                    </div> */}
                  </div>
                  <span className="field-helper block">Brand code is generated automatically by the backend.</span>
                </div>

                {/* 6. Quarts Measure */}
                <div className="form-group flex flex-col">
                  <label htmlFor="measure" className="form-label flex items-center gap-1.5">
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
                      {measures.map(measure => {
                        const code = getValue(measure, 'measureCode', 'MeasureCode');
                        const value = getMeasureValue(measure);
                        const label = getMeasureLabel(measure);
                        return <option key={code || value} value={value}>{label}</option>;
                      })}
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
              <div className="form-group full-width flex flex-col">
                <label htmlFor="brandName" className="form-label flex items-center gap-1.5">
                  Brand Name <span className="text-rose-600 font-bold">*</span>
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
                      formErrors.brandName ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {formErrors.brandName ? (
                  <span className="field-error flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.brandName}
                  </span>
                ) : (
                  <span className="field-helper block">Ensure brand spelling aligns precisely with intellectual property registrations.</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="form-actions animate-fade">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-reset hover:bg-slate-100 transition text-slate-600 flex items-center justify-center gap-2 border border-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Fields</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel hover:bg-slate-50 border border-slate-250 transition text-slate-600 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-save flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Record'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* 2. DYNAMICALLY RENDERED DATA TABLE SECTION */}
        {showTable ? (
          <div className="table-card animate-fade-in transition duration-300">
            
            {/* Table Control Header */}
            <div className="table-header">
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>Registered Brands - {getCategoryDesc(formData.category)}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2.5 rounded-full font-bold">
                      {processedBrands.length} Record(s)
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live index of certified brand identities under active application states.</p>
                </div>

                {/* Table search & page-size adjustment row */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* Search box built in */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search brand name, ID, code..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset page
                      }}
                      className="table-search focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 text-xs font-semibold"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Size Adjuster */}
                  <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-center justify-between">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Page Size:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-2.5 py-2 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
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
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="p-4 bg-slate-100 rounded-full text-slate-400 mb-4 animate-pulse">
                  <Sliders className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">No records available</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                  {searchTerm ? 'No brands matching your search criteria were detected.' : 'No records available. Please search or add a brand.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded-lg cursor-pointer transition select-none border border-blue-200"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto w-full relative">
                
                {/* Responsive horizontal scrollable table with Sticky Header */}
                <table className="registry-table text-left">
                  
                  <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      {/* Brand ID header */}
                      <th 
                        onClick={() => handleSort('id')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Brand ID</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>
                      
                      {/* Brand Code header */}
                      <th 
                        onClick={() => handleSort('brandCode')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Brand Code</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>

                      {/* Brand Name header */}
                      <th 
                        onClick={() => handleSort('brandName')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Brand Name</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>

                      {/* Liquor Type header */}
                      <th 
                        onClick={() => handleSort('liquorType')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Liquor Type</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>

                      {/* Measure size header */}
                      <th 
                        onClick={() => handleSort('measure')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Quarts Measure</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>

                      {/* Status header */}
                      <th 
                        onClick={() => handleSort('status')}
                        className="p-4 text-xs font-bold text-slate-700 select-none cursor-pointer hover:bg-slate-100 transition whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5 uppercase font-[#0d1b4c] tracking-wider">
                          <span>Status</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </th>

                      {/* Explicit actions header */}
                      <th className="p-4 text-xs font-bold text-slate-700 select-none whitespace-nowrap text-right">
                        <span className="uppercase tracking-wider">Action</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedBrands.map((brand) => (
                      <tr 
                        key={brand.key}
                        className="hover:bg-slate-50/70 transition group duration-150"
                      >
                        
                        {/* 1. ID Column */}
                        <td className="p-4 whitespace-nowrap">
                          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 py-1.5 px-2.5 rounded-lg border border-blue-100 block w-max select-all font-mono">
                            {brand.id}
                          </span>
                        </td>

                        {/* 2. Brand Code Column */}
                        <td className="p-4 whitespace-nowrap">
                          <span className="text-xs font-semibold text-slate-700 block select-all font-mono">
                            {brand.brandCode}
                          </span>
                          {brand.oldBrandId && brand.oldBrandId !== 'N/A' && (
                            <span className="text-[10px] text-slate-400 mt-1 font-semibold block font-mono">Ref: {brand.oldBrandId}</span>
                          )}
                        </td>

                        {/* 3. Brand Name Column */}
                        <td className="p-4 max-w-sm">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-900 tracking-tight leading-normal select-all">
                              {brand.brandName}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 block font-semibold uppercase font-mono">
                              {brand.categoryName} / {brand.kindOfLiquorName}
                            </span>
                          </div>
                        </td>

                        {/* 4. Liquor Type Column */}
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800">
                              {brand.liquorTypeName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                              {brand.kindOfLiquorName}
                            </span>
                          </div>
                        </td>

                        {/* 5. Measure size Column */}
                        <td className="p-4 whitespace-nowrap">
                          <span className="text-xs font-semibold text-slate-700 block font-mono">
                            {brand.measure}
                          </span>
                        </td>

                        {/* 6. Status Badge Column */}
                        <td className="p-4 whitespace-nowrap">
                          <span className={`status-badge inline-flex items-center gap-1.5 ${
                            brand.status === 'Approved' ? 'status-approved' :
                            brand.status === 'Active' ? 'status-active' :
                            'status-pending'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              brand.status === 'Approved' ? 'bg-emerald-500' :
                              brand.status === 'Active' ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`} />
                            {brand.status}
                          </span>
                        </td>

                        {/* 7. Delete trash item Column */}
                        <td className="p-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleDeleteBrand(brand)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer select-none"
                            title="Remove registration record"
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

            {/* Pagination Controls Footer - 1-10 Pages as requested */}
            {totalPages > 0 && (
              <div className="pagination-bar flex-col sm:flex-row gap-4 select-none">
                
                {/* Progress metadata */}
                <div className="text-xs text-slate-500 font-semibold">
                  Showing <span className="font-bold text-slate-800">{totalItems === 0 ? 0 : startIndex + 1}</span> to <span className="font-bold text-slate-800">{Math.min(startIndex + pageSize, totalItems)}</span> of <span className="font-bold text-slate-800">{totalItems}</span> registered brand entries
                </div>

                {/* Arrow navigation UI */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`page-btn flex items-center justify-center border border-slate-200 transition ${
                      currentPage === 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Discrete page numbers up to 1-10 pages constraint */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((val) => (
                      <button
                        key={val}
                        onClick={() => setCurrentPage(val)}
                        className={`page-btn transition ${
                          currentPage === val 
                            ? 'bg-blue-700 text-white shadow-sm' 
                            : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`page-btn flex items-center justify-center border border-slate-200 transition ${
                      currentPage === totalPages ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

        ) : (
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm flex items-start gap-4" style={{ padding: '0.5rem' }}>
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-900">Excise Database Preview Mode</h4>
              <p className="text-xs text-blue-700/85 max-w-2xl mt-1 leading-relaxed">
                Please select either <strong>Country Liquor</strong> or <strong>Indian Liquor</strong> in the <strong>Liquor Category dropdown</strong> above to instantiate the registered brand identities database preview table.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
