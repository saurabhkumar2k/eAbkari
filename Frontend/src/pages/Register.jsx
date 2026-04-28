import React, { useState, useEffect } from "react";

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <label style={{ fontWeight: "bold", color: "#000" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        transition: "0.3s",
      }}
      onFocus={(e) => (e.target.style.border = "1px solid #000")}
      onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
    />
  </div>
);

const Registration = () => {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    FatherHusbandName: "",
    Occupation: "",
    DateOfBirth: "",
    Address: "",
    Gender: "",
    StateUT: "",
    District: "",
    PIN: "",
    PanNo: "",
    Email: "",
    Mobile: "",
    SecretQuestionId: "",
    SecretAnswer: "",
    Photo: null,
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  // ✅ Common dropdown style
  const selectStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    width: "100%",
    transition: "0.3s",
  };

  useEffect(() => {
    fetch("https://localhost:5050/api/master/states")
      .then(res => res.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  const handleStateChange = (e) => {
    const stateCode = e.target.value;

    setForm(prev => ({
      ...prev,
      StateUT: stateCode,
      District: ""
    }));

    fetch(`https://localhost:5050/api/StateDist/Districts/${stateCode}`)
      .then(res => res.json())
      .then(setDistricts)
      .catch(console.error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm(prev => ({ ...prev, Photo: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) formData.append(key, form[key]);
    });

    formData.append("RegBy", "Self");
    formData.append("Password", "123456");
    formData.append("LoginStatus", "A");

    try {
      const res = await fetch("https://localhost:5050/api/registration/register", {
       
        method: "POST",
        body: formData,
        
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful ✅");
      } else {
        alert(data);
      }
    } catch {
      alert("API Error ❌");
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%",
        maxWidth: "1000px",
        padding: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "12px"
      }}>

        <h2 style={{
          textAlign: "center",
          background: "#e6e6e6",
          padding: "12px",
          borderRadius: "8px"
        }}>
          New Applicant Registration Form
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px"
          }}>

            <Input label="First Name" name="FirstName" value={form.FirstName} onChange={handleChange} />
            <Input label="Last Name" name="LastName" value={form.LastName} onChange={handleChange} />

            <Input label="Father/Husband Name" name="FatherHusbandName" value={form.FatherHusbandName} onChange={handleChange} />
            <Input label="Occupation" name="Occupation" value={form.Occupation} onChange={handleChange} />

            <Input label="Date of Birth" type="date" name="DateOfBirth" value={form.DateOfBirth} onChange={handleChange} />
            <Input label="Mobile" name="Mobile" value={form.Mobile} onChange={handleChange} />

            {/* Gender FULL ROW */}
            {/* <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontWeight: "bold" }}>Gender</label>
              <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
                <label><input type="radio" name="Gender" value="1" checked={form.Gender === "1"} onChange={handleChange}/> Male</label>
                <label><input type="radio" name="Gender" value="2" checked={form.Gender === "2"} onChange={handleChange}/> Female</label>
                <label><input type="radio" name="Gender" value="3" checked={form.Gender === "3"} onChange={handleChange}/> Other</label>
              </div>
            </div> */}

            <div style={{ gridColumn: "1 / -1" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    
    <label style={{ fontWeight: "bold", minWidth: "80px" }}>
      Gender
    </label>

    <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <input
        type="radio"
        name="Gender"
        value="1"
        checked={form.Gender === "1"}
        onChange={handleChange}
      />
      Male
    </label>

    <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <input
        type="radio"
        name="Gender"
        value="2"
        checked={form.Gender === "2"}
        onChange={handleChange}
      />
      Female
    </label>

    <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <input
        type="radio"
        name="Gender"
        value="3"
        checked={form.Gender === "3"}
        onChange={handleChange}
      />
      Other
    </label>

  </div>
</div>

            {/* Address FULL ROW */}
            <div style={{ gridColumn: "1 / -1" }}>
              <Input label="Address" name="Address" value={form.Address} onChange={handleChange} />
            </div>

            {/* State */}
            <div>
              <label style={{ fontWeight: "bold", color: "#000" }}>State</label>
              <select
                name="StateUT"
                value={form.StateUT}
                onChange={handleStateChange}
                style={selectStyle}
                onFocus={(e) => (e.target.style.border = "1px solid #000")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              >
                <option value="">Select</option>
                {states.map((s, i) => (
                  <option key={i} value={s.stateCode}>{s.stateName}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label style={{ fontWeight: "bold", color: "#000" }}>District</label>
              <select
                name="District"
                value={form.District}
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => (e.target.style.border = "1px solid #000")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              >
                <option value="">Select</option>
                {districts.map((d, i) => (
                  <option key={i} value={d.districtCode}>{d.districtName}</option>
                ))}
              </select>
            </div>

            <Input label="PIN" name="PIN" value={form.PIN} onChange={handleChange} />
            <Input label="PAN" name="PanNo" value={form.PanNo} onChange={handleChange} />

            <Input label="Email" name="Email" value={form.Email} onChange={handleChange} />

            {/* Secret Question */}
            <div>
              <label style={{ fontWeight: "bold", color: "#000" }}>Secret Question</label>
              <select
                name="SecretQuestionId"
                value={form.SecretQuestionId}
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => (e.target.style.border = "1px solid #000")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              >
                <option value="">Select</option>
                <option value="1">Your Pet Name?</option>
                <option value="2">Your School Name?</option>
              </select>
            </div>

            {/* Secret Answer FULL ROW */}
            <div style={{ gridColumn: "1 / -1" }}>
              <Input label="Secret Answer" name="SecretAnswer" value={form.SecretAnswer} onChange={handleChange} />
            </div>

            {/* Photo Upload FULL ROW */}
           
<div style={{ gridColumn: "1 / -1" }}>
    <label style={{ fontWeight: "bold" }}>Upload Photo</label>
	<div onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {  e.preventDefault();
			  const file = e.dataTransfer.files[0];

				if (file) {
					setForm(prev => ({
					...prev,
					Photo: file
				}));
    setPhotoPreview(URL.createObjectURL(file));
  }
}}
                style={{
                  marginTop: "8px",
                  padding: "20px",
                  border: "2px dashed #999",
                  borderRadius: "10px",
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                  position: "relative",
                }}
            >
                <p style={{ margin: 0, color: "#555" }}>
                  Drag & Drop Photo here or Click to Upload
                </p>

                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
    </div>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  style={{ marginTop: "10px", width: "100px", borderRadius: "8px" }}
                />
            )}
</div>

          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="submit" style={{
              padding: "10px 25px",
              background: "#000",
              color: "#fff",
              borderRadius: "8px"
            }}>
              Register
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Registration;