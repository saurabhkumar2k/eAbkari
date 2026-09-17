const panRegx = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9][0-9]{9}$/;



export const panCheck = (panno) => {
  if (!panno || panno.length !== 10) return "Valid 10-digit PAN number is required";
  if (!panRegx.test(panno)) return "Enter valid PAN";
  return "";
};

export const nameCheck = (name) => {
  if (!name || name.trim() === "") return "Applicant Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};

export const emailCheck = (email) => {
  if (!email || email.trim() === "") return "Valid email address is required";
  if (!emailRegex.test(email)) return "Enter a valid email";
  return "";
};

export const mobileCheck = (mobile) => {
  if (!mobile || mobile.trim() === "") return "Valid 10-digit mobile number is required";
  if (!mobileRegex.test(mobile)) return "Enter a valid mobile number";
  return "";
};

// New helpers to match your existing form logic
export const requiredCheck = (value, fieldName) => {
  if (!value || value.trim() === "") return `${fieldName} is required`;
  return "";
};

export const pinCheck = (pin) => {
  if (!pin || pin.trim() === "" || pin.length !== 6) return "Valid 6-digit pin code is required";
  return "";
};

export const delhiPinCheck = (pin) => {
  if (!pin || pin.trim() === "" || pin.length !== 6) {
    return "Valid 6-digit pin code is required";
  }
  if (!pin.startsWith("110")) {
    return "PIN code must start with 110 for Delhi";
  }
  return "";
};

export const selectCheck = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `Please select a ${fieldName}`;
  }
  return "";
};

export const validateRestaurantNum = (value, fieldName) => {
  if (!value || value.toString().trim() === "") {
    return `${fieldName} is required`;
  }

  const parsedArea = Number(value);
  
  if (isNaN(parsedArea)) {
    return `${fieldName} must be a valid number`;
  }
  if (parsedArea <= 0) {
    return `${fieldName} must be greater than 0 `;
  }
  
  return "";
};

export const checkAnswersRequired = (questionsAnswers) => {
  // console.log("checkAnswersRequired - questionsAnswers  ", questionsAnswers)
  if (!Array.isArray(questionsAnswers) || questionsAnswers.length === 0) {
    return "Please answer all questions";
  }

  for (let i = 0; i < questionsAnswers.length; i++) {
    const answer = questionsAnswers[i]?.answerGiven;
    if (!answer || answer.toString().trim() === "") {
      return "Please answer all questions";
    }
  }

  return "";
};


export const validateDirectors = (directors) => {
  const result = {
    isValid: true,
    globalError: "",
    errors: [] 
  };

  // 1. Check if at least one director is added
  if (!Array.isArray(directors) || directors.length === 0) {
    result.isValid = false;
    result.globalError = "At least one director must be added";
    return result;
  }

  // 2. Validate each director item using your helpers
  directors.forEach((d, index) => {
    const rowErrors = {};

    // Validate PName
    const nameErr = nameCheck(d?.PName);
    if (nameErr) rowErrors.PNameErr = nameErr;

    // Validate PPanNo
    const panErr = panCheck(d?.PPanNo);
    if (panErr) rowErrors.PPanNoErr = panErr;

    // Validate PPerShare
    const shareErr = validateRestaurantNum(d?.PPerShare, "Share percentage");
    if (shareErr) rowErrors.PPerShareErr = shareErr;

    // Validate PExciseNominee
    const nomineeErr = requiredCheck(d?.PExciseNominee, "Excise Nominee selection");
    if (nomineeErr) rowErrors.PExciseNomineeErr = nomineeErr;

    // Validate PAN File existence
    if (!d?.panFile) {
      rowErrors.panFileErr = "PAN card document is required";
    }

    // Validate Address File existence
    if (!d?.addressFile) {
      rowErrors.addressFileErr = "Address proof document is required";
    }

    // If this specific row has errors, collect them and flag the complete validation as false
    if (Object.keys(rowErrors).length > 0) {
      result.isValid = false;
      result.errors[index] = rowErrors;
    } else {
      result.errors[index] = null; // No errors for this row
    }
  });

  return result;
};



