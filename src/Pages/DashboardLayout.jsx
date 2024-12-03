import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Dashboard from "../UI/Dashboard";
import TeacherSidebar from "../UI/TeacherSidebar";
import StudentSidebar from "../UI/StudentSidebar";
import Sidebar from "../Context/Sidebar";

function DashboardLayout() {
  const { role } = useAuthUser();

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
