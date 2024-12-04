import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedTeacher() {
  const { role } = useAuthUser() || {};
  if (!role || role !== "Teacher") {
    console.log(window.history);
    toast.error("هذه الصفحة مخصصة للمعلمين فقط");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedTeacher;
