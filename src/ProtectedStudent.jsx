import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedStudent() {
  const { role } = useAuthUser() || {};
  if (!role || role !== "Student") {
    toast.error("هذه الصفحة مخصصة للطلاب فقط");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedStudent;
