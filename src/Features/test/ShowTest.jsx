import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';

import Eye from '../../../public/Icons/show_icon.svg';
import Heading from '../../UI-Global/Heading.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip.jsx';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog.jsx';

import TimeIcon from '../../../public/Icons/time_icon.svg';
import { SolidLogo } from '../../UI-Global/SolidLogo.jsx';

export function ShowTest({ test, timeStartString, setShowTestAlert, openModel, setOpenModel, dummyQuestions, setDummyQuestions }) {
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
      }),
    );
  };

  return (
    <AlertDialog open={openModel}>
      <AlertDialogTrigger>
        <Button variant="ghost" className="bg-accent-l-1100" onClick={setOpenModel}>
          <Eye className="ml-2 h-6 w-6" />
          <span>عرض الاختبار</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="show_test_bg !max-w-screen h-full overflow-auto pb-32">
        <div className="container mx-auto -mt-5 w-full rounded-lg p-4 text-center md:w-[85%] lg:w-[70%]">
          <div className="rounded-md bg-secondary-l py-20 text-white">
            <Heading as={'h1'}>{test?.title}</Heading>
          </div>
          <div className="mb-4 mr-auto mt-2 w-fit">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="w-full">
                  <Button variant="secondary" className="w-full justify-start gap-4">
                    <TimeIcon />
                    <span className="ltr">
                      {timeStartString.hour}:{timeStartString.minute} {timeStartString.mode}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" align="center" sideOffset={10}>
                  <p>يبدا الاختبار</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="flex flex-col gap-4">
            {dummyQuestions.map((question, index) => (
              <li key={question.text} className="w-full rounded-md bg-white px-3 py-5 text-black">
                <div className="flex items-center justify-between">
                  <Heading as={'h3'}>
                    {' '}
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
                    {question?.answers.map(
                      (answer, i) =>
                        !answer.isDeleted && (
                          <div key={answer.text} className="mb-3 flex gap-4">
                            <input type="radio" name={question.id} className="h-5 w-5" checked={answer.isCorrect} onChange={(e) => handelAnswerCheck(e, i, index)} />
                            <div dangerouslySetInnerHTML={{ __html: answer.text }} />
                          </div>
                        ),
                    )}
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
          <div className="mt-12 flex items-center justify-between">
            <Button
              variant="ghost"
              className="bg-secondary-l px-10 py-6 font-almaria-light text-2xl text-white"
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
