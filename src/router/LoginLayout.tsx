import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UsersContext";

const LoginLayout = () => {
  const { user } = useContext(UserContext);

  if (user?.token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
export default LoginLayout;
