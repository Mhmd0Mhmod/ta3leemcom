import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  const use = useAuthUser();
  if (!use) {
    toast.error("يجب تسجيل الدخول أولاً");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
export default ProtectedRoute;
