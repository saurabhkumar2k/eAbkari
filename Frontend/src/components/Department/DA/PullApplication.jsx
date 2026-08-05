import React, { useState } from "react";
import { 
  Download, 
  CheckCircle2, 
  FileText, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  ScrollText
} from "lucide-react";


const MOCK_POOL_DATA = {
  "License/Permit": [
    {
      id: "APP-EX-2026-LP-011",
      licenseName: "New License / Permit Grant Request",
      applicantName: "Delhi Beverage Logistics Pvt Ltd",
      district: "South Delhi (Okhla Depot)",
      submissionDate: "03/08/2026",
      status: "Unassigned Pool",
      liquorType: "Wholesale & Retail Permit"
    },
    {
      id: "APP-EX-2026-LP-014",
      licenseName: "New License / Permit Grant Request",
      applicantName: "Capital Spirits & Depot Corp",
      district: "North West Delhi (Pitampura)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pool",
      liquorType: "Commercial Vending Permit"
    }
  ],
  "Permit": [
    {
      id: "APP-EX-2026-SCM-102",
      licenseName: "SCM Transit & Transport Permit",
      applicantName: "Imperial Wines & Imports Ltd",
      district: "New Delhi (Connaught Place)",
      submissionDate: "02/08/2026",
      status: "Unassigned Pool",
      liquorType: "Supply Chain Transit Permit"
    },
    {
      id: "APP-EX-2026-SCM-108",
      licenseName: "SCM Bulk Consignment Authorization",
      applicantName: "Global Cellars India Pvt Ltd",
      district: "South West Delhi (Vasant Kunj)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pool",
      liquorType: "Import Stock Movement"
    }
  ],
  "License Document Revalidation": [
    {
      id: "APP-EX-2026-REV-201",
      licenseName: "License Document Revalidation",
      applicantName: "National Distilleries & Bottlers",
      district: "West Delhi (Mayapuri)",
      submissionDate: "01/08/2026",
      status: "Unassigned Pool",
      liquorType: "Document Verification & Renewal"
    }
  ],
  "License Extension": [
    {
      id: "APP-EX-2026-EXT-311",
      licenseName: "Temporary License Tenure Extension",
      applicantName: "Grand Heritage Hospitality Ltd",
      district: "South Delhi (Aerocity)",
      submissionDate: "03/08/2026",
      status: "Unassigned Pool",
      liquorType: "Bar & Restaurant Tenure Extension"
    }
  ],
  "HCR Edit License": [
    {
      id: "APP-EX-2026-HCR-405",
      licenseName: "HCR License Details Modification",
      applicantName: "Overseas Spirits Importers & Hotels",
      district: "Central Delhi",
      submissionDate: "04/08/2026",
      status: "Unassigned Pool",
      liquorType: "Hotel / Club / Restaurant Endorsement"
    }
  ],
  "Surrender License": [
    {
      id: "APP-EX-2026-SUR-509",
      licenseName: "License Surrender Request",
      applicantName: "Royal Heritage Bottling Corp",
      district: "North Delhi",
      submissionDate: "04/08/2026",
      status: "Unassigned Pool",
      liquorType: "Voluntary License Surrender"
    }
  ],
  "License Transfer": [
    {
      id: "APP-EX-2026-TRN-601",
      licenseName: "Ownership / Entity License Transfer",
      applicantName: "Apex Spirits Distribution LLP",
      district: "East Delhi (Patparganj)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pool",
      liquorType: "License Transfer & Reassignment"
    }
  ],
  "Site Details Change": [
    {
      id: "APP-EX-2026-SIT-702",
      licenseName: "Premises / Site Details Change",
      applicantName: "Metropolitan Cellars Pvt Ltd",
      district: "Shahdara",
      submissionDate: "05/08/2026",
      status: "Unassigned Pool",
      liquorType: "Premises Relocation / Map Update"
    }
  ]
};

