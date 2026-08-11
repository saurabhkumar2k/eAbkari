import React, { useEffect, useState } from "react";
import {
  getApplicantByRegId,
  getStates,
  getDistricts,
  getSubDivisions
} from "../../../../api/permitApi";
import {
  User,
  Calendar,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building,
  Hash,
  Compass,
  Loader2
} from "lucide-react";

const pickByPattern = (item, patterns) => {
  const keys = Object.keys(item || {});
  for (const pattern of patterns) {
    const found = keys.find((k) => pattern.test(k));
    if (found && item[found] !== null && item[found] !== undefined) {
      return item[found];
    }
  }
  return undefined;
};

const normalizeOption = (item) => {
  if (item === null || typeof item !== "object") {
    return { code: String(item ?? "").trim(), name: String(item ?? "").trim() };
  }
  const code = pickByPattern(item, [/^code$/i, /^id$/i, /^value$/i, /code$/i, /^.*id$/i]);
  const name = pickByPattern(item, [/^name$/i, /^label$/i, /name$/i, /label$/i]);
  return { code: String(code ?? "").trim(), name: String(name ?? "").trim() };
};

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["data", "Data", "result", "Result", "items", "Items", "list", "List"]) {
      if (Array.isArray(payload[key])) return payload[key];
    }
    const firstArray = Object.values(payload).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
  }
  return [];
};

const resolveOption = (rawValue, options) => {
  if (!rawValue) return null;
  const needle = String(rawValue).trim().toLowerCase();
  if (!needle) return null;
  return (
    options.find((o) => o.code.toLowerCase() === needle) ||
    options.find((o) => o.name.toLowerCase() === needle) ||
    null
  );
};

