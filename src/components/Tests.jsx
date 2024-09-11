import { Navigate, useSearchParams } from "react-router-dom";
import Heading from "./ui-local/Heading";
import { constraints } from "../config";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import Plus from "../../public/Icons/plus.svg";
import CalendarIcon from "../../public/Icons/calender.svg";
import Arrow from "../../public/Icons/breadcrumb_arrow.svg";
import ArrowFilled from "../../public/Icons/arrow_list_icon.svg";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Table from "./ui-local/Table/Table";
import THead from "./ui-local/Table/THead";
import TR from "./ui-local/Table/TR";
import TH from "./ui-local/Table/TH";
import TBody from "./ui-local/Table/TBody";
import TD from "./ui-local/Table/TD";
import AddOnlineTest from "./AddOnlineTest";

import TrashIcon from "../../public/Icons/trash_icon.svg";
import EditIcon from "../../public/Icons/edit_icon.svg";
import AddOfflineTest from "./AddOfflineTest";
import OnlineTestData from "./OnlineTestData";
import OfflineTestData from "./OfflineTestData";
import { X } from "lucide-react";

const TESTS = [
 {
  title: "Math Test",
  type: "اوفلاين",
  date: "8/18/2024",
  timeStart: { hour: 9, minute: 30, mode: "AM" },
  timeDuration: { hour: 1, minute: 15, mode: "AM", day: 0 },
  questions: [
   {
    text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "المشتري", isCorrect: true, id: "1" },
     { text: "المريخ", isCorrect: false, id: "2" },
     { text: "الأرض", isCorrect: false, id: "3" },
     { text: "الزهرة", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "المشتري هو أكبر كوكب في المجموعة الشمسية.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Science Project",
  type: "اونلاين",
  date: "8/17/2024",
  timeStart: { hour: 11, minute: 0, mode: "AM" },
  timeDuration: { hour: 2, minute: 0, mode: "PM", day: 0 },
  questions: [
   {
    text: "ما هو العنصر الأكثر انتشارًا في الكون؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "الهيدروجين", isCorrect: true, id: "1" },
     { text: "الأكسجين", isCorrect: false, id: "2" },
     { text: "الكربون", isCorrect: false, id: "3" },
     { text: "الهيليوم", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "الهيدروجين هو العنصر الأكثر انتشارًا في الكون.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "History Exam",
  type: "اوفلاين",
  date: "8/16/2024",
  timeStart: { hour: 2, minute: 0, mode: "PM" },
  timeDuration: { hour: 1, minute: 30, mode: "PM", day: 0 },
  questions: [
   {
    text: "من هو أول رئيس للولايات المتحدة الأمريكية؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "جورج واشنطن", isCorrect: true, id: "1" },
     { text: "أبراهام لنكولن", isCorrect: false, id: "2" },
     { text: "توماس جيفرسون", isCorrect: false, id: "3" },
     { text: "جيمس ماديسون", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "جورج واشنطن هو أول رئيس للولايات المتحدة الأمريكية.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "English Essay",
  type: "اونلاين",
  date: "8/15/2024",
  timeStart: { hour: 10, minute: 30, mode: "AM" },
  timeDuration: { hour: 1, minute: 45, mode: "AM", day: 0 },
  questions: [
   {
    text: "Which of the following is a synonym for 'happy'?",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "Sad", isCorrect: false, id: "1" },
     { text: "Joyful", isCorrect: true, id: "2" },
     { text: "Angry", isCorrect: false, id: "3" },
     { text: "Tired", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "'Joyful' is a synonym for 'happy'.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Physics Lab",
  type: "اوفلاين",
  date: "8/14/2024",
  timeStart: { hour: 8, minute: 0, mode: "AM" },
  timeDuration: { hour: 2, minute: 0, mode: "AM", day: 0 },
  questions: [
   {
    text: "ما هو قانون نيوتن الثالث؟",
    bouns: 0,
    deg: 1,
    answers: [
     {
      text: "القوة تساوي الكتلة مضروبة في التسارع",
      isCorrect: false,
      id: "1",
     },
     {
      text: "لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه",
      isCorrect: true,
      id: "2",
     },
     { text: "القوة الناتجة تساوي صفر", isCorrect: false, id: "3" },
     {
      text: "الجسم يبقى في حالة سكون ما لم تؤثر عليه قوة خارجية",
      isCorrect: false,
      id: "4",
     },
    ],
    images: [],
    explain:
     "قانون نيوتن الثالث ينص على أن لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Chemistry Quiz",
  type: "اونلاين",
  date: "8/13/2024",
  timeStart: { hour: 1, minute: 0, mode: "PM" },
  timeDuration: { hour: 1, minute: 0, mode: "PM", day: 0 },
  questions: [
   {
    text: "ما هو رمز الصوديوم في الجدول الدوري؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "Na", isCorrect: true, id: "1" },
     { text: "Cl", isCorrect: false, id: "2" },
     { text: "K", isCorrect: false, id: "3" },
     { text: "Mg", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "رمز الصوديوم في الجدول الدوري هو Na.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Geography Presentation",
  type: "اوفلاين",
  date: "8/12/2024",
  timeStart: { hour: 10, minute: 0, mode: "AM" },
  timeDuration: { hour: 1, minute: 30, mode: "AM", day: 0 },
  questions: [
   {
    text: "ما هي أكبر قارة من حيث المساحة؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "آسيا", isCorrect: true, id: "1" },
     { text: "أفريقيا", isCorrect: false, id: "2" },
     { text: "أوروبا", isCorrect: false, id: "3" },
     { text: "أمريكا الشمالية", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "آسيا هي أكبر قارة من حيث المساحة.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Art Project",
  type: "اونلاين",
  date: "8/11/2024",
  timeStart: { hour: 3, minute: 0, mode: "PM" },
  timeDuration: { hour: 2, minute: 0, mode: "PM", day: 0 },
  questions: [
   {
    text: "Who painted the Mona Lisa?",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "Leonardo da Vinci", isCorrect: true, id: "1" },
     { text: "Vincent van Gogh", isCorrect: false, id: "2" },
     { text: "Pablo Picasso", isCorrect: false, id: "3" },
     { text: "Claude Monet", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "Leonardo da Vinci painted the Mona Lisa.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Computer Science Test",
  type: "اوفلاين",
  date: "2024-10-30",
  timeStart: { hour: 8, minute: 45, mode: "AM" },
  timeDuration: { hour: 2, minute: 0, mode: "AM", day: 0 },
  questions: [
   {
    text: "ما هي لغة البرمجة التي تم تطويرها بواسطة جيمس جوسلينج؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "Python", isCorrect: false, id: "1" },
     { text: "Java", isCorrect: true, id: "2" },
     { text: "C++", isCorrect: false, id: "3" },
     { text: "Ruby", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "لغة Java تم تطويرها بواسطة جيمس جوسلينج.",
    required: true,
    id: "1",
   },
  ],
 },
 {
  title: "Biology Lab",
  type: "اونلاين",
  date: "2024-09-15",
  timeStart: { hour: 10, minute: 15, mode: "AM" },
  timeDuration: { hour: 1, minute: 30, mode: "AM", day: 0 },
  questions: [
   {
    text: "ما هي الوحدة الأساسية للحياة؟",
    bouns: 0,
    deg: 1,
    answers: [
     { text: "الخلية", isCorrect: true, id: "1" },
     { text: "الجزيء", isCorrect: false, id: "2" },
     { text: "الأنسجة", isCorrect: false, id: "3" },
     { text: "الأعضاء", isCorrect: false, id: "4" },
    ],
    images: [],
    explain: "الخلية هي الوحدة الأساسية للحياة.",
    required: true,
    id: "1",
   },
  ],
 },
];

function Tests() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [addTestUl, setAddTestUl] = useState(false);
 const [filterByDateUl, setFilterByDateUl] = useState(false);
 const [filterByDateType, setFilterByDateType] = useState("");
 const [filterByTestTypeUl, setFilterByTestTypeUl] = useState(false);
 const [filterByTestType, setFilterByTestType] = useState("");
 const [tests, setTests] = useState(TESTS);
 const [search, setSearch] = useState("");
 const [dateFrom, setDateFrom] = useState(new Date());
 const [dateTo, setDateTo] = useState(new Date());
 const [showEditModal, setShowEditModal] = useState(false);
 const [showDataModal, setShowDataModal] = useState(false);
 const [currentTest, setCurrentTest] = useState(null);
 const [TestToEdit, setTestToEdit] = useState(null);
 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };

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
  <>
   {showEditModal && TestToEdit.type === "اونلاين" && (
    <AddOnlineTest test={TestToEdit} />
   )}
   {showEditModal && TestToEdit.type === "اوفلاين" && (
    <AddOfflineTest test={TestToEdit} />
   )}
   {showDataModal && currentTest.type === "اونلاين" && (
    <OnlineTestData test={currentTest} />
   )}
   {showDataModal && currentTest.type === "اوفلاين" && (
    <OfflineTestData test={currentTest} />
   )}
   {!showEditModal && !showDataModal && (
    <div className="px-12 py-16">
     <button className="flex gap-1" onClick={backToLevel}>
      <img src="Icons/rev_arrow.svg" alt="" />
      <Heading
       as={"h3"}
       className={"text-secondary-l underline font-almaria-bold"}
      >
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
      variant="ghost"
      size="lg"
      className={
       "relative bg-secondary-l text-white px-4 py-7 text-2xl flex gap-4 hover:bg-secondary-l font-almaria hover:text-white "
      }
      onClick={() => setAddTestUl((prev) => !prev)}
     >
      <Plus />
      <span>اضافة اختبار</span>
      <div
       className={`opacity-0 duration-300 transition-all absolute -left-36 top-0 w-32 mt-4 text-black ${
        addTestUl ? "opacity-100" : "pointer-events-none"
       }`}
      >
       <ul
        onClick={(event) => event.stopPropagation()} // Prevent click event from propagating
        className="flex flex-col gap-1 text-lg font-almaria "
       >
        <li className="bg-white rounded-xl border px-2 py-1 hover:bg-gray-300 duration-300  ">
         <button
          className="w-full h-full text-start "
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
          className="w-full h-full text-start"
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
     <div className="flex gap-4 mt-16 mb-6 font-almaria-bold items-center">
      <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 border-accent-l-50  rounded-lg  ">
       {search ? (
        <X
         onClick={() => {
          setSearch("");
          setTests(TESTS);
         }}
         className="cursor-pointer"
        />
       ) : (
        <img src="Icons/search_icon.svg" alt="search" />
       )}
       <input
        type="text"
        placeholder="اسم الاختبار"
        className="w-full "
        value={search}
        onChange={handleSearch}
       />
      </div>
      {/* <Button
       type="ghost"
       size="lg"
       className={
        " bg-accent-l-900 text-black hover:bg-accent-l-900  font-almaria-light text-lg  py-6 "
       }
      >
       بحث
      </Button> */}

      <Button
       type="ghost"
       className={
        "bg-accent-l-900 text-black hover:bg-accent-l-900 font-almaria text-xl relative py-6 "
       }
       onClick={() => setFilterByDateUl((prev) => !prev)}
      >
       <div className="flex items-center gap-2 !text-black font-almaria-light text-lg  ">
        <CalendarIcon />
        <span> {filterByDateType ? filterByDateType : "تصفية بالتاريخ"}</span>
        <Arrow
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
        className={`opacity-0  duration-300 transition-all absolute bottom-20 left-0 bg-white rounded-[7px] border border-[#b4d3e0] mt-4 text-black ${
         filterByDateUl ? "opacity-100" : "pointer-events-none"
        }`}
       >
        <div className="flex flex-col gap-2 p-4 text-lg font-almaria text-start relative">
         <ArrowFilled className="absolute -bottom-12 left-0 h-16 w-16" />
         <div
          className="flex gap-8 mb-4"
          onClick={(e) => e.stopPropagation()} // Prevent click event from propagating
         >
          <div>
           <p className="mb-2">من</p>
           <Popover>
            <PopoverTrigger asChild>
             <Button
              variant={"outline"}
              className={cn(
               "justify-start text-left font-normal text-xl pl-4 pr-1 border-secondary-l rounded-sm  ",
               !dateFrom && "text-muted-foreground"
              )}
             >
              <CalendarIcon className="ml-2" />
              {dateFrom ? (
               format(dateFrom, "dd/MM/yyyy")
              ) : (
               <span>Pick a dateFrom</span>
              )}
             </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
             <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
             />
            </PopoverContent>
           </Popover>
          </div>
          <div>
           <p className="mb-2">الي</p>
           <Popover>
            <PopoverTrigger asChild>
             <Button
              variant={"outline"}
              className={cn(
               "justify-start text-left font-normal text-xl pl-4 pr-1 border-secondary-l rounded-sm ",
               !dateTo && "text-muted-foreground"
              )}
             >
              <CalendarIcon className="ml-2" />
              {dateTo ? (
               format(dateTo, "dd/MM/yyyy")
              ) : (
               <span>Pick a dateTo</span>
              )}
             </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
             <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
             />
            </PopoverContent>
           </Popover>
          </div>
         </div>
         <button
          disabled={!filterByDateUl}
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS.filter((test) => test.date === formatDate(today)));
           setFilterByDateUl(false);
          }}
          className="rounded-[7px] duration-500 transition-all hover:bg-accent-900 border border-[#b4d3e0] text-start p-3 hover:bg-accent-l-900 "
         >
          اليوم
         </button>
         <button
          disabled={!filterByDateUl}
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS.filter((test) => test.date >= formatDate(yesterday)));
           setFilterByDateType("اليوم");
           setFilterByDateUl(false);
          }}
          className="rounded-[7px] duration-500 transition-all hover:bg-accent-900 border border-[#b4d3e0] text-start p-3 hover:bg-accent-l-900 "
         >
          امس
         </button>
         <button
          disabled={!filterByDateUl}
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS.filter((test) => test.date >= formatDate(aWeekAgo)));
           setFilterByDateType("امس");
           setFilterByDateUl(false);
          }}
          className="rounded-[7px] duration-500 transition-all hover:bg-accent-900 border border-[#b4d3e0] text-start p-3 hover:bg-accent-l-900 "
         >
          اسبوع
         </button>
         <button
          className="mt-2 text-start underline text-secondary-l w-fit "
          onClick={(e) => {
           e.stopPropagation();
           setFilterByDateType("اسبوع");
           setFilterByDateUl(false);
           setFilterByDateType("");
          }}
         >
          الغاء
         </button>
        </div>
       </div>
      </Button>
      <Button
       type="ghost"
       className={
        "bg-accent-l-900 text-black hover:bg-accent-l-900 font-almaria  text-lg  relative py-6 "
       }
       onClick={() => setFilterByTestTypeUl((prev) => !prev)}
      >
       <div className="flex gap-2 !text-black font-almaria-light text-lg   items-center ">
        <span>
         {filterByTestType ? filterByTestType : "تصفية بنوع الاختبار"}
        </span>
        <Arrow
         className={`${
          filterByTestTypeUl
           ? "rotate-90 duration-300 transition-all"
           : "-rotate-90  duration-300 transition-all"
         } `}
        />
       </div>
       <div
        className={`opacity-0  duration-300 transition-all absolute bottom-20 left-0 bg-white rounded-[7px] border border-[#b4d3e0] mt-4 text-black ${
         filterByTestTypeUl ? "opacity-100" : "pointer-events-none"
        }`}
       >
        <div
         onClick={(e) => e.stopPropagation()}
         className="flex flex-col gap-2 p-4 text-lg font-almaria text-start w-56 relative"
        >
         <ArrowFilled className="absolute -bottom-12 left-0 h-16 w-16" />

         <button
          disabled={!filterByTestTypeUl}
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS.filter((test) => test.type === "اونلاين"));
           setFilterByTestTypeUl(false);
           setFilterByTestType("اونلاين");
          }}
          className="rounded-[7px] duration-500 transition-all hover:bg-accent-900 border border-[#b4d3e0] text-start p-3 hover:bg-accent-l-900 "
         >
          اونلاين
         </button>
         <button
          disabled={!filterByTestTypeUl}
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS.filter((test) => test.type === "اوفلاين"));

           setFilterByTestType("اوفلاين");
           setFilterByTestTypeUl(false);
          }}
          className="rounded-[7px] duration-500 transition-all hover:bg-accent-900 border border-[#b4d3e0] text-start p-3 hover:bg-accent-l-900 "
         >
          اوفلاين
         </button>
         <button
          className="mt-2 text-start underline text-secondary-l w-fit"
          onClick={(e) => {
           e.stopPropagation();
           setTests(TESTS);
           setFilterByTestType("");
           setFilterByTestTypeUl(false);
          }}
         >
          الغاء
         </button>
        </div>
       </div>
      </Button>

      <button
       className="text-secondary-l "
       onClick={() => {
        setTests(TESTS);
        setSearch("");
        setFilterByDateUl(false);
        setFilterByTestTypeUl(false);
        setFilterByDateType("");
        setFilterByTestType("");
       }}
      >
       إلغاء الكل
      </button>
     </div>
     <div className="my-12">
      <Table className="min-w-full bg-accent-1000    border-collapse border-spacing-2  rounded-lg text-center  ">
       <THead className="pl-4 pr-2 ">
        <TR className="bg-accent-l-1000 rounded-xl mb-3 ">
         <TH className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tr-lg border-l border-[#D9D9D9]">
          اسم الاختبار
         </TH>
         <TH className="px-6 py-3 text-center text-black bg-accent-1000 border-l border-[#D9D9D9]">
          نوع الاختبار
         </TH>
         <TH className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tl-lg">
          التاريخ
         </TH>
        </TR>
       </THead>
       <TBody className="max-h-[500px] overflow-y-scroll px-2 ">
        {tests.map((test) => (
         <TR
          key={test.title}
          className="mb-1 group cursor-pointer"
          onClick={() => {
           setCurrentTest(test);
           setShowDataModal(true);
          }}
         >
          <TD className="group-hover:bg-accent-l-900 transition-all  px-6 py-2 bg-white  border-l flex  gap-4 rounded-tr-xl rounded-br-xl ">
           <button
            onClick={() => {
             setTestToEdit(test);
             setShowEditModal(true);
            }}
           >
            <EditIcon className="h-5  " />
           </button>
           <span>{test.title}</span>
           <button
            className="mr-auto"
            onClick={() =>
             setTests(tests.filter((item) => item.title !== test.title))
            }
           >
            <TrashIcon className="h-5  " />
           </button>
          </TD>
          <TD className="group-hover:bg-accent-l-900 transition-all  px-6 py-2 bg-white border-l ">
           {test.type}
          </TD>
          <TD className="group-hover:bg-accent-l-900 transition-all  px-6 py-2 bg-white   rounded-tl-xl rounded-bl-xl ">
           {test.date}
          </TD>
         </TR>
        ))}
       </TBody>
      </Table>
     </div>
    </div>
   )}
  </>
 );
}

export default Tests;
