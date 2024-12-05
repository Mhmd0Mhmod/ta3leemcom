import TrashIcon from "/public/Icons/trash_icon_gray.svg";
import TestImage from "/public/Icons/test_image.svg";
import Logo from "./Logo.jsx";
import TestInfo from "./TestInfo.jsx";
import TestTiming from "./TestTiming.jsx";
import { useSelector } from "react-redux";
import { isAfter } from "date-fns";

function TestSetting() {
  const { endDate } = useSelector((state) => state.test);
  let testEnded = isAfter(new Date(), new Date(endDate));

  return (
    <div className={"space-y-4 rounded-xl bg-white p-4"}>
      <div className={"flex items-center justify-between"}>
        <Logo />
        <TrashIcon />
      </div>

      <div className={"flex flex-col lg:flex-row lg:justify-between"}>
        <TestImage className={"self-center"} />
        <TestInfo />
        {testEnded ? (
          <span className="flex w-2/12 items-center rounded-md bg-red-400 p-2 text-center text-white">
            الاختبار منتهي
            <br />
            اي تعديل في اختبار منتهي سيوثر ع نتيجه الاختبار نفسه و علي درجات الطلاب
          </span>
        ) : (
          <TestTiming />
        )}
      </div>
    </div>
  );
}

export default TestSetting;
