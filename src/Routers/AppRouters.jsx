import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Admission from "../pages/Admission";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import FAQ from "../pages/FAQ";
import NotFound from "../pages/NotFound";

import StudentDashboard from "../Dashboard/StudentDashboard";
import TeacherDashboard from "../Dashboard/TeacherDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";

function AppRouters() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/about"               element={<About />} />
        <Route path="/courses"             element={<Courses />} />
        <Route path="/admission"           element={<Admission />} />
        <Route path="/contact"             element={<Contact />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/forgot-password"     element={<ForgotPassword />} />
        <Route path="/privacy-policy"      element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/faq"                 element={<FAQ />} />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*"     element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouters;
