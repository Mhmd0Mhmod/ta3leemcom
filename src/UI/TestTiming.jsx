import OnlineIcon from "/public/Icons/online_icon.svg";
import { format } from "date-fns";
import TestDuration from "./TestDuration.jsx";
import Alarm from "/public/Icons/time_icon_2.svg";
import { Link } from "react-router-dom";
import EyeIcon from "../../public/Icons/show_icon.svg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setStartDate, setTimeDuration } from "../Reducers/testReducer.js";

function TestTiming() {
  const { register, watch } = useForm();
  const dispatch = useDispatch();
  const { startDate, timeDuration } = watch();
  useEffect(() => {
    if (startDate) {
      dispatch(setStartDate(startDate));
    }
    if (timeDuration) {
      dispatch(setTimeDuration(timeDuration));
    }
  }, [startDate, timeDuration, dispatch]);
  return (
    <div className={"flex flex-col justify-between gap-4"}>
      <div className={"flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
        <OnlineIcon />
        <span className={"text-sm"}>اونلاين</span>
      </div>

      <div className={"relative flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
        <Alarm />
        <TestDuration register={register} />
      </div>
      <div className={"rounded-lg bg-gray-200 p-1 text-sm"}>
        <input
          type={"datetime-local"}
          className={"w-full bg-gray-200"}
          value={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          {...register("startDate")}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div>
        <Link to="/TDashboard/test/0">
          <span className={"flex items-center gap-2 rounded-lg bg-gray-200 p-2"}>
            <EyeIcon />
            <span>{"عرض الاختبار"}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default TestTiming;
