import { useSearchParams } from "react-router-dom";
import { constraints, FakeGroups } from "../config.js";
import Heading from "./ui-local/Heading.jsx";
import Button from "./ui-local/Button.jsx";
import { useEffect, useState } from "react";
import Table from "./ui-local/Table/Table.jsx";
import THead from "./ui-local/Table/THead.jsx";
import TR from "./ui-local/Table/TR.jsx";
import TH from "./ui-local/Table/TH.jsx";
import TBody from "./ui-local/Table/TBody.jsx";
import TD from "./ui-local/Table/TD.jsx";
import Sort from "/public/Icons/sort.svg";
import Edit from "/public/Icons/edit_icon.svg";
import Trash from "/public/Icons/trash_icon.svg";
import Search from "/public/Icons/search_icon.svg";
import RemoveSearched from "/public/Icons/removeSeach.svg";
import HeadingLevelsPages from "./ui-local/HeadingLevelsPages.jsx";

function Students() {
 const [searchParams, setSearchParams] = useSearchParams();

 const groups = searchParams.get("group").split("_");
 const [search, setSearch] = useState("");
 const [students, setStudents] = useState([]);
 const [sortDirection, setSortDirection] = useState("asc");

 const handleSearch = (e) => {
  setSearch(e.target.value);
 };

 useEffect(() => {
  if (search) {
   setStudents(
    FakeGroups.filter((el) => groups.includes(el.name))
     .map((el) => el.students)
     .flat()
     .filter((el) => el.name.includes(search))
   );
   return;
  }
  setStudents(
   FakeGroups.filter((el) => groups.includes(el.name))
    .map((el) => el.students)
    .flat()
  );
 }, [search]);

 const handleSort = () => {
  const sortedStudents = [...students].sort((a, b) => {
   if (sortDirection === "asc") {
    return a.name.localeCompare(b.name);
   } else {
    return b.name.localeCompare(a.name);
   }
  });
  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  setStudents(sortedStudents);
 };

 return (
  <div className={"flex flex-col gap-6"}>
   <HeadingLevelsPages title={"الطلاب"} />
   <div className={"flex justify-between items-center"}>
    <div className={"flex gap-4"}>
     <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 rounded-lg ">
      <Search />
      <input
       type="text"
       placeholder="اسم الطالب"
       className="w-full"
       value={search}
       onChange={handleSearch}
      />
      {search && <RemoveSearched />}
     </div>
     <Button
      type="Secondary"
      className={" bg-accent-900 !text-black h- font-almaria text-xl  "}
     >
      بحث
     </Button>
    </div>
    <div>
     <span
      className={
       "px-6 py-4 bg-accent-900 !text-black h- font-almaria text-xl rounded "
      }
     >
      عدد الطلاب :
      <span className={"font-almaria-bold"}>{" " + students.length}</span>
     </span>
    </div>
   </div>
   <Table className={"!w-1/2 "}>
    <THead>
     <TR className={"p-2 bg-[#A8A8A833] rounded cursor-pointer "}>
      <TH
       className={"flex justify-center gap-4 items-center"}
       onClick={handleSort}
      >
       <span>اسم الطالب</span>
       <Sort />
      </TH>
     </TR>
    </THead>
    <TBody className={"mt-2 h-[380px] overflow-auto"}>
     {students?.map((el, i) => {
      return (
       <TR key={el.id}>
        <TD>
         <div
          className={"flex gap-4 p-2 bg-white border-b-4 items-center rounded"}
         >
          <Edit alt={"edit"} className={"!w-5"} />
          <span>
           {i + 1}.{el.name}
          </span>
          <Trash alt={"delete"} className={"mr-auto !w-5"} />
         </div>
        </TD>
       </TR>
      );
     })}
    </TBody>
   </Table>
  </div>
 );
}

export default Students;
