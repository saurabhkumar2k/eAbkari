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
  Activity, 
  Hash, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  RefreshCw,
  Clock
} from 'lucide-react';

const originOptions = [
  { value: 'In India', label: 'In India' },
  { value: 'Outside India', label: 'Outside India' }
];

const stateOptions = [
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'West Bengal', label: 'West Bengal' }
];

const bottlerCodeOptions = [
  { value: 'BOT-DEL-001', label: 'BOT-DEL-001 (Delhi Distilleries Ltd.)' },
  { value: 'BOT-DEL-002', label: 'BOT-DEL-002 (NCT Bottlers Corp.)' },
  { value: 'BOT-HAR-102', label: 'BOT-HAR-102 (Haryana Spirits & Bottling)' },
  { value: 'BOT-MUM-401', label: 'BOT-MUM-401 (Maharashtra Breweries Ltd.)' },
  { value: 'BOT-BLR-502', label: 'BOT-BLR-502 (Karnataka Distillers Group)' }
];

const INITIAL_BOTTLERS_POOL = [
  { id: 'BTR-1001', origin: 'In India', state: 'Delhi', oldBottlerId: 'OLD-BOT-9811', bottlerCode: 'BOT-DEL-001', country: 'India', bottlerName: 'DELHI DISTILLERIES & BOTTLERS PVT. LTD.', address: 'Plot No. 44, Okhla Industrial Area Phase-III, New Delhi', pinCode: '110020', timestamp: 1711213010000 },
  { id: 'BTR-1002', origin: 'In India', state: 'Maharashtra', oldBottlerId: 'OLD-BOT-4412', bottlerCode: 'BOT-MUM-401', country: 'India', bottlerName: 'UNITED BREWERIES & BOTTLING SOLUTIONS', address: 'Plot 12, MIDC Industrial Area, Andheri East, Mumbai', pinCode: '400093', timestamp: 1711213123000 },
  { id: 'BTR-1003', origin: 'Outside India', state: '', oldBottlerId: 'OLD-BOT-7711', bottlerCode: 'BOT-BLR-502', country: 'France', bottlerName: 'CHATEAU DE VERSAILLES FINE SPIRITS', address: '12 Rue de la Chapelle, Bordeaux', pinCode: '33000', timestamp: 1711213233000 }
];

