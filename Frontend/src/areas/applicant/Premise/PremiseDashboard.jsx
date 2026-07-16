import React from "react";
import RegisterPremiseWizard from "./RegisteredPremise.jsx";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="section-title">
        {title}
      </h2>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default function PremiseDashboard({
  activeTab,
  setActiveTab,
  premiseApplications,
  setPremiseApplications,
  showToast
}) {
  if (activeTab === "Register Premise") {
    return (
      <div className="tab-container">
        <RegisterPremiseWizard
          onBackToDashboard={() => setActiveTab("Home")}
          showToast={showToast}
          onSubmitPremise={(newPremise) => {
            setPremiseApplications(prev => [newPremise, ...prev]);
          }}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  }

  if (activeTab === "Applied Premise") {
    return (
      <div className="tab-container">
        <SectionTitle 
          title="Registered Excise Premises Registry" 
          subtitle="Track current safety certificates, fire audits, and active physical statuses of your warehouses" 
        />

        <div className="revalidate-list">
          {premiseApplications.map((app) => (
            <div key={app.id} className="ledger-item-card">
              <div className="ledger-item-top">
                <div className="ledger-item-info">
                  <div className="ledger-item-tags-row">
                    <span className="ledger-tag-badge">EXCISE PHYSICAL PREMISE</span>
                    <span className="ledger-ref-num">{app.id}</span>
                  </div>
                  <h4 className="ledger-item-title">{app.premiseName}</h4>
                  <p className="ledger-item-details">
                    <span style={{ fontWeight: 700, color: "#64748b", fontSize: "10px", textTransform: "uppercase" }}>Type / Dimension:</span> {app.premiseType} ({app.dimensions})
                  </p>
                  <p className="ledger-item-details" style={{ marginTop: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#64748b", fontSize: "10px", textTransform: "uppercase" }}>Location:</span> {app.address}
                  </p>
                  <p className="ledger-item-date">Application Filed on: {app.submittedDate}</p>
                </div>

                <div className="ledger-item-right-col">
                  <span className={`ledger-status-badge ${
                    app.status === "Approved" 
                      ? "approved" 
                      : "progress"
                  }`}>
                    {app.status}
                  </span>
                  <span className="ledger-remarks-box">
                    {app.remarks}
                  </span>
                </div>
              </div>

              <div className="ledger-progress-steps-grid">
                {[
                  { label: "Fire Scrutiny", done: true },
                  { label: "Physical Verification", done: true },
                  { label: "Safety Audit clearance", done: app.status === "Approved" },
                  { label: "Premise Active", done: app.status === "Approved" }
                ].map((step, sIdx) => (
                  <div key={sIdx} className="ledger-progress-step-item">
                    <div className={`ledger-step-bar ${step.done ? "done" : "pending"}`}></div>
                    <p className="ledger-progress-step-label">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
