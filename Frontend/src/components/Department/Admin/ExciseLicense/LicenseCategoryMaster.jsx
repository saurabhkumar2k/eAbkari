import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  FileText,
  Search,
  RotateCcw,
  Save,
  Printer,
  Edit2,
  Trash2,
  Layers,
  ChevronRight,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
// 73 Official Excise License Categories
const INITIAL_LICENSE_CATEGORIES = [
  { serial: "01", code: "L28", name: "L28 (Service of Indian Liquor in Club)" },
  { serial: "02", code: "L10", name: "L10 (Retail Vend of Indian Liquor and Foreign Liquor in Shopping Malls and Shopping Complex at Airport)" },
  { serial: "03", code: "L15", name: "L15 (Service of Indian Liquor in a Hotel or Guest House to residents in their rooms)" },
  { serial: "04", code: "L16", name: "L16 (Service of Indian Liquor in a Bar/Restaurant attached to a Hotel)" },
  { serial: "05", code: "L17", name: "L17 (Service of Indian Liquor in Independent Restaurant)" },
  { serial: "06", code: "L18", name: "L18 (Service of Wine, Beer and Alcopop in Independent Restaurant)" },
  { serial: "07", code: "L19", name: "L19 (Round the clock service of Indian Liquor in Independent Restaurant located either in arrival or departure area of International Airport)" },
  { serial: "08", code: "L29", name: "L29 (Service of Indian Liquor at a club/mess whose membership is exclusively for Government servants, retired Govt. Servants, including members of armed forces serving or retired)" },
  { serial: "09", code: "L30", name: "L30 (Licence for possession of liquor at home in excess of individual possession limit)" },
  { serial: "10", code: "L1-L31", name: "L1 (License for Wholesale Vend of Indian Liquor) and L31 (License for Warehouse for storage of Indian Liquor)" },
  { serial: "11", code: "L6", name: "L6 (Retail Vend of Indian Liquor in Public Sector)" },
  { serial: "14", code: "L11", name: "L11 (Retail Vend of Beer, manufactured by Microbrewery)" },
  { serial: "15", code: "L2", name: "L2 (Retail Vend of Indian Liquor in Private Sector Vends)" },
  { serial: "16", code: "L3", name: "L3 (Retail Vend of Foreign Liquor in Star Classified Hotels)" },
  { serial: "17", code: "L4", name: "L4 (Wholesale supply of Denatured Spirit / Special Denatured Spirit)" },
  { serial: "18", code: "L5", name: "L5 (Retail Vend of Denatured Spirit for domestic and industrial use)" },
  { serial: "19", code: "L7", name: "L7 (Retail Vend of Foreign Liquor in Air Conditioned Shopping Malls)" },
  { serial: "20", code: "L8", name: "L8 (Retail Vend of Country Liquor in urban areas)" },
  { serial: "21", code: "L9", name: "L9 (Retail Vend of Foreign Liquor in Duty Free Shops at International Airport)" },
  { serial: "22", code: "L12", name: "L12 (Possession and Sale of Rectified Spirit for manufacturing)" },
  { serial: "23", code: "L13", name: "L13 (Possession and Sale of Absolute Alcohol for scientific and lab use)" },
  { serial: "24", code: "L14", name: "L14 (Retail Vend of Country Liquor in rural areas)" },
  { serial: "25", code: "L20", name: "L20 (Retail Vend of Foreign Liquor in Messes / Canteens of Para-Military units)" },
  { serial: "26", code: "L21", name: "L21 (Retail Vend of Foreign Liquor in Commercial Airports Lounge)" },
  { serial: "27", code: "L22", name: "L22 (Retail Vend in Railway Refreshment Rooms and Executive Dining Cars)" },
  { serial: "28", code: "L23", name: "L23 (Retail Vend of Draught Craft Beer in standalone Microbrewery)" },
  { serial: "29", code: "L24", name: "L24 (Possession and Sale of Sacramental Wine for religious purposes)" },
  { serial: "30", code: "L25", name: "L25 (Possession and Use of Alcohol in Research Institutions and Universities)" },
  { serial: "31", code: "L26", name: "L26 (Possession and Sale of Medicinal Preparations containing Alcohol)" },
  { serial: "32", code: "L27", name: "L27 (Manufacture and Distillation of Country Liquor)" },
  { serial: "33", code: "L32", name: "L32 (Retail Vend of Draught Beer through temperature controlled keg outlets)" },
  { serial: "34", code: "L33", name: "L33 (Bottling of Indian Liquor from bulk spirit vats)" },
  { serial: "35", code: "L34", name: "L34 (Distillery and Brewery Operations License)" },
  { serial: "36", code: "L35", name: "L35 (Supply of Draught Beer to licensed premises)" },
  { serial: "37", code: "AP", name: "AP (Authorisation Permit for Inter-state Transport of Liquor)" },
  { serial: "38", code: "DD-5", name: "DD-5 (Licence for possession and transport of manufactured drugs by approved practitioner)" },
  { serial: "39", code: "DD-9", name: "DD-9 (Licence for possession of manufactured drugs for medicinal preparations)" },
  { serial: "40", code: "DD-10", name: "DD-10 (Licence for possession and sale of manufactured drugs otherwise than on prescription)" },
  { serial: "41", code: "DD-11", name: "DD-11 (Chemist licence for sale, on prescription of manufactured drugs for medical purposes)" },
  { serial: "42", code: "DL", name: "DL (Licence for Wholesale Dealer of Indian Liquor and Beer)" },
  { serial: "43", code: "P-10", name: "P-10 (Permit for service of liquor at private functions, weddings and parties)" },
  { serial: "44", code: "P-11", name: "P-11 (Permit for possession of liquor beyond prescribed individual limit)" },
  { serial: "45", code: "P-13", name: "P-13 (Permit for transport of bulk spirit within state boundary)" },
  { serial: "46", code: "P-14", name: "P-14 (Permit for import of bulk spirit from other states/distilleries)" },
  { serial: "47", code: "P-15", name: "P-15 (Permit for export of bulk spirit to other states/export terminals)" },
  { serial: "48", code: "B-1", name: "B-1 (Licence for establishment of new Commercial Brewery)" },
  { serial: "49", code: "D-1", name: "D-1 (Licence for establishment of new Grain/Molasses Distillery)" },
  { serial: "50", code: "W-1", name: "W-1 (Licence for establishment of new Winery and Fermentation Unit)" },
  { serial: "51", code: "FL-1", name: "FL-1 (Licence for wholesale of Foreign Liquor - Bottled in Origin / BIO)" },
  { serial: "52", code: "FL-2", name: "FL-2 (Licence for Custom Bonded Warehouse for Imported Foreign Liquor)" },
  { serial: "53", code: "FL-3", name: "FL-3 (Licence for retail vend of Imported Foreign Liquor at specialized outlets)" },
  { serial: "54", code: "CL-1", name: "CL-1 (Licence for wholesale supply of Country Liquor in bottles)" },
  { serial: "55", code: "CL-2", name: "CL-2 (Licence for retail vend of Country Liquor in urban designated vends)" },
  { serial: "56", code: "RS-1", name: "RS-1 (Licence for storage and bulk distribution of Rectified Spirit)" },
  { serial: "57", code: "DS-1", name: "DS-1 (Licence for wholesale supply of Denatured Spirit to industries)" },
  { serial: "58", code: "DS-2", name: "DS-2 (Licence for industrial use and processing of Denatured Spirit)" },
  { serial: "59", code: "E-1", name: "E-1 (Licence for production and distillation of Fuel Ethanol)" },
  { serial: "60", code: "E-2", name: "E-2 (Licence for storage, blending and supply of Fuel Ethanol to OMCs)" },
  { serial: "61", code: "S-1", name: "S-1 (Licence for manufacture of Special Denatured Spirit)" },
  { serial: "62", code: "S-2", name: "S-2 (Licence for chemical and testing laboratory use of Special Denatured Spirit)" },
  { serial: "63", code: "MB-1", name: "MB-1 (Licence for Microbrewery setup and commercial installation)" },
  { serial: "64", code: "MB-2", name: "MB-2 (Licence for retail service of fresh craft beer on premises)" },
  { serial: "65", code: "T-1", name: "T-1 (Temporary Permit for commercial wine/beer tasting promotional events)" },
  { serial: "66", code: "T-2", name: "T-2 (Temporary Permit for international trade fair food & beverage pavilions)" },
  { serial: "67", code: "C-1", name: "C-1 (Licence for Canteen Stores Department - CSD wholesale depot)" },
  { serial: "68", code: "C-2", name: "C-2 (Licence for CSD retail unit canteens for military personnel)" },
  { serial: "69", code: "M-1", name: "M-1 (Licence for Para-Military forces unit mess and officers club)" },
  { serial: "70", code: "M-2", name: "M-2 (Licence for Armed Forces Officers Mess and wardrooms)" },
  { serial: "71", code: "R-1", name: "R-1 (Licence for Railway Luxury Tourist Trains Catering Service)" },
  { serial: "72", code: "H-1", name: "H-1 (Heritage Hotel Special Bar and Banqueting Privilege Licence)" },
  { serial: "73", code: "EX-1", name: "EX-1 (Exhibition and Special Trade Fair Event Bar Permit)" }
];

