const panRegx = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9][0-9]{9}$/;

export const panCheck = (panno) => {
  if (!panno || panno.length !== 10)
    return "Valid 10-digit PAN number is required";
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
  if (!mobile || mobile.trim() === "")
    return "Valid 10-digit mobile number is required";
  if (!mobileRegex.test(mobile)) return "Enter a valid mobile number";
  return "";
};

// New helpers to match your existing form logic
export const requiredCheck = (value, fieldName) => {
  if (!value || value.trim() === "") return `${fieldName} is required`;
  return "";
};

export const pinCheck = (pin) => {
  if (!pin || pin.trim() === "" || pin.length !== 6)
    return "Valid 6-digit pin code is required";
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

export const validateSiteNum = (value, fieldName) => {
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

export const validatePdfFileType = (
  file,
  fieldName,
  allowedTypes = ["application/pdf"],
) => {
  if (!file) {
    return `Please upload a ${fieldName}`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `The ${fieldName} must be a valid PDF file`;
  }

  return "";
};

/**
 * Validates a file object based on name safety, extensions, type, and size.
 * @param {File|null|undefined} file - The file object to validate.
 * @param {string} fieldName - The human-readable name for error messages (e.g., "PAN card document").
 * @param {number} maxMb - The maximum allowed size in Megabytes.
 * @param {string[]} allowedTypes - Array of permitted mime-types (e.g., ['application/pdf']).
 * @returns {string|null} - Error message string if invalid, or null if perfectly valid.
 */
export const validateFileObject = (file, maxMb, allowedExtensions) => {
  // 1. Check existence
  if (!file) {
    return "File is required";
  }

  const fileName = file.name || "";
  const maxBytes = maxMb * 1024 * 1024;
  const nameParts = fileName.split(".");

  // Automatically generate a clean field name from the file name (e.g., "pan_card_doc.pdf" -> "Pan Card Doc")
  const baseName = nameParts.slice(0, -1).join(".");
  const cleanFieldName =
    baseName
      .replace(/[-_]/g, " ") // Turn dashes and underscores into spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) || "File"; // Capitalise first letters

  // 2. Prevent Double Extensions
  if (nameParts.length > 2) {
    return `Invalid file format. Double extensions are not allowed in "${fileName}".`;
  }

  // 3. Extract and check the Extension
  if (Array.isArray(allowedExtensions) && allowedExtensions.length > 0) {
    const fileExt = `.${nameParts[nameParts.length - 1]}`.toLowerCase();
    const targetExtensions = allowedExtensions.map((ext) => ext.toLowerCase());

    if (!targetExtensions.includes(fileExt)) {
      return `Invalid file type for "${fileName}". Allowed formats: ${allowedExtensions.join(", ")}`;
    }
  }

  // 4. Validate File Size
  if (file.size > maxBytes) {
    return `"${cleanFieldName}" size must be less than or equal to ${maxMb} MB`;
  }

  return null;
};

export const checkAnswersRequired = (questions, questionsAnswers) => {
  // 1. Guard check: If there are no questions to answer, no validation needed
  if (!Array.isArray(questions) || questions.length === 0) {
    return "";
  }

  // 2. Guard check: If there are questions but no answers array at all
  if (!Array.isArray(questionsAnswers) || questionsAnswers.length === 0) {
    return "Please answer all questions";
  }

  // 3. Create a Map or Set of answers for O(1) lightning-fast lookups
  const answeredIds = new Map(
    questionsAnswers.map((ans) => [ans.questionId, ans.answerGiven]),
  );

  // 4. Verify that every single question exists in the answers map and is not blank
  for (let i = 0; i < questions.length; i++) {
    const qId = questions[i].questionId;
    const answer = answeredIds.get(qId);

    // Checks if the question ID wasn't found, or if it is null, undefined, or empty spaces
    if (
      answer === undefined ||
      answer === null ||
      answer.toString().trim() === ""
    ) {
      return "Please answer all questions";
    }
  }

  return "";
};

export const validateDirectors = (directors) => {
  const result = {
    isValid: true,
    globalError: "",
    errors: [],
  };
  let totalShare = 0;

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
    const shareErr = validateSiteNum(d?.PPerShare, "Share percentage");

    if (shareErr) {
      rowErrors.PPerShareErr = shareErr;
    } else {
      // Safely parse or fallback to 0 to prevent NaN bugs
      totalShare += Number(d?.PPerShare || 0);
    }

    // Validate PExciseNominee
    const nomineeErr = requiredCheck(
      d?.PExciseNominee,
      "Excise Nominee selection",
    );
    if (nomineeErr) rowErrors.PExciseNomineeErr = nomineeErr;

    // Validate PAN File existence
    if (!d?.panFile) {
      rowErrors.panFileErr = "PAN card document is required";
    } else {
      // const typeError = validatePdfFileType(d.panFile, "PAN card document");
      // if (typeError) {
      //   rowErrors.panFileErr = typeError;
      // }
      const typeError = validateFileObject(d?.panFile,2, [".pdf"]);
      if (typeError) {
        rowErrors.panFileErr = typeError;
      }
    }

    // Validate Address File existence
    if (!d?.addressFile) {
      rowErrors.addressFileErr = "Address proof document is required";
    } else {
      // const typeError = validatePdfFileType(
      //   d.addressFile,
      //   "Address proof document",
      // );
      // if (typeError) {
      //   rowErrors.addressFileErr = typeError;
      // }
      const typeError = validateFileObject(d?.addressFile,2, [".pdf"]);
      if (typeError) {
        rowErrors.addressFileErr = typeError;
      }
    }

    // If this specific row has errors, collect them and flag the complete validation as false
    if (Object.keys(rowErrors).length > 0) {
      result.isValid = false;
      result.errors[index] = rowErrors;
    } else {
      result.errors[index] = null; // No errors for this row
    }
  });

  // 3. New Placement: Check totalShare after the loop has completely finished
  if (totalShare > 100) {
    result.isValid = false;
    result.globalError =
      "The total share percentage for all partners and directors must be equal to or less than 100%.";
  }

  return result;
};

