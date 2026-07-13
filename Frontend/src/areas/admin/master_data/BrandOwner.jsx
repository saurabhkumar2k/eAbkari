import React, { useEffect, useMemo, useState } from 'react';
import {
  Trash2,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Info,
  AlertCircle,
  CheckCircle2,
  Building,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5214';
const API = `${API_BASE_URL}/api/Bottler`;
const LG_API = `${API_BASE_URL}/api/LGDiretory`;
const MAX_VISIBLE_PAGES = 10;

const ORIGIN_LABELS = {
  I: 'India',
  O: 'India',
  W: 'West Bengal',
  R: 'Rest Foreign Country',
  B: 'Bhutan',
  N: 'Nepal',
  A: 'Rest Foreign Country'
};

const ORIGIN_OPTIONS_FALLBACK = [
  { value: 'B', label: 'Bhutan' },
  { value: 'I', label: 'India' },
  { value: 'N', label: 'Nepal' },
  { value: 'R', label: 'Rest Foreign Country' }
];

const ORIGIN_DISPLAY_ORDER = ['B', 'I', 'N', 'R'];

const toArray = (data) => (Array.isArray(data) ? data : []);

const getValue = (item, ...keys) => {
  for (const key of keys) {
    if (item?.[key] !== undefined && item?.[key] !== null) {
      return item[key];
    }
  }
  return '';
};

const normalizeCode = (value) => String(value ?? '').trim().toLowerCase();

const buildOriginOptions = (originCodes) => {
  const normalizedSet = new Set(toArray(originCodes).map((code) => String(code || '').trim()).filter(Boolean));

  const ordered = ORIGIN_DISPLAY_ORDER.filter((code) => normalizedSet.has(code));
  const remaining = [...normalizedSet].filter((code) => ORIGIN_DISPLAY_ORDER.includes(code) && !ordered.includes(code)).sort();

  const finalCodes = [...ordered, ...remaining];

  if (finalCodes.length === 0) {
    return ORIGIN_OPTIONS_FALLBACK;
  }

  return finalCodes.map((code) => ({ value: code, label: ORIGIN_LABELS[code] || code }));
};

export default function BrandOwnerMaster({ onNavigateHome }) {
  const [ownersList, setOwnersList] = useState([]);
  const [gridRows, setGridRows] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [originOptions, setOriginOptions] = useState(ORIGIN_OPTIONS_FALLBACK);
  const [brandOwnerCodeOptions, setBrandOwnerCodeOptions] = useState([]);

  const [formData, setFormData] = useState({
    origin: '',
    state: '',
    brandOwnerCode: '',
    manualBrandOwnerCode: '',
    country: '',
    brandOwnerName: '',
    address: '',
    pinCode: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingCode, setIsDeletingCode] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  const getOriginLabel = (originCode) => ORIGIN_LABELS[originCode] || originCode || 'N/A';

  const getStateName = (stateCode, source = stateOptions) => {
    const found = source.find(
      (state) => normalizeCode(getValue(state, 'stateCode', 'StateCode')) === normalizeCode(stateCode)
    );

    return getValue(found, 'stateName', 'StateName', 'stateDesc', 'StateDesc') || stateCode || '';
  };

  const mapOwner = (item, statesSource = stateOptions) => {
    const code = String(getValue(item, 'liquorBottlerCode', 'LiquorBottlerCode')).trim();
    const originCode = String(getValue(item, 'liquorBottlerOrigin', 'LiquorBottlerOrigin')).trim();
    const stateCode = String(getValue(item, 'liquorBottlerState', 'LiquorBottlerState')).trim();

    return {
      id: code,
      brandOwnerCode: code,
      originCode,
      origin: getOriginLabel(originCode),
      country: getValue(item, 'liquorBottlerCountry', 'LiquorBottlerCountry') || 'N/A',
      stateCode,
      state: getStateName(stateCode, statesSource),
      brandOwnerName: getValue(item, 'liquorBottlerName', 'LiquorBottlerName') || 'N/A',
      address: getValue(item, 'liquorBottlerAddress', 'LiquorBottlerAddress') || 'N/A',
      pinCode: getValue(item, 'liquorBottlerPinCode', 'LiquorBottlerPinCode') || 'N/A',
      timestamp: Date.now(),
      raw: item
    };
  };

  const mapGridRow = (item) => {
    const code = String(getValue(item, 'code', 'Code')).trim();
    const originCode = String(getValue(item, 'origin', 'Origin')).trim();

    return {
      id: code,
      brandOwnerCode: code,
      brandOwnerName: getValue(item, 'bottler', 'Bottler') || 'N/A',
      location: getValue(item, 'originStateCountry', 'OriginStateCountry') || 'N/A',
      originCode,
      timestamp: Date.now()
    };
  };

  const loadBaseMasters = async () => {
    try {
      const [originsResponse, statesResponse] = await Promise.all([
        axios.get(`${API}/origins`),
        axios.get(`${LG_API}/getState`)
      ]);

      setOriginOptions(buildOriginOptions(originsResponse.data));
      setStateOptions(toArray(statesResponse.data));
    } catch (error) {
      console.error('Failed to load brand owner master values:', error);
      showToastMsg('Unable to load origin/state master data.', 'error');
    }
  };

  const loadOwners = async (statesSource = stateOptions) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API);
      const mapped = toArray(response.data).map((item) => mapOwner(item, statesSource));
      setOwnersList(mapped);
    } catch (error) {
      console.error('Failed to load brand owners:', error);
      setOwnersList([]);
      showToastMsg('Unable to load brand owner list.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCodeOptions = async (originCode, stateCode) => {
    if (!originCode) {
      setBrandOwnerCodeOptions([]);
      return;
    }

    try {
      const response = await axios.get(`${API}/codes`, {
        params: {
          origin: originCode,
          stateCode: stateCode || undefined
        }
      });
      setBrandOwnerCodeOptions(toArray(response.data).map((code) => String(code || '').trim()).filter(Boolean));
    } catch (error) {
      console.error('Failed to load brand owner code options:', error);
      setBrandOwnerCodeOptions([]);
    }
  };

  const loadGridRows = async (originCode, stateCode) => {
    if (!originCode) {
      setGridRows([]);
      return;
    }

    try {
      const response = await axios.get(`${API}/grid`, {
        params: {
          origin: originCode,
          stateCode: originCode === 'I' ? (stateCode || undefined) : undefined
        }
      });

      setGridRows(toArray(response.data).map(mapGridRow));
    } catch (error) {
      console.error('Failed to load Brand Owner grid:', error);
      setGridRows([]);
      showToastMsg('Unable to load Brand Owner table data.', 'error');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      let loadedStates = [];

      try {
        const [originsResponse, statesResponse] = await Promise.all([
          axios.get(`${API}/origins`),
          axios.get(`${LG_API}/getState`)
        ]);

        loadedStates = toArray(statesResponse.data);
        setStateOptions(loadedStates);
        setOriginOptions(buildOriginOptions(originsResponse.data));
      } catch (error) {
        console.error('Failed to load brand owner master dropdowns:', error);
        showToastMsg('Unable to load origin/state master data.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!formData.origin) {
      setBrandOwnerCodeOptions([]);
      setGridRows([]);
      return;
    }

    loadCodeOptions(formData.origin, formData.origin === 'I' ? formData.state : '');
    loadGridRows(formData.origin, formData.state);
  }, [formData.origin]);

  useEffect(() => {
    if (!formData.origin) return;
    if (formData.origin !== 'I') return;
    loadCodeOptions(formData.origin, formData.state);
    loadGridRows(formData.origin, formData.state);
  }, [formData.state]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, formData.origin, formData.state]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBrandOwnerCodeChange = async (selectedCode) => {
    const normalizedCode = String(selectedCode || '').trim();
    handleInputChange('brandOwnerCode', normalizedCode);

    if (!normalizedCode || normalizedCode === '__NEW__') {
      setFormData((prev) => ({
        ...prev,
        manualBrandOwnerCode: normalizedCode === '__NEW__' ? prev.manualBrandOwnerCode : '',
        brandOwnerName: '',
        address: '',
        pinCode: ''
      }));
      return;
    }

    try {
      const response = await axios.get(`${API}/lookup`, {
        params: { code: normalizedCode }
      });
      const data = response?.data ?? {};

      setFormData((prev) => ({
        ...prev,
        brandOwnerCode: normalizedCode,
        manualBrandOwnerCode: '',
        state: prev.origin === 'I' ? String(getValue(data, 'liquorBottlerState', 'LiquorBottlerState')).trim() : prev.state,
        country: String(getValue(data, 'liquorBottlerCountry', 'LiquorBottlerCountry') || prev.country || '').trim(),
        brandOwnerName: String(getValue(data, 'liquorBottlerName', 'LiquorBottlerName') || '').trim(),
        address: String(getValue(data, 'liquorBottlerAddress', 'LiquorBottlerAddress') || '').trim(),
        pinCode: String(getValue(data, 'liquorBottlerPinCode', 'LiquorBottlerPinCode') || '').trim()
      }));
    } catch (error) {
      console.error('Failed to auto-fill Brand Owner data by code:', error);
      showToastMsg('Unable to load selected Brand Owner details.', 'error');
    }
  };

  const handleOriginChange = (value) => {
    const nextCountry =
      value === 'I' || value === 'O' || value === 'W'
        ? 'India'
        : value === 'B'
          ? 'Bhutan'
          : value === 'N'
            ? 'Nepal'
            : '';

    setFormData((prev) => ({
      ...prev,
      origin: value,
      state: value === 'I' ? prev.state : '',
      brandOwnerCode: '',
      manualBrandOwnerCode: '',
      country: nextCountry
    }));

    if (formErrors.origin || formErrors.state || formErrors.brandOwnerCode) {
      setFormErrors((prev) => ({
        ...prev,
        origin: '',
        state: '',
        brandOwnerCode: ''
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      origin: '',
      state: '',
      brandOwnerCode: '',
      manualBrandOwnerCode: '',
      country: '',
      brandOwnerName: '',
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
    if (!formData.brandOwnerCode) {
      errors.brandOwnerCode = 'Brand Owner Code is required';
    }
    if (formData.brandOwnerCode === '__NEW__' && !formData.manualBrandOwnerCode.trim()) {
      errors.brandOwnerCode = 'Please enter a new Brand Owner Code';
    }
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.brandOwnerName.trim()) errors.brandOwnerName = 'Brand Owner Name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.pinCode.trim()) errors.pinCode = 'Pin Code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg('Please fill in all mandatory fields.', 'error');
      return;
    }

    const normalizedCode =
      formData.brandOwnerCode === '__NEW__'
        ? formData.manualBrandOwnerCode.trim().toUpperCase()
        : formData.brandOwnerCode.trim().toUpperCase();

    const isUpdateMode = formData.brandOwnerCode !== '__NEW__';

    if (!isUpdateMode) {
      try {
        await axios.get(`${API}/lookup`, {
          params: { code: normalizedCode }
        });
        showToastMsg('A brand owner with this code already exists.', 'error');
        return;
      } catch (error) {
        // Continue when 404/not found.
      }
    }

    const payload = {
      liquorBottlerOrigin: formData.origin,
      liquorBottlerCode: normalizedCode,
      liquorBottlerCountry: formData.country.trim(),
      liquorBottlerState: formData.state || '',
      liquorBottlerName: formData.brandOwnerName.trim().toUpperCase(),
      liquorBottlerAddress: formData.address.trim().toUpperCase(),
      liquorBottlerPinCode: formData.pinCode.trim(),
      licenseeIdNo: null,
      entryFlag: 'O',
      deleteStatus: 'N',
      oldBottlerId: null
    };

    setIsSaving(true);
    try {
      if (isUpdateMode) {
        await axios.put(API, payload);
        showToastMsg('Record updated successfully!', 'success');
        window.alert('Record updated successfully!');
      } else {
        await axios.post(API, payload);
        showToastMsg('Brand Owner profile registered successfully!', 'success');
        window.alert('Brand Owner profile registered successfully!');
      }

      await loadGridRows(formData.origin, formData.state);
      await loadCodeOptions(formData.origin, formData.origin === 'I' ? formData.state : '');

      if (isUpdateMode) {
        setFormData({
          origin: '',
          state: '',
          brandOwnerCode: '',
          manualBrandOwnerCode: '',
          country: '',
          brandOwnerName: '',
          address: '',
          pinCode: ''
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          brandOwnerCode: '',
          manualBrandOwnerCode: '',
          brandOwnerName: '',
          address: '',
          pinCode: ''
        }));
      }

      setFormErrors({});
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to save brand owner:', error);
      showToastMsg('Unable to save Brand Owner record.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm('Are you sure you want to delete this Brand Owner record?')) {
      setIsDeletingCode(code);
      try {
        await axios.delete(`${API}/${encodeURIComponent(code)}`);
        await loadGridRows(formData.origin, formData.state);
        showToastMsg('Brand Owner record removed successfully.', 'info');
      } catch (error) {
        console.error('Failed to delete brand owner:', error);
        showToastMsg('Unable to delete Brand Owner record.', 'error');
      } finally {
        setIsDeletingCode('');
      }
    }
  };

  const loadDefaultSamples = async () => {
    await loadBaseMasters();
    await loadGridRows(formData.origin, formData.state);
    showToastMsg('Brand Owner dataset refreshed from API.', 'info');
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const processedOwners = useMemo(() => {
    let filtered = [...gridRows];

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        String(item.brandOwnerName || '').toLowerCase().includes(query) ||
        String(item.id || '').toLowerCase().includes(query) ||
        String(item.brandOwnerCode || '').toLowerCase().includes(query) ||
        String(item.location || '').toLowerCase().includes(query)
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
  }, [gridRows, searchTerm, sortColumn, sortDirection]);

  const getLegacyGridLocation = (owner) => {
    return owner.location || 'N/A';
  };

  const firstColumnHeader =
    formData.origin === 'I' || formData.origin === 'O' || formData.origin === 'W' ? 'STATE' : 'ORIGIN';

  const totalItems = processedOwners.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedOwners = useMemo(() => {
    return processedOwners.slice(startIndex, startIndex + pageSize);
  }, [processedOwners, startIndex, pageSize]);

  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];

    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bottler-master-container">
      {toast && (
        <div
          className={`toast-notification ${
            toast.type === 'success' ? 'toast-success' : toast.type === 'error' ? 'toast-error' : 'toast-default'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="toast-success-icon" />}
          {toast.type === 'error' && <AlertCircle className="toast-error-icon" />}
          {toast.type === 'info' && <Info className="toast-info-icon" />}
          <span className="toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="toast-close-btn">
            <X className="toast-close-icon" />
          </button>
        </div>
      )}

      <div className="wizard-container">
        <div className="wizard-header-actions">
          <div className="wizard-title-banner" style={{ minWidth: '220px' }}>
            <span className="wizard-title-text">Brand Owner Master</span>
            <div className="wizard-title-arrow" />
          </div>
        </div>

        <div className="wizard-section">
          <button onClick={onNavigateHome} className="wizard-back-button">
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

        <form onSubmit={handleSave} className="bottler-form">
          <div className="bottler-form-grid">
            <div className="form-row">
              <label className="form-label">
                Origin <span className="required">*</span>
              </label>
              <div className="form-field">
                <select
                  value={formData.origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className={`form-input ${formErrors.origin ? 'form-input-error' : ''}`}
                >
                  <option value="">--Select--</option>
                  {originOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">
                State {formData.origin === 'I' && <span className="required">*</span>}
              </label>
              <div className="form-field">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={formData.origin !== 'I'}
                  className={
                    formData.origin !== 'I'
                      ? 'w-full px-3 py-2 text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400 border border-slate-300 rounded shadow-inner focus:outline-none focus:ring-1 focus:ring-[#2b9ec3]'
                      : `form-input ${formErrors.state ? 'form-input-error' : ''}`
                  }
                >
                  <option value="">--Select--</option>
                  {stateOptions.map((opt) => {
                    const code = String(getValue(opt, 'stateCode', 'StateCode')).trim();
                    const label = getValue(opt, 'stateName', 'StateName', 'stateDesc', 'StateDesc');
                    return (
                      <option key={code} value={code}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">
                Brand Owner Code <span className="required">*</span>
              </label>
              <div className="form-field">
                <select
                  value={formData.brandOwnerCode}
                  onChange={(e) => handleBrandOwnerCodeChange(e.target.value)}
                  className={`form-input ${formErrors.brandOwnerCode ? 'form-input-error' : ''}`}
                >
                  <option value="">--Select--</option>
                  <option value="__NEW__">New</option>
                  {brandOwnerCodeOptions.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                {formData.brandOwnerCode === '__NEW__' && (
                  <input
                    type="text"
                    value={formData.manualBrandOwnerCode}
                    onChange={(e) => handleInputChange('manualBrandOwnerCode', e.target.value.toUpperCase())}
                    placeholder="Enter new Brand Owner Code"
                    className={`form-input ${formErrors.brandOwnerCode ? 'form-input-error' : ''}`}
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">
                Country <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={formData.origin === 'I' || formData.origin === 'O' || formData.origin === 'W' || formData.origin === 'B' || formData.origin === 'N'}
                placeholder="e.g. France, Scotland"
                className={`form-input ${
                  formData.origin === 'I' || formData.origin === 'O' || formData.origin === 'W' || formData.origin === 'B' || formData.origin === 'N' ? 'form-input-disabled' : ''
                } ${formErrors.country ? 'form-input-error' : ''}`}
              />
            </div>

            <div className="form-spacer" />

            <div className="form-row form-row-full">
              <label className="form-label form-label-textarea">
                Brand Owner Name <span className="required">*</span>
              </label>
              <textarea
                rows="2"
                value={formData.brandOwnerName}
                onChange={(e) => handleInputChange('brandOwnerName', e.target.value)}
                placeholder="ENTER REGISTERED COMPANY OR PARENT CONGLOMERATE LEGAL NAME"
                className={`form-textarea ${formErrors.brandOwnerName ? 'form-input-error' : ''}`}
              />
            </div>

            <div className="form-row form-row-full">
              <label className="form-label form-label-textarea">
                Address <span className="required">*</span>
              </label>
              <textarea
                rows="3"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="COMPLETE REGISTERED CORPORATE OFFICE OR DISTILLERY ADDRESS"
                className={`form-textarea ${formErrors.address ? 'form-input-error' : ''}`}
              />
            </div>

            <div className="form-row">
              <label className="form-label">
                {' '}
                Pin Code <span className="required">*</span>{' '}
              </label>
              <input
                type="text"
                maxLength="10"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                placeholder="ZIP or PIN code"
                className={`form-input form-input-small ${formErrors.pinCode ? 'form-input-error' : ''}`}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleReset} className="form-action-button" style={{ minWidth: '80px' }}>
              Cancel
            </button>
            <button type="submit" className="form-action-button" disabled={isSaving} style={{ minWidth: '80px' }}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      <div className="bottler-directory-card">
        <div className="bottler-directory-header">
          <div>
            <h2 className="bottler-directory-title">
              <span>Brand Owner Directory</span>
              <span className="bottler-total-badge">{processedOwners.length} total</span>
            </h2>
            <p className="bottler-directory-subtitle">Filter, search, and audit current database entries.</p>
          </div>

          <div className="table-toolbar">
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
                <button onClick={() => setSearchTerm('')} className="table-search-clear">
                  <X className="table-search-clear-icon" />
                </button>
              )}
            </div>

            <button onClick={loadDefaultSamples} className="table-reset-button">
              <RefreshCw className="table-refresh-icon" />
              <span>{isLoading ? 'Refreshing...' : 'Refresh from API'}</span>
            </button>
          </div>
        </div>

        {processedOwners.length === 0 ? (
          <div className="table-empty-state">
            <div className="table-empty-icon-wrapper">
              <Sliders className="table-empty-icon" />
            </div>
            <p className="table-empty-title">No matching brand owner records found</p>
            <p className="table-empty-subtitle">Try refining your search keyword or refresh from API.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="bottler-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell" onClick={() => handleSort('state')}>
                    {firstColumnHeader}
                  </th>
                  <th className="table-header-cell" onClick={() => handleSort('brandOwnerCode')}>
                    Code
                  </th>
                  <th className="table-header-cell" onClick={() => handleSort('brandOwnerName')}>
                    Brand Owner
                  </th>
                  <th className="table-header-action">Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {paginatedOwners.map((b) => (
                  <tr key={b.id} className="table-row">
                    <td className="table-id-cell">{getLegacyGridLocation(b)}</td>
                    <td className="table-code-cell">
                      <span className="table-code-badge">{b.brandOwnerCode}</span>
                    </td>
                    <td className="table-bottler-cell">
                      <div className="table-bottler-name">{b.brandOwnerName}</div>
                    </td>
                    <td className="table-action-cell">
                      <button
                        onClick={() => handleDelete(b.brandOwnerCode)}
                        disabled={isDeletingCode === b.brandOwnerCode}
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

            {totalItems > 0 && (
              <div className="table-footer">
                <div className="table-entry-count">
                  Showing <span className="table-entry-highlight">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
                  <span className="table-entry-highlight">{Math.min(startIndex + pageSize, totalItems)}</span> of{' '}
                  <span className="table-entry-highlight">{totalItems}</span> entries
                </div>

                <div className="wizard-navigation">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="wizard-nav-button"
                  >
                    <ChevronLeft className="table-pagination-icon" />
                  </button>

                  <div className="wizard-nav-text">Page {currentPage} of {Math.max(totalPages, 1)}</div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="wizard-nav-button"
                  >
                    <ChevronRight className="wizard-title-arrow-icon" />
                  </button>

                  <div className="wizard-nav-text">
                    {visiblePageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className="wizard-nav-button"
                        style={{ marginLeft: '6px', opacity: currentPage === page ? 1 : 0.7 }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
