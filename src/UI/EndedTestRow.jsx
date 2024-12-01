import { format } from "date-fns";
import { TableCell } from "./Table";
import { Link } from "react-router-dom";

function EndedTestRow({ test }) {
  const { quizStatus, startDate, solveStatus, title, studentMark } = test;

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
        {quizStatus === "Ended" && solveStatus === "Solved" && <span className="text-green-500">{studentMark}</span>}
        {quizStatus === "Ended" && solveStatus === "Not Solved" && <span className="text-red-500">لم يتم الحل</span>}
        {quizStatus === "Started" && <span className="text-yellow-500">جاري الاختبار</span>}
      </TableCell>
      <TableCell align="center">
        {quizStatus === "Ended" && <span className="text-green-500">انتهي الاختبار</span>}
        {quizStatus === "Started" && <span className="text-yellow-500">جاري الاختبار</span>}
      </TableCell>
      <TableCell align="center">{test.startDate && test.endDate ? "اونلاين" : "اوفلاين"}</TableCell>
      <TableCell align="center">{format(startDate, "yyyy/MM/dd")}</TableCell>
    </>
  );
}
export default EndedTestRow;
