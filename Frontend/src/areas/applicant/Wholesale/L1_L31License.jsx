import React, { useEffect,useState } from "react";

import ApplicantDetails from "../../../components/Applicant_Details";
import WarehouseDetails from "../../../components/WarehouseDetails";
 import DirectorsList from "../../../components/DirectorsList";
 import DocumentUpload from "../../../components/DocumentsDetails";
import ReceiptSuccess from "../../../components/ReceiptSuccess";

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
  Sparkles,
  Building,
  FileText,
  Hash,
  FileBadge,
  ReceiptText,
  ChevronDown,
 Shield ,
  Eye,
  RefreshCw,
  Trash2,
  CheckCircle2 



 
} from "lucide-react";



export default function L1AndL31License({ ownerType,catCode,onBackToSelect, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [applicant, setApplicant] = useState(createApplicant());

const [warehouse, setWarehouse] = useState()

const [applicantDistricts, setApplicantDistricts] = useState([]);
const [warehouseDistricts, setWarehouseDistricts] = useState([]);

const [constitutionTypes, setConstitutionTypes] = useState([]);
const [warehouseSubDivisions, setWarehouseSubDivisions] = useState([]);
const [warehousePoliceStations, setWarehousePoliceStations] = useState([]);

const [applicationId, setApplicationId] = useState(null);

  const [states, setStates] = useState([]);

  const [subDivisions, setSubDivisions] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const [innerStep, setInnerStep] = useState(1);

  const [fssai, setFssai] = useState({ fssaiLicenceNo: "", fssaiLicenceStartDate: "", fssaiLicenceEndDate: "" });
  const [vat, setVat] = useState({ vatGstCertNo: "", vatGstCertEnddate: "" });
  const [distillery, setDistillery] = useState({ distilleryLicNo: "", distilleryLicEnddate: "" });
  const [bwh, setBwh] = useState({ bwhInsuranceEndDate: "", bwhRentAgreementEndDate: "",bwhInsuranceNo: "",bwhLeaseRentAgreementNo:"" });

 const [nominee, setNominee] = useState({
     isExciseNominee: "0",
    ExciseNomineeName: "",
    ExciseNomineeAddress: "",
    ExciseNomineeEmailID: "",
    ExciseNomineeMobileNo: "",
    ExciseNomineePAN: "",
    ExciseNomineePanImage:"",
  });


console.table(documents);
console.log("Applicant:", applicant);
const selectedLicense = JSON.parse(
  localStorage.getItem("selectedLicense")
);



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
  debugger;
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

if (field === "warehouseSubDivision") {
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
    debugger;
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


const fetchConstitutionTypes = async () => {
  try {
    const res = await fetch(
      "http://localhost:5214/api/LGDiretory/ConstitutionType"
    );

    const data = await res.json();

    console.log("Constitution Types:", data);

    setConstitutionTypes(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchConstitutionTypes();
}, []);





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


const fetchApplicantSubdivisions = async (districtCode) => {
  console.log("DistrictCode sent:", districtCode);

  const res = await fetch(
    `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`
  );

  const data = await res.json();

  console.log("SubDivision API Response:", data);

  setSubDivisions(data);
};


const fetchPoliceStations = async (districtCode) => {
  debugger;
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
  debugger;
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
    console.log("Applicant State:", applicant);
console.log("ownerType prop =", ownerType);
console.log("catCode prop =", catCode);
console.log("SubDivision from API:", data.subDivision);
// 👇 Pehle state ke basis par district list load karo
  await fetchDistricts(data.stateUT, "applicant");
await fetchApplicantSubdivisions(data.district);

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
    ConstitutionType: data.ConstitutionType,
    occupation: data.occupation,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    stateUT: data.stateUT,
    district: data.district,
    subDivision: String(data.subDivision).trim(),
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

// useEffect(() => {
//     const applicationId = localStorage.getItem("applicationId");

//     console.log("ApplicationId:", applicationId);

//     if (applicationId) {
//         console.log("Calling Warehouse API...");
//         loadWarehouseData(applicationId);
//     }
// }, []);

useEffect(() => {
  debugger;
  console.log("🔥 L1_L31License mounted");

  const applicationId =
    localStorage.getItem("applicationId");

  console.log(
    "📌 applicationId:",
    applicationId
  );

  if (!applicationId) {
    console.log(
      "❌ applicationId nahi mila"
    );
    return;
  }

  loadWarehouseData(applicationId);
}, []);

useEffect(() => {
  debugger;
    const applicationId = localStorage.getItem("applicationId");

    console.log("ApplicationId:", applicationId);

    if (applicationId) {
        console.log("Calling Company Details API...");
        loadCompanyDetails(applicationId);
    }
}, []);



const loadWarehouseData = async (applicationId) => {
  try {
    const response = await fetch(
      `http://localhost:5214/api/ApplicationProgress/GetWarehouseByApplicationId/${applicationId}`
    );

    if (!response.ok) return;

    const data = await response.json();
 console.log(data);
    console.log("Warehouse State:", data);


   // 2. State ke basis par District list
    await fetchDistricts(
      (data.stateCode || "").trim(),
      "warehouse"
    );

//     const subDivisionCode = String(
//   data.warehouseSubDivision || ""
// ).trim();

  //await fetchDistricts(data.stateUT, "applicant");
await fetchSubDivisions(data.warehouseDistrict);


await fetchPoliceStations(data.warehouseDistrict); 

setApplicant((prev) => ({
    ...prev,
    warehouseName: data.warehouseName,
    warehouseAddress1: data.warehouseAddress1,
    warehouseAddress2: data.warehouseAddress2,
//  warehouseState: stateCode,
//   warehouseDistrict: districtCode,

      warehouseState: (data.warehouseState || "").trim(),
  warehouseSubDivision: (data.warehouseSubDivision || "").trim(),
    // warehouseState: data.warehouseState,
     warehouseDistrict: data.warehouseDistrict,
    // warehouseSubDivision: data.warehouseSubDivision,
    warehousePin: data.warehousePin,
    warehousePoliceStation: data.warehousePoliceStation,
    warehouseMobile: data.warehouseMobile,
    warehouseEmail: data.warehouseEmail,

    leasePremise: data.leasePremise,
    leaseRegistration: data.leaseRegistration,
    leaseRegistrationDate: data.leaseRegistrationDate
        ? data.leaseRegistrationDate.split("T")[0]
        : "",

    leaseRegistrationExpiryDate: data.leaseRegistrationExpiryDate
        ? data.leaseRegistrationExpiryDate.split("T")[0]
        : "",

    architectRegistrationNo: data.architectRegistrationNo,
    architectRegistrationNoValidUpto: data.architectRegistrationNoValidUpto
        ? data.architectRegistrationNoValidUpto.split("T")[0]
        : "",

    carpetAreaofLicensePremise: data.carpetAreaofLicensePremise,
    superAreaofLicensePremise: data.superAreaofLicensePremise,
    distanceofDistilleryCP: data.distanceofDistilleryCP,
    hoursofSale: data.hoursofSale,
    licenseYear: data.licenseYear,
}));
  } catch (err) {
    console.log(err);
  }
};



// const loadWarehouseData = async (applicationId) => {
//   debugger;

//   console.log("🚀 Warehouse GET function called");
//   console.log("📌 ApplicationId:", applicationId);

//   try {
//     const url =
//       `http://localhost:5214/api/ApplicationProgress/GetWarehouseByApplicationId/${applicationId}`;

//     console.log("🌐 Warehouse GET URL:", url);

//     const response = await fetch(url);

//     console.log("📡 Warehouse API response:", response);
//     console.log("📡 Status:", response.status);
//     console.log("📡 OK:", response.ok);

//     if (!response.ok) {
//       console.error(
//         "❌ Warehouse API failed:",
//         response.status
//       );
//       return;
//     }

//     const data = await response.json();

//     console.log("✅ Warehouse GET DATA:", data);

//   } catch (error) {
//     console.error(
//       "❌ Warehouse GET ERROR:",
//       error
//     );
//   }
// };




const loadCompanyDetails = async (applicationId) => {
  debugger;

  try {
    console.log("Company API ApplicationId:", applicationId);

    const response = await fetch(
      `http://localhost:5214/api/ApplicationProgress/GetCompanyDetailsByApplicationId/${applicationId}`
    );

    console.log("Company API Status:", response.status);
    console.log("Company API OK:", response.ok);

    if (!response.ok) {
      console.log(
        "Company Details API failed:",
        response.status
      );
      return;
    }

    const data = await response.json();
debugger;
console.log("Company Details Data:", data);

// -------------------------------
// COMPANY / APPLICANT
// -------------------------------

setApplicant((prev) => ({
  ...prev,

  applicationIdNo: data.applicationIdNo || "",

  registrationNo: data.registrationNo || "",
  companyName: data.companyName || "",
  constitutionType: data.constitutionType || "",

  regDate: data.regDate
    ? data.regDate.split("T")[0]
    : "",

  companyPAN: data.companyPAN || "",
  vatno: data.vatno || "",
  cinno: data.cinno || "",

  isExciseNominee: data.isExciseNominee || "",
  exciseNomineeName: data.exciseNomineeName || "",
  exciseNomineeAddress: data.exciseNomineeAddress || "",
  exciseNomineeEmailID: data.exciseNomineeEmailID || "",
  exciseNomineeMobileNo: data.exciseNomineeMobileNo || "",
  exciseNomineePAN: data.exciseNomineePAN || "",
  exciseNomineePanImage: data.exciseNomineePanImage || "",




  bwhInsuranceEndDate: data.bwhInsuranceEndDate
    ? data.bwhInsuranceEndDate.split("T")[0]
    : "",

  bwhRentAgreementEndDate: data.bwhRentAgreementEndDate
    ? data.bwhRentAgreementEndDate.split("T")[0]
    : "",

  bwhLeaseRentAgreementNo:
    data.bwhLeaseRentAgreementNo || "",

  bwhInsuranceNo:
    data.bwhInsuranceNo || "",



 directors:
        (data.companyPartnersDetails || []).map(
          (partner) => ({
            ID:
              partner.id ?? null,

            PName:
              partner.pName || "",

            PPerShare:
              partner.pPerShare || "",

            PPanNo:
              partner.pPanNo || "",

            PExciseNominee:
              partner.pExciseNominee || "",

            DINNo:
              partner.dinNo || "",

            panFile:
              null,

            addressFile:
              null,

            PanFileUploaded:
              partner.panFileUploaded || "",

            AddressFileUploaded:
              partner.addressFileUploaded || "",




              
          })
        )






}));

// -------------------------------
// FSSAI STATE
// -------------------------------

setFssai((prev) => ({
  ...prev,

  fssaiLicenceNo:
    data.fssaiLicenceNo ?? "",

  fssaiLicenceStartDate:
    data.fssaiLicenceStartDate
      ? data.fssaiLicenceStartDate.split("T")[0]
      : "",

  fssaiLicenceEndDate:
    data.fssaiLicenceEndDate
      ? data.fssaiLicenceEndDate.split("T")[0]
      : "",
}));


console.log("Distillery API:", {
  no: data.distilleryLicNo,
  enddate: data.distilleryLicEnddate
});

setDistillery((prev) => ({
  ...prev,
  distilleryLicNo: data.distilleryLicNo || "",
  distilleryLicEnddate: data.distilleryLicEnddate
    ? data.distilleryLicEnddate.split("T")[0]
    : "",
}));



setVat((prev) => ({
  ...prev,

  vatGstCertNo: data.vatgstCertNo ?? "",

  vatGstCertEnddate: data.vatgstCertEnddate
    ? data.vatgstCertEnddate.split("T")[0]
    : ""
}));


setBwh((prev) => ({
  ...prev,

  bwhInsuranceEndDate:
    data.bwhInsuranceEndDate
      ? data.bwhInsuranceEndDate.split("T")[0]
      : "",

bwhInsuranceNo:
    data.bwhInsuranceNo ?? "",

bwhRentAgreementEndDate:
    data.bwhRentAgreementEndDate
      ? data.bwhRentAgreementEndDate.split("T")[0]
      : "",
bwhLeaseRentAgreementNo:
    data.bwhLeaseRentAgreementNo ?? ""

}));


setNominee((prev) => ({
  ...prev,

  exciseNomineeName:
    data.exciseNomineeName || "",

  exciseNomineeAddress:
    data.exciseNomineeAddress || "",

  exciseNomineeEmailID:
    data.exciseNomineeEmailID || "",

  exciseNomineeMobileNo:
    data.exciseNomineeMobileNo || "",

  exciseNomineePAN:
    data.exciseNomineePAN || "",

  exciseNomineePanImage:
    data.exciseNomineePanImage || "",




    
}));



console.log("FSSAI API No:", data.fssaiLicenceNo);

  } catch (error) {
    console.error(
      "Company Details API Error:",
      error
    );
  }
};




// const loadCompanyDetails = async (applicationId) => {
//   debugger;
//   try {
//     const response = await fetch(
//       `http://localhost:5214/api/ApplicationProgress/GetCompanyDetailsByApplicationId/${applicationId}`
//     );

//     if (!response.ok) {
//       console.log("Company Details API:", response.status);
//       return;
//     }

//     const data = await response.json();

//     console.log("Company Details GET:", data);

//     setApplicant((prev) => ({
//       ...prev,

//       applicationIdNo: data.applicationIdNo || "",

//       registrationNo: data.registrationNo || "",
//       companyName: data.companyName || "",
//       constitutionType: data.constitutionType || "",
//       regDate: data.regDate
//         ? data.regDate.split("T")[0]
//         : "",

//       companyPAN: data.companyPAN || "",
//       vatno: data.vatno || "",
//       cinno: data.cinno || "",

//       isExciseNominee: data.isExciseNominee || "",
//       exciseNomineeName: data.exciseNomineeName || "",
//       exciseNomineeAddress: data.exciseNomineeAddress || "",
//       exciseNomineeEmailID: data.exciseNomineeEmailID || "",
//       exciseNomineeMobileNo: data.exciseNomineeMobileNo || "",
//       exciseNomineePAN: data.exciseNomineePAN || "",
//       exciseNomineePanImage: data.exciseNomineePanImage || "",

//       fssaiLicenceNo: data.fssaiLicenceNo || "",
//       fssaiLicenceStartDate: data.fssaiLicenceStartDate
//         ? data.fssaiLicenceStartDate.split("T")[0]
//         : "",
//       fssaiLicenceEndDate: data.fssaiLicenceEndDate
//         ? data.fssaiLicenceEndDate.split("T")[0]
//         : "",

//       vatgstCertNo: data.vatgstCertNo || "",
//       vatgstCertEnddate: data.vatgstCertEnddate
//         ? data.vatgstCertEnddate.split("T")[0]
//         : "",

//       distilleryLicNo: data.distilleryLicNo || "",
//       distilleryLicEnddate: data.distilleryLicEnddate
//         ? data.distilleryLicEnddate.split("T")[0]
//         : "",

//       bwhInsuranceEndDate: data.bwhInsuranceEndDate
//         ? data.bwhInsuranceEndDate.split("T")[0]
//         : "",
//       bwhRentAgreementEndDate: data.bwhRentAgreementEndDate
//         ? data.bwhRentAgreementEndDate.split("T")[0]
//         : "",
//       bwhLeaseRentAgreementNo:
//         data.bwhLeaseRentAgreementNo || "",
//       bwhInsuranceNo:
//         data.bwhInsuranceNo || ""
//     }));

//   } catch (error) {
//     console.error("Company Details GET Error:", error);
//   }
// };

  
//   const loadWarehouseData = async () => {
//     debugger;
//   const applicationIdNo =
//     localStorage.getItem("applicationId");

//   console.log(
//     "Warehouse ApplicationIdNo:",
//     applicationIdNo
//   );

//   if (!applicationIdNo) {
//     console.log("ApplicationIdNo not found");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `http://localhost:5214/api/LicenseeCategories/GetWarehouseByApplicationId/${applicationIdNo}`
//     );

//     console.log(
//       "Warehouse GET status:",
//       response.status
//     );

//     if (!response.ok) {
//       console.log("Warehouse GET failed");
//       return;
//     }

//     const data = await response.json();

//     console.log(
//       "Warehouse Data:",
//       data
//     );

//     // yahan setApplicant(...)
    
//   } catch (error) {
//     console.error(
//       "Warehouse GET Error:",
//       error
//     );
//   }
// };

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



const validateStep = (step) => {
  console.log("Validating step:", step);
  return true;
};







const loadUploadedDocuments = async (applicationId) => {
  debugger;

  if (!applicationId) {
    console.log("ApplicationId missing");
    return;
  }

  try {
    console.log(
      "Loading documents for ApplicationId:",
      applicationId
    );

    const response = await fetch(
      `http://localhost:5214/api/ApplicationProgress/GetUploadedDocumentsByApplicationId/${applicationId}`
    );

    console.log(
      "Documents API Status:",
      response.status
    );

    if (!response.ok) {
      console.error(
        "Documents API failed:",
        response.status
      );
      return;
    }

    const data = await response.json();

    console.log(
      "Uploaded Documents API Response:",
      data
    );

  const existingFiles = {};

(data.documents || []).forEach((doc) => {

  existingFiles[doc.docId] = {
    existingFile: doc.docUrl,
    file: null,
    previewUrl: null,

    documentId: doc.id,
    applicationIdNo: doc.applicationIdNo,
  };

});

console.log("Existing Files:", existingFiles);

setUploadedFiles(existingFiles);

  } catch (error) {
    console.error(
      "Load Documents Error:",
      error
    );
  }
};


useEffect(() => {

  const savedApplicationId =
    localStorage.getItem("applicationId");

  console.log(
    "Saved ApplicationId:",
    savedApplicationId
  );

  if (!savedApplicationId) {
    console.log(
      "ApplicationId not available"
    );
    return;
  }

  loadUploadedDocuments(
    savedApplicationId
  );

}, []);












const formatDateForApi = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  const str = String(value).trim();

  if (!str) return null;

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.split("T")[0];
  }

  const parts = str.split("/");

  if (parts.length === 3) {
    const [day, month, year] = parts;

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return null;
};





const handleNextStep = async () => {
debugger;
console.log("handleNext called");
  if (!validateStep(currentStep)) {
    if (showToast) {
      showToast(
        "Please review marked fields before advancing.",
        "error"
      );
    }
    return;
  }
console.log("currentStep:", currentStep);
console.log("applicationId:", applicationId);
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
 PermanentAddress: applicant.addressLine2?.trim() || null,

  StateUT: applicant.stateUT,
  District: applicant.district,
  subDivision: applicant.subDivision,
  PIN: applicant.pin,

  Email: applicant.email,
  Mobile: applicant.mobile,
  // LandLine: applicant.landline,
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


// if (currentStep === 2) {
//   debugger;


// console.log(
//   "Architect Date:",
//   applicant.architectRegistrationNoValidUpto
// );

// console.log(
//   "Formatted Architect Date:",
//   formatDateForApi(
//     applicant.architectRegistrationNoValidUpto
//   )
// );

// console.log("FINAL PAYLOAD:", payload);


  
// const payload = {
//   ...applicant,

//   regId: Number(localStorage.getItem("regId")),
//   ApplicationIdNo: localStorage.getItem("applicationId"),
//   CatCode: localStorage.getItem("catCode"),

//   LeaseRegistrationDate: formatDateForApi(
//     applicant.leaseRegistrationDate
//   ),

//   LeaseRegistrationExpiryDate: formatDateForApi(
//     applicant.leaseRegistrationExpiryDate
//   ),

//   ArchitectRegistrationNoValidUpto:
//     formatDateForApi(
//       applicant.architectRegistrationNoValidUpto
//     )
// };

//   console.log("Warehouse Payload:", payload);

//   try {
//     const response = await fetch(
//       "http://localhost:5214/api/LicenseeCategories/ApplyWarehouseLicense",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       }
//     );

//     const data = await response.json();

//     console.log("Warehouse Response:", data);

//     if (!response.ok) {
//       console.error("Warehouse API Error:", data);
//       return;
//     }

//     setCurrentStep(3);

//   } catch (error) {
//     console.error("Warehouse API Error:", error);
//   }
// }


if (currentStep === 2) {
  debugger;

  const applicationId =
    localStorage.getItem("applicationId");

  console.log(
    "applicationId:",
    applicationId
  );

  const payload = {
    ...applicant,

    RegId: Number(
      localStorage.getItem("regId")
    ),

    ApplicationIdNo: applicationId,

    CatCode:
      localStorage.getItem("catCode"),

    LeaseRegistrationDate:
      formatDateForApi(
        applicant.leaseRegistrationDate
      ),

    LeaseRegistrationExpiryDate:
      formatDateForApi(
        applicant.leaseRegistrationExpiryDate
      ),

    ArchitectRegistrationNoValidUpto:
      formatDateForApi(
        applicant.architectRegistrationNoValidUpto
      ),

 SuperAreaofLicensePremise:
    applicant.superAreaofLicensePremise === ""
      ? null
      : Number(
          applicant.superAreaofLicensePremise
        ),

 CarpetAreaofLicensePremise:
    applicant.carpetAreaofLicensePremise === ""
      ? null
      : Number(
          applicant.carpetAreaofLicensePremise
        ),

  DistanceofDistilleryCP:
    applicant.distanceofDistilleryCP === ""
      ? null
      : Number(
          applicant.distanceofDistilleryCP
        ),
    WarehouseState: String(
      applicant.warehouseState || ""
    ).trim(),

    WarehouseDistrict: String(
      applicant.warehouseDistrict || ""
    ).trim(),

    WarehouseSubDivision: String(
      applicant.warehouseSubDivision || ""
    ).trim(),

    WarehousePoliceStation: String(
      applicant.warehousePoliceStation || ""
    ).trim()
  };

  console.log(
    "Architect Date:",
    applicant.architectRegistrationNoValidUpto
  );

  console.log(
    "Formatted Architect Date:",
    formatDateForApi(
      applicant.architectRegistrationNoValidUpto
    )
  );

  console.log(
  "Super Area:",
  payload.SuperAreaofLicensePremise,
  typeof payload.SuperAreaofLicensePremise
);

  console.log(
    "FINAL PAYLOAD:",
    payload
  );

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

  console.log(
    "Warehouse API Status:",
    response.status
  );

  const data = await response.json();

  console.log(
    "Warehouse API Response:",
    data
  );
}





// if (currentStep === 3) {
//   debugger;

//   console.log("Directors:", applicant.directors);

//   const formData = new FormData();



// const payload = {
//   ApplicationIdNo:
//     localStorage.getItem("applicationId"),

//   RegistrationNo:
//     applicant.registrationNo || "",

//   CompanyName:
//     applicant.companyName || "",

//   ConstitutionType:
//     applicant.constitutionType || "",

//   RegDate:
//     applicant.regDate || null,

//   CompanyPAN:
//     applicant.companyPAN || "",

//   VATNO:
//     applicant.vatno || "",

//   CINNO:
//     applicant.cinno || "",

//   IsExciseNominee:
//     applicant.isExciseNominee || "",

//   ExciseNomineeName:
//     applicant.exciseNomineeName || "",

//   ExciseNomineeAddress:
//     applicant.exciseNomineeAddress || "",

//   ExciseNomineeEmailID:
//     applicant.exciseNomineeEmailID || "",

//   ExciseNomineeMobileNo:
//     applicant.exciseNomineeMobileNo || "",

//   ExciseNomineePAN:
//     applicant.exciseNomineePAN || "",

//   FSSAILicenceNo:
//     fssai.fssaiLicenceNo || "",

//   FSSAILicenceStartDate:
//     fssai.fssaiLicenceStartDate || null,

//   FSSAILicenceEndDate:
//     fssai.fssaiLicenceEndDate || null,

//   VATGSTCertNo:
//     vat.vatGstCertNo || "",

//   VATGSTCertEnddate:
//     vat.vatGstCertEndDate || null,

//   DistilleryLicNo:
//     distillery.distilleryLicNo || "",

//   DistilleryLicEnddate:
//     distillery.distilleryLicEndDate || null,

//   BWHInsuranceEndDate:
//     bwh.bwhInsuranceEndDate || null,

//   BWHRentAgreementEndDate:
//     bwh.bwhRentAgreementEndDate || null,

//   BWHLeaseRentAgreementNo:
//     bwh.bwhLeaseRentAgreementNo || "",

//   BWHInsuranceNo:
//     bwh.bwhInsuranceNo || ""
// };







//   // Append normal fields
//   Object.keys(payload).forEach((key) => {
//     // Skip file and list
//     if (
//       key !== "ExciseNomineePanImage" &&
//       key !== "CompanyPartnersDetails"
//     ) {
//       formData.append(key, payload[key] ?? "");
//     }
//   });

//   // Append file
//   if (nominee.ExciseNomineePanImage) {
//     formData.append(
//       "ExciseNomineePanImage",
//       nominee.ExciseNomineePanImage
//     );
//   }

// applicant.directors.forEach((director, index) => {
// debugger;
//     formData.append(
//         `CompanyPartnersDetails[${index}].PName`,
//         director.PName || ""
//     );

//     formData.append(
//         `CompanyPartnersDetails[${index}].PPerShare`,
//         director.PPerShare || ""
//     );

//     formData.append(
//         `CompanyPartnersDetails[${index}].PPanNo`,
//         director.PPanNo || ""
//     );

//     formData.append(
//         `CompanyPartnersDetails[${index}].PExciseNominee`,
//         director.PExciseNominee || ""
//     );

// formData.append(
//         `CompanyPartnersDetails[${index}].DINNo`,
//         director.DINNo || ""
//     );


//     // PAN File
//     if (director.panFile) {
//         formData.append(
//             `CompanyPartnersDetails[${index}].PanFile`,
//             director.panFile
//         );
//     }
//         if (director.addressFile) {
//         formData.append(
//             `CompanyPartnersDetails[${index}].addressFile`,
//             director.addressFile
//         );
//     }
// });

//   const response = await fetch(
//     "http://localhost:5214/api/LicenseeCategories/ApplyCompanydetails",
//     {
//       method: "POST",
//       body: formData
//     }
//   );

//   const data = await response.json();

//   console.log("Warehouse License Response:", data);
// }


if (currentStep === 3) {
  debugger;

  console.log("Directors:", applicant.directors);

  const formData = new FormData();

  // ---------------------------------------
  // COMPANY + FSSAI + VAT + DISTILLERY + BWH
  // ---------------------------------------

  const payload = {
    ApplicationIdNo:
      localStorage.getItem("applicationId") || "",

    RegistrationNo:
      applicant.registrationNo || "",

    CompanyName:
      applicant.companyName || "",

    ConstitutionType:
      applicant.constitutionType || "",

    RegDate:
      applicant.regDate || "",

    CompanyPAN:
      applicant.companyPAN || "",

    VATNO:
      applicant.vatno || "",

    CINNO:
      applicant.cinno || "",

    IsExciseNominee:
      applicant.isExciseNominee || "",

    ExciseNomineeName:
      applicant.exciseNomineeName || "",

    ExciseNomineeAddress:
      applicant.exciseNomineeAddress || "",

    ExciseNomineeEmailID:
      applicant.exciseNomineeEmailID || "",

    ExciseNomineeMobileNo:
      applicant.exciseNomineeMobileNo || "",

    ExciseNomineePAN:
      applicant.exciseNomineePAN || "",

    FSSAILicenceNo:
      fssai.fssaiLicenceNo || "",

    FSSAILicenceStartDate:
      fssai.fssaiLicenceStartDate || "",

    FSSAILicenceEndDate:
      fssai.fssaiLicenceEndDate || "",

    VATGSTCertNo:
      vat.vatGstCertNo || "",

    VATGSTCertEnddate:
      vat.vatGstCertEndDate || "",

    DistilleryLicNo:
      distillery.distilleryLicNo || "",

    DistilleryLicEnddate:
      distillery.distilleryLicEnddate || "",

    BWHInsuranceEndDate:
      bwh.bwhInsuranceEndDate || "",

    BWHRentAgreementEndDate:
      bwh.bwhRentAgreementEndDate || "",

    BWHLeaseRentAgreementNo:
      bwh.bwhLeaseRentAgreementNo || "",

    BWHInsuranceNo:
      bwh.bwhInsuranceNo || "",
      ExciseNomineeName:
  nominee.exciseNomineeName || "",

ExciseNomineeAddress:
  nominee.exciseNomineeAddress || "",

ExciseNomineeEmailID:
  nominee.exciseNomineeEmailID || "",

ExciseNomineeMobileNo:
  nominee.exciseNomineeMobileNo || "",

ExciseNomineePAN:
  nominee.exciseNomineePAN || "",
  };

  console.log("FINAL PAYLOAD:", payload);

  // ---------------------------------------
  // APPEND NORMAL FIELDS
  // ---------------------------------------

  Object.keys(payload).forEach((key) => {
    formData.append(
      key,
      payload[key] ?? ""
    );
  });

  // ---------------------------------------
  // EXCISE NOMINEE PAN FILE
  // ---------------------------------------

console.log(
  "PAN FILE BEFORE POST:",
  nominee.exciseNomineePanImage
);

if (nominee?.exciseNomineePanImage) {
  formData.append(
    "ExciseNomineePanImage",
    nominee.exciseNomineePanImage
  );
}

console.log(
  "PAN FILE IN FORMDATA:",
  formData.get("ExciseNomineePanImage")
);

  // ---------------------------------------
  // DIRECTORS / PARTNERS
  // ---------------------------------------

  (applicant.directors || []).forEach(
    
  (director, index) => {

    formData.append(
      `CompanyPartnersDetails[${index}].ApplicationIdNo`,
      localStorage.getItem("applicationId") || ""
    );

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

    formData.append(
      `CompanyPartnersDetails[${index}].DINNo`,
      director.DINNo || ""
    );

    if (director.panFile) {
      formData.append(
        `CompanyPartnersDetails[${index}].PanFile`,
        director.panFile
      );
    }

    if (director.addressFile) {
      formData.append(
        `CompanyPartnersDetails[${index}].addressFile`,
        director.addressFile
      );
    }
  }
);

  // ---------------------------------------
  // DEBUG FINAL FORMDATA
  // ---------------------------------------

  console.log(
    "========== FINAL FORM DATA =========="
  );

  for (const [key, value] of formData.entries()) {

    console.log(
      key,
      value instanceof File
        ? `FILE: ${value.name}`
        : value
    );

  }

  // ---------------------------------------
  // POST
  // ---------------------------------------

  const response = await fetch(
    "http://localhost:5214/api/LicenseeCategories/ApplyCompanydetails",
    {
      method: "POST",
      body: formData
    }
  );

  console.log(
    "Company POST Status:",
    response.status
  );

  const data = await response.json();

  console.log(
    "Company POST Response:",
    data
  );
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
  console.log("🔥 ELSE HIT - calling final submission");

  handleFinalSubmission();
}

  } catch (error) {
    console.error(error);
  console.log("Status:", error.response?.status);
  console.error("Response:", error.response?.data);
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



const handleFinalSubmission = async () => {
  debugger;
  console.log("🔥 FINAL SUBMISSION HIT");

  const applicationId =
    localStorage.getItem("applicationId");

  console.log("ApplicationId:", applicationId);

  if (!applicationId) {
    alert("Application ID not found");
    return;
  }

  try {
    console.log("🚀 Calling API...");

    const response = await fetch(
      "http://localhost:5214/api/ApplicationProgress/UpdateApplicationStatus",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationIdNo: applicationId,
          applicationStatus: "S",
        }),
      }
    );

    console.log(
      "API Response Status:",
      response.status
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "❌ API Error:",
        errorText
      );

      return;
    }

    const data = await response.json();

    console.log(
      "✅ Status Updated:",
      data
    );

    // Existing receipt
    const appNo =
      `AP-L1L31-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    const receipt = {
      applicationNo: appNo,
      applicantName: formData.applicantName,
      companyName: formData.companyName,
      exciseFee: "₹ 8,50,000",
      bondGuarantee: "₹ 50,000",
      totalFeePaid: "₹ 9,00,000",
      dateFiled:
        new Date().toLocaleDateString("en-IN"),
      warehouseAddress:
        formData.warehouseAddress,
      pincode: formData.pin,
      district: formData.district,
      status: "Filing Registered",
    };

    setReceiptData(receipt);
    setSubmitSuccess(true);

    if (showToast) {
      showToast(
        "Integrated L-1 & L-31 Excise application docket registered successfully!"
      );
    }

  } catch (error) {
    console.error(
      "❌ Final Submission Error:",
      error
    );
  }
};


 

  const triggerMockPrint = () => {
    if (showToast) showToast("Printing license application dossier to connected local PDF writer...", "success");
    window.print();
  };

  return (
     
    <div className="app-registartion-page">
      
      {/* Top Banner Area with complete descriptive branding */}
      {/* <div className="w-full bg-[#1e40af] text-white py-3.5 px-6 rounded-2xl shadow-md mb-6 flex items-center justify-between">
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
      </div> */}

      {/* 6 Step Progress Wizard Bar Header */}
      {!submitSuccess && (
        <div className="appl-card-section">
          <div className="header-row">
            
            {/* Horizontal progress bar line connector */}
            <div className="app-progress-line">
              <div 
                className="app-progress-bar"
                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              />
            </div>

            {/* Steps map */}
            {steps.map((st) => {
              const isActive = currentStep === st.num;
              const isCompleted = currentStep > st.num;
              return (
                <div key={st.num} className="app-step-item">
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
                  <span className="app-step-label">{st.sub}</span>
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
             subDivisions={subDivisions} 
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

<div className="card-section">
  <h3>Company / Firm Details</h3>

  <div className="form-grid">

    {/* Company Name */}
    <div className="reg-field">
      <label className="reg-label">Company Name</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>
        <input
          type="text"
          className="reg-input"
          value={applicant.companyName || ""}
          onChange={(e) =>
            handleApplicantChange("companyName", e.target.value)
          }
        />
      </div>
    </div>

    {/* Constitution Type */}
    <div className="reg-field">
      <label className="reg-label">Constitution Type</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Building className="w-4 h-4 text-blue-600" />
        </div>

        <select
          className="reg-select"
          value={applicant.constitutionType || ""}
          onChange={(e) =>
            handleApplicantChange("constitutionType", e.target.value)
          }
        >
          <option value="">Select</option>

          {constitutionTypes.map((item) => (
            <option
              key={item.id}
              value={item.ctid}
            >
              {item.constitutionTypeName}
            </option>
          ))}
        </select>

        <div className="reg-input-icon-right">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* CIN */}
    {applicant.constitutionType === "01" && (
      <div className="reg-field">
        <label className="reg-label">CIN No.(in case of Company)</label>
        <div className="reg-input-group">
          <div className="reg-input-icon">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>

          <input
            type="text"
            className="reg-input"
            value={applicant.cinNo || ""}
            onChange={(e) =>
              handleApplicantChange("cinNo", e.target.value)
            }
          />
        </div>
      </div>
    )}

    {/* Registration No */}
    <div className="reg-field">
      <label className="reg-label">Registration No. of LLP/Firm/Society(if applicable)</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Hash className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={applicant.registrationNo || ""}
          onChange={(e) =>
            handleApplicantChange("registrationNo", e.target.value)
          }
        />
      </div>
    </div>

    {/* Registration Date */}
    <div className="reg-field">
      <label className="reg-label">Date of Registration</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={applicant.regDate || ""}
          onChange={(e) =>
            handleApplicantChange("regDate", e.target.value)
          }
        />
      </div>
    </div>

    {/* PAN */}
    <div className="reg-field">
      <label className="reg-label">Company/Firm/Society/LLP PAN No.</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <CreditCard className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={applicant.companyPAN || ""}
          onChange={(e) =>
            handleApplicantChange(
              "companyPAN",
              e.target.value.toUpperCase()
            )
          }
        />
      </div>
    </div>

    {/* VAT */}
    <div className="reg-field">
      <label className="reg-label">VAT/TIN No.</label>
      <div className="reg-input-group">
        <div className="reg-input-icon">
          <ReceiptText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={applicant.vatno || ""}
          onChange={(e) =>
            handleApplicantChange("vatno", e.target.value)
          }
        />
      </div>
    </div>

  </div>
</div>





<DirectorsList
  directors={applicant.directors || []}
  ConstitutionType={applicant.constitutionType}
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
    name="isExciseNominee"
    value="1"
    checked={nominee.isExciseNominee === "1"}
    onChange={(e) =>
      setNominee({
        ...nominee,
        isExciseNominee: e.target.value,
      })
    }
  />
  Yes
</label>

<label>
  <input
    type="radio"
    name="isExciseNominee"
    value="0"
    checked={nominee.isExciseNominee === "0"}
    onChange={(e) =>
      setNominee({
        ...nominee,
        isExciseNominee: e.target.value,
      })
    }
  />
  No
</label>
        </div>
      </div>
    </div>

    {/* ================= NOMINEE DETAILS ================= */}
    {nominee.isExciseNominee === "1" && (


  <div className="card-section">
  <h3>Nominee Details</h3>

  <div className="form-grid">

<div className="reg-field">
  <label className="reg-label">Name</label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <User className="w-4 h-4 text-blue-600" />
    </div>

    <input
      className="reg-input"
      value={nominee.exciseNomineeName}
      onChange={(e) =>
        setNominee({
          ...nominee,
          exciseNomineeName: e.target.value,
        })
      }
    />
  </div>
</div>

<div className="reg-field">
  <label className="reg-label">Address</label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <MapPin className="w-4 h-4 text-blue-600" />
    </div>

    <input
      className="reg-input"
      value={nominee.exciseNomineeAddress}
      onChange={(e) =>
        setNominee({
          ...nominee,
          exciseNomineeAddress: e.target.value,
        })
      }
    />
  </div>
</div>

<div className="reg-field">
  <label className="reg-label">Email</label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <Mail className="w-4 h-4 text-blue-600" />
    </div>

    <input
      type="email"
      className="reg-input"
      value={nominee.exciseNomineeEmailID}
      onChange={(e) =>
        setNominee({
          ...nominee,
          exciseNomineeEmailID: e.target.value,
        })
      }
    />
  </div>
</div>


<div className="reg-field">
  <label className="reg-label">Mobile</label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <Phone className="w-4 h-4 text-blue-600" />
    </div>

    <input
      className="reg-input"
      maxLength={10}
      value={nominee.exciseNomineeMobileNo}
      onChange={(e) =>
        setNominee({
          ...nominee,
          exciseNomineeMobileNo: e.target.value.replace(/\D/g, ""),
        })
      }
    />
  </div>
</div>


<div className="reg-field">
  <label className="reg-label">PAN</label>

  <div className="reg-input-group">
    <div className="reg-input-icon">
      <CreditCard className="w-4 h-4 text-blue-600" />
    </div>

    <input
      className="reg-input"
      value={nominee.exciseNomineePAN || ""}
      onChange={(e) =>
        setNominee({
          ...nominee,
          exciseNomineePAN: e.target.value.toUpperCase(),
        })
      }
    />
  </div>
</div>

<div className="reg-field">
  <label className="reg-label">PAN Proof</label>

  <div className="reg-input-group">

    <div className="reg-input-icon">
      <Upload className="w-4 h-4 text-blue-600" />
    </div>

    {!nominee.exciseNomineePanImage ? (
      <label
        className="reg-input"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#64748b",
        }}
      >
        Choose File

        <input
          type="file"
          hidden
          accept=".pdf,.jpg,.jpeg"
          onChange={(e) =>
            setNominee({
              ...nominee,
              exciseNomineePanImage: e.target.files?.[0] || null,
            })
          }
        />
      </label>
    ) : (
      <>
        <input
          className="reg-input"
          value={nominee.exciseNomineePanImage.name}
          readOnly
        />

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginLeft: "10px",
          }}
        >
          <button
            type="button"
            className="btn btn-light"
            onClick={() =>
              window.open(
                URL.createObjectURL(nominee.exciseNomineePanImage),
                "_blank"
              )
            }
          >
            <Eye size={16} />
          </button>

          <label className="btn btn-light" style={{ margin: 0 }}>
            <RefreshCw size={16} />

            <input
              type="file"
              hidden
              accept=".pdf,.jpg,.jpeg"
              onChange={(e) =>
                setNominee({
                  ...nominee,
                  exciseNomineePanImage: e.target.files?.[0] || null,
                })
              }
            />
          </label>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() =>
              setNominee({
                ...nominee,
                exciseNomineePanImage: null,
              })
            }
          >
            <Trash2 size={16} />
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
   <div className="card-section">
  <h3>FSSAI Licence</h3>

  <div className="form-grid">

    {/* Licence No */}
    <div className="reg-field">
      <label className="reg-label">Licence No./Registration No</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={fssai.fssaiLicenceNo}
          onChange={(e) =>
            setFssai({
              ...fssai,
              fssaiLicenceNo: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Start Date */}
    <div className="reg-field">
      <label className="reg-label">Licence Start Date</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={fssai.fssaiLicenceStartDate}
          onChange={(e) =>
            setFssai({
              ...fssai,
              fssaiLicenceStartDate: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* End Date */}
    <div className="reg-field">
      <label className="reg-label">Licence End Date</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={fssai.fssaiLicenceEndDate}
          onChange={(e) =>
            setFssai({
              ...fssai,
              fssaiLicenceEndDate: e.target.value,
            })
          }
        />
      </div>
    </div>

  </div>
</div>

    {/* ================= VAT ================= */}
  <div className="card-section">
  <h3>VAT / GST</h3>

  <div className="form-grid">

    {/* Certificate No */}
    <div className="reg-field">
      <label className="reg-label">Certificate No</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={vat.vatGstCertNo}
          onChange={(e) =>
            setVat({
              ...vat,
              vatGstCertNo: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Expiry Date */}
    <div className="reg-field">
      <label className="reg-label">Expiry Date</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={vat.vatGstCertEnddate}
          onChange={(e) =>
            setVat({
              ...vat,
              vatGstCertEnddate: e.target.value,
            })
          }
        />
      </div>
    </div>

  </div>
</div>

    {/* ================= DISTILLERY ================= */}
   <div className="card-section">
  <h3>Distillery Licence</h3>

  <div className="form-grid">

    {/* Licence No */}
    <div className="reg-field">
      <label className="reg-label">Licence No</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileBadge className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={distillery.distilleryLicNo || ""}
          onChange={(e) =>
            setDistillery({
              ...distillery,
              distilleryLicNo: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Expiry Date */}
    <div className="reg-field">
      <label className="reg-label">Expiry Date</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={distillery.distilleryLicEnddate}
          onChange={(e) =>
            setDistillery({
              ...distillery,
              distilleryLicEnddate: e.target.value,
            })
          }
        />
      </div>
    </div>

  </div>
</div>

    {/* ================= BWH ================= */}
  <div className="card-section">
  <h3>BWH Details</h3>

  <div className="form-grid">

    {/* Insurance No */}
    <div className="reg-field">
      <label className="reg-label">Insurance No</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Shield className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={bwh.bwhInsuranceNo}
          onChange={(e) =>
            setBwh({
              ...bwh,
              bwhInsuranceNo: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Insurance Expiry */}
    <div className="reg-field">
      <label className="reg-label">Insurance Expiry</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={bwh.bwhInsuranceEndDate}
          onChange={(e) =>
            setBwh({
              ...bwh,
              bwhInsuranceEndDate: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Lease Agreement No */}
    <div className="reg-field">
      <label className="reg-label">Lease Agreement No</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="text"
          className="reg-input"
          value={bwh.bwhLeaseRentAgreementNo}
          onChange={(e) =>
            setBwh({
              ...bwh,
              bwhLeaseRentAgreementNo: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Lease Expiry */}
    <div className="reg-field">
      <label className="reg-label">Lease Expiry</label>

      <div className="reg-input-group">
        <div className="reg-input-icon">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>

        <input
          type="date"
          className="reg-input"
          value={bwh.bwhRentAgreementEndDate}
          onChange={(e) =>
            setBwh({
              ...bwh,
              bwhRentAgreementEndDate: e.target.value,
            })
          }
        />
      </div>
    </div>

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
          {/* {currentStep === 4 || currentStep === 5 ? (
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
          )} */}

        </div>
      ) : (
        /* High-End interactive receipt success view */




<ReceiptSuccess
  applicant={applicant}
  selectedLicense={selectedLicense}
  triggerMockPrint={triggerMockPrint}
  onBackToSelect={onBackToSelect}
/>





      )}

    </div>
  );
}