export const validateRestaurantDetails = (restaurantDetails) => {
  const result = {
    isValid: true,
    globalError: "",
    errors: [],
  };

  // 1. Guard check if it doesn't exist or length is 0
  if (
    !restaurantDetails ||
    !restaurantDetails.length ||
    restaurantDetails.length === 0
  ) {
    result.isValid = false;
    result.globalError = "At least one restaurant detail must be added";
    return result;
  }

  // 2. Safe numeric loop that bypasses all array prototype/proxy limitations
  for (let index = 0; index < restaurantDetails.length; index++) {
    const restaurant = restaurantDetails[index];

    // Safety check in case the index item is empty or undefined
    if (!restaurant) continue;

    const rowErrors = {};

    // Validate NameOfAdditionalRestaurant
    const nameErr = requiredCheck(
      restaurant.NameOfAdditionalRestaurant,
      "Name of Additional Restaurant",
    );
    if (nameErr) rowErrors.NameOfAdditionalRestaurantErr = nameErr;

    // Validate HoursofSale
    const hourSaleErr = requiredCheck(restaurant.HoursofSale, "Hours of Sale");
    if (hourSaleErr) rowErrors.HoursofSaleErr = hourSaleErr;

    // Validate ForeignLiquor
    if (!restaurant.ForeignLiquor) {
      rowErrors.ForeignLiquorErr = "Foreign Liquor is Required";
    } else {
      const foreignLiquorErr = requiredCheck(
        restaurant.ForeignLiquor,
        "Foreign Liquor",
      );
      if (foreignLiquorErr) rowErrors.ForeignLiquorErr = foreignLiquorErr;
    }

    // Validate AddtionalArea
    if (!restaurant.AddtionalArea) {
      rowErrors.AddtionalAreaErr = "Additional Area is Required";
    } else {
      const addAreaErr = requiredCheck(
        restaurant.AddtionalArea,
        "Additional Area",
      );
      if (addAreaErr) rowErrors.AddtionalAreaErr = addAreaErr;
    }

    // ⚡ Conditional Constraint Rule: If AddtionalArea is "1", then HoursofSaleAddtionalArea is required
    if (restaurant.AddtionalArea === "1" || restaurant.AddtionalArea === 1) {
      if (!restaurant.HoursofSaleAddtionalArea) {
        rowErrors.HoursofSaleAddtionalAreaErr =
          "Hours of Sale for Additional Area is Required";
      } else {
        const condHourErr = requiredCheck(
          restaurant.HoursofSaleAddtionalArea,
          "Hours of Sale for Additional Area",
        );
        if (condHourErr) rowErrors.HoursofSaleAddtionalAreaErr = condHourErr;
      }
    }

    // Validate AreaSqMtr (Number Validation)
    const areaErr = validateSiteNum(restaurant.AreaSqMtr, "Area (Sq Mtr)");
    if (areaErr) rowErrors.AreaSqMtrErr = areaErr;

    // Validate NumberOfCounter (Number Validation)
    const counterErr = validateSiteNum(
      restaurant.NumberOfCounter,
      "Number of Counters",
    );
    if (counterErr) rowErrors.NumberOfCounterErr = counterErr;

    // Validate NumberOfSeatCovers (Number Validation)
    const seatErr = validateSiteNum(
      restaurant.NumberOfSeatCovers,
      "Number of Seat Covers",
    );
    if (seatErr) rowErrors.NumberOfSeatCoversErr = seatErr;

    // If this specific index has errors, collect them
    if (Object.keys(rowErrors).length > 0) {
      result.isValid = false;
      result.errors[index] = rowErrors;
    } else {
      result.errors[index] = null; // Clean state for this row
    }
  }

  return result;
};
