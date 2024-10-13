import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authstore';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, getUser } = useAuthStore();
  useEffect(() => {
    const getCurrentUser = async () => {
      await getUser();
    };
    getCurrentUser();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;