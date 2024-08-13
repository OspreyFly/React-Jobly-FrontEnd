import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CompaniesList from './CompaniesList';
import CompanyDetails from './CompanyDetails';
import JobsList from './JobsList';
import LoginSignUp from './LoginSignUp';
import EditProfile from './EditProfile';

function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<><HomePage /></>} />
      <Route path="/companies" element={<><CompaniesList /></>} />
      <Route path="/companies/:handle" element={<><CompanyDetails /></>} />
      <Route path="/jobs" element={<><JobsList /></>} />
      <Route path="/login" element={<><LoginSignUp /></>} />
      <Route path="/profile" element={<><EditProfile /></>} />
    </Routes>
  );
}

export default AllRoutes;
