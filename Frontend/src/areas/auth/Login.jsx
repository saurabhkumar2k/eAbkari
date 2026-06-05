import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  UserSvg, 
  LockSvg, 
  ShieldSvg, 
  HeadphonesSvg, 
  GlobeSvg,
  ChevronDownSvg,
  EyeSvg
} from '../../Style/images/Icons';

const LOGIN_API_URL = 'http://localhost:5214/api/Login/Login';

const Login = ({ onNavigateToRegister, onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
 const [successMessage, setSuccessMessage] = useState("");
 const navigate = useNavigate();
  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);


    

  try {
  const response = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: userId.trim(),
      password: password.trim()
    })
  });

  const data = await response.json();

  console.log("API Response:", data);

  if (!response.ok) {
    setErrorMessage(data.message || "Login failed");
    return;
  }
setSuccessMessage("Login Successful");
// window.location.href = data.redirectUrl;
navigate("/applicantdashboard");
  if (data.success === false) {
    setErrorMessage(data.message || "Invalid credentials");
    return;
  }

 alert("Login Successful");

 if (onLoginSuccess) {

  onLoginSuccess(data);
}

} catch (error) {
  console.error(error);
  setErrorMessage(error.message || "Unable to connect");
} finally {
  setIsSubmitting(false);
}
  };  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left Side: Branding & Info */}
        <div className="login-info-panel">
          <div className="login-info-content">
            <div className="login-dept-header">
               <div className="login-dept-box">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="Emblem" 
                    className="login-emblem" 
                  />
                  <div>
                    <h2 className="login-dept-title">Department of Excise</h2>
                    <p className="login-dept-subtitle">Government of NCT of Delhi</p>
                  </div>
               </div>
            </div>

            <div className="welcome-section">
               <h1 className="welcome-title">Welcome Back!</h1>
               <p className="welcome-subtitle">
                 Sign in to access your account and manage your services seamlessly.
               </p>
               <div className="welcome-line" />
            </div>

            <div className="info-feature-list">
               <div className="info-feature-item">
                  <div className="info-feature-icon">
                    <ShieldSvg className="icon-md" />
                  </div>
                  <div>
                    <h3 className="feature-title-white">Secure & Reliable</h3>
                    <p className="feature-desc-white">Your data is safe with highest security standards</p>
                  </div>
               </div>
               <div className="info-feature-item">
                  <div className="info-feature-icon">
                    <UserSvg className="icon-md" />
                  </div>
                  <div>
                    <h3 className="feature-title-white">Citizen Friendly</h3>
                    <p className="feature-desc-white">Simple and easy access to government services</p>
                  </div>
               </div>
               <div className="info-feature-item">
                  <div className="info-feature-icon">
                    <HeadphonesSvg className="icon-md" />
                  </div>
                  <div>
                    <h3 className="feature-title-white">24/7 Support</h3>
                    <p className="feature-desc-white">We're here to help you anytime, anywhere</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="login-info-footer">
             <p className="login-footer-text">© 2024 Department of Excise, Government of NCT of Delhi. All rights reserved.</p>
          </div>
          
          {/* Decorative Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1000" 
            alt="" 
            className="login-panel-bg" 
          />
          <div className="login-panel-overlay" />
        </div>

        {/* Right Side: Form */}
        <div className="login-form-panel">
          <div className="language-selector-top">
            <button className="lang-btn" type="button">
              <GlobeSvg className="icon-xs" />
              <span>English</span>
              <ChevronDownSvg className="icon-xs" />
            </button>
          </div>

          <div className="login-form-container">
            <div className="login-form-box">
              <div className="form-header-icon-circle">
                <UserSvg className="icon-lg login-color-primary" />
              </div>
               
              <h1 className="login-form-title">Login</h1>
              <p className="login-form-subtitle">Enter your credentials to continue</p>

              <form className="login-form-fields" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="reg-label-block">User ID / Email</label>
                  <div className="login-input-group">
                    <div className="login-input-icon"><UserSvg className="icon-sm" /></div>
                    {/* <input type="text"  placeholder="Enter User ID or Email" className="login-input-field" /> */}
                    <input
                      type="text"
                      placeholder="Enter User ID or Email"
                      className="login-input-field"
                      value={userId}
                      onChange={(event) => setUserId(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="reg-label-block">Password</label>
                  <div className="login-input-group">
                    <div className="login-input-icon"><LockSvg className="icon-sm" /></div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      className="login-input-field padding-right-large"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <EyeSvg className="icon-sm" />
                    </button>
                  </div>
                </div>

                <div className="login-options-row">
                  <label className="checkbox-flex-label">
                    <input type="checkbox" className="reg-checkbox-small" />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <button type="button" className="forgot-password-link">
                    Forgot Password?
                  </button>
                </div>

                {errorMessage && (
                  <div className="login-error-message">{errorMessage}</div>
                )}

                <button 
                  type="submit" 
                  className="login-btn-submit"
                  disabled={isSubmitting}
                >
                  <LockSvg className="icon-xs margin-right-small" />
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </button>

                <div className="divider-container">
                  <div className="divider-line-box">
                    <div className="divider-line"></div>
                  </div>
                  <div className="divider-text-box">
                    <span className="divider-text">OR</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="login-btn-new-account"
                  onClick={onNavigateToRegister}
                >
                  <UserSvg className="icon-xs margin-right-small" />
                  Create New Account
                </button>
              </form>
            </div>

            <div className="gov-seal-footer">
               <div className="gov-seal-box">
                  <ShieldSvg className="icon-sm login-color-primary" />
                  <div>
                    <h4 className="gov-footer-title">Official Government Portal</h4>
                    <p className="gov-footer-desc">This is a secure platform for Department of Excise services.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;