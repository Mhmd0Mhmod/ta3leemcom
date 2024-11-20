import Menu, { useCloseMenu } from "../Context/Menu.jsx";
import { useRef, useState } from "react";
import Plus from "../../public/Icons/plus.svg";
import Button from "./Button.jsx";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useAddSession } from "../Features/TeacherMonths/useAddSession.js";
import { convertArabicMonthAndYearToDate } from "../Config/config.js";
import { useMonths } from "../Features/TeacherMonths/useMonths.js";

function AddSession() {
  const close = useCloseMenu();
  const [selectedDate, setSelectedDate] = useState("");
  const { addSession } = useAddSession();
  const { selectedMonth } = useMonths();
  const dateInputRef = useRef(null);

  if (!selectedMonth) return null;
  const monthDate = convertArabicMonthAndYearToDate(selectedMonth.monthName, selectedMonth.year);
  const startOfCurrentMonth = format(startOfMonth(monthDate), "yyyy-MM-dd");
  const endOfCurrentMonth = format(endOfMonth(monthDate), "yyyy-MM-dd");

  function closeList() {
    setSelectedDate("");
    close();
  }

  function handleAddSession() {
    addSession(new Date(selectedDate).toISOString(), {
      onSuccess: () => {
        closeList();
      },
    });
  }

  return (
    <div className={"relative"}>
      <Menu.Trigger name={"addSession"}>
        <Plus />
      </Menu.Trigger>
      <Menu.List name={"addSession"} className={"absolute left-1/2 z-20 -translate-x-1/2 space-y-4 bg-white p-2 shadow-xl"}>
        <label htmlFor={"date"}> اضافه حصه</label>
        <input type={"date"} ref={dateInputRef} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={startOfCurrentMonth} max={endOfCurrentMonth} />
        <div className={"flex justify-between gap-4"}>
          <Button type={"normal"} className={"border text-black"} onClick={closeList}>
            الغاء
          </Button>
          <Button type={"Secondary"} onClick={handleAddSession}>
            اضافة
          </Button>
        </div>
      </Menu.List>
    </div>
  );
}

export default AddSession;
