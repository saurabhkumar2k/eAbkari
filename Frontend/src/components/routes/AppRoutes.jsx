import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes.jsx";
import ApplicantRoutes from "./ApplicantRoutes.jsx";
import DepartmentRoutes from "./Department.jsx";

export default function AppRoutes({
  C,
  navItems,
  handleAdminNavigate,
  handleHeaderViewSelect,
}) {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes({ C, handleHeaderViewSelect })}
        {ApplicantRoutes({ C, handleHeaderViewSelect })}
        {DepartmentRoutes({ C, navItems, handleAdminNavigate })}
      </Routes>
    </BrowserRouter>
  );
}
