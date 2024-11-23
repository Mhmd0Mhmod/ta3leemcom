import { useState } from "react";
import Button from "./Button.jsx";
import { getYearMonths } from "../lib/lib.js";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useAddMonths } from "../Features/TeacherMonths/useAddMonths.js";
import { useMonths } from "../Features/TeacherMonths/useMonths.js";

let allMonths = getYearMonths();
function MonthsList() {
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      months: [],
    },
  });
  const { months } = watch();
  const [search, setSearch] = useState("");
  const { addMonths } = useAddMonths();
  const { months: all } = useMonths();
  allMonths = allMonths.filter((month) => !all.some((m) => m.monthName === month.name && m.year === month.year));
  const filteredMonths = allMonths.filter((month) => month.name.toLowerCase().includes(search.toLowerCase()));

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function onSubmit(data) {
    const { months } = data;
    addMonths(months, {
      onSuccess: () => {
        reset({
          months: [],
        });
        toast.success("تمت اضافه الاشهر بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ ما أثناء الاضافه");
      },
    });
  }

  // Function to remove the month when 'X' is clicked
  const removeMonth = (e, monthToRemove, field) => {
    e.stopPropagation();
    const updatedMonths = field.value.filter((month) => month?.id !== monthToRemove?.id || (month.name !== monthToRemove.name && month.year !== monthToRemove.year));
    field.onChange(updatedMonths);
  };
  if (!filteredMonths.length)
    return (
      <div className="flex w-fit flex-col gap-6 overflow-y-auto rounded bg-white p-5 text-xl shadow-xl">
        <p>جميع الاشهر مضافه </p>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-fit flex-col gap-6 overflow-y-auto rounded bg-white p-5 text-xl shadow-xl">
      <input type="text" placeholder="ابحث عن شهر" className="rounded border p-2 text-black" value={search} onChange={handleSearch} />
      <div className="max-h-44 overflow-auto text-right">
        {filteredMonths.map((month) => (
          <Controller
            key={month.id}
            name="months"
            control={control}
            render={({ field }) => (
              <label htmlFor={month.name} className="flex items-center gap-4 rounded border-b p-2 text-black duration-500 hover:bg-[#B4D3E0]">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  id={month.name}
                  checked={field.value.some((m) => m.id === month.id)}
                  onChange={(e) => {
                    const newValue = e.target.checked ? [...field.value, month] : field.value.filter((m) => m.id !== month.id);
                    field.onChange(newValue);
                  }}
                />
                <p>{month.name} </p>
                <p className="mr-auto">{month.year}</p>
              </label>
            )}
          />
        ))}
      </div>
      {months.length > 0 && (
        <div className={"space-y-1"}>
          <h3 className="text-xl">الأشهر المختارة:</h3>
          <ul className="flex flex-wrap gap-1">
            {months.map((month, index) => (
              <Controller
                key={index}
                render={({ field }) => (
                  <li key={index} className="flex items-center rounded bg-Secondary-100 p-[.30rem] text-sm text-white">
                    <X
                      className="h-5 w-5 cursor-pointer"
                      onClick={(e) => {
                        removeMonth(e, month, field);
                      }}
                    />
                    <span>
                      {month.name} - {month.year}
                    </span>
                  </li>
                )}
                name={"months"}
                control={control}
              />
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-4">
        <Button
          type="normal"
          className="w-full border text-black"
          formType="reset"
          onClick={() => {
            reset({
              months: [],
            });
            toast.success("تم الغاء الاضافه");
          }}
        >
          الغاء
        </Button>
        <Button type="Secondary" className="w-full" formType="submit">
          اضافه
        </Button>
      </div>
    </form>
  );
}

export default MonthsList;
