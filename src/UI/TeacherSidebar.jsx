import Sidebar, { useSidebarContext } from "../Context/Sidebar.jsx";
import { Link } from "react-router-dom";
import Profile from "../../public/Icons/blackProfile.svg";
import Group from "../../public/Icons/group.svg";
import Details from "../Context/Details.jsx";
import Graduted from "../../public/Icons/graduted.svg";
import { useLevels } from "../Features/Dashboard/useLevels.js";
import Loading from "./Loading.jsx";

function TeacherSidebar({ className }) {
  const { isOpen } = useSidebarContext();
  const { levels: allLevels, isLoading, error } = useLevels();
  if (isLoading) return <Loading />;

  const levels = Object.keys(allLevels).map((id) => {
    return {
      id,
      name: allLevels[id][0].name.split(" ").at(-1),
    };
  });
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
            {levels.map((level) => (
              <Details.ListItem key={level.id}>
                <Link to={`/TDashboard/level/${level.id}/${allLevels[level.id][0].id}`}>{`المرحله ${level.name}ة`}</Link>
              </Details.ListItem>
            ))}
          </Details.List>
        </div>
      </Details>
    </>
  );
}

export default TeacherSidebar;
