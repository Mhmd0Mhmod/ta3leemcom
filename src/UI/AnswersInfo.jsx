import { Printer } from "lucide-react";
import Heading from "./Heading";
import { useSelector } from "react-redux";

function AnswersInfo({ questions, timeDuration, mark, answers }) {
  // const test = useSelector((state) => state.test);
  // const answers = useSelector((state) => state.testAnswers.answers);

  const correctAnswers = questions.map((question) => question.choices.find((choice) => choice.isCorrect)?.id);

  const studentAnswers = answers?.map((answer) => answer.choiceId);
  const correctAnswersCount = correctAnswers.reduce((acc, correctAnswer, index) => {
    if (correctAnswer === +studentAnswers[index]) {
      return acc + 1;
    }
    return acc;
  }, 0);

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
          <span>{timeDuration.minute}</span>
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
