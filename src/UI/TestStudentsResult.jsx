import { format } from "date-fns";
import { useStudentsReuslt } from "../Features/TestResults/useStudentsReuslt";
import { useTestDesc } from "../Features/TestResults/useTestDesc";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeadCell } from "./Table";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiXCircle } from "react-icons/hi2";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
function TestStudentsResult() {
  const navigate = useNavigate();
  const { studentsAnswers, isLoading: answersLoading, error: answersErrors } = useStudentsReuslt();
  const { testDesc, isLoading: descLoading, error: descError } = useTestDesc();
  console.log(studentsAnswers);

  if (answersLoading || descLoading) return <Loading />;
  return (
    <div className="flex overflow-auto whitespace-nowrap">
      <Table className={"max-w-screen rounded-none shadow-none"}>
        <TableHead>
          <TableHeadCell>الوقت</TableHeadCell>
          <TableHeadCell>الطالب</TableHeadCell>
          <TableHeadCell>الدرجه</TableHeadCell>
          <TableHeadCell>بونص</TableHeadCell>
          <TableHeadCell>الدرجه النهائيه</TableHeadCell>
          {testDesc?.questionsDes.map((question, idx) => (
            <TableHeadCell key={idx}>
              <div className="font-al flex flex-col items-center">
                <span>{question.type === "mandatory" ? `س${idx + 1}` : `ب${idx + 1}`}</span>
                <span className="w-6 rounded-full bg-gray-400">{question.mark}</span>
              </div>
            </TableHeadCell>
          ))}
        </TableHead>
        <TableBody>
          {studentsAnswers?.map((student) => (
            <TableRow onClick={() => navigate(`/TDashboard/test/${student.id}/answers`)} key={student.id}>
              <TableCell align="center">{format(student.submitAnswerTime, "hh:mm a")}</TableCell>
              <TableCell align="center" className={"text-ellipsis"}>
                {student.stuentName}{" "}
              </TableCell>
              <TableCell align="center">
                {student.studentMark} / {student.quizMark}
              </TableCell>
              <TableCell align="center">
                {student.studentBounce} / {student.quizBounce}
              </TableCell>
              <TableCell align="center">
                {student.studentMark + student.studentBounce} / {student.quizMark}
              </TableCell>
              {student.answers.map((answer, idx) => (
                <TableCell align="center" key={idx}>
                  {answer.iscorrect ? <HiMiniCheckCircle className="m-auto h-10 w-10 text-green-500" /> : <HiXCircle className="m-auto h-10 w-10 text-red-500" />}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default TestStudentsResult;
