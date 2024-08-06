import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CompaniesList from './CompaniesList';
import CompanyDetails from './CompanyDetails';
import JobsList from './JobsList';
import LoginSignUp from './LoginSignUp';
import SignUpForm from './SignUpForm';
import EditProfile from './EditProfile';

function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<><HomePage /></>} />
      <Route path="/companies" component={CompaniesList} />
      <Route path="/companies/:id" component={CompanyDetails} />
      <Route path="/jobs" component={JobsList} />
      <Route path="/login" component={LoginSignUp} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/profile" component={EditProfile} />
    </Routes>
  );
}

export default AllRoutes;
