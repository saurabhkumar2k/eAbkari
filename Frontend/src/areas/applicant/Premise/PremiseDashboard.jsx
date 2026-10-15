import React from "react";
import RegisterPremiseWizard from "./RegisteredPremise.jsx";
import AppliedPremise from "./AppliedPremise.jsx";

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
      <AppliedPremise
        premiseApplications={premiseApplications}
        onNavigateToHome={() => setActiveTab("Home")}
        onNavigateNewPremise={() => setActiveTab("Register Premise")}
        onNavigateToRenewal={() => setActiveTab("Renewal License")}
        onNavigateToDocumentRevalidate={() => setActiveTab("Document Revalidate")}
        onViewPremise={(id) => {
          if (showToast) showToast(`Viewing Premise Dossier ${id}`, "info");
        }}
        showToast={showToast}
      />
    );
  }

  return null;
}

