import React, { useEffect,useState } from "react";

import ApplicantDetails from "../../../components/Applicant_Details";
import WarehouseDetails from "../../../components/WarehouseDetails";
 import DirectorsList from "../../../components/DirectorsList";
 import DocumentUpload from "../../../components/DocumentsDetails";


import { createApplicant } from "../../../Model/Applicant";



import {
  User,
  Building2,
  Calendar,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Upload,
  Bookmark,
  FileCheck2,
  Lock,
  Warehouse,
  ShieldAlert,
  Info,
  DollarSign,
  Printer,
  Sparkles
} from "lucide-react";



export default function L1AndL31License({ ownerType,
  catCode,onBackToSelect, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [applicant, setApplicant] = useState(createApplicant());



const [applicantDistricts, setApplicantDistricts] = useState([]);
const [warehouseDistricts, setWarehouseDistricts] = useState([]);


const [warehouseSubDivisions, setWarehouseSubDivisions] = useState([]);
const [warehousePoliceStations, setWarehousePoliceStations] = useState([]);

const [applicationId, setApplicationId] = useState(null);

  const [states, setStates] = useState([]);

  const [subDivisions, setSubDivisions] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const [innerStep, setInnerStep] = useState(1);

  const [fssai, setFssai] = useState({ FSSAILicenceNo: "", FSSAILicenceStartDate: "", FSSAILicenceEndDate: "" });
  const [vat, setVat] = useState({ VATGSTCertNo: "", VATGSTCertEnddate: "" });
  const [distillery, setDistillery] = useState({ DistilleryLicNo: "", DistilleryLicEnddate: "" });
  const [bwh, setBwh] = useState({ BWHInsuranceEndDate: "", BWHRentAgreementEndDate: "" });

 const [nominee, setNominee] = useState({
    IsExciseNominee: "0",
    ExciseNomineeName: "",
    ExciseNomineeAddress: "",
    ExciseNomineeEmailID: "",
    ExciseNomineeMobileNo: "",
    ExciseNomineePAN: "",
    ExciseNomineePanImage:"",
  });


console.table(documents);


  const [formData, setFormData] = useState({
    // Step 1: Applicant Details
    applicantName: "VISHAL DEVILAL JAISWAL",
    companyName: "KRISTAL SPIRITS PVT LTD",
    dob: "1980-01-01",
    fatherName: "DEVILAL JAISWAL",
    occupation: "business",
    address1: "B-96, FIRST FLOOR, MAYAPURI, INDUSTRIAL AREA, PHASE-I, NE",
    address2: "Phase-I, Mayapuri",
    state: "Delhi",
    district: "West",
    subDivision: "Rajouri Garden",
    pin: "110064",
    email: "vishal@kristalspirits.com",
    mobile: "9266024141",
    landline: "011-45672910",
    panNo: "AAFCM6267M",

    // Step 2: Warehouse Details
    warehouseName: "Kristal Mayapuri Bonded Depot",
    warehouseAddress: "B-96, Mayapuri Industrial Area, Phase-I, West Delhi, 110064",
    warehouseSize: "12500", // Sq. ft
    hasFireSprinklers: "Yes",
    cctvProvider: "SecureVision CCTV Systems Ltd",
    lockerCount: "12",
    hasTemperatureControl: "Yes",

    // Step 3: Additional Details
    annualTurnover: "45.50", // Crores
    bankGuaranteeRef: "BG-2026-NCT-99120",
    bankGuaranteeAmount: "5000000", // 50 Lakhs
    pastExpYears: "8",
    deliveryVehicles: "6",
    priorLicensesDelhi: "Yes",

    // Step 4: Personal Documents (Files Status)
    personalPanUploaded: true,
    personalAadhaarUploaded: true,
    partnershipDeedUploaded: true,
    itrReturnUploaded: true,

    // Step 5: Site Documents (Files Status)
    leaseDeedUploaded: true,
    fireNocUploaded: true,
    mcdTradeLicenseUploaded: true,
    buildingPlanUploaded: true,

    // Step 6: Declaration
    undertakingAccept: false,
    signatureName: "VISHAL DEVILAL JAISWAL",
    signingPlace: "New Delhi"
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const steps = [
    { num: 1, label: "Step-1", sub: "Applicant Details" },
    { num: 2, label: "Step-2", sub: "Warehouse Details" },
    { num: 3, label: "Step-3", sub: "Additional Details" },
    { num: 4, label: "Step-4", sub: "Personal Document" },
    { num: 5, label: "Step-5", sub: "Site Document" },
    { num: 6, label: "Step-6", sub: "Declaration" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };


  /* ================= HANDLERS ================= */

const handleApplicantChange = (field, value) => {
 // debugger;
  setApplicant((prev) => ({ ...prev, [field]: value }));

  if (field === "state") {
    fetchDistricts(value, "applicant");
  }

  if (field === "warehouseState") {
    fetchDistricts(value, "warehouse");
  }

  // if (field === "warehouseDistrict") {
  //   fetchWarehouseExtras(value); // ✅ ONLY THIS
  // }

if (field === "warehouseDistrict") {
    fetchSubDivisions(value);   // 👈 Add this
  }

if (field === "WarehouseSubDivision") {
fetchPoliceStations(applicant.warehouseDistrict);   // 👈 Add this

}

 if (field === "constitutionType") {
    console.log("Selected:", value);
  }

};


// Applicant
useEffect(() => {
  if (applicant.StateUT) {
    fetchDistricts(applicant.StateUT, "applicant");
  }
}, [applicant.StateUT]);

// Warehouse
useEffect(() => {
  if (applicant.warehouseState) {
    fetchDistricts(applicant.warehouseState, "warehouse");
  }
}, [applicant.warehouseState]);



  const handleDirectorChange = (i, f, v) => {
    const d = [...(applicant.directors || [])];
    d[i][f] = v;
    setApplicant({ ...applicant, directors: d });
  };

  const addRow = () =>
    setApplicant((p) => ({
      ...p,
      directors: [...(p.directors || []), { name: "", panNo: "" }]
    }));

  const deleteRow = (i) =>
    setApplicant((p) => ({
      ...p,
      directors: p.directors.filter((_, x) => x !== i)
    }));

const handleFileChange = (key, file) => {
  setUploadedFiles((prev) => ({
    ...prev,
    [key]: {
      file,
      previewUrl: URL.createObjectURL(file)
    }
  }));
};

const handleDeleteFile = (key) => {
  setUploadedFiles((prev) => {
    const updated = { ...prev };
    delete updated[key];
    return updated;
  });
};



  // useEffect(() => {
  //   fetch("http://localhost:5214/api/LGDiretory/getState")
  //     .then((r) => r.json())
  //     .then(setStates);
  // }, []);


useEffect(() => {
  debugger;
  fetch("http://localhost:5214/api/LGDiretory/getState")
    .then((r) => r.json())
    .then((data) => {
      console.log("API Response:", data);
      console.log("API isArray:", Array.isArray(data));

      setStates(data);
    });
}, []);


const fetchDistricts = async (stateCode, type) => {
  debugger;
  const res = await fetch(
    `http://localhost:5214/api/LGDiretory/GetDistrict?Statecode=${stateCode}`
  );

  const data = await res.json();

  if (type === "applicant") {
    setApplicantDistricts(data);
  } else {
    setWarehouseDistricts(data);
  }
};


// const fetchSubdivisions = async (districtCode, type) => {
//   debugger;
//   const res = await fetch(
//     `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`
//   );

//   const data = await res.json();

//   if (type === "applicant") {
//     setApplicantSubdivisions(data);
//   } else {
//     setWarehouseSubdivisions(data);
//   }
// };



const fetchPoliceStations = async (districtCode) => {
  try {
    const res = await fetch(
      `http://localhost:5214/api/LGDiretory/PoliceStations/${districtCode}`
    );

    console.log("Status:", res.status);

    const text = await res.text();
    console.log("Response:", text);

    if (!text) {
      console.log("Empty response received");
      return;
    }

    const data = JSON.parse(text);

    setWarehousePoliceStations(data);
  } catch (err) {
    console.log(err);s
  }
};


const fetchSubDivisions = async (districtCode) => {
  try {
    const res = await fetch(
      `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`
    );

    const data = await res.json();

    setWarehouseSubDivisions(data);
  } catch (err) {
    console.log(err);
  }
};






// useEffect(() => {
//   debugger;
//   const applicationIdNo = localStorage.getItem("applicationId");
//   const catCode = localStorage.getItem("catCode");

//   console.log("ApplicationId:", applicationIdNo);
//   console.log("CatCode:", catCode);

//   fetch(
//     `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${catCode}`
//   )
//     .then((r) => r.json())
//     .then((data) => setDocuments(data));
// }, []);


useEffect(() => {
  if (currentStep !== 4 && currentStep !== 5) return;

  const applicationIdNo = localStorage.getItem("applicationId");
  if (!applicationIdNo || !catCode) return;

  const docStatus = currentStep === 4 ? "A" : "S";

  fetch(
    `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${catCode}&docStatus=${docStatus}`
  )
    .then((r) => r.json())
    .then((data) => setDocuments(data));

}, [currentStep, catCode]);








const handleStep1Next = async () => {
  const response = await fetch(
    "http://localhost:5214/api/Application/SaveApplicant",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicant),
    }
  );

  const data = await response.json();

  setApplicationId(data.applicationId);

  setCurrentStep(2);
};


useEffect(() => {
  const regId = localStorage.getItem("regId");

  if (regId) {
    loadApplicantData(regId);
  }
}, []);



const loadApplicantData = async (regId) => {
  try {
    const response = await fetch(
      `http://localhost:5214/api/LicenseeCategories/GetApplicantByRegId/${regId}`
    );

    if (!response.ok) {
      console.log("API Error:", response.status);
      return;
    }

    const data = await response.json();
  debugger;
    console.log(data);
console.log("ownerType prop =", ownerType);
console.log("catCode prop =", catCode);

// 👇 Pehle state ke basis par district list load karo
  await fetchDistricts(data.stateUT, "applicant");


 setApplicant((prev) => ({

  ...prev,
  // firstName: data.firstName,
  // lastName: data.lastName,
  applicantName: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
  fatherHusbandName: data.fatherHusbandName,
    dateOfBirth: data.dateOfBirth
    ? data.dateOfBirth.split("T")[0]
    : "",
    panNo: data.panNo,
    constitutionType: data.constitutionType,
    occupation: data.occupation,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    stateUT: data.stateUT,
    district: data.district,
    pin: data.pin,
    email: data.email,
    mobile: data.mobile,
    landline: data.landline,
  ownerType: ownerType,   // prop se
  catCode: catCode        // prop se

}));
  } catch (err) {
    console.log(err);
  }
};




  
  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.companyName || !formData.companyName.trim()) {
        errors.companyName = "Name of Company/Firm/LLP/Society/Individual is required";
      }
      if (!formData.address1 || !formData.address1.trim()) {
        errors.address1 = "Address 1 is required";
      }
      if (!formData.pin || formData.pin.length !== 6) {
        errors.pin = "Enter a valid 6-digit PIN code";
      }
      if (!formData.email || !formData.email.includes("@")) {
        errors.email = "Enter a valid email address";
      }
      if (!formData.mobile || formData.mobile.length < 10) {
        errors.mobile = "Enter a valid mobile number";
      }
      if (!formData.panNo || formData.panNo.length !== 10) {
        errors.panNo = "Enter a valid 10-character PAN number";
      }
    } else if (step === 2) {
      if (!formData.warehouseName || !formData.warehouseName.trim()) {
        errors.warehouseName = "Warehouse Name is required";
      }
      if (!formData.warehouseAddress || !formData.warehouseAddress.trim()) {
        errors.warehouseAddress = "Warehouse Address is required";
      }
      if (!formData.warehouseSize || Number(formData.warehouseSize) < 500) {
        errors.warehouseSize = "Warehouse area must be at least 500 Sq. Ft";
      }
    } else if (step === 3) {
      if (!formData.annualTurnover || Number(formData.annualTurnover) <= 0) {
        errors.annualTurnover = "Prior and anticipated annual turnover must be positive";
      }
      if (!formData.bankGuaranteeRef || !formData.bankGuaranteeRef.trim()) {
        errors.bankGuaranteeRef = "Bank Guarantee / Security reference number is required";
      }
    } else if (step === 6) {
      if (!formData.undertakingAccept) {
        errors.undertakingAccept = "You must select and accept the regulatory undertaking declarations";
      }
      if (!formData.signatureName || !formData.signatureName.trim()) {
        errors.signatureName = "Authorized signatory signature name is required";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleNextStep = () => {
  //   if (validateStep(currentStep)) {
  //     if (currentStep < 6) {
  //       setCurrentStep(currentStep + 1);
  //       if (showToast) showToast(`Step ${currentStep} completed successfully!`);
  //     } else {
  //       // Trigger final submit
  //       handleFinalSubmission();
  //     }
  //   } else {
  //     if (showToast) showToast("Please review marked fields before advancing.", "error");
  //   }
  // };


const handleNextStep = async () => {

  if (!validateStep(currentStep)) {
    if (showToast) {
      showToast(
        "Please review marked fields before advancing.",
        "error"
      );
    }
    return;
  }

  try {

    // STEP 1 SAVE
    if (currentStep === 1 && !applicationId) {
debugger;

const payload = {
  RegId: Number(localStorage.getItem("regId")),
  

  ApplicantName: applicant.applicantName,
  Dob: applicant.dateOfBirth,
  FatherHusbandName: applicant.fatherHusbandName,
  Occupation: applicant.occupation,
  PanNo: applicant.panNo,

  PresentAddress: applicant.addressLine1,
  PermanentAddress: applicant.addressLine2,

  StateUT: applicant.stateUT,
  District: applicant.district,
  PIN: applicant.pin,

  Email: applicant.email,
  Mobile: applicant.mobile,
  LandLine: applicant.landline,
  CinNo: applicant.cinNo,
  OwnerType: applicant.ownerType,
  CatCode: applicant.catCode
};


      const response = await fetch(
        "http://localhost:5214/api/LicenseeCategories/ApplyLicense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
debugger;
      setApplicationId(data.applicationId);

      console.log("Generated Id:", data.applicationId);
      localStorage.setItem("applicationId", data.applicationId);
      localStorage.setItem("catCode", data.catCode);
      alert(`Your Application Reference No. is ${data.applicationId}`);
      

    }


if (currentStep === 2 ) {
debugger;

const payload = {
  ...applicant,
  regId: localStorage.getItem("regId"),
 ApplicationIdNo: localStorage.getItem("applicationId"),
 CatCode:localStorage.getItem("catCode")
};


      const response = await fetch(
        "http://localhost:5214/api/LicenseeCategories/ApplyWarehouseLicense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      console.log("Warehouse License Response:", data);

}

if (currentStep === 3) {
  debugger;

  console.log("Directors:", applicant.directors);

  const formData = new FormData();

  // Merge all objects
  const payload = {
    ...applicant,
    ...nominee,
    ...fssai,
    ...vat,
    ...distillery,
    ...bwh,
    regId: localStorage.getItem("regId"),
    ApplicationIdNo: localStorage.getItem("applicationId"),
    CatCode: localStorage.getItem("catCode")
  };

  // Append normal fields
  Object.keys(payload).forEach((key) => {
    // Skip file and list
    if (
      key !== "ExciseNomineePanImage" &&
      key !== "CompanyPartnersDetails"
    ) {
      formData.append(key, payload[key] ?? "");
    }
  });

  // Append file
  if (nominee.ExciseNomineePanImage) {
    formData.append(
      "ExciseNomineePanImage",
      nominee.ExciseNomineePanImage
    );
  }

applicant.directors.forEach((director, index) => {

    formData.append(
        `CompanyPartnersDetails[${index}].PName`,
        director.PName || ""
    );

    formData.append(
        `CompanyPartnersDetails[${index}].PPerShare`,
        director.PPerShare || ""
    );

    formData.append(
        `CompanyPartnersDetails[${index}].PPanNo`,
        director.PPanNo || ""
    );

    formData.append(
        `CompanyPartnersDetails[${index}].PExciseNominee`,
        director.PExciseNominee || ""
    );

    // PAN File
    if (director.panFile) {
        formData.append(
            `CompanyPartnersDetails[${index}].PanFile`,
            director.panFile
        );
    }
        if (director.AddressProofFile) {
        formData.append(
            `CompanyPartnersDetails[${index}].AddressProofFile`,
            director.AddressProofFile
        );
    }
});

  const response = await fetch(
    "http://localhost:5214/api/LicenseeCategories/ApplyCompanydetails",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  console.log("Warehouse License Response:", data);
}


if (currentStep === 4) {
  debugger;

  const formData = new FormData();

  formData.append(
    "ApplicationIdNo",
    localStorage.getItem("applicationId")
  );

  formData.append(
    "MobileNo",
    applicant.mobile
  );

  let index = 0;

  documents.forEach((doc) => {
    const uploaded = uploadedFiles[doc.docId];

    if (uploaded?.file) {
      formData.append(
        `Documents[${index}].ApplicantSl`,
        doc.applicantSl || 1
      );

      formData.append(
        `Documents[${index}].DocId`,
        doc.docId
      );

      formData.append(
        `Documents[${index}].DocSl`,
        doc.docSl || 1
      );

      formData.append(
        `Documents[${index}].DocumentFile`,
        uploaded.file
      );

      index++;
    }
  });








  
  const response = await fetch(
    "http://localhost:5214/api/LicenseeCategories/UploadApplicationDocuments",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);
}


if (currentStep === 5) {
  debugger;

  const formData = new FormData();

  formData.append(
    "ApplicationIdNo",
    localStorage.getItem("applicationId")
  );

  formData.append(
    "MobileNo",
    applicant.mobile
  );

  let index = 0;

  documents.forEach((doc) => {
    const uploaded = uploadedFiles[doc.docId];

    if (uploaded?.file) {
      formData.append(
        `Documents[${index}].ApplicantSl`,
        doc.applicantSl || 1
      );

      formData.append(
        `Documents[${index}].DocId`,
        doc.docId
      );

      formData.append(
        `Documents[${index}].DocSl`,
        doc.docSl || 1
      );

      formData.append(
        `Documents[${index}].DocumentFile`,
        uploaded.file
      );

      index++;
    }
  });








  
  const response = await fetch(
    "http://localhost:5214/api/LicenseeCategories/UploadApplicationDocuments",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);
}




    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);

      if (showToast) {
        showToast(
          `Step ${currentStep} completed successfully!`
        );
      }
    } else {
      handleFinalSubmission();
    }

  } catch (error) {
    console.error(error);

    if (showToast) {
      showToast("Unable to save applicant data", "error");
    }
  }
};








  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmission = () => {
    const appNo = `AP-L1L31-${Math.floor(100000 + Math.random() * 900000)}`;
    const feeAmount = 850000; // 8.5 Lakhs combined fee
    const receipt = {
      applicationNo: appNo,
      applicantName: formData.applicantName,
      companyName: formData.companyName,
      exciseFee: "₹ 8,50,000",
      bondGuarantee: "₹ 50,000",
      totalFeePaid: "₹ 9,00,000",
      dateFiled: new Date().toLocaleDateString("en-IN"),
      warehouseAddress: formData.warehouseAddress,
      pincode: formData.pin,
      district: formData.district,
      status: "Filing Registered"
    };

    setReceiptData(receipt);
    setSubmitSuccess(true);
    if (showToast) showToast("Integrated L-1 & L-31 Excise application docket registered successfully!");
  };

  const triggerMockPrint = () => {
    if (showToast) showToast("Printing license application dossier to connected local PDF writer...", "success");
    window.print();
  };

  return (
     
    <div className="brand-registration-page select-none text-slate-800 animate-fade">
      
      {/* Top Banner Area with complete descriptive branding */}
      <div className="w-full bg-[#1e40af] text-white py-3.5 px-6 rounded-2xl shadow-md mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Warehouse className="w-6 h-6 text-yellow-300" />
          <h1 className="text-sm md:text-base font-extrabold tracking-wide uppercase">
            L1 (License for Wholesale Vend of Indian Liquor) and L31 (License for Warehouse for storage of Indian Liquor)
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-blue-800 py-1 px-3 rounded-lg text-xs font-bold font-mono">
          <span>PORTAL VER:</span>
          <span className="text-yellow-300">2026.06.A</span>
        </div>
      </div>

      {/* 6 Step Progress Wizard Bar Header */}
      {!submitSuccess && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 mb-6 select-none overflow-x-auto">
          <div className="flex items-center justify-between min-w-[768px] relative px-4">
            
            {/* Horizontal progress bar line connector */}
            <div className="absolute top-[22px] left-8 right-8 -translate-y-1/2 h-[3px] bg-slate-100 z-0">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              />
            </div>

            {/* Steps map */}
            {steps.map((st) => {
              const isActive = currentStep === st.num;
              const isCompleted = currentStep > st.num;
              return (
                <div key={st.num} className="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    onClick={() => {
                      // Allow arbitrary jumps only to completed steps for superior navigation
                      if (st.num < currentStep) {
                        setCurrentStep(st.num);
                      }
                    }}
                    className={`w-11 h-11 rounded-full flex flex-col items-center justify-center font-black text-sm border-2 cursor-pointer transition-all duration-300 ${
                      isCompleted 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100" 
                        : isActive 
                        ? "bg-[#1d4ed8] border-[#1d4ed8] text-white shadow-md shadow-blue-100 scale-110" 
                        : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3.5]" /> : <span>{st.num}</span>}
                  </div>
                  <span className={`text-[11px] font-extrabold mt-2 whitespace-nowrap ${
                    isActive ? "text-[#1d4ed8]" : isCompleted ? "text-emerald-700" : "text-slate-500"
                  }`}>
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{st.sub}</span>
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* Main Form Box body */}
      {!submitSuccess ? (
        <div className="space-y-6">
          
          {/* Internal Title Box Header */}
          <div className={`bg-[#5c6b73] text-white p-3 rounded-lg text-center font-bold text-sm select-none uppercase tracking-wider ${currentStep === 4 || currentStep === 5 ? "personal-doc-header" : ""}`}>
            {steps[currentStep - 1].sub}
          </div>

          <div className={`brand-card mb-6 ${currentStep === 4 || currentStep === 5 ? "personal-doc-card" : ""}`}>
            
            {/* Step 1: APPLICANT DETAILS FORM BLOCK */}
            {currentStep === 1 && (
                 <ApplicantDetails
            applicant={applicant}
            states={states}
              districts={applicantDistricts}   // ✅ FIX HERE
            onChange={handleApplicantChange}
          />
            )}

            {/* Step 2: WAREHOUSE DETAILS FORM BLOCK */}
            {currentStep === 2 && (
                  <WarehouseDetails
              applicant={applicant}
              states={states}
               districts={warehouseDistricts}   // ✅ correct
  subDivisions={warehouseSubDivisions}
  
  policeStations={warehousePoliceStations}
              onChange={handleApplicantChange}
            />
            )}

            {/* Step 3: ADDITIONAL DETAILS FORM BLOCK */}
            {currentStep === 3 && (

 <>
      

{/* ================= ADDITIONAL WAREHOUSE DETAILS ================= */}

<div className="section-card">
  <h3 className="section-title">Company / Firm Details</h3>

  <div className="form-row">

    <div className="form-item">
      <label>Constitution Type</label>
    <select
  value={applicant.ConstitutionType || ""}
  onChange={(e) =>
    handleApplicantChange("ConstitutionType", e.target.value)
  }
>
        <option value="">Select</option>
        <option value="Company">Company</option>
        <option value="Partnership">Partnership</option>
        <option value="LLP">LLP</option>
        <option value="Proprietorship">Proprietorship</option>
        <option value="Society">Society</option>
      </select>
    </div>

    {applicant.constitutionType === "Company" && (
      <div className="form-item">
        <label>CIN No</label>
        <input
          value={applicant.CINNO || ""}
          onChange={(e) => handleApplicantChange("CINNO", e.target.value)}
        />
      </div>
    )}

    <div className="form-item">
      <label>Registration No</label>
     <input
  value={applicant.RegistrationNo || ""}
  onChange={(e) =>
    handleApplicantChange("RegistrationNo", e.target.value)
  }
/>
    </div>

    <div className="form-item">
      <label>Registration Date</label>
      <input
        type="date"
        value={applicant.RegDate || ""}
        onChange={(e) =>
          handleApplicantChange("RegDate", e.target.value)
        }
      />
    </div>

    <div className="form-item">
      <label>PAN No</label>
      <input
        value={applicant.companyPan || ""}
        onChange={(e) =>
          handleApplicantChange("companyPan", e.target.value.toUpperCase())
        }
      />
    </div>

    <div className="form-item">
      <label>VAT / TIN</label>
      <input
        value={applicant.vatNo || ""}
        onChange={(e) => handleApplicantChange("vatNo", e.target.value)}
      />
    </div>

  </div>
</div> 


<DirectorsList
  directors={applicant.directors || []}
  constitutionType={applicant.constitutionType}
  onChange={handleDirectorChange}
  onAdd={addRow}
  onDelete={deleteRow}
/>

 {/* Step 4: PERSONAL DOCUMENT FILE MANAGEMENT */}


               <div className="form-container">

    {/* ================= NOMINEE ================= */}
    <div className="card">
      <div className="card-header">
        <h3>Excise Nominee</h3>
      </div>

      <div className="card-body">
        <label className="label">
          Is Excise Nominee other than applicant?
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="1"
              checked={nominee.isExciseNominee === "1"}
              onChange={(e) =>
                setNominee({ ...nominee, isExciseNominee: e.target.value })
              }
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              value="0"
              checked={nominee.isExciseNominee === "0"}
              onChange={(e) =>
                setNominee({ ...nominee, isExciseNominee: e.target.value })
              }
            />
            No
          </label>
        </div>
      </div>
    </div>

    {/* ================= NOMINEE DETAILS ================= */}
    {nominee.isExciseNominee === "1" && (
      <div className="card">
        <div className="card-header">
          <h3>Nominee Details</h3>
        </div>

        <div className="grid-3">
          <input
            placeholder="Name"
            value={nominee.ExciseNomineeName}
            onChange={(e) =>
              setNominee({ ...nominee, ExciseNomineeName: e.target.value })
            }
          />

          <input
            placeholder="Address"
            value={nominee.address}
            onChange={(e) =>
              setNominee({ ...nominee, address: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={nominee.ExciseNomineeEmailID}
            onChange={(e) =>
              setNominee({ ...nominee, ExciseNomineeEmailID: e.target.value })
            }
          />

          <input
            placeholder="Mobile"
            maxLength={10}
            value={nominee.ExciseNomineeMobileNo}
            onChange={(e) =>
              setNominee({
                ...nominee,
                ExciseNomineeMobileNo: e.target.value.replace(/\D/g, "")
              })
            }
          />

    <input
  placeholder="PAN"
  value={nominee.ExciseNomineePAN || ""}
  onChange={(e) =>
    setNominee({
      ...nominee,
      ExciseNomineePAN: e.target.value.toUpperCase(),
    })
  }
/>

{/* FILE */}
 <div className="form-item full">
  <label>PAN Proof</label>

  <div className="file-modern">
    {!nominee.ExciseNomineePanImage ? (
      <label className="upload-box">
        📄 Upload
        <input
          type="file"
          hidden
          accept=".pdf,.jpg,.jpeg"
          onChange={(e) =>
            setNominee({
              ...nominee,
              ExciseNomineePanImage: e.target.files?.[0] || null,
            })
          }
        />
      </label>
    ) : (
      <>
        <span className="file-name">
          {nominee.ExciseNomineePanImage.name}
        </span>

        <div className="file-actions">
          <button
            type="button"
            className="btn-view"
            onClick={() =>
              window.open(
                URL.createObjectURL(nominee.ExciseNomineePanImage),
                "_blank"
              )
            }
          >
            👁
          </button>

          <label className="btn-replace">
            🔄
            <input
              type="file"
              hidden
              accept=".pdf,.jpg,.jpeg"
              onChange={(e) =>
                setNominee({
                  ...nominee,
                  ExciseNomineePanImage: e.target.files?.[0] || null,
                })
              }
            />
          </label>

          <button
            type="button"
            className="btn-delete"
            onClick={() =>
              setNominee({
                ...nominee,
                ExciseNomineePanImage: null,
              })
            }
          >
            ❌
          </button>
        </div>
      </>
    )}
  </div>
</div>
        </div>
      </div>
    )}

    {/* ================= FSSAI ================= */}
    <div className="card">
      <div className="card-header">
        <h3>FSSAI Licence</h3>
      </div>

      <div className="grid-3">
        <input
          placeholder="Licence No"
          value={fssai.FSSAILicenceNo}
          onChange={(e) =>
            setFssai({ ...fssai, FSSAILicenceNo: e.target.value })
          }
        />

        <input
          type="date"
          value={fssai.FSSAILicenceStartDate}
          onChange={(e) =>
            setFssai({ ...fssai, FSSAILicenceStartDate: e.target.value })
          }
        />

        <input
          type="date"
          value={fssai.FSSAILicenceEndDate}
          onChange={(e) =>
            setFssai({ ...fssai, FSSAILicenceEndDate: e.target.value })
          }
        />
      </div>
    </div>

    {/* ================= VAT ================= */}
    <div className="card">
      <div className="card-header">
        <h3>VAT / GST</h3>
      </div>

      <div className="grid-2">
        <input
          placeholder="Certificate No"
          value={vat.VATGSTCertNo}
          onChange={(e) =>
            setVat({ ...vat, VATGSTCertNo: e.target.value })
          }
        />

        <input
          type="date"
          value={vat.VATGSTCertEnddate}
          onChange={(e) =>
            setVat({ ...vat, VATGSTCertEnddate: e.target.value })
          }
        />
      </div>
    </div>

    {/* ================= DISTILLERY ================= */}
    <div className="card">
      <div className="card-header">
        <h3>Distillery Licence</h3>
      </div>

      <div className="grid-2">
        <input
          placeholder="Licence No"
          value={distillery.DistilleryLicNo}
          onChange={(e) =>
            setDistillery({ ...distillery, DistilleryLicNo: e.target.value })
          }
        />

        <input
          type="date"
          value={distillery.DistilleryLicEnddate}
          onChange={(e) =>
            setDistillery({ ...distillery, DistilleryLicEnddate: e.target.value })
          }
        />
      </div>
    </div>

    {/* ================= BWH ================= */}
    <div className="card">
      <div className="card-header">
        <h3>BWH Details</h3>
      </div>

      <div className="grid-4">
        <input
          placeholder="Insurance No"
          value={bwh.insuranceNo}
          onChange={(e) =>
            setBwh({ ...bwh, insuranceNo: e.target.value })
          }
        />

        <input
          type="date"
          value={bwh.BWHInsuranceEndDate}
          onChange={(e) =>
            setBwh({ ...bwh, BWHInsuranceEndDate: e.target.value })
          }
        />

        <input
          placeholder="Lease No"
          value={bwh.leaseNo}
          onChange={(e) =>
            setBwh({ ...bwh, leaseNo: e.target.value })
          }
        />

        <input
          type="date"
          value={bwh.BWHRentAgreementEndDate}
          onChange={(e) =>
            setBwh({ ...bwh, BWHRentAgreementEndDate: e.target.value })
          }
        />
      </div>
    </div>

  </div>
         

</>


 )}

        {/* Step 4: PERSONAL DOCUMENT FILE MANAGEMENT */}
          


       

            {/* Step 5: SITE DOCUMENT FILE MANAGEMENT */}
            {/* {currentStep === 4 && (
                  <DocumentUpload
            documents={documents}
            uploadedFiles={uploadedFiles}
            handleDocumentFileChange={handleFileChange}
            handleDeleteFile={handleDeleteFile}
          />
            )} */}

  {/* Step 5: SITE DOCUMENT FILE MANAGEMENT */}
     {(currentStep === 4 || currentStep === 5) && (
  <DocumentUpload
    documents={documents}
    uploadedFiles={uploadedFiles}
    handleDocumentFileChange={handleFileChange}
    handleDeleteFile={handleDeleteFile}
  />
)}




            {/* Step 6: STATUTORY DECLARATIONS & UNDERTAKING */}
            {currentStep === 6 && (
              <div className="animate-fade text-left space-y-6">
                <div className="bg-red-50 text-red-950 p-4 rounded-xl border border-red-100 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    <p className="font-extrabold text-red-950 uppercase mb-1">Legal Notice & Liability under GNCTD Act</p>
                    Any false claim or misleading declaration submitted will cause instant forfeiture of safety deposits of ₹ 5,00,000, summary rejection of licenses, and booking of criminal liabilities under Delhi Excise Act 2010.
                  </div>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl space-y-4">
                  {/* Checkbox 1 */}
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox"
                      id="acceptCheck"
                      checked={formData.undertakingAccept}
                      onChange={(e) => handleInputChange("undertakingAccept", e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 border-slate-300 pointer-events-auto"
                    />
                    <label htmlFor="acceptCheck" className="text-xs text-slate-700 leading-relaxed font-semibold cursor-pointer">
                    
                    I declare the information provided above is true to the best of my knowledge and believe if any information particulars furnished in the application is subsequently found to be false, inaccurate or incomplete, the license, if any, granted on the basis of the application, will be liable to instant withdrawal without prejudice to other action then may be taken.
                    
                    
                    </label>
                  </div>
                  {formErrors.undertakingAccept && (
                    <span className="text-xs text-red-500 font-extrabold block">{formErrors.undertakingAccept}</span>
                  )}

                  {/* Pre-filled sign box */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Digital signature Name *</label>
                      <input 
                        type="text" 
                        value={formData.signatureName}
                        onChange={(e) => handleInputChange("signatureName", e.target.value)}
                        className="input-box border-slate-300"
                      />
                      {formErrors.signatureName && (
                        <span className="text-xs text-red-500 font-semibold mt-1">{formErrors.signatureName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="text-xs font-bold text-slate-600 mb-1.5 uppercase">Signing Location</label>
                      <input 
                        type="text" 
                        value={formData.signingPlace}
                        onChange={(e) => handleInputChange("signingPlace", e.target.value)}
                        className="input-box border-slate-300"
                      />
                    </div>
                  </div> */}

                </div>
              </div>
            )}

            {/* Action buttons footer for Next & Back navigation */}
            <div className={currentStep === 4 || currentStep === 5 ? "document-footer" : "flex items-center justify-between pt-6 mt-8 border-t border-slate-200"}>
              <button 
                type="button" 
                onClick={() => {
                  if (currentStep === 1) {
                    onBackToSelect();
                  } else {
                    handlePrevStep();
                  }
                }}
                className={currentStep === 4 || currentStep === 5 ? "btn-prev" : "btn btn-secondary border border-slate-200 px-6"}
              >
                {currentStep !== 4 && currentStep !== 5 && <ArrowLeft className="w-4 h-4 text-slate-600 animate-none opacity-100" />}
                <span>{currentStep === 1 ? "Exit Wizard" : "Previous Step"}</span>
              </button>

              <button 
                type="button" 
                onClick={handleNextStep}
                className={currentStep === 4 || currentStep === 5 ? "btn-next" : "btn btn-primary bg-blue-600 hover:bg-blue-700 px-8"}
              >
                <span>{currentStep === 6 ? "File Joint Application" : "Next Step"}</span>
                {currentStep !== 4 && currentStep !== 5 && <ArrowRight className="w-4 h-4 text-white animate-none opacity-100" />}
              </button>
            </div>

          </div>

          {/* Core instruction info container card at very bottom */}
          {currentStep === 4 || currentStep === 5 ? (
            <div className="guideline-card">
              <div className="guideline-title">
                <Info className="w-5 h-5" />
                <span>State Excise Desk Guidelines</span>
              </div>
              <p className="guideline-content">
                Applying jointly for L-1 Wholesale distribution and L-31 Bonded Warehouse simplifies tax and audit evaluations from Department personnel. Joint applications are typically audited in a synchronized timeline of 7 working days.
              </p>
            </div>
          ) : (
            <div className="blue-info-alert flex items-start text-left bg-blue-50 border border-blue-200 p-4 rounded-xl gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider mb-1">State Excise Desk Guidelines</h4>
                <p className="text-[11px] text-blue-700 font-semibold leading-relaxed">
                  Applying jointly for L-1 Wholesale distribution and L-31 Bonded Warehouse simplifies tax and audit evaluations from Department personnel. Joint applications are typically audited in a synchronized timeline of 7 working days.
                </p>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* High-End interactive receipt success view */
        <div className="success-card space-y-8 max-w-3xl mx-auto border border-slate-200 animate-fade">
          <div className="success-icon relative shadow-md shadow-emerald-100">
            <Check className="w-12 h-12 text-emerald-700 stroke-[3.5]" />
            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-15" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              Joint Application Submitted <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Your synchronized L-1 + L-31 joint liquor wholesale & bonded storage application bundle is successfully filed.
            </p>
          </div>

          {/* Application Detail Sheet Block */}
          <div className="border border-slate-200 rounded-2xl p-6 text-left space-y-4 bg-slate-50/50">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <span className="text-xs uppercase font-extrabold text-slate-400 font-mono">DOCKET REGISTRATION</span>
              <span className="text-xs font-black text-blue-700 font-mono">{receiptData?.applicationNo}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Applicant entity</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.companyName}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Primary Representative</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.applicantName}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">License Fee Paid (L1+L31 Combined)</p>
                <p className="text-emerald-700 font-extrabold mt-0.5">{receiptData?.totalFeePaid}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Filing Date Stamp</p>
                <p className="text-slate-850 font-bold mt-0.5">{receiptData?.dateFiled}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Bonded Depot storage parcel</p>
                <p className="text-slate-800 font-bold mt-0.5">{receiptData?.warehouseAddress} - District WEST (Circle {receiptData?.district})</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2.5 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
              <span className="status-badge bg-blue-100 text-blue-850 border border-blue-200 uppercase tracking-wider font-black text-[9px] px-2.5 py-1">
                EXCISE FLOW: SYNCHRONIZED REVIEW
              </span>
              <p className="text-[10px] text-indigo-900 leading-relaxed font-semibold">
                Your dossier has been routed to Circle officers West & Okhla audit inspectors. Physical storage inspection clearance schedule will be sent via SMS/Email shortly.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              type="button" 
              onClick={triggerMockPrint} 
              className="btn btn-secondary border border-slate-300 w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span>Print Application Copy</span>
            </button>

            <button 
              type="button" 
              onClick={onBackToSelect} 
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-8 py-3"
            >
              <FileCheck2 className="w-4 h-4 stroke-[2.5]" />
              <span>Return to Wholesale Menu</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
