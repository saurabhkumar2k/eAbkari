import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import { Ashok, hdrimage } from "../Images/Images";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const loginRef = useRef(null);
  const location = useLocation();

  const stickyPages = ["/", "/about", "/acts", "/rti", "/manuals"];
  const isSticky = stickyPages.includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`header ${isSticky ? "sticky" : ""}`}>
      
      {/* ===== TOP BAR ===== */}
      <div className="topbar">

        {/* LEFT LOGO */}
        <div className="logo-section">
          <img src={Ashok} alt="Ashok Stambh" />
          <div>
            <h1>Department of Excise</h1>
            <p>Government of NCT of Delhi</p>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="title-center">
          {/* <img src={hdrimage} alt="header" className="header-center-img" /> */}
          <h1 className="header-title glow-text">  eAbkari-The Digital Alcohol Regulation Platform</h1>
        </div>

        {/* RIGHT SECTION */}
        <div className="top-bar-right" ref={loginRef}>
          <button
            className="login-btn"
            onClick={() => setLoginOpen(!loginOpen)}
          >
            <User size={18} /> Login
          </button>

          <div className={`login-dropdown ${loginOpen ? "show" : ""}`}>
            <Link to="/login">Applicant</Link>
            <Link to="/department-login">Department</Link>
            <Link to="/licensee-login">Licensee</Link>
            <a
              href="https://eabkari.delhi.gov.in/labtesting/"
              target="_blank"
              rel="noreferrer"
            >
              Lab Testing
            </a>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>

        <div className="nav-item">
          <span>About Us</span>
          <div className="mega-menu">
            <Link to="/about/department">Department</Link>
            <Link to="/about/policies">Policies</Link>
            <Link to="/about/org-structure">Organisation</Link>
            <Link to="/about/functions">Functions</Link>
            <Link to="/about/staff">Staff</Link>
            <Link to="/about/key-people">Heads</Link>
          </div>
        </div>

        <div className="nav-item">
          <span>Facts & Figures</span>
          <div className="mega-menu">
            <a href="#">Licenses Administered</a>
            <a href="#">Registered Brands</a>
          </div>
        </div>

        <div className="nav-item">
          <span>Acts & Rules</span>
          <div className="mega-menu">
            <a href="#">Acts</a>
            <a href="#">Rules</a>
            <a href="#">Circulars</a>
          </div>
        </div>

        <div className="nav-item">
          <span>RTI</span>
          <div className="mega-menu">
            <a href="#">RTI Act 2005</a>
          </div>
        </div>

        <div className="nav-item">
          <span>Feedback</span>
          <div className="mega-menu">
            <a href="#">Feedback Form</a>
          </div>
        </div>

        <div className="nav-item">
          <span>Track & Trace</span>
          <div className="mega-menu">
            <a href="#">Track Liquor</a>
          </div>
        </div>

        <div className="nav-item">
          <span>User Manuals</span>
          <div className="mega-menu">
            <a href="#">User Manual</a>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;