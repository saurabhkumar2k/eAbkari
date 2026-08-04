import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Calendar,
  Layers,
  MapPin,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Trash2,
  Edit2
} from "lucide-react";

export default function TransportBulkSpiritValidity({ onNavigateHome }) {
  // Available Delhi Districts
  const districts = [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ];

  // Default values for validity pathways
  const defaultPathways = {
    distilleryToFl: 24,
    distilleryToCs: 24,
    flToFl: 12,
    flToCs: 12,
    csToCs: 8,
    csToFl: 8,
    distilleryToSpl: 48,
    flToSpl: 48,
    csToSpl: 48,
  };

  // State management
  const [sourceDistrict, setSourceDistrict] = useState("");
  const [destinationDistrict, setDestinationDistrict] = useState("");
  
  // Hours state for the 9 fields
  const [pathwayHours, setPathwayHours] = useState({ ...defaultPathways });

  // Saved rules in localStorage
  const [savedRules, setSavedRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [isEditingId, setIsEditingId] = useState(null);

  // Trigger notification toast
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load saved configurations on mount
  useEffect(() => {
    const stored = localStorage.getItem("TransportBulkSpiritValidityRules");
    if (stored) {
      try {
        setSavedRules(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing stored rules", e);
      }
    } else {
      // Seed initial dummy rules for realism
      const initialRules = [
        {
          id: "rule-1",
          source: "New Delhi",
          destination: "South Delhi",
          hours: {
            distilleryToFl: 12,
            distilleryToCs: 12,
            flToFl: 8,
            flToCs: 8,
            csToCs: 6,
            csToFl: 6,
            distilleryToSpl: 24,
            flToSpl: 24,
            csToSpl: 24,
          }
        },
        {
          id: "rule-2",
          source: "North Delhi",
          destination: "West Delhi",
          hours: {
            distilleryToFl: 18,
            distilleryToCs: 18,
            flToFl: 12,
            flToCs: 12,
            csToCs: 8,
            csToFl: 8,
            distilleryToSpl: 36,
            flToSpl: 36,
            csToSpl: 36,
          }
        }
      ];
      setSavedRules(initialRules);
      localStorage.setItem("TransportBulkSpiritValidityRules", JSON.stringify(initialRules));
    }
  }, []);

  // Sync to form when district pair changes and exists in rules
  useEffect(() => {
    if (sourceDistrict && destinationDistrict) {
      const match = savedRules.find(
        (r) =>
          r.source.toLowerCase() === sourceDistrict.toLowerCase() &&
          r.destination.toLowerCase() === destinationDistrict.toLowerCase()
      );
      if (match) {
        setPathwayHours(match.hours);
        triggerToast(`Loaded existing configuration for ${sourceDistrict} to ${destinationDistrict}`, "info");
      } else {
        setPathwayHours({ ...defaultPathways });
      }
    }
  }, [sourceDistrict, destinationDistrict, savedRules]);

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();

    if (!sourceDistrict) {
      triggerToast("Please select a Source District", "error");
      return;
    }
    if (!destinationDistrict) {
      triggerToast("Please select a Destination District", "error");
      return;
    }
    if (sourceDistrict === destinationDistrict) {
      triggerToast("Source and Destination Districts cannot be the same", "error");
      return;
    }

    // Validate inputs
    const values = Object.values(pathwayHours);
    if (values.some((val) => val === "" || isNaN(val) || val < 0)) {
      triggerToast("All validity values must be positive numbers", "error");
      return;
    }

    const updatedRules = [...savedRules];
    const existingIndex = updatedRules.findIndex(
      (r) =>
        r.source.toLowerCase() === sourceDistrict.toLowerCase() &&
        r.destination.toLowerCase() === destinationDistrict.toLowerCase()
    );

    const ruleData = {
      id: existingIndex >= 0 ? updatedRules[existingIndex].id : "rule-" + Date.now(),
      source: sourceDistrict,
      destination: destinationDistrict,
      hours: { ...pathwayHours }
    };

    if (existingIndex >= 0) {
      updatedRules[existingIndex] = ruleData;
      triggerToast(`Successfully updated validity config for ${sourceDistrict} ➔ ${destinationDistrict}`);
    } else {
      updatedRules.push(ruleData);
      triggerToast(`Successfully added validity config for ${sourceDistrict} ➔ ${destinationDistrict}`);
    }

    setSavedRules(updatedRules);
    localStorage.setItem("TransportBulkSpiritValidityRules", JSON.stringify(updatedRules));
    
    // Clear selection or keep for editing
    setIsEditingId(null);
  };

  // Delete a rule
  const handleDelete = (id, label) => {
    if (window.confirm(`Are you sure you want to delete the configuration for ${label}?`)) {
      const filtered = savedRules.filter((r) => r.id !== id);
      setSavedRules(filtered);
      localStorage.setItem("TransportBulkSpiritValidityRules", JSON.stringify(filtered));
      triggerToast(`Deleted configuration for ${label}`, "success");
    }
  };

  // Edit action from list
  const handleEditClick = (rule) => {
    setSourceDistrict(rule.source);
    setDestinationDistrict(rule.destination);
    setPathwayHours(rule.hours);
    setIsEditingId(rule.id);
    // Scroll to form
    const formElement = document.getElementById("tbs-editor-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset current form
  const handleResetForm = () => {
    setPathwayHours({ ...defaultPathways });
    setSourceDistrict("");
    setDestinationDistrict("");
    setIsEditingId(null);
    triggerToast("Form values reset to standard defaults", "info");
  };

  // Restore everything to global initial defaults
  const handleResetAllToDefaults = () => {
    if (window.confirm("This will clear all custom district configurations and restore standard initial values. Continue?")) {
      localStorage.removeItem("TransportBulkSpiritValidityRules");
      setSourceDistrict("");
      setDestinationDistrict("");
      setPathwayHours({ ...defaultPathways });
      setSavedRules([]);
      setIsEditingId(null);
      triggerToast("All master settings restored to system defaults", "success");
    }
  };

  // CSV export
  const exportCSV = () => {
    if (savedRules.length === 0) {
      triggerToast("No configurations to export!", "error");
      return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Source District,Destination District,Distillery to FL,Distillery to CS,FL to FL,FL to CS,CS to CS,CS to FL,Distillery to Spl,FL to Spl,CS to Spl\n";
    
    savedRules.forEach((r) => {
      csvContent += `"${r.source}","${r.destination}",${r.hours.distilleryToFl},${r.hours.distilleryToCs},${r.hours.flToFl},${r.hours.flToCs},${r.hours.csToCs},${r.hours.csToFl},${r.hours.distilleryToSpl},${r.hours.flToSpl},${r.hours.csToSpl}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Transport_Bulk_Spirit_Validity.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Successfully exported configuration dataset as CSV!");
  };

  // Filtered rules for listing
  const filteredRules = savedRules.filter(
    (r) =>
      r.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics calculation
  const totalPairings = savedRules.length;
  const maxConfiguredHours = savedRules.length > 0 
    ? Math.max(...savedRules.flatMap(r => Object.values(r.hours))) 
    : 48;
  const averageHours = savedRules.length > 0
    ? Math.round(savedRules.flatMap(r => Object.values(r.hours)).reduce((a, b) => a + b, 0) / (savedRules.length * 9))
    : 24;

  return (
    <div className="tbs-container">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`tbs-toast tbs-toast-${toast.type}`}>
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
          {toast.type === "info" && <RotateCcw className="w-5 h-5 animate-spin" />}
          <span className="tbs-toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="tbs-toast-close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Breadcrumbs and Back Navigation */}
      {/* <div className="tbs-top-bar">
        <button
          onClick={onNavigateHome}
          className="tbs-back-btn"
        >
          <ChevronLeft />
          <span>Back to Department Dashboard</span>
        </button>

        <div className="tbs-breadcrumb">
          <span>Master Data</span>
          <span>/</span>
          <span>Permit/Pass Validity</span>
          <span>/</span>
          <span className="tbs-breadcrumb-active">Transport : Bulk Spirit</span>
        </div>
      </div> */}

      {/* Main Grid Card */}
      <div className="tbs-card">
        
        {/* Dynamic Government Header with Authentic Arrow Ribbon */}
        <div className="tbs-header-section">
          <div className="tbs-header-row">
            
            <div className="tbs-brand-block">
              <div className="tbs-icon-wrapper">
                <Calendar />
              </div>
              <div className="tbs-title-block">
                <h1>Transport Pass (Packaged FL) Validity Dashboard</h1>
                <p>Configure official validity timelines in hours across Delhi districts based on specific transit routes.</p>
              </div>
            </div>

            {/* Light blue ribbon styled exactly like user request image */}
            <div className="tbs-ribbon-wrapper">
              <div className="tbs-ribbon-container">
                {/* Arrow head effect on the left of the ribbon */}
                <div className="tbs-ribbon-arrow"></div>
                <div className="tbs-ribbon-body">
                  <Layers />
                  Transport Pass (Packaged FL) Validity
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Statistics Cards Panel */}
        <div className="tbs-stats-panel">
          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-sky">
              <MapPin />
            </div>
            <div>
              <div className="tbs-stat-label">Configured Pairings</div>
              <div className="tbs-stat-value">{totalPairings} Routes</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-blue">
              <TrendingUp />
            </div>
            <div>
              <div className="tbs-stat-label">Max Validity Hours</div>
              <div className="tbs-stat-value">{maxConfiguredHours} Hours</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-indigo">
              <Calendar />
            </div>
            <div>
              <div className="tbs-stat-label">Avg Validity Hours</div>
              <div className="tbs-stat-value">{averageHours} Hours</div>
            </div>
          </div>
        </div>

        {/* Configuration Editor Panel */}
        <div id="tbs-editor-section" className="tbs-editor-section">
          <form onSubmit={handleSave}>
            
            {/* District Selection Section */}
            <div className="tbs-form-row">
              <h2 className="tbs-form-row-title">
                <span>Select District Pairs</span>
              </h2>

              <div className="tbs-form-grid">
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Source District <span>*</span>
                  </label>
                  <select
                    value={sourceDistrict}
                    onChange={(e) => setSourceDistrict(e.target.value)}
                    className="tbs-select"
                  >
                    <option value="">-Select Source District-</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="tbs-field-group">
                  <label className="tbs-label">
                    Destination District <span>*</span>
                  </label>
                  <select
                    value={destinationDistrict}
                    onChange={(e) => setDestinationDistrict(e.target.value)}
                    className="tbs-select"
                  >
                    <option value="">-Select Destination District-</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Validity Hours Grid */}
            <div className="tbs-validity-section">
              <h2 className="tbs-validity-title">
                <span>Transport Pass (Packaged FL) Validity : -</span>
              </h2>

              <div className="tbs-validity-grid">
                {/* 1. Manufactory Bond to Non-Manf. Bond */}
                <div className="tbs-validity-card">
                  <span className="tbs-validity-label">Manufactory Bond to Non-Manf. Bond</span>
                  <div className="tbs-validity-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      max="720"
                      value={pathwayHours.distilleryToFl}
                      onChange={(e) => setPathwayHours({ ...pathwayHours, distilleryToFl: parseInt(e.target.value) || 0 })}
                      className="tbs-validity-input"
                    />
                    <span className="tbs-validity-unit">Hours</span>
                  </div>
                </div>

                {/* 2. Non-Manufactory Bond to Trade */}
                <div className="tbs-validity-card">
                  <span className="tbs-validity-label">Non-Manufactory Bond to Trade</span>
                  <div className="tbs-validity-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      max="720"
                      value={pathwayHours.distilleryToCs}
                      onChange={(e) => setPathwayHours({ ...pathwayHours, distilleryToCs: parseInt(e.target.value) || 0 })}
                      className="tbs-validity-input"
                    />
                    <span className="tbs-validity-unit">Hours</span>
                  </div>
                </div>

                {/* 3. Trade to Trade */}
                <div className="tbs-validity-card">
                  <span className="tbs-validity-label">Trade to Trade</span>
                  <div className="tbs-validity-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      max="720"
                      value={pathwayHours.flToFl}
                      onChange={(e) => setPathwayHours({ ...pathwayHours, flToFl: parseInt(e.target.value) || 0 })}
                      className="tbs-validity-input"
                    />
                    <span className="tbs-validity-unit">Hours</span>
                  </div>
                </div>

                {/* 4. Trade to Retail */}
                <div className="tbs-validity-card">
                  <span className="tbs-validity-label">Trade to Retail</span>
                  <div className="tbs-validity-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      max="720"
                      value={pathwayHours.flToCs}
                      onChange={(e) => setPathwayHours({ ...pathwayHours, flToCs: parseInt(e.target.value) || 0 })}
                      className="tbs-validity-input"
                    />
                    <span className="tbs-validity-unit">Hours</span>
                  </div>
                </div>
                </div>
                </div>

            {/* Form Actions */}
            <div className="tbs-actions-row">
              <button
                type="submit"
                className="tbs-btn tbs-btn-sky"
              >
                <Save className="w-4 h-4" />
                <span>Save Validity Configuration</span>
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="tbs-btn tbs-btn-slate"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Form</span>
              </button>
            </div>

          </form>
        </div>

        {/* Saved Rules List Panel */}
        <div className="tbs-directory-section">
          <div className="tbs-directory-header">
            <div>
              <h2 className="tbs-directory-title">
                Active Transport Validity Directory
              </h2>
              <p className="tbs-directory-subtitle">
                Search, audit, or edit the validity hours configured for district transit routes.
              </p>
            </div>

            {/* Actions for dataset */}
            <div className="tbs-directory-actions">
              <button
                onClick={exportCSV}
                className="tbs-btn tbs-btn-sm tbs-btn-outline-green"
                title="Download table data as CSV spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleResetAllToDefaults}
                className="tbs-btn tbs-btn-sm tbs-btn-outline-rose"
                title="Clear all customizations"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restore Defaults</span>
              </button>
            </div>
          </div>

          {/* Search bar for dataset */}
          <div className="tbs-search-box">
            <span className="tbs-search-icon">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Filter by Source or Destination District..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tbs-search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="tbs-search-clear"
              >
                <X />
              </button>
            )}
          </div>

          {/* Table of active configurations */}
          <div className="tbs-table-wrapper">
            {filteredRules.length === 0 ? (
              <div className="tbs-no-records">
                <Search />
                <p>No configurations match your query</p>
                <span>Try refining your search keyword or add a new config above.</span>
              </div>
            ) : (
              <table className="tbs-table">
                <thead>
                  <tr>
                    <th>Source District</th>
                    <th>Destination District</th>
                    <th style={{ textAlign: "center" }}>Source District</th>
                    <th style={{ textAlign: "center" }}>Destination District</th>
                    <th style={{ textAlign: "center" }}>M. Bond to Bond</th>
                    <th style={{ textAlign: "center" }}>Bond to Bond</th>
                    <th style={{ textAlign: "center" }}>Bond to Trade</th>
                    <th style={{ textAlign: "center" }}>Trade to Retail</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((rule, idx) => (
                    <tr
                      key={rule.id}
                      className={isEditingId === rule.id ? "tbs-row-editing" : ""}
                    >
                      <td className="tbs-cell-bold">{rule.source}</td>
                      <td className="tbs-cell-bold">{rule.destination}</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-sky">{rule.hours.distilleryToFl}h</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-sky">{rule.hours.distilleryToCs}h</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-slate">{rule.hours.flToFl}h</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-slate">{rule.hours.flToCs}h</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-slate">{rule.hours.csToCs}h</td>
                      <td style={{ textAlign: "center" }} className="tbs-cell-hours-slate">{rule.hours.csToFl}h</td>
                      <td>
                        <div className="tbs-cell-actions">
                          <button
                            onClick={() => handleEditClick(rule)}
                            className="tbs-icon-btn tbs-icon-btn-edit"
                            title="Edit Route Validity"
                          >
                            <Edit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(rule.id, `${rule.source} ➔ ${rule.destination}`)}
                            className="tbs-icon-btn tbs-icon-btn-delete"
                            title="Remove Pairing"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Government Delhi Excise footer */}
        <div className="tbs-gov-footer">
          <div className="tbs-gov-footer-content">
            <p>
              Contents provided by the <span>Department of Excise</span>, Government of NCT of Delhi. Site Designed, hosted and maintained by <span>National Informatics Centre</span>
            </p>
            <div className="tbs-gov-footer-subtext">
              Best viewed in Internet Explorer 8.0 / Firefox 3.6 or later. <a href="#">Legal Disclaimer</a>
            </div>
          </div>
        </div>

      </div>

      {/* Helpful callout informational panel */}
      <div className="tbs-callout">
        <div className="tbs-callout-icon">
          <HelpCircle />
        </div>
        <div className="tbs-callout-content">
          <div className="tbs-callout-title">About Transport Pass (Packaged FL) Validity</div>
          <div className="tbs-callout-text">
            Transport Permit/Pass Validity masters enable configuration of strict transit hours based on source and destination district pairings. 
            When a Packaged FL transport license is generated, the pipeline evaluates the source and destination districts of the licensee and applies the exact Hour limits specified on this dashboard. 
            All modifications update the transit pipelines in real-time. Use <strong>Export CSV</strong> to save spreadsheet audits.
          </div>
        </div>
      </div>

    </div>
  );
}