export default function BottlerMaster({ onNavigateHome }) {
  // Local storage state
  const [bottlersList, setBottlersList] = useState(() => {
    const saved = localStorage.getItem('excise_bottler_registry');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOTTLERS_POOL;
      }
    }
    return INITIAL_BOTTLERS_POOL;
  });

  // Form State
  const [formData, setFormData] = useState({
    origin: '',
    state: '',
    oldBottlerId: '',
    bottlerCode: '',
    country: '',
    bottlerName: '',
    address: '',
    pinCode: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Auto-set country when origin is "In India"
  useEffect(() => {
    if (formData.origin === 'In India') {
      setFormData(prev => ({ ...prev, country: 'India' }));
    } else if (formData.origin === 'Outside India') {
      setFormData(prev => ({ ...prev, state: '', country: prev.country === 'India' ? '' : prev.country }));
    }
  }, [formData.origin]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const saveToLocalStorage = (list) => {
    localStorage.setItem('excise_bottler_registry', JSON.stringify(list));
  };

  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleReset = () => {
    setFormData({
      origin: '',
      state: '',
      oldBottlerId: '',
      bottlerCode: '',
      country: '',
      bottlerName: '',
      address: '',
      pinCode: ''
    });
    setFormErrors({});
    showToastMsg('Form cleared.', 'info');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.origin) errors.origin = 'Origin is required';
    if (formData.origin === 'In India' && !formData.state) errors.state = 'State is required';
    if (!formData.bottlerCode) errors.bottlerCode = 'Bottler Code selection is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.bottlerName.trim()) errors.bottlerName = 'Bottler Name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.pinCode.trim()) errors.pinCode = 'Pin Code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg('Please fill in all mandatory fields.', 'error');
      return;
    }

    const isDuplicate = bottlersList.some(
      b => b.bottlerCode === formData.bottlerCode && b.bottlerName.toLowerCase() === formData.bottlerName.trim().toLowerCase()
    );

    if (isDuplicate) {
      showToastMsg('A bottler with this name and code already exists.', 'error');
      return;
    }

    const newBottler = {
      id: `BTR-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      bottlerName: formData.bottlerName.trim().toUpperCase(),
      address: formData.address.trim().toUpperCase(),
      timestamp: Date.now()
    };

    const updated = [newBottler, ...bottlersList];
    setBottlersList(updated);
    saveToLocalStorage(updated);
    showToastMsg('Bottler profile registered successfully!');
    
    // Clear form
    setFormData({
      origin: '',
      state: '',
      oldBottlerId: '',
      bottlerCode: '',
      country: '',
      bottlerName: '',
      address: '',
      pinCode: ''
    });
    setFormErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Bottler master entry?')) {
      const updated = bottlersList.filter(b => b.id !== id);
      setBottlersList(updated);
      saveToLocalStorage(updated);
      showToastMsg('Bottler record removed successfully.', 'info');
    }
  };

  const loadDefaultSamples = () => {
    setBottlersList(INITIAL_BOTTLERS_POOL);
    saveToLocalStorage(INITIAL_BOTTLERS_POOL);
    showToastMsg('Default sample dataset reloaded successfully!', 'info');
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const processedBottlers = useMemo(() => {
    let filtered = bottlersList;

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.bottlerName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.bottlerCode.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        (item.state && item.state.toLowerCase().includes(query)) ||
        item.address.toLowerCase().includes(query)
      );
    }

    return [...filtered].sort((a, b) => {
      let aVal = a[sortColumn] ? String(a[sortColumn]).toLowerCase() : '';
      let bVal = b[sortColumn] ? String(b[sortColumn]).toLowerCase() : '';

      if (sortColumn === 'timestamp') {
        aVal = a.timestamp || 0;
        bVal = b.timestamp || 0;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bottlersList, searchTerm, sortColumn, sortDirection]);

  const totalItems = processedBottlers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBottlers = useMemo(() => {
    return processedBottlers.slice(startIndex, startIndex + pageSize);
  }, [processedBottlers, startIndex, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bottler-master-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${
          toast.type === "success" ? "toast-success" :
         toast.type === "error" ? "toast-error" :
          "toast-default"
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="toast-success-icon" />}
          {toast.type === 'error' && <AlertCircle className="toast-error-icon" />}
          {toast.type === 'info' && <Info className="toast-info-icon" />}
          <span className="toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="toast-close-btn">
           <X className="toast-close-icon" />
          </button>
        </div>
      )}

      {/* Ribbon header container */}
      <div className="wizard-container">
        
        {/* Ribbon element precisely modeled from picture */}
        <div className="wizard-header-actions">
          <div className="wizard-title-banner" style={{ minWidth: "180px" }}>
            <span className="wizard-title-text">Bottler Master</span>
            {/* Ribbon tail cut */}
            <div className="wizard-title-arrow">
            </div>
          </div>
        </div>

        {/* Back and Title section */}
        <div className="wizard-section">
          <button 
            onClick={onNavigateHome}
           className="wizard-back-button"
          >
            <ChevronLeft className="wizard-back-icon" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="wizard-title">
          <Building2 className="wizard-title-icon" />
            <span>Bottler Master Directory</span>
          </h1>
          <p className="bottler-directory-description">
            Register and maintain master records of active domestic and foreign distillery bottlers.
          </p>
        </div>

        {/* Form area in double-column layout matching picture fields */}
        <form onSubmit={handleSave} className="bottler-form">
            <div className="bottler-form-grid">    
            {/* Origin field */}
            <div className="form-row">
                <label className="form-label">
                Origin <span className="required">*</span>
                </label>
                <div className="form-field">
                <select
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                 className={`form-input ${formErrors.origin ? "form-input-error" : ""}`}
                >
                  <option value="">--Select--</option>
                  {originOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* State field */}
            <div className="form-row">
                <label className="form-label">
                State{" "}
                {formData.origin === "In India" && ( <span className="required">*</span> )}
                </label>
                <div className="form-field">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={formData.origin === 'Outside India'}
                  className={`w-full px-3 py-2 text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400 border ${formErrors.state ? 'border-rose-400' : 'border-slate-300'} rounded shadow-inner focus:outline-none focus:ring-1 focus:ring-[#2b9ec3]`}
                >
                  <option value="">--Select--</option>
                  {stateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Old Bottler Id */}
<div className="form-row">
  <label className="form-label">
    Old Bottler Id
  </label>

  <input
    type="text"
    value={formData.oldBottlerId}
    onChange={(e) => handleInputChange("oldBottlerId", e.target.value)}
    placeholder="e.g. OLD-BOT-1044"
    className="form-input"
  />
</div>

            {/* Bottler Code */}
<div className="form-row">
  <label className="form-label">
    Bottler Code <span className="required">*</span>
  </label>

  <div className="form-field">
    <select
      value={formData.bottlerCode}
      onChange={(e) => handleInputChange("bottlerCode", e.target.value)}
      className={`form-input ${
        formErrors.bottlerCode ? "form-input-error" : ""
      }`}
    >
      <option value="">--Select--</option>
      {bottlerCodeOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  </div>
</div>

            {/* Country */}
<div className="form-row">
  <label className="form-label">
    Country <span className="required">*</span>
  </label>

  <input
    type="text"
    value={formData.country}
    onChange={(e) => handleInputChange("country", e.target.value)}
    disabled={formData.origin === "In India"}
    placeholder="e.g. France, Scotland"
    className={`form-input ${
      formData.origin === "In India" ? "form-input-disabled" : ""
    } ${formErrors.country ? "form-input-error" : ""}`}
  />
</div>

            {/* Empty col for layout alignment */}
<div className="form-spacer"></div>

            {/* Bottler Name (Textarea with resize as seen in picture scrollbar layout) */}
<div className="form-row form-row-full">
  <label className="form-label form-label-textarea">
    Bottler Name <span className="required">*</span>
  </label>

  <textarea
    rows="2"
    value={formData.bottlerName}
    onChange={(e) => handleInputChange("bottlerName", e.target.value)}
    placeholder="ENTER REGISTERED COMPANY OR BOTTLING ENTITY LEGAL NAME"
    className={`form-textarea ${
      formErrors.bottlerName ? "form-input-error" : ""
    }`}
  />
</div>

<div className="form-row form-row-full">
  <label className="form-label form-label-textarea">
    Address <span className="required">*</span>
  </label>

  <textarea
    rows="3"
    value={formData.address}
    onChange={(e) => handleInputChange("address", e.target.value)}
    placeholder="COMPLETE PLANT OR DISTILLERY PREMISE PHYSICAL ADDRESS"
    className={`form-textarea ${
      formErrors.address ? "form-input-error" : ""
    }`}
         />
        </div>

        {/* Pin Code */}
        <div className="form-row">
        <label className="form-label"> Pin Code <span className="required">*</span> </label>
        <input type="text" maxLength="10" value={formData.pinCode} onChange={(e) => handleInputChange("pinCode", e.target.value)} 
          placeholder="ZIP or PIN code" className={`form-input form-input-small ${ formErrors.pinCode ? "form-input-error" : "" }`} />
           </div>
          </div>
        {/* Action buttons precision-modeled after the screenshot */}
        <div className="form-actions">
        <button type="submit" className="form-action-button" style={{ minWidth: "80px" }} > Save </button>
        <button type="button" onClick={handleReset} className="form-action-button" style={{ minWidth: "80px" }}> Cancel </button>
        </div>
        </form>
      </div>

      {/* Database Registered Listings */}
        <div className="bottler-directory-card">
        <div className="bottler-directory-header">
        <div>
        <h2 className="bottler-directory-title">
        <span>Bottler Records Directory</span>
        <span className="bottler-total-badge">
          {bottlersList.length} total
        </span>
        </h2>
         <p className="bottler-directory-subtitle"> Filter, search, and audit current database entries. </p>
         </div>
          <div className="table-toolbar">
            {/* Search Input */}
            <div className="table-search-wrapper">
              <Search className="table-search-icon" />
              <input type="text" placeholder="Search name, code, state..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="table-search-input" />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="table-search-clear" >
              <X className="table-search-clear-icon" />
              </button>
              )}
            </div>

            {/* Load Default Samples */}
            <button
              onClick={loadDefaultSamples}
              className="table-reset-button"
            >
              <RefreshCw className="table-refresh-icon" />
              <span>Reset to Sample Data</span>
            </button>
          </div>
        </div>
        {processedBottlers.length === 0 ? (
        <div className="table-empty-state">
            <div className="table-empty-icon-wrapper">
              <Sliders className="table-empty-icon" />
            </div>
              <p className="table-empty-title"> No matching bottler records found </p>
              <p className="table-empty-subtitle">Try refining your search keyword or load the sample dataset.</p>
          </div>
        ) : (
            <div className="table-container">
              <table className="bottler-table">
              <thead>
                <tr className="table-header-row">
                <th className="table-header-cell" onClick={() => handleSort("id")} > ID </th>
                <th className="table-header-cell" onClick={() => handleSort("bottlerName")}> Bottler Name / Address </th>
                <th className="table-header-cell" onClick={() => handleSort("bottlerCode")} > Bottler Code </th>
                <th className="table-header-cell" onClick={() => handleSort("origin")}> Origin </th>
                <th className="table-header-cell" onClick={() => handleSort("state")} > Location </th>
                <th className="table-header-cell" onClick={() => handleSort("oldBottlerId")}> Old Bottler ID </th>
                <th className="table-header-action"> Action </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {paginatedBottlers.map((b) => (
                    <tr key={b.id} className="table-row">
                    <td className="table-id-cell">{b.id}</td>
                    <td className="table-bottler-cell">
                    <div className="table-bottler-name">{b.bottlerName}</div>
                     <div className="table-bottler-address" title={b.address} >
                        {b.address}
                      </div>
                    </td>
                    <td className="table-code-cell">
                      <span className="table-code-badge">
                        {b.bottlerCode}
                      </span>
                    </td>
                    <td className="table-origin-cell">
                    <span className={`table-origin-badge ${ b.origin === "In India" ? "table-origin-india" : "table-origin-import" }`} >
                        {b.origin}
                      </span>
                    </td>
                    <td className="table-country-cell">
                    <div className="table-country-name">{b.country}</div>
                    {b.state && ( <div className="table-country-state">{b.state}</div> )}
                    </td>
                      <td className="table-old-id-cell"> {b.oldBottlerId || "N/A"} </td>
                      <td className="table-action-cell">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="table-delete-button"
                        title="Delete Bottler Entry"
                      >
                        <Trash2 className="table-delete-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
        <div className="table-footer">
            <div className="table-entry-count">
            Showing <span className="table-entry-highlight">{startIndex + 1}</span> to{" "}
            <span className="table-entry-highlight">{Math.min(startIndex + pageSize, totalItems)} </span>{" "} of{" "}
            <span className="table-entry-highlight">{totalItems}</span> entries
            </div>
              <div className="wizard-navigation">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="wizard-nav-button"
                >
                  <ChevronLeft className="table-pagination-icon" />
                </button>
                <div className="wizard-nav-text">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="wizard-nav-button"
                >
                  <ChevronRight className="wizard-title-arrow-icon" />
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
