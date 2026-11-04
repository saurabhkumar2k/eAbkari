import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

import { createApplicant } from "../../../Model/Applicant";
import { createHCRApplicant } from "../../../Model/HCRApplicant";
import { createHCRAdditional } from "../../../Model/HCRAdditional";
import { createRetailPremiseDetails } from "../../../Model/RetailPremiseDetails";

// import HcrApplicantDetails from "./HcrApplicantDetail";

import HcrApplicantStep from "../HCR/HcrApplicantStep";
import HcrRestaurantStep from "../HCR/HcrRestaurantStep";
import RetailVendStep from "../Retail/RetailVendStep";
import RetailAdditionalStep from "../Retail/RetailAdditionalStep";
import HcrPersonalDocumentsStep from "../HCR/HcrPersonalDocumentsStep";
import HcrSiteDocumentsStep from "../HCR/HcrSiteDocumentsStep";
import HcrDeclarationStep from "../HCR/HcrDeclarationStep";
// import RestaurantAdditionalDetails from "../../../components/RestaurantAdditionalDetails";

import {
  validateAdditionalSiteData,
  validateSiteData,
  validateApplicantData,
  validateAdditionalPremiseData,
  validateUploadedDocuments,
} from "../HCR/HcrApplicationValidation";

import {
  validateDirectors,
  validateRestaurantDetails,
  validateClubDetails,
  Cat_Label,
  validateRetailPartnerDetails,
} from "../HCR/validation";

import ReceiptSuccessHCR from "../../../components/ReceiptSuccessHCR";

