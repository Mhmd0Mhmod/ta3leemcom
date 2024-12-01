import OnlineIcon from "/public/Icons/online_icon.svg";
import { format } from "date-fns";
import TestDuration from "./TestDuration.jsx";
import Alarm from "/public/Icons/time_icon_2.svg";
import { Link, useParams } from "react-router-dom";
import EyeIcon from "../../public/Icons/show_icon.svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, setStartDate, setTimeDuration } from "../Reducers/testReducer.js";
import Button from "./Button.jsx";
import { useUploadQuiz } from "../Features/TeacherTests/useUploadQuiz.js";
import toast from "react-hot-toast";

function TestTiming() {
  const { uploadQuiz, isPending, error } = useUploadQuiz();
  const { testId } = useParams();

  const {
    startDate: start,
    timeDuration: { hours: h, minutes: m, days: d },
  } = useSelector((state) => state.test);
  const { register, watch } = useForm({
    defaultValues: {
      startDate: start || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      hours: h,
      minutes: m,
      days: d,
    },
  });
  const dispatch = useDispatch();
  const { startDate, hours, minutes, days } = watch();
  useEffect(() => {
    if (startDate) {
      dispatch(setStartDate(startDate));
    }
  }, [startDate, dispatch]);
  useEffect(() => {
    dispatch(setTimeDuration({ hours, minutes, days }));
  }, [hours, minutes, days, dispatch]);
  function handleSubmit() {
    if (testId !== "0") {
      return;
    }
    uploadQuiz(null, {
      onSuccess: () => {
        toast.success("تم حفظ الاختبار بنجاح");
        dispatch(reset());
      },
      onError: () => {
        toast.error("حدث خطأ");
      },
    });
  }
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
        <input type={"datetime-local"} className={"w-full bg-gray-200"} defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")} {...register("startDate")} />
      </div>

      <div>
        <Link to="/TDashboard/test/0">
          <span className={"flex items-center gap-2 rounded-lg bg-gray-200 p-2"}>
            <EyeIcon />
            <span>{"عرض الاختبار"}</span>
          </span>
        </Link>
      </div>
      <Button type={"Secondary"} onClick={handleSubmit} disabled={isPending} className={"disabled:bg-gray-200 disabled:text-gray-500"}>
        حفظ الاختبار
      </Button>
    </div>
  );
}

export default TestTiming;
