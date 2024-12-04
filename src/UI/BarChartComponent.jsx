import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList } from "recharts";

const prepare = (choices) => {
  const countAll = choices.reduce((acc, choice) => acc + choice.choiceSelectionCount, 0);
  return choices.map((choice, idx) => ({
    number: idx + 1,
    count: choice.choiceSelectionCount,
    labelList: `${choice.choiceSelectionCount} (${((choice.choiceSelectionCount / countAll) * 100).toFixed(2)}%)`,
    fill: choice.isCorrect ? "#2DC071" : "#E0232E", // Color based on correctness
  }));
};

const BarChartComponent = ({ choices }) => {
  const data = prepare(choices);
  return (
    <div className="h-[400px] w-full overflow-auto sm:h-[500px] md:h-[600px] lg:h-[700px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="number" />
          <Bar dataKey="count" barSize={100}>
            <LabelList dataKey="labelList" position="insideTop" fill="#1f2937" className="bar-text" fontSize={18} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
