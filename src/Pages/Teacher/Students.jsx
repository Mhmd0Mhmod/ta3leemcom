import Heading from "../../UI/Heading.jsx";
import StudentsGroupsTable from "../../UI/StudentsGroupsTable.jsx";
import BreadCrumb from "../BreadCrumb.jsx";

function Students() {
  return (
    <div className={"flex flex-col gap-6"}>
      <Heading className={"font-Almarai-bold"}>الطلاب</Heading>
      <hr className={"w-full"} />
      <div className={"space-y-20"}>
        <BreadCrumb />
        <StudentsGroupsTable />
      </div>
    </div>
  );
}

export default Students;
