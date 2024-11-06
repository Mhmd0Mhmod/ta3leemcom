import Dashboard from "../../UI/Dashboard.jsx";
import { Link } from "react-router-dom";
import Details from "../../UI/Details.jsx";
import Graduted from "/public/Icons/graduted.svg";
import Profile from "/public/Icons/blackProfile.svg";
import Group from "/public/Icons/group.svg";
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
