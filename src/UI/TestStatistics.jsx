import { useTestStatistics } from "../Features/TestResults/useTestStatistics";
import Loading from "./Loading";
import QuestionStatistics from "./QuestionStatistics";

function TestStatistics() {
  const { testStatistics, isLoading, isError } = useTestStatistics();
  if (isLoading) return <Loading />;
  return <div className="space-y-5">{testStatistics && testStatistics.map((question, idx) => <QuestionStatistics key={question.studentId} question={question} idx={idx} />)}</div>;
}
export default TestStatistics;
