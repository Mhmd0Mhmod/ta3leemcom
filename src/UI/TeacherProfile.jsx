import { Link } from "react-router-dom";
import Sidebar from "../Context/Sidebar";
import Dashboard from "./Dashboard";
import EditProfile from "/public/Icons/edit-prof.svg";
import Pc from "/public/Icons/pc.svg";

function TeacherProfile() {
  return (
    <Dashboard>
      <Sidebar>
        <Link to={"/profile/user"}>
          <Sidebar.Item Icon={<EditProfile />}>
            <span>الملف الشخصي</span>
          </Sidebar.Item>
        </Link>
        <Link to={"/profile/subscription"}>
          <Sidebar.Item Icon={<Pc />}>
            <span>الاشتراك</span>
          </Sidebar.Item>
        </Link>
      </Sidebar>
    </Dashboard>
  );
}
export default TeacherProfile;
