import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) return <Navigate to="/login" />
  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;

