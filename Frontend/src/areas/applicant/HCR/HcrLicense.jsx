import React, { useState, useEffect, useMemo } from "react";
import ApplicantDetails from "../../../components/Applicant_Details";
import DirectorsList from "../../../components/DirectorsList";
import { createApplicant } from "../../../Model/Applicant";
import { createHCRApplicant } from "../../../Model/HCRApplicant";
import { createHCRAdditional } from "../../../Model/HCRAdditional";
import DocumentUpload from "../../../components/DocumentsDetails";
import RestaurantDetails from "../../../components/RestaurantDetails";

import {
  Building,
  Utensils,
  GlassWater,
  Plane,
  Train,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  ArrowRight,
  ArrowLeft,
  Save,
  RotateCcw,
  X,
  Plus,
  Trash2,
  FileCheck,
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sliders,
  Layers,
  Activity,
  Hash,
  Barcode,
  Search,
  ShieldAlert,
  ChevronsUpDown,
  Tag as TagIcon,
} from "lucide-react";
import SelectLicenseType from "./SelectLicense";
import L20 from "./L20";
import HcrApplicantDetails from "./HcrApplicantDetail";

export default function HcrLicenseWizard({
  onBackToDashboard,
  showToast,
  rootData = {},
}) {
  const [currentStep, setCurrentStep] = useState(3);
  const [applicantForm, setApplicantForm] = useState(createApplicant());
  const [siteForm, setSiteForm] = useState(createHCRApplicant());
  const [additionalFrom, setAdditionalFrom] = useState(createHCRAdditional());
  const [applicantDistricts, setApplicantDistricts] = useState([]);
  const [RestaurantDistricts, setRestaurantDistricts] = useState([]);
  const [RestaurantSubDivisions, setWarehouseSubDivisions] = useState([]);
  const [RestaurantPoliceStations, setWarehousePoliceStations] = useState([]);
  const [RestaurantConstituencys, seRestaurantConstituencys] = useState([]);
  const [constitutionTypes, setConstitutionTypes] = useState([]);
  const [applicationId, setApplicationId] = useState(null);
  const [states, setStates] = useState([]);
  const [subDivisions, setSubDivisions] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [licenseGroups, setLicenseGroups] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  // Selected HCR license code
  const [selectedLicenseId, setSelectedLicenseId] = useState("");
  const [ownerTypes, setOwnerTypes] = useState([]);
  const [ownerType, setOwnerType] = useState("");
  const [formErrors, setFormErrors] = useState({});

  console.log("hcrlic", applicantForm);

  const [hoursOfSaleList, setHoursOfSaleList] = useState([]);
  const [applicantErrors, setApplicantErrors] = useState({});
  const [siteFormErrors, setsiteFormErrors] = useState({});
  const [additionalFormErrors, setAdditionalFormErrors] = useState({});

  // Applicant Submission validation helper
  const handleApplicantSubmit = () => {
    const errors = {};
    if (!applicantForm.applicantName.trim()) {
      errors.applicantName = "Applicant Name is required";
    }
    if (!applicantForm.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    if (!applicantForm.occupation.trim()) {
      errors.occupation = "Occupation is required";
    }
    if (!applicantForm.panNo.trim() || applicantForm.panNo.length !== 10) {
      errors.panNo = "Valid 10-digit PAN number is required";
    }
    if (!applicantForm.addressLine1.trim()) {
      errors.addressLine1 = "Address Line 1 is required";
    }
    if (!applicantForm.pin.trim() || applicantForm.pin.length !== 6) {
      errors.pin = "Valid 6-digit pin code is required";
    }
    if (!applicantForm.mobile.trim() || applicantForm.mobile.length !== 10) {
      errors.mobile = "Valid 10-digit mobile number is required";
    }
    if (!applicantForm.email.trim() || !applicantForm.email.includes("@")) {
      errors.email = "Valid email address is required";
    }

    if (Object.keys(errors).length > 0) {
      setApplicantErrors(errors);
      triggerToast(
        "Please verify required fields in primary applicant profile.",
        "error",
      );
      return false;
    }
    setApplicantErrors({});
    return true;
  };

  const handelResturantDetails = () => {
    debugger;
    const errors = {};
    if (!siteForm.SiteName.trim()) {
      errors.SiteName = "Resturant Name is required";
    }
    if (!siteForm.SiteAddress.trim()) {
      errors.SiteAddress = "Resturant state is required";
    }
    if (!siteForm.State.trim()) {
      errors.State = "Resturant state is required";
    }
    if (!siteForm.DistrictCode.trim()) {
      errors.DistrictCode = "Resturant district is required";
    }
    if (!siteForm.SubDivisionCode.trim()) {
      errors.SubDivisionCode = "Resturant subDivision is required";
    }
    if (!siteForm.PoliceStationCode.trim()) {
      errors.PoliceStationCode = "Resturant policeStation is required";
    }
    if (!siteForm.SitePin.trim()) {
      errors.SitePin = "Resturant pin is required";
    }

    if (!siteForm.SiteEmail.trim()) {
      errors.SiteEmail = "Resturant email is required";
    }
    if (!siteForm.SiteMobile.trim()) {
      errors.SiteMobile = "Resturant mobile is required";
    }

    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setsiteFormErrors(errors);
      triggerToast(
        "Please verify required fields in primary applicant profile.",
        "error",
      );
      return false;
    }
    setsiteFormErrors({});
    return true;
  };
  console.log("s1", siteForm);

  const handelAdditionalDetails = () => {
    debugger;
    const errors = {};
    if (!additionalFrom.restaurantArea.trim()) {
      errors.restaurantArea = "Resturant Name is required";
    }
    if (!additionalFrom.numberOfSeatCovers.trim()) {
      errors.numberOfSeatCovers = "Resturant state is required";
    }
    if (!additionalFrom.numberOfDispensingCounter.trim()) {
      errors.numberOfDispensingCounter = "Resturant state is required";
    }
    if (!additionalFrom.additionalArea.trim()) {
      errors.additionalArea = "Resturant district is required";
    }
    if (!additionalFrom.numberOfManagers.trim()) {
      errors.numberOfManagers = "Resturant subDivision is required";
    }
    if (!additionalFrom.numberOfKitchenStaff.trim()) {
      errors.numberOfKitchenStaff = "Resturant policeStation is required";
    }
    if (!additionalFrom.numberOfUtlityEmployees.trim()) {
      errors.numberOfUtlityEmployees = "Resturant pin is required";
    }

    if (!additionalFrom.numberOfBarAttendent.trim()) {
      errors.numberOfBarAttendent = "Resturant email is required";
    }
    if (!additionalFrom.educationalInsDist.trim()) {
      errors.educationalInsDist = "Resturant email is required";
    }
    if (!additionalFrom.religiousPlaceDist.trim()) {
      errors.religiousPlaceDist = "Resturant email is required";
    }
    //if (!additionalFrom.hourOfSale.trim()) {
    //errors.hourOfSale = "Resturant mobile is required";
    //}

    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      setAdditionalFormErrors(errors);
      triggerToast(
        "Please verify required fields in primary applicant profile.",
        "error",
      );
      return false;
    }
    setAdditionalFormErrors({});
    return true;
  };

  const handleApplicantChange = (field, value) => {
    setApplicantForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleResturantChange = (field, value) => {
    debugger;
    setSiteForm((prev) => ({ ...prev, [field]: value }));
    console.log(siteForm);

    if (field === "State") {
      fetchDistricts(value, "siteForm");
    }

    // if (field === "RestaurantState") {
    //   fetchDistricts(value, "siteForm");
    // }

    if (field === "DistrictCode") {
      fetchSubDivisions(value); // 👈 Add this
      fetchPoliceStations(value);
    }

    // if (field === "WarehouseSubDivision") {
    //   fetchPoliceStations(siteForm.RestaurantDistrict);   // 👈 Add this

    // }

    // if (field === "ConstitutionType") {
    //   console.log("Selected:", value);
    // }
  };

  const handleAdditionalFromChange = (field, value) => {
    setAdditionalFrom((prev) => ({ ...prev, [field]: value }));
  };

  // Applicant
  useEffect(() => {
    if (applicantForm.StateUT) {
      fetchDistricts(applicantForm.StateUT, "applicantForm");
    }
  }, [applicantForm.StateUT]);

  useEffect(() => {
    if (siteForm.State) {
      fetchDistricts(siteForm.State, "siteForm");
    }
  }, [siteForm.State]);

  useEffect(() => {
    if (siteForm.DistrictCode) {
      fetchPoliceStations(siteForm.DistrictCode, "siteForm");
    }
  }, [siteForm.DistrictCode]);

  const handleInputChange = (field, value) => {
    // setFormData(prev => ({
    //   ...prev,
    //   [field]: value
    // }));
    // // Clear error
    // if (formErrors[field]) {
    //   setFormErrors(prev => ({
    //     ...prev,
    //     [field]: null
    //   }));
    // }
    applicantForm[field] = value;
  };
  const handleDirectorChange = (i, f, v) => {
    debugger;
    const d = [...(additionalFrom.directors || [])];
    d[i][f] = v;
    setAdditionalFrom({ ...additionalFrom, directors: d });
  };

  const addRow = () =>
    setAdditionalFrom((p) => ({
      ...p,
      directors: [...(p.directors || []), { PName: "", PPanNo: "" }],
    }));

  const deleteRow = (i) =>
    setAdditionalFrom((p) => ({
      ...p,
      directors: p.directors.filter((_, x) => x !== i),
    }));

  const handleFileChange = (key, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [key]: {
        file,
        previewUrl: URL.createObjectURL(file),
      },
    }));
  };

  const handleDeleteFile = (key) => {
    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  useEffect(() => {
    if (currentStep !== 7 && currentStep !== 8) return;

    const applicationIdNo = localStorage.getItem("applicationId");
    if (!applicationIdNo || !selectedLicenseId) return;

    const docStatus = currentStep === 7 ? "A" : "S";

    fetch(
      `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseId}&docStatus=${docStatus}`,
    )
      .then((r) => r.json())
      .then((data) => setDocuments(data));
  }, [currentStep, selectedLicenseId]);

  const fetchConstitutionTypes = async () => {
    try {
      const res = await fetch(
        "http://localhost:5214/api/LGDiretory/ConstitutionType",
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
      `http://localhost:5214/api/LGDiretory/GetDistrict?Statecode=${stateCode}`,
    );
    console.log(siteForm);

    const data = await res.json();

    if (type === "applicantForm") {
      setApplicantDistricts(data);
    } else if (type === "siteForm") {
      setRestaurantDistricts(data);
    }
    console.log("disdata", data);
  };

  const fetchApplicantSubdivisions = async (districtCode) => {
    console.log("DistrictCode sent:", districtCode);

    const res = await fetch(
      `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`,
    );

    const data = await res.json();

    console.log("SubDivision API Response:", data);

    setSubDivisions(data);
  };

  const fetchPoliceStations = async (districtCode) => {
    try {
      debugger;
      const res = await fetch(
        `http://localhost:5214/api/LGDiretory/PoliceStations/${districtCode}`,
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
      console.log(err);
      s;
    }
  };

  const fetchSubDivisions = async (districtCode) => {
    try {
      const res = await fetch(
        `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`,
      );

      const data = await res.json();

      setWarehouseSubDivisions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadApplicantData = async (regId) => {
    try {
      debugger;
      const response = await fetch(
        `http://localhost:5214/api/LicenseeCategories/GetApplicantByRegId/${regId}`,
      );

      if (!response.ok) {
        console.log("API Error:", response.status);
        return;
      }

      const data = await response.json();
      debugger;
      console.log(data);
      console.log("Applicant State:", applicantForm);
      console.log("ownerType prop =", ownerType);
      console.log("catCode prop =", selectedLicenseId);
      console.log("SubDivision from API:", data.subDivision);
      // 👇 Pehle state ke basis par district list load karo
      await fetchDistricts(data.stateUT, "applicantForm");
      await fetchApplicantSubdivisions(data.district);

      setApplicantForm((prev) => ({
        ...prev,
        // firstName: data.firstName,
        // lastName: data.lastName,

        applicantName: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        fatherHusbandName: data.fatherHusbandName,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
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
        ownerType: ownerType, // prop se
        catCode: selectedLicenseId, // prop se
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const regId = localStorage.getItem("regId");

    if (regId) {
      loadApplicantData(regId);
    }
  }, []);

  console.log("ueff", applicantForm);

  useEffect(() => {
    console.log("Calling OwnerType API...");

    fetch("http://localhost:5214/api/LGDiretory/GetOwnerTypes")
      .then((res) => {
        console.log("Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("OwnerTypes:", data);
        setOwnerTypes(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const fetchLicenseCategories = async () => {
    debugger;
    try {
      const res = await fetch(
        "http://localhost:5214/api/LiquorMaster/GetHCRLicenseeCategory",
      );

      const data = await res.json();

      console.log(data);

      setLicenseGroups(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!applicantForm.ownerType) return;
    setOwnerType(applicantForm.ownerType);
    fetchLicenseCategories();
  }, [applicantForm.ownerType]);

  console.log("selectedLicenseId", selectedLicenseId);

  const handleNextStep = async () => {
    debugger;
    try {
      // STEP 1 SAVE
      if (currentStep === 4 && !applicationId) {
        const payload = {
          RegId: Number(localStorage.getItem("regId")),

          ApplicantName: applicantForm.applicantName,
          Dob: applicantForm.dateOfBirth,
          FatherHusbandName: applicantForm.fatherHusbandName,
          Occupation: applicantForm.occupation,
          PanNo: applicantForm.panNo,

          PresentAddress: applicantForm.addressLine1,
          PermanentAddress: applicantForm.addressLine2,

          StateUT: applicantForm.stateUT,
          District: applicantForm.district,
          subDivision: applicantForm.subDivision,
          PIN: applicantForm.pin,

          Email: applicantForm.email,
          Mobile: applicantForm.mobile,
          LandLine: applicantForm.landline ? applicantForm.landline : "",
          CinNo: applicantForm.cinNo,
          OwnerType: applicantForm.ownerType,
          CatCode: applicantForm.catCode,
        };

        console.log("payload", payload);
        const response = await fetch(
          "http://localhost:5214/api/CommonLicense/ApplyLicense",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        const data = await response.json();
        debugger;
        setApplicationId(data.applicationId);

        console.log("Generated Id:", data.applicationId);
        localStorage.setItem("applicationId", data.applicationId);
        localStorage.setItem("catCode", data.catCode);
        alert(`Your Application Reference No. is ${data.applicationId}`);
      }

      if (currentStep === 5) {
        debugger;

        const payload = {
          ...siteForm,
          Regnumber: localStorage.getItem("regId"),
          ApplicationIdNo: localStorage.getItem("applicationId"),
          FinYear: "2026-2027",
          CatCode: selectedLicenseId,
        };

        console.log("payload", payload);

        const response = await fetch(
          "http://localhost:5214/api/CommonHCR/SaveSiteDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        const data = await response.json();

        console.log("HCR License Resturant Response:", data);
      }

      if (currentStep === 6) {
        debugger;

        console.log("Directors:", additionalFrom.directors);

        try {
                  
          const formData = new FormData();

          const applicationId = localStorage.getItem("applicationId");

          Object.entries(additionalFrom).forEach(([key, value]) => {
            // Skip directors array
            if (key === "directors") return;

            const propertyName = key.charAt(0).toUpperCase() + key.slice(1);

            if (key === "additionalArea") {
              formData.append(
                `AdditionalDetails.${propertyName}`,
                value === true || value === "true" || value === "1",
              );
            } else {
              formData.append(`AdditionalDetails.${propertyName}`, value ?? "");
            }
          });

          // ApplicationId
          formData.set("AdditionalDetails.ApplicationIdNo", applicationId);

          additionalFrom.directors.forEach((partner, index) => {
            formData.append(`Partners[${index}].Id`, 0);
            formData.append(
              `Partners[${index}].ApplicationIdNo`,
              applicationId,
            );
            formData.append(`Partners[${index}].SlNo`, index + 1);

            formData.append(`Partners[${index}].PName`, partner.PName ?? "");
            formData.append(
              `Partners[${index}].PPerShare`,
              partner.PPerShare ?? "",
            );
            formData.append(`Partners[${index}].PPanNo`, partner.PPanNo ?? "");
            formData.append(
              `Partners[${index}].PExciseNominee`,
              partner.PExciseNominee ?? "",
            );
            formData.append(`Partners[${index}].DINNo`, partner.DINNo ?? "");

            formData.append(`Partners[${index}].PhotoURLPanNo`, "");

            // PAN File
            if (partner.panFile instanceof File) {
              formData.append(`Partners[${index}].PanFile`, partner.panFile);
              formData.append(
                `Partners[${index}].PanFileUploaded`,
                partner.panFile.name,
              );
            } else {
              formData.append(`Partners[${index}].PanFileUploaded`, "");
            }

            // Address File
            if (partner.addressFile instanceof File) {
              formData.append(
                `Partners[${index}].addressFile`,
                partner.addressFile,
              );
              formData.append(
                `Partners[${index}].AddressFileUploaded`,
                partner.addressFile.name,
              );
            } else {
              formData.append(`Partners[${index}].AddressFileUploaded`, "");
            }
          });


          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }


          const response = await fetch(
            "http://localhost:5214/api/CommonHCR/SaveAdditionalHCRCompleteDetails",
            {
              method: "POST",
              body: formData,
            },
          );

          const result = await response.text(); // because API returns string

          console.log(result);

          if (!response.ok) {
            throw new Error("Failed to save data.");
          }


          alert("Saved Successfully");
        } catch (error) {
          console.error(error);

          alert("Something went wrong.");
        }


        console.log("Warehouse License Response:", data);
      }

      if (currentStep === 7) {
        debugger;

        const formData = new FormData();

        formData.append(
          "ApplicationIdNo",
          localStorage.getItem("applicationId"),
        );

        formData.append("MobileNo", applicant.mobile);

        let index = 0;

        documents.forEach((doc) => {
          const uploaded = uploadedFiles[doc.docId];

          if (uploaded?.file) {
            formData.append(
              `Documents[${index}].ApplicantSl`,
              doc.applicantSl || 1,
            );

            formData.append(`Documents[${index}].DocId`, doc.docId);

            formData.append(`Documents[${index}].DocSl`, doc.docSl || 1);

            formData.append(`Documents[${index}].DocumentFile`, uploaded.file);

            index++;
          }
        });

        const response = await fetch(
          "http://localhost:5214/api/LicenseeCategories/UploadApplicationDocuments",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        console.log(data);
      }
    } catch (error) {
      console.log(error);
      alert(error);

      if (showToast) {
        showToast("Unable to save applicant data", "error");
      }
    }
  };

  // L-20 Train Details State
  const [trainForm, setTrainForm] = useState({
    exciseYear: "2025-2026",
    operatingCompany:
      "Indian Railways Catering and Tourism Corporation (IRCTC)",
    trainName: "Palace on Wheels Premium",
    trainNumber: "12953",
    tempStoreAddress:
      "Platform 1, New Delhi Railway Station Warehouse, New Delhi",
    trainOrigin: "New Delhi Railway Station (NDLS)",
    trainRoutes: ["New Delhi", "Jaipur", "Udaipur", "Jaisalmer"],
    numCompartments: "14",
    numSeatCovers: "42",
    numDispensingCounters: "2",
    numManagers: "3",
    numKitchenStaff: "8",
    numUtilityEmployees: "12",
    numTrainAttendants: "20",
  });
  const [trainErrors, setTrainErrors] = useState({});

  // Premises Details States (inside step 5 for non-L20)
  const [premisesForm, setPremisesForm] = useState({
    premiseAddress:
      "Star Class Annex Area, Indira Gandhi Int'l Airport Runway, New Delhi",
    mcdTradeLicenseNum: "MCD-99120-DEL-HCR",
    pincode: "110037",
    hasFireNoc: true,
    hasTaxCompliance: true,
    declarationsChecked: false,
  });
  const [premisesErrors, setPremisesErrors] = useState({});


  const [toast, setToast] = useState(null);
  const [successReceipt, setSuccessReceipt] = useState(null);

  // Auto clear toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Helper trigger
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Dynamic license steps computed mapping
  const currentLicenseSteps = useMemo(() => {
    const list = [
      { num: 1, id: "basic", label: "Basic Details", sub: "Done" },
      { num: 2, id: "category", label: "License Category", sub: "Done" },
      { num: 3, id: "select", label: "Select License", sub: "Active" },
      {
        num: 4,
        id: "applicant",
        label: "Applicant Details",
        sub: "Demographics",
      },
    ];

    let nextNum = 5;
    if (selectedLicenseId === "L-20") {
      list.push({
        num: nextNum++,
        id: "train",
        label: "Train Details",
        sub: "L-20 Specific",
      });
    }

    list.push({
      num: nextNum++,
      id: "brand",
      label: "Restaurant Details",
      sub: "Site Address",
    });

    if (selectedLicenseId !== "L-20") {
      list.push({
        num: nextNum++,
        id: "premises",
        label: "Additional Details",
        sub: "Additional Details",
      });
    }

    list.push({
      num: nextNum++,
      id: "documents",
      label: "Documents",
      sub: "Applicant Documents",
    });
    list.push({
      num: nextNum++,
      id: "documents",
      label: "Documents",
      sub: "Site Documents",
    });
    list.push({
      num: nextNum++,
      id: "review",
      label: "Review & Submit",
      sub: "Success Finalize",
    });

    return list;
  }, [selectedLicenseId]);

  // Train Submission validation helper
  const handleTrainSubmit = () => {
    const errors = {};
    if (!trainForm.operatingCompany.trim()) {
      errors.operatingCompany = "Operating company/board is required";
    }
    if (!trainForm.trainName.trim()) {
      errors.trainName = "Train Name is required";
    }
    if (!trainForm.trainNumber.trim()) {
      errors.trainNumber = "Train Number is required";
    }
    if (!trainForm.tempStoreAddress.trim()) {
      errors.tempStoreAddress = "Temporary store warehouse address is required";
    }
    if (!trainForm.trainOrigin.trim()) {
      errors.trainOrigin = "Originating train station is required";
    }
    if (!trainForm.trainRoutes || trainForm.trainRoutes.length === 0) {
      errors.trainRoutes = "Please specify at least one route stop/junction";
    }
    if (!trainForm.numCompartments) {
      errors.numCompartments = "Number of compartments is required";
    }
    if (!trainForm.numSeatCovers) {
      errors.numSeatCovers = "Number of dining seat covers is required";
    }
    if (!trainForm.numDispensingCounters) {
      errors.numDispensingCounters =
        "Number of dispensing counters is required";
    }

    if (Object.keys(errors).length > 0) {
      setTrainErrors(errors);
      triggerToast(
        "Please specify the statutory train route and setup fields.",
        "error",
      );
      return false;
    }
    setTrainErrors({});
    return true;
  };

  return (
    <div className="brand-registration-page select-none text-slate-800">
      {/* Toast Notifier */}
      {toast && (
        <div className={`hcr-toast hcr-toast-${toast.type}`}>
          {toast.type === "success" && (
            <CheckCircle2 className="hcr-toast-icon hcr-success-icon" />
          )}

          {toast.type === "error" && (
            <AlertCircle className="hcr-toast-icon hcr-error-icon" />
          )}

          <span className="hcr-toast-message">{toast.message}</span>

          <button onClick={() => setToast(null)} className="hcr-toast-close">
            <X className="hcr-toast-close-icon" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="hcr-container">
        {/* Dynamic Wizard Steps Indicator Row (32px vertical separation from header) */}
        {currentStep < 9 && (
          <div className="hcr-dynamic">
            <div className="hcr-stepper">
              {/* Connector dots bar */}
              <div className="hcr-step-progress">
                <div
                  className="hcr-step-progress-fill"
                  style={{
                    width: `${((currentStep - 1) / (currentLicenseSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {currentLicenseSteps.map((st) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <div key={st.id} className="hcr-step-item">
                    <div
                      className={`hcr-step-circle ${isCompleted ? "hcr-step-completed" : isActive ? "hcr-step-active" : "hcr-step-pending"}`}
                    >
                      {" "}
                      {isCompleted ? (
                        <Check className="hcr-step-check" />
                      ) : (
                        <span>{st.num}</span>
                      )}
                    </div>
                    <span
                      className={`hcr-step-label ${
                        isActive
                          ? "hcr-step-label-active"
                          : isCompleted
                            ? "hcr-step-label-completed"
                            : "hcr-step-label-pending"
                      }`}
                    >
                      {st.label}
                    </span>

                    <span className="hcr-step-subtitle">{st.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP CONTROLLER CONTENT */}
        <div className="hcr-content-area">
          {/* STEP 3: SELECT LICENSE TYPE */}
          {currentStep === 3 && (
            <div className="hcr-license-card">
              <SelectLicenseType
                applicant={applicantForm}
                onChange={handleApplicantChange}
                licenseGroups={licenseGroups}
                ownerTypes={ownerTypes}
                selectedType={selectedLicenseId}
                onSelectType={(id) => setSelectedLicenseId(id)}
                onBack={onBackToDashboard}
                onContinue={() => setCurrentStep(4)}
              />
              {}

              {/* Active select step continue helper */}
              <div className="hcr-license-footer">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary hcr-continue-btn"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="hcr-arrow-icon" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: APPLICANT DETAILS (COMMON FIRST STEP FOR ALL HCR LICENSES) */}
          {currentStep === 4 && (
            <div className="hcr-form-section">
              <div className="hcr-step-header">
                <div>
                  <h2 className="hcr-step-title font-sans">
                    Step 4: Applicant Personal & Profile Details
                  </h2>
                  <p className="hcr-step-description font-sans">
                    Verify legal, identification, demographic, and resident
                    contact coordinates for receipt-docket generation.
                  </p>
                </div>
                <div className="hcr-license-badge">
                  Licence Chosen:{" "}
                  <span className="hcr-license-badge-value">
                    {selectedLicenseId}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <HcrApplicantDetails
                  formData={applicantForm}
                  onChange={(key, val) =>
                    setApplicantForm((prev) => ({ ...prev, [key]: val }))
                  }
                  errors={applicantErrors}
                />
              </div>

              {/* Navigation for Applicant details step */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (handleApplicantSubmit()) {
                        handleNextStep();
                        setCurrentStep(5); // Go to next step (Step 5 which is Train Details for L-20, or Brand Registration for others)
                      }
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Next Step</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: LUXURY TRAIN DETAILS (L-20 LICENSE EXCLUSIVE) */}
          {currentStep === 5 && selectedLicenseId === "L-20" && (
            <div className="hcr-form-section animate-fade">
              <div className="hcr-step-header">
                <div>
                  <h2 className="hcr-step-title font-sans">
                    Step 5: L-20 Luxury Train Service Configurations
                  </h2>
                  <p className="hcr-step-description font-sans">
                    Configure operating corporation, transit routes, stops,
                    compartment maps, and staff dimensions.
                  </p>
                </div>
                <div className="hcr-license-badge">
                  Licence Chosen:{" "}
                  <span className="hcr-license-badge-value">
                    {selectedLicenseId}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <L20
                  formData={trainForm}
                  onChange={(key, val) =>
                    setTrainForm((prev) => ({ ...prev, [key]: val }))
                  }
                  errors={trainErrors}
                />
              </div>

              {/* Navigation for Train details step */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)} // Back to Applicant details
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (handleTrainSubmit()) {
                        setCurrentStep(6); // Go to Brand Registration (Step 6 for L-20)
                      }
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Restaurant Details</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC PACKAGED LIQUOR BRAND REGISTRATION / ASSOCIATION */}
          {currentStep === 5 && selectedLicenseId !== "L-20" && (
            <div className="hcr-form-section animate-fade">
              <RestaurantDetails
                siteForm={siteForm}
                states={states}
                districts={RestaurantDistricts} // ✅ correct
                subDivisions={RestaurantSubDivisions}
                policeStations={RestaurantPoliceStations}
                onChange={handleResturantChange}
              />
              {/* Active select step continue helper */}
              <div className="hcr-wizard">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)} // Back to Applicant details
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>
                <div className="hcr-nav-actions">
                  <button
                    type="button"
                    onClick={() => {
                      //if (handelResturantDetails()) {
                      handleNextStep();
                      setCurrentStep(6);
                      //}
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Restaurant Details</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PREMISE DETAILS (NON L-20 ONLY) */}
          {currentStep === 6 && selectedLicenseId !== "L-20" && (
            <div className="hcr-step-card animate-fade">
              <div className="hcr-step-card-header">
                <h3 className="hcr-step-card-title">
                  <Building className="hcr-step-card-icon" />
                  <span className="font-sans">
                    Step 6: Resturant Additional Details
                  </span>
                </h3>
                <p className="hcr-step-card-description font-sans">
                  Specify layout dimensions, local authorities compliance.
                </p>
              </div>

              <form
                onSubmit={handelResturantDetails}
                className="hcr-premises-form"
              >
                <div className="hcr-form-grid">
                  {/* Restaurant Area */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Restaurant Area (in Sq mtr.)
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Restaurant Area"
                      value={additionalFrom.restaurantArea}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow numbers with decimal
                        if (/^\d*\.?\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            restaurantArea: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* No. of Seat Covers */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      No. of Seat Covers
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="No. of Seat Covers"
                      value={additionalFrom.numberOfSeatCovers}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow numbers only
                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfSeatCovers: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* No. of Dispensing Counter */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      No. of Dispensing Counter
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="No. of Dispensing Counter"
                      value={additionalFrom.numberOfDispensingCounter}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow numbers only
                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfDispensingCounter: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* Additional Area */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Additional Area
                      <span className="required">*</span>
                    </label>

                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="additionalArea"
                          value="1"
                          checked={additionalFrom.additionalArea === "1"}
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              additionalArea: e.target.value,
                            }))
                          }
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="additionalArea"
                          value="0"
                          checked={additionalFrom.additionalArea === "0"}
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              additionalArea: e.target.value,
                            }))
                          }
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Additional Area */}
                  <div className="form-group full-width">
                    <DirectorsList
                      directors={additionalFrom.directors || []}
                      ConstitutionType={applicantForm.ConstitutionType}
                      onChange={handleDirectorChange}
                      onAdd={addRow}
                      onDelete={deleteRow}
                    />
                  </div>

                  {/* No. of Managers */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      No. of Managers
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="No. of Managers"
                      value={additionalFrom.numberOfManagers}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfManagers: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* No. of Kitchen Staff */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      No. of Kitchen Staff
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="No. of Kitchen Staff"
                      value={additionalFrom.numberOfKitchenStaff}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfKitchenStaff: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* Utility Employees */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Utility Employees
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Utility Employees"
                      value={additionalFrom.numberOfUtlityEmployees}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfUtlityEmployees: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* No. of Restaurant Attendent */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      No. of Restaurant Attendent
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="No. of Restaurant Attendent"
                      value={additionalFrom.numberOfBarAttendent}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d*$/.test(value)) {
                          setAdditionalFrom((prev) => ({
                            ...prev,
                            numberOfBarAttendent: value,
                          }));
                        }
                      }}
                      maxLength={10}
                      className="input-box"
                    />
                  </div>

                  {/* Educational Institution Distance */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Distance of Nearest Educational Institutions (Meters)
                      <span className="required">*</span>
                    </label>

                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="eduInsDistance"
                          value="Less than 100 Meters"
                          checked={
                            additionalFrom.educationalInsDist ===
                            "Less than 100 Meters"
                          }
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              educationalInsDist: e.target.value,
                            }))
                          }
                        />
                        Less than 100 Meters
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="eduInsDistance"
                          value="Above 100 Meters"
                          checked={
                            additionalFrom.educationalInsDist ===
                            "Above 100 Meters"
                          }
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              educationalInsDist: e.target.value,
                            }))
                          }
                        />
                        Above 100 Meters
                      </label>
                    </div>
                  </div>

                  {/* Religious Place Distance */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Distance of Nearest Religious Places (Meters)
                      <span className="required">*</span>
                    </label>

                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="religiousPlaceDistance"
                          value="Less than 100 Meters"
                          checked={
                            additionalFrom.religiousPlaceDist ===
                            "Less than 100 Meters"
                          }
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              religiousPlaceDist: e.target.value,
                            }))
                          }
                        />
                        Less than 100 Meters
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="religiousPlaceDistance"
                          value="Above 100 Meters"
                          checked={
                            additionalFrom.religiousPlaceDist ===
                            "Above 100 Meters"
                          }
                          onChange={(e) =>
                            setAdditionalFrom((prev) => ({
                              ...prev,
                              religiousPlaceDist: e.target.value,
                            }))
                          }
                        />
                        Above 100 Meters
                      </label>
                    </div>
                  </div>

                  {/* Hour of Sale */}
                  <div className="form-group">
                    <label className="hcr-form-label">
                      Hour of Sale
                      <span className="required">*</span>
                    </label>

                    <select
                      value={additionalFrom.hourOfSale}
                      onChange={(e) =>
                        setAdditionalFrom((prev) => ({
                          ...prev,
                          hourOfSale: e.target.value,
                        }))
                      }
                      className="input-box"
                    >
                      <option value="">Select Hour of Sale</option>

                      {hoursOfSaleList.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Back and Continue */}
                <div className="hcr-step-navigation">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="btn btn-secondary"
                  >
                    <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                    <span>Go Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      //if (handelAdditionalDetails()) {
                      handleNextStep();
                      setCurrentStep(7); // Go to next step ()
                      //}
                    }}
                    className="btn btn-primary"
                  >
                    <span>Proceed to Documents</span>
                    <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 7: DOCUMENTS & UPLOADS */}
          {currentStep === 7 && (
            <div className="hcr-license-card">
              <DocumentUpload
                documents={documents}
                uploadedFiles={uploadedFiles}
                handleDocumentFileChange={handleFileChange}
                handleDeleteFile={handleDeleteFile}
              />
              {/* Back and Continue */}
              <div className="hcr-step-navigation">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(8)}
                  className="btn btn-primary"
                >
                  <span>Proceed to Documents</span>
                  <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: DOCUMENTS & UPLOADS */}
          {currentStep === 8 && (
            <div className="hcr-license-card">
              <DocumentUpload
                documents={documents}
                uploadedFiles={uploadedFiles}
                handleDocumentFileChange={handleFileChange}
                handleDeleteFile={handleDeleteFile}
              />
              {/* Back and Continue */}
              <div className="hcr-step-navigation">
                <button
                  type="button"
                  onClick={() => setCurrentStep(7)}
                  className="btn btn-secondary"
                >
                  <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
                  <span>Go Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(9)}
                  className="btn btn-primary"
                >
                  <span>Proceed to Documents</span>
                  <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: RECEIPT SUCCESS DETAIL CARD (HIGH POLISH) */}
          {currentStep === 9 && (
            <div className="animate-fade text-left space-y-6">
              <div className="bg-red-50 text-red-950 p-4 rounded-xl border border-red-100 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold leading-relaxed">
                  <p className="font-extrabold text-red-950 uppercase mb-1">
                    Legal Notice & Liability under GNCTD Act
                  </p>
                  Any false claim or misleading declaration submitted will cause
                  instant forfeiture of safety deposits of ₹ 5,00,000, summary
                  rejection of licenses, and booking of criminal liabilities
                  under Delhi Excise Act 2010.
                </div>
              </div>

              <div className="p-5 border border-slate-200 rounded-xl space-y-4">
                {/* Checkbox 1 */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptCheck"
                    checked={applicantForm.undertakingAccept}
                    onChange={(e) =>
                      handleInputChange("undertakingAccept", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 border-slate-300 pointer-events-auto"
                  />
                  <label
                    htmlFor="acceptCheck"
                    className="text-xs text-slate-700 leading-relaxed font-semibold cursor-pointer"
                  >
                    I declare the information provided above is true to the best
                    of my knowledge and believe if any information particulars
                    furnished in the application is subsequently found to be
                    false, inaccurate or incomplete, the license, if any,
                    granted on the basis of the application, will be liable to
                    instant withdrawal without prejudice to other action then
                    may be taken.
                  </label>
                </div>
                {formErrors.undertakingAccept && (
                  <span className="text-xs text-red-500 font-extrabold block">
                    {formErrors.undertakingAccept}
                  </span>
                )}
              </div>

              {/* Success primary buttons */}
              <div className="hcr-success-actions">
                <button
                  onClick={onBackToDashboard}
                  className="hcr-btn-secondary"
                >
                  Return to Portal Home
                </button>
                <button
                  onClick={() => {
                    showToast(
                      "Excise Star Classified Docket receipt generated and saved!",
                    );
                  }}
                  className="hcr-btn-download"
                >
                  <span>
                    {currentStep === 9
                      ? "File Joint Application"
                      : "Download Docket Summary Receipt"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
