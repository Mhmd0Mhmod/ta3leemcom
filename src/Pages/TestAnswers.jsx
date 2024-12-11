import { useSelector } from "react-redux";
import TestTitle from "../UI/TestTitle";
import TestAnswersList from "../UI/TestAnswersList";
import AnswersInfo from "../UI/AnswersInfo";
import { useStudentAnswers } from "../Features/TestResults/useStudentAnswers";

import Loading from "../UI/Loading";

function TestAnswers() {
  const { studentAnswers, isLoading, error } = useStudentAnswers();
  const test = useSelector((state) => state.test);
  const { answers } = useSelector((state) => state.testAnswers);
  if (isLoading) return <Loading />;
  const { quiz, studentSolve } = studentAnswers || {};
  const { title, questions } = test || {};

  return (
    <div id="testAnswers" className="space-y-5">
      <TestTitle title={quiz?.title || title} />
      <AnswersInfo
        mark={quiz?.mark || test?.mark}
        questions={quiz?.["questionsOfQuizzes"] || questions}
        timeDuration={quiz?.timeDuration || test.timeDuration}
        answers={studentSolve?.["answers"] || answers}
        rank={studentAnswers?.rank || null}
      />
      <TestAnswersList questions={quiz?.["questionsOfQuizzes"] || questions} answers={studentSolve?.["answers"] || answers} />
    </div>
  );
}

export default TestAnswers;
