import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  Search,
  RotateCcw,
  Save,
  Printer,
  Edit2,
  Trash2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Minus
} from 'lucide-react';

// Initial Categories for dropdown
const CATEGORY_OPTIONS = [
  { code: "L28", name: "L28 (Service of Indian Liquor in Club)" },
  { code: "L10", name: "L10 (Retail Vend in Shopping Malls & Airport)" },
  { code: "L15", name: "L15 (Service in Hotel / Guest House)" },
  { code: "L16", name: "L16 (Service in Restaurant attached to Hotel)" },
  { code: "L17", name: "L17 (Service in Independent Restaurant)" },
  { code: "L18", name: "L18 (Service of Wine, Beer and Alcopop)" },
  { code: "L19", name: "L19 (Round the clock service at Airport)" },
  { code: "L29", name: "L29 (Service at Club/Mess for Govt/Armed Forces)" },
  { code: "L30", name: "L30 (Possession at home in excess of limit)" },
  { code: "L1", name: "L1 (Wholesale Vend of Indian Liquor)" },
  { code: "L6", name: "L6 (Retail Vend in Public Sector)" },
  { code: "L11", name: "L11 (Retail Vend of Microbrewery Beer)" },
  { code: "L2", name: "L2 (Retail Vend in Private Sector)" },
  { code: "L3", name: "L3 (Retail Vend in Star Classified Hotels)" },
  { code: "L4", name: "L4 (Wholesale Supply of Denatured Spirit)" },
  { code: "L5", name: "L5 (Retail Vend of Denatured Spirit)" },
  { code: "L7", name: "L7 (Retail Vend in Shopping Malls)" },
  { code: "L8", name: "L8 (Retail Vend of Country Liquor)" },
  { code: "L9", name: "L9 (Retail Vend in Duty Free Shops)" },
  { code: "L31", name: "L31 (License for Warehouse for storage)" }
];

// Initial Sub-Categories records
const INITIAL_SUB_CATEGORIES = [
  {
    serial: "01",
    category: "L28",
    subCategoryCode: "L-28A",
    subCategory: "Non-Commercial Social Club Bar Service",
    licenseTitle: "L28 (Service of Indian Liquor in Club)",
    licenseAbbr: "L-28A",
    licenseeCatType: "Club / Association",
    importUnderBondFL: "No",
    importDutyPaidFL: "No",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "02",
    category: "L28",
    subCategoryCode: "L-28B",
    subCategory: "Sports Club & Gymkhana Bar Service",
    licenseTitle: "L28 (Service of Indian Liquor in Club)",
    licenseAbbr: "L-28B",
    licenseeCatType: "Club / Association",
    importUnderBondFL: "No",
    importDutyPaidFL: "No",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "03",
    category: "L10",
    subCategoryCode: "L-10A",
    subCategory: "General Departmental Retail Vend",
    licenseTitle: "L10 (Retail Vend of Indian Liquor in Shopping Malls)",
    licenseAbbr: "L-10A",
    licenseeCatType: "Retail Department Store",
    importUnderBondFL: "No",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "04",
    category: "L10",
    subCategoryCode: "L-10B",
    subCategory: "Airport Shopping Complex Premium Retail",
    licenseTitle: "L10 (Retail Vend in Shopping Complex at Airport)",
    licenseAbbr: "L-10B",
    licenseeCatType: "Retail Department Store",
    importUnderBondFL: "Yes",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "05",
    category: "L15",
    subCategoryCode: "L-15A",
    subCategory: "5-Star & Above Classified Hotel Bar Service",
    licenseTitle: "L15 (Service of Indian Liquor in a Hotel to residents in rooms)",
    licenseAbbr: "L-15A",
    licenseeCatType: "Hotel / Hospitality Establishment",
    importUnderBondFL: "Yes",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "06",
    category: "L15",
    subCategoryCode: "L-15B",
    subCategory: "Heritage & 4-Star Classified Hotel Bar Service",
    licenseTitle: "L15 (Service of Indian Liquor in a Hotel to residents in rooms)",
    licenseAbbr: "L-15B",
    licenseeCatType: "Hotel / Hospitality Establishment",
    importUnderBondFL: "Yes",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "07",
    category: "L16",
    subCategoryCode: "L-16A",
    subCategory: "Service in Restaurant attached to Hotel",
    licenseTitle: "L16 (Service of Indian Liquor in a Bar/Restaurant attached to a Hotel)",
    licenseAbbr: "L-16A",
    licenseeCatType: "Restaurant / Tavern",
    importUnderBondFL: "No",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "08",
    category: "L17",
    subCategoryCode: "L-17A",
    subCategory: "Independent Fine Dine Restaurant Bar",
    licenseTitle: "L17 (Service of Indian Liquor in Independent Restaurant)",
    licenseAbbr: "L-17A",
    licenseeCatType: "Restaurant / Tavern",
    importUnderBondFL: "No",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  },
  {
    serial: "09",
    category: "L1",
    subCategoryCode: "L-1A",
    subCategory: "Domestic Wholesale Vend of Indian Spirits",
    licenseTitle: "L1 (License for Wholesale Vend of Indian Liquor)",
    licenseAbbr: "L-1A",
    licenseeCatType: "Wholesale Distributor",
    importUnderBondFL: "Yes",
    importDutyPaidFL: "Yes",
    importUnderBondBS: "Yes",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "Yes"
  },
  {
    serial: "10",
    category: "L11",
    subCategoryCode: "L-11A",
    subCategory: "Microbrewery On-Site Craft Beer Service",
    licenseTitle: "L11 (Retail Vend of Beer, manufactured by Microbrewery)",
    licenseAbbr: "L-11A",
    licenseeCatType: "Microbrewery",
    importUnderBondFL: "No",
    importDutyPaidFL: "No",
    importUnderBondBS: "No",
    transportUnderBondFL: "Yes",
    transportDutyPaidFL: "Yes",
    transportUnderBondBS: "No"
  }
];

