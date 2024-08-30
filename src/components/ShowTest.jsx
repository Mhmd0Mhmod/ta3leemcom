import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
 Drawer,
 DrawerClose,
 DrawerContent,
 DrawerDescription,
 DrawerFooter,
 DrawerHeader,
 DrawerTitle,
 DrawerTrigger,
} from "@/components/ui/drawer";
import Eye from "../../public/Icons/show_icon.svg";
import Heading from "./ui-local/Heading";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "./ui/tooltip";

import TimeIcon from "../../public/Icons/time_icon.svg";
import SolidLogo from "../../public/Icons/logo_solid.svg";
import { useState } from "react";

export function ShowTest({ test, timeStartString }) {
 const [dummyQuestions, setDummyQuestions] = useState(
  test.questions.map((question) => ({
   ...question,
   answers: question.answers.map((answer) => ({ ...answer, isCorrect: false })),
  }))
 );

 const handelAnswerCheck = (e, i, questionIndex) => {
  setDummyQuestions((prev) =>
   prev.map((question, qIndex) => {
    if (qIndex === questionIndex) {
     return {
      ...question,
      answers: question.answers.map((answer, ansIndex) => ({
       ...answer,
       isCorrect: ansIndex === i,
      })),
     };
    } else {
     return question;
    }
   })
  );
 };

 console.log(dummyQuestions);

 return (
  <Drawer direction="bottom" open>
   <DrawerTrigger asChild>
    <Button variant="ghost" className="bg-accent-l-1100">
     <Eye className="h-6 w-6 ml-2" />
     <span>عرض الاختبار</span>
    </Button>
   </DrawerTrigger>
   <DrawerContent className=" min-h-full rounded-none show_test_bg pt-4 pb-32">
    <div className="mx-auto container text-center  rounded-lg -mt-5 w-full md:w-[85%] lg:w-[70%] p-4 ">
     <div className="bg-secondary-l text-white py-20 rounded-md">
      <Heading as={"h1"}>{test?.title}</Heading>
     </div>
     <div className="w-fit mr-auto mt-2 mb-4">
      <TooltipProvider>
       <Tooltip delayDuration={100}>
        <TooltipTrigger className="w-full">
         <Button variant="secondary" className="w-full justify-start gap-4">
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
     </div>
     <ul className="flex flex-col gap-4  ">
      {dummyQuestions.map((question, index) => (
       <li
        key={index}
        className="w-full rounded-md bg-white text-black px-3 py-5"
       >
        <div className="flex justify-between items-center">
         <Heading as={"h3"}>
          {" "}
          <span className="text-accent-l-700 ml-2">{index + 1}.</span>{" "}
          {question.text}
         </Heading>
         <p className="text-accent-l-100">
          {question.bouns} <span className="mr-1">بونص</span>
         </p>
        </div>
        <div className="grid grid-cols-12">
         <div className="text-start mt-6 mr-16 col-span-6 ">
          {question?.answers.map((answer, i) => (
           <div key={i} className="flex gap-4 mb-3">
            <input
             type="radio"
             name={question.id}
             className="h-5 w-5 "
             checked={answer.isCorrect}
             onChange={(e) => handelAnswerCheck(e, i, index)}
            />
            <p>{answer.text}</p>
           </div>
          ))}
         </div>
         <div className="col-span-6 grid grid-cols-4">
          {question?.images.map((image, i) => (
           <img src={image} alt={`image-${i}`} key={i} />
          ))}
         </div>
        </div>
       </li>
      ))}
     </ul>
     <div className="flex justify-between items-center mt-12">
      <Button variant="ghost" className="bg-secondary-l text-white px-10 py-6">
       ارسال
      </Button>
      <div className="flex items-center gap-1 font-almaria-bold ">
       <p className="text-secondary-l text-xl">تعليم</p>
       <span className="text-primary-l">كوم</span>
       <SolidLogo />
      </div>
     </div>
    </div>
   </DrawerContent>
  </Drawer>
 );
}
