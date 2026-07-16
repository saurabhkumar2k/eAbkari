import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Building,
  Upload,
  CheckCircle2,
  FileText,
  Trash2,
  Plus,
  ArrowLeft,
  Save,
  HelpCircle,
  FileCheck,
  Building2,
  User,
  ShieldCheck,
  AlertCircle,
  X
} from "lucide-react";
import Step1PremiseDetails from "./PremiseDetails.jsx";
import Step2HallDetails from "./PremiseHallDetails.jsx";
import Step3Documents from "./PremiseDocuments.jsx";
import Step4Declaration from "./PremiseDeclaration.jsx";

export default function RegisterPremiseWizard({ onBackToDashboard, showToast, onSubmitPremise, setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const policeStations = [
    "Connaught Place PS",
    "Chanakyapuri PS",
    "Okhla PS",
    "Saket PS",
    "Model Town PS",
    "Mayapuri PS",
    "Rohini PS",
    "Dwarka PS",
    "Rajouri Garden PS",
    "Karol Bagh PS",
    "Vasant Vihar PS",
    "Shahdara PS",
    "Preet Vihar PS"
  ];

  // Steps matching the screenshot and logical flow
  const steps = [
    { num: 1, label: "Premise Details", subtitle: "Basic premises and applicant information" },
    { num: 2, label: "Hall Details", subtitle: "Details of halls in the premise" },
    { num: 3, label: "Documents", subtitle: "Upload required documents" },
    { num: 4, label: "Declaration", subtitle: "Declaration and submission" }
  ];

  // Wizard state values
  const [premiseName, setPremiseName] = useState("");
  const [premiseType, setPremiseType] = useState("");
  const [numHalls, setNumHalls] = useState(1);
  const [ownershipType, setOwnershipType] = useState("Owned");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [stateName, setStateName] = useState("Delhi");
  const [district, setDistrict] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");

  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // Step 2: Hall Details state
  const [halls, setHalls] = useState([]);

  // Step 3: Documents upload state
  const [uploadedDocs, setUploadedDocs] = useState({
    ownershipProof: null,
    fireNoc: null,
    mcdLicense: null,
    sitePlan: null,
    panProof: null
  });

  const [uploadProgress, setUploadProgress] = useState({
    ownershipProof: 0,
    fireNoc: 0,
    mcdLicense: 0,
    sitePlan: 0,
    panProof: 0
  });

  // Step 4: Declaration State
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToInspect, setAgreedToInspect] = useState(false);
  const [agreedToTruth, setAgreedToTruth] = useState(false);
  const [signatureName, setSignatureName] = useState("");

  // Sync hall records list count when numHalls is modified
  useEffect(() => {
    const targetCount = parseInt(numHalls) || 1;
    setHalls((prev) => {
      const current = [...prev];
      if (current.length < targetCount) {
        // Add new blank hall structures
        for (let i = current.length; i < targetCount; i++) {
          current.push({
            id: i + 1,
            name: ``,
            minCapacity: "0",
            maxCapacity: "0",
            floorLevel: "Ground Floor",
            hasAc: true
          });
        }
      } else if (current.length > targetCount) {
        // Truncate to target length
        return current.slice(0, targetCount);
      }
      return current;
    });
  }, [numHalls]);

  // Handle manual hall inputs
  const handleHallChange = (id, field, value) => {
    setHalls(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  // Simulate file upload
  const triggerDocUpload = (key, fileName) => {
    if (!fileName) return;
    
    // Set initiating state
    setUploadProgress(prev => ({ ...prev, [key]: 10 }));
    
    let current = 10;
    const interval = setInterval(() => {
      current += 25;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(prev => ({ ...prev, [key]: 100 }));
        setUploadedDocs(prev => ({
          ...prev,
          [key]: {
            name: fileName,
            size: "1.2 MB",
            uploadedAt: new Date().toLocaleTimeString()
          }
        }));
        showToast(`${key.replace(/([A-Z])/g, ' $1')} uploaded successfully!`, "success");
      } else {
        setUploadProgress(prev => ({ ...prev, [key]: current }));
      }
    }, 200);
  };

  const removeDoc = (key) => {
    setUploadedDocs(prev => ({ ...prev, [key]: null }));
    setUploadProgress(prev => ({ ...prev, [key]: 0 }));
    showToast(`Removed uploaded document file`, "info");
  };

  // Form Validations for next steps
  const validateStep1 = () => {
    if (!premiseName.trim()) return "Premise Name is required";
    if (!premiseType) return "Premise Type selection is required";
    if (!numHalls || numHalls < 1) return "Number of Halls must be 1 or more";
    
    if (!addressLine1.trim()) return "Address Line 1 is required";
    if (!stateName) return "State is required";
    if (!district) return "District is required";
    if (!policeStation) return "Police Station is required";
    if (!pinCode || pinCode.trim().length !== 6) return "Valid 6-digit PIN code is required";

    if (!ownerFirstName.trim()) return "Owner First Name is required";
    if (!ownerLastName.trim()) return "Owner Last Name is required";
    if (!mobileNumber || mobileNumber.trim().length !== 10) return "Valid 10-digit Mobile Number is required";
    if (!emailId.trim() || !emailId.includes("@")) return "Valid Email ID is required";

    if (!panNumber || panNumber.trim().length !== 10) return "Valid 10-digit PAN number is required";

    return null;
  };

  const validateStep2 = () => {
    for (let h of halls) {
      if (!h.name.trim()) return "Hall Name is required";
      const minCap = parseInt(h.minCapacity) || 0;
      const maxCap = parseInt(h.maxCapacity) || 0;
      if (minCap < 0) return "Minimum Capacity cannot be negative";
      if (maxCap < 0) return "Maximum Capacity cannot be negative";
      if (maxCap < minCap) return "Maximum Capacity cannot be less than Minimum Capacity";
    }
    return null;
  };

  const addHall = () => {
    const newId = halls.length + 1;
    setHalls(prev => [
      ...prev,
      {
        id: newId,
        name: "",
        minCapacity: "0",
        maxCapacity: "0",
        floorLevel: "Ground Floor",
        hasAc: true
      }
    ]);
    setNumHalls(prev => prev + 1);
  };

  const deleteHall = () => {
    if (halls.length <= 1) {
      showToast("At least one hall is required", "error");
      return;
    }
    setHalls(prev => prev.slice(0, -1));
    setNumHalls(prev => Math.max(1, prev - 1));
  };

  const validateStep3 = () => {
    if (!uploadedDocs.ownershipProof) return "Proof of ownership or Lease Deed is mandatory";
    if (!uploadedDocs.fireNoc) return "Fire Safety NOC is mandatory";
    if (!uploadedDocs.mcdLicense) return "MCD Trade License is mandatory";
    return null;
  };

  const validateStep4 = () => {
    if (!agreedToTerms || !agreedToInspect || !agreedToTruth) {
      return "All compliance checkboxes must be accepted";
    }
    if (!signatureName.trim()) {
      return "Digitally signing with your full name is required";
    }
    return null;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const error = validateStep1();
      if (error) {
        showToast(error, "error");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const error = validateStep2();
      if (error) {
        showToast(error, "error");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const error = validateStep3();
      if (error) {
        showToast(error, "error");
        return;
      }
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const error = validateStep4();
    if (error) {
      showToast(error, "error");
      return;
    }

    const newPremiseId = `PM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const premiseData = {
      id: newPremiseId,
      premiseName,
      address: `${addressLine1}, ${addressLine2 ? addressLine2 + ', ' : ''}${district}, Delhi - ${pinCode}`,
      premiseType,
      dimensions: `${halls.reduce((sum, h) => sum + 1500, 0)} Sq. Ft. (${halls.length} Halls)`,
      status: "Approved",
      submittedDate: new Date().toLocaleDateString("en-GB"),
      remarks: "CCTV feed validated & digital compliance dossier created successfully"
    };

    onSubmitPremise(premiseData);
    showToast(`Successfully registered Premise: ${premiseName}! Approved reference created.`, "success");
    setActiveTab("Applied Premise");
  };

  return (
    <div className="premise-wizard-container">
      
      {/* Top Header Breadcrumb and Back Action */}
      <div className="premise-top-bar">
        <button
          onClick={onBackToDashboard}
          className="premise-back-btn"
        >
          <ChevronLeft className="premise-help-icon" />
          <span>Back to Dashboard</span>
        </button>

        <div className="premise-breadcrumb">
          <span>Premise</span>
          <span>/</span>
          <span className="premise-breadcrumb-active">Register New Premise</span>
        </div>
      </div>

      {/* Title block */}
      <div className="premise-title-block">
        <h1 className="premise-main-title">
          <Building className="premise-icon" />
          Premise Registration & Licensing Portal
        </h1>
        <p className="premise-subtitle">
          Complete the four-step application to register your physical hall, banquet or farmhouse facility with NCT Delhi Excise.
        </p>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="premise-stepper-box">
        <div className="premise-stepper-grid">
          {steps.map((st, sIdx) => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            
            return (
              <div key={st.num} className="premise-step-item">
                <div className="premise-step-header">
                  <div className={`premise-step-badge ${
                    isActive 
                      ? "active" 
                      : isCompleted 
                        ? "completed" 
                        : "inactive"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="premise-help-icon" style={{ width: "1.25rem", height: "1.25rem" }} /> : st.num}
                  </div>
                  <div>
                    <h4 className={`premise-step-title ${isActive ? "active" : isCompleted ? "completed" : "inactive"}`}>
                      {st.label}
                    </h4>
                    <p className="premise-step-subtitle">{st.subtitle}</p>
                  </div>
                </div>
                {/* Horizontal connector line */}
                {sIdx < 3 && (
                  <div className="premise-step-line">
                    <div className={`premise-step-line-fill ${currentStep > st.num ? "completed" : ""}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN STEP CARDS CONTAINER */}
      <div className="premise-card">
        
        {/* Step 1: Premise Details */}
        {currentStep === 1 && (
          <Step1PremiseDetails
            premiseName={premiseName}
            setPremiseName={setPremiseName}
            premiseType={premiseType}
            setPremiseType={setPremiseType}
            numHalls={numHalls}
            setNumHalls={setNumHalls}
            ownershipType={ownershipType}
            setOwnershipType={setOwnershipType}
            addressLine1={addressLine1}
            setAddressLine1={setAddressLine1}
            addressLine2={addressLine2}
            setAddressLine2={setAddressLine2}
            stateName={stateName}
            setStateName={setStateName}
            district={district}
            setDistrict={setDistrict}
            policeStation={policeStation}
            setPoliceStation={setPoliceStation}
            pinCode={pinCode}
            setPinCode={setPinCode}
            ownerFirstName={ownerFirstName}
            setOwnerFirstName={setOwnerFirstName}
            ownerLastName={ownerLastName}
            setOwnerLastName={setOwnerLastName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            emailId={emailId}
            setEmailId={setEmailId}
            panNumber={panNumber}
            setPanNumber={setPanNumber}
            gstNumber={gstNumber}
            setGstNumber={setGstNumber}
            districts={districts}
            policeStations={policeStations}
          />
        )}

        {/* Step 2: Hall Details */}
        {currentStep === 2 && (
          <Step2HallDetails
            halls={halls}
            addHall={addHall}
            deleteHall={deleteHall}
            handleHallChange={handleHallChange}
            handleNextStep={handleNextStep}
          />
        )}

        {/* Step 3: Documents Upload */}
        {currentStep === 3 && (
          <Step3Documents
            uploadedDocs={uploadedDocs}
            uploadProgress={uploadProgress}
            triggerDocUpload={triggerDocUpload}
            removeDoc={removeDoc}
          />
        )}

        {/* Step 4: Review and Declaration */}
        {currentStep === 4 && (
          <Step4Declaration
            premiseName={premiseName}
            premiseType={premiseType}
            ownershipType={ownershipType}
            numHalls={numHalls}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            stateName={stateName}
            district={district}
            pinCode={pinCode}
            policeStation={policeStation}
            ownerFirstName={ownerFirstName}
            ownerLastName={ownerLastName}
            mobileNumber={mobileNumber}
            emailId={emailId}
            panNumber={panNumber}
            gstNumber={gstNumber}
            halls={halls}
            uploadedDocs={uploadedDocs}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            agreedToInspect={agreedToInspect}
            setAgreedToInspect={setAgreedToInspect}
            agreedToTruth={agreedToTruth}
            setAgreedToTruth={setAgreedToTruth}
            signatureName={signatureName}
            setSignatureName={setSignatureName}
            handleFinalSubmit={handleFinalSubmit}
          />
        )}

        {/* Form Actions Footer Navigation */}
        <div className="premise-footer-nav">
          
          {/* Back/Cancel buttons */}
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="premise-btn-prev"
              >
                <ArrowLeft className="premise-help-icon" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="premise-btn-cancel"
              >
                Cancel Registration
              </button>
            )}
          </div>

          {/* Forward buttons */}
          <div className="premise-right-actions">
            
            {/* Draft button only for step 1-3 */}
            {currentStep < 4 && (
              <button
                type="button"
                onClick={() => showToast("Registration draft saved to NCT portal!", "success")}
                className="premise-btn-draft"
              >
                Save Draft
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="premise-btn-next"
              >
                <span>Next Step</span>
                <ChevronRight className="premise-help-icon" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="premise-btn-submit"
              >
                <Save className="premise-help-icon" />
                <span>Submit Application</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
