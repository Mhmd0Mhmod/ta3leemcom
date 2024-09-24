import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button.jsx";

import Eye from "../../../public/Icons/show_icon.svg";
import Heading from "../../UI-Global/Heading.jsx";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../components/ui/tooltip.jsx";
import {
 AlertDialog,
 AlertDialogContent,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";

import TimeIcon from "../../../public/Icons/time_icon.svg";
import { SolidLogo } from "../../UI-Global/SolidLogo.jsx";

export function ShowTest({
 test,
 timeStartString,
 setShowTestAlert,
 openModel,
 setOpenModel,
 dummyQuestions,
 setDummyQuestions,
}) {
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

 return (
  <AlertDialog open={openModel}>
   <AlertDialogTrigger>
    <Button variant="ghost" className="bg-accent-l-1100" onClick={setOpenModel}>
     <Eye className="h-6 w-6 ml-2" />
     <span>عرض الاختبار</span>
    </Button>
   </AlertDialogTrigger>
   <AlertDialogContent className="pb-32  show_test_bg !max-w-screen h-full overflow-auto">
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
        key={question.text}
        className="w-full rounded-md bg-white text-black px-3 py-5"
       >
        <div className="flex justify-between items-center">
         <Heading as={"h3"}>
          {" "}
          <span className="text-accent-l-700 ml-2">{index + 1}.</span>{" "}
          {question.text}{" "}
          {question.required && <span className="text-red-500 mr-1">*</span>}
         </Heading>
         <p className="text-accent-l-100">
          {question.required ? question.deg : question.bouns}
          <span className="mr-1">{question.required ? "درجة" : "بونص"}</span>
         </p>
        </div>
        <div className="grid grid-cols-12">
         <div className="text-start mt-6 mr-16 col-span-6 ">
          {question?.answers.map((answer, i) => (
           <div key={answer.text} className="flex gap-4 mb-3">
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
          {question?.images?.map((image, i) => (
           <img src={image} alt={`image-${i}`} key={image} />
          ))}
         </div>
        </div>
       </li>
      ))}
     </ul>
     <div className="flex justify-between items-center mt-12">
      <Button
       variant="ghost"
       className=" bg-secondary-l text-2xl font-almaria-light text-white px-10 py-6"
       onClick={() => {
        setShowTestAlert(true);
        setOpenModel(false);
       }}
      >
       ارسال
      </Button>

      <SolidLogo />
     </div>
    </div>
   </AlertDialogContent>
  </AlertDialog>
 );
}
