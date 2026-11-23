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
    validatePdfFileType
} from "../validation";

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
};

export const validateWarehouseData = (warehouseForm) => {
  debugger;
  const errors = {};

  // Warehouse Name
  // Warehouse Name
  const nameErr = requiredCheck(
    warehouseForm.warehouseName,
    "Warehouse Name"
  );

  if (nameErr) errors.warehouseName = nameErr;

  //Warehouse Address
  const addressErr = requiredCheck( warehouseForm.warehouseAddress1, "Warehouse Address");
  if (addressErr) errors.warehouseAddress1 = addressErr;

    const address2Error = requiredCheck(warehouseForm.warehouseAddress2, "Address Line 2");
  if (address2Error) errors.warehouseAddress2 = address2Error;


  // State
  const stateErr = selectCheck(warehouseForm.warehouseState, "State");
  if (stateErr) errors.warehouseState = stateErr;

  const districtErr = selectCheck(warehouseForm.warehouseDistrict, "District");
  if (districtErr) errors.warehouseDistrict = districtErr;

  const subDivErr = selectCheck(warehouseForm.warehouseSubDivision, "Sub Division");
if (subDivErr) errors.warehouseSubDivision = subDivErr;



  const policeErr = selectCheck(warehouseForm.warehousePoliceStation, "Police Station");
  if (policeErr) errors.warehousePoliceStation = policeErr;

  const pinError = pinCheck(warehouseForm.warehousePin);
  if (pinError) errors.warehousePin = pinError;

  const mobileError = mobileCheck(warehouseForm.warehouseMobile);
  if (mobileError) errors.warehouseMobile = mobileError;

  const emailError = emailCheck(warehouseForm.warehouseEmail);
  if (emailError) errors.warehouseEmail = emailError;

  const leasePremiseErr = selectCheck(warehouseForm.leasePremise, "Lease Premise");
  if (leasePremiseErr) errors.leasePremise = leasePremiseErr;

        
         const leaseRegistrationErr = selectCheck(warehouseForm.leaseRegistration, "Lease Registration");
  if (leaseRegistrationErr) errors.leaseRegistration = leaseRegistrationErr;


if (warehouseForm.leaseRegistrationDate) {
  const selectedDate = new Date(warehouseForm.leaseRegistrationDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate >= today) {
    errors.leaseRegistrationDate =
      "Date of registration must be a past date";
  }
}


  const leaseRegistrationDateErr = selectCheck(warehouseForm.leaseRegistrationDate, "Lease Registration Date");
  if (leaseRegistrationDateErr) errors.leaseRegistrationDate = leaseRegistrationDateErr;


if (warehouseForm.leaseRegistrationExpiryDate) {
  const selectedDate = new Date(
    warehouseForm.leaseRegistrationExpiryDate
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    errors.leaseRegistrationExpiryDate =
      "Expiry date must be a future date";
  }
}






  const leaseRegistrationExpiryDateErr = selectCheck(warehouseForm.leaseRegistrationExpiryDate, "Lease Registration Expiry Date");
  if (leaseRegistrationExpiryDateErr) errors.leaseRegistrationExpiryDate = leaseRegistrationExpiryDateErr;

  const architectRegistrationNoErr = selectCheck(warehouseForm.architectRegistrationNo, "Architect Registration No");
  if (architectRegistrationNoErr) errors.architectRegistrationNo = architectRegistrationNoErr;

  const architectRegistrationNoValidUptoErr = selectCheck(warehouseForm.architectRegistrationNoValidUpto, "Architect Registration No Valid Upto");
  if (architectRegistrationNoValidUptoErr) errors.architectRegistrationNoValidUpto = architectRegistrationNoValidUptoErr;


if (warehouseForm.architectRegistrationNoValidUpto) {
  const selectedDate = new Date(
    warehouseForm.architectRegistrationNoValidUpto
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    errors.architectRegistrationNoValidUpto =
      "Expiry date must be a future date";
  }
}








  const superAreaofLicensePremiseErr = selectCheck(warehouseForm.superAreaofLicensePremise, "Super Area of License Premise");
  if (superAreaofLicensePremiseErr) errors.superAreaofLicensePremise = superAreaofLicensePremiseErr;

  const carpetAreaofLicensePremiseErr = selectCheck(warehouseForm.carpetAreaofLicensePremise, "Carpet Area of License Premise");
  if (carpetAreaofLicensePremiseErr) errors.carpetAreaofLicensePremise = carpetAreaofLicensePremiseErr;

const superArea = Number(warehouseForm.superAreaofLicensePremise);
const carpetArea = Number(warehouseForm.carpetAreaofLicensePremise);

if ( warehouseForm.superAreaofLicensePremise && warehouseForm.carpetAreaofLicensePremise && superArea <= carpetArea) {
  errors.superAreaofLicensePremise = "Super Area must be greater than Carpet Area";
}



  const distanceofDistilleryCPErr = selectCheck(warehouseForm.distanceofDistilleryCP, "Distance of Distillery/CP");
  if (distanceofDistilleryCPErr) errors.distanceofDistilleryCP = distanceofDistilleryCPErr;

  const hoursofSaleErr = selectCheck(warehouseForm.hoursofSale, "Hours of Sale");
  if (hoursofSaleErr) errors.hoursofSale = hoursofSaleErr;
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

export const validateAdditionalData = (additionalFrom,fssai, vat, distillery, bwh, nominee, catCode) => {
  debugger;
  const errors = {};


const addressErr = requiredCheck( additionalFrom.companyName, "company Name");
  if (addressErr) errors.companyName = addressErr;


const constitutionErr = requiredCheck( additionalFrom.constitutionType, "Constitution Type");
  if (constitutionErr) errors.constitutionType = constitutionErr;

const regDateErr = requiredCheck( additionalFrom.regDate, "Registration Date");
  if (regDateErr) errors.regDate = regDateErr;

const registrationNoErr = requiredCheck( additionalFrom.registrationNo, "Registration No");
  if (registrationNoErr) errors.registrationNo = registrationNoErr;

const vatnoErr = requiredCheck( additionalFrom.vatno, "VAT No");
  if (vatnoErr) errors.vatno = vatnoErr;





  const companyPANErr = panCheck(additionalFrom.companyPAN, "Company PAN");
  if (companyPANErr) errors.companyPAN = companyPANErr;


  // const directorsErr = validateDirectors(additionalFrom.directors);
  //   if (directorsErr) errors.directors = directorsErr;

const directorsForValidation = (additionalFrom.directors || []).map((d) => ({
  ...d,
    // Existing filename ho toh required validation pass karne ke liye
  panFile: d.panFile || (
    d.PanFileUploaded
      ? new File([""], d.PanFileUploaded, { type: "application/pdf" })
      : null
  ),

  addressFile: d.addressFile || (
    d.AddressFileUploaded
      ? new File([""], d.AddressFileUploaded, { type: "application/pdf" })
      : null
  ),
}));





const directorsErr = validateDirectors(directorsForValidation,catCode);

errors.directors = directorsErr;


// ================= FSSAI =================
const fssaiLicenceNoErr = requiredCheck( fssai.fssaiLicenceNo,"FSSAI Licence No.");
if (fssaiLicenceNoErr) errors.fssaiLicenceNo = fssaiLicenceNoErr;

const fssaiStartDateErr = requiredCheck(fssai.fssaiLicenceStartDate, "FSSAI Licence Start Date");
if (fssaiStartDateErr)errors.fssaiLicenceStartDate = fssaiStartDateErr;

const fssaiEndDateErr = requiredCheck(fssai.fssaiLicenceEndDate,"FSSAI Licence End Date");
if (fssaiEndDateErr)errors.fssaiLicenceEndDate = fssaiEndDateErr;


// ================= VAT / GST =================
const vatGstCertNoErr = requiredCheck(vat.vatGstCertNo, "VAT/GST Certificate No.");
if (vatGstCertNoErr) errors.vatGstCertNo = vatGstCertNoErr;

const vatGstEndDateErr = requiredCheck(vat.vatGstCertEnddate,"VAT/GST Certificate End Date");
if (vatGstEndDateErr) errors.vatGstCertEnddate = vatGstEndDateErr;


// ================= DISTILLERY =================
const distilleryLicNoErr = requiredCheck( distillery.distilleryLicNo,"Distillery Licence No.");
if (distilleryLicNoErr)errors.distilleryLicNo = distilleryLicNoErr;

const distilleryEndDateErr = requiredCheck(distillery.distilleryLicEnddate,"Distillery Licence End Date");
if (distilleryEndDateErr)errors.distilleryLicEnddate = distilleryEndDateErr;


// ================= BWH =================
const bwhInsuranceNoErr = requiredCheck(bwh.bwhInsuranceNo,"BWH Insurance No.");
if (bwhInsuranceNoErr) errors.bwhInsuranceNo = bwhInsuranceNoErr;

const bwhInsuranceEndDateErr = requiredCheck( bwh.bwhInsuranceEndDate,"BWH Insurance End Date");
if (bwhInsuranceEndDateErr)errors.bwhInsuranceEndDate = bwhInsuranceEndDateErr;

const bwhLeaseNoErr = requiredCheck(bwh.bwhLeaseRentAgreementNo,"BWH Lease/Rent Agreement No.");
if (bwhLeaseNoErr)errors.bwhLeaseRentAgreementNo = bwhLeaseNoErr;

const bwhRentEndDateErr = requiredCheck( bwh.bwhRentAgreementEndDate,"BWH Rent Agreement End Date");
if (bwhRentEndDateErr) errors.bwhRentAgreementEndDate = bwhRentEndDateErr;


// ================= EXCISE NOMINEE =================
if (String(nominee.isExciseNominee) === "1") {
  const nomineeNameErr = requiredCheck( nominee.exciseNomineeName,"Excise Nominee Name" );
  if (nomineeNameErr)errors.exciseNomineeName = nomineeNameErr;

  const nomineeAddressErr = requiredCheck( nominee.exciseNomineeAddress,"Excise Nominee Address");
  if (nomineeAddressErr) errors.exciseNomineeAddress = nomineeAddressErr;

  const nomineeEmailErr = requiredCheck( nominee.exciseNomineeEmailID, "Excise Nominee Email");
  if (nomineeEmailErr) errors.exciseNomineeEmailID = nomineeEmailErr;

  const nomineeMobileErr = requiredCheck( nominee.exciseNomineeMobileNo, "Excise Nominee Mobile No.");
  if (nomineeMobileErr) errors.exciseNomineeMobileNo = nomineeMobileErr;

  const nomineePANErr = requiredCheck( nominee.exciseNomineePAN, "Excise Nominee PAN");
  if (nomineePANErr) errors.exciseNomineePAN = nomineePANErr;

  // const nomineePanImageErr = validatePdfFileType(
  //   nominee.exciseNomineePanImage,
  //   "Excise Nominee PAN Document"
  // );

const nomineePanImageErr =
  !nominee?.exciseNomineePanImage &&
  !nominee?.exciseNomineePanImageUploaded
    ? "Please upload a Excise Nominee PAN Document"
    : nominee?.exciseNomineePanImage
      ? validatePdfFileType(
          nominee.exciseNomineePanImage,
          "Excise Nominee PAN Document"
        )
      : "";






  if (nomineePanImageErr)
    errors.exciseNomineePanImage = nomineePanImageErr;
}






//     const address2Error = requiredCheck(warehouseForm.warehouseAddress2, "Address Line 2");
//   if (address2Error) errors.warehouseAddress2 = address2Error;


//   // State
//   const stateErr = selectCheck(warehouseForm.warehouseState, "State");
//   if (stateErr) errors.warehouseState = stateErr;

//   const districtErr = selectCheck(warehouseForm.warehouseDistrict, "District");
//   if (districtErr) errors.warehouseDistrict = districtErr;

//   const subDivErr = selectCheck(warehouseForm.warehouseSubDivision, "Sub Division");
// if (subDivErr) errors.warehouseSubDivision = subDivErr;






  //additionalFrom
//   if (CatCode === "05" || CatCode === "31") {
//     // Check required text & code dropdown fields using your generic check
//     const numberOfBarAttendentErr = validateSiteNum(
// additionalFrom.numberOfBarAttendent,
//       "Number of Bar Attendent",
//     );
//     if (numberOfBarAttendentErr)
//       errors.numberOfBarAttendent = numberOfBarAttendentErr;

//     const numberOfDispensingCounterErr = validateSiteNum(
//       additionalFrom.numberOfDispensingCounter,
//       "Number of Dispensing Counter",
//     );
//     if (numberOfDispensingCounterErr)
//       errors.numberOfDispensingCounter = numberOfDispensingCounterErr;

//     const numberOfKitchenStaffErr = validateSiteNum(
//       additionalFrom.numberOfKitchenStaff,
//       "Number of Kitchen Staff",
//     );
//     if (numberOfKitchenStaffErr)
//       errors.numberOfKitchenStaff = numberOfKitchenStaffErr;

//     const numberOfManagersErr = validateSiteNum(
//       additionalFrom.numberOfManagers,
//       "Number of Managers",
//     );
//     if (numberOfManagersErr) errors.numberOfManagers = numberOfManagersErr;

//     const numberOfSeatCoversErr = validateSiteNum(
//       additionalFrom.numberOfSeatCovers,
//       "Number of Seat Covers",
//     );
//     if (numberOfSeatCoversErr)
//       errors.numberOfSeatCovers = numberOfSeatCoversErr;

//     const numberOfUtlityEmployeesErr = validateSiteNum(
//       additionalFrom.numberOfUtlityEmployees,
//       "Number of Utility Employees",
//     );
//     if (numberOfUtlityEmployeesErr)
//       errors.numberOfUtlityEmployees = numberOfUtlityEmployeesErr;

//     const restaurantAreaErr = validateSiteNum(
//       additionalFrom.restaurantArea,
//       "Restaurant Area",
//     );
//     if (restaurantAreaErr) errors.restaurantArea = restaurantAreaErr;

//     const additionalAreaErr = selectCheck(
//       additionalFrom.additionalArea,
//       "Additional Area",
//     );
//     if (additionalAreaErr) errors.additionalArea = additionalAreaErr;

//     const hourOfSaleErr = selectCheck(
//       additionalFrom.hourOfSale,
//       "hour of sale",
//     );
//     if (hourOfSaleErr) errors.hourOfSale = hourOfSaleErr;
//   }

 




  return errors;

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
                result.errors[doc.docId] = "Document file is required";
            }
        });
        return result;
    }

    // 3. Iterate through each document configuration to run checks
    for (let i = 0; i < filesToUpload.length; i++) {
        const doc = filesToUpload[i];
        const docId = doc.docId;
        const uploaded = uploadedFiles[docId];


        //const hasFile = !!uploaded?.file;

        const hasFile = !!(uploaded?.file ||uploaded?.existingFile); // Consider existing file as valid for validation purposes

        // Fallback cleanly to docID if docDesc is missing
        const documentName = doc.docDesc || `Document ID ${docId}`;
        let docError = "";

        // Mandatory document validation
        if (doc.isMandatory === "Y" && !hasFile) {
            // docError = `${documentName} is required`;
            docError = `Document is required`;
        }




        // // File structure and format check (runs if a file is present)
        // else if (hasFile) {
        //     const fileTypeError = validateFileObject(uploaded.file, "Document", 2, [".pdf"]);
        //     if (fileTypeError) {
        //         docError = fileTypeError;
        //     }
        // }


       // File structure and format check
     else if (uploaded?.file) {const fileTypeError = validateFileObject(uploaded.file,"Document", 2,[".pdf"]);

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

