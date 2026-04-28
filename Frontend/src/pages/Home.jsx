import React, { Component } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WelcomePopup from "../components/WelcomePopup";

const notices = [
  {
    date: "01/10/2024",
    title: "Excise Policy Circular 2024",
    file: "excise_policy_2024.pdf",
  },
  {
    date: "25/09/2024",
    title: "New License Registration Guidelines",
    file: "license_guidelines.pdf",
  },
  {
    date: "18/09/2024",
    title: "Public Notice Regarding Dealer Registration",
    file: "dealer_notice.pdf",
  },
];

class Home extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <main>
          <WelcomePopup />

          <Hero />
          <About />
          <Services />

          <section className="notice-section">
            <div className="notice-wrapper">
              <div className="notice-card">
                <div className="notice-header">
                  <span className="notice-icon">📅</span>
                  <h2 className="notice-title">
                    NOTICE <span className="notice-highlight">BOARD</span>
                  </h2>
                </div>

                <div className="notice-table-container">
                  <table className="notice-table">
                    <thead>
                      <tr>
                        <th>Sl.No.</th>
                        <th>Date</th>
                        <th className="text-left">Title</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{notice.date}</td>
                          <td>{notice.title}</td>
                          <td className="text-center">
                            <a
                              href={`/downloads/${notice.file}`}
                              download
                              className="notice-download"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="notice-footer">
                <a
                  href="/CommonUser/Portal_New_Portal_Acts_Rules_Cirular.aspx?type=0"
                  className="notice-btn"
                >
                  ALL NOTICE
                </a>
              </div>
            </div>
          </section>

          <Contact />
        </main>

        <Footer />
      </div>
    );
  }
}

export default Home;
