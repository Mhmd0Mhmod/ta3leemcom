import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#28a745", "#dc3545"]; // Green and Red

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="text-sm font-semibold">
      {`${(percent * 100).toFixed(0)} %`}
    </text>
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex flex-col text-right">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="mb-1 flex items-center gap-2">
          <span className="mr-2 block h-3 w-3" style={{ backgroundColor: entry.color }}></span>
          <span className="text-sm font-medium text-gray-700">
            {entry.payload.value} {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const prepareData = (choices) => {
  const data = [
    { name: "صحيح", value: choices.find((choice) => choice.isCorrect).choiceSelectionCount },
    {
      name: "خطأ",
      value: choices
        .filter((choice) => !choice.isCorrect)
        .reduce((acc, choice) => {
          return acc + choice.choiceSelectionCount;
        }, 0),
    },
  ];
  return data;
};

const PieChartComponent = ({ choices }) => {
  const data = prepareData(choices);

  return (
    <div className="h-auto w-full overflow-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie className="focus:outline-none" data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomLabel} outerRadius="80%" fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" verticalAlign="middle" align="right" content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
