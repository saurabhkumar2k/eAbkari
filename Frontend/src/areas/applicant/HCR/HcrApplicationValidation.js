import {
    nameCheck,
    panCheck,
    mobileCheck,
    emailCheck,
    pinCheck,
    delhiPinCheck,
    requiredCheck,
    selectCheck,
    validateSiteNum,
    checkAnswersRequired,
    validateDirectors,
    validateRestaurantDetails,
    validateFileObject,
    validateDateOnly
} from "./validation";

export const validateApplicantData = (applicantForm) => {
  debugger;
  const errors = {};

  // Run validators and capture error messages if they return a string
  const nameError = nameCheck(applicantForm.applicantName);
  if (nameError) errors.applicantName = nameError;

  // For fields without complex regex, check if they exist or use requiredCheck
  if (!applicantForm.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }

  const occupationError = requiredCheck(applicantForm.occupation, "Occupation");
  if (occupationError) errors.occupation = occupationError;

  const panError = panCheck(applicantForm.panNo);
  if (panError) errors.panNo = panError;

  const addressError = requiredCheck(
    applicantForm.addressLine1,
    "Address Line 1",
  );
  if (addressError) errors.addressLine1 = addressError;

  const stateErr = selectCheck(applicantForm.StateUT, "State");
  if (stateErr) errors.StateUT = stateErr;

  const districtErr = selectCheck(applicantForm.district, "District");
  if (districtErr) errors.district = districtErr;

  const subDivErr = selectCheck(applicantForm.subDivision, "Sub Division");
  if (subDivErr) errors.subDivision = subDivErr;

  const pinError = pinCheck(applicantForm.pin);
  if (pinError) errors.pin = pinError;

  const mobileError = mobileCheck(applicantForm.mobile);
  if (mobileError) errors.mobile = mobileError;

  const emailError = emailCheck(applicantForm.email);
  if (emailError) errors.email = emailError;

  return errors;
};

export const validateSiteData = (siteForm) => {
  debugger;
  const errors = {};

  // Check required text & code dropdown fields using your generic check
  const siteNameErr = requiredCheck(siteForm.SiteName, "Restaurant Name");
  if (siteNameErr) errors.SiteName = siteNameErr;

  const addressErr = requiredCheck(siteForm.SiteAddress, "Restaurant Address");
  if (addressErr) errors.SiteAddress = addressErr;

  const stateErr = selectCheck(siteForm.State, "Restaurant state");
  if (stateErr) errors.State = stateErr;

  const districtErr = selectCheck(siteForm.DistrictCode, "Restaurant district");
  if (districtErr) errors.DistrictCode = districtErr;

  const subDivErr = selectCheck(
    siteForm.SubDivisionCode,
    "Restaurant subdivision",
  );
  if (subDivErr) errors.SubDivisionCode = subDivErr;

  const policeErr = selectCheck(
    siteForm.PoliceStationCode,
    "Restaurant police station",
  );
  if (policeErr) errors.PoliceStationCode = policeErr;

  const pinErr = delhiPinCheck(siteForm.SitePin);
  if (pinErr) errors.SitePin = pinErr;

  // Run specialized regex checks for Email and Mobile numbers
  const emailErr = emailCheck(siteForm.SiteEmail);
  if (emailErr) errors.SiteEmail = emailErr;

  const mobileErr = mobileCheck(siteForm.SiteMobile);
  if (mobileErr) errors.SiteMobile = mobileErr;

  return errors;
};

