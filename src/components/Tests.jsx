import { useSearchParams } from "react-router-dom";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { constraints } from "../config";
import { useState } from "react";

const TESTS = [
 { title: "Math Test", type: "اوفلاين", date: "8/18/2024" },
 { title: "Science Project", type: "اونلاين", date: "8/17/2024" },
 { title: "History Exam", type: "اوفلاين", date: "8/16/2024" },
 { title: "English Essay", type: "اونلاين", date: "8/15/2024" },
 { title: "Physics Lab", type: "اوفلاين", date: "8/14/2024" },
 { title: "Chemistry Quiz", type: "اونلاين", date: "8/13/2024" },
 { title: "Geography Presentation", type: "اوفلاين", date: "8/12/2024" },
 { title: "Art Project", type: "اونلاين", date: "8/11/2024" },
 { title: "Computer Science Test", type: "اوفلاين", date: "2024-10-30" },
 { title: "Biology Lab", type: "اونلاين", date: "2024-09-15" },
];

function Tests() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [addTestUl, setAddTestUl] = useState(false);
 const [filterByDateUl, setFilterByDateUl] = useState(false);
 const [filterByTestTypeUl, setFilterByTestTypeUl] = useState(false);
 const [tests, setTests] = useState(TESTS);
 const [search, setSearch] = useState("");
 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };

 console.log(searchParams.get("group"));

 const formatDate = (date) => {
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
 };
 const today = new Date();

 // Yesterday's date
 const yesterday = new Date();
 yesterday.setDate(today.getDate() - 1);

 // A week ago
 const aWeekAgo = new Date();
 aWeekAgo.setDate(today.getDate() - 7);

 const handleSearch = (e) => {
  const searchValue = e.target.value.toLowerCase();
  setSearch(searchValue);

  const regex = new RegExp(
   searchValue
    .split(" ")
    .map((word) => `(?=.*${word})`)
    .join(""),
   "i"
  );

  setTests(TESTS.filter((test) => regex.test(test.title)));
 };

 return (
  <div className="px-12 py-16">
   <button className="flex gap-1" onClick={backToLevel}>
    <img src="Icons/rev_arrow.svg" alt="" />
    <Heading as={"h3"} className={"text-secondary underline font-almaria-bold"}>
     العوده الي المراحل الدراسية
    </Heading>
   </button>
   <Heading as={"h1"} className={"my-6 text-black font-almaria-bold"}>
    الاختبارات
   </Heading>
   <hr className="w-[70%]" />
   <div className="flex gap-2 mt-4 mb-12 font-almaria-light">
    <button
     className="flex gap-1"
     onClick={() => setSearchParams({ tab: "level" })}
    >
     <span>المراحل الدراسية</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button
     className="flex gap-1"
     onClick={() =>
      setSearchParams({ tab: "level", level: searchParams.get("level") })
     }
    >
     <span>{constraints[searchParams.get("level")].text}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>
      {
       constraints[searchParams.get("level")].content[
        +searchParams.get("subLevel")
       ]
      }
     </span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>{searchParams.get("group").replaceAll("_", " / ")}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <div className="flex gap-1 font-almaria-bold">
     <span>الاختبارات</span>
    </div>
   </div>
   <Button
    type="Secondary"
    icon={<img src="Icons/plus.svg" />}
    className={"relative"}
    onClick={() => setAddTestUl((prev) => !prev)}
   >
    اضافة اختبار
    <div
     className={`opacity-0 duration-300 transition-all absolute -left-36 top-2 w-32 mt-4 text-black ${
      addTestUl ? "opacity-100" : "pointer-events-none"
     }`}
    >
     <ul
      onClick={(event) => event.stopPropagation()} // Prevent click event from propagating
      className="flex flex-col gap-2 text-lg font-almaria-bold text-start"
     >
      <li className="bg-white rounded-xl border px-2 py-1 hover:bg-gray-300 duration-300">
       <button
        className="w-full h-full"
        onClick={() => {
         searchParams.set("test", "online");
         setSearchParams(searchParams);
        }}
       >
        اونلاين
       </button>
      </li>
      <li className="bg-white rounded-xl border px-2 py-1 hover:bg-gray-300 duration-300">
       <button
        className="w-full h-full"
        onClick={() => {
         searchParams.set("test", "offline");
         setSearchParams(searchParams);
        }}
       >
        اوفلاين
       </button>
      </li>
     </ul>
    </div>
   </Button>
   <div className="flex gap-4 mt-12 mb-6 font-almaria-bold items-center">
    <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 rounded-lg ">
     <img src="Icons/search_icon.svg" alt="search" />
     <input
      type="text"
      placeholder="اسم الاختبار"
      className="w-full"
      value={search}
      onChange={handleSearch}
     />
    </div>
    <Button
     type="Secondary"
     className={"bg-accent-900 !text-black  font-almaria-light"}
    >
     بحث
    </Button>

    <Button
     type="Secondary"
     className={"!bg-accent-900 relative"}
     icon={<img src="Icons/calender.svg" alt="date" className="h-8" />}
     onClick={() => setFilterByDateUl((prev) => !prev)}
    >
     <div className="flex gap-2 !text-black font-almaria-light ">
      <span> تصفية بالتاريخ</span>
      <img
       src="Icons/breadcrumb_arrow.svg"
       alt="arrow"
       className={`${
        filterByDateUl
         ? "rotate-90 duration-300 transition-all"
         : "-rotate-90  duration-300 transition-all"
       } `}
      />
     </div>
     <div
      onClick={(e) => {
       e.stopPropagation();
      }}
      className={`opacity-0  duration-300 transition-all absolute bottom-20 left-0 bg-white rounded-lg border border-secondary mt-4 text-black ${
       filterByDateUl ? "opacity-100" : "pointer-events-none"
      }`}
     >
      <div className="flex flex-col gap-2 p-4 text-lg font-almaria text-start">
       <div
        className="flex gap-8 mb-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating
       >
        <div>
         <p className="mb-2">من</p>
         <input
          type="date"
          id="fromDate"
          className="rounded-l border border-secondary px-2 py-1"
         />
        </div>
        <div>
         <p className="mb-2">الي</p>
         <input
          type="date"
          id="fromDate"
          className="rounded-l border border-secondary px-2 py-1"
         />
        </div>
       </div>
       <button
        disabled={!filterByDateUl}
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS.filter((test) => test.date === formatDate(today)));
         setFilterByDateUl(false);
        }}
        className="rounded-xl duration-500 transition-all hover:bg-accent-900 border border-secondary text-start p-3"
       >
        اليوم
       </button>
       <button
        disabled={!filterByDateUl}
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS.filter((test) => test.date >= formatDate(yesterday)));

         setFilterByDateUl(false);
        }}
        className="rounded-xl duration-500 transition-all hover:bg-accent-900 border border-secondary text-start p-3"
       >
        امس
       </button>
       <button
        disabled={!filterByDateUl}
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS.filter((test) => test.date >= formatDate(aWeekAgo)));

         setFilterByDateUl(false);
        }}
        className="rounded-xl duration-500 transition-all hover:bg-accent-900 border border-secondary text-start p-3"
       >
        اسبوع
       </button>
       <button
        className="mt-2 text-start underline text-secondary w-fit "
        onClick={(e) => {
         e.stopPropagation();

         setFilterByDateUl(false);
        }}
       >
        الغاء
       </button>
      </div>
     </div>
    </Button>
    <Button
     type="Secondary"
     className={"!bg-accent-900 relative"}
     onClick={() => setFilterByTestTypeUl((prev) => !prev)}
    >
     <div className="flex gap-2 !text-black font-almaria-light">
      <span> نوع الاختبار</span>
      <img
       src="Icons/breadcrumb_arrow.svg"
       alt="arrow"
       className={`${
        filterByTestTypeUl
         ? "rotate-90 duration-300 transition-all"
         : "-rotate-90  duration-300 transition-all"
       } `}
      />
     </div>
     <div
      className={`opacity-0  duration-300 transition-all absolute bottom-20 left-0 bg-white rounded-lg border border-secondary mt-4 text-black ${
       filterByTestTypeUl ? "opacity-100" : "pointer-events-none"
      }`}
     >
      <div
       onClick={(e) => e.stopPropagation()}
       className="flex flex-col gap-2 p-4 text-lg font-almaria text-start w-56"
      >
       <button
        disabled={!filterByTestTypeUl}
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS.filter((test) => test.type === "اونلاين"));
         setFilterByTestTypeUl(false);
        }}
        className="rounded-xl duration-500 transition-all hover:bg-accent-900 border border-secondary text-start p-3"
       >
        اونلاين
       </button>
       <button
        disabled={!filterByTestTypeUl}
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS.filter((test) => test.type === "اوفلاين"));

         setFilterByTestTypeUl(false);
        }}
        className="rounded-xl duration-500 transition-all hover:bg-accent-900 border border-secondary text-start p-3"
       >
        اوفلاين
       </button>
       <button
        className="mt-2 text-start underline text-secondary w-fit"
        onClick={(e) => {
         e.stopPropagation();
         setTests(TESTS);

         setFilterByTestTypeUl(false);
        }}
       >
        الغاء
       </button>
      </div>
     </div>
    </Button>

    <button
     className="text-secondary "
     onClick={() => {
      setTests(TESTS);
      setSearch("");
      setFilterByDateUl(false);
      setFilterByTestTypeUl(false);
     }}
    >
     إلغاء الكل
    </button>
   </div>
   <div className="my-12">
    <table className="min-w-full bg-accent-1000  border-collapse border-spacing-2  rounded-lg text-center">
     <thead>
      <tr>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tr-lg border-l border-[#D9D9D9]">
        اسم الاختبار
       </th>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 border-l border-[#D9D9D9]">
        نوع الاختبار
       </th>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tl-lg">
        التاريخ
       </th>
      </tr>
     </thead>
     <tbody>
      {tests.map((test) => (
       <tr key={test.title}>
        <td className="px-6 py-4 bg-white flex gap-4 border-l border-t border-[#D9D9D9]">
         <img src="Icons/edit_icon.svg" alt="" />
         <span>{test.title}</span>
         <button
          className="mr-auto"
          onClick={() =>
           setTests(tests.filter((item) => item.title !== test.title))
          }
         >
          <img src="Icons/trash_icon.svg" alt="delete" />
         </button>
        </td>
        <td className="px-6 py-4 bg-white border-l border-t border-[#D9D9D9]">
         {test.type}
        </td>
        <td className="px-6 py-4 bg-white border-t border-[#D9D9D9]">
         {test.date}
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}

export default Tests;
