import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Heading from '@/UI-Global/Heading';
import React, { useEffect, useState } from 'react';

import { Check, X } from 'lucide-react';
import Print from '@public/Icons/print_icon.svg';
import { Link, useParams } from 'react-router-dom';
import { getStudentTestsResult } from '@/Features/test/helpers';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Arrow from '/public/Icons/rev_arrow.svg';
function ShowTestResult() {
  const { id } = useParams();
  const auth = useAuthHeader();
  const [quiz, setQuiz] = useState(null);
  const [studentSolve, setStudentSolve] = useState(null);
  useEffect(() => {
    getStudentTestsResult(id, auth).then(({ quiz, studentSolve }) => {
      setQuiz(quiz);
      setStudentSolve(studentSolve);
    });
  }, [id]);
  if (!quiz || !studentSolve) return null;
  const highlight = (isCorrect, i, index) => {
    if ((isCorrect && quiz?.questionsOfQuizzes[index].choices[i].isCorrect) || quiz?.questionsOfQuizzes[index].choices[i].isCorrect) {
      return 'true';
      // return "bg-[#bae3cd]";
    }
    if (isCorrect && !quiz?.questionsOfQuizzes[index].choices[i].isCorrect) {
      return 'false';
      // return "bg-[#fccfd0]";
    }
  };

  console.log(quiz, studentSolve);

  return (
    <>
      <Link to={`/dashboard/tests`} className={'flex items-center gap-5 font-almaria-bold text-xl text-secondary-l underline'}>
        <Arrow />
        الرجوع الي الاختبارات
      </Link>
      <div className="container mx-auto w-full rounded-lg p-4 md:w-[85%] lg:w-[80%]">
        <div className="container mx-auto -mt-5 w-full rounded-lg p-4 text-center md:w-[85%] lg:w-[70%]">
          <div className="rounded-md bg-secondary-l py-20 text-white">
            <Heading as={'h1'}>{quiz.title}</Heading>
          </div>
          <div className="my-4 flex justify-between font-almaria-bold text-xl">
            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <span>درجة</span>
                <span>:</span>
                <div className="bg-white px-10 py-2 text-secondary-l">
                  {quiz.mark} / {studentSolve.studentMark}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span>الوقت</span>
                <span>:</span>
                <div className="bg-white px-10 py-2 text-secondary-l">
                  {quiz.timeStart.hour}:{quiz.timeStart.minute}{' '}
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
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {quiz?.questionsOfQuizzes?.map((question, index) => (
              <div key={question.id}>
                <li className="w-full rounded-md bg-white px-3 py-5 text-black">
                  <div className="flex items-center justify-between">
                    <Heading as={'h3'}>
                      <div className="flex">
                        <span className="ml-2 text-accent-l-700">{index + 1}.</span>
                        <div dangerouslySetInnerHTML={{ __html: question.content }} />
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
                      {question?.choices?.map((answer, i) => (
                        <div key={answer.id} className={`mb-3 flex gap-4 px-2 py-1 ${highlight(answer.isCorrect, i, index) === 'true' ? 'bg-[#bae3cd]' : highlight(answer.isCorrect, i, index) === 'false' ? 'bg-[#fccfd0]' : ''} `}>
                          <input
                            type="radio"
                            name={question.id}
                            className="h-5 w-5"
                            checked={answer.isCorrect}
                            disabled
                            //  onChange={(e) => handelAnswerCheck(e, i, index)}
                          />
                          <div className="flex w-full justify-between">
                            <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                            <span>{highlight(answer.isCorrect, i, index) === 'true' ? <Check /> : highlight(answer.isCorrect, i, index) === 'false' ? <X /> : ''}</span>
                          </div>
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
export default ShowTestResult;
