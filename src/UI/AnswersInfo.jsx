import { Printer } from "lucide-react";
import Heading from "./Heading";

function AnswersInfo({ test, answers }) {
  const mark = test.mark;
  const { questions } = test;
  const correctAnswers = questions.map((question) => question.choices.find((choice) => choice.isCorrect).id);
  const studentAnswers = answers.map((answer) => answer.choiceId);
  const correctAnswersCount = correctAnswers.reduce((acc, correctAnswer, index) => {
    if (correctAnswer === +studentAnswers[index]) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const { timeDuration } = test;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Heading as="h4">الدرجه :</Heading>
        <span className="flex gap-3 rounded-md bg-white p-2">
          <span>{correctAnswersCount >= mark ? mark : correctAnswersCount}</span>
          <span>/</span>
          <span>{mark}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Heading as="h4">الوقت :</Heading>
        <span className="flex gap-3 rounded-md bg-white p-2">
          <span>{timeDuration.minutes}</span>
          <span>:</span>
          <span>{timeDuration.hours}</span>
          <span>:</span>
          <span>{timeDuration.days}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Heading as="h4">الترتيب :</Heading>
        <span className="flex gap-3 rounded-md bg-white p-2">
          <span>1</span>
        </span>
      </div>

      <Printer />
    </div>
  );
}
export default AnswersInfo;
