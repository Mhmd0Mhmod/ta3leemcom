import { useSelector } from "react-redux";
import Qustion from "./Question";
import { isAfter } from "date-fns";

function Questions() {
  const test = useSelector((state) => state.test);
  const { endDate, questions } = test;
  const ended = isAfter(new Date(), new Date(endDate));

  return (
    <div className="space-y-4">
      {questions.map((question, i) => (
        <Qustion question={question} number={i + 1} key={i} ended={ended} />
      ))}
    </div>
  );
}

export default Questions;
