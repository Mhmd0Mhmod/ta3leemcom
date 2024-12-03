import { useSelector } from "react-redux";
import Qustion from "./Question";

function Questions() {
  const questions = useSelector((state) => state.test?.questions);

  return (
    <div className="space-y-4">
      {questions.map((question, i) => (
        <Qustion question={question} number={i + 1} key={i} />
      ))}
    </div>
  );
}

export default Questions;