export const validateTrainData = (trainFrom, CatCode) => {
  debugger;
  const errors = {};
  if (CatCode === "52" || CatCode === "43") {
    // Check required text & code dropdown fields using your generic check

    const CompanyNameErr = requiredCheck(trainFrom.CompanyName, "Company/Corporation/Board Operating the Train");
    if (CompanyNameErr) errors.CompanyName = CompanyNameErr;

    const TrainNameErr = requiredCheck(trainFrom.TrainName, "Train Name");
    if (TrainNameErr) errors.TrainName = TrainNameErr;

    const TrainNumberErr = validateSiteNum(
      trainFrom.TrainNumber,
      "Train Number ",
    );
    if (TrainNumberErr) errors.TrainNumber = TrainNumberErr;

    const TempAddressErr = requiredCheck(trainFrom.TempAddress, "Address of temporary store in case of Train goes under maintainance");
    if (TempAddressErr) errors.TempAddress = TempAddressErr;

    const OriginateFromErrErr = requiredCheck(trainFrom.OriginateFromErr, "Train Originate from");
    if (OriginateFromErrErr) errors.OriginateFromErr = OriginateFromErrErr;

    const NumberOfcompartmentsErr = validateSiteNum(
      trainFrom.NumberOfcompartments,
      "Number of compartments",
    );
    if (NumberOfcompartmentsErr)
      errors.NumberOfcompartments = NumberOfcompartmentsErr;

    const numberOfBarAttendentErr = validateSiteNum(
      trainFrom.NumberOfBarAttendent,
      "Number of Bar Attendent",
    );
    if (numberOfBarAttendentErr)
      errors.NumberOfBarAttendent = numberOfBarAttendentErr;

    const numberOfDispensingCounterErr = validateSiteNum(
      trainFrom.NumberOfDispensingCounter,
      "Number of Dispensing Counter",
    );
    if (numberOfDispensingCounterErr)
      errors.NumberOfDispensingCounter = numberOfDispensingCounterErr;

    const numberOfKitchenStaffErr = validateSiteNum(
      trainFrom.NumberOfKitchenStaff,
      "Number of Kitchen Staff",
    );
    if (numberOfKitchenStaffErr)
      errors.NumberOfKitchenStaff = numberOfKitchenStaffErr;

    const numberOfManagersErr = validateSiteNum(
      trainFrom.NumberOfManagers,
      "Number of Managers",
    );
    if (numberOfManagersErr) errors.NumberOfManagers = numberOfManagersErr;

    const numberOfSeatCoversErr = validateSiteNum(
      trainFrom.NumberOfSeatCovers,
      "Number of Seat Covers",
    );
    if (numberOfSeatCoversErr)
      errors.NumberOfSeatCovers = numberOfSeatCoversErr;

    const numberOfUtlityEmployeesErr = validateSiteNum(
      trainFrom.NumberOfUtlityEmployees,
      "Number of Utility Employees",
    );
    if (numberOfUtlityEmployeesErr)
      errors.NumberOfUtlityEmployees = numberOfUtlityEmployeesErr;
  }

  return errors;
};

