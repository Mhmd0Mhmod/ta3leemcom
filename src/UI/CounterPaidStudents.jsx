import Paid from "/public/Icons/paiddone.svg";
import NotPaid from "/public/Icons/notPaid.svg";
import { useMonthData } from "../Features/TeacherMonths/useMonthData";

function CounterPaidStudents() {
  const { monthData, isLoading } = useMonthData();
  if (isLoading) return null;

  const paidStudents = monthData?.monthStudents.filter((student) => student.pay).length;
  return (
    <>
      <div className="flex items-center gap-4 whitespace-nowrap rounded-lg bg-Secondary-100 px-6 py-4">
        <Paid />
        <span>تم الدفع : </span>
        <span className="mr-auto">{paidStudents}</span>
      </div>
      <div className="flex items-center gap-4 whitespace-nowrap rounded-lg bg-Secondary-100 px-6 py-4">
        <NotPaid />
        <span>لم يتم الدفع : </span>
        <span>{monthData?.monthStudents.length - paidStudents}</span>
      </div>
    </>
  );
}

export default CounterPaidStudents;
