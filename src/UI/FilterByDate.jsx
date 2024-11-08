import Menu from "../Context/Menu.jsx";
import { useForm } from "react-hook-form";
import { format, isAfter, isBefore, startOfISOWeek, startOfToday, startOfYesterday } from "date-fns";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function FilterByDate() {
  const { register, watch, setValue } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const today = format(startOfToday(), "yyyy-MM-dd");
  const yesterday = format(startOfYesterday(), "yyyy-MM-dd");
  const day = watch("day", null);
  const from = watch("from", null);
  const to = watch("to", today);
  useEffect(() => {
    if (day) {
      setSearchParams({ day });
    }
    if (from && to) {
      if (isBefore(from, to)) {
        setSearchParams({ from, to });
      } else {
        toast.error("التاريخ الاول يجب ان يكون قبل التاريخ الثاني");
      }
    }
  }, [day, from, to, searchParams, setSearchParams]);

  function handleReset() {
    searchParams?.delete("day");
    searchParams?.delete("from");
    searchParams?.delete("to");
    setSearchParams(searchParams);
    setValue("day", null);
    setValue("from", null);
    setValue("to", today);
  }

  return (
    <div className={"flex flex-col gap-4 bg-white p-4"}>
      <form className={"flex gap-5"}>
        <div className={"flex flex-col divide-y border p-1"}>
          <label htmlFor="from">من</label>
          <input type="date" id="from" {...register("from")} />
        </div>
        <div className={"flex flex-col divide-y border p-1"}>
          <label htmlFor="to">الى</label>
          <input
            type="date"
            id="to"
            {...register("to", {
              value: today,
            })}
          />
        </div>
      </form>
      <label className={"border px-4 py-2"} htmlFor={"today"}>
        اليوم
      </label>
      <input className={"hidden"} type={"radio"} value={today} id={"today"} {...register("day")} />

      <label className={"border px-4 py-2"} htmlFor={"yesterday"}>
        امس
      </label>
      <input type={"radio"} value={yesterday} className={"hidden"} id={"yesterday"} {...register("day")} />
      <span className={"cursor-pointer text-Secondary-500 underline"} onClick={handleReset}>
        الغاء
      </span>
    </div>
  );
}

export default FilterByDate;
