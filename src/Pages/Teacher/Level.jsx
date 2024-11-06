import { Link } from "react-router-dom";
import Tests from "/public/Icons/tests.svg";
import Students from "/public/Icons/students.svg";
import Toppers from "/public/Icons/toppers.svg";
import Months from "/public/Icons/monthes.svg";
import GroupsList from "../../UI/GroupsList.jsx";
import LevelsList from "../../UI/LevelsList.jsx";
import { useState } from "react";

function Level() {
  const [selectedGroups, setSelectedGroups] = useState([]);
  function selectGroup(groupId) {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  }

  return (
    <div className={"font-Almaria flex flex-col gap-10"}>
      <LevelsList />
      <div className={"flex flex-col gap-20 xl:flex-row"}>
        <GroupsList value={selectedGroups} onChange={selectGroup} />
        <div className={"mt-16 grid flex-grow grid-cols-2 grid-rows-2 gap-x-80 self-center"}>
          {[
            { name: "الاختبارات", Icon: Tests, tab: "tests" },
            { name: "الطلاب", Icon: Students, tab: "students" },
            { name: "الاشهور", Icon: Months, tab: "months" },
            { name: "الاوائل", Icon: Toppers, tab: "toppers" },
          ].map((item, i) => (
            <Link to={`/TDashboard/${item.tab}/${selectedGroups.join("_")}`} key={i} className={"flex cursor-pointer flex-col items-center gap-5"}>
              <div className={"relative"}>
                <item.Icon />
                <span className={"absolute left-0 top-0 h-full w-full rounded-full hover:bg-[#00000033]"}></span>
              </div>
              <span className={"font-Almaria-bold text-xl"}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Level;
