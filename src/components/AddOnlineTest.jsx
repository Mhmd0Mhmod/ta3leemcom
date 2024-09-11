import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Heading from "./ui-local/Heading";
import Tab from "./ui-local/Tab";
import { constraints } from "../config";
import OldButton from "./ui-local/Button";
import Editor from "./TextEditor2";
import { Check, Edit, Plus, X } from "lucide-react";

import { Reorder } from "framer-motion";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "./ui/button";

import OnlineIcon from "../../public/Icons/online_icon.svg";
import TimeIcon from "../../public/Icons/time_icon.svg";
import TimeIcon2 from "../../public/Icons/time_icon_2.svg";
import CalenderIcon from "../../public/Icons/calender_icon_2.svg";
import CopyIcon from "../../public/Icons/copy_icon_gray.svg";
import TrashIcon from "../../public/Icons/trash_icon_gray.svg";
import PickTime from "./PickTime";
import { PopoverClose } from "@radix-ui/react-popover";
import { convertTo12HourFormat } from "@/lib/time";
import PickDuration from "./PickDuration";
import { ShowTest } from "./ShowTest";
import TestSent from "../../public/Icons/test_sent_icon.svg";
import Trash from "../../public/Icons/trash_icon_gray.svg";
import Print from "../../public/Icons/print_icon.svg";
import { SolidLogo } from "./ui-local/SolidLogo";

