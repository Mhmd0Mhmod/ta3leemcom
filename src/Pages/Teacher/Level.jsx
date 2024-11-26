import { Link, useParams } from "react-router-dom";
import Tests from "/public/Icons/tests.svg";
import Students from "/public/Icons/students.svg";
import Toppers from "/public/Icons/toppers.svg";
import Months from "/public/Icons/monthes.svg";
import GroupsList from "../../UI/GroupsList.jsx";
import LevelsList from "../../UI/LevelsList.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Level() {
  const { levelYearId } = useParams();
  const [selectedGroups, setSelectedGroups] = useState([]);
  function ToggleSelectAllGroups(groupsIds) {
    if (selectedGroups.length === groupsIds.length) setSelectedGroups([]);
    else setSelectedGroups([...groupsIds]);
  }
  function selectGroup(groupId) {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  }
  useEffect(() => {
    setSelectedGroups([]);
  }, [levelYearId]);
  function handleMove(e) {
    if (selectedGroups.length === 0) {
      e.preventDefault();
      toast.error("اختر مجموعة على الاقل");
    }
  }

  return (
    <div className={"font-Almaria flex flex-col gap-10"}>
      <LevelsList />
      <div className={"flex flex-col gap-20 xl:flex-row"}>
        <GroupsList value={selectedGroups} onChange={selectGroup} selectAll={ToggleSelectAllGroups} />
        <div className={"mt-16 grid flex-grow grid-cols-2 grid-rows-2 gap-20 self-center xl:gap-x-80 xl:gap-y-20"}>
          {[
            { name: "الاختبارات", Icon: Tests, tab: "tests" },
            { name: "الطلاب", Icon: Students, tab: "students" },
            { name: "الاشهر", Icon: Months, tab: `months/${levelYearId}` },
            { name: "الاوائل", Icon: Toppers, tab: "toppers" },
          ].map((item, i) => (
            <Link to={`/TDashboard/${item.tab}/${selectedGroups.join(",")}`} onClick={handleMove} key={i} className={"flex cursor-pointer flex-col items-center gap-5"}>
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
