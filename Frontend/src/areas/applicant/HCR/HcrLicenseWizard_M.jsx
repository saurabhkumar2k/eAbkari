import React, { useState } from "react";
import HcrLicenseSelector from "./HcrLicenseSelector";
import HcrLicensee from "./HcrLicensee";

export default function HcrLicenseWizard() {
  const [showLicensee, setShowLicensee] = useState(false);

  const [selectedData, setSelectedData] = useState({
    ownerType: "",
    selectedLicensee: "",
    regId: localStorage.getItem("regId"),
  });

  const handleSelectorContinue = (data) => {
    console.log("Selected Data:", data);

    setSelectedData(data);
    setShowLicensee(true);
  };

  if (!showLicensee) {
    return (
      <HcrLicenseSelector
        regId={localStorage.getItem("regId")}
        onContinue={handleSelectorContinue}
      />
    );
  }

  return (
    <HcrLicensee
      ownerType={selectedData.ownerType}
      selectedLicensee={selectedData.selectedLicensee}
      regId={selectedData.regId}
      onBackToDashboard={() => setShowLicensee(false)}
    />
  );
}