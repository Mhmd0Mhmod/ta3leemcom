import { useSearchParams } from "react-router-dom";
import menu from "../../public/Icons/menu.svg";
import profile from "../../public/Icons/blackProfile.svg";
import group from "../../public/Icons/group.svg";
import Icon from "../components/ui/Icon.jsx";
import TestIcon from "../../public/Icons/test.svg";
import graduted from "../../public/Icons/graduted.svg";
import { useState, useEffect } from "react";
import AddStudent from "../components/AddStudent.jsx";
import meeting from "../../public/Icons/meeting.svg";
import threeCirlce from "../../public/Icons/threeCirlceDashboard.svg";
import Details from "../components/ui/Details.jsx";
import AddGroup from "../components/AddGroup.jsx";
import StudentDetails from "../components/StudentDetailes.jsx";
import Test from "../components/Test.jsx";
import Level from "../components/Level.jsx";

function TeacherDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "addStudent";
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "addStudent" });
    }
  }, [searchParams, setSearchParams]);

  const handleTabClick = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className={"flex dashboard gap-5 font-cairo"}>
      <div className={`p-2.5 bg-gray-100 rounded ${opened ? "w-[320px]" : "w-fit"}  self-start`}>
        <div className={"flex justify-end"}>
          <Icon
            src={menu}
            className={`w-9 ${opened ? "" : "rotate-180"}`}
            onClick={() => setOpened((open) => !open)}
          />
        </div>
        <ul className={"flex gap-2 flex-col font-cairo-bold"}>
          <li
            onClick={() => handleTabClick("addStudent")}
            className={`rounded p-2.5 flex items-center gap-1 cursor-pointer ${
              activeTab === "addStudent" ? "active" : ""
            }`}
          >
            <Icon src={profile} />
            <span className={`${!opened ? "hidden" : ""}`}>اضافة طالب</span>
          </li>
          <li
            onClick={() => handleTabClick("addGroup")}
            className={`rounded p-2.5 flex items-center gap-1 cursor-pointer ${
              activeTab === "addGroup" ? "active" : ""
            }`}
          >
            <Icon src={group} />
            <span className={`${!opened ? "hidden" : ""}`}>اضافة مجموعة</span>
          </li>
          <li className={`rounded p-2.5  cursor-pointer ${activeTab === "addTest" ? "active" : ""}`}>
            <Details
              summary={"اضافة اختبار"}
              icon={TestIcon}
              listItems={["اونلاين", "اوفلاين"]}
              tabName={["online", "offline"]}
              param={"test"}
              opend={opened}
            />
          </li>
          <li className={`rounded p-2.5 cursor-pointer ${activeTab === "StudyLevels" ? "active" : ""}`}>
            <Details
              summary={"المراحل الدراسية"}
              icon={graduted}
              opend={opened}
              listItems={["المرحلة الابتدائية", "المرحلة الاعدادية", "المرحلة الثانوية"]}
              tabName={["primary", "middle", "high"]}
              param={"level"}
            />
          </li>
          <li
            onClick={() => handleTabClick("meeting")}
            className={`rounded p-2.5 flex items-center gap-1 cursor-pointer ${
              activeTab === "meeting" ? "active" : ""
            }`}
          >
            <Icon src={meeting} />
            <span className={`${!opened ? "hidden" : ""}`}>عقد اجتماع</span>
          </li>
        </ul>
      </div>
      <div className={"w-[1px] self-stretch bg-gray-100"}></div>
      <div className={"p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
        <div className={"w-32    absolute top-0 left-0"}>
          <img src={threeCirlce} alt={"threeCirlce"} />
        </div>
        {activeTab === "addStudent" && <AddStudent />}
        {activeTab === "addGroup" && <AddGroup />}
        {activeTab === "test" && <Test />}
        {activeTab === "level" && <Level />}
        {activeTab === "meeting" && <h1>عقد اجتماع</h1>}
      </div>
    </div>
  );
}

export default TeacherDashboard;
