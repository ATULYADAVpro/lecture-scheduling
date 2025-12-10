import { Navigate } from "react-router";
import { useAppContext } from "../../contexts/AppContext";


const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAppContext()

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;