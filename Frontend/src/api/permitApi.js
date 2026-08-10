import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7247/api",
});

export const applyPermit = (formData) => {
    return api.post("/ApplyPermitP10", formData);
};

export const getApplicantByRegId = (RegId) => {
    return api.get(`/LicenseeCategories/GetApplicantByRegId/${RegId}`);
};

export const getLiquorCategories = () => api.get("/LiquorMaster/kind");
export const getLiquorTypes = (kindCode) => api.get(`/LiquorMaster/LiquorType/${kindCode}`);  
export const getStates = () => api.get("/LGDiretory/getState");
export const getDistricts = (stateCode) => api.get(`/LGDiretory/GetDistrict?stateCode=${stateCode}`);
export const getSubDivisions = (districtCode) => api.get(`/LGDiretory/getSubDivision?districtCode=${districtCode}`);
export const getOwnerTypes = () => api.get("/LGDiretory/GetOwnerTypes");
export const getPremises = () => api.get("/ApplyPermitP10/GetPremise");    
//export const getLiquorMeasures = () => api.get("/LiquorMaster/LiquorMeasure"); 
export const getPermitP10 = (applid) => api.get(`/ApplyPermitP10/GetPermitP10/${applid}`);

