import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { EditProfile } from './EditProfile';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { Dashboard } from './Dashboard';


const SecureRoute = ({ element }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/" />;
};

export const AllRouters = () => {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route
        path="/editprofile"
        element={<SecureRoute element={<EditProfile />} />}
      />
      <Route path="/" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={<SecureRoute element={<Dashboard />} />}
      />
    </Routes>
  );
};
