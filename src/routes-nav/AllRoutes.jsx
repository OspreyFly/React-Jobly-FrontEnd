import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function AllRoutes({ login, signup }) {

  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/companies" element={<PrivateRoute component={<CompanyList />} />} />
        <Route path="/jobs" element={<PrivateRoute component={<JobList />} />} />
        <Route path="/companies/:handle" element={<PrivateRoute component={<CompanyDetail />} />} />
        <Route path="/profile" element={<PrivateRoute component={<ProfileForm />} />} />
        <Route element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  );
}

export default AllRoutes;
