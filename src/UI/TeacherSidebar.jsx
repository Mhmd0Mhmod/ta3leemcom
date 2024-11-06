import Sidebar, { useSidebarContext } from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import Profile from "../../public/Icons/blackProfile.svg";
import Group from "../../public/Icons/group.svg";
import Details from "./Details.jsx";
import Graduted from "../../public/Icons/graduted.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function TeacherSidebar({ className }) {
  const auth = useAuthHeader();
  const user = useAuthUser();
  const { isOpen } = useSidebarContext();
  axios
    .get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Level/GetAllLevels?teacherId=${user.teacherId}`, {
      headers: {
        Authorization: auth,
      },
    })
    .then((res) => {
      console.log(res.data);
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
