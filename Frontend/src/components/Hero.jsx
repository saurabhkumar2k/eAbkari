import React, { Component } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

class Hero extends Component {
  render() {
    return (
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-grid">

            {/* 🔹 Text Content */}
            <div className="hero-content animate-fade-in">
              {/* 
              <h1 className="hero-title">Department of Excise</h1>
              <h2 className="hero-subtitle">Government of NCT of Delhi</h2>
              */}

              <p className="hero-text">
                <strong>Department of Excise, NCT of Delhi :</strong> Revenue is
                the most important input for an able, efficient and resourceful
                administration. In India since ancient times, there has been a
                well-planned, well-defined, clear, strong and just system of
                revenue collection.
              </p>

              <p className="hero-text">
                With the passage of time, there have been changes in the system
                of revenue collection. Today, various tax-free items exist which
                were earlier taxed. According to the needs of changing times and
                the widening gap between sources of livelihood and available
                resources, new sources of revenue have also been developed.
              </p>

              <p className="hero-text">
                To provide a self-reliant administration for a welfare state,
                continuous efforts are required to develop new sources of
                revenue, while simultaneously plugging loopholes in the existing
                system.
              </p>

              <div className="hero-actions">
                <a href="/UserLogin" className="btn-primary">
                  Login to Portal
                  <ArrowRight size={20} />
                </a>

                <Link to="/about-us" className="btn-secondary">
                  About the Department
                </Link>
              </div>
            </div>

            {/* 🔹 Image */}
            <div className="hero-image animate-fade-in">
              <img
                src="src/Images/delhiexcise.png"
                alt="Digital governance and public administration"
                width={600}
                height={400}
              />
            </div>

          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