export default function ApplicantDetails({ formData, onChange, errors = {}, showToast }) {
  const [loadingApplicant, setLoadingApplicant] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDivisions, setSubDivisions] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubDivisions, setLoadingSubDivisions] = useState(false);

 const [pendingLocation, setPendingLocation] = useState({
    state: null,
    district: null,
    subDivision: null
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const regId = formData.regId;
    if (!regId) return;

    let isCancelled = false;

    const fetchApplicantDetails = async () => {
      setLoadingApplicant(true);
      setFetchError(null);

      try {
        const response = await getApplicantByRegId(regId);
        if (isCancelled) return;

        const data = response.data;

        if (data) {
          if (data.firstName != null || data.lastName != null) {
            const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
            onChange("applicantName", fullName.toUpperCase());
          }
          if (data.dateOfBirth != null) {
            const dobOnly = String(data.dateOfBirth).split("T")[0];
            onChange("dob", dobOnly);
          }
          if (data.fatherHusbandName != null) onChange("fatherName", data.fatherHusbandName);
          if (data.occupation != null) onChange("occupation", data.occupation);
          if (data.panNo != null) onChange("panNo", data.panNo);
          if (data.addressLine1 != null) onChange("address1", data.addressLine1);
          if (data.addressLine2 != null) onChange("address2", data.addressLine2);
          if (data.pin != null) onChange("pin", data.pin);
          if (data.mobile != null) onChange("mobile", data.mobile);
          if (data.email != null) onChange("email", data.email);
          if (data.landline != null) onChange("landline", data.landline);

          setPendingLocation({
            state: data.stateUT != null ? String(data.stateUT).trim() : null,
            district: data.district != null ? String(data.district).trim() : null,
            subDivision: data.subDivision != null ? String(data.subDivision).trim() : null
          });
        }

        if (showToast) showToast("Applicant details loaded from registry", "success");
      } catch (error) {
        if (isCancelled) return;
        console.error("Failed to fetch applicant details:", error);
        setFetchError("Could not load applicant details from registry");
        if (showToast) showToast("Failed to load applicant details", "error");
      } finally {
        if (!isCancelled) {
          setLoadingApplicant(false);
          setIsInitialLoad(false);
        }
      }
    };

    fetchApplicantDetails();
    return () => { isCancelled = true; };
   
  }, [formData.regId]);

 
  useEffect(() => {
    let isCancelled = false;

    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await getStates();
        if (isCancelled) return;
        const list = extractList(response.data);
        if (list.length === 0) {
          console.warn("getStates() returned no array — raw response:", response.data);
        }
        setStates(list.map(normalizeOption));
      } catch (error) {
        console.error("Failed to fetch states:", error);
        if (showToast) showToast("Failed to load states list", "error");
      } finally {
        if (!isCancelled) setLoadingStates(false);
      }
    };

    fetchStates();
    return () => { isCancelled = true; };
    
  }, []);


  useEffect(() => {
    if (!pendingLocation.state || states.length === 0) return;
    const match = resolveOption(pendingLocation.state, states);
    if (match) {
      onChange("state", match.code);
    } else {
      console.warn(`Registry state "${pendingLocation.state}" not found in states list`);
    }
   
    setPendingLocation((prev) => ({ ...prev, state: null }));
  
  }, [pendingLocation.state, states]);

 
  useEffect(() => {
    const stateCode = formData.state;
    if (!stateCode) {
      setDistricts([]);
      return;
    }

    let isCancelled = false;

    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const response = await getDistricts(stateCode);
        if (isCancelled) return;
        const list = extractList(response.data);
        if (list.length === 0) {
          console.warn(`getDistricts("${stateCode}") returned no array — raw response:`, response.data);
        }
        const normalized = list.map(normalizeOption);
        if (list.length > 0 && normalized.every((d) => !d.code)) {
          console.warn("Districts loaded but every code came back empty — check property names:", list[0]);
        }
        setDistricts(normalized);

        if (!isInitialLoad) {
          const stillValid = normalized.some((d) => d.code === formData.district);
          if (!stillValid) {
            onChange("district", "");
            onChange("subDivision", "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch districts:", error);
        if (showToast) showToast("Failed to load districts list", "error");
      } finally {
        if (!isCancelled) setLoadingDistricts(false);
      }
    };

    fetchDistricts();
    return () => { isCancelled = true; };
  
  }, [formData.state]);
 
  useEffect(() => {
    if (!pendingLocation.district || districts.length === 0) return;
    const match = resolveOption(pendingLocation.district, districts);
    if (match) {
      onChange("district", match.code);
    } else {
      console.warn(`Registry district "${pendingLocation.district}" not found in districts list`);
    }
    setPendingLocation((prev) => ({ ...prev, district: null }));
   
  }, [pendingLocation.district, districts]);

  useEffect(() => {
    const districtCode = formData.district;
    if (!districtCode) {
      setSubDivisions([]);
      return;
    }

    let isCancelled = false;
    const fetchSubDivisions = async () => {
      setLoadingSubDivisions(true);
      try {
        const response = await getSubDivisions(districtCode);
        if (isCancelled) return;
        console.log(`getSubDivisions("${districtCode}") raw response:`, response.data);
        const list = extractList(response.data);
        if (list.length === 0) {
          console.warn(`getSubDivisions("${districtCode}") returned no array — raw response above.`);
        }
        const normalized = list.map(normalizeOption);
        if (list.length > 0 && normalized.every((s) => !s.code)) {
          console.warn("Sub-divisions loaded but every code came back empty — check property names:", list[0]);
        }
        setSubDivisions(normalized);
        if (!isInitialLoad) {
          const stillValid = normalized.some((s) => s.code === formData.subDivision);
          if (!stillValid) {
            onChange("subDivision", "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch sub-divisions:", error);
        if (showToast) showToast("Failed to load sub-divisions list", "error");
      } finally {
        if (!isCancelled) setLoadingSubDivisions(false);
      }
    };

    fetchSubDivisions();
    return () => { isCancelled = true; };
   
  }, [formData.district]);

 
  useEffect(() => {
    if (!pendingLocation.subDivision || subDivisions.length === 0) return;
    const match = resolveOption(pendingLocation.subDivision, subDivisions);
    if (match) {
      onChange("subDivision", match.code);
    } else {
      console.warn(`Registry sub-division "${pendingLocation.subDivision}" not found in list`);
    }
    setPendingLocation((prev) => ({ ...prev, subDivision: null }));    
    setIsInitialLoad(false);   
  }, [pendingLocation.subDivision, subDivisions]);

  const handleStateChange = (value) => {
    onChange("state", value);
    onChange("district", "");
    onChange("subDivision", "");
  };

  const handleDistrictChange = (value) => {
    onChange("district", value);
    onChange("subDivision", "");
  };

  return (
    <div className="app-form-section">
      {/* Informational banner reflecting registered status */}
      <div className="reciept">
        <div className="app-icon-box">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-blue-900">Pre-filled Registered Profile Information</h4>
          <p className="text-xs text-blue-700/85 mt-0.5 leading-relaxed">
            These applicant details are loaded automatically from your online user registry record. You can review and verify the demographic, residential, and verification fields.
          </p>
          {loadingApplicant && (
            <p className="text-xs text-blue-700 mt-2 flex items-center gap-1.5 font-bold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Loading applicant details...
            </p>
          )}
          {fetchError && (
            <p className="text-xs text-red-600 mt-2 font-bold">{fetchError}</p>
          )}
        </div>
      </div>

      {/* Section 1: Personal Details */}
      <div className="appform-card">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            Personal Details
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Your legal credentials used during Delhi Excise Portal profile registration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Applicant Name */}
          <div className="reg-field">
            <label className="reg-label">
              Applicant Name <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Enter applicant name"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.applicantName ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.applicantName || ""}
                onChange={(e) => onChange("applicantName", e.target.value.toUpperCase())}
              />
            </div>
            {errors.applicantName && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.applicantName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="reg-field">
            <label className="reg-label">
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="date"
                className={`reg-input font-bold text-slate-800 ${
                  errors.dob ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.dob || ""}
                onChange={(e) => onChange("dob", e.target.value)}
              />
            </div>
            {errors.dob && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Father's Name */}
          <div className="reg-field">
            <label className="reg-label">Father / Husband Name</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Father's / Husband's Name"
                className="reg-input uppercase font-bold text-slate-800"
                value={formData.fatherName || ""}
                onChange={(e) => onChange("fatherName", e.target.value.toUpperCase())}
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="reg-field">
            <label className="reg-label">
              Occupation <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="E.g. BUSINESS"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.occupation ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.occupation || ""}
                onChange={(e) => onChange("occupation", e.target.value.toUpperCase())}
              />
            </div>
            {errors.occupation && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.occupation}</p>
            )}
          </div>

          {/* PAN No */}
          <div className="reg-field">
            <label className="reg-label">
              PAN Number <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                className={`reg-input uppercase font-mono font-bold text-slate-800 ${
                  errors.panNo ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.panNo || ""}
                onChange={(e) => onChange("panNo", e.target.value.toUpperCase())}
              />
            </div>
            {errors.panNo && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.panNo}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Address Details */}
      <div className="appform-card">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            Residential Address Details
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Your permanent address coordinates for official licensing records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Address 1 */}
          <div className="reg-field md:col-span-2 lg:col-span-3">
            <label className="reg-label">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="HOUSE / PLOT NO, BUILDING, STREET"
                className={`reg-input font-bold text-slate-800 ${
                  errors.address1 ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.address1 || ""}
                onChange={(e) => onChange("address1", e.target.value)}
              />
            </div>
            {errors.address1 && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.address1}</p>
            )}
          </div>

          {/* Address 2 */}
          <div className="reg-field md:col-span-2 lg:col-span-3">
            <label className="reg-label">Address Line 2</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="LOCALITY, AREA, NEAREST LANDMARK"
                className="reg-input font-bold text-slate-800"
                value={formData.address2 || ""}
                onChange={(e) => onChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="reg-field">
            <label className="reg-label">
              State {loadingStates && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
              <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.state || ""}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option value="">--Select--</option>
                {states.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.state && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.state}</p>
            )}
          </div>

          {/* District */}
          <div className="reg-field">
            <label className="reg-label">
              District {loadingDistricts && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
              <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.district || ""}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!formData.state}
              >
                <option value="">--Select--</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.district && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.district}</p>
            )}
          </div>

          {/* Sub Division */}
          <div className="reg-field">
            <label className="reg-label">
              Sub Division {loadingSubDivisions && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
              <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.subDivision || ""}
                onChange={(e) => onChange("subDivision", e.target.value)}
                disabled={!formData.district}
              >
                <option value="">--Select--</option>
                {subDivisions.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.subDivision && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.subDivision}</p>
            )}
          </div>

          {/* PIN */}
          <div className="reg-field">
            <label className="reg-label">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Hash className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={6}
                placeholder="110017"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.pin ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.pin || ""}
                onChange={(e) => onChange("pin", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.pin && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.pin}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Contact & Access */}
      <div className="appform-card">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            Contact Details
          </h3>
          <p className="text-[11px] text-slate-440 mt-0.5">
            Active contact information for receiving validation tokens, OTPs, and permit PDF email notifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mobile */}
          <div className="reg-field">
            <label className="reg-label">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="Enter 10-digit mobile"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.mobile ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.mobile || ""}
                onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.mobile && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div className="reg-field">
            <label className="reg-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="email"
                placeholder="Enter email address"
                className={`reg-input font-bold text-slate-800 ${
                  errors.email ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.email}</p>
            )}
          </div>

          {/* Landline */}
          <div className="reg-field">
            <label className="reg-label">Landline Number</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Landline Number "
                className="reg-input font-bold text-slate-800"
                value={formData.landline || ""}
                onChange={(e) => onChange("landline", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
