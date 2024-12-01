import { compareAsc, parseISO } from "date-fns";
import CurrentTest from "./CurrentTest";

function CurrentTests({ tests }) {
  const sortedTests = tests.sort((a, b) => compareAsc(parseISO(a.startDate), parseISO(b.startDate)));
  console.log(sortedTests);

  return (
    <div className="space-y-5">
      {sortedTests.map((test, i) => (
        <div key={test.quizId} className="flex items-center gap-4 whitespace-nowrap">
          <span>{i + 1} - </span>
          <CurrentTest test={test} />
        </div>
      ))}
    </div>
  );
}
export default CurrentTests;
