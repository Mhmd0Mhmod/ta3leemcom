import { Outlet } from "react-router-dom";
import TestResultsTitle from "../../UI/TestResultsTitle";

function TestResults() {
  return (
    <>
      <TestResultsTitle />
      <Outlet />
    </>
  );
}

export default TestResults;
