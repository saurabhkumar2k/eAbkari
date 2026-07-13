import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5214';
const ORIGIN_LABELS = {
  I: 'India',
  N: 'Nepal',
  B: 'Bhutan',
  W: 'West Bengal',
  R: 'Rest of World',
  A: 'All'
};

export default function BottlerMaster({ onNavigateHome }) {
  const [bottlersList, setBottlersList] = useState([]);

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

  const [originOptions, setOriginOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [bottlerCodeOptions, setBottlerCodeOptions] = useState([]);
  const [gridBottlers, setGridBottlers] = useState([]);
  const [useGridApi, setUseGridApi] = useState(false);
  const [gridLoading, setGridLoading] = useState(false);

  const getOrigins = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Bottler/origins`);
      setOriginOptions(
        res.data.map(x => ({ value: x, label: x }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getStates = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Bottler/states`);
      setStateOptions(
        res.data.map(x => ({ value: x.stateCode, label: x.stateDesc }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getBottlerCodes = async (origin = '', stateCode = '') => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Bottler/codes`, {
        params: {
          origin: origin || undefined,
          stateCode: stateCode || undefined
        }
      });

      const options = res.data.map(x => ({ value: x, label: x }));
      const finalOptions = origin ? [{ value: '-New-', label: '-New-' }, ...options] : options;
      setBottlerCodeOptions(finalOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const mapBackendBottlerToUi = (item) => ({
    id: item.LiquorBottlerCode ?? item.liquorBottlerCode ?? item.code ?? `btr-${Math.random().toString(36).slice(2)}`,
    bottlerName: item.LiquorBottlerName ?? item.liquorBottlerName ?? item.bottler ?? '',
    bottlerCode: item.LiquorBottlerCode ?? item.liquorBottlerCode ?? item.code ?? '',
    origin: item.LiquorBottlerOrigin ?? item.liquorBottlerOrigin ?? item.origin ?? '',
    country: item.LiquorBottlerCountry ?? item.liquorBottlerCountry ?? item.originStateCountry ?? '',
    state: item.LiquorBottlerState ?? item.liquorBottlerState ?? item.originStateCountry ?? '',
    address: item.LiquorBottlerAddress ?? item.liquorBottlerAddress ?? '',
    oldBottlerId: item.OldBottlerId ?? item.oldBottlerId ?? ''
  });

  const fetchAllBottlers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Bottler`);
      setBottlersList(res.data.map(mapBackendBottlerToUi));
      setUseGridApi(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGridData = async (origin, stateCode) => {
    if (!origin) {
      setGridBottlers([]);
      setUseGridApi(false);
      return;
    }

    try {
      setGridLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/Bottler/grid`, {
        params: { origin, stateCode }
      });
      const mapped = res.data.map(item => ({
        id: item.code || item.bottler || item.originStateCountry || Math.random().toString(36).slice(2),
        bottlerName: item.bottler || '',
        bottlerCode: item.code || '',
        origin: item.origin || '',
        country: item.originStateCountry || '',
        state: item.originStateCountry || '',
        address: '',
        oldBottlerId: '',
        timestamp: Date.now()
      }));
      setGridBottlers(mapped);
      setUseGridApi(true);
    } catch (err) {
      console.log(err);
      setGridBottlers([]);
      setUseGridApi(false);
    } finally {
      setGridLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBottlers();
    getOrigins();
    getStates();
    getBottlerCodes();
  }, []);
  // Auto-set country when origin is "In India"
  useEffect(() => {
    if (formData.origin === 'I') {
      setFormData(prev => ({ ...prev, country: 'India' }));
    } else {
      setFormData(prev => ({ ...prev, state: '', country: prev.country === 'India' ? '' : prev.country }));
    }
  }, [formData.origin]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleInputChange = async (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'origin') {
      const stateCode = value === 'I' ? formData.state : undefined;
      setFormData(prev => ({
        ...prev,
        state: value === 'I' ? prev.state : '',
        bottlerCode: '',
        bottlerName: '',
        address: '',
        pinCode: '',
        oldBottlerId: ''
      }));
      fetchGridData(value, stateCode);
      getBottlerCodes(value, stateCode);
      return;
    }

    if (field === 'state' && formData.origin) {
      setFormData(prev => ({
        ...prev,
        bottlerCode: '',
        bottlerName: '',
        address: '',
        pinCode: '',
        oldBottlerId: ''
      }));
      fetchGridData(formData.origin, value);
      getBottlerCodes(formData.origin, value);
      return;
    }

    if (field === 'bottlerCode') {
      if (!value) {
        setFormData(prev => ({
          ...prev,
          bottlerName: '',
          address: '',
          pinCode: '',
          oldBottlerId: ''
        }));
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/Bottler/${encodeURIComponent(value)}`);
        const data = res.data;

        setFormData(prev => ({
          ...prev,
          country: prev.origin === 'I' ? 'India' : data.LiquorBottlerCountry ?? '',
          state: prev.origin === 'I' ? data.LiquorBottlerState ?? prev.state : prev.state,
          bottlerName: data.LiquorBottlerName ?? '',
          address: data.LiquorBottlerAddress ?? '',
          pinCode: data.LiquorBottlerPinCode ?? '',
          oldBottlerId: data.OldBottlerId ?? ''
        }));
      } catch (err) {
        console.log(err);
      }
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

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.origin) errors.origin = 'Origin is required';
    if (formData.origin === 'I' && !formData.state) errors.state = 'State is required';
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

    const payload = {
      LiquorBottlerOrigin: formData.origin,
      LiquorBottlerCode: formData.bottlerCode,
      LiquorBottlerCountry: formData.origin === 'I' ? 'India' : formData.country,
      LiquorBottlerState: formData.origin === 'I' ? formData.state : formData.state || '',
      LiquorBottlerName: formData.bottlerName.trim().toUpperCase(),
      LiquorBottlerAddress: formData.address.trim().toUpperCase(),
      LiquorBottlerPinCode: formData.pinCode.trim(),
      OldBottlerId: formData.oldBottlerId.trim(),
      LicenseeIdNo: ''
    };

    try {
      await axios.post(`${API_BASE_URL}/api/Bottler`, payload);
      showToastMsg('Bottler profile registered successfully!');
      await fetchAllBottlers();
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
    } catch (err) {
      const message = err?.response?.data || 'Unable to save bottler record.';
      showToastMsg(message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Bottler master entry?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/Bottler/${encodeURIComponent(id)}`);
      showToastMsg('Bottler record removed successfully.', 'info');
      await fetchAllBottlers();
    } catch (err) {
      showToastMsg('Unable to delete bottler record.', 'error');
    }
  };

  const loadDefaultSamples = async () => {
    await fetchAllBottlers();
    setUseGridApi(false);
    showToastMsg('Bottler list refreshed from backend.', 'info');
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
    const dataSource = useGridApi ? gridBottlers : bottlersList;
    let filtered = dataSource;

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
  }, [bottlersList, gridBottlers, useGridApi, searchTerm, sortColumn, sortDirection]);

  const totalItems = processedBottlers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBottlers = useMemo(() => {
    return processedBottlers.slice(startIndex, startIndex + pageSize);
  }, [processedBottlers, startIndex, pageSize]);

  const groupedBottlers = useMemo(() => {
    return paginatedBottlers.reduce((groups, item) => {
      const groupKey = item.country || item.state || item.origin || 'Unknown';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  }, [paginatedBottlers]);

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
                        <option key={opt.value} value={opt.value}>{ORIGIN_LABELS[opt.value] || opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label className="form-label">
                    State {formData.origin === 'I' && (<span className="required">*</span>)}
                  </label>
                  <div className="form-field">
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={formData.origin !== 'I'}
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
{/* <div className="form-row">
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
</div> */}

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
    disabled={formData.origin === 'I'}
    placeholder="e.g. France, Scotland"
    className={`form-input ${
      formData.origin === 'I' ? 'form-input-disabled' : ''
    } ${formErrors.country ? 'form-input-error' : ''}`}
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
              <table className="bottler-grid-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header-cell">Origin/State/Country</th>
                    <th className="table-header-cell">Bottle</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {Object.entries(groupedBottlers).map(([group, bottlers]) => (
                    <React.Fragment key={group}>
                      <tr className="table-group-row">
                        <td colSpan={2} className="table-origin-cell">
                          <strong>{group}</strong>
                        </td>
                      </tr>

                      {bottlers.map((b) => (
                        <tr key={b.id || b.bottlerCode} className="table-row">
                          <td></td>
                          <td className="table-bottle-cell">
                            <div className="table-bottle-name">{b.bottlerName || b.Bottler || 'Unknown Bottler'}</div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
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
