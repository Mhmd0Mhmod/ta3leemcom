import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getTest } from '@/Context/StudentDashboard/helpers';

import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import Heading from '@/UI-Global/Heading';
import { SolidLogo } from '@/UI-Global/SolidLogo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog.jsx';

import TimeIcon from '@public/Icons/time_icon.svg';
import { format } from 'date-fns';
import { intervalToDuration, formatDuration, differenceInSeconds } from 'date-fns';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { submitTestAnswer } from '@/Features/test/helpers';
import { Hourglass } from 'lucide-react';
import { fromZonedTime } from 'date-fns-tz';

export default function StudentSolveTest() {
  const { id: quizId } = useParams();
  const [test, setTest] = useState(null);

  const [title, setTitle] = useState(test?.title || '');
  const [date, setDate] = useState(new Date());
  const [openModel, setOpenModel] = useState(true);
  const [showTestAlert, setShowTestAlert] = useState(false);
  const [showTestRes, setShowTestRes] = useState(false);

  const [dummyQuestions, setDummyQuestions] = useState([]);

  const [timeStart, setTimeStart] = useState({});
  const [timeDuration, setTimeDuration] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { studentId } = useAuthUser();
  const nav = useNavigate();

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

  const handelSubmitTest = async () => {
    try {
      const testData = {
        quizId: quizId,
        studentId,
        questionForms: dummyQuestions
          .map((question) => ({
            questionId: question.id,
            choiceId: question.answers.find((a) => a.isCorrect)?.id,
          }))
          .filter((a) => a.choiceId !== undefined),
      };
      if (testData.quizId && testData.studentId && testData.questionForms.length > 0) {
        testData.submitAnswersDate = fromZonedTime(new Date(), 'Africa/Cairo').toISOString();
        submitTestAnswer(testData);
        toast.success('تم ارسال الاختبار بنجاح');
        nav('/dashboard');
      }
    } catch (error) {
      toast.error('حدث خطأ ما');
    } finally {
      localStorage.removeItem('dummyQuestions');
    }
  };
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);

        const data = await getTest(quizId); // Wait for the promise to resolve

        setTest(data);
        setTitle(data.title || 'اختبار بدون عنوان');
        setDate(data.startDate);

        setTimeStart({
          hour: data.timeStart.hours,
          minute: data.timeStart.minute,
          mode: data.timeStart.mode,
        });

        setTimeDuration({
          hour: data.timeDuration.hours,
          minute: data.timeDuration.minute,
          mode: data.timeDuration.mode,
          day: data.timeDuration.days,
        });
        if (localStorage.getItem('dummyQuestions')) {
          setDummyQuestions(JSON.parse(localStorage.getItem('dummyQuestions')));
        } else {
          setDummyQuestions(
            data.questionsOfQuizzes.map((q) => ({
              text: q.content,
              bouns: q.type.trim() !== 'اجباري' ? q.mark : 0,
              deg: q.type.trim() === 'اجباري' ? q.mark : 0,
              answers: q.choices.map((a) => ({
                text: a.content,
                isCorrect: false,
                id: a.id,
              })),
              images: [],
              explain: q.explain,
              required: q.type.trim() === 'اجباري',
              id: q.id,
            })),
          );
        }
      } catch (error) {
        setError(error.message || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [quizId]);

  useEffect(() => {
    if (dummyQuestions.length === 0) return;
    localStorage.setItem('dummyQuestions', JSON.stringify(dummyQuestions));
  }, [dummyQuestions]);

  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    if (!test?.endDate) return;

    const updateRemainingTime = () => {
      const seconds = differenceInSeconds(new Date(test?.endDate), new Date());

      if (seconds <= 0) {
        setRemainingTime('Time’s up!');
        return;
      }

      const duration = intervalToDuration({ start: new Date(), end: new Date(test?.endDate) });
      setRemainingTime(formatDuration(duration));
    };

    const intervalId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [test?.endDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center font-almaria-bold text-2xl">{error}</div>;
  // if (!test) return <div>Test not found</div>;
  return (
    <>
      {test && (
        <AlertDialog open={openModel}>
          <AlertDialogContent className="show_test_bg !max-w-screen h-full overflow-auto pb-32">
            <div className="container mx-auto -mt-5 w-full rounded-lg p-4 text-center md:w-[85%] lg:w-[70%]">
              <div className="rounded-md bg-secondary-l py-20 text-white">
                <Heading as={'h1'}>{test?.title}</Heading>
              </div>
              <div className="mb-4 mr-auto mt-2 flex w-full justify-between">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="">
                      <Button variant="secondary" className="w-full justify-start gap-4">
                        <Hourglass />
                        <span className="ltr">{remainingTime}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align="center">
                      <p> ينتهي الاختبار بعد</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="">
                      <Button variant="secondary" className="w-full justify-start gap-4">
                        <TimeIcon />
                        <span className="ltr">
                          {
                            // test.endDate && format(new Date(test.endDate), 'hh:mm a')
                            test.endDate && format(new Date(test.endDate), 'hh:mm a , dd/MM/yyyy')
                            // {timeStart?.hour}:{timeStart?.minute} {timeStart?.mode}
                          }
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align="center">
                      <p>ينتهي الاختبار</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mb-2 text-start">
                <span className="font-almaria-bold text-black">ملحوظة :</span>
                <span className="font-almaria-light text-slate-700">يتم ارسال حل الاختبار تلقائيا في حالة انتهاء الوقت قبل ارسال الحل .</span>
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
                    handelSubmitTest();
                    // setShowTestAlert(true);
                    // setOpenModel(false);
                  }}
                >
                  ارسال
                </Button>

                <SolidLogo />
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* {showTestAlert && <ShowTestAlert setShowTestAlert={setShowTestAlert} setShowTestRes={setShowTestRes} setOpenModel={setOpenModel} setDummyQuestions={dummyQuestions} questions={questions} />}
      {showTestRes && <ShowTestRes setShowTestRes={setShowTestRes} setDummyQuestions={setDummyQuestions} questions={questions} title={title} timeStart={timeStart} showTestRes={showTestRes} dummyQuestions={dummyQuestions} />} */}
    </>
  );
}
