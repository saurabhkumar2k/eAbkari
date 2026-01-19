import React, { Component, createRef } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/withRouter";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      loginOpen: false,
    };

    this.loginRef = createRef();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    if (
      this.loginRef.current &&
      !this.loginRef.current.contains(e.target)
    ) {
      this.setState({ loginOpen: false });
    }
  }

  toggleMenu() {
    this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
  }

  toggleLogin() {
    this.setState((prev) => ({ loginOpen: !prev.loginOpen }));
  }

  render() {
    const { menuOpen, loginOpen } = this.state;
    const { location } = this.props;

    const stickyPages = [
      "/",
      "/about",
      "/acts",
      "/rti",
      "/manuals",
    ];

    const isSticky = stickyPages.includes(location.pathname);

    return (
      <header className={`gov-header ${isSticky ? "sticky" : ""}`}>

        {/* ===== TOP BAR ===== */}
        <div className="top-bar">
          <div className="top-bar-left">
            <img
              src="/src/Images/ashok_stambh_logo.jpg"
              alt="Ashok Stambh"
            />
          </div>

          <div className="top-bar-center">
            <h1>Department of Excise</h1>
            <h1 style={{ fontSize: "1.5rem" }}>Govt. Of Delhi</h1>
          </div>

          <div className="top-bar-right" ref={this.loginRef}>
            <button onClick={this.toggleLogin}>
              <User size={18} /> LOG IN
            </button>

            {loginOpen && (
              <div className="login-dropdown">
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
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={this.toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ===== MAIN MENU ===== */}
        <nav className={`main-menu ${menuOpen ? "open" : ""}`}>

          <div className="nav-item dropdown">
            <span className="same-link">About Us +</span>
            <ul className="dropdown-menu">
              <li><Link to="/about/department">Department</Link></li>
              <li><Link to="/about/policies">Policies</Link></li>
              <li><Link to="/about/org-structure">Organisational Structure</Link></li>
              <li><Link to="/about/functions">Functions</Link></li>
              <li><Link to="/about/staff">Staff</Link></li>
              <li><Link to="/about/key-people">Heads of Organizations</Link></li>
              <li><Link to="/about/commissioners">Excise Commissioners</Link></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">Facts & Figures +</span>
            <ul className="dropdown-menu">
              <li><a href="FAQ/Portal_New_category_licen.aspx">Licenses Administered</a></li>
              <li><a href="CommonUser/Portal_New_RegisterBrand_Liquor.aspx?type=28">
                Registered Brands of Liquor
              </a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">Acts, Rules & Orders +</span>
            <ul className="dropdown-menu">
              <li><a href="CommonUser/Portal_New_Portal_Acts_Rules_Cirular.aspx?type=33">Acts</a></li>
              <li><a href="CommonUser/Portal_New_Portal_Acts_Rules_Cirular.aspx?type=42">Rules</a></li>
              <li><a href="CommonUser/Portal_New_Portal_Acts_Rules_Cirular.aspx?type=47">Circulars</a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">Right to Information +</span>
            <ul className="dropdown-menu">
              <li><a href="CommonUser/Portal_New_rti_act.aspx">RTI Act 2005</a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">Feedback +</span>
            <ul className="dropdown-menu">
              <li><a href="FAQ/Portal_New_Feedback_Form.aspx">Feedback Form</a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">Track & Trace +</span>
            <ul className="dropdown-menu">
              <li><a href="Retail/Liquor_View_History.aspx">Track & Trace</a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <span className="same-link">User Manuals +</span>
            <ul className="dropdown-menu">
              <li><a href="CommonUser/UserManual.aspx">User Manual</a></li>
            </ul>
          </div>

        </nav>
      </header>
    );
  }
}

export default withRouter(Header);

