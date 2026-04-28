import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./components/Header";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import DepartmentLogin from "./pages/Login";
import LicenseeLogin from "./pages/Login";
import NotFound from "./pages/NotFound";
import About from "./pages/AboutUs";
import Register from "./pages/Register";
import Brand from "./pages/Admin/Brand";
import "./Styles/mainstyles.css";

const App = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router basename="/eabkarireact">
        <Header />

        <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/department-login" element={<DepartmentLogin />} />
            <Route path="/licensee-login" element={<LicenseeLogin />} />
            <Route path="/about-us" element={<About />} />
            <Route  path="/register" element={<Register />} />
            <Route  path="/Brand" element={<Brand />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
};

export default App;