export const validateAdditionalSiteData = (additionalFrom, CatCode) => {
  debugger;
  const errors = {};

  // console.log("HcrLicensee - validateAdditionalRestaurant additionalFrom  ", additionalFrom)
  // console.log("HcrLicensee - validateAdditionalRestaurant questionsAnswers  ", questions)

  //additionalFrom
  if (CatCode === "05" || CatCode === "31") {
    // Check required text & code dropdown fields using your generic check
    const numberOfBarAttendentErr = validateSiteNum(
      additionalFrom.numberOfBarAttendent,
      "Number of Bar Attendent",
    );
    if (numberOfBarAttendentErr)
      errors.numberOfBarAttendent = numberOfBarAttendentErr;

    const numberOfDispensingCounterErr = validateSiteNum(
      additionalFrom.numberOfDispensingCounter,
      "Number of Dispensing Counter",
    );
    if (numberOfDispensingCounterErr)
      errors.numberOfDispensingCounter = numberOfDispensingCounterErr;

    const numberOfKitchenStaffErr = validateSiteNum(
      additionalFrom.numberOfKitchenStaff,
      "Number of Kitchen Staff",
    );
    if (numberOfKitchenStaffErr)
      errors.numberOfKitchenStaff = numberOfKitchenStaffErr;

    const numberOfManagersErr = validateSiteNum(
      additionalFrom.numberOfManagers,
      "Number of Managers",
    );
    if (numberOfManagersErr) errors.numberOfManagers = numberOfManagersErr;

    const numberOfSeatCoversErr = validateSiteNum(
      additionalFrom.numberOfSeatCovers,
      "Number of Seat Covers",
    );
    if (numberOfSeatCoversErr)
      errors.numberOfSeatCovers = numberOfSeatCoversErr;

    const numberOfUtlityEmployeesErr = validateSiteNum(
      additionalFrom.numberOfUtlityEmployees,
      "Number of Utility Employees",
    );
    if (numberOfUtlityEmployeesErr)
      errors.numberOfUtlityEmployees = numberOfUtlityEmployeesErr;

    const restaurantAreaErr = validateSiteNum(
      additionalFrom.restaurantArea,
      "Restaurant Area",
    );
    if (restaurantAreaErr) errors.restaurantArea = restaurantAreaErr;

    const additionalAreaErr = selectCheck(
      additionalFrom.additionalArea,
      "Additional Area",
    );
    if (additionalAreaErr) errors.additionalArea = additionalAreaErr;

    const hourOfSaleErr = selectCheck(
      additionalFrom.hourOfSale,
      "hour of sale",
    );
    if (hourOfSaleErr) errors.hourOfSale = hourOfSaleErr;
  }

  if (CatCode === "04" || CatCode === "30") {
    const staffStrengthErr = validateSiteNum(
      additionalFrom.staffStrength,
      "Staff strength",
    );
    if (staffStrengthErr) errors.staffStrength = staffStrengthErr;

    const starCategoryErr = selectCheck(
      additionalFrom.starCategory,
      "Star category",
    );
    if (starCategoryErr) errors.starCategory = starCategoryErr;

        if (additionalFrom.starCategory ==="Y") {
            const starCategoryRatingErr = selectCheck(additionalFrom.starCategoryRating, "Star category rating");
            if (starCategoryRatingErr) errors.starCategoryRating = starCategoryRatingErr;
        }
        const restaurantError = validateRestaurantDetails(additionalFrom.restaurantDetails)
        // if(restaurantError) errors.restaurantError = restaurantError.errors
        if (restaurantError && !restaurantError.isValid) {
            // 1. Assign the row-by-row input field errors array
            errors.restaurantError = restaurantError.errors;

      // 2. 🔥 Assign the missing global text banner string here:
      if (restaurantError.globalError) {
        errors.restaurantGlobalError = restaurantError.globalError;
      }
    }
  }

    if ((CatCode === "03" || CatCode === "33")) {

        const totalRoomErr = validateSiteNum(additionalFrom.totalRoom, "Total No. Rooms");
        if (totalRoomErr) errors.totalRoom = totalRoomErr;

    const staffStrengthErr = validateSiteNum(
      additionalFrom.staffStrength,
      "Staff strength",
    );
    if (staffStrengthErr) errors.staffStrength = staffStrengthErr;

        const starCategoryErr = selectCheck(additionalFrom.starCategory, "Star category approval by Department");
        if (starCategoryErr) errors.starCategory = starCategoryErr;

        if (additionalFrom.starCategory === "Y") {
            const starCategoryRatingErr = selectCheck(additionalFrom.starCategoryRating, "Star category");
            if (starCategoryRatingErr) errors.starCategoryRating = starCategoryRatingErr;
        }

    const HasStoreProvisionYNErr = selectCheck(
      additionalFrom.HasStoreProvisionYN,
      "Whether the premises have provision for store",
    );
    if (HasStoreProvisionYNErr)
      errors.HasStoreProvisionYN = HasStoreProvisionYNErr;

        if (additionalFrom.HasStoreProvisionYN === "Y") {
            const StoreLocationInHotelErr = selectCheck(additionalFrom.StoreLocationInHotel, "Location of store in Hotel");
            if (StoreLocationInHotelErr) errors.StoreLocationInHotel = StoreLocationInHotelErr;
        }

        const educationalInsDistErr = selectCheck(additionalFrom.educationalInsDist, "Educational Institution Distance");
        if (educationalInsDistErr) errors.educationalInsDist = educationalInsDistErr;

    const religiousPlaceDistErr = selectCheck(
      additionalFrom.religiousPlaceDist,
      "Religious Place Distance",
    );
    if (religiousPlaceDistErr)
      errors.religiousPlaceDist = religiousPlaceDistErr;

    const directorsErr = validateDirectors(additionalFrom.directors);
    if (directorsErr) errors.directors = directorsErr;
  }

    if ((CatCode === "04" || CatCode === "30") || (CatCode === '05' || CatCode === '31')) {
        const educationalInsDistErr = selectCheck(additionalFrom.educationalInsDist, "Educational Institution Distance");
        if (educationalInsDistErr) errors.educationalInsDist = educationalInsDistErr;

    const religiousPlaceDistErr = selectCheck(
      additionalFrom.religiousPlaceDist,
      "Religious Place Distance",
    );
    if (religiousPlaceDistErr)
      errors.religiousPlaceDist = religiousPlaceDistErr;

    const answerErr = checkAnswersRequired(
      additionalFrom.questions,
      additionalFrom.questionsAnswers,
    );
    if (answerErr) errors.answer = answerErr;

    const directorsErr = validateDirectors(additionalFrom.directors);
    if (directorsErr) errors.directors = directorsErr;
  }

  const TINNumberErr = requiredCheck(additionalFrom.TINNumber, "Tin Number");
  if (TINNumberErr) errors.TINNumber = TINNumberErr;

  // console.log("Test 111111111111")
  // Set the error state
  // setAdditionalFormErrors(errors);

  // Trigger Toast alerts if fields fail validation
  // if (
  //   Object.keys(errors).length > 0 &&
  //   Array.isArray(errors.directors?.errors) &&
  //   errors.directors.errors.some(err => err !== null)
  // )

  return errors;

  // debugger;
  // const hasStringErrors = Object.keys(errors).some(key => {
  //   if (key === 'directors') return false; // Skip the nested object here
  //   return errors[key] !== ""; // Returns true if an error string is not empty
  // });

  // // 2. Check if the nested directors array contains any real error objects
  // const hasDirectorErrors = Array.isArray(errors.directors?.errors) &&
  //   errors.directors.errors.some(err => err !== null && Object.keys(err || {}).length > 0);

  // // 3. Stop submission if either condition is true
  // if (hasStringErrors || hasDirectorErrors || errors.directors?.globalError) {
  //   triggerToast(
  //     "Please verify restaurant/site additional details.",
  //     "error"
  //   );
  //   return false;
  // }

  // return true;
};



