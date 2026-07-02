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
  Building, 
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

const brandOwnerCodeOptions = [
  { value: 'BOC-DEL-701', label: 'BOC-DEL-701 (Excise Delhi registered)' },
  { value: 'BOC-HAR-702', label: 'BOC-HAR-702 (Excise Haryana registered)' },
  { value: 'BOC-MUM-703', label: 'BOC-MUM-703 (Excise Maharashtra registered)' },
  { value: 'BOC-INT-901', label: 'BOC-INT-901 (International Premium Brands)' }
];

const INITIAL_OWNERS_POOL = [
  { id: 'BWO-2001', origin: 'In India', state: 'Delhi', oldBrandOwnerId: 'OLD-BWO-312', brandOwnerCode: 'BOC-DEL-701', country: 'India', brandOwnerName: 'DIAGEO INDIA PVT. LTD. (UNITED SPIRITS)', address: 'Excise Tower, Kasturba Gandhi Marg, New Delhi', pinCode: '110001', timestamp: 1711213010000 },
  { id: 'BWO-2002', origin: 'In India', state: 'Maharashtra', oldBrandOwnerId: 'OLD-BWO-855', brandOwnerCode: 'BOC-MUM-703', country: 'India', brandOwnerName: 'PERNOD RICARD INDIA PRIVATE LIMITED', address: 'Building 10, DLF Cyber City Phase II, Gurugram', pinCode: '122002', timestamp: 1711213123000 },
  { id: 'BWO-2003', origin: 'Outside India', state: '', oldBrandOwnerId: 'OLD-BWO-400', brandOwnerCode: 'BOC-INT-901', country: 'Scotland', brandOwnerName: 'THE MACALLAN DISTILLERS LTD.', address: 'Easter Elchies, Craigellachie, Banffshire', pinCode: 'AB38 9RX', timestamp: 1711213233000 }
];

