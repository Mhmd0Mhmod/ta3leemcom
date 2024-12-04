import { useSelector } from "react-redux";
import TestTitle from "../UI/TestTitle";
import TestAnswersList from "../UI/TestAnswersList";
import AnswersInfo from "../UI/AnswersInfo";

function TestAnswers() {
  const test = useSelector((state) => state.test);
  const { answers } = useSelector((state) => state.testAnswers);
  return (
    <div className="space-y-5">
      <TestTitle title={test.title} />
      <AnswersInfo test={test} answers={answers} />
      <TestAnswersList questions={test.questions} answers={answers} />
    </div>
  );
}

export default TestAnswers;
