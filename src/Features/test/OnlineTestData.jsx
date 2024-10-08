import { useState } from "react";
import Heading from "../../UI-Global/Heading.jsx";
import { ChartPie, Check, NotepadText, UserRoundX, X } from "lucide-react";
import Trash from "../../../public/Icons/trash_icon_gray.svg";
import Print from "../../../public/Icons/print_icon.svg";
import { Button } from "../../components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

import Arrow from "../../../public/Icons/arrow-small.svg";
import CorrectIcon from "../../../public/Icons/correct_icon.svg";
import InCorrectIcon from "../../../public/Icons/incorrect_icon.svg";

import StudentsIcon from "../../../public/Icons/students_white_icon.svg";
import QuestionsIcon from "../../../public/Icons/question_white_icon.svg";
import Bouns from "../../../public/Icons/bouns_white_icon.svg";
import Flag from "../../../public/Icons/flag_white_icon.svg";

import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../components/ui/tooltip.jsx";

// const RES = {
//  title: "اختبار بدون عنوان",
//  studentsNum: 12,
//  studentsDidntTakeNum: 5,
//  questionsNum: 15,
//  bouns: 2,
//  degs: 20,
// };
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
const types = ["النتائج", "الاحصائيات", "الطلاب غير المشاركين"];

export default function OnlineTestData() {
 const [questions, setQuestions] = useState(QUESTIONS);
 const [title, setTitle] = useState("اختبار بدون عنوان");
 const [type, setType] = useState(types[0]);
 const [showTestResult, setShowTestResult] = useState(false);
 const [currentTestResult, setCurrentTestResult] = useState({});
 const [dummyQuestions, setDummyQuestions] = useState(
  questions.map((question) => ({
   ...question,
   answers: question.answers.map((answer) => ({
    ...answer,
    isCorrect: false,
   })),
  }))
 );

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
 return (
   <div>
     {showTestResult && (
       <>
         <div className="container mx-auto w-full rounded-lg p-4 md:w-[85%] lg:w-[80%]">
           <div className="container mx-auto -mt-5 w-full rounded-lg p-4 text-center md:w-[85%] lg:w-[70%]">
             <div className="rounded-md bg-secondary-l py-20 text-white">
               <Heading as={'h1'}>{title}</Heading>
             </div>
             <div className="my-4 flex justify-between font-almaria-bold text-xl">
               <div className="flex gap-4">
                 <div className="flex items-center gap-3">
                   <span>درجة</span>
                   <span>:</span>
                   <div className="bg-white px-10 py-2 text-secondary-l">80%</div>
                 </div>
                 <div className="flex items-center gap-3">
                   <span>الوقت</span>
                   <span>:</span>
                   <div className="bg-white px-10 py-2 text-secondary-l">
                     {2}:{15}{' '}
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <span>الترتيب</span>
                   <span>:</span>
                   <div className="bg-white px-10 py-2 text-secondary-l">{1}</div>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <TooltipProvider>
                   <Tooltip delayDuration={100}>
                     <TooltipTrigger className="w-full">
                       <Button variant="ghost" size="icon" className="w-full justify-start gap-4">
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
                           // setShowTestRes(false);
                           // setDummyQuestions(
                           //  questions.map((question) => ({
                           //   ...question,
                           //   answers: question.answers.map((answer) => ({
                           //    ...answer,
                           //    isCorrect: false,
                           //   })),
                           //  }))
                           // );
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
             <ul className="flex flex-col gap-4">
               {dummyQuestions.map((question, index) => (
                 <div key={question.id}>
                   <li className="w-full rounded-md bg-white px-3 py-5 text-black">
                     <div className="flex items-center justify-between">
                       <Heading as={'h3'}>
                         {' '}
                         <span className="ml-2 text-accent-l-700">{index + 1}.</span> {question.text}
                       </Heading>
                       <p className="text-accent-l-100">
                         {question.required ? question.deg : question.bouns}
                         <span className="mr-1">{question.required ? 'درجة' : 'بونص'}</span>
                       </p>
                     </div>
                     <div className="grid grid-cols-12">
                       <div className="col-span-6 mr-16 mt-6 text-start">
                         {question?.answers.map(
                           (answer, i) =>
                             !answer.isDeleted && (
                               <div key={answer.text} className={`mb-3 flex gap-4 px-2 py-1 ${highlight(answer.isCorrect, i, index) === 'true' ? 'bg-[#bae3cd]' : highlight(answer.isCorrect, i, index) === 'false' ? 'bg-[#fccfd0]' : ''} `}>
                                 <input
                                   type="radio"
                                   name={question.id}
                                   className="h-5 w-5"
                                   checked={answer.isCorrect}
                                   disabled
                                   //  onChange={(e) => handelAnswerCheck(e, i, index)}
                                 />
                                 <div className="flex w-full justify-between">
                                   <p className="">{answer.text}</p>
                                   <span>{highlight(answer.isCorrect, i, index) === 'true' ? <Check /> : highlight(answer.isCorrect, i, index) === 'false' ? <X /> : ''}</span>
                                 </div>
                               </div>
                             ),
                         )}
                       </div>
                       <div className="col-span-6 grid grid-cols-4">
                         {question?.images.map((image, i) => (
                           <img src={image} alt={`image-${i}`} key={image} />
                         ))}
                       </div>
                     </div>
                   </li>
                   <p className="mt-2 text-start">
                     {' '}
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
     {!showTestResult && (
       <>
         <div className="my-4 flex justify-between font-almaria-bold text-xl">
           <div className="flex items-start gap-4"></div>
         </div>
         <div className="container mx-auto -mt-5 w-full rounded-lg pt-16 xl:w-[85%]">
           <div className="relative flex flex-col items-center gap-7 rounded-xl bg-secondary-l py-6 text-white">
             <img src="imgs/res-bg.png" alt="res-bg" className="absolute left-0 top-0 h-full opacity-25" />
             <img src="imgs/res-bg.png" alt="res-bg" className="absolute right-0 top-0 h-full opacity-25" />
             <Heading as={'h4'}>اختبار بدون عنوان</Heading>
             <div className="flex w-[55%] justify-between font-almaria-light text-white">
               <div className="flex items-end gap-1">
                 <StudentsIcon className="ml-2" />
                 <span>{12} طالب</span>
               </div>
               <div className="flex items-end gap-1">
                 <UserRoundX className="ml-2" />
                 <span>{5} طلاب لم يشاركوا</span>
               </div>
               <div className="flex items-end gap-1">
                 <QuestionsIcon className="ml-2" />
                 <span>{15} سوال</span>
               </div>
               <div className="flex items-end gap-1">
                 <Bouns className="ml-2" />
                 <span>{2} بونص</span>
               </div>
               <div className="flex items-end gap-1">
                 <Flag className="ml-2" />
                 <span>{20} درجة</span>
               </div>
             </div>

             <div className="flex w-[30%] justify-center gap-4">
               <Button onClick={() => setType(types[2])} className={cn('gap-1 bg-accent-l-1200 px-3 text-gray-700', type === types[2] ? 'bg-black text-white' : '')}>
                 <UserRoundX className="ml-2" />
                 <span>الطلاب غير المشاركين</span>
               </Button>
               <Button onClick={() => setType(types[0])} className={cn('gap-1 bg-accent-l-1200 px-5 text-gray-700', type === types[0] ? 'bg-black text-white' : '')}>
                 <NotepadText className="ml-2" />
                 <span>النتائج</span>
               </Button>
               <Button onClick={() => setType(types[1])} className={cn('gap-1 bg-accent-l-1200 px-5 text-gray-700', type === types[1] ? 'bg-black text-white' : '')}>
                 <ChartPie className="ml-2" />
                 <span>الاحصائيات</span>
               </Button>
             </div>
           </div>
           {type === types[0] && (
             <div className="my-4 max-h-[80vh] overflow-y-auto bg-accent-l-1000 px-2 font-almaria-bold">
               <div className="mb-3 grid grid-cols-11 items-center px-4 text-center">
                 <div>الوقت</div>
                 <div className="col-span-2">اسم الطالب</div>
                 <div>ترتيب</div>
                 <div>درجة</div>
                 <div>بونص</div>
                 <div>الدرجة النهائية</div>
                 <div></div>
                 <div className="col-span-3 flex w-full items-center justify-between font-cairo text-xl">
                   <Arrow />
                   {[1, 2, 3, 4, 5, 6].map((index) => (
                     <div key={index} className="flex flex-col items-center justify-center gap-1">
                       <p>ب1</p>
                       <span className="rounded-full bg-gray-500 px-3 text-sm text-white">2</span>
                     </div>
                   ))}

                   <Arrow className="rotate-180" />
                 </div>
               </div>
               {Array.from({ length: 12 }).map((_, index) => (
                 <div
                   key={index}
                   onClick={() => {
                     setShowTestResult(true);
                     setCurrentTestResult({});
                   }}
                   className="mb-4 grid cursor-pointer grid-cols-11 items-center gap-4 rounded-xl bg-white px-4 py-3 text-center hover:bg-accent-l-900/70"
                 >
                   <div className="font-almaria">10:15</div>
                   <div className="col-span-2 line-clamp-1 font-almaria">عمرو مصطفي محمد درويش</div>
                   <div>{index + 1}</div>
                   <div>
                     100% <span className="font-almaria">(10</span> /10)
                   </div>

                   <div>
                     50% <span className="font-almaria">(2</span> /1)
                   </div>

                   <div>
                     125% <span className="font-almaria">(10</span> /11)
                   </div>
                   <div></div>
                   <div className="col-span-3 flex w-full items-center justify-between font-cairo text-xl">
                     <div></div>
                     {[1, 2, 3, 4, 5, 6].map((index) => (index === Math.floor(Math.random() * 6) ? <InCorrectIcon key={index} /> : <CorrectIcon key={index} />))}
                     <div></div>
                     {/* </div> */}
                   </div>
                 </div>
               ))}
             </div>
           )}
           {type === types[1] && <></>}
           {type === types[2] && (
             <>
               <div className="mt-12 flex flex-col gap-3 text-center">
                 <div className="rounded-lg bg-[#E0232E] py-3 font-almaria-bold text-white">اسم الطالب</div>
                 <div className="flex max-h-[40vh] flex-col gap-3 overflow-y-auto">
                   {Array.from({ length: 40 }).map((_, index) => (
                     <div key={index} className="rounded-lg bg-white py-3">
                       عمرو مصطفي محمد درويش
                     </div>
                   ))}
                 </div>
               </div>
             </>
           )}
         </div>
       </>
     )}
   </div>
 );
}