export default function BrandOwnerMaster({ onNavigateHome }) {
  // Local storage state
  const [ownersList, setOwnersList] = useState(() => {
    const saved = localStorage.getItem('excise_brand_owner_registry');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_OWNERS_POOL;
      }
    }
    return INITIAL_OWNERS_POOL;
  });

  // Form State
  const [formData, setFormData] = useState({
    origin: '',
    state: '',
    oldBrandOwnerId: '',
    brandOwnerCode: '',
    country: '',
    brandOwnerName: '',
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
    localStorage.setItem('excise_brand_owner_registry', JSON.stringify(list));
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
      oldBrandOwnerId: '',
      brandOwnerCode: '',
      country: '',
      brandOwnerName: '',
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
    if (!formData.brandOwnerCode) errors.brandOwnerCode = 'Brand Owner Code is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.brandOwnerName.trim()) errors.brandOwnerName = 'Brand Owner Name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.pinCode.trim()) errors.pinCode = 'Pin Code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg('Please fill in all mandatory fields.', 'error');
      return;
    }

    const isDuplicate = ownersList.some(
      b => b.brandOwnerCode === formData.brandOwnerCode && b.brandOwnerName.toLowerCase() === formData.brandOwnerName.trim().toLowerCase()
    );

    if (isDuplicate) {
      showToastMsg('A brand owner with this name and code already exists.', 'error');
      return;
    }

    const newOwner = {
      id: `BWO-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      brandOwnerName: formData.brandOwnerName.trim().toUpperCase(),
      address: formData.address.trim().toUpperCase(),
      timestamp: Date.now()
    };

    const updated = [newOwner, ...ownersList];
    setOwnersList(updated);
    saveToLocalStorage(updated);
    showToastMsg('Brand Owner profile registered successfully!');
    
    // Clear form
    setFormData({
      origin: '',
      state: '',
      oldBrandOwnerId: '',
      brandOwnerCode: '',
      country: '',
      brandOwnerName: '',
      address: '',
      pinCode: ''
    });
    setFormErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Brand Owner record?')) {
      const updated = ownersList.filter(b => b.id !== id);
      setOwnersList(updated);
      saveToLocalStorage(updated);
      showToastMsg('Brand Owner record removed successfully.', 'info');
    }
  };

  const loadDefaultSamples = () => {
    setOwnersList(INITIAL_OWNERS_POOL);
    saveToLocalStorage(INITIAL_OWNERS_POOL);
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

  const processedOwners = useMemo(() => {
    let filtered = ownersList;

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.brandOwnerName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.brandOwnerCode.toLowerCase().includes(query) ||
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
  }, [ownersList, searchTerm, sortColumn, sortDirection]);

  const totalItems = processedOwners.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOwners = useMemo(() => {
    return processedOwners.slice(startIndex, startIndex + pageSize);
  }, [processedOwners, startIndex, pageSize]);

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
          <div className="wizard-title-banner" style={{ minWidth: '220px' }}>
            <span className="wizard-title-text">Brand Owner Master</span>
            {/* Ribbon tail cut */}
            <div className="wizard-title-arrow"></div>
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
            <Building className="wizard-title-icon" />
            <span>Brand Owner Directory</span>
          </h1>
          <p className="bottler-directory-description">
            Register and maintain master records of brand owners, breweries, and distilleries.
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
                {formData.origin === 'In India' && <span className="required">*</span>}
              </label>
              <div className="form-field">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={formData.origin === 'Outside India'}
                  className={`form-input ${formData.origin === "Outside India" ? "form-input-disabled" : ""} ${formErrors.state ? "form-input-error" : ""}`}
                >
                  <option value="">--Select--</option>
                  {stateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Old Brand Owner Id */}
            <div className="form-row">
              <label className="form-label">
                Old Brand Owner Id
              </label>
              <input
                type="text"
                value={formData.oldBrandOwnerId}
                onChange={(e) => handleInputChange('oldBrandOwnerId', e.target.value)}
                placeholder="e.g. OLD-BWO-312"
                className="form-input"
              />
            </div>

            {/* Brand Owner Code */}
            <div className="form-row">
              <label className="form-label">
                Brand Owner Code <span className="required">*</span>
              </label>
              <div className="form-field">
                <select
                  value={formData.brandOwnerCode}
                  onChange={(e) => handleInputChange('brandOwnerCode', e.target.value)}
                  className={`form-input ${formErrors.brandOwnerCode ? "form-input-error" : ""}`}
                >
                  <option value="">--Select--</option>
                  {brandOwnerCodeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.value}</option>
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
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={formData.origin === 'In India'}
                placeholder="e.g. France, Scotland"
                className={`form-input ${formData.origin === "In India" ? "form-input-disabled" : ""} ${formErrors.country ? "form-input-error" : ""}`}
              />
            </div>

            {/* Empty col for layout alignment */}
            <div className="form-spacer"></div>

            {/* Brand Owner Name (Textarea) */}
            <div className="form-row form-row-full">
              <label className="form-label form-label-textarea">
                Brand Owner Name <span className="required">*</span>
              </label>
              <textarea
                rows="2"
                value={formData.brandOwnerName}
                onChange={(e) => handleInputChange('brandOwnerName', e.target.value)}
                placeholder="ENTER REGISTERED COMPANY OR PARENT CONGLOMERATE LEGAL NAME"
                className={`form-textarea ${formErrors.brandOwnerName ? "form-input-error" : ""}`}
              />
            </div>

            {/* Address (Textarea) */}
            <div className="form-row form-row-full">
              <label className="form-label form-label-textarea">
                Address <span className="required">*</span>
              </label>
              <textarea
                rows="3"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="COMPLETE REGISTERED CORPORATE OFFICE OR DISTILLERY ADDRESS"
                className={`form-textarea ${formErrors.address ? "form-input-error" : ""}`}
              />
            </div>

            {/* Pin Code */}
            <div className="form-row">
              <label className="form-label"> Pin Code <span className="required">*</span> </label>
              <input 
                type="text" 
                maxLength="10" 
                value={formData.pinCode} 
                onChange={(e) => handleInputChange("pinCode", e.target.value)} 
                placeholder="ZIP or PIN code" 
                className={`form-input form-input-small ${formErrors.pinCode ? "form-input-error" : ""}`} 
              />
            </div>

          </div>

          {/* Action buttons matching screenshot [Cancel] [Save] right-aligned */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleReset} 
              className="form-action-button" 
              style={{ minWidth: "80px" }}
            > 
              Cancel 
            </button>
            <button 
              type="submit" 
              className="form-action-button" 
              style={{ minWidth: "80px" }}
            > 
              Save 
            </button>
          </div>
        </form>
      </div>

      {/* Database Registered Listings */}
      <div className="bottler-directory-card">
        <div className="bottler-directory-header">
          <div>
            <h2 className="bottler-directory-title">
              <span>Brand Owner Directory</span>
              <span className="bottler-total-badge">
                {ownersList.length} total
              </span>
            </h2>
            <p className="bottler-directory-subtitle">Filter, search, and audit current database entries.</p>
          </div>

          <div className="table-toolbar">
            {/* Search Input */}
            <div className="table-search-wrapper">
              <Search className="table-search-icon" />
              <input 
                type="text" 
                placeholder="Search name, code, state..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="table-search-input" 
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="table-search-clear"
                >
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

        {processedOwners.length === 0 ? (
          <div className="table-empty-state">
            <div className="table-empty-icon-wrapper">
              <Sliders className="table-empty-icon" />
            </div>
            <p className="table-empty-title">No matching brand owner records found</p>
            <p className="table-empty-subtitle">Try refining your search keyword or load the sample dataset.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="bottler-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell" onClick={() => handleSort('id')}>ID</th>
                  <th className="table-header-cell" onClick={() => handleSort('brandOwnerName')}>Brand Owner Name / Address</th>
                  <th className="table-header-cell" onClick={() => handleSort('brandOwnerCode')}>Code</th>
                  <th className="table-header-cell" onClick={() => handleSort('origin')}>Origin</th>
                  <th className="table-header-cell" onClick={() => handleSort('state')}>Location</th>
                  <th className="table-header-cell" onClick={() => handleSort('oldBrandOwnerId')}>Old Owner ID</th>
                  <th className="table-header-action">Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {paginatedOwners.map((b) => (
                  <tr key={b.id} className="table-row">
                    <td className="table-id-cell">{b.id}</td>
                    <td className="table-bottler-cell">
                      <div className="table-bottler-name">{b.brandOwnerName}</div>
                      <div className="table-bottler-address" title={b.address}>
                        {b.address}
                      </div>
                    </td>
                    <td className="table-code-cell">
                      <span className="table-code-badge">
                        {b.brandOwnerCode}
                      </span>
                    </td>
                    <td className="table-origin-cell">
                      <span className={`table-origin-badge ${b.origin === 'In India' ? 'table-origin-india' : 'table-origin-import'}`}>
                        {b.origin}
                      </span>
                    </td>
                    <td className="table-country-cell">
                      <div className="table-country-name">{b.country}</div>
                      {b.state && <div className="table-country-state">{b.state}</div>}
                    </td>
                    <td className="table-old-id-cell">{b.oldBrandOwnerId || 'N/A'}</td>
                    <td className="table-action-cell">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="table-delete-button"
                        title="Delete Brand Owner Record"
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
                Showing <span className="table-entry-highlight">{startIndex + 1}</span> to{' '}
                <span className="table-entry-highlight">{Math.min(startIndex + pageSize, totalItems)}</span> of{' '}
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
