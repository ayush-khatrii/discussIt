import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authstore';

const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();
  useEffect(() => {
    const getCurrentUser = async () => {
      await getUser();
    };
    getCurrentUser();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;