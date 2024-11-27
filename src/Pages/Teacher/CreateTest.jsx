import { Outlet } from "react-router-dom";
import TestSetting from "../../UI/TestSetting.jsx";

function CreateTest() {
  return (
    <div className="space-y-10">
      <TestSetting />
      <Outlet />
    </div>
  );
}

export default CreateTest;
