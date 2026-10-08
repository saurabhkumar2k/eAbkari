import React, { useState } from "react";
import RetailLicenseSelector from "./RetailLicenseSelector";
import RetailLicensee from "./RetailLicensee";

export default function RetailLicenseWizard() {
  const [showLicensee, setShowLicensee] = useState(false);

  const [selectedData, setSelectedData] = useState({
    ownerType: "",
    selectedLicensee: "",
    regId: localStorage.getItem("regId"),
  });

  const handleSelectorContinue = (data) => {
    debugger;
    console.log("Selected Data:", data);

    setSelectedData(data);
    setShowLicensee(true);
  };

  if (!showLicensee) {
    return (
      <RetailLicenseSelector
        regId={localStorage.getItem("regId")}
        onContinue={handleSelectorContinue}
      />
    );
  }

  return (
    <RetailLicensee
      ownerType={selectedData.ownerType}
      selectedLicensee={selectedData.selectedLicensee}
      regId={selectedData.regId}
      onBackToDashboard={() => setShowLicensee(false)}
    />
  );
}