import Heading from "../../UI/Heading.jsx";
import BreadCrumb from "../BreadCrumb.jsx";
import Plus from "/public/Icons/whiteplus.svg";
import TestsTable from "../../UI/TestsTable.jsx";
import Menu from "../../Context/Menu.jsx";
import { Link } from "react-router-dom";

function Tests() {
  return (
    <div className={"space-y-20"}>
      <div className={"space-y-4"}>
        <Heading as={"h2"}>الاختبارات</Heading>
        <hr className="w-[70%]" />
        <BreadCrumb />
      </div>
      <div className={"relative w-fit"}>
        <Menu>
          <Menu.Trigger name={"createTest"} type={"Secondary"} className={"flex items-center gap-10 text-white"}>
            <Plus />
            <span className={"text-2xl"}>اضافة اختبار</span>
          </Menu.Trigger>
          <Menu.List name={"createTest"} className={"absolute -left-28 top-0 mb-5 flex flex-col gap-1 rounded-lg bg-white p-2"}>
            <Link className="rounded-md p-2 duration-300 hover:bg-gray-200" to={`create/online`}>
              اونلاين
            </Link>
            <Link className="rounded-md p-2 duration-300 hover:bg-gray-200" to={`create/offline`}>
              اوفلاين
            </Link>
          </Menu.List>
        </Menu>
      </div>

      <TestsTable />
    </div>
  );
}

export default Tests;
