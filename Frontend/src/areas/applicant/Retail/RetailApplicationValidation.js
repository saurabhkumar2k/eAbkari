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
  debugger;
  const errors = {};

  console.log("RetailLicensee - validateAdditionalPremiseData additionalFrom  ", additionalFrom)
  // console.log("HcrLicensee - validateAdditionalRestaurant questionsAnswers  ", questions)

  //additionalFrom

  const HCRBasicFieldsCategories = [
    "02",
    "11",
    "25",
    "39",
    "40",
    "41",
    "46",
    "83",
    "34",
  ];


  if (CatCode === "11" || CatCode === "25" || CatCode === "39" || CatCode === "40") {
    // const NameOftheErr = requiredCheck(
    //   additionalFrom.NameOfthe,
    //   "Number Of The",
    // );
    // if (NameOftheErr) errors.NameOfthe = NameOftheErr;

    // const NameErr = nameCheck(
    //   additionalFrom.Name,
    //   "Name",
    // );
    // if (NameErr) errors.Name = NameErr;

    const clubDetailsErr = validateRetailPartnerDetails(additionalFrom.RetailPropDetails);
    if (clubDetailsErr) errors.RetailPropDetails = clubDetailsErr;

  }

  return errors;

};