import TrashIcon from "/public/Icons/trash_icon_gray.svg";
import TestImage from "/public/Icons/test_image.svg";
import Logo from "./Logo.jsx";
import TestInfo from "./TestInfo.jsx";
import TestTiming from "./TestTiming.jsx";

function TestSetting() {
  return (
    <div className={"space-y-4 rounded-xl bg-white p-4"}>
      <div className={"flex items-center justify-between"}>
        <Logo />
        <TrashIcon />
      </div>

      <div className={"flex flex-col lg:flex-row lg:justify-between"}>
        <TestImage className={"self-center"} />
        <TestInfo />
        <TestTiming />
      </div>
    </div>
  );
}

export default TestSetting;
