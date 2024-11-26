import OnlineIcon from "/public/Icons/online_icon.svg";
import { format } from "date-fns";
import TestDuration from "./TestDuration.jsx";
import Alarm from "/public/Icons/time_icon_2.svg";
import { Link } from "react-router-dom";
import EyeIcon from "../../public/Icons/show_icon.svg";

function TestTiming() {
  return (
    <div className={"flex flex-col justify-between gap-4"}>
      <div className={"flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
        <OnlineIcon />
        <span className={"text-sm"}>اونلاين</span>
      </div>
      <div className={"relative flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
        <Alarm />
        <TestDuration />
      </div>
      <input
        type={"datetime-local"}
        className={"rounded-lg bg-gray-200 p-1 text-sm"}
        value={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        onChange={(e) => console.log(e.target.value)}
      />
      <div>
        <Link to="/TDashboard/test/0">
          <span className={"flex items-center gap-2 rounded-lg bg-gray-300 p-2"}>
            <EyeIcon />
            <span>{"عرض الاختبار"}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default TestTiming;
