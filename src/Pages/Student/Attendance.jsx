import Heading from "../../UI/Heading";
import HeadIcon from "/public/Icons/head-icon-student.svg";
import BgIcon from "/public/Icons/flow-months-student-bg.svg";
import Paid from "/public/Icons/paied.svg";
import NotPaid from "/public/Icons/notpaidMonth.svg";
import Done from "/public/Icons/done.svg";
import False from "/public/Icons/false.svg";
import { useStudentAttendance } from "../../Features/StudentAttendance/useStudentAttendance";
import Dropdown from "../../Context/DropDownList";
import DropDownList from "../Teacher/DropDownList";
import { useState } from "react";
import Loading from "../../UI/Loading";
import { format } from "date-fns";

function Attendance() {
  const { attendance, isLoading, error } = useStudentAttendance();
  const [selectedMonth, setSelectedMonth] = useState(null);
  if (isLoading) return <Loading />;
  function handleSelect(month, i) {
    setSelectedMonth({
      ...month,
      index: i,
    });
  }
  console.log(attendance);

  return (
    <>
      <BgIcon className={"absolute left-[10%] top-2"} />
      <div className="space-y-10">
        <div className={"flex justify-center gap-12"}>
          <Heading as={"h3"} className={"text-center"}>
            متابعة الشهر الدراسي
          </Heading>
          <HeadIcon className={"z-20"} />
        </div>
        <DropDownList
          lablelStyle={"months__student__header"}
          label={"الشهر"}
          value={selectedMonth && `${selectedMonth?.monthName} - ${selectedMonth?.year}`}
          defaultValue={"اختر الشهر"}
          options={attendance}
          render={(month, i) => (
            <Dropdown.Item className={"flex items-center justify-between"} key={i} onClick={() => handleSelect(month, i)}>
              <span>{month.monthName}</span>
              <span>{month.year}</span>
            </Dropdown.Item>
          )}
        />
        {selectedMonth && (
          <>
            <div className="flex flex-col justify-between gap-10">
              <Heading as={"h4"} className={"months__student__header"}>
                حالة الدفع الشهر
              </Heading>

              <div className={"flex w-full items-center justify-center gap-2 rounded-md bg-white py-5 shadow-md"}>
                {selectedMonth.pay ? (
                  <>
                    <Paid />
                    <span>مدفوع</span>
                  </>
                ) : (
                  <>
                    <NotPaid />
                    <span>غير مدفوع</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4">
              <Heading as={"h4"} className={"months__student__header"}>
                حضور الحصص
              </Heading>
              <div className={"flex w-full flex-wrap items-center justify-between gap-2 rounded-md bg-white p-1 shadow-md"}>
                {selectedMonth.days.length === 0 ? (
                  <>
                    <span>لا توجد حصص</span>
                  </>
                ) : (
                  selectedMonth.days.map((day, i) => (
                    <div key={i} className={"flex flex-col items-center gap-2 rounded-md p-4 hover:bg-gray-100"}>
                      <span>{format(day.date, "yyyy/MM/dd")}</span>
                      {day.attended ? <Done className="h-10 w-10" /> : <False className="h-10 w-10" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Attendance;
