import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { getYearMonths } from "../lib/lib.js";

const allMonths = getYearMonths();

function MonthsList() {
  const [search, setSearch] = useState("");
  const [months, setMonths] = useState(allMonths);
  const [selectedMonth, setSelectedMonth] = useState([]);

  function selectMonth(e) {
    if (e.target.checked) {
      setSelectedMonth((prev) => [...prev, e.target.value]);
    } else {
      setSelectedMonth((prev) => prev.filter((month) => month !== e.target.value));
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (search.length > 0) {
      const filtered = allMonths.filter((month) => month.name.includes(search));
      setMonths(filtered);
    } else {
      setMonths(allMonths);
    }
  }, [search]);
  return (
    <div className={"flex w-fit flex-col gap-6 rounded bg-white p-5 text-xl shadow-xl"}>
      <input type={"text"} placeholder={"ابحث عن شهر"} className={"rounded border p-2 text-black"} value={search} onChange={handleSearch} />
      <div className={"max-h-56 overflow-auto text-right"}>
        {months.map((month, index) => (
          <label htmlFor={month.name + index} key={index} className={"flex gap-4 rounded border-b p-2 text-black duration-500 hover:bg-[#B4D3E0]"}>
            <input type={"checkbox"} name={"months"} value={month.name} id={month.name + index} className={"w-[22px]"} onChange={selectMonth} />
            <p className="flex flex-1 justify-between">
              {month.name} <span>{month.year}</span>
            </p>
          </label>
        ))}
      </div>
      {selectedMonth.length > 0 && (
        <div className={"flex gap-4"}>
          <Button type={"normal"} className={"w-full border text-black"} onClick={() => setSelectedMonth([])}>
            الغاء
          </Button>
          <Button type={"Secondary"} className={"w-full"} onClick={() => {}}>
            اضافه
          </Button>
        </div>
      )}
    </div>
  );
}

export default MonthsList;
