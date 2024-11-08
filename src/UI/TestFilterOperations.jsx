import Menu from "../Context/Menu.jsx";
import FilterByDate from "./FilterByDate.jsx";
import FilterByTestType from "./FilterByTestType.jsx";
import { useSearchParams } from "react-router-dom";

function TestFilterOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleReset() {
    setSearchParams({});
  }

  return (
    <div className="flex items-center gap-4">
      <Menu>
        <div className={"relative"}>
          <Menu.Trigger type={"Secondary"} name={"dateFilter"} className={"text-xl text-white"}>
            <span>تصفيه بالتاريخ</span>
          </Menu.Trigger>

          <Menu.List name={"dateFilter"} className={"absolute bottom-full left-1/2 mb-5 -translate-x-1/2"}>
            <FilterByDate />
          </Menu.List>
        </div>
        <div className={"relative"}>
          <Menu.Trigger type={"Secondary"} name={"testType"} className={"text-xl text-white"}>
            <span>نوع الاختبار</span>
          </Menu.Trigger>

          <Menu.List name={"testType"} className={"absolute bottom-full left-1/2 mb-5 -translate-x-1/2"}>
            <FilterByTestType />
          </Menu.List>
        </div>
      </Menu>
      <span className={"cursor-pointer text-Secondary-500 underline"} onClick={handleReset}>
        الغاء الكل
      </span>
    </div>
  );
}

export default TestFilterOperations;
