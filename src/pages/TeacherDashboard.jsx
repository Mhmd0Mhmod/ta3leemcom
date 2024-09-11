import Graduted from "../../public/Icons/graduted.svg";
import Profile from "../../public/Icons/blackProfile.svg";
import Group from "../../public/Icons/group.svg";
import Meeting from "../../public/Icons/meeting.svg";
import ThreeCirlce from "../../public/Icons/threeCirlceDashboard.svg";
import Menu from "../../public/Icons/menu.svg";
import ScrollTop from "./../../public/Icons/scroll_top_icon.svg";
import TestIcon from "../../public/Icons/test.svg";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddStudent from "../components/AddStudent.jsx";
import Details from "../components/ui-local/Details.jsx";
import AddGroup from "../components/AddGroup.jsx";
import Test from "../components/Test.jsx";
import Level from "../components/Level.jsx";
import { LEVELS } from "../config.js";
import Students from "../components/Students.jsx";
import Months from "../components/Months.jsx";

function TeacherDashboard() {
 const [searchParams, setSearchParams] = useSearchParams();
 const activeTab = searchParams.get("tab") || "addStudent";
 const [opened, setOpened] = useState(true);
 const [showScrollTop, setShowScrollTop] = useState(false);

 useEffect(() => {
  if (!searchParams.get("tab")) {
   setSearchParams({ tab: "addStudent" });
  }
 }, [searchParams, setSearchParams]);

 const handleTabClick = (tab) => {
  setSearchParams({ tab });
 };

 useEffect(() => {
  const handleScroll = () => {
   if (window.scrollY > 400) {
    setShowScrollTop(true);
   } else {
    setShowScrollTop(false);
   }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);
 const scrollToTop = () => {
  document
   .getElementById("innerContent")
   .scrollIntoView({ behavior: "smooth" });
 };

 return (
  <div className={"flex dashboard gap-5 font-cairo mb-4   "}>
   <div
    className={`p-2.5 bg-gray-100 rounded ${
     opened ? "w-[320px]" : "w-fit"
    } self-start`}
   >
    <div className={`flex ${opened ? " justify-end" : "justify-center"}`}>
     <Menu
      className={`w-9 ${opened ? "" : "rotate-Y-180"} transition duration-100 `}
      onClick={() => setOpened((open) => !open)}
     />
    </div>
    <ul className={"flex gap-2 flex-col font-cairo text-xl mt-2 "}>
     <li
      onClick={() => handleTabClick("addStudent")}
      className={`rounded p-2.5 flex items-center gap-[18px] cursor-pointer hover:bg-[#b4d3e0] duration-300 h ${
       activeTab === "addStudent" ? "active" : ""
      }`}
     >
      <Profile />
      <span className={`${!opened ? "hidden" : ""}`}>اضافة طالب</span>
     </li>
     <li
      onClick={() => handleTabClick("addGroup")}
      className={`rounded p-2.5 flex items-center gap-[18px] cursor-pointer hover:bg-[#b4d3e0] duration-300 ${
       activeTab === "addGroup" ? "active" : ""
      }`}
     >
      <Group />
      <span className={`${!opened ? "hidden" : ""}`}>اضافة مجموعة</span>
     </li>
     <li
      className={`rounded p-2.5  cursor-pointer ${
       activeTab === "addTest" ? "active" : ""
      }`}
     >
      <Details
       className={"gap-[18px]"}
       summary={"اضافة اختبار"}
       Icon={TestIcon}
       listItems={["اونلاين", "اوفلاين"]}
       tabName={["online", "offline"]}
       param={"test"}
       opend={opened}
      />
     </li>
     <li
      className={`rounded p-2.5 cursor-pointer ${
       activeTab === "StudyLevels" ? "active" : ""
      }`}
     >
      <Details
       className={"gap-[18px]"}
       summary={"المراحل الدراسية"}
       Icon={Graduted}
       opend={opened}
       listItems={LEVELS.levels.map((el) => el.split(" ").at(1))}
       tabName={Object.keys(LEVELS).slice(1)}
       param={"level"}
      />
     </li>
     <li
      onClick={() => handleTabClick("meeting")}
      className={`rounded p-2.5 flex items-center gap-[18px] cursor-pointer hover:bg-[#b4d3e0] duration-300 ${
       activeTab === "meeting" ? "active" : ""
      }`}
     >
      <Meeting />
      <span className={`${!opened ? "hidden" : ""}`}>عقد اجتماع</span>
     </li>
    </ul>
   </div>
   <div className={"w-[1px] self-stretch bg-gray-100"}></div>
   <div className={" p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
    <div id="innerContent" className={"w-32    absolute top-0 left-0"}>
     <ThreeCirlce />
    </div>
    {activeTab === "addStudent" && <AddStudent />}
    {activeTab === "addGroup" && <AddGroup />}
    {activeTab === "test" && <Test />}
    {activeTab === "level" && <Level />}
    {activeTab === "students" && <Students />}
    {activeTab === "months" && <Months />}
    {activeTab === "meeting" && <h1>عقد اجتماع</h1>}
    {showScrollTop && (
     <button
      onClick={scrollToTop}
      className="absolute left-12 bottom-12 hover:-translate-y-1 transition-all duration-300"
     >
      <ScrollTop />
     </button>
    )}
   </div>
  </div>
 );
}

export default TeacherDashboard;