export default function PullApplication({ onToast }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [pulledIds, setPulledIds] = useState([]);

  const handleFetchForm = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      if (onToast) onToast("info", "Please select an application category from the dropdown.");
      setFetchedData(null);
      setHasFetched(false);
      return;
    }

    const data = MOCK_POOL_DATA[selectedCategory] || [
      {
        id: `APP-EX-2026-${selectedCategory.slice(0, 3).toUpperCase()}-001`,
        licenseName: selectedCategory,
        applicantName: "Registered Excise Licensee",
        district: "Central Delhi",
        submissionDate: "05/08/2026",
        status: "Unassigned Pool",
        liquorType: "General Liquor Application"
      }
    ];
    setFetchedData(data);
    setHasFetched(true);
    if (onToast) {
      onToast("success", `Fetched ${data.length} pool records for ${selectedCategory}.`);
    }
  };

  const handlePull = (app) => {
    if (pulledIds.includes(app.id)) return;

    setPulledIds((prev) => [...prev, app.id]);
    if (onToast) {
      onToast(
        "success",
        `Application ${app.id} (${app.licenseName}) successfully pulled to your DA Desk queue!`
      );
    }
  };

  return (
    <div className="pa-container">
      {/* Official Top Excise Branding & Title Banner */}
      <div className="pa-top-branding">
        <div className="pa-brand-left">
          <div className="pa-seal-icon">
            <ShieldCheck style={{ width: "2rem", height: "2rem" }} />
          </div>
          <div>
            <h1 className="pa-brand-title">
              Government of NCT of Delhi • Department of Excise
            </h1>
            <p className="pa-brand-sub">
              <span>Excise Control & Liquor Licensing Central Application Pool Desk</span>
            </p>
          </div>
        </div>

        {/* Cutout Chevron Header Ribbon */}
        <div className="pa-header-row">
          <div className="pa-ribbon-banner">
            <h2 className="pa-ribbon-title">Pull Application</h2>
          </div>
        </div>
      </div>

      {/* Centered Selection Card */}
      <div className="pa-selection-box">
        <form onSubmit={handleFetchForm} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <label className="pa-select-label">
            <ScrollText style={{ width: "1rem", height: "1rem", color: "#0284c7" }} />
            Select Application Privilege Category
          </label>

          <select
            className="pa-select-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Please Select</option>
            <option value="License/Permit">License/Permit</option>
            <option value="Permit">Permit(SCM)</option>
            <option value="License Document Revalidation">License Document Revalidation</option>
            <option value="License Extension">License Extension</option>
            <option value="HCR Edit License"> HCR Edit License</option>
            <option value="Surrender License">Surrender License</option>
            <option value="License Transfer">License Transfer</option>
            <option value="Site Details Change">Site Details Change</option>      
          </select>

          <button type="submit" className="pa-fetch-btn">
            Fetch Selected
          </button>
        </form>
      </div>

      {/* Fetched Results Display */}
      {hasFetched && (
        <div className="pa-results-panel">
          <div className="pa-results-header">
            <h3 className="pa-results-title">
              <Layers style={{ width: "1.25rem", height: "1.25rem", color: "#0284c7" }} />
              <span>Liquor Pool Applications ({selectedCategory})</span>
              <span className="pa-badge">{fetchedData ? fetchedData.length : 0} Available</span>
            </h3>
            <button
              onClick={handleFetchForm}
              style={{
                background: "none",
                border: "none",
                color: "#0284c7",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <RefreshCw style={{ width: "0.9rem", height: "0.9rem" }} /> Refresh Pool
            </button>
          </div>

          {fetchedData && fetchedData.length > 0 ? (
            <div className="pa-table-wrapper">
              <table className="pa-table">
                <thead>
                  <tr>
                    <th>Ref Application ID</th>
                    <th>Liquor / License Category</th>
                    <th>Applicant / Premises</th>
                    <th>District / Depot Zone</th>
                    <th>Date Filed</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedData.map((item) => {
                    const isPulled = pulledIds.includes(item.id);

                    return (
                      <tr key={item.id}>
                        <td>
                          <span className="pa-app-id">{item.id}</span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{item.licenseName}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500, marginTop: "0.15rem" }}>
                            {item.liquorType}
                          </div>
                        </td>
                        <td style={{ fontWeight: 600 }}>{item.applicantName}</td>
                        <td>{item.district}</td>
                        <td style={{ fontSize: "0.8rem", color: "#475569" }}>{item.submissionDate}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: isPulled ? "#dcfce7" : "#fff7ed",
                              color: isPulled ? "#15803d" : "#c2410c",
                              padding: "0.25rem 0.6rem",
                              borderRadius: "4px",
                              fontSize: "0.725rem",
                              fontWeight: 800,
                              border: isPulled ? "1px solid #86efac" : "1px solid #ffedd5"
                            }}
                          >
                            {isPulled ? "Pulled to Desk" : "Pool - Unassigned"}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {isPulled ? (
                            <span className="pa-pulled-badge">
                              <CheckCircle2 style={{ width: "0.9rem", height: "0.9rem" }} />
                              Assigned to DA
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePull(item)}
                              className="pa-pull-action-btn"
                            >
                              <Download style={{ width: "0.9rem", height: "0.9rem" }} />
                              Pull Application
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="pa-empty-state">
              <FileText className="pa-empty-icon" />
              <p style={{ fontWeight: 700, margin: 0, color: "#1e293b", fontSize: "0.95rem" }}>
                No pending unassigned applications in this category.
              </p>
              <p style={{ fontSize: "0.825rem", color: "#64748b", marginTop: "0.25rem" }}>
                All applications for this category are either currently assigned or cleared.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
