import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./src/components/Header";

/* Pages */
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import DepartmentLogin from "./src/pages/Login";
import LicenseeLogin from "./src/pages/Login";
import NotFound from "./src/pages/NotFound";
import About from "./src/pages/AboutUs";
const App = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        {/* Global Header */}
        <Header />

        <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/department-login" element={<DepartmentLogin />} />
            <Route path="/About-us" element={<About />} />
            <Route path="/licensee-login" element={<LicenseeLogin />} />
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
