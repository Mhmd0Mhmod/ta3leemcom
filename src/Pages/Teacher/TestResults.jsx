import { Outlet } from "react-router-dom";
import TestResultsTitle from "../../UI/TestResultsTitle";

function TestResults() {
  return (
    <div className="space-y-5">
      <TestResultsTitle />
      <Outlet />
    </div>
  );
}

export default TestResults;