/**
 * Validates a list of documents and returns a structured validation result state.
 * 
 * @param {Array} filesToUpload - Array of document configurations.
 * @param {Object} uploadedFiles - Object mapping docID to their uploaded file properties.
 * @returns {Object} - Object containing isValid, globalError, and an errors map.
 */
export const validateUploadedDocuments = (filesToUpload, uploadedFiles) => {
    const result = {
        isValid: true,
        globalError: "",
        errors: {}, // Structured as an object key-value map for lightning-fast docID lookups
    };

    // 1. Guard check: If there are no documents configured to upload, no validation needed
    if (!Array.isArray(filesToUpload) || filesToUpload.length === 0) {
        return result;
    }

    // 2. Guard check: If there are documents required but no uploads tracker exists
    if (!uploadedFiles || (typeof uploadedFiles !== "object") || (Object.keys(uploadedFiles).length === 0)) {

        result.isValid = false;
        result.globalError = "Please upload all required files";

        // Populate individual field errors for mandatory records
        filesToUpload.forEach((doc) => {
            if (doc.isMandatory === "Y") {
                result.errors[doc.docID] = "Document file is required";
            }
        });
        return result;
    }

    // 3. Iterate through each document configuration to run checks
    for (let i = 0; i < filesToUpload.length; i++) {
        const doc = filesToUpload[i];
        const docId = doc.docID;
        const uploaded = uploadedFiles[docId];
        const hasFile = !!uploaded?.file;

        // Fallback cleanly to docID if docDesc is missing
        const documentName = doc.docDesc || `Document ID ${docId}`;
        let docError = "";

        // Mandatory document validation
        if (doc.isMandatory === "Y" && !hasFile) {
            // docError = `${documentName} is required`;
            docError = `Document is required`;
        }
        // File structure and format check (runs if a file is present)
        else if (hasFile) {
            const fileTypeError = validateFileObject(uploaded.file, "Document", 2, [".pdf"]);
            if (fileTypeError) {
                docError = fileTypeError;
            }
        }

        // Conditional validity date validation (if no file errors were found yet)
        if (!docError && (doc.isValid === true || doc.isValid === "Y")) {
            const dateError = validateDateOnly(uploaded.validityDate, "Date of Validity");
            if (dateError) {
                docError = dateError;
            }
        }

        // Assign the error message directly to the docID key if a check fails
        if (docError) {
            result.isValid = false;
            result.errors[docId] = docError;
        }
    }

    // Set a global error notification message if any inner elements failed
    // if (!result.isValid) {
    //     result.globalError = "Please fix the document errors before submitting";
    // }

    return result;
};

