import Dropdown from "../Context/DropDownList.jsx";
import { useMonths } from "../Features/TeacherMonths/useMonths.js";
import { useSearchParams } from "react-router-dom";
import Trash from "/public/Icons/trash_icon.svg";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";

function FilterByMonth() {
  const [searchParam, setSearchParam] = useSearchParams();
  const { months, isLoading } = useMonths();
  if (isLoading) return null;

  function handleSearchParams(monthId) {
    searchParam.set("m", monthId);
    setSearchParam(searchParam);
  }
  if (isLoading) return null;
  const value = months?.find((month) => month.monthId === Number(searchParam.get("m")));

  return (
    <Dropdown>
      <Dropdown.Toggle value={value ? `${value.monthName} - ${value.year}` : ""} placeholder={"اختر الشهر"} />
      <Dropdown.Menu close={false}>
        {months?.map((month) => (
          <div className={"hover: flex items-center p-1 px-4 hover:bg-blue-200"} key={month.monthId}>
            <Dropdown.Item text={`${month.monthName} - ${month.year}`} onClick={() => handleSearchParams(month.monthId)}>
              <span>
                {month.monthName} - {month.year}
              </span>
            </Dropdown.Item>
            <Modal.Trigger id={`deleteMonths-${month.monthId}`}>
              <Trash className={"cursor-pointer"} />
            </Modal.Trigger>
            <Modal.Content id={`deleteMonths-${month.monthId}`} title={"حذف الشهر"}>
              <AlertWindow title={"هل انت متأكد من حذف الشهر؟"} description={" "} />
            </Modal.Content>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterByMonth;