export default function RetailLicensee({
  ownerType,
  selectedLicensee,
  regId,
  onBackToDashboard,
  showToast,
}) {
  // =========================================================
  // Main Wizard
  // =========================================================

  const [currentStep, setCurrentStep] = useState(1);

  const [applicationIdNo, setApplicationId] = useState(
    localStorage.getItem("applicationIdNo"),
  );

  // =========================================================
  // Forms
  // =========================================================

  const [applicantForm, setApplicantForm] = useState(createApplicant());

  const [siteForm, setSiteForm] = useState(createHCRApplicant());

  const [additionalFrom, setAdditionalFrom] = useState(
    createRetailPremiseDetails(),
  );

  // =========================================================
  // Master Data
  // =========================================================

  const [states, setStates] = useState([]);

  const [applicantDistricts, setApplicantDistricts] = useState([]);

  const [applicantSubDivisions, setApplicantSubDivisions] = useState([]);

  const [restaurantDistricts, setRestaurantDistricts] = useState([]);

  const [retailPremiseDistricts, setRetailPremiseDistricts] = useState([]);

  const [restaurantSubDivisions, setRestaurantSubDivisions] = useState([]);

  const [retailPremiseSubDivisions, setRetailPremiseSubDivisions] = useState([]);

  const [restaurantPoliceStations, setRestaurantPoliceStations] = useState([]);

  const [retailPremisePoliceStations, setRetailPremisePoliceStations] = useState([]);

  console.log('retailPremiseDistricts',retailPremiseDistricts)
  console.log('retailPremiseSubDivisions',retailPremiseSubDivisions)
  console.log('retailPremisePoliceStations',retailPremisePoliceStations)

  const [constitutionTypes, setConstitutionTypes] = useState([]);

  const [licenseGroups, setLicenseGroups] = useState([]);

  // =========================================================
  // Questions
  // =========================================================

  const [questions, setQuestions] = useState([]);

  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  // =========================================================
  // Documents
  // =========================================================

  const [documents, setDocuments] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState({});

  // =========================================================
  // Additional
  // =========================================================

  const [hoursOfSaleList, setHoursOfSaleList] = useState([]);
  const [starCategory, setStarCategory] = useState([]);
  const [starCategoryRating, setStarCategoryRating] = useState([]);
  const [constitutionType, setConstitutionType] = useState([]);

  // =========================================================
  // Errors
  // =========================================================

  const [applicantErrors, setApplicantErrors] = useState({});

  const [siteFormErrors, setSiteFormErrors] = useState({});

  const [additionalFormErrors, setAdditionalFormErrors] = useState({});

  const [personalDocumentsErrors, setPersonalDocumentsErrors] = useState({});
  const [siteDocumentsErrors, setSiteDocumentsErrors] = useState({});
  const [declarationErrors, setDeclarationErrors] = useState({});

  const [formErrors, setFormErrors] = useState({});

  const [declarationFrom, setDeclarationFrom] = useState({
    undertakingAccept: false,
  });


  
  const handleDeclarationChange = (field, value) => {
    console.log("handleDeclarationChange field:", field, "value:", value, declarationFrom);
    setDeclarationFrom((prev) => ({
      ...prev,
      [field]: value,
    }));

    setDeclarationErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  // =========================================================
  // Success
  // =========================================================

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [receiptData, setReceiptData] = useState(null);

  // =========================================================
  // Selected license
  // =========================================================

  const selectedLicenseCode =
    typeof selectedLicensee === "string"
      ? selectedLicensee
      : selectedLicensee?.code || selectedLicensee?.licenseeCatCode || "";

  const selectedLicenseId = selectedLicenseCode;

  // =========================================================
  // Toast
  // =========================================================

  // console.log("HcrLicensee additionalFrom:", additionalFrom);

  const [toast, setToast] = useState(null);

  const triggerToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  // =========================================================
  // Save selection
  // =========================================================

  useEffect(() => {
    if (regId) {
      localStorage.setItem("regId", regId);
    }

    if (ownerType) {
      localStorage.setItem("ownerType", ownerType);
    }

    if (selectedLicenseCode) {
      localStorage.setItem("catCode", selectedLicenseCode);
    }
  }, [regId, ownerType, selectedLicenseCode]);

  // =========================================================
  // Steps
  // =========================================================

  const currentLicenseSteps = useMemo(() => {
    return (CatCode) => {
      return [
        {
          num: 1,
          id: "applicant",
          label: "Applicant Details",
          sub: "Demographics",
        },
        {
          num: 2,
          id: `${Cat_Label[CatCode]}`,
          label: `${Cat_Label[CatCode]} Details`,
          sub: "Site Address",
        },
        {
          num: 3,
          id: "additional",
          label: "Additional Details",
          sub: "Additional Information",
        },
        {
          num: 4,
          id: "personalDocuments",
          label: "Documents",
          sub: "Personal Documents",
        },
        {
          num: 5,
          id: "siteDocuments",
          label: "Documents",
          sub: "Site Documents",
        },
        {
          num: 6,
          id: "declaration",
          label: "Declaration",
          sub: "Submit",
        },
      ];
    };
  }, []);

  // =========================================================
  // Applicant
  // =========================================================

  const handleApplicantChange = (field, value) => {
    setApplicantForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setApplicantErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const validateApplicant = () => {
    debugger;
    const errors = validateApplicantData(applicantForm);

    // Update state and trigger toast notifications
    setApplicantErrors(errors);

    if (Object.keys(errors).length > 0) {
      triggerToast(
        "Please verify required fields in applicant profile.",
        "error",
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // Restaurant
  // =========================================================
  const handleRestaurantChange = (field, value) => {
    setSiteForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSiteFormErrors((prev) => ({
      ...prev,
      [field]: null,
    }));

    if (field === "State") {
      fetchDistricts(value, "siteForm");
    }

    if (field === "DistrictCode") {
      fetchSubDivisions(value, "siteForm");
      fetchPoliceStations(value, "siteForm");
    }
  };

  const validateRestaurant = () => {
    debugger;

    // Check required text & code dropdown fields using your generic check
    const errors = validateSiteData(siteForm);

    // Set the error state
    setSiteFormErrors(errors);

    // Trigger Toast alerts if fields fail validation
    if (Object.keys(errors).length > 0) {
      triggerToast("Please verify restaurant/site details.", "error");
      return false;
    }

    return true;
  };

  const handleAdditionalChange = (field, value) => {
    setAdditionalFrom((prev) => {
      const updatedData = {
        ...prev,
        [field]: value,
      };

      // Calculate Total Area when Length or Breadth changes
      if (
        field === "ProposedPremiseLength" ||
        field === "ProposedPremiseBreath"
      ) {
        const length = parseFloat(updatedData.ProposedPremiseLength) || 0;
        const breadth = parseFloat(updatedData.ProposedPremiseBreath) || 0;

        updatedData.ProposedPremiseTotalArea = (length * breadth).toString();
      }

      return updatedData;
    });

    // Clear validation error for the changed field
    setAdditionalFormErrors((prev) => ({
      ...prev,
      [field]: null,
    }));

    if (field === "State") {
      fetchDistricts(value, "additionalFrom");
    }

    if (field === "DistrictCode") {
      fetchSubDivisions(value, "additionalFrom");
      fetchPoliceStations(value, "additionalFrom");
    }
  };

  const validateAdditionalSiteDetails = () => {
    debugger;

    console.log(additionalFrom);
    const AdditionalRestaurantFrom = additionalFrom;
    AdditionalRestaurantFrom.questions = questions;
    AdditionalRestaurantFrom.questionsAnswers = questionsAnswers;
    const errors = validateAdditionalPremiseData(
      AdditionalRestaurantFrom,
      selectedLicenseCode,
    );
    console.log(errors);

    setAdditionalFormErrors(errors);

    const hasStringErrors = Object.keys(errors).some((key) => {
      if (key === "RetailPropDetails") return false; // Skip the nested object here
      return errors[key] !== ""; // Returns true if an error string is not empty
    });

    // 2. Check if the nested directors array contains any real error objects
    const hasDirectorErrors =
      Array.isArray(errors.RetailPropDetails?.errors) &&
      errors.RetailPropDetails.errors.some(
        (err) => err !== null && Object.keys(err || {}).length > 0,
      );

    // 3. Stop submission if either condition is true
    if (
      hasStringErrors ||
      hasDirectorErrors ||
      errors.RetailPropDetails?.globalError
    ) {
      triggerToast(
        "Please verify restaurant/site additional details.",
        "error",
      );
      return false;
    }

    return true;
  };

  const validateApplicationDocuments = (documents, uploadedFiles, type) => {
    const errors = validateUploadedDocuments(documents, uploadedFiles);
    console.log("validateApplicationDocuments errors:", errors);

    if (
      type === "P" &&
      ((errors && errors.isValid === false) ||
        (errors && errors.errors && Object.keys(errors.errors).length > 0))
    ) {
      setPersonalDocumentsErrors(errors);
      return false;
    }
    if (
      type === "S" &&
      ((errors && errors.isValid === false) ||
        (errors && errors.errors && Object.keys(errors.errors).length > 0))
    ) {
      setSiteDocumentsErrors(errors);
      return false;
    }
    return true;
  };

  // =========================================================
  // API - State
  // =========================================================

  useEffect(() => {
    fetch("http://localhost:5214/api/LGDiretory/getState")
      .then((res) => res.json())
      .then((data) => {
        setStates(data || []);
      })
      .catch((error) => {
        console.error("State API Error:", error);
      });
  }, []);

  // =========================================================
  // API - Constitution
  // =========================================================

  useEffect(() => {
    fetch("http://localhost:5214/api/LGDiretory/ConstitutionType")
      .then((res) => res.json())
      .then((data) => {
        setConstitutionTypes(data || []);
      })
      .catch((error) => {
        console.error("Constitution API Error:", error);
      });
  }, []);

  // =========================================================
  // District
  // =========================================================

  const fetchDistricts = async (stateCode, type) => {
    debugger;
    if (!stateCode) return;

    try {
      const response = await fetch(
        `http://localhost:5214/api/LGDiretory/GetDistrict?Statecode=${stateCode}`,
      );

      const data = await response.json();

      if (type === "applicantForm") {
        setApplicantDistricts(data || []);
      }

      if (type === "siteForm") {
        setRestaurantDistricts(data || []);
      }

      if (type === "additionalFrom") {
        setRetailPremiseDistricts(data || []);
      }

    } catch (error) {
      console.error("District API Error:", error);
    }
  };

  // =========================================================
  // Subdivision
  // =========================================================

  const fetchSubDivisions = async (districtCode, type) => {
    if (!districtCode) return;

    try {
      const response = await fetch(
        `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`,
      );

      const data = await response.json();

      if (type === "applicantForm") {
        setApplicantSubDivisions(data || []);
      }

      if (type === "siteForm") {
        setRestaurantSubDivisions(data || []);
      }

      if (type === "additionalFrom") {
        setRetailPremiseSubDivisions(data || []);
      }
    } catch (error) {
      console.error("Subdivision API Error:", error);
    }
  };

  // =========================================================
  // Police Station
  // =========================================================

  const fetchPoliceStations = async (districtCode) => {
    if (!districtCode) return;

    try {
      const response = await fetch(
        `http://localhost:5214/api/LGDiretory/PoliceStations/${districtCode}`,
      );

      if (!response.ok) {
        throw new Error("Unable to fetch police stations");
      }

      const data = await response.json();

      // if (type === "siteForm") {
      //   setRestaurantPoliceStations(data || []);
      // }

       setRestaurantPoliceStations(data || []);

      
        setRetailPremisePoliceStations(data || []);
      

    } catch (error) {
      console.error("Police Station API Error:", error);
    }
  };

  // =========================================================
  // Applicant State / District
  // =========================================================

  useEffect(() => {
    if (applicantForm.StateUT) {
      fetchDistricts(applicantForm.StateUT, "applicantForm");
    }
  }, [applicantForm.StateUT]);

  useEffect(() => {
    if (applicantForm.district) {
      fetchSubDivisions(applicantForm.district, "applicantForm");
    }
  }, [applicantForm.district]);

  // =========================================================
  // Site State / District
  // =========================================================

  useEffect(() => {
    if (siteForm.State) {
      fetchDistricts(siteForm.State, "siteForm");
    }
  }, [siteForm.State]);

  useEffect(() => {
    if (siteForm.DistrictCode) {
      fetchPoliceStations(siteForm.DistrictCode);
      fetchSubDivisions(siteForm.DistrictCode, "siteForm");
    }
  }, [siteForm.DistrictCode]);

   useEffect(() => {
    if (additionalFrom.OwnerPremiseState) {
      fetchDistricts(additionalFrom.OwnerPremiseState, "additionalFrom");
    }
  }, [additionalFrom.OwnerPremiseState]);

  useEffect(() => {
    if (additionalFrom.OwnerPremiseDistrict) {
      fetchPoliceStations(additionalFrom.OwnerPremiseDistrict);
      fetchSubDivisions(additionalFrom.OwnerPremiseDistrict, "additionalFrom");
    }
  }, [additionalFrom.OwnerPremiseDistrict]);

  // =========================================================
  // Load Applicant
  // =========================================================

  useEffect(() => {
    debugger;
    console.log("Previous application check");
    if (!regId) return;

    // Create an async helper function inside useEffect
    const checkApplicationData = async () => {
      // Await the actual true/false result of the promise
      const hasPreviousData = await loadPreviousAppData(regId);

      if (!hasPreviousData) {
        loadApplicantData(regId);
      }
    };

    checkApplicationData();
  }, [regId]);

  const loadApplicantData = async (registrationId) => {
    debugger;
    try {
      const response = await fetch(
        `http://localhost:5214/api/LicenseApplication/GetApplicantByRegId/${registrationId}`,
      );

      if (!response.ok) {
        throw new Error("Unable to load applicant");
      }

      const data = await response.json();

      if (data.tateUT) {
        await fetchDistricts(data.StateUT, "applicantForm");
      }

      setApplicantForm((prev) => ({
        ...prev,

        applicantName: `${data.firstName || ""} ${data.lastName || ""}`.trim(),

        fatherHusbandName: data.fatherHusbandName || "",

        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",

        panNo: data.panNo || "",

        ConstitutionType: data.ConstitutionType || "",

        occupation: data.occupation || "",

        addressLine1: data.addressLine1 || "",

        addressLine2: data.addressLine2 || "",

        StateUT: data.stateUT.trim() || "",

        district: data.district.trim() || "",

        subDivision: data.subDivision.trim()
          ? String(data.subDivision).trim()
          : "",

        pin: data.pin || "",

        email: data.email || "",

        mobile: data.mobile || "",

        landline: data.landline || "",

        ownerType,
        catCode: selectedLicenseCode,
      }));
    } catch (error) {
      console.error("Applicant Load Error:", error);
    }
  };

  // =========================================================
  // Load Previous Application Data if exist
  // =========================================================

  const loadPreviousAppData = async (regId) => {
    // const payload = {
    //   catCode: selectedLicenseCode,
    //   regID: regId,
    // };
    try {
      debugger;
      const getAppId = await fetch(
        `http://localhost:5214/api/CommonLicense/GetPendingApplicationIds?catCode=${selectedLicenseCode}&regID=${regId}`,
        {
          method: "GET",
        },
      );
      if (getAppId.status === 404) {
        return false;
      }

      if (!getAppId.ok) {
        return false;
      }

      const data = await getAppId.json();

      console.log("getAppId response:", data);

      const applicationIdNo = data?.data?.applicationIdNo;

      if (!data?.success || !applicationIdNo) {
        return false;
      }

      setApplicationId(applicationIdNo);

      localStorage.setItem("applicationIdNo", applicationIdNo);

      BindPendingAppData(applicationIdNo);
      return true;
    } catch (error) {
      return false;
    }
  };

  const BindPendingAppData = async (applicationIdNo) => {
    debugger;
    try {
      /*  Set Applicant Data using Application Id */
      const response = await fetch(
        `http://localhost:5214/api/CommonLicense/GetApplicantDetails/${applicationIdNo}`,
      );

      if (!response.ok) {
        throw new Error("Unable to load applicant");
      }

      const data = await response.json();

      if (data.StateUT) {
        await fetchDistricts(data.StateUT, "applicantForm");
      }

      setApplicantForm((prev) => ({
        ...prev,
        applicationIdNo: applicationIdNo,
        applicantName: `${data.applicantName || ""}`.trim(),

        fatherHusbandName: data.fatherHusbandName || "",

        dateOfBirth: data.dob ? data.dob.split("T")[0] : "",

        panNo: data.panNo || "",

        ConstitutionType: data.ConstitutionType || "",

        occupation: data.occupation || "",

        addressLine1: data.permanentAddress || "",

        addressLine2: data.presentAddress || "",

        StateUT: data.stateUT.trim() || "",

        district: data.district.trim() || "",

        subDivision: data.subDivision.trim()
          ? String(data.subDivision).trim()
          : "",

        pin: data.pin || "",

        email: data.email || "",

        mobile: data.mobile || "",

        landline: data.landline || "",

        ownerType,
        catCode: selectedLicenseCode,
      }));
    } catch (error) {}
  };

  // =========================================================
  // Questions
  // =========================================================

  useEffect(() => {
    if (currentStep !== 3) return;
    if (!selectedLicenseCode) return;

    fetchQuestions(selectedLicenseCode);
  }, [currentStep, selectedLicenseCode]);

  const fetchQuestions = async (catCode) => {
    try {
      const response = await fetch(
        `http://localhost:5214/api/CommonHCR/GetCategoryWiseQuestions?catCode=${catCode}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      const normalizedQuestions = (data || []).map((question) => ({
        ...question,
        questionId: question.questionId ?? question.QuestionId,
        questionDesc: question.questionDesc ?? question.QuestionDesc,
      }));

      setQuestions(
        normalizedQuestions.map((question) => {
          const savedAnswer = questionsAnswers.find(
            (answer) =>
              answer.questionId ===
              (question.questionId ?? question.QuestionId),
          );

          return savedAnswer
            ? {
                ...question,
                answer: savedAnswer.answerGiven,
              }
            : question;
        }),
      );
    } catch (error) {
      console.error("Question API Error:", error);
      setQuestions([]);
    }
  };

  const handleQuestions = (questionId, answer) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.questionId === questionId
          ? {
              ...question,
              answer,
            }
          : question,
      ),
    );

    setQuestionsAnswers((prev) => {
      const index = questions.findIndex(
        (question) => question.questionId === questionId,
      );

      const existing = prev.find((item) => item.questionId === questionId);

      if (existing) {
        return prev.map((item) =>
          item.questionId === questionId
            ? {
                ...item,
                applicationIdNo: applicationIdNo || "",
                answerGiven: answer,
                slNo: index + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          applicationIdNo: applicationIdNo || "",
          questionId,
          answerGiven: answer,
          slNo: index + 1,
        },
      ];
    });
  };

  const handleRestaurantDetailChange = (index, field, value) => {
    setAdditionalFrom((prev) => {
      const restaurantDetails = [...(prev.restaurantDetails || [])];

      restaurantDetails[index] = {
        ...restaurantDetails[index],
        [field]: value,
      };

      return {
        ...prev,
        restaurantDetails,
      };
    });
  };

  const addRestaurantDetail = () => {
    debugger;
    const errors = {};
    let additionalUpdateErrors = { ...additionalFormErrors };

    // 1. Run the evaluation using your custom function
    const restaurantErr = validateRestaurantDetails(
      additionalFrom.restaurantDetails,
    );
    if (restaurantErr) errors.restaurantDetails = restaurantErr;

    // 2. Check if the data structure contains items before proceeding
    const hasRestaurants =
      additionalFrom.restaurantDetails &&
      additionalFrom.restaurantDetails.length > 0;

    if (hasRestaurants) {
      additionalUpdateErrors.restaurantDetails = errors.restaurantDetails;
      setAdditionalFormErrors(additionalUpdateErrors);
      console.log(
        "HcrLicensee - addRestaurantDetail additionalFormErrors ",
        additionalFormErrors,
        additionalUpdateErrors,
      );
    }

    // Condition 1: Function evaluation fails AND the array is populated
    const isInvalidWithData =
      restaurantErr?.isValid === false && hasRestaurants;

    // Condition 2: Check if errors array contains any active validation objects (ignores null markers)
    const hasRowErrors =
      Array.isArray(restaurantErr?.errors) &&
      restaurantErr.errors.some((err) => err !== null);

    // 3. Prevent structural addition if the active items contain errors
    if (isInvalidWithData || hasRowErrors) {
      return; // Halt structural changes
    } else {
      if (additionalUpdateErrors.restaurantDetails) {
        additionalUpdateErrors.restaurantDetails.errors = []; // Flush existing error tracking array safely
        setAdditionalFormErrors(additionalUpdateErrors);
      }
    }

    // 4. Safely push the fresh entry layout block forward into the state container
    setAdditionalFrom((prev) => ({
      ...prev,
      restaurantDetails: [
        ...(prev.restaurantDetails || []),
        {
          NameOfAdditionalRestaurant: "",
          NumberOfSeatCovers: "",
          NumberOfCounter: "",
          AddtionalArea: "",
          AreaSqMtr: "",
          ForeignLiquor: "",
          HoursofSale: "",
          HoursofSaleAddtionalArea: "",
        },
      ],
    }));
  };

  const deleteRestaurantDetail = (index) => {
    setAdditionalFrom((prev) => ({
      ...prev,
      restaurantDetails: (prev.restaurantDetails || []).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const handleClubDetailChange = (index, field, value) => {
    setAdditionalFrom((prev) => {
      const RetailPropDetails = [...(prev.RetailPropDetails || [])];

      RetailPropDetails[index] = {
        ...RetailPropDetails[index],
        [field]: value,
      };

      return {
        ...prev,
        RetailPropDetails,
      };
    });
  };

  const addClubDetail = () => {
    debugger;
    const errors = {};
    let additionalUpdateErrors = { ...additionalFormErrors };

    // 1. Run the evaluation using your custom function
    const clubErr = validateRetailPartnerDetails(
      additionalFrom.RetailPropDetails,
    );
    if (clubErr) errors.RetailPropDetails = clubErr;

    // 2. Check if the data structure contains items before proceeding
    const hasClubs =
      additionalFrom.RetailPropDetails &&
      additionalFrom.RetailPropDetails.length > 0;

    if (hasClubs) {
      additionalUpdateErrors.RetailPropDetails = errors.RetailPropDetails;
      setAdditionalFormErrors(additionalUpdateErrors);
      console.log(
        "HcrLicensee - addClubDetail additionalFormErrors ",
        additionalFormErrors,
        additionalUpdateErrors,
      );
    }

    // Condition 1: Function evaluation fails AND the array is populated
    const isInvalidWithData = clubErr?.isValid === false && hasClubs;

    // Condition 2: Check if errors array contains any active validation objects (ignores null markers)
    const hasRowErrors =
      Array.isArray(clubErr?.errors) &&
      hasClubs?.errors?.some((err) => err !== null);

    // 3. Prevent structural addition if the active items contain errors
    if (isInvalidWithData || hasRowErrors) {
      return; // Halt structural changes
    } else {
      if (additionalUpdateErrors.RetailPropDetails) {
        additionalUpdateErrors.RetailPropDetails.errors = []; // Flush existing error tracking array safely
        setAdditionalFormErrors(additionalUpdateErrors);
      }
    }

    // 4. Safely push the fresh entry layout block forward into the state container
    setAdditionalFrom((prev) => ({
      ...prev,
      RetailPropDetails: [
        ...(prev.RetailPropDetails || []),
        {
          NameOfthe: "",
          Name: "",
        },
      ],
    }));
  };

  const deleteClubDetail = (index) => {
    setAdditionalFrom((prev) => ({
      ...prev,
      RetailPropDetails: (prev.RetailPropDetails || []).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  // =========================================================
  // Documents
  // =========================================================

  useEffect(() => {
    if (currentStep !== 4 && currentStep !== 5) {
      return;
    }

    const applicationIdNo = localStorage.getItem("applicationIdNo");

    if (!applicationIdNo || !selectedLicenseCode) {
      return;
    }

    const docStatus = currentStep === 4 ? "A" : "S";

    fetch(
      // `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseCode}&docStatus=${docStatus}`,
      `http://localhost:5214/api/CommonLicense/GetDocDescriptionCatWise?applicationIdNo=${applicationIdNo}&CatCode=${selectedLicenseCode}&DocType=${docStatus}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data.data || []);
      })
      .catch((error) => {
        console.error("Document API Error:", error);
        setDocuments([]);
        return [
          ...prev,
          {
            applicationIdNo: applicationIdNo || "",
            questionId,
            answerGiven: answer,
            slNo: index + 1,
          },
        ];
      });

  }, [currentStep, selectedLicensee]);

  // =========================================================
  // Directors
  // =========================================================

  const handleDirectorChange = (index, field, value) => {
    setAdditionalFrom((prev) => {
      const directors = [...(prev.directors || [])];

      directors[index] = {
        ...directors[index],
        [field]: value,
      };

      return {
        ...prev,
        directors,
      };
    });
  };

  const addDirector = () => {
    debugger;
    const errors = {};
    // const additionalUpdateErrors = additionalFormErrors // Clear the errors array if no errors are found
    let additionalUpdateErrors = { ...additionalFormErrors };

    const directorsErr = validateDirectors(additionalFrom.directors);
    if (directorsErr) errors.directors = directorsErr;

    // Check if the array exists and has at least one object
    const hasDirectors =
      Array.isArray(additionalFrom.directors) &&
      additionalFrom.directors.length > 0;

    if (hasDirectors) {
      additionalUpdateErrors.directors = errors.directors; // Clear the errors array if no errors are found
      setAdditionalFormErrors(additionalUpdateErrors);
      console.log(
        "HcrLicensee - addDirector additionalFormErrors  ",
        additionalFormErrors,
        additionalUpdateErrors,
      );
    }

    // Condition 1: Local error object says invalid AND director list is not empty
    const isInvalidWithData = directorsErr?.isValid === false && hasDirectors;

    // Condition 2: Checks if the errors array exists AND contains at least one actual error object (filters out null)
    const hasRowErrors =
      Array.isArray(directorsErr?.errors) &&
      directorsErr.errors.some((err) => err !== null);

    // Safely halts form submission using the fresh local evaluation
    if (isInvalidWithData || hasRowErrors) {
      return; // Stop form submission
    } else {
      if (additionalUpdateErrors.directors) {
        additionalUpdateErrors.directors.errors = []; // Clear the errors array if no errors are found
        setAdditionalFormErrors(additionalUpdateErrors);
      }
    }

    setAdditionalFrom((prev) => ({
      ...prev,
      directors: [
        ...(prev.directors || []),
        {
          PName: "",
          PPanNo: "",
        },
      ],
    }));
  };

  const deleteDirector = (index) => {
    setAdditionalFrom((prev) => ({
      ...prev,
      directors: (prev.directors || []).filter((_, i) => i !== index),
    }));
  };

  // =========================================================
  // Documents
  // =========================================================

  useEffect(() => {
    if (currentStep !== 4 && currentStep !== 5) {
      return;
    }

    const applicationIdNo = localStorage.getItem("applicationIdNo");

    if (!applicationIdNo || !selectedLicenseCode) {
      return;
    }

    const docStatus = currentStep === 4 ? "A" : "S";

    fetch(
      // `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseCode}&docStatus=${docStatus}`,
      `http://localhost:5214/api/CommonLicense/GetDocDescriptionCatWise?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseCode}&DocType=${docStatus}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data.data || []);
      })
      .catch((error) => {
        console.error("Document API Error:", error);
        setDocuments([]);
      });
  }, [currentStep, selectedLicensee]);

  const handleFileChange = (key, file) => {
    debugger;
    console.log("handleDocumentFileChange", key, file);
    if (!file) return;

    setUploadedFiles((prev) => ({
      ...prev,
      [key]: {
        file,
        previewUrl: URL.createObjectURL(file),
      },
    }));

    // Clear errors for this specific key inside the nested errors object
    if (currentStep === 4) {
      setPersonalDocumentsErrors((prev) => ({
        ...prev,
        errors: {
          ...prev?.errors,
          [key]: null,
        },
      }));
    }

    if (currentStep === 5) {
      setSiteDocumentsErrors((prev) => ({
        ...prev,
        errors: {
          ...prev?.errors,
          [key]: null,
        },
      }));
    }
  };

  const handleValidityDateChange = (docId, validityDate) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        validityDate,
      },
    }));

    if (currentStep === 4) {
      setPersonalDocumentsErrors((prev) => ({
        ...prev,
        errors: {
          ...prev?.errors,
          [docId]: null,
        },
      }));
    }

    if (currentStep === 5) {
      setSiteDocumentsErrors((prev) => ({
        ...prev,
        errors: {
          ...prev?.errors,
          [docId]: null,
        },
      }));
    }
  };

  const handleDeleteFile = (key) => {
    setUploadedFiles((prev) => {
      const updated = {
        ...prev,
      };

      delete updated[key];

      return updated;
    });
  };

  // =========================================================
  // STEP 4 - Save Applicant
  // =========================================================

  const saveApplicant = async () => {
    if (!validateApplicant()) {
      return false;
    }

    // if (applicationId) {
    //   return true;
    // }

    const payload = {
      regId: Number(regId),
      applicantName: applicantForm.applicantName,

      dob: applicantForm.dateOfBirth,

      applicationIdNo: applicantForm.applicationIdNo || null,

      fatherHusbandName: applicantForm.fatherHusbandName,

      occupation: applicantForm.occupation,

      panNo: applicantForm.panNo,

      presentAddress: applicantForm.addressLine1,

      permanentAddress: applicantForm.addressLine2,

      StateUT: applicantForm.StateUT,

      district: applicantForm.district,

      subDivision: applicantForm.subDivision,

      pin: applicantForm.pin,

      email: applicantForm.email,

      mobile: applicantForm.mobile,

      landLine: applicantForm.landline || "",

      ownerType: ownerType.code,

      catCode: selectedLicenseCode,

      activityId: "F",
    };

    // console.log(payload)

    try {
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

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      const applicationIdNo = data?.data?.applicationIdNo;

      setApplicationId(applicationIdNo);
      applicantForm.applicationIdNo = applicationIdNo;

      localStorage.setItem("applicationIdNo", applicationIdNo);

      // localStorage.setItem("catCode", data.catCode || selectedLicenseCode);

      return true;
    } catch (error) {
      console.error("Applicant Save Error:", error);

      triggerToast("Unable to save applicant data.", "error");

      return false;
    }
  };

  // =========================================================
  // STEP 5 - Save Restaurant
  // =========================================================

  const saveRestaurant = async () => {
    if (!validateRestaurant()) {
      return false;
    }

    const payload = {
      ...siteForm,

      Regnumber: regId,

      ApplicationIdNo: localStorage.getItem("applicationIdNo"),

      FinYear: "2026-2027",

      CatCode: selectedLicenseCode,
    };

    try {
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

      if (!response.ok) {
        throw new Error(await response.text());
      }
      console.log("SaveSiteDetails", response);

      return true;
    } catch (error) {
      console.error("Restaurant Save Error:", error);

      triggerToast("Unable to save restaurant details.", "error");

      return false;
    }
  };

  // =========================================================
  // STEP 6 - Save Additional
  // =========================================================

  const getNumericValue = (value) =>
    value === "" || value === null || value === undefined ? 0 : value;

  const saveAdditional = async () => {
    const applicationIdNo = localStorage.getItem("applicationIdNo");

    if (!validateAdditionalSiteDetails()) {
      return false;
    }

    try {
      // const formData = new FormData();

      // Additional Details
      // Object.entries(additionalFrom).forEach(([key, value]) => {
      // });

      // formData.set("AdditionalDetails.ApplicationIdNo", applicationIdNo || "");

      // Partners
      // (additionalFrom?.RetailPropDetails || []).forEach((partner, index) => {
      //   formData.append(
      //     `RetailPropDetails[${index}].ApplicationIdNo`,
      //     applicationIdNo || "",
      //   );

      //   formData.append(
      //     `RetailPropDetails[${index}].NameOfthe`,
      //     partner.NameOfthe || "",
      //   );

      //   formData.append(`RetailPropDetails[${index}].Name`, partner.Name || "");

      //   formData.append(`RetailPropDetails[${index}].slno`, 0 );
      // });

      // // Answers
      // questionsAnswers?.forEach((item, index) => {
      //   formData.append(
      //     `ApplicantAnswers[${index}].ApplicationIdNo`,
      //     applicationIdNo || "",
      //   );

      //   formData.append(
      //     `ApplicantAnswers[${index}].QuestionId`,
      //     item.questionId,
      //   );

      //   formData.append(
      //     `ApplicantAnswers[${index}].AnswerGiven`,
      //     item.answerGiven || "",
      //   );

      //   formData.append(`ApplicantAnswers[${index}].SlNo`, String(index + 1));
      // });

      // // additionalFrom?.RetailDetails?.forEach((item, index) => {
      // formData.append(`RetailDetails.ApplicationIdNo`, applicationIdNo ?? "");

      // formData.append(
      //   `RetailDetails.OwnerPremiseAddress1`,
      //   additionalFrom?.OwnerPremiseAddress1 ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremiseAddress2`,
      //   additionalFrom?.OwnerPremiseAddress2 ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremiseState`,
      //   additionalFrom?.OwnerPremiseState ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremiseDistrict`,
      //   additionalFrom?.OwnerPremiseDistrict ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremiseSubDivisionCode`,
      //   additionalFrom?.OwnerPremiseSubDivisionCode ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremisePSCode`,
      //   additionalFrom?.OwnerPremisePSCode ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremisePin`,
      //   additionalFrom?.OwnerPremisePin ?? "",
      // );

      // formData.append(
      //   `RetailDetails.OwnerPremiseMobile`,
      //   additionalFrom?.OwnerPremiseMobile ?? "",
      // );

      // formData.append(
      //   `RetailDetails.ProposedPremiseLength`,
      //   additionalFrom?.ProposedPremiseLength ?? "",
      // );

      // formData.append(
      //   `RetailDetails.ProposedPremiseBreath`,
      //   additionalFrom?.ProposedPremiseBreath ?? "",
      // );

      // formData.append(
      //   `RetailDetails.ProposedPremiseHeight`,
      //   additionalFrom?.ProposedPremiseHeight ?? "",
      // );

      // formData.append(
      //   `RetailDetails.ProposedPremiseTotalArea`,
      //   additionalFrom?.ProposedPremiseTotalArea ?? "",
      // );

      // formData.append(
      //   `RetailDetails[${index}].slNo`,
      //   item.slNo ?? index + 1,
      // );
      // });

      // console.log(formData);

      // console.log("========== FormData Values ==========");

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, ":", value);
      // }

      // console.log("====================================");

      // Create FormData
      const formData = new FormData();

      // ======================================================
      // 1. RetailPropDetails
      // ======================================================

      (additionalFrom?.RetailPropDetails || []).forEach((partner, index) => {
        formData.append(
          `RetailPropDetails[${index}].ApplicationIdNo`,
          String(applicationIdNo ?? ""),
        );

        formData.append(`RetailPropDetails[${index}].Name`, partner.Name ?? "");

        // React NameOfthe dropdown maps to backend AddtionalDesigTypeValue
        formData.append(
          `RetailPropDetails[${index}].AddtionalDesigTypeValue`,
          String(partner.NameOfthe ?? ""),
        );

        formData.append(`RetailPropDetails[${index}].SlNo`, String(index + 1));
      });

      // ======================================================
      // 2. ApplicantAnswers
      // ======================================================

      (questionsAnswers || []).forEach((item, index) => {
        formData.append(
          `ApplicantAnswers[${index}].ApplicationIdNo`,
          String(applicationIdNo ?? ""),
        );

        formData.append(
          `ApplicantAnswers[${index}].QuestionId`,
          String(item.questionId ?? ""),
        );

        formData.append(
          `ApplicantAnswers[${index}].AnswerGiven`,
          item.answerGiven ?? "",
        );

        formData.append(`ApplicantAnswers[${index}].SlNo`, String(index + 1));
      });

      // ======================================================
      // 3. RetailDetails
      // ======================================================

      // RetailDetails is a single object
      const retail = additionalFrom || {};

      // Application ID
      formData.append(
        "RetailDetails.ApplicationIdNo",
        String(applicationIdNo ?? ""),
      );

      // Proposed Premise Details
      formData.append(
        "RetailDetails.ProposedPremiseType",
        String(getNumericValue(retail.ProposedPremiseType)),
      );

      formData.append(
        "RetailDetails.ProposedPremiseLength",
        String(retail.ProposedPremiseLength ?? 0),
      );

      formData.append(
        "RetailDetails.ProposedPremiseBreath",
        String(retail.ProposedPremiseBreath ?? 0),
      );

      formData.append(
        "RetailDetails.ProposedPremiseHeight",
        String(retail.ProposedPremiseHeight ?? 0),
      );

      formData.append(
        "RetailDetails.ProposedPremiseTotalArea",
        String(retail.ProposedPremiseTotalArea ?? 0),
      );

      // Commercial Area
      formData.append(
        "RetailDetails.PropPremiseAppComArea",
        String(getNumericValue(retail.PropPremiseAppComArea)),
      );

      formData.append(
        "RetailDetails.PropPremiseAppComAreaAdInfo",
        retail.PropPremiseAppComAreaAdInfo ?? "",
      );

      // Landlord Physical Possession
      formData.append(
        "RetailDetails.LandLordPhyPossession",
        String(getNumericValue(retail.LandLordPhyPossession)),
      );

      // Premise Condition
      formData.append(
        "RetailDetails.PropPremiseCondition",
        String(getNumericValue(retail.PropPremiseCondition)),
      );

      // Local Body
      formData.append(
        "RetailDetails.PropPremiseLocalBody",
        String(getNumericValue(retail.PropPremiseLocalBody)),
      );

      // Liquor Licence Rule
      formData.append(
        "RetailDetails.PropPremiseLiquorLicenceRule",
        String(getNumericValue(retail.PropPremiseLiquorLicenceRule)),
      );

      // Pucca Building
      formData.append(
        "RetailDetails.PropPremisePuccaBuild",
        String(getNumericValue(retail.PropPremisePuccaBuild ?? 0)),
      );

      formData.append(
        "RetailDetails.PropPremisePuccaBuildAdInfo",
        retail.PropPremisePuccaBuildAdInfo ?? "",
      );

      // Present Use
      formData.append(
        "RetailDetails.PropPremisePresentUse",
        String(getNumericValue(retail.PropPremisePresentUse ?? 0)),
      );

      formData.append(
        "RetailDetails.PropPremisePresentUseAdInfo",
        retail.PropPremisePresentUseAdInfo ?? "",
      );

      // Suit Pending
      formData.append(
        "RetailDetails.PropPremiseSuitPending",
        String(getNumericValue(retail.PropPremiseSuitPending ?? 0)),
      );

      // Water Connection
      formData.append(
        "RetailDetails.PropPremiseWaterConn",
        String(getNumericValue(retail.PropPremiseWaterConn ?? 0)),
      );

      // Joint Property
      formData.append(
        "RetailDetails.PropPremiseJoint",
        String(getNumericValue(retail.PropPremiseJoint ?? 0)),
      );

      // NOC
      formData.append(
        "RetailDetails.PropPremiseNOC",
        String(getNumericValue(retail.PropPremiseNOC ?? 0)),
      );

      // Shop Map
      formData.append(
        "RetailDetails.PropPremiseShopMap",
        String(getNumericValue(retail.PropPremiseShopMap ?? 0)),
      );

      // ======================================================
      // 4. Owner Premise Address Details
      // ======================================================

      formData.append(
        "RetailDetails.OwnerPremiseAddress1",
        retail.OwnerPremiseAddress1 ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremiseAddress2",
        retail.OwnerPremiseAddress2 ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremiseState",
        retail.OwnerPremiseState ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremiseDistrict",
        retail.OwnerPremiseDistrict ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremisePin",
        retail.OwnerPremisePin ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremiseMobile",
        retail.OwnerPremiseMobile ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremiseSubDivisionCode",
        retail.OwnerPremiseSubDivisionCode ?? "",
      );

      formData.append(
        "RetailDetails.OwnerPremisePSCode",
        retail.OwnerPremisePSCode ?? "",
      );

      // ======================================================
      // 5. Print FormData
      // ======================================================

      console.log("========== FormData ==========");

      console.table(
        Array.from(formData.entries()).map(([key, value]) => ({
          Field: key,
          Value: value,
        })),
      );

      console.log("==============================");

      const response = await fetch(
        "http://localhost:5214/api/CommonRetail/SaveAdditionalRetailCompleteDetails",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return true;
    } catch (error) {
      console.error("Additional Save Error:", error);

      triggerToast("Unable to save additional details.", "error");

      return false;
    }
  };

  // =========================================================
  // STEP 7/8 - Upload Documents
  // =========================================================

  const uploadDocuments = async () => {
    try {
      debugger;
      console.log("uploadDocuments", uploadDocuments);
      const filesToUpload = documents.filter(
        (doc) => uploadedFiles[doc.docID]?.file,
      );

      if (filesToUpload.length === 0) {
        return true;
      }

      const formData = new FormData();

      formData.append(
        "ApplicationIdNo",
        localStorage.getItem("applicationIdNo") || "",
      );

      formData.append("MobileNo", applicantForm.mobile || "");

      let index = 0;

      filesToUpload.forEach((doc) => {
        const uploaded = uploadedFiles[doc.docID];

        if (!uploaded?.file) return;

        formData.append(`Documents[${index}].DocId`, doc.docID);
        formData.append(`Documents[${index}].DocSl`, String(doc.docSl || 1));
        formData.append(`Documents[${index}].IsValid`, doc.isValid ? "Y" : "N");

        formData.append(
          `Documents[${index}].DateOfValidity`,
          uploaded.validityDate || "",
        );

        formData.append(`Documents[${index}].DocumentFile`, uploaded.file);

        index++;
      });

      const response = await fetch(
        "http://localhost:5214/api/CommonLicense/SaveAndUpdateApplicantDocuments",
        {
          method: "POST",
          body: formData,
        },
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return true;
    } catch (error) {
      console.error("Document Upload Error:", error);

      triggerToast(
        "Unable to upload documents. Continuing to next step.",
        "error",
      );

      return false;
    }
  };

  // =========================================================
  // FINAL SUBMISSION
  // =========================================================

  const submitApplication = async () => {
    try {
      const finalSubmission = {
        ApplicationIdNo:
          applicationIdNo || localStorage.getItem("applicationIdNo"),

        ApplicationStatus: "02",
      };

      const response = await fetch(
        "http://localhost:5214/api/CommonLicense/SubmitApplication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalSubmission),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const appNo = applicationIdNo || localStorage.getItem("applicationIdNo");

      setReceiptData({
        applicationNo: appNo,
        applicantName: applicantForm.applicantName,
        SiteName: siteForm.SiteName,
        SiteEmail: siteForm.SiteEmail,
        SiteMobile: siteForm.SiteMobile,
        dateFiled: new Date().toLocaleDateString("en-IN"),
        status: "Filing Registered",
      });

      setSubmitSuccess(true);

      if (showToast) {
        showToast("HCR Excise application submitted successfully!");
      }

      return true;
    } catch (error) {
      console.error("Final Submission Error:", error);

      triggerToast("Unable to submit application.", "error");

      return false;
    }
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  // const goToSiteDocuments = async () => {
  //   await uploadDocuments();
  //   setCurrentStep(5);
  // };

  // const goToDeclaration = async () => {
  //   await uploadDocuments();
  //   setCurrentStep(6);
  // };

  const goToSiteDocuments = async () => {
    if (!validateApplicationDocuments(documents, uploadedFiles, "P")) {
      return false;
    }
    const result = await uploadDocuments();
    return result;
  };

  const goToDeclaration = async () => {
    if (!validateApplicationDocuments(documents, uploadedFiles, "S")) {
      return false;
    }
    const result = await uploadDocuments();
    return result;
  };

  const handleNext = async () => {
    debugger;
    if (currentStep === 1) {
      const success = await saveApplicant();

      if (success) {
        setCurrentStep(2);
        // setCurrentStep(6);
      }

      return;
    }

    if (currentStep === 2) {
      const success = await saveRestaurant();

      if (success) {
        setCurrentStep(3);
      }

      return;
    }

    if (currentStep === 3) {
      const success = await saveAdditional();

      if (success) {
        setCurrentStep(4);
      }

      return;
    }

    // if (currentStep === 4) {
    //   await goToSiteDocuments();
    //   return;
    // }

    // if (currentStep === 5) {
    //   await goToDeclaration();
    //   return;
    // }

    // if (currentStep === 6) {
    //   await submitApplication();
    // }

    if (currentStep === 4) {
      debugger;
      const success = await goToSiteDocuments();
      // console.log("goToSiteDocuments success", success);

      if (success) {
        setCurrentStep(5);
      }
      return;
    }

    if (currentStep === 5) {
      const success = await goToDeclaration();

      if (success) {
        setCurrentStep(6);
      }
      return;
    }

    if (currentStep === 6) {
      console.log("Submitting application...", declarationFrom);
      if (!declarationFrom.undertakingAccept) {
        setDeclarationErrors({
          undertakingAccept: "You must accept the undertaking to proceed.",
        });
        return;
      }
      const success = await submitApplication();
      if (success) {
        setSubmitSuccess(true);
      }
      return;
    }
  };

  // =========================================================
  // PRINT
  // =========================================================

  const triggerMockPrint = () => {
    window.print();
  };

  // const testAdditionalFrom = additionalFrom;

  // console.log("HcrLicensee:", testAdditionalFrom);

  // console.log("HCR TEST DATA:", testAdditionalFrom);
  // console.log("COMPONENT:", RestaurantAdditionalDetails);
  // console.log("HcrApplicantStep - currentStep  ", currentStep)

  // =========================================================
  // RENDER
  // =========================================================

  if (submitSuccess) {
    return (
      <ReceiptSuccessHCR
        applicant={applicantForm}
        siteForm={siteForm}
        selectedLicenseCatDesc={selectedLicensee.licenseeCatDesc}
        triggerMockPrint={triggerMockPrint}
        onBackToSelect={onBackToDashboard}
      />
    );
  }

  return (
    <div className="brand-registration-page select-none text-slate-800">
      {/* =====================================================
          HEADER / STEPPER
      ====================================================== */}

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 mb-6 overflow-x-auto step-div-p">
        <div className="flex items-center justify-between min-w-[768px] relative px-2 sm:px-4">
          <div className="absolute top-[22px] left-8 right-8 h-[3px] bg-slate-100">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentStep - 1) / (currentLicenseSteps.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          {currentLicenseSteps(selectedLicenseCode).map((step) => {
            const isActive = currentStep === step.num;

            const isCompleted = currentStep > step.num;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center flex-1 relative z-10"
              >
                <div
                  className={`
                      w-11 h-11 rounded-full
                      flex items-center justify-center
                      font-black text-sm border-2
                      ${
                        isCompleted
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : isActive
                            ? "bg-blue-600 border-blue-600 text-white scale-110"
                            : "bg-white border-slate-200 text-slate-400"
                      }
                    `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </div>

                <span
                  className={`
                      text-[11px] font-extrabold mt-2
                      ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                            ? "text-emerald-700"
                            : "text-slate-500"
                      }
                    `}
                >
                  {step.label}
                </span>

                <span className="text-[10px] text-slate-400 font-semibold">
                  {step.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          CURRENT STEP
      ====================================================== */}

      <div className="hcr-content-area">
        {/* STEP 4 */}
        {currentStep === 1 && (
          <HcrApplicantStep
            applicantForm={applicantForm}
            states={states}
            districts={applicantDistricts}
            subDivisions={applicantSubDivisions}
            onChange={handleApplicantChange}
            errors={applicantErrors}
            ownerType={ownerType}
            selectedLicensee={selectedLicensee}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            maxStep={6}
            onContinue={handleNext}
            onBack={onBackToDashboard}
          />
        )}

        {/* STEP 5 */}
        {currentStep === 2 && (
          <RetailVendStep
            siteForm={siteForm}
            states={states}
            districts={restaurantDistricts}
            subDivisions={restaurantSubDivisions}
            policeStations={restaurantPoliceStations}
            errors={siteFormErrors}
            onChange={handleRestaurantChange}
            onBack={() => setCurrentStep(1)}
            CatCode={selectedLicenseCode}
            onContinue={handleNext}
          />
        )}

        {/* STEP 6 */}
        {currentStep === 3 && (
          <RetailAdditionalStep
            additionalFrom={additionalFrom}
            hoursOfSaleList={hoursOfSaleList}
            constitutionType={applicantForm?.ConstitutionType}
            questions={questions}
            onChange={handleAdditionalChange}
            onQuestionsChange={handleQuestions}
            onDirectorChange={handleDirectorChange}
            onAddDirector={addDirector}
            onDeleteDirector={deleteDirector}
            errors={additionalFormErrors}
            onBack={() => setCurrentStep(2)}
            onContinue={handleNext}
            CatCode={selectedLicenseCode}
            starCategory={starCategory}
            starCategoryRating={starCategoryRating}
            ConstitutionType={constitutionType}
            onRestaurantDetailChange={handleRestaurantDetailChange}
            onAddRestaurantDetail={addRestaurantDetail}
            ondeleteRestaurantDetail={deleteRestaurantDetail}
            onClubDetailChange={handleClubDetailChange}
            onAddClubDetail={addClubDetail}
            ondeleteClubDetail={deleteClubDetail}
            states={states}
            districts={retailPremiseDistricts}
            subDivisions={retailPremiseSubDivisions}
            policeStations={retailPremisePoliceStations}
          />
        )}

        {/* STEP 7 */}
        {currentStep === 4 && (
          <HcrPersonalDocumentsStep
            documents={documents}
            uploadedFiles={uploadedFiles}
            handleDocumentFileChange={handleFileChange}
            handleValidityDateChange={handleValidityDateChange}
            handleDeleteFile={handleDeleteFile}
            onBack={() => setCurrentStep(3)}
            errors={personalDocumentsErrors}
            onContinue={handleNext}
          />
        )}

        {/* STEP 8 */}
        {currentStep === 5 && (
          <HcrSiteDocumentsStep
            documents={documents}
            uploadedFiles={uploadedFiles}
            handleDocumentFileChange={handleFileChange}
            handleValidityDateChange={handleValidityDateChange}
            handleDeleteFile={handleDeleteFile}
            onBack={() => setCurrentStep(4)}
            errors={siteDocumentsErrors}
            onContinue={handleNext}
          />
        )}

        {/* STEP 9 */}
        {currentStep === 6 && (
          <HcrDeclarationStep
            declarationFrom={declarationFrom}
            declarationErrors={declarationErrors}
            onChange={handleDeclarationChange}
            onBack={() => setCurrentStep(5)}
            onSubmit={handleNext}
          />
        )}
      </div>
    </div>
  );
}
