import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authstore';

const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();

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