const LICENSEE_CAT_TYPES = [
  "--Select--",
  "Hotel / Hospitality Establishment",
  "Club / Association",
  "Restaurant / Tavern",
  "Wholesale Distributor",
  "Retail Department Store",
  "Government Canteen / Mess",
  "Microbrewery",
  "Distillery / Brewery",
  "Individual Home Possession",
  "Sacramental / Religious Institution"
];

const LicenseSubCategoryMaster = ({ onBack }) => {
  const [toast, setToast] = useState(null);
  const [subCategories, setSubCategories] = useState(() => {
    const saved = localStorage.getItem('dept_license_subcategories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SUB_CATEGORIES;
  });

  // Form Fields (Exact fields from image.png)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryCode, setSubCategoryCode] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [licenseTitle, setLicenseTitle] = useState('');
  const [licenseAbbr, setLicenseAbbr] = useState('');
  const [licenseeCatType, setLicenseeCatType] = useState('--Select--');

  // Business Permissions State (matching image.png)
  const [importUnderBondFL, setImportUnderBondFL] = useState('No');
  const [importDutyPaidFL, setImportDutyPaidFL] = useState('No');
  const [importUnderBondBS, setImportUnderBondBS] = useState('No');

  const [transportUnderBondFL, setTransportUnderBondFL] = useState('No');
  const [transportDutyPaidFL, setTransportDutyPaidFL] = useState('No');
  const [transportUnderBondBS, setTransportUnderBondBS] = useState('No');

  const [editingSerial, setEditingSerial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    localStorage.setItem('dept_license_subcategories', JSON.stringify(subCategories));
  }, [subCategories]);

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Handle Category selection
  const handleCategoryChange = (e) => {
    const catCode = e.target.value;
    setSelectedCategory(catCode);
    if (!catCode) {
      setLicenseTitle('');
      return;
    }
    const catObj = CATEGORY_OPTIONS.find(c => c.code === catCode);
    if (catObj) {
      setLicenseTitle(catObj.name);
      if (!subCategoryCode || subCategoryCode.indexOf(catCode) === -1) {
        setSubCategoryCode(`${catCode}-A`);
        setLicenseAbbr(`${catCode}-A`);
      }
    }
  };

  // Handle click on row to edit
  const handleSelectRow = (item) => {
    setEditingSerial(item.serial);
    setSelectedCategory(item.category);
    setSubCategoryCode(item.subCategoryCode);
    setSubCategoryName(item.subCategory);
    setLicenseTitle(item.licenseTitle);
    setLicenseAbbr(item.licenseAbbr);
    setLicenseeCatType(item.licenseeCatType);

    setImportUnderBondFL(item.importUnderBondFL || 'No');
    setImportDutyPaidFL(item.importDutyPaidFL || 'No');
    setImportUnderBondBS(item.importUnderBondBS || 'No');

    setTransportUnderBondFL(item.transportUnderBondFL || 'No');
    setTransportDutyPaidFL(item.transportDutyPaidFL || 'No');
    setTransportUnderBondBS(item.transportUnderBondBS || 'No');

    const editor = document.getElementById("license-subcat-editor-section");
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      triggerToast('Please select a Category from the dropdown.', 'error');
      return;
    }
    if (!subCategoryCode.trim()) {
      triggerToast('Please provide a valid Sub-Category Code.', 'error');
      return;
    }
    if (!subCategoryName.trim()) {
      triggerToast('Please enter Sub-Category description.', 'error');
      return;
    }

    const payload = {
      category: selectedCategory,
      subCategoryCode: subCategoryCode.trim(),
      subCategory: subCategoryName.trim(),
      licenseTitle: licenseTitle.trim(),
      licenseAbbr: licenseAbbr.trim() || subCategoryCode.trim(),
      licenseeCatType: licenseeCatType === '--Select--' ? 'General Licensee' : licenseeCatType,
      importUnderBondFL,
      importDutyPaidFL,
      importUnderBondBS,
      transportUnderBondFL,
      transportDutyPaidFL,
      transportUnderBondBS
    };

    if (editingSerial) {
      // Update existing item
      setSubCategories(prev => prev.map(item => {
        if (item.serial === editingSerial) {
          return { ...item, ...payload };
        }
        return item;
      }));
      triggerToast(`License Sub-Category [${subCategoryCode}] updated successfully!`, 'success');
      handleCancel();
    } else {
      // Add new record
      const nextNum = (subCategories.length + 1).toString().padStart(2, '0');
      const newRecord = {
        serial: nextNum,
        ...payload
      };
      setSubCategories(prev => [newRecord, ...prev]);
      triggerToast('New License Sub-Category registered successfully!', 'success');
      handleCancel();
    }
  };

  // Handle Cancel / Clear
  const handleCancel = () => {
    setEditingSerial(null);
    setSelectedCategory('');
    setSubCategoryCode('');
    setSubCategoryName('');
    setLicenseTitle('');
    setLicenseAbbr('');
    setLicenseeCatType('--Select--');
    setImportUnderBondFL('No');
    setImportDutyPaidFL('No');
    setImportUnderBondBS('No');
    setTransportUnderBondFL('No');
    setTransportDutyPaidFL('No');
    setTransportUnderBondBS('No');
    triggerToast('Sub-Category form reset.', 'info');
  };

  // Handle Delete
  const handleDelete = (serial, code) => {
    if (window.confirm(`Are you sure you want to delete Sub-Category [${code}]?`)) {
      setSubCategories(prev => prev.filter(item => item.serial !== serial));
      if (editingSerial === serial) {
        handleCancel();
      }
      triggerToast(`License Sub-Category [${code}] deleted successfully!`, 'success');
    }
  };

  // Filtered records
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return subCategories;
    const term = searchTerm.toLowerCase();
    return subCategories.filter(item => 
      item.serial.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.subCategoryCode.toLowerCase().includes(term) ||
      item.subCategory.toLowerCase().includes(term) ||
      item.licenseTitle.toLowerCase().includes(term) ||
      item.licenseeCatType.toLowerCase().includes(term)
    );
  }, [subCategories, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tbs-container">
      
      {/* Toast Notification Matching License Portal Standard */}
      {toast && (
        <div
          className={`toast-container toast-message ${
            toast.type === 'success' ? 'toast-success' :
            toast.type === 'error' ? 'toast-error' :
            'toast-info'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="toast-icon success-icon" />}
          {toast.type === 'error' && <AlertCircle className="toast-icon error-icon" />}
          {toast.type === 'info' && <Info className="toast-icon info-icon" />}

          <span className="toast-text">{toast.message}</span>
          <button 
            type="button" 
            onClick={() => setToast(null)}
            className="toast-close-btn"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Breadcrumb & Navigation */}
      <div className="tbs-top-bar">
        <button 
          type="button" 
          className="tbs-back-btn"
          onClick={onBack || (() => window.location.href = '/departmentdashboard')}
        >
          <ChevronLeft />
          <span>Back to Department Dashboard</span>
        </button>

        <div className="tbs-breadcrumb">
          <span>Master Data</span>
          <span>/</span>
          <span>Excise License</span>
          <span>/</span>
          <span className="tbs-breadcrumb-active">License Sub Category Master</span>
        </div>
      </div>

      {/* Main Dashboard Card (Matches License Title Theme) */}
      <div className="tbs-card">
        
        {/* Header Section with Authentic Arrow Ribbon */}
        <div className="tbs-header-section">
          <div className="tbs-header-row">
            
            <div className="tbs-brand-block">
              <div className="tbs-icon-wrapper">
                <Layers />
              </div>
              <div className="tbs-title-block">
                <h1>License Sub Category Master Dashboard</h1>
                <p>Configure and manage official sub-category codes, license titles, classifications, and business permissions for Excise Licensing.</p>
              </div>
            </div>

            {/* Cyan Ribbon with arrowhead identical to License Title Master */}
            <div className="tbs-ribbon-wrapper">
              <div className="tbs-ribbon-container">
                <div className="tbs-ribbon-arrow"></div>
                <div className="tbs-ribbon-body">
                  <Layers />
                  License Sub Category
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Statistics Panel */}
        <div className="tbs-stats-panel">
          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-sky">
              <Layers />
            </div>
            <div>
              <div className="tbs-stat-label">Total Sub-Category Records</div>
              <div className="tbs-stat-value">{subCategories.length} Sub-Categories</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-blue">
              <Search />
            </div>
            <div>
              <div className="tbs-stat-label">Filtered Results</div>
              <div className="tbs-stat-value">{filteredRecords.length} Records</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-indigo">
              <CheckCircle2 />
            </div>
            <div>
              <div className="tbs-stat-label">Selected Sub-Category</div>
              <div className="tbs-stat-value">{editingSerial ? `Code ${subCategoryCode || editingSerial}` : "New Record"}</div>
            </div>
          </div>
        </div>

        {/* Configuration Editor Section */}
        <div id="license-subcat-editor-section" className="tbs-editor-section">
          <form onSubmit={handleSave}>
            <div className="tbs-form-row">
              <h2 className="tbs-form-row-title">
                <Edit2 className="w-4 h-4" />
                <span>{editingSerial ? `Edit License Sub-Category [${subCategoryCode}]` : "Add or Select License Sub-Category"}</span>
              </h2>

              {editingSerial && (
                <div className="tbs-editing-message-banner">
                  <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>
                    Currently editing sub-category <strong>[{subCategoryCode}]</strong> (Serial: {editingSerial}). Modifying the details below and clicking <strong>Save Record</strong> will update the official master registry.
                  </span>
                  <button type="button" onClick={handleCancel} className="tbs-editing-cancel-btn">
                    Cancel Edit
                  </button>
                </div>
              )}

              {/* Exact form fields from image.png */}
              <div className="tbs-form-grid">
                
                {/* Field 1: Category */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Category <span>*</span>
                  </label>
                  <select 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    className="tbs-select"
                  >
                    <option value="">--Select--</option>
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 2: Sub-Category Code */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Sub-Category Code <span>*</span>
                  </label>
                  <input 
                    type="text"
                    value={subCategoryCode}
                    onChange={(e) => setSubCategoryCode(e.target.value)}
                    placeholder="e.g. L-15A, L-28A"
                    className="tbs-select"
                  />
                </div>

                {/* Field 3: Sub-Category Description */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Sub-Category <span>*</span>
                  </label>
                  <textarea 
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    rows={2}
                    placeholder="Enter complete sub-category title..."
                    className="tbs-select"
                    style={{ minHeight: '60px', resize: 'vertical' }}
                  />
                </div>

                {/* Field 4: License Title */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    License Title
                  </label>
                  <textarea 
                    value={licenseTitle}
                    onChange={(e) => setLicenseTitle(e.target.value)}
                    rows={2}
                    placeholder="Enter parent license title description..."
                    className="tbs-select"
                    style={{ minHeight: '60px', resize: 'vertical' }}
                  />
                </div>

                {/* Field 5: License Abbr */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    License Abbr
                  </label>
                  <input 
                    type="text"
                    value={licenseAbbr}
                    onChange={(e) => setLicenseAbbr(e.target.value)}
                    placeholder="e.g. L-15A, HCR-BAR"
                    className="tbs-select"
                  />
                </div>

                {/* Field 6: Licensee Cattype */}
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Licensee Cattype
                  </label>
                  <select 
                    value={licenseeCatType}
                    onChange={(e) => setLicenseeCatType(e.target.value)}
                    className="tbs-select"
                  >
                    {LICENSEE_CAT_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Business Permission Matrix from image.png */}
              <div className="tbs-permission-card">
                <div className="tbs-permission-header">
                  <div className="tbs-permission-title">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Business Permission Authorization</span>
                  </div>
                  <div className="tbs-permission-subtitle">
                    Configure official Import and Transport authorizations across Bonded & Duty Paid liquor categories.
                  </div>
                </div>

                <div className="tbs-permission-table-wrap">
                  <table className="tbs-permission-table">
                    <thead>
                      <tr>
                        <th style={{ width: '120px' }}>Permission Type</th>
                        <th>Under bond FL</th>
                        <th>Duty Paid FL/Beer</th>
                        <th>Under Bond BS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1: Import */}
                      <tr>
                        <td className="tbs-permission-row-label">Import</td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importUnderBondFL" 
                                checked={importUnderBondFL === 'Yes'} 
                                onChange={() => setImportUnderBondFL('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importUnderBondFL" 
                                checked={importUnderBondFL === 'No'} 
                                onChange={() => setImportUnderBondFL('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importDutyPaidFL" 
                                checked={importDutyPaidFL === 'Yes'} 
                                onChange={() => setImportDutyPaidFL('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importDutyPaidFL" 
                                checked={importDutyPaidFL === 'No'} 
                                onChange={() => setImportDutyPaidFL('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importUnderBondBS" 
                                checked={importUnderBondBS === 'Yes'} 
                                onChange={() => setImportUnderBondBS('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="importUnderBondBS" 
                                checked={importUnderBondBS === 'No'} 
                                onChange={() => setImportUnderBondBS('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2: Transport */}
                      <tr>
                        <td className="tbs-permission-row-label">Transport</td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportUnderBondFL" 
                                checked={transportUnderBondFL === 'Yes'} 
                                onChange={() => setTransportUnderBondFL('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportUnderBondFL" 
                                checked={transportUnderBondFL === 'No'} 
                                onChange={() => setTransportUnderBondFL('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportDutyPaidFL" 
                                checked={transportDutyPaidFL === 'Yes'} 
                                onChange={() => setTransportDutyPaidFL('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportDutyPaidFL" 
                                checked={transportDutyPaidFL === 'No'} 
                                onChange={() => setTransportDutyPaidFL('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="tbs-radio-group">
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportUnderBondBS" 
                                checked={transportUnderBondBS === 'Yes'} 
                                onChange={() => setTransportUnderBondBS('Yes')} 
                              />
                              <span>Yes</span>
                            </label>
                            <label className="tbs-radio-label">
                              <input 
                                type="radio" 
                                name="transportUnderBondBS" 
                                checked={transportUnderBondBS === 'No'} 
                                onChange={() => setTransportUnderBondBS('No')} 
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tbs-actions-row" style={{ marginTop: '1.25rem' }}>
                <button 
                  type="submit" 
                  className="tbs-btn tbs-btn-sky"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSerial ? "Update Sub-Category" : "Save Sub-Category"}</span>
                </button>
                <button 
                  type="button" 
                  className="tbs-btn tbs-btn-slate"
                  onClick={handleCancel}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>
              </div>

            </div>
          </form>
        </div>

        {/* Directory & Table Section */}
        <div className="tbs-directory-section">
          <div className="tbs-directory-header">
            <div>
              <h2 className="tbs-directory-title">Official License Sub-Categories Directory</h2>
              <p className="tbs-directory-subtitle">Registered excise sub-categories, licensee category classifications, and operational business permissions.</p>
            </div>

            <div className="tbs-directory-actions">
              <button 
                type="button" 
                className="tbs-btn tbs-btn-sm tbs-btn-outline-green"
                onClick={handlePrint}
                title="Print or export grid as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print Grid / Export PDF</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="tbs-search-box">
            <div className="tbs-search-icon">
              <Search />
            </div>
            <input 
              type="text" 
              placeholder="Search by code, title, category or permissions (e.g. L-15A, Hotel, Club)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="tbs-search-input"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => setSearchTerm('')}
                className="tbs-search-clear"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Count Tag & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div className="tbs-badge-pill">
              Total Records : {filteredRecords.length} {filteredRecords.length !== subCategories.length && `(filtered from ${subCategories.length})`}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
              <span>Show:</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="tbs-select"
                style={{ width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.8125rem' }}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          {/* Data Table with Blue Header (#0284c7) Matching License Title Theme */}
          <div className="tbs-table-wrapper">
            <table className="tbs-table">
              <thead>
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>Serial</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Category</th>
                  <th style={{ width: '130px' }}>Sub Code</th>
                  <th>Sub-Category Description</th>
                  <th>License Title</th>
                  <th style={{ width: '95px' }}>Abbr</th>
                  <th style={{ width: '140px' }}>Licensee Cattype</th>
                  <th style={{ width: '160px' }}>Permissions</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((item) => (
                    <tr 
                      key={item.serial}
                      className={editingSerial === item.serial ? "tbs-row-editing" : ""}
                    >
                      <td style={{ textAlign: 'center', fontWeight: '700', color: '#64748b' }}>
                        {item.serial}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="tbs-code-badge" style={{ backgroundColor: '#f0fdfa', color: '#0f766e', borderColor: '#ccfbf1' }}>
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <span className="tbs-code-badge">
                          {item.subCategoryCode}
                        </span>
                      </td>
                      <td 
                        onClick={() => handleSelectRow(item)}
                        title="Click to edit sub-category in the form above"
                        style={{ cursor: 'pointer', lineHeight: '1.45', fontWeight: '500' }}
                      >
                        {item.subCategory}
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.75rem' }}>
                        {item.licenseTitle}
                      </td>
                      <td style={{ fontWeight: '600', color: '#0369a1' }}>
                        {item.licenseAbbr}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#334155' }}>
                          {item.licenseeCatType}
                        </span>
                      </td>
                      <td>
                        <div className="tbs-perm-badge-group">
                          <span className={`tbs-perm-badge ${item.importDutyPaidFL === 'Yes' || item.importUnderBondFL === 'Yes' ? 'tbs-perm-badge-yes' : 'tbs-perm-badge-no'}`}>
                            Import: {item.importDutyPaidFL === 'Yes' || item.importUnderBondFL === 'Yes' ? 'Permitted' : 'Restricted'}
                          </span>
                          <span className={`tbs-perm-badge ${item.transportDutyPaidFL === 'Yes' || item.transportUnderBondFL === 'Yes' ? 'tbs-perm-badge-yes' : 'tbs-perm-badge-no'}`}>
                            Transport: {item.transportDutyPaidFL === 'Yes' || item.transportUnderBondFL === 'Yes' ? 'Permitted' : 'Restricted'}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button 
                            type="button"
                            onClick={() => handleSelectRow(item)}
                            className="tbs-btn-action tbs-btn-action-edit"
                            title="Edit this sub-category"
                          >
                            <Edit2 />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDelete(item.serial, item.subCategoryCode)}
                            className="tbs-btn-action tbs-btn-action-delete"
                            title="Delete this sub-category"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No sub-categories found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="tbs-pagination-container">
              <div className="tbs-pagination-info">
                Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredRecords.length)}</strong> of <strong>{filteredRecords.length}</strong> records
              </div>

              <div className="tbs-pagination-controls">
                <button 
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="tbs-pagination-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="tbs-pagination-page">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </div>

                <button 
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="tbs-pagination-btn"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default LicenseSubCategoryMaster;
