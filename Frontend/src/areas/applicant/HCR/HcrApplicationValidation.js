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
    validateRestaurantDetails
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

    const addressError = requiredCheck(applicantForm.addressLine1, "Address Line 1");
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

    // // Update state and trigger toast notifications
    // setApplicantErrors(errors);

    // if (Object.keys(errors).length > 0) {
    //     triggerToast(
    //         "Please verify required fields in applicant profile.",
    //         "error"
    //     );
    //     return false;
    // }

    // return true;
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

    const subDivErr = selectCheck(siteForm.SubDivisionCode, "Restaurant subdivision");
    if (subDivErr) errors.SubDivisionCode = subDivErr;

    const policeErr = selectCheck(siteForm.PoliceStationCode, "Restaurant police station");
    if (policeErr) errors.PoliceStationCode = policeErr;

    const pinErr = delhiPinCheck(siteForm.SitePin);
    if (pinErr) errors.SitePin = pinErr;

    // Run specialized regex checks for Email and Mobile numbers
    const emailErr = emailCheck(siteForm.SiteEmail);
    if (emailErr) errors.SiteEmail = emailErr;

    const mobileErr = mobileCheck(siteForm.SiteMobile);
    if (mobileErr) errors.SiteMobile = mobileErr;

    return errors;

    // Set the error state
    // setSiteFormErrors(errors);

    // // Trigger Toast alerts if fields fail validation
    // if (Object.keys(errors).length > 0) {
    //     triggerToast(
    //         "Please verify restaurant/site details.",
    //         "error"
    //     );
    //     return false;
    // }

    // return true;
};

export const validateAdditionalSiteData = (additionalFrom, CatCode) => {
    debugger;
    const errors = {};

    // console.log("HcrLicensee - validateAdditionalRestaurant additionalFrom  ", additionalFrom)
    // console.log("HcrLicensee - validateAdditionalRestaurant questionsAnswers  ", questions)

    //additionalFrom
    if (CatCode === '05' || CatCode === '31') {
        // Check required text & code dropdown fields using your generic check
        const numberOfBarAttendentErr = validateSiteNum(additionalFrom.numberOfBarAttendent, "Number of Bar Attendent");
        if (numberOfBarAttendentErr) errors.numberOfBarAttendent = numberOfBarAttendentErr;

        const numberOfDispensingCounterErr = validateSiteNum(additionalFrom.numberOfDispensingCounter, "Number of Dispensing Counter");
        if (numberOfDispensingCounterErr) errors.numberOfDispensingCounter = numberOfDispensingCounterErr;

        const numberOfKitchenStaffErr = validateSiteNum(additionalFrom.numberOfKitchenStaff, "Number of Kitchen Staff");
        if (numberOfKitchenStaffErr) errors.numberOfKitchenStaff = numberOfKitchenStaffErr;

        const numberOfManagersErr = validateSiteNum(additionalFrom.numberOfManagers, "Number of Managers");
        if (numberOfManagersErr) errors.numberOfManagers = numberOfManagersErr;

        const numberOfSeatCoversErr = validateSiteNum(additionalFrom.numberOfSeatCovers, "Number of Seat Covers");
        if (numberOfSeatCoversErr) errors.numberOfSeatCovers = numberOfSeatCoversErr;

        const numberOfUtlityEmployeesErr = validateSiteNum(additionalFrom.numberOfUtlityEmployees, "Number of Utility Employees");
        if (numberOfUtlityEmployeesErr) errors.numberOfUtlityEmployees = numberOfUtlityEmployeesErr;

        const restaurantAreaErr = validateSiteNum(additionalFrom.restaurantArea, "Restaurant Area");
        if (restaurantAreaErr) errors.restaurantArea = restaurantAreaErr;

        const additionalAreaErr = selectCheck(additionalFrom.additionalArea, "Additional Area");
        if (additionalAreaErr) errors.additionalArea = additionalAreaErr;

        const hourOfSaleErr = selectCheck(additionalFrom.hourOfSale, "hour of sale");
        if (hourOfSaleErr) errors.hourOfSale = hourOfSaleErr;

    }

    if (CatCode === "04" || CatCode === "30") {
        const staffStrengthErr = validateSiteNum(additionalFrom.staffStrength, "Staff strength");
        if (staffStrengthErr) errors.staffStrength = staffStrengthErr;

        const starCategoryErr = selectCheck(additionalFrom.starCategory, "Star category");
        if (starCategoryErr) errors.starCategory = starCategoryErr;

        if (additionalFrom.starCategory) {
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

    if ((CatCode === "04" || CatCode === "30") || (CatCode === '05' || CatCode === '31')) {
        const educationalInsDistErr = selectCheck(additionalFrom.educationalInsDist, "Educational Institution Distance");
        if (educationalInsDistErr) errors.educationalInsDist = educationalInsDistErr;

        const religiousPlaceDistErr = selectCheck(additionalFrom.religiousPlaceDist, "Religious Place Distance");
        if (religiousPlaceDistErr) errors.religiousPlaceDist = religiousPlaceDistErr;

        const answerErr = checkAnswersRequired(additionalFrom.questions, additionalFrom.questionsAnswers);
        if (answerErr) errors.answer = answerErr;

        const directorsErr = validateDirectors(additionalFrom.directors);
        if (directorsErr) errors.directors = directorsErr;
    }

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

    debugger;
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