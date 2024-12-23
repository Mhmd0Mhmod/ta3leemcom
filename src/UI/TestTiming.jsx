import OnlineIcon from "/public/Icons/online_icon.svg";
import { format, isAfter, isBefore } from "date-fns";
import TestDuration from "./TestDuration.jsx";
import Alarm from "/public/Icons/time_icon_2.svg";
import { Link, useParams } from "react-router-dom";
import EyeIcon from "../../public/Icons/show_icon.svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStartDate, setTimeDuration, setTimeStart } from "../Reducers/testReducer.js";
import Button from "./Button.jsx";
import { useUploadQuiz } from "../Features/TeacherTests/useUploadQuiz.js";
import toast from "react-hot-toast";
import { reset as resetTest } from "../Reducers/testReducer.js";
import { useUpdateUnStartedQuiz } from "../Features/TeacherTests/useUpdateUnStartedQuiz.js";

function TestTiming() {
  const { uploadQuiz, isPending: uploading, error: uploadinError } = useUploadQuiz();
  const { updateNotStartedTest, isPending: updatingNotStartQuiz, error: updateNotStartQuizError } = useUpdateUnStartedQuiz();
  const test = useSelector((state) => state.test);
  const { startDate: start, timeDuration } = test;

  const { register, watch, reset } = useForm({
    defaultValues: {
      startDate: start,
      ...timeDuration,
    },
  });
  const dispatch = useDispatch();
  const { startDate, hours, minute, days } = watch();
  useEffect(() => {
    if (start)
      reset({
        startDate: format(start, "yyyy-MM-dd'T'HH:mm"),
        ...timeDuration,
      });
  }, [start, timeDuration, reset]);
  useEffect(() => {
    if (timeDuration) reset({ ...timeDuration, startDate: format(start, "yyyy-MM-dd'T'HH:mm") });
  }, [timeDuration, reset, start]);

  function handleSubmit() {
    saveTime();

    const toastId = toast.loading("جاري حفظ الاختبار");
    if (test.id) {
      updateNotStartedTest(null, {
        onSuccess: () => {
          toast.success("تم حفظ الاختبار بنجاح", { id: toastId });
        },
        onError: (e) => {
          console.error(e);

          toast.error("حدث خطأ", { id: toastId });
        },
      });
      return;
    }

    uploadQuiz(null, {
      onSuccess: () => {
        toast.success("تم حفظ الاختبار بنجاح", { id: toastId });
        dispatch(resetTest());
      },
      onError: () => {
        toast.error("حدث خطأ", { id: toastId });
      },
    });
  }

  function saveTime() {
    dispatch(setStartDate(startDate));
    dispatch(setTimeDuration({ hours, minute, days }));
  }

  return (
    <div className={"flex flex-col justify-between gap-4"}>
      <div className={"flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
        <OnlineIcon />
        <span className={"text-sm"}>اونلاين</span>
      </div>

      <>
        <div className={"relative flex items-center gap-2 rounded-lg bg-gray-200 p-1"}>
          <Alarm />
          <TestDuration register={register} timeDuration={timeDuration} />
        </div>
        <div className={"rounded-lg bg-gray-200 p-1 text-sm"}>
          <input
            type={"datetime-local"}
            className={"w-full bg-gray-200"}
            defaultValue={format(startDate, "yyyy-MM-dd'T'HH:mm")}
            {...register("startDate")}
            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          />
        </div>

        <div>
          <Link to="/TDashboard/test/0">
            <span className={"flex items-center gap-2 rounded-lg bg-gray-200 p-2"} onClick={saveTime}>
              <EyeIcon />
              <span>{"عرض الاختبار"}</span>
            </span>
          </Link>
        </div>
        <Button type={"Secondary"} onClick={handleSubmit} disabled={uploading || updatingNotStartQuiz} className={"disabled:bg-gray-200 disabled:text-gray-500"}>
          حفظ الاختبار
        </Button>
      </>
    </div>
  );
}

export default TestTiming;
