import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Heading from '@/UI-Global/Heading';
import React from 'react';

import { Check, X } from 'lucide-react';
import Trash from '@public/Icons/trash_icon_gray.svg';
import Print from '@public/Icons/print_icon.svg';

export default function ShowTestRes({ setShowTestRes, setDummyQuestions, questions, title, timeStart, showTestRes, dummyQuestions }) {
  let trueRatio;
  if (showTestRes) {
    const totalRequired = questions.filter((q) => q.required).length;
    const totalCorrect = dummyQuestions.reduce((acc, q, index) => {
      return acc + q.answers.filter((a, i) => a.isCorrect && questions[index].answers[i].isCorrect).length;
    }, 0);
    trueRatio = `${totalRequired} / ${totalCorrect}`;
  }
  const highlight = (isCorrect, i, index) => {
    if ((isCorrect && questions[index].answers[i].isCorrect) || questions[index].answers[i].isCorrect) {
      return 'true';
      // return "bg-[#bae3cd]";
    }
    if (isCorrect && !questions[index].answers[i].isCorrect) {
      return 'false';
      // return "bg-[#fccfd0]";
    }
  };
  return (
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
                <div className="bg-white px-10 py-2 text-secondary-l">{trueRatio}</div>
              </div>
              <div className="flex items-center gap-3">
                <span>الوقت</span>
                <span>:</span>
                <div className="bg-white px-10 py-2 text-secondary-l">
                  {timeStart.hour}:{timeStart.minute}{' '}
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
                        setShowTestRes(false);
                        setDummyQuestions(
                          questions.map((question) => ({
                            ...question,
                            answers: question.answers.map((answer) => ({
                              ...answer,
                              isCorrect: false,
                            })),
                          })),
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
          <ul className="flex flex-col gap-4">
            {dummyQuestions.map((question, index) => (
              <div key={question.id}>
                <li className="w-full rounded-md bg-white px-3 py-5 text-black">
                  <div className="flex items-center justify-between">
                    <Heading as={'h3'}>
                      <div className="flex">
                        <span className="ml-2 text-accent-l-700">{index + 1}.</span> <div dangerouslySetInnerHTML={{ __html: question.text }} />
                        {question.required && <span className="mr-1 text-red-500">*</span>}
                      </div>
                    </Heading>
                    <p className="text-accent-l-100">
                      {question.required ? question.deg : question.bouns}
                      <span className="mr-1">{question.required ? 'درجة' : 'بونص'}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-6 mr-16 mt-6 text-start">
                      {question?.answers?.map((answer, i) => (
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
                            <div dangerouslySetInnerHTML={{ __html: answer.text }} />
                            <span>{highlight(answer.isCorrect, i, index) === 'true' ? <Check /> : highlight(answer.isCorrect, i, index) === 'false' ? <X /> : ''}</span>
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
                <p className="mt-2 text-start">
                  {' '}
                  <div className="flex gap-2">
                    <span className="font-almaria-bold">التفسير : </span>
                    <div dangerouslySetInnerHTML={{ __html: question.explain }} />
                  </div>
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
  );
}
