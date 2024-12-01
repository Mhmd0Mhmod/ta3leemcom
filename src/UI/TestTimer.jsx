import { AlarmCheck } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function TestTimer({ timeDuration, onSubmit }) {
  const { hours, minutes, days } = timeDuration;
  const [time, setTime] = useState(minutes * 60 + hours * 3600 + days * 86400);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (time === 0) {
      toast.success("تم انتهاء الوقت");
      onSubmit();
    }
  }, [time, onSubmit]);

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
