import { useSelector } from "react-redux";
import Qustion from "./Question";

function Questions() {
  const questions = useSelector((state) => state.test?.questions);
  console.log(questions);

  return (
    <div className="space-y-4">
      {questions.map((question, i) => (
        <Qustion question={question} key={i} />
      ))}
    </div>
  );
}

export default Questions;