// Sub-categories mock details for modal drilldown
const SUB_CATEGORIES_DATA = {
  "L28": [
    { code: "L-28A", title: "Non-Commercial Social Club Bar", fee: "₹ 5,00,000 / annum", validity: "1 Year" },
    { code: "L-28B", title: "Sports Club & Gymkhana Bar", fee: "₹ 8,00,000 / annum", validity: "1 Year" }
  ],
  "L10": [
    { code: "L-10A", title: "General Departmental Retail Vend", fee: "₹ 12,00,000 / annum", validity: "1 Year" },
    { code: "L-10B", title: "Airport Shopping Complex Premium Retail", fee: "₹ 20,00,000 / annum", validity: "1 Year" }
  ],
  "L15": [
    { code: "L-15A", title: "5-Star & Above Classified Hotel Bar", fee: "₹ 25,00,000 / annum", validity: "1 Year" },
    { code: "L-15B", title: "Heritage & 4-Star Classified Hotel Bar", fee: "₹ 15,00,000 / annum", validity: "1 Year" },
    { code: "L-15C", title: "Room Service Minibar Privilege", fee: "₹ 5,00,000 / annum", validity: "1 Year" }
  ],
  "L16": [
    { code: "L-16A", title: "Hotel Attached Restaurant Bar", fee: "₹ 12,00,000 / annum", validity: "1 Year" },
    { code: "L-16B", title: "Poolside / Rooftop Restaurant Bar", fee: "₹ 15,00,000 / annum", validity: "1 Year" }
  ],
  "L17": [
    { code: "L-17A", title: "Independent Fine Dine Restaurant Bar", fee: "₹ 10,00,000 / annum", validity: "1 Year" },
    { code: "L-17B", title: "Casual Dining Tavern", fee: "₹ 7,50,000 / annum", validity: "1 Year" }
  ],
  "L1-L31": [
    { code: "L-1A", title: "Domestic IMFL Wholesale Distribution", fee: "₹ 25,00,000 / annum", validity: "1 Year" },
    { code: "L-31A", title: "Central Customs-Bonded Storage Warehouse", fee: "₹ 15,00,000 / annum", validity: "1 Year" }
  ],
  "L30": [
    { code: "L-30A", title: "Individual Household Excess Possession Permit", fee: "₹ 2,000 / annum", validity: "1 Year" }
  ]
};

