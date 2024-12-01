import { useAllStudentTests } from "../../Features/StudentTests/useAllStudentTests";
import CurrentTests from "../../UI/CurrentTests";
import Heading from "../../UI/Heading";
import EndedTestsTable from "../../UI/EndedTestsTable";
import HeadIcon from "/public/Icons/head-icon-student.svg";
import Loading from "../../UI/Loading";

function Tests() {
  const { tests, isLoading, error } = useAllStudentTests();
  if (isLoading) return <Loading />;
  const currentTests = tests.filter((test) => (test.quizStatus === "Not Started" || test.quizStatus === "Started") && test.solveStatus === "Not Solved");
  const endedTests = tests.filter((test) => test.quizStatus === "Ended" || test.solveStatus === "Solved");
  console.log(endedTests);

  return (
    <div className="student__tests h-screen space-y-10">
      <div className={"flex items-center"}>
        <Heading as={"h3"} className={"font-almaria-bold"}>
          الاختبارات الحالية{" "}
        </Heading>
        <HeadIcon />
      </div>
      <div className="max-h-96 overflow-auto">
        <CurrentTests tests={currentTests} />
      </div>

      <hr />
      <div className={"flex items-center"}>
        <Heading as={"h3"} className={"font-almaria-bold"}>
          الاختبارات المنتهيه{" "}
        </Heading>
        <HeadIcon />
      </div>
      <EndedTestsTable tests={endedTests} />
    </div>
  );
}
export default Tests;
