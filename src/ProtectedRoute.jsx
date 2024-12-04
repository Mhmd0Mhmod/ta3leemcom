import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { role } = useAuthUser() || {};
  if (!role) {
    return <Navigate to={"/"} replace={true} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