const LicenseCategoryMaster = ({ onBack }) => {
  const [toast, setToast] = useState(null);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('dept_license_categories');
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
    return INITIAL_LICENSE_CATEGORIES;
  });

  const [selectedCategoryCode, setSelectedCategoryCode] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [activeModalCategory, setActiveModalCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('dept_license_categories', JSON.stringify(categories));
  }, [categories]);

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handle dropdown selection
  const handleDropdownChange = (e) => {
    const code = e.target.value;
    setSelectedCategoryCode(code);
    if (!code) {
      setCategoryDescription('');
      return;
    }
    const found = categories.find(c => c.code === code);
    if (found) {
      setCategoryDescription(found.name);
    }
  };

  // Handle row selection for editing
  const handleSelectRow = (cat) => {
    setSelectedCategoryCode(cat.code);
    setCategoryDescription(cat.name);
    
    // Scroll to editor smoothly
    const editor = document.getElementById("license-category-editor-section");
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Save / Update
  const handleSave = (e) => {
    e.preventDefault();
    if (!categoryDescription.trim()) {
      triggerToast('Please enter or select a valid License Category description.', 'error');
      return;
    }

    if (selectedCategoryCode) {
      // Update existing record
      setCategories(prev => prev.map(c => {
        if (c.code === selectedCategoryCode) {
          return { ...c, name: categoryDescription.trim() };
        }
        return c;
      }));
      triggerToast(`Excise License Category [${selectedCategoryCode}] updated successfully!`, 'success');
    } else {
      // Add new record
      const nextNum = (categories.length + 1).toString().padStart(2, '0');
      const newCode = `CAT-${nextNum}`;
      const newCat = {
        serial: nextNum,
        code: newCode,
        name: categoryDescription.trim()
      };
      setCategories(prev => [newCat, ...prev]);
      triggerToast('New Excise License Category registered successfully!', 'success');
      setSelectedCategoryCode('');
      setCategoryDescription('');
    }
  };

  // Handle Cancel / Clear
  const handleCancel = () => {
    setSelectedCategoryCode('');
    setCategoryDescription('');
    triggerToast('License Category form cleared.', 'info');
  };

  // Handle Delete
  const handleDelete = (code) => {
    if (window.confirm(`Are you sure you want to remove Excise License Category [${code}]?`)) {
      setCategories(prev => prev.filter(c => c.code !== code));
      if (selectedCategoryCode === code) {
        setSelectedCategoryCode('');
        setCategoryDescription('');
      }
      triggerToast(`Excise License Category [${code}] deleted successfully!`, 'success');
    }
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase();
    return categories.filter(c => 
      c.serial.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.name.toLowerCase().includes(term)
    );
  }, [categories, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;
  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

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
          <span className="tbs-breadcrumb-active">License Category Master</span>
        </div>
      </div>

      {/* Main Dashboard Card */}
      <div className="tbs-card">
        
        {/* Header Section with Authentic Arrow Ribbon */}
        <div className="tbs-header-section">
          <div className="tbs-header-row">
            
            <div className="tbs-brand-block">
              <div className="tbs-icon-wrapper">
                <Layers />
              </div>
              <div className="tbs-title-block">
                <h1>License Category Master Dashboard</h1>
                <p>Configure and manage official license category codes, descriptions, and classifications for Excise Licensing.</p>
              </div>
            </div>

            {/* Cyan Ribbon with arrowhead identical to License Title Master */}
            <div className="tbs-ribbon-wrapper">
              <div className="tbs-ribbon-container">
                <div className="tbs-ribbon-arrow"></div>
                <div className="tbs-ribbon-body">
                  <Layers />
                  License Category
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
              <div className="tbs-stat-label">Total Category Records</div>
              <div className="tbs-stat-value">{categories.length} Categories</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-blue">
              <Search />
            </div>
            <div>
              <div className="tbs-stat-label">Filtered Results</div>
              <div className="tbs-stat-value">{filteredCategories.length} Categories</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-indigo">
              <CheckCircle2 />
            </div>
            <div>
              <div className="tbs-stat-label">Selected Category Code</div>
              <div className="tbs-stat-value">{selectedCategoryCode || "New Item"}</div>
            </div>
          </div>
        </div>

        {/* Configuration Editor Section */}
        <div id="license-category-editor-section" className="tbs-editor-section">
          <form onSubmit={handleSave}>
            <div className="tbs-form-row">
              <h2 className="tbs-form-row-title">
                <Edit2 className="w-4 h-4" />
                <span>{selectedCategoryCode ? `Edit License Category [${selectedCategoryCode}]` : "Add or Select License Category"}</span>
              </h2>

              {selectedCategoryCode && (
                <div className="tbs-editing-message-banner">
                  <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>
                    Currently editing license category <strong>[{selectedCategoryCode}]</strong>. Modifying the description below and clicking <strong>Save Record</strong> will update the official master registry.
                  </span>
                  <button type="button" onClick={handleCancel} className="tbs-editing-cancel-btn">
                    Cancel Edit
                  </button>
                </div>
              )}

              <div className="tbs-form-grid">
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    License Category Code
                  </label>
                  <select 
                    className="tbs-select"
                    value={selectedCategoryCode}
                    onChange={handleDropdownChange}
                  >
                    <option value="">-Select Existing Category to Edit or Add New-</option>
                    {categories.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name.length > 55 ? c.name.substring(0, 55) + '...' : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Category Description <span>*</span>
                  </label>
                  <textarea 
                    className="tbs-select"
                    rows={2}
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Enter complete license category description..."
                    style={{ minHeight: '60px', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div className="tbs-actions-row" style={{ marginTop: '1.25rem' }}>
                <button 
                  type="submit" 
                  className="tbs-btn tbs-btn-sky"
                >
                  <Save className="w-4 h-4" />
                  <span>{selectedCategoryCode ? "Update License Category" : "Save New Category"}</span>
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
              <h2 className="tbs-directory-title">Official License Categories Directory</h2>
              <p className="tbs-directory-subtitle">Registered excise license categories, privilege authorizations, and definitions.</p>
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
              placeholder="Search by category code, serial or keyword (e.g., L15, Hotel, Wholesale)..."
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

          {/* Results Count Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div className="tbs-badge-pill">
              Total Records : {filteredCategories.length} {filteredCategories.length !== categories.length && `(filtered from ${categories.length})`}
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
                <option value={100}>All</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          {/* Data Table */}
          <div className="tbs-table-wrapper">
            <table className="tbs-table">
              <thead>
                <tr>
                  <th style={{ width: '70px', textAlign: 'center' }}>Serial</th>
                  <th style={{ width: '130px' }}>Category Code</th>
                  <th>License Category Description</th>
                  <th style={{ width: '160px', textAlign: 'center' }}>Show Details</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((cat, idx) => (
                    <tr 
                      key={cat.code || idx}
                      className={selectedCategoryCode === cat.code ? "tbs-row-editing" : ""}
                    >
                      <td style={{ textAlign: 'center', fontWeight: '700', color: '#64748b' }}>
                        {cat.serial}
                      </td>
                      <td>
                        <span className="tbs-code-badge">
                          {cat.code}
                        </span>
                      </td>
                      <td 
                        onClick={() => handleSelectRow(cat)}
                        title="Click to edit category in the form above"
                        style={{ cursor: 'pointer', lineHeight: '1.45' }}
                      >
                        {cat.name}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          type="button" 
                          onClick={() => setActiveModalCategory(cat)}
                          className="license-cat-badge-link"
                          title="View sub-category privileges"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Sub Catagory</span>
                        </button>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button 
                            type="button"
                            onClick={() => handleSelectRow(cat)}
                            className="tbs-btn-action tbs-btn-action-edit"
                            title="Edit this category"
                          >
                            <Edit2 />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDelete(cat.code)}
                            className="tbs-btn-action tbs-btn-action-delete"
                            title="Delete this category"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No license categories found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            {/* Pagination Footer */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', padding: '0.5rem 0' }}>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                Showing page <span style={{ fontWeight: '700', color: '#0f172a' }}>{currentPage}</span>  
                of <span style={{ fontWeight: '700', color: '#0f172a' }}>{totalPages}</span> ({ filteredCategories.length} total items)
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <button 
                  type="button" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="tbs-btn-sm tbs-btn-slate"
                  style={{ borderRadius: '0.375rem', opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  const isActive = currentPage === pageNum;
                  return (
                    <button 
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`tbs-btn-sm ${isActive ? 'tbs-btn-sky' : 'tbs-btn-slate'}`}
                      style={{ borderRadius: '0.375rem', minWidth: '2rem', textAlign: 'center' }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button 
                  type="button" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="tbs-btn-sm tbs-btn-slate"
                  style={{ borderRadius: '0.375rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
    </div>

      {/* Sub Category Breakdown Modal */}
      {activeModalCategory && (
        <div className="license-cat-modal-backdrop" onClick={() => setActiveModalCategory(null)}>
          <div className="license-cat-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="license-cat-modal-head">
              <h3>
                <Layers className="w-5 h-5" />
                <span>Sub Category Breakdown - {activeModalCategory.code}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setActiveModalCategory(null)}
                className="license-cat-modal-close-btn"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="license-cat-modal-content">
              <div className="license-cat-modal-callout">
                <strong>Parent Category:</strong> {activeModalCategory.name}
              </div>

              <table className="tbs-table" style={{ fontSize: '0.8125rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '110px' }}>Sub Code</th>
                    <th>Privilege & Description</th>
                    <th style={{ width: '150px' }}>Prescribed Fee</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {(SUB_CATEGORIES_DATA[activeModalCategory.code] || [
                    { 
                      code: `${activeModalCategory.code}-01`, 
                      title: `General Service Authorization for ${activeModalCategory.code}`, 
                      fee: "₹ 5,00,000 / annum", 
                      validity: "1 Year" 
                    },
                    { 
                      code: `${activeModalCategory.code}-02`, 
                      title: `Special Privilege Endorsement for ${activeModalCategory.code}`, 
                      fee: "₹ 10,00,000 / annum", 
                      validity: "1 Year" 
                    }
                  ]).map((sub, sIdx) => (
                    <tr key={sIdx}>
                      <td>
                        <span className="tbs-code-badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                          {sub.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: '500' }}>{sub.title}</td>
                      <td style={{ fontWeight: '700', color: '#0f766e' }}>{sub.fee}</td>
                      <td style={{ textAlign: 'center' }}>{sub.validity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="license-cat-modal-foot">
              <button 
                type="button" 
                onClick={() => setActiveModalCategory(null)}
                className="tbs-btn tbs-btn-slate"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LicenseCategoryMaster;
