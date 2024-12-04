import { AlarmCheck } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function TestTimer({ onSubmit }) {
  const test = useSelector((state) => state.test);
  const [startCount, setStartCount] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!startCount) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startCount]);
  useEffect(() => {
    if (!test) return;
    const { hours, minute, days } = test.timeDuration;
    setTime(minute * 60 + hours * 3600 + days * 86400);
    setStartCount(true);
  }, [test]);

  useEffect(() => {
    if (!startCount) return;
    if (time === 0) {
      toast.success("تم انتهاء الوقت");
      onSubmit();
    }
  }, [time, test, onSubmit, startCount]);
  return (
    <div className="mr-auto flex w-fit gap-3 rounded-md bg-white p-2">
      <AlarmCheck />
      <p>
        <span>{time % 60} : </span>
        <span>{Math.floor(time / 60) % 60} : </span>
        <span>{Math.floor(time / 3600) % 24} : </span>
        <span>{Math.floor(time / 86400)} </span>
      </p>
    </div>
  );
}
export default TestTimer;
