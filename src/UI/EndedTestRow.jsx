import { TableCell } from "./Table";
import { Link, useNavigate } from "react-router-dom";
import { translateToArabicDate } from "../lib/lib.js";

function EndedTestRow({ test }) {
  const { quizStatus, startDate, solveStatus, title, studentMark, totalMark } = test;
  const navgiate = useNavigate();
  function handleOnClick() {
    navgiate(-1);
  }

  return (
    <>
      <TableCell>
        <div className="flex items-center justify-between">
          <span>{title}</span>
          {quizStatus === "Ended" && (
            <Link to={`/SDashboard/test/${test.quizId}`} className="rounded-md bg-Secondary-500 px-4 py-2 text-white">
              محاوله تدريبيه
            </Link>
          )}
        </div>
      </TableCell>
      <TableCell align="center">
        {quizStatus === "Ended" && solveStatus === "Solved" && (
          <div className="space-x-2">
            <span className="text-gray-500">{totalMark}</span>
            <span className="text-gray-500">/</span>
            <span className="peer text-green-500">{studentMark}</span>
          </div>
        )}
        {quizStatus === "Ended" && solveStatus === "Not Solved" && <span className="text-red-500">لم يتم الحل</span>}
        {quizStatus === "Started" && <span className="text-yellow-500">جاري الاختبار</span>}
      </TableCell>
      <TableCell align="center">
        {quizStatus === "Ended" && <span className="text-green-500">انتهي الاختبار</span>}
        {quizStatus === "Started" && <span className="text-yellow-500">جاري الاختبار</span>}
      </TableCell>
      <TableCell align="center">{test.startDate && test.endDate ? "اونلاين" : "اوفلاين"}</TableCell>
      <TableCell align="center">{translateToArabicDate(startDate)}</TableCell>
    </>
  );
}
export default EndedTestRow;
