import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

import { createApplicant } from "../../../Model/Applicant";
import { createHCRApplicant } from "../../../Model/HCRApplicant";
import { createHCRAdditional } from "../../../Model/HCRAdditional";

// import HcrApplicantDetails from "./HcrApplicantDetail";

import HcrApplicantStep from "./HcrApplicantStep";
import HcrRestaurantStep from "./HcrRestaurantStep";
import HcrAdditionalStep from "./HcrAdditionalStep";
import HcrPersonalDocumentsStep from "./HcrPersonalDocumentsStep";
import HcrSiteDocumentsStep from "./HcrSiteDocumentsStep";
import HcrDeclarationStep from "./HcrDeclarationStep";
// import RestaurantAdditionalDetails from "../../../components/RestaurantAdditionalDetails";



import {
  validateAdditionalSiteData,
  validateSiteData,
  validateApplicantData,
} from "./HcrApplicationValidation";

import {
  validateDirectors,
  validateRestaurantDetails
} from "./validation";


import ReceiptSuccessHCR from "../../../components/ReceiptSuccessHCR";

export default function HcrLicensee({
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

  const [applicationId, setApplicationId] = useState(
    localStorage.getItem("applicationId")
  );


  // =========================================================
  // Forms
  // =========================================================

  const [applicantForm, setApplicantForm] = useState(createApplicant());

  const [siteForm, setSiteForm] = useState(createHCRApplicant());

  const [additionalFrom, setAdditionalFrom] = useState(createHCRAdditional());

  // =========================================================
  // Master Data
  // =========================================================


  const [states, setStates] = useState([]);

  const [applicantDistricts, setApplicantDistricts] = useState([]);

  const [applicantSubDivisions, setApplicantSubDivisions] = useState([]);

  const [restaurantDistricts, setRestaurantDistricts] = useState([]);

  const [restaurantSubDivisions, setRestaurantSubDivisions] = useState([]);

  const [restaurantPoliceStations, setRestaurantPoliceStations] =
    useState([]);

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

  // =========================================================
  // Errors
  // =========================================================

  const [applicantErrors, setApplicantErrors] = useState({});

  const [siteFormErrors, setSiteFormErrors] = useState({});

  const [additionalFormErrors, setAdditionalFormErrors] = useState({});

  const [siteDocumentsErrors, setSiteDocumentsErrors] = useState({});

  const [formErrors, setFormErrors] = useState({});

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
    return [
      {
        num: 1,
        id: "applicant",
        label: "Applicant Details",
        sub: "Demographics",
      },
      {
        num: 2,
        id: "restaurant",
        label: "Restaurant Details",
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
        "error"
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
      triggerToast(
        "Please verify restaurant/site details.",
        "error"
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // Additional
  // =========================================================

  const handleAdditionalChange = (field, value) => {
    // console.log("Test 3333333333333")
    setAdditionalFrom((prev) => ({
      ...prev,
      [field]: value,
    }));

    setAdditionalFormErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };


  const validateAdditionalSiteDetails = () => {
    debugger;

    console.log(additionalFrom)
    const AdditionalRestaurantFrom = additionalFrom;
    AdditionalRestaurantFrom.questions = questions;
    AdditionalRestaurantFrom.questionsAnswers = questionsAnswers;
    const errors = validateAdditionalSiteData(AdditionalRestaurantFrom, selectedLicenseCode);
    console.log(errors)


    // console.log("Test 111111111111")
    // Set the error state
    setAdditionalFormErrors(errors);

    // Trigger Toast alerts if fields fail validation
    // if (
    //   Object.keys(errors).length > 0 &&
    //   Array.isArray(errors.directors?.errors) &&
    //   errors.directors.errors.some(err => err !== null)
    // ) 

    const hasStringErrors = Object.keys(errors).some(key => {
      if (key === 'directors') return false; // Skip the nested object here
      return errors[key] !== ""; // Returns true if an error string is not empty
    });

    // 2. Check if the nested directors array contains any real error objects
    const hasDirectorErrors = Array.isArray(errors.directors?.errors) &&
      errors.directors.errors.some(err => err !== null && Object.keys(err || {}).length > 0);

    // 3. Stop submission if either condition is true
    if (hasStringErrors || hasDirectorErrors || errors.directors?.globalError) {
      triggerToast(
        "Please verify restaurant/site additional details.",
        "error"
      );
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
    fetch(
      "http://localhost:5214/api/LGDiretory/ConstitutionType"
    )
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
        `http://localhost:5214/api/LGDiretory/GetDistrict?Statecode=${stateCode}`
      );

      const data = await response.json();

      if (type === "applicantForm") {
        setApplicantDistricts(data || []);
      }

      if (type === "siteForm") {
        setRestaurantDistricts(data || []);
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
        `http://localhost:5214/api/LGDiretory/GetSubDivision?DistrictCode=${districtCode}`
      );

      const data = await response.json();

      if (type === "applicantForm") {
        setApplicantSubDivisions(data || []);
      }

      if (type === "siteForm") {
        setRestaurantSubDivisions(data || []);
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
        `http://localhost:5214/api/LGDiretory/PoliceStations/${districtCode}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch police stations");
      }

      const data = await response.json();

      setRestaurantPoliceStations(data || []);
    } catch (error) {
      console.error("Police Station API Error:", error);
    }
  };

  // =========================================================
  // Applicant State / District
  // =========================================================

  useEffect(() => {
    if (applicantForm.StateUT) {
      fetchDistricts(
        applicantForm.StateUT, "applicantForm"
      );
    }
  }, [applicantForm.StateUT]);

  useEffect(() => {
    if (applicantForm.district) {
      fetchSubDivisions(applicantForm.district, 'applicantForm');
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

  // =========================================================
  // Load Applicant
  // =========================================================

  useEffect(() => {
    if (!regId) return;

    loadApplicantData(regId);
  }, [regId]);

  const loadApplicantData = async (registrationId) => {
    try {
      const response = await fetch(
        `http://localhost:5214/api/LicenseeCategories/GetApplicantByRegId/${registrationId}`
      );

      if (!response.ok) {
        throw new Error("Unable to load applicant");
      }

      const data = await response.json();


      if (data.tateUT) {
        await fetchDistricts(
          data.stateUT,
          "applicantForm"
        );
      }

      setApplicantForm((prev) => ({
        ...prev,

        applicantName:
          `${data.firstName || ""} ${data.lastName || ""
            }`.trim(),

        fatherHusbandName:
          data.fatherHusbandName || "",

        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth.split("T")[0]
          : "",

        panNo: data.panNo || "",

        ConstitutionType:
          data.ConstitutionType || "",

        occupation:
          data.occupation || "",

        addressLine1:
          data.addressLine1 || "",

        addressLine2:
          data.addressLine2 || "",

        StateUT:
          data.stateUT.trim() || "",

        district:
          data.district.trim() || "",

        subDivision:
          data.subDivision.trim()
            ? String(data.subDivision).trim()
            : "",

        pin:
          data.pin || "",

        email:
          data.email || "",

        mobile:
          data.mobile || "",

        landline:
          data.landline || "",

        ownerType,
        catCode: selectedLicenseCode,
      }));

    } catch (error) {
      console.error("Applicant Load Error:", error);
    }
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
        `http://localhost:5214/api/CommonHCR/GetCategoryWiseQuestions?catCode=${catCode}`
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
              answer.questionId === (question.questionId ?? question.QuestionId)
          );

          return savedAnswer
            ? {
              ...question,
              answer: savedAnswer.answerGiven,
            }
            : question;
        })
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
          : question
      )
    );

    setQuestionsAnswers((prev) => {
      const index = questions.findIndex(
        (question) =>
          question.questionId === questionId
      );

      const existing = prev.find(
        (item) => item.questionId === questionId
      );

      if (existing) {
        return prev.map((item) =>
          item.questionId === questionId
            ? {
              ...item,
              applicationIdNo:
                applicationId || "",
              answerGiven: answer,
              slNo: index + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          applicationIdNo:
            applicationId || "",
          questionId,
          answerGiven: answer,
          slNo: index + 1,
        },
      ];
    });
  };


  const handleRestaurantDetailChange = (index, field, value) => {
    setAdditionalFrom((prev) => {
      const restaurantDetails = [
        ...(prev.restaurantDetails || []),
      ];

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
  const restaurantErr = validateRestaurantDetails(additionalFrom.restaurantDetails);
  if (restaurantErr) errors.restaurantDetails = restaurantErr;

  // 2. Check if the data structure contains items before proceeding
  const hasRestaurants = additionalFrom.restaurantDetails && additionalFrom.restaurantDetails.length > 0;

  if (hasRestaurants) {
    additionalUpdateErrors.restaurantDetails = errors.restaurantDetails;
    setAdditionalFormErrors(additionalUpdateErrors);
    console.log("HcrLicensee - addRestaurantDetail additionalFormErrors ", additionalFormErrors, additionalUpdateErrors);
  }

  // Condition 1: Function evaluation fails AND the array is populated
  const isInvalidWithData = restaurantErr?.isValid === false && hasRestaurants;

  // Condition 2: Check if errors array contains any active validation objects (ignores null markers)
  const hasRowErrors = Array.isArray(restaurantErr?.errors) && restaurantErr.errors.some(err => err !== null);

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
        HoursofSaleAddtionalArea: ""
      },
    ],
  }));
};


  const deleteRestaurantDetail = (index) => {
    setAdditionalFrom((prev) => ({
      ...prev,
      restaurantDetails: (prev.restaurantDetails || []).filter(
        (_, i) => i !== index
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

    const applicationIdNo =
      localStorage.getItem("applicationId");

    if (!applicationIdNo || !selectedLicenseCode) {
      return;
    }

    const docStatus =
      currentStep === 4 ? "A" : "S";

    fetch(
      `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseCode}&docStatus=${docStatus}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data || []);
      })
      .catch((error) => {
        console.error("Document API Error:", error);
        setDocuments([]);
        return [
          ...prev,
          {
            applicationIdNo:
              applicationId || "",
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
      const directors = [
        ...(prev.directors || []),
      ];

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
    // console.log("HcrLicensee - addDirector additionalFrom  ", additionalFrom.directors)

    // const directorsErr = validateDirectors(additionalFrom.directors);
    // if (directorsErr) errors.directors = directorsErr;

    // setAdditionalFormErrors(errors);

    // // Safely checks if the validation failed and if we have row errors populated
    // if ((additionalFormErrors.directors?.isValid === false && (additionalFrom.directors && additionalFrom.directors.length > 0)) || (directorsErr?.errors && directorsErr.errors.length > 0)) {
    //   return; // Stop form submission
    // }
    const directorsErr = validateDirectors(additionalFrom.directors);
    if (directorsErr) errors.directors = directorsErr;




    // Check if the array exists and has at least one object
    const hasDirectors = Array.isArray(additionalFrom.directors) && additionalFrom.directors.length > 0;

    if (hasDirectors) {
      additionalUpdateErrors.directors = errors.directors; // Clear the errors array if no errors are found
      setAdditionalFormErrors(additionalUpdateErrors);
      console.log("HcrLicensee - addDirector additionalFormErrors  ", additionalFormErrors, additionalUpdateErrors)
    }

    // Condition 1: Local error object says invalid AND director list is not empty
    const isInvalidWithData = directorsErr?.isValid === false && hasDirectors;

    // Condition 2: Checks if the errors array exists AND contains at least one actual error object (filters out null)
    const hasRowErrors = Array.isArray(directorsErr?.errors) && directorsErr.errors.some(err => err !== null);

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
      directors: (prev.directors || []).filter(
        (_, i) => i !== index
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

    const applicationIdNo =
      localStorage.getItem("applicationId");

    if (!applicationIdNo || !selectedLicenseCode) {
      return;
    }

    const docStatus =
      currentStep === 4 ? "A" : "S";

    fetch(
      `http://localhost:5214/api/LicenseDocument/documents?applicationIdNo=${applicationIdNo}&catCode=${selectedLicenseCode}&docStatus=${docStatus}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data || []);
      })
      .catch((error) => {
        console.error("Document API Error:", error);
        setDocuments([]);
      });
  }, [currentStep, selectedLicensee]);

  const handleFileChange = (key, file) => {
    if (!file) return;

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

      applicantName:
        applicantForm.applicantName,

      dob:
        applicantForm.dateOfBirth,

      applicationIdNo:
        applicantForm.applicationId || null,

      fatherHusbandName:
        applicantForm.fatherHusbandName,

      occupation:
        applicantForm.occupation,

      panNo:
        applicantForm.panNo,

      presentAddress:
        applicantForm.addressLine1,

      permanentAddress:
        applicantForm.addressLine2,

      stateUT:
        applicantForm.stateUT,

      district:
        applicantForm.district,

      subDivision:
        applicantForm.subDivision,

      pin:
        applicantForm.pin,

      email:
        applicantForm.email,

      mobile:
        applicantForm.mobile,

      landLine:
        applicantForm.landline || "",

      ownerType:
        ownerType.code,

      catCode:
        selectedLicenseCode,

      activityId:
        "F",
    };

    // console.log(payload)

    try {
      const response = await fetch(
        "http://localhost:5214/api/CommonLicense/ApplyLicense",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      const data = await response.json();

      setApplicationId(
        data.applicationId
      );
      applicantForm.applicationId = data.applicationId;

      localStorage.setItem(
        "applicationId",
        data.applicationId
      );

      localStorage.setItem(
        "catCode",
        data.catCode || selectedLicenseCode
      );

      return true;
    } catch (error) {
      console.error(
        "Applicant Save Error:",
        error
      );

      triggerToast(
        "Unable to save applicant data.",
        "error"
      );

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

      ApplicationIdNo:
        localStorage.getItem(
          "applicationId"
        ),

      FinYear: "2026-2027",

      CatCode: selectedLicenseCode,
    };

    try {
      const response = await fetch(
        "http://localhost:5214/api/CommonHCR/SaveSiteDetails",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Restaurant Save Error:",
        error
      );

      triggerToast(
        "Unable to save restaurant details.",
        "error"
      );

      return false;
    }
  };

  // =========================================================
  // STEP 6 - Save Additional
  // =========================================================

  const saveAdditional = async () => {
    const applicationIdNo =
      localStorage.getItem("applicationId");

    if (!validateAdditionalSiteDetails()) {
      return false;
    }

    try {
      const formData = new FormData();

      // Additional Details
      Object.entries(additionalFrom).forEach(
        ([key, value]) => {
          if (key === "directors") return;

          const propertyName =
            key.charAt(0).toUpperCase() +
            key.slice(1);

          const booleanFields = [
            "additionalArea",
            "isSuitableGagdget",
            "isLocalAuthorityApproved",
            "isIndicatingLiquor",
          ];

          const normalizedValue =
            booleanFields.includes(key)
              ? value === true ||
                value === "true" ||
                value === "True" ||
                value === "1" ||
                value === 1
                ? "true"
                : value === false ||
                  value === "false" ||
                  value === "False" ||
                  value === "0" ||
                  value === 0
                  ? "false"
                  : String(value ?? "")
              : value ?? "";

          formData.append(
            `AdditionalDetails.${propertyName}`,
            normalizedValue
          );
        }
      );

      formData.set(
        "AdditionalDetails.ApplicationIdNo",
        applicationIdNo || ""
      );

      // Partners
      (
        additionalFrom.directors || []
      ).forEach((partner, index) => {
        formData.append(
          `Partners[${index}].Id`,
          "0"
        );

        formData.append(
          `Partners[${index}].ApplicationIdNo`,
          applicationIdNo || ""
        );

        formData.append(
          `Partners[${index}].PName`,
          partner.PName || ""
        );

        formData.append(
          `Partners[${index}].PPerShare`,
          partner.PPerShare || ""
        );

        formData.append(
          `Partners[${index}].PPanNo`,
          partner.PPanNo || ""
        );

        formData.append(
          `Partners[${index}].PExciseNominee`,
          partner.PExciseNominee || ""
        );

        formData.append(
          `Partners[${index}].DINNo`,
          partner.DINNo || ""
        );

        if (partner.panFile instanceof File) {
          formData.append(
            `Partners[${index}].PanFile`,
            partner.panFile
          );

          formData.append(
            `Partners[${index}].PanFileUploaded`,
            partner.panFile.name
          );
        }

        if (
          partner.addressFile instanceof File
        ) {
          formData.append(
            `Partners[${index}].AddressFile`,
            partner.addressFile
          );

          formData.append(
            `Partners[${index}].AddressFileUploaded`,
            partner.addressFile.name
          );
        }

        formData.append(
          `Partners[${index}].SlNo`,
          String(index + 1)
        );
      });

      // Answers
      questionsAnswers.forEach(
        (item, index) => {
          formData.append(
            `ApplicantAnswers[${index}].ApplicationIdNo`,
            applicationIdNo || ""
          );

          formData.append(
            `ApplicantAnswers[${index}].QuestionId`,
            item.questionId
          );

          formData.append(
            `ApplicantAnswers[${index}].AnswerGiven`,
            item.answerGiven || ""
          );

          formData.append(
            `ApplicantAnswers[${index}].SlNo`,
            String(index + 1)
          );
        }
      );

      const response = await fetch(
        "http://localhost:5214/api/CommonHCR/SaveAdditionalHCRCompleteDetails",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Additional Save Error:",
        error
      );

      triggerToast(
        "Unable to save additional details.",
        "error"
      );

      return false;
    }
  };

  // =========================================================
  // STEP 7/8 - Upload Documents
  // =========================================================

  const uploadDocuments = async () => {
    try {
      const filesToUpload = documents.filter(
        (doc) => uploadedFiles[doc.docId]?.file
      );

      if (filesToUpload.length === 0) {
        return true;
      }

      const formData = new FormData();

      formData.append(
        "ApplicationIdNo",
        localStorage.getItem(
          "applicationId"
        ) || ""
      );

      formData.append(
        "MobileNo",
        applicantForm.mobile || ""
      );

      let index = 0;

      filesToUpload.forEach((doc) => {
        const uploaded =
          uploadedFiles[doc.docId];

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
      });

      const response = await fetch(
        "http://localhost:5214/api/LicenseeCategories/UploadApplicationDocuments",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Document Upload Error:",
        error
      );

      triggerToast(
        "Unable to upload documents. Continuing to next step.",
        "error"
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
          applicationId ||
          localStorage.getItem(
            "applicationId"
          ),

        ApplicationStatus: "02",
      };

      const response = await fetch(
        "http://localhost:5214/api/CommonLicense/SubmitApplication",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            finalSubmission
          ),
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      const appNo =
        applicationId ||
        localStorage.getItem(
          "applicationId"
        );

      setReceiptData({
        applicationNo: appNo,
        applicantName:
          applicantForm.applicantName,
        SiteName:
          siteForm.SiteName,
        SiteEmail:
          siteForm.SiteEmail,
        SiteMobile:
          siteForm.SiteMobile,
        dateFiled:
          new Date().toLocaleDateString(
            "en-IN"
          ),
        status:
          "Filing Registered",
      });

      setSubmitSuccess(true);

      if (showToast) {
        showToast(
          "HCR Excise application submitted successfully!"
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Final Submission Error:",
        error
      );

      triggerToast(
        "Unable to submit application.",
        "error"
      );

      return false;
    }
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goToSiteDocuments = async () => {
    await uploadDocuments();
    setCurrentStep(5);
  };

  const goToDeclaration = async () => {
    await uploadDocuments();
    setCurrentStep(6);
  };

  const handleNext = async () => {
    debugger;
    if (currentStep === 1) {
      const success =
        await saveApplicant();

      if (success) {
        setCurrentStep(2);
        // setCurrentStep(6);
      }

      return;
    }

    if (currentStep === 2) {
      const success =
        await saveRestaurant();

      if (success) {
        setCurrentStep(3);
      }

      return;
    }

    if (currentStep === 3) {
      const success =
        await saveAdditional();

      if (success) {
        setCurrentStep(4);
      }

      return;
    }

    if (currentStep === 4) {
      await goToSiteDocuments();
      return;
    }

    if (currentStep === 5) {
      await goToDeclaration();
      return;
    }

    if (currentStep === 6) {
      await submitApplication();
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
                width: `${((currentStep - 1) /
                  (currentLicenseSteps.length - 1)) *
                  100
                  }%`,
              }}
            />
          </div>

          {currentLicenseSteps.map(
            (step) => {
              const isActive =
                currentStep === step.num;

              const isCompleted =
                currentStep > step.num;

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
                      ${isCompleted
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : isActive
                          ? "bg-blue-600 border-blue-600 text-white scale-110"
                          : "bg-white border-slate-200 text-slate-400"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.num
                    )}
                  </div>

                  <span
                    className={`
                      text-[11px] font-extrabold mt-2
                      ${isActive
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
            }
          )}
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
          <HcrRestaurantStep
            siteForm={siteForm}
            states={states}
            districts={restaurantDistricts}
            subDivisions={restaurantSubDivisions}
            policeStations={
              restaurantPoliceStations
            }
            errors={siteFormErrors}
            onChange={handleRestaurantChange}
            onBack={() => setCurrentStep(1)}
            onContinue={handleNext}
          />)}

        {/* STEP 6 */}
        {currentStep === 3 && (
          // <RestaurantAdditionalDetails
          //   additionalFrom={testAdditionalFrom}
          //   hoursOfSaleList={hoursOfSaleList}
          //   constitutionType={applicantForm?.ConstitutionType}
          //   questions={questions}
          //   onChange={handleAdditionalChange}
          //   onQuestionsChange={handleQuestions}
          //   onDirectorChange={handleDirectorChange}
          //   onAddDirector={addDirector}
          //   onDeleteDirector={deleteDirector}
          //   onBack={() => setCurrentStep(2)}
          //   onContinue={handleNext}
          // /> 
          <HcrAdditionalStep
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
            onRestaurantDetailChange={handleRestaurantDetailChange}
            onAddRestaurantDetail={addRestaurantDetail}
            ondeleteRestaurantDetail={deleteRestaurantDetail}
          />
        )}

        {/* STEP 7 */}
        {currentStep === 4 && (
          <HcrPersonalDocumentsStep
            documents={documents}
            uploadedFiles={uploadedFiles}
            handleDocumentFileChange={
              handleFileChange
            }
            handleDeleteFile={
              handleDeleteFile
            }
            onBack={() =>
              setCurrentStep(3)
            }
            onContinue={goToSiteDocuments}
          />
        )}

        {/* STEP 8 */}
        {currentStep === 5 && (
          <HcrSiteDocumentsStep
            documents={documents}
            uploadedFiles={uploadedFiles}
            handleDocumentFileChange={
              handleFileChange
            }
            handleDeleteFile={
              handleDeleteFile
            }
            onBack={() =>
              setCurrentStep(4)
            }
            onContinue={goToDeclaration}
          />
        )}

        {/* STEP 9 */}
        {currentStep === 6 && (
          <HcrDeclarationStep
            formData={applicantForm}
            formErrors={formErrors}
            onChange={handleApplicantChange}
            onBack={() =>
              setCurrentStep(5)
            }
            onSubmit={handleNext}
          />
        )}
      </div>
    </div>
  );
}