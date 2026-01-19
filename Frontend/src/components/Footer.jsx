import React, { Component } from "react";

class Footer extends Component {
  render() {
    const projectDate = "03/10/2024";
    const lastUpdated = "04/10/2024";
    const visitorCount = 123456;

    return (
      <footer className="footer">
        <div className="footer-container">

          {/* Links */}
          <div className="footer-links">
            <a href="/CommonUser/Portal_New_Website_Term_Policy.aspx?type=1">
              Terms of Use
            </a>
            <a href="/CommonUser/Portal_New_Website_Term_Policy.aspx?type=2">
              Copyright Policy
            </a>
            <a href="/CommonUser/Portal_New_Website_Term_Policy.aspx?type=3">
              Privacy Policy
            </a>
            <a href="/CommonUser/Portal_New_Website_Term_Policy.aspx?type=4">
              Linking Policy
            </a>
            <a href="/Common/Portal_New_legalDisclaimer.aspx">
              Legal Disclaimer
            </a>
          </div>

          {/* Content */}
          <div className="footer-grid">

            <div className="footer-text">
              <p>Project Commissioned – e-Abkari Version 1.0 : {projectDate}</p>
              <p>Soft Launch of e-Abkari Version 1.0 : {projectDate}</p>
              <p>Soft Launch of Website : {projectDate}</p>
              <p>
                <strong>Visitor Count :</strong> {visitorCount}
              </p>
              <p>Last Updated : {lastUpdated}</p>
            </div>

            <div className="footer-text">
              <p>
                Contents on this website are owned, updated,
                <br />
                and managed by the <strong>Department of Excise</strong>
              </p>
              <p className="footer-margin-top">
                Site Designed &amp; Hosted by{" "}
                <a
                  href="https://www.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-highlight"
                >
                  National Informatics Centre (NIC)
                </a>
              </p>
              <p className="footer-margin-top">
                Best viewed in Internet Explorer 10 / 11 or later
              </p>
            </div>

            <div className="footer-logo">
              <img
                src="src/Images/ogd-qr2-New.png"
                alt="Open Government Data Platform India"
              />
            </div>

          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            © {new Date().getFullYear()} Department of Excise, Government of NCT of Delhi
          </div>

        </div>
      </footer>
    );
  }
}

export default Footer;
