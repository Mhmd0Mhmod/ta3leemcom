import StudentTests from "/public/Icons/StudentTests.svg";
import StudentToppers from "/public/Icons/StudentToppers.svg";
import Money from "/public/Icons/StudentMonths.svg";
import { Link } from "react-router-dom";
import Sidebar from "../Context/Sidebar.jsx";

function StudentSidebar() {
  return (
    <>
      <Link to="/SDashboard/tests" className={"flex cursor-pointer items-center gap-5"}>
        <Sidebar.Item Icon={<StudentTests />}>
          <span>الاختبارات</span>
        </Sidebar.Item>
      </Link>
      <Link to="/SDashboard/toppers" className={"flex cursor-pointer items-center gap-5"}>
        <Sidebar.Item Icon={<StudentToppers />}>
          <span>الاوائل</span>
        </Sidebar.Item>
      </Link>
      <Link to="/SDashboard/attendance" className={"flex cursor-pointer items-center gap-5"}>
        <Sidebar.Item Icon={<Money />}>
          <span>الحضور</span>
        </Sidebar.Item>
      </Link>
    </>
  );
}

export default StudentSidebar;
