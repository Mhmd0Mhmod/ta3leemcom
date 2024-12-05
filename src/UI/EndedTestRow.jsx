import { TableCell, TableRow } from "./Table";
import { Link, useNavigate } from "react-router-dom";
import { translateToArabicDate } from "../lib/lib.js";
import Button from "./Button.jsx";

function EndedTestRow({ test }) {
  const { quizStatus, startDate, solveStatus, title, studentMark, totalMark, studentQuizId } = test;
  const navgiate = useNavigate();
  function handleOnClick(e) {
    e.stopPropagation();
    if (quizStatus !== "Ended" || solveStatus === "Not Solved") return;
    navgiate(`/SDashboard/test/${studentQuizId}/answers`);
  }
  function handleTryTest(e) {
    e.stopPropagation();
    if (quizStatus !== "Ended") return;
    navgiate(`/SDashboard/test/${test.quizId}`);
  }

  return (
    <TableRow onClick={handleOnClick}>
      <TableCell>
        <div className="flex items-center justify-between">
          <span>{title}</span>
          {quizStatus === "Ended" && (
            <Button type={"Secondary"} onClick={handleTryTest}>
              محاوله تدريبيه
            </Button>
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
    </TableRow>
  );
}
export default EndedTestRow;
