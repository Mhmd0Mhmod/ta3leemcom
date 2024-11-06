import { Link, useParams } from "react-router-dom";
import useGroups from "../Features/Dashboard/useGroups.js";
import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import Trash from "../../public/Icons/recyclePin.svg";
import Edit from "../../public/Icons/editPen.svg";
import Eye from "../../public/Icons/eye.svg";
import Heading from "./Heading.jsx";
import Arrow from "/public/Icons/arrow_in_levels.svg";

function GroupsList({ value, onChange }) {
  const { levelYearId } = useParams();
  const { groups, isLoading, error } = useGroups(levelYearId);

  return (
    <div className={"flex flex-col pr-10"}>
      <div className={"flex gap-2"}>
        <Heading as={"h1"} className={"font-Almaria-bold text-xl"}>
          المجموعات
        </Heading>
        <Arrow />
      </div>
      <div className={"max-h-64 overflow-y-auto rounded-xl bg-white p-5"}>
        {isLoading && <Loading />}
        <ul className={"flex flex-col gap-5"}>
          {!isLoading && groups?.length === 0 && (
            <li className="flex items-center justify-between">
              <span>لا يوجد مجموعات</span>
              <Link to="/TDashboard/group/add" className="flex items-center gap-2 rounded-xl bg-[#0884A2] px-2 py-1 text-white">
                <span>اضافة مجموعة</span>
              </Link>
            </li>
          )}
          {!isLoading &&
            groups?.map((group) => (
              <li
                key={group.id}
                onClick={() => onChange(group.id)}
                className={`font-Almaria-bold hover:bg-Secondary-100 flex cursor-pointer items-center gap-2 rounded-xl border border-sky-200 p-2 ${value.includes(group.id) ? "bg-Secondary-100 text-white" : ""}`}
              >
                <Trash />
                <Edit />
                <span className={"flex-1 text-center"}>{group.name}</span>
                <Eye />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupsList;
