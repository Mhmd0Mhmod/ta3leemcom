import Sidebar, { useSidebarContext } from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import Profile from "../../public/Icons/blackProfile.svg";
import Group from "../../public/Icons/group.svg";
import Details from "./Details.jsx";
import Graduted from "../../public/Icons/graduted.svg";

function TeacherSidebar({ className }) {
  const { isOpen } = useSidebarContext();
  return (
    <>
      <Link to="/TDashboard/student/add">
        <Sidebar.Item Icon={<Profile />}>
          <span>اضافة طالب</span>
        </Sidebar.Item>
      </Link>
      <Link to="/TDashboard/group/add">
        <Sidebar.Item Icon={<Group />}>
          <span>اضافة مجموعه</span>
        </Sidebar.Item>
      </Link>
      <Details>
        <div className={"relative"}>
          <Details.Summary>
            <Sidebar.Item Icon={<Graduted />}>
              <span>المراحل الدراسيه</span>
            </Sidebar.Item>
          </Details.Summary>
          <Details.List absolute={!isOpen} className={`${isOpen ? "xl:relative xl:!bg-transparent" : "!bg-white"} ${className}`}>
            <Details.ListItem>المرحله الابتدائيه</Details.ListItem>
            <Details.ListItem>المرحله الابتدائيه</Details.ListItem>
            <Details.ListItem>المرحله الابتدائيه</Details.ListItem>
          </Details.List>
        </div>
      </Details>
    </>
  );
}

export default TeacherSidebar;
