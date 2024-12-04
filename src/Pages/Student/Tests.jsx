import { useAllStudentTests } from "../../Features/StudentTests/useAllStudentTests";
import CurrentTests from "../../UI/CurrentTests";
import Heading from "../../UI/Heading";
import EndedTestsTable from "../../UI/EndedTestsTable";
import HeadIcon from "/public/Icons/head-icon-student.svg";
import Loading from "../../UI/Loading";

function Tests() {
  let { tests, isLoading, error } = useAllStudentTests();

  if (isLoading) return <Loading />;
  tests = tests.map((test) => ({ ...test, duration: test.duration.replaceAll(".", ":") }));
  const currentTests = tests.filter((test) => (test.quizStatus === "Not Started" || test.quizStatus === "Started") && test.solveStatus === "Not Solved");
  const endedTests = tests.filter((test) => test.quizStatus === "Ended" || test.solveStatus === "Solved");

  return (
    <div className="student__tests mb-8 h-screen space-y-10">
      <div className={"flex items-center"}>
        <Heading as={"h3"}>الاختبارات الحالية </Heading>
        <HeadIcon />
      </div>
      <div className="max-h-96 overflow-auto">
        <CurrentTests tests={currentTests} />
      </div>
      <hr />
      <div className={"flex items-center"}>
        <Heading as={"h3"}>الاختبارات المنتهيه </Heading>
        <HeadIcon />
      </div>
      <EndedTestsTable tests={endedTests} />
    </div>
  );
}
export default Tests;
