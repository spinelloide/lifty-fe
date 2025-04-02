import { Navigate } from "react-router-dom";
import { routes } from "../utils/routes";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const authData = localStorage.getItem("auth_data");

  if (!authData) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return element;
};

export default PrivateRoute;