import Dashboard from "../../UI/Dashboard.jsx";
import Sidebar from "../../UI/Sidebar.jsx";
import TeacherSidebar from "../../UI/TeacherSidebar.jsx";

function TeacherDashboard() {
  return (
    <Dashboard>
      <Sidebar>
        <TeacherSidebar />
      </Sidebar>
    </Dashboard>
  );
}

export default TeacherDashboard;
