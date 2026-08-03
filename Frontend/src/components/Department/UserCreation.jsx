import React, { useState } from "react";
import {
  ChevronLeft,
  UserPlus,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  UserCheck,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Save,
  RotateCcw
} from "lucide-react";

const DEFAULT_USERS = [
  {
    userId: "EXCISE_ADMIN_01",
    userName: "Rajesh Kumar",
    userType: "Department User",
    userTitle: "Assistant Commissioner",
    district: "NCT of Delhi",
    userAccess: "Full Access",
    mobileNo: "9876543210",
    email: "rajesh.excise@delhi.gov.in",
    userStatus: "Active"
  },
  {
    userId: "INSPECT_ND_04",
    userName: "Suresh Sharma",
    userType: "Inspection Officer",
    userTitle: "Excise Inspector",
    district: "NEW DELHI",
    userAccess: "Inspection Access",
    mobileNo: "9812345678",
    email: "suresh.inspector@delhi.gov.in",
    userStatus: "Active"
  }
];

export default function UserCreation({ onBack }) {
  const [formData, setFormData] = useState({
    userType: "",
    district: "NCT of Delhi",
    userId: "",
    userAccess: "",
    userName: "",
    userTitle: "",
    mobileNo: "",
    email: "",
    userStatus: ""
  });

  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("create"); // 'create' | 'list'
  const [searchTerm, setSearchTerm] = useState("");

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("dept_created_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_USERS;
  });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userType) newErrors.userType = "User Type is required";
    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
    } else if (formData.userId.length > 25) {
      newErrors.userId = "User ID length maximum 25 characters";
    }
    if (!formData.userAccess) newErrors.userAccess = "User Access is required";
    if (!formData.userName.trim()) newErrors.userName = "User Name is required";
    if (!formData.userTitle.trim()) newErrors.userTitle = "User Title is required";
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile No is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo.trim())) {
      newErrors.mobileNo = "Enter valid 10-digit mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.userStatus) newErrors.userStatus = "User Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("error", "Please fill in all mandatory fields marked with *");
      return;
    }

    // Check duplicate User ID
    const exists = usersList.some(
      (u) => u.userId.toLowerCase() === formData.userId.trim().toLowerCase()
    );
    if (exists) {
      setErrors({ userId: "User ID already exists" });
      showToast("error", "User ID already exists. Please enter a unique User ID.");
      return;
    }

    const newUser = {
      ...formData,
      userId: formData.userId.trim(),
      userName: formData.userName.trim(),
      userTitle: formData.userTitle.trim(),
      mobileNo: formData.mobileNo.trim(),
      email: formData.email.trim()
    };

    const updatedList = [newUser, ...usersList];
    setUsersList(updatedList);
    localStorage.setItem("dept_created_users", JSON.stringify(updatedList));

    showToast("success", `User '${newUser.userId}' created successfully!`);

    // Reset form
    setFormData({
      userType: "",
      district: "NCT of Delhi",
      userId: "",
      userAccess: "",
      userName: "",
      userTitle: "",
      mobileNo: "",
      email: "",
      userStatus: ""
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      userType: "",
      district: "NCT of Delhi",
      userId: "",
      userAccess: "",
      userName: "",
      userTitle: "",
      mobileNo: "",
      email: "",
      userStatus: ""
    });
    setErrors({});
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/departmentdashboard";
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-creation-container">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-md shadow-lg border text-sm font-semibold transition-all duration-200 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation & Breadcrumbs */}
      <div className="user-creation-top-bar">
        {/* <button type="button" onClick={handleCancel} className="user-creation-back-btn">
          <ChevronLeft />
          <span>Back to Department Dashboard</span>
        </button> */}

        <div className="flex items-center gap-4">
          <div className="user-creation-breadcrumb">
            <span>House Keeping</span>
            <span>/</span>
            <span className="user-creation-breadcrumb-active">User Creation</span>
          </div>

          {/* View Switcher Tabs */}
          <div className="user-creation-tab-group">
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`user-creation-tab-btn ${activeTab === "create" ? "active" : ""}`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              New Creation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`user-creation-tab-btn ${activeTab === "list" ? "active" : ""}`}
            >
              <Users className="w-3.5 h-3.5" />
              User Directory ({usersList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="user-creation-card">
        {/* Dynamic Header Section with Ribbon */}
        <div className="user-creation-header-section">
          <div className="user-creation-header-row">
            <div className="user-creation-brand-block">
              <div className="user-creation-icon-wrapper">
                <UserCheck />
              </div>
              <div className="user-creation-title-block">
                <h1>User Creation & Access Control</h1>
                <p>Register official department users, specify district jurisdictions, and assign portal access privileges.</p>
              </div>
            </div>

            {/* Transport Page Styled Arrow Ribbon */}
            <div className="user-creation-ribbon-wrapper">
              <div className="user-creation-ribbon-container">
                <div className="user-creation-ribbon-arrow"></div>
                <div className="user-creation-ribbon-body">User Creation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="user-creation-body">
          {activeTab === "create" ? (
            /* FORM FIELDSET */
            <fieldset className="user-creation-fieldset">
              <legend className="user-creation-legend">User Details</legend>

              <div className="user-creation-mandatory-notice">
                * Marked Fields are mandatory
              </div>

              <form onSubmit={handleSave} className="user-creation-form-grid">
                {/* User Type */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User Type <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <select
                      value={formData.userType}
                      onChange={(e) => handleInputChange("userType", e.target.value)}
                      className="user-creation-input"
                    >
                      <option value="">--Select--</option>
                      <option value="Department User">Department User</option>
                      <option value="District User">District User</option>
                      <option value="Inspection Officer">Inspection Officer</option>
                      <option value="Superintendent">Superintendent</option>
                      <option value="System Administrator">System Administrator</option>
                    </select>
                    {errors.userType && (
                      <span className="user-creation-subtext">{errors.userType}</span>
                    )}
                  </div>
                </div>

                {/* District */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">District</label>
                  <div className="user-creation-input-wrap">
                    <select
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="user-creation-input"
                    >
                      <option value="NCT of Delhi">NCT of Delhi</option>
                      <option value="NEW DELHI">NEW DELHI</option>
                      <option value="WEST DELHI">WEST DELHI</option>
                      <option value="NORTH DELHI">NORTH DELHI</option>
                      <option value="SOUTH DELHI">SOUTH DELHI</option>
                      <option value="EAST DELHI">EAST DELHI</option>
                      <option value="CENTRAL DELHI">CENTRAL DELHI</option>
                      <option value="NORTH WEST DELHI">NORTH WEST DELHI</option>
                      <option value="SOUTH WEST DELHI">SOUTH WEST DELHI</option>
                    </select>
                  </div>
                </div>

                {/* User ID */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User ID <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <input
                      type="text"
                      value={formData.userId}
                      onChange={(e) => handleInputChange("userId", e.target.value)}
                      className="user-creation-input"
                    />
                    <span className="user-creation-subtext">
                      (Enter alphabets, numeric, special character '-, . , /' & length maximum 25.)
                    </span>
                    {errors.userId && (
                      <span className="user-creation-subtext font-bold">{errors.userId}</span>
                    )}
                  </div>
                </div>

                {/* User Access */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User Access <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <select
                      value={formData.userAccess}
                      onChange={(e) => handleInputChange("userAccess", e.target.value)}
                      className="user-creation-input"
                    >
                      <option value="">--Select--</option>
                      <option value="Full Access">Full Access</option>
                      <option value="Read Only">Read Only</option>
                      <option value="Approval Access">Approval Access</option>
                      <option value="Inspection Access">Inspection Access</option>
                    </select>
                    {errors.userAccess && (
                      <span className="user-creation-subtext">{errors.userAccess}</span>
                    )}
                  </div>
                </div>

                {/* User Name */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User Name <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => handleInputChange("userName", e.target.value)}
                      className="user-creation-input"
                    />
                    {errors.userName && (
                      <span className="user-creation-subtext">{errors.userName}</span>
                    )}
                  </div>
                </div>

                {/* User Title */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User Title <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <input
                      type="text"
                      value={formData.userTitle}
                      onChange={(e) => handleInputChange("userTitle", e.target.value)}
                      className="user-creation-input"
                    />
                    {errors.userTitle && (
                      <span className="user-creation-subtext">{errors.userTitle}</span>
                    )}
                  </div>
                </div>

                {/* Mobile No */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    Mobile No <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <input
                      type="text"
                      maxLength={10}
                      value={formData.mobileNo}
                      onChange={(e) =>
                        handleInputChange("mobileNo", e.target.value.replace(/\D/g, ""))
                      }
                      className="user-creation-input user-creation-input-short"
                    />
                    {errors.mobileNo && (
                      <span className="user-creation-subtext">{errors.mobileNo}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    Email <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="user-creation-input"
                    />
                    {errors.email && (
                      <span className="user-creation-subtext">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* User Status */}
                <div className="user-creation-form-group">
                  <label className="user-creation-label">
                    User Status <span className="user-creation-req">*</span>
                  </label>
                  <div className="user-creation-input-wrap">
                    <select
                      value={formData.userStatus}
                      onChange={(e) => handleInputChange("userStatus", e.target.value)}
                      className="user-creation-input"
                    >
                      <option value="">--Select--</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                    {errors.userStatus && (
                      <span className="user-creation-subtext">{errors.userStatus}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="user-creation-actions">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="user-creation-btn-cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="user-creation-btn-save">
                    <Save className="w-3.5 h-3.5 inline" /> Save
                  </button>
                </div>
              </form>
            </fieldset>
          ) : (
            /* USER DIRECTORY TAB */
            <div className="user-creation-list-card">
              <div className="user-creation-list-header">
                <h3 className="user-creation-list-title">
                  <Users className="w-4 h-4 text-sky-600" /> Registered Department Users
                </h3>
                <div className="relative w-64">
                  <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, ID, district..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              <div className="user-creation-table-wrapper">
                <table className="user-creation-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>District</th>
                      <th>Access Level</th>
                      <th>Mobile</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-slate-500 font-medium">
                          No matching user records found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u, idx) => (
                        <tr key={idx}>
                          <td className="font-mono font-bold text-sky-700">{u.userId}</td>
                          <td className="font-semibold text-slate-900">{u.userName}</td>
                          <td>{u.userTitle}</td>
                          <td>{u.userType}</td>
                          <td>{u.district}</td>
                          <td>{u.userAccess}</td>
                          <td>{u.mobileNo}</td>
                          <td>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                                u.userStatus === "Active"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {u.userStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
