import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedView = ({ user, requiredRoles, children }) => {
  if (!user) {
    return <Redirect to="/login" />;
  }

  const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));

  if (!hasRequiredRole) {
    return <Redirect to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedView;