const QUESTIONS = [
 {
  text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
  bouns: 0,
  deg: 1,
  answers: [
   { text: "المشتري", isCorrect: true, id: "1" },
   { text: "المريخ", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "المشتري هو أكبر كوكب في المجموعة الشمسية.",
  required: true,
  id: "1",
 },
 {
  text: "ما هي عاصمة فرنسا؟",
  bouns: 1,
  deg: 0,
  answers: [
   { text: "باريس", isCorrect: true, id: "1" },
   { text: "برلين", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "باريس هي عاصمة فرنسا.",
  required: false,
  id: "2",
 },
 {
  text: "ما هو الحيوان الأسرع في العالم؟",
  bouns: 0,
  deg: 1,
  answers: [
   { text: "الفهد", isCorrect: true, id: "1" },
   { text: "الأسد", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "الفهد هو الحيوان الأسرع في العالم.",
  required: true,
  id: "3",
 },
 //  {
 //   text: "ما هو الحيوان الأسرع في العالم 2؟",
 //   bouns: 0,
 //   deg: 1,
 //   answers: [
 //    { text: "الفهد", isCorrect: true, id: "1" },
 //    { text: "الأسد", isCorrect: false, id: "2" },
 //    { text: "الثعلب", isCorrect: false, id: "3" },
 //    { text: "القطة", isCorrect: false, id: "4" },
 //   ],
 //   images: [
 //    "../../public/imgs/test_image.svg",
 //    "../../public/imgs/video.svg",
 //    "../../public/imgs/home-bg-1.png",
 //    "../../public/imgs/home-bg-2.png",
 //   ],
 //   explain: "الفهد هو الحيوان الأسرع في العالم.",
 //   required: true,
 //   id: "4",
 //  },
];
export const DEFAULT_QUESTION = {
 text: "",
 bouns: 0,
 deg: 0,
 answers: [
  { text: "", isCorrect: false, id: "1" },
  { text: "", isCorrect: false, id: "2" },
 ],
 images: [],
 explain: "",
 required: false,
 id: "",
};
const MINS = [
 { value: 0, label: "00" },
 { value: 5, label: "05" },
 { value: 10, label: "10" },
 { value: 15, label: "15" },
 { value: 20, label: "20" },
 { value: 25, label: "25" },
 { value: 30, label: "30" },
 { value: 35, label: "35" },
 { value: 40, label: "40" },
 { value: 45, label: "45" },
 { value: 50, label: "50" },
 { value: 55, label: "55" },
];
const HOURS = [
 { value: 1, label: "01" },
 { value: 2, label: "02" },
 { value: 3, label: "03" },
 { value: 4, label: "04" },
 { value: 5, label: "05" },
 { value: 6, label: "06" },
 { value: 7, label: "07" },
 { value: 8, label: "08" },
 { value: 9, label: "09" },
 { value: 10, label: "10" },
 { value: 11, label: "11" },
 { value: 12, label: "12" },
];

function AddOnlineTest({ test }) {
 const [searchParams, setSearchParams] = useSearchParams();
 const [questions, setQuestions] = useState(test?.questions || QUESTIONS);
 const [currentQuestion, setCurrentQuestion] = useState(DEFAULT_QUESTION);
 const [title, setTitle] = useState(test?.title || "اختبار بدون عنوان");
 const [onEdit, setOnEdit] = useState(false);
 const [onEditIndex, setOnEditIndex] = useState(null);
 const [date, setDate] = useState(new Date());
 const [openModel, setOpenModel] = useState(false);
 const [showTestAlert, setShowTestAlert] = useState(false);
 const [showTestRes, setShowTestRes] = useState(false);
 const [dummyQuestions, setDummyQuestions] = useState(
  questions.map((question) => ({
   ...question,
   answers: question.answers.map((answer) => ({
    ...answer,
    isCorrect: false,
   })),
  }))
 );

 const [timeStart, setTimeStart] = useState(
  test?.timeStart || {
   hour: 1,
   minute: 15,
   mode: "AM",
  }
 );
 const [timeDuration, setTimeDuration] = useState(
  test?.timeDuration || {
   hour: 1,
   minute: 15,
   mode: "AM",
   day: 0,
  }
 );
 let timeStartString = convertTo12HourFormat(timeStart.hour, timeStart.minute);
 let timeDurationString = convertTo12HourFormat(
  timeDuration.hour,
  timeDuration.minute,
  timeDuration.day
 );

 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };
 const setAsOfflineTest = () => {
  searchParams.set("test", "offline");
  setSearchParams(searchParams);
 };

 const tabs_1 = [
  {
   text:
    constraints[searchParams.get("level")].content[
     searchParams.get("subLevel")
    ],
   path: "Icons/level_icon.svg",
  },
  {
   text: searchParams.get("group").split("_").length,
   path: "Icons/group_icon.svg",
  },
  { text: "12 طالب", path: "Icons/students_icon.svg" },
  { text: questions.length, path: "Icons/question_icon.svg" },
  { text: "20 درجة", path: "Icons/flag_icon.svg" },
  {
   text: questions.reduce((acc, el) => acc + el.bouns, 0),
   path: "Icons/bouns_icon.svg",
  },
 ];

 const handelIncrease = (index) => {
  if (typeof index === "number") {
   if (questions[index].required) {
    setQuestions((prev) =>
     prev.map((question, i) =>
      i === index ? { ...question, deg: question.deg + 1 } : question
     )
    );
   } else {
    setQuestions((prev) =>
     prev.map((question, i) =>
      i === index ? { ...question, bouns: question.bouns + 1 } : question
     )
    );
   }
  } else {
   setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns + 1 }));
  }
 };
 const handelDecrease = (index) => {
  if (typeof index === "number") {
   if (questions[index].required && questions[index].deg > 0) {
    setQuestions((prev) =>
     prev.map((question, i) =>
      i === index ? { ...question, deg: question.deg - 1 } : question
     )
    );
   } else if (!questions[index].required && questions[index].bouns > 0) {
    setQuestions((prev) =>
     prev.map((question, i) =>
      i === index ? { ...question, bouns: question.bouns - 1 } : question
     )
    );
   }
  } else {
   if (currentQuestion.bouns > 0)
    setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns - 1 }));
  }
 };

 const addQuestion = () => {
  currentQuestion.id = questions.length + 1;
  setQuestions((prev) => [...prev, currentQuestion]);
  setCurrentQuestion(DEFAULT_QUESTION);
 };

 const editQuestion = () => {
  setQuestions((prev) =>
   prev.map((question, i) => (i === onEditIndex ? currentQuestion : question))
  );
  setOnEdit(false);
  document.getElementById(`q-${currentQuestion.id}`).scrollIntoView({
   behavior: "smooth",
   //  block: "end",
  });
  setCurrentQuestion(DEFAULT_QUESTION);
 };
 const deleteQuestion = (index) => {
  setQuestions((prev) => prev.filter((_, i) => i !== index));
 };
 const edit = (index) => {
  document.querySelector("#editSection").scrollIntoView({
   behavior: "smooth",
   block: "start",
  });

  setOnEdit(true);
  setOnEditIndex(index);
  setCurrentQuestion(questions[index]);
 };

 const handleReorder = (newAnswers, questionIndex) => {
  if (typeof questionIndex === "number") {
   setQuestions((prevQuestions) =>
    prevQuestions.map((question, index) =>
     index === questionIndex ? { ...question, answers: newAnswers } : question
    )
   );
  } else {
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: newAnswers,
   }));
  }
 };

 const [editors, setEditors] = useState(["", "", "", "", ""]);

 const handleEditorChange = (newEditors) => {
  setEditors(newEditors);
 };

 const highlight = (isCorrect, i, index) => {
  if (
   (isCorrect && questions[index].answers[i].isCorrect) ||
   questions[index].answers[i].isCorrect
  ) {
   return "true";
   // return "bg-[#bae3cd]";
  }
  if (isCorrect && !questions[index].answers[i].isCorrect) {
   return "false";
   // return "bg-[#fccfd0]";
  }
 };

 let trueRatio;
 if (showTestRes) {
  const totalRequired = questions.filter((q) => q.required).length;
  const totalCorrect = dummyQuestions.reduce((acc, q, index) => {
   return (
    acc +
    q.answers.filter(
     (a, i) => a.isCorrect && questions[index].answers[i].isCorrect
    ).length
   );
  }, 0);
  trueRatio = `${totalRequired} / ${totalCorrect}`;
 }

 return (
  <>
   {showTestRes && (
    <>
     <div className=" rounded-lg mx-auto container w-full md:w-[85%] lg:w-[80%] p-4">
      <div className="mx-auto container text-center  rounded-lg -mt-5 w-full md:w-[85%] lg:w-[70%] p-4 ">
       <div className="bg-secondary-l text-white py-20 rounded-md">
        <Heading as={"h1"}>{title}</Heading>
       </div>
       <div className="flex justify-between my-4  text-xl font-almaria-bold">
        <div className="flex gap-4">
         <div className="flex gap-3 items-center ">
          <span>درجة</span>
          <span>:</span>
          <div className="bg-white px-10 text-secondary-l py-2">
           {trueRatio}
          </div>
         </div>
        </div>
        <div className="flex gap-4 items-start">
         <TooltipProvider>
          <Tooltip delayDuration={100}>
           <TooltipTrigger className="w-full">
            <Button
             variant="ghost"
             size="icon"
             className="w-full justify-start gap-4"
            >
             <Print />
            </Button>
           </TooltipTrigger>
           <TooltipContent side="bottom" align="center" sideOffset={10}>
            <p> طباعة</p>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
          <Tooltip delayDuration={100}>
           <TooltipTrigger className="w-full">
            <Button
             onClick={() => {
              setShowTestRes(false);
              setDummyQuestions(
               questions.map((question) => ({
                ...question,
                answers: question.answers.map((answer) => ({
                 ...answer,
                 isCorrect: false,
                })),
               }))
              );
             }}
             variant="ghost"
             size="icon"
             className="w-full justify-start gap-4"
            >
             <Trash />
            </Button>
           </TooltipTrigger>
           <TooltipContent side="bottom" align="center" sideOffset={10}>
            <p>حذف</p>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>
        </div>
       </div>
       <ul className="flex flex-col gap-4  ">
        {dummyQuestions.map((question, index) => (
         <div key={question.id}>
          <li className="w-full rounded-md bg-white text-black px-3 py-5">
           <div className="flex justify-between items-center">
            <Heading as={"h3"}>
             {" "}
             <span className="text-accent-l-700 ml-2">{index + 1}.</span>{" "}
             {question.text}
            </Heading>
            <p className="text-accent-l-100">
             {question.required ? question.deg : question.bouns}
             <span className="mr-1">{question.required ? "درجة" : "بونص"}</span>
            </p>
           </div>
           <div className="grid grid-cols-12">
            <div className="text-start mt-6 mr-16 col-span-6 ">
             {question?.answers.map((answer, i) => (
              <div
               key={answer.text}
               className={`flex gap-4 mb-3 py-1 px-2 ${
                highlight(answer.isCorrect, i, index) === "true"
                 ? "bg-[#bae3cd]"
                 : highlight(answer.isCorrect, i, index) === "false"
                 ? "bg-[#fccfd0]"
                 : ""
               } `}
              >
               <input
                type="radio"
                name={question.id}
                className="h-5 w-5 "
                checked={answer.isCorrect}
                disabled
                //  onChange={(e) => handelAnswerCheck(e, i, index)}
               />
               <div className="flex w-full justify-between">
                <p className="">{answer.text}</p>
                <span>
                 {highlight(answer.isCorrect, i, index) === "true" ? (
                  <Check />
                 ) : highlight(answer.isCorrect, i, index) === "false" ? (
                  <X />
                 ) : (
                  ""
                 )}
                </span>
               </div>
              </div>
             ))}
            </div>
            <div className="col-span-6 grid grid-cols-4">
             {question?.images.map((image, i) => (
              <img src={image} alt={`image-${i}`} key={image} />
             ))}
            </div>
           </div>
          </li>
          <p className="text-start">
           {" "}
           <span className="font-almaria-bold">التفسير : </span>
           {question.explain}
          </p>
         </div>
        ))}
       </ul>
       {/* <div className="flex justify-between items-center mt-12">
        <Button
         variant="ghost"
         className=" bg-secondary-l text-white px-10 py-6"
         onClick={() => {
          setShowTestAlert(true);
          setOpenModel(false);
         }}
        >
         ارسال
        </Button>
        <SolidLogo />
       </div> */}
      </div>
     </div>
    </>
   )}
   {showTestAlert && (
    <>
     <div className="py-32 flex flex-col  items-center">
      <TestSent className="mx-auto" />
      <Heading as={"h2"} className={"my-6 text-black font-almaria-bold"}>
       لقد تم إرسال إجاباتك بنجاح.
      </Heading>
      <p className="mt-4 mb-8 text-lg ">شكراً لك على إرسال إجاباتك. </p>
      <div className="flex gap-3  items-center text-secondary-l font-almaria-bold">
       <Button
        onClick={() => {
         setShowTestRes(true);
         setShowTestAlert(false);
        }}
        variant="outline"
        className="hover:text-secondary-l text-xl px-10  py-7 border-secondary-l"
       >
        النتيجة
       </Button>
       <Button
        onClick={() => {
         setShowTestAlert(false);
         setOpenModel(true);
         setDummyQuestions(
          questions.map((question) => ({
           ...question,
           answers: question.answers.map((answer) => ({
            ...answer,
            isCorrect: false,
           })),
          }))
         );
        }}
        variant="ghost"
        className="hover:text-secondary-l  text-xl px-10  py-7 "
       >
        إرسال رد آخر
       </Button>
      </div>
     </div>
     <div>
      <SolidLogo />
      <p className="mt-2">
       إذا كان لديك أي استفسارات ، لا تتردد في{" "}
       <Link className="text-secondary-l underline " to={"/contact-with-us"}>
        التواصل معنا
       </Link>
       . نتمنى لك التوفيق!
      </p>
     </div>
    </>
   )}
   {!showTestAlert && !showTestRes && (
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
      اختبار جديد
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
       <span>{searchParams.get("group")?.replaceAll("_", " / ")}</span>
       <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
      </button>
      <div className="flex gap-1">
       <span>الاختبارات</span>
       <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
      </div>
      <div className="flex gap-1 font-almaria-bold">
       <span>اضافة اختبار</span>
      </div>
     </div>
     <div className="w-full md:w-[85%] lg:w-[70%] p-4 mx-auto">
      <div className="bg-white rounded-lg p-4">
       <div className="flex items-center justify-between mb-6">
        {/* <div className="flex gap-1 items-end">
         <span className="text-secondary-l font-almaria-extrabold text-[1rem]">
          تعليم{" "}
         </span>
         <span className="text-primary-l font-almaria-bold">كوم </span>
         <img src="Icons/logo_solid.svg" alt="logo" />
        </div> */}
        <SolidLogo />
        <div className="flex gap-2">
         <TooltipProvider delayDuration={100}>
          <Tooltip>
           <TooltipTrigger>
            <Button variant="outline" size="icon">
             <CopyIcon />
            </Button>
           </TooltipTrigger>
           <TooltipContent side="bottom" align="center" sideOffset={10}>
            <p>انشاء نسخة</p>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>

         <TooltipProvider delayDuration={100}>
          <Tooltip>
           <TooltipTrigger>
            <Button variant="outline" size="icon">
             <TrashIcon />{" "}
            </Button>
           </TooltipTrigger>
           <TooltipContent side="bottom" align="center" sideOffset={10}>
            <p>حذف</p>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>
        </div>
       </div>
       <div className="flex my-4 ">
        <div className="mr-8">
         <img src="imgs/test_image.svg" alt="test" />
        </div>
        <div className="flex-grow ml-8  ">
         <div className="flex flex-grow gap-3 items-center mr-6 ">
          <div className=" flex-grow  ">
           <Heading as={"h3"} className={"font-almaria-bold mb-12"}>
            {title}
           </Heading>
           <div className="grid grid-cols-3 gap-4 max-w-[500px] ">
            {tabs_1.map((item) => (
             <Tab
              key={item.text}
              type={"ghost"}
              text={item.text}
              path={item.path}
             />
            ))}
           </div>
          </div>
          <div className="my-auto flex flex-col gap-3  ">
           <Popover>
            <PopoverTrigger>
             <TooltipProvider>
              <Tooltip delayDuration={100}>
               <TooltipTrigger className="w-full">
                <Button
                 variant="secondary"
                 className="pr-1 w-full justify-start gap-2"
                >
                 <OnlineIcon />
                 <span>اونلاين</span>
                </Button>
               </TooltipTrigger>
               <TooltipContent side="right" align="center" sideOffset={10}>
                <p>نوع الاختبار</p>
               </TooltipContent>
              </Tooltip>
             </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent
             side={"right"}
             align="start"
             alignOffset={10}
             sideOffset={10}
             className="w-fit p-0 m-0 rounded-lg shadow-none  border-0"
            >
             <Button
              variant="outline"
              className="pl-10"
              onClick={setAsOfflineTest}
             >
              اوفلاين
             </Button>
            </PopoverContent>
           </Popover>

           <Popover>
            <PopoverTrigger>
             <TooltipProvider>
              <Tooltip delayDuration={100}>
               <TooltipTrigger className="w-full">
                <Button
                 variant="secondary"
                 className="pr-1 w-full justify-start gap-2"
                >
                 <TimeIcon />
                 <span className="ltr">
                  {timeStartString.hour}:{timeStartString.minute}{" "}
                  {timeStartString.mode}
                 </span>
                </Button>
               </TooltipTrigger>
               <TooltipContent side="right" align="center" sideOffset={10}>
                <p>يبدا الاختبار</p>
               </TooltipContent>
              </Tooltip>
             </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent className="w-[96]">
             <PickTime
              PopoverClose={PopoverClose}
              timeStartString={timeStartString}
              timeStart={timeStart}
              setTimeStart={setTimeStart}
              MINS={MINS}
              HOURS={HOURS}
             />
            </PopoverContent>
           </Popover>

           <Popover>
            <PopoverTrigger>
             <TooltipProvider>
              <Tooltip delayDuration={100}>
               <TooltipTrigger className="w-full">
                <Button
                 variant="secondary"
                 className="pr-1 w-full justify-start gap-2"
                >
                 <TimeIcon2 />
                 <span>{timeDurationString.duration}</span>
                </Button>
               </TooltipTrigger>
               <TooltipContent side="right" align="center" sideOffset={10}>
                <p>مدة الاختبار</p>
               </TooltipContent>
              </Tooltip>
             </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent className="w-[96]">
             <PickDuration
              PopoverClose={PopoverClose}
              timeDurationString={timeDurationString}
              timeDuration={timeDuration}
              setTimeDuration={setTimeDuration}
              MINS={MINS}
              HOURS={HOURS}
             />
            </PopoverContent>
           </Popover>

           <Popover>
            <PopoverTrigger>
             <TooltipProvider>
              <Tooltip delayDuration={100}>
               <TooltipTrigger className="w-full">
                <Button
                 variant="secondary"
                 className="pr-1 w-full justify-start gap-2"
                >
                 <CalenderIcon />
                 <span>{date?.toLocaleDateString()}</span>
                </Button>
               </TooltipTrigger>
               <TooltipContent side="right" align="center" sideOffset={10}>
                <p>تاريخ الاختبار</p>
               </TooltipContent>
              </Tooltip>
             </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent className="p-0 ltr">
             <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              footer={
               <PopoverClose className=" w-full mt-2">
                <Button variant="outline" className="w-full  ">
                 حفظ
                </Button>
               </PopoverClose>
              }
             />
            </PopoverContent>
           </Popover>
          </div>
         </div>
         <div className="flex gap-4 justify-between mt-6">
          <div className="flex gap-6">
           <ShowTest
            openModel={openModel}
            setOpenModel={setOpenModel}
            test={{
             title,
             questions: questions,
             timeStart,
             timeDuration,
             date,
            }}
            dummyQuestions={dummyQuestions}
            setDummyQuestions={setDummyQuestions}
            timeStartString={timeStartString}
            setShowTestAlert={setShowTestAlert}
           />
           {/* <Tab text={"النتائج"} path={"Icons/res_icon.svg"} className="pr-4" /> */}
          </div>
          <div className="flex gap-6">
           <OldButton
            type={"outline"}
            icon={<img src={"../../public/Icons/share_icon_2.svg"} />}
           >
            مشاركة مع المجموعة
           </OldButton>
           <OldButton
            type={"outline"}
            icon={<img src={"../../public/Icons/share_icon.svg"} />}
           >
            مشاركة
           </OldButton>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div className="mt-8" id="editSection">
       <Editor
        editors={editors}
        onChange={handleEditorChange}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        questions={questions}
        setQuestions={setQuestions}
       />

       <div className="flex gap-3 mb-6">
        <Button
         variant="ghost"
         className={
          "hover:bg-secondary-l hover:text-white font-almaria text-lg gap-2 my-4 pr-2 pl-6 bg-secondary-l text-white"
         }
         onClick={() => {
          onEdit ? editQuestion() : addQuestion();
         }}
        >
         <Plus />
         <span>{onEdit ? "نطبيق التعديل" : "اضافة جديد"}</span>
        </Button>
        {onEdit && (
         <Button
          variant="outline"
          className={"gap-0 my-4 bg-white border border-accent-l-1000"}
          onClick={() => {
           setOnEdit(false);
           setOnEditIndex(null);
           setCurrentQuestion(DEFAULT_QUESTION);
          }}
         >
          <span className="font-almaria text-xl text-black">تخطي</span>
         </Button>
        )}
       </div>

       <Reorder.Group
        values={questions}
        // dragConstraints={parentRef}
        onReorder={setQuestions}
        className="flex flex-col gap-4 overflow-clip"
       >
        {questions.map((question, index) => (
         <Reorder.Item
          id={`q-${question.id}`}
          key={question.text} // Assuming each question has a unique 'id'
          value={question}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white px-3 pt-4 pb-8 rounded-lg"
         >
          <div className="flex items-center w-full">
           <span>{index + 1}.</span>
           <div
            className="mr-2 flex-grow font-almaria-bold text-lg"
            dangerouslySetInnerHTML={{ __html: question?.text }}
           />
           <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center px-4 py-2  rounded-lg bg-accent-l-1100  ">
             <div className="flex flex-col justify-between gap-1  ">
              <button
               className="hover:scale-110 duration-300 transition-all"
               onClick={() => handelIncrease(index)}
              >
               <img src="Icons/arrow_rounded.svg" alt="up" />
              </button>
              <button
               className="hover:scale-110 duration-300 transition-all"
               onClick={() => handelDecrease(index)}
              >
               <img
                src="Icons/arrow_rounded.svg"
                alt="down"
                className="rotate-180"
               />
              </button>
             </div>
             <span className="mr-1">
              {question.required ? question.deg : question.bouns}
             </span>
            </div>
            <span className="mr-1">{question.required ? "درجة" : "بونص"}</span>
           </div>
          </div>
          <Reorder.Group
           values={question.answers}
           //  dragConstraints={parentRef}
           onReorder={(newAnswers) => {
            // Call function to update state with new answers order
            handleReorder(newAnswers, index);
           }}
           className="mr-12 mt-3 gap-3 flex flex-col overflow-clip"
          >
           <div className="grid grid-cols-12">
            <div className="flex flex-col gap-4 col-span-6  ">
             {question.answers.map((answer) => (
              <Reorder.Item
               key={answer.text}
               value={answer}
               className="flex gap-3 items-center font-almaria-bold w-full"
              >
               <input
                type="radio"
                className="h-5 w-5"
                name={answer.text}
                checked={answer.isCorrect}
                onChange={() => {}}
                disabled
               />
               <div className="w-full">
                <div className="flex w-full  items-center gap-2 ">
                 <div
                  className="min-w-[25%]"
                  dangerouslySetInnerHTML={{ __html: answer.text }}
                 ></div>
                 <img src="Icons/grip_icon.svg" alt="drag" draggable={false} />
                </div>
               </div>
              </Reorder.Item>
             ))}
            </div>
            <div className="grid grid-cols-4 col-span-6 ">
             {question?.images?.map((image, i) => (
              <div key={image} className="col-span-1">
               <div className="relative">
                <img draggable={false} src={image} alt={`image-${i}`} />
               </div>
              </div>
             ))}
            </div>
           </div>

           {/* {i === question.answers.length - 1 && ( */}
           <div className="flex items-end gap-4">
            <img
             src="Icons/grip_icon.svg"
             alt="drag"
             draggable={false}
             className="rotate-90 cursor-pointer hover:scale-110 transition-all duration-300"
            />
            <button
             type="button"
             className="col-span-10 flex gap-1 mt-4 items-center"
             onClick={() => edit(index)}
            >
             <Edit className="text-secondary-l h-5" />
             <span className="text-secondary-l font-almaria-bold">تعديل</span>
            </button>
            <button
             type="button"
             className="col-span-10 flex gap-1 mt-4 items-start"
             onClick={() => deleteQuestion(index)}
            >
             <img src="Icons/trash_icon.svg" alt="delete" />
             <span className="text-primary-l font-almaria-bold">حذف</span>
            </button>
           </div>
           {/* )} */}
          </Reorder.Group>
         </Reorder.Item>
        ))}
       </Reorder.Group>

       {/* <List /> */}
      </div>
     </div>
    </div>
   )}
  </>
 );
}

export default AddOnlineTest;
