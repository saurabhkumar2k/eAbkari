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
  validateDateOnly,
  validateClubDetails,
  validateTrainRoutes,
  validateRetailPartnerDetails
} from "../validation";

export const validateAdditionalPremiseData = (additionalFrom, CatCode) => {
  const errors = {};

  const RetailBasicFieldsCategories = [
    "02", "11", "25", "39", "40", "41", "46", "83", "34",
  ];

  // Validate Retail Partner Details
  if (["11", "25", "39", "40"].includes(CatCode)) {
    const retailDetailsErr = validateRetailPartnerDetails(
      additionalFrom.RetailPropDetails
    );

    if (retailDetailsErr) {
      errors.RetailPropDetails = retailDetailsErr;
    }
  }

  // Validate Proposed Premise Dimensions
  if (RetailBasicFieldsCategories.includes(CatCode)) {

    const premiseLengthErr = validateSiteNum(
      additionalFrom.ProposedPremiseLength,
      "Premise Length"
    );

    if (premiseLengthErr) {
      errors.ProposedPremiseLength = premiseLengthErr;
    }

    const premiseBreadthErr = validateSiteNum(
      additionalFrom.ProposedPremiseBreath,
      "Premise Breadth"
    );

    if (premiseBreadthErr) {
      errors.ProposedPremiseBreath = premiseBreadthErr;
    }

    const premiseHeightErr = validateSiteNum(
      additionalFrom.ProposedPremiseHeight,
      "Premise Height"
    );

    if (premiseHeightErr) {
      errors.ProposedPremiseHeight = premiseHeightErr;
    }

    const totalAreaErr = validateSiteNum(
      additionalFrom.ProposedPremiseTotalArea,
      "Premise Total Area"
    );

    if (totalAreaErr) {
      errors.ProposedPremiseTotalArea = totalAreaErr;
    }

    if (CatCode === "02") {
      // Proposed Premise Type
      const premiseTypeErr = requiredCheck(
        additionalFrom.ProposedPremiseType,
        "Proposed Premise Type"
      );

      if (premiseTypeErr) {
        errors.ProposedPremiseType = premiseTypeErr;
      }
    }

    // Owner Premise Address
    const addressErr = requiredCheck(
      additionalFrom.OwnerPremiseAddress1,
      "Owner Premise Address"
    );

    if (addressErr) {
      errors.OwnerPremiseAddress1 = addressErr;
    }

    // Owner Premise PIN
    const pinErr = delhiPinCheck(
      additionalFrom.OwnerPremisePin,
      "Owner Premise PIN"
    );

    if (pinErr) {
      errors.OwnerPremisePin = pinErr;
    }

    // Owner Mobile
    const mobileErr = mobileCheck(
      additionalFrom.OwnerPremiseMobile,
      "Owner Premise Mobile"
    );

    if (mobileErr) {
      errors.OwnerPremiseMobile = mobileErr;
    }

    // Validate Premise Questions
    const answerErr = checkAnswersRequired(
      additionalFrom.questions,
      // additionalFrom.questionsAnswers,
    );
    if (answerErr) errors.answer = answerErr;

  }

  return errors;
};