import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Dashboard from "../UI/Dashboard";
import TeacherSidebar from "../UI/TeacherSidebar";
import StudentSidebar from "../UI/StudentSidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../Context/Sidebar";

function DashboardLayout() {
  const { role } = useAuthUser();
  const navigate = useNavigate();
  if (!role || (role !== "Teacher" && role !== "Student")) {
    navigate("/");
    if (!role) toast.error("يجب تسجيل الدخول أولاً");
    if (role === "Parent") toast.error("اولياء الامور غير متاحين الا ع التطبيق , يجب تسجيل الدخول بحساب طالب أو معلم");
  }
  return (
    <Dashboard>
      <Sidebar>
        {role === "Teacher" && <TeacherSidebar />}
        {role === "Student" && <StudentSidebar />}
      </Sidebar>
    </Dashboard>
  );
}
export default DashboardLayout;
