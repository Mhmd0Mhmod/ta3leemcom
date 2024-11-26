import Heading from "../../UI/Heading.jsx";
import Plus from "/public/Icons/whiteplus.svg";
import Menu from "../../Context/Menu.jsx";
import MonthsList from "../../UI/MonthsList.jsx";
import FilterOptions from "../../UI/FilterOptions.jsx";
import CounterPaidStudents from "../../UI/CounterPaidStudents.jsx";
import MonthsTable from "../../UI/MonthsTable.jsx";

function Months() {
  return (
    <Menu>
      <div className={"space-y-10"}>
        <div>
          <Heading>الأشهر</Heading>
        </div>
        <hr className={"w-3/4"} />
        <div className={"flex items-center justify-between"}>
          <div className={"relative flex flex-col gap-20 xl:flex-row xl:gap-2 2xl:gap-10"}>
            <div className={"relative"}>
              <Menu.Trigger name={"months"} className={"flex items-center gap-4 whitespace-nowrap bg-Secondary-500 !text-3xl text-white"}>
                <Plus className={"h-10 w-10"} />
                <span>اضافة شهر</span>
              </Menu.Trigger>
              <Menu.List name={"months"} className={"absolute right-0 top-full z-[11]"}>
                <MonthsList />
              </Menu.List>
            </div>
            <FilterOptions />
          </div>
          <div className={"flex flex-col gap-5"}>
            <CounterPaidStudents />
          </div>
        </div>

        <MonthsTable />
      </div>
    </Menu>
  );
}

export default Months;
