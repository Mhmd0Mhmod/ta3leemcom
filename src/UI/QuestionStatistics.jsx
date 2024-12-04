import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";

function QuestionStatistics({ question, idx }) {
  const { questionContent, correctAnswerCount, incorrectAnswerCount, choices } = question;
  return (
    <div className="space-y-5 rounded-md bg-white p-4">
      <p>
        {idx + 1}. {questionContent}
      </p>
      <p className="text-gray-500">{correctAnswerCount + incorrectAnswerCount} اجابه </p>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <PieChartComponent choices={choices} />
        <BarChartComponent choices={choices} />
      </div>
    </div>
  );
}
export default QuestionStatistics;
