import React, { Component } from "react";
import "../styles/login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      captcha: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleReset() {
    this.setState({
      username: "",
      password: "",
      captcha: "",
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password, captcha } = this.state;

    if (!username) {
      alert("Please enter User ID");
      return;
    }

    if (!password) {
      alert("Please enter Password");
      return;
    }

    if (!captcha) {
      alert("Please enter CAPTCHA");
      return;
    }

    // TODO: SHA256 + API call
    console.log(this.state);
  }

  render() {
    const { username, password, captcha } = this.state;

    return (
      <div className="login-page">
        <div className="login-container">

          {/* LEFT – Instructions */}
          <div className="login-info">
            <h3>Important Instructions</h3>
            <ul>
              <li>Do not share your password with anyone.</li>
              <li>Change your password regularly.</li>
              <li>Always logout after completing your work.</li>
              <li>OTP / CAPTCHA must not be shared.</li>
            </ul>
          </div>

          {/* RIGHT – Login Form */}
          <div className="login-form">
            <h2>Registered User Sign-In</h2>

            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                maxLength="10"
                value={username}
                onChange={this.handleChange}
                className="red-focus"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                maxLength="20"
                value={password}
                onChange={this.handleChange}
                className="red-focus"
              />

              {/* CAPTCHA Placeholder */}
              <input
                type="text"
                name="captcha"
                placeholder="Captcha (Case Sensitive)"
                value={captcha}
                onChange={this.handleChange}
                className="red-focus"
              />

              <div className="btn-row">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="btn secondary"
                >
                  Reset
                </button>
                <button type="submit" className="btn primary">
                  Submit
                </button>
              </div>

              <div className="login-links">
                <a href="/register">New Registration</a>
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
