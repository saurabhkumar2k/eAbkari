export const handleAdminNavigate = (view) => {
  console.log("Navigation:", view);

  switch (view?.trim()) {
    case "Brand":
    case "BRAND":
    case "Liquor Brand":
    case "LIQUOR BRAND":
      window.location.href = "/liquorbrand";
      break;

    case "Bottler":
    case "BOTTLER":
      window.location.href = "/bottlermaster";
      break;

    case "Brand Owner":
    case "BRAND OWNER":
    case "BrandOwner":
    case "BRANDOWNER":
      window.location.href = "/brandowner";
      break;

    case "DIR_EXCISE_LICENSE":
    case "LICENSE TITLE":
    case "License Title":
    case "LICENSE_TITLE":
    case "licensetitle":
    case "LicenseTitle":
      window.location.href = "/licensetitle";
      break;

    case "CATEGORY":
    case "Category":
    case "LICENSE CATEGORY":
    case "License Category":
    case "LICENSE_CATEGORY":
    case "licensecategory":
    case "LicenseCategory":
    case "DIR_EXCISE_CATEGORY":
      window.location.href = "/licensecategory";
      break;

    case "SUB CATEGORY":
    case "Sub Category":
    case "SUB_CATEGORY":
    case "sub-category":
    case "subcategory":
    case "LICENSE SUB CATEGORY":
    case "License Sub Category":
    case "licensesubcategory":
    case "LicenseSubCategory":
    case "DIR_EXCISE_SUB_CATEGORY":
      window.location.href = "/licensesubcategory";
      break;

    case "TRANSPORT : BULK SPIRIT":
      window.location.href = "/TransportBulkSpiritValidity";
      break;

    case "TRANSPORT : PACKAGED FL":
      window.location.href = "/TransportPackagedFL";
      break;

    case "Owner Type":
    case "OWNER TYPE":
      window.location.href = "/departmentdashboard/owner-type";
      break;

    case "IMPORT : BULK SPIRIT":
      window.location.href = "/importpermitpass";
      break;

    case "NEW USER CREATION":
      window.location.href = "/departmentdashboard/user-creation";
      break;

    case "USER CREATION":
    case "USER_CREATION":
    case "NEW_USER_CREATION":
      window.location.href = "/departmentdashboard/user-creation";
      break;

    case "USER MAINTENANCE":
      window.location.href = "/departmentdashboard/user-creation";
      break;

    case "USER HIERARCHY":
    case "USER_HIERARCHY":
    case "User Hierarchy":
    case "user-hierarchy":
    case "userhierarchy":
    case "FLOW HIERARCHY":
    case "FLOW_HIERARCHY":
    case "Flow Hierarchy":
    case "FLOW HIERARCHY MAPPING":
    case "Flow Hierarchy Mapping":
    case "flow-hierarchy":
    case "flowhierarchy":
      window.location.href = "/departmentdashboard/user-hierarchy";
      break;

    case "IMPORT : PACKAGED FL":
      window.location.href = "/importpackaged";
      break;

    case "Home":
      window.location.href = "/departmentdashboard";
      break;

    case "LOGOUT":
      window.location.href = "/";
      break;

    default:
      console.log("Unknown route:", view);
      break;
  }
};

export const handleHeaderViewSelect = (view) => {
  switch (view) {
    case 'HOME':
      window.location.href = '/';
      break;

    case 'APPLICANT_LOGIN':
      window.location.href = '/login';
      break;

    case 'DEPARTMENT_LOGIN':
      window.location.href = '/departmentlogin';
      break;

    case 'LICENSEE_LOGIN':
      window.location.href = '/licensee-login';
      break;

    case 'ABOUT_E-ABKARI':
    case 'ABOUT_EABKARI':
    case 'ABOUT_US':
    case 'ABOUT':
      if (typeof window !== "undefined" && window.location.pathname !== '/about') {
        window.location.href = '/about';
      }
      break;

    case 'ORGANIZATIONAL_STRUCTURE':
      if (typeof window !== "undefined" && window.location.pathname !== '/organizational-structure') {
        window.location.href = '/organizational-structure';
      }
      break;

    case 'FEEDBACK_FORM':
    case 'FEEDBACK':
      window.location.href = '/feedback';
      break;

    case 'STAFF':
      if (typeof window !== "undefined" && window.location.pathname !== '/staff') {
        window.location.href = '/staff';
      }
      break;

    case 'FEEDBACK_STATUS':
      window.location.href = '/feedback?tab=track';
      break;

    case 'LICENSES_ADMINISTERED':
    case 'FACTS_FIGURES':
      if (typeof window !== "undefined" && window.location.pathname !== '/licenses-administered') {
        window.location.href = '/licenses-administered';
      }
      break;

    case 'RTI':
    case 'RIGHT_TO_INFORMATION':
    case 'RIGHT-TO-INFORMATION':
      if (typeof window !== "undefined" && window.location.pathname !== '/rti') {
        window.location.href = '/rti';
      }
      break;

    default:
      window.location.href = '/';
  }
};
