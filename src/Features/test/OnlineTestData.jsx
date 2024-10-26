import { useEffect, useRef, useState } from 'react';
import Heading from '../../UI-Global/Heading.jsx';
import { ChartPie, Check, ChevronLeft, ChevronRight, CircleChevronLeft, CircleChevronRight, NotepadText, UserRoundX, X } from 'lucide-react';
import Trash from '../../../public/Icons/trash_icon_gray.svg';
import Print from '../../../public/Icons/print_icon.svg';
import { Button } from '../../components/ui/button.jsx';
import { cn } from '@/lib/utils.js';

import Arrow from '../../../public/Icons/arrow-small.svg';
import CorrectIcon from '../../../public/Icons/correct_icon.svg';
import InCorrectIcon from '../../../public/Icons/incorrect_icon.svg';

import StudentsIcon from '../../../public/Icons/students_white_icon.svg';
import QuestionsIcon from '../../../public/Icons/question_white_icon.svg';
import Bouns from '../../../public/Icons/bouns_white_icon.svg';
import Flag from '../../../public/Icons/flag_white_icon.svg';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import { Bichart } from '@/components/ui/bi-chart.jsx';
import { Barchart } from '@/components/ui/bar-chart.jsx';

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
    text: 'ما هو أكبر كوكب في المجموعة الشمسية؟',
    bouns: 0,
    deg: 1,
    answers: [
      { text: 'المشتري', isCorrect: true, id: '1' },
      { text: 'المريخ', isCorrect: false, id: '2' },
    ],
    images: [],
    explain: 'المشتري هو أكبر كوكب في المجموعة الشمسية.',
    required: true,
    id: '1',
  },
  {
    text: 'ما هي عاصمة فرنسا؟',
    bouns: 1,
    deg: 0,
    answers: [
      { text: 'باريس', isCorrect: true, id: '1' },
      { text: 'برلين', isCorrect: false, id: '2' },
    ],
    images: [],
    explain: 'باريس هي عاصمة فرنسا.',
    required: false,
    id: '2',
  },
  {
    text: 'ما هو الحيوان الأسرع في العالم؟',
    bouns: 0,
    deg: 1,
    answers: [
      { text: 'الفهد', isCorrect: true, id: '1' },
      { text: 'الأسد', isCorrect: false, id: '2' },
    ],
    images: [],
    explain: 'الفهد هو الحيوان الأسرع في العالم.',
    required: true,
    id: '3',
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
const types = ['النتائج', 'الاحصائيات', 'الطلاب غير المشاركين'];

let tt = true;
export default function OnlineTestData({ test }) {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [testDesc, setTestDesc] = useState({});
  const [testRes, setTestRes] = useState([]);
  const [studentsDidntTakeTest, setStudentsDidntTakeTest] = useState([]);
  const [testStats, setTestStats] = useState([]);
  const [ansInx, setAnsInx] = useState(0);
  const [type, setType] = useState(types[0]);
  const [showTestResult, setShowTestResult] = useState(false);
  const [currentTestResult, setCurrentTestResult] = useState({});
  const [showPrint, setShowPrint] = useState(false);
  const [dummyQuestions, setDummyQuestions] = useState(
    questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({
        ...answer,
        isCorrect: false,
      })),
    })),
  );
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });
  const authHeader = useAuthHeader();

  const highlight = (answer, stdAnswer) => {
    if (answer?.isCorrect && stdAnswer === answer?.text) {
      return 'true';
      // return "bg-[#bae3cd]";
    }
    if (answer?.isCorrect && stdAnswer !== answer?.text) {
      return 'false';
      // return "bg-[#fccfd0]";
    }
  };

  const handleAnsNav = (type) => {
    if (type === 'next') {
      if (ansInx + 6 < testDesc.questionsDes.length) {
        setAnsInx(ansInx + 1);
      }
    } else {
      if (ansInx - 1 >= 0) {
        setAnsInx(ansInx - 1);
      }
    }
  };

  const reformatStudentAnswers = (questions, answers) => {
    let temp = [];
    questions.forEach((question) => {
      const isExist = answers.find((ans, index) => ans.questionId === question.id);
      if (isExist) {
        temp.push(isExist);
      } else {
        temp.push({
          id: Math.random(),
          questionId: question.id,
          choiceId: null,
          questionMark: question.mark,
          iscorrect: false,
        });
      }
    });

    return temp;
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetDescreptionOfQuiz?quizId=${test.id}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 200) {
          setTestDesc(res.data);
        }
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetAllResultsOfQuizId?quizId=${test.id}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 200) {
          let questions = res.data.questionsDes;
          data.data.map((item, index) => (item.answers = reformatStudentAnswers(questions, item.answers)));
          setTestRes(data.data);
          console.log(data.data);
        }
      } catch (error) {
        toast.error('حدث خطأ ما');
      }
    };
    const fetchStudentDidntTakeTest = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Student/GetAllStudnetDidntEnterQuizId?quizid=${test.id}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 200) {
          setStudentsDidntTakeTest(res.data);
        }
      } catch (error) {
        toast.error('حدث خطأ ما');
      }
    };
    const fetchTestStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetAllStatsOfQuizId?quizid=${test.id}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 200) {
          setTestStats(res.data);
        }
      } catch (error) {
        toast.error('حدث خطأ ما');
      }
    };
    fetchTest();
    fetchStudentDidntTakeTest();
    fetchTestStats();
  }, [test]);

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetStudentSolutionByStudentQuizId?studentQuizId=${currentTestResult.id}`, {
          headers: { Authorization: authHeader },
        });
        if (res.status === 200) {
          setDummyQuestions(
            res.data.quiz.questionsOfQuizzes.map((question, index) => ({
              text: question.content,
              bouns: question.type === 'اجباري' ? 0 : question.mark,
              deg: question.type === 'اجباري' ? question.mark : 0,
              answers: question.choices?.map((answer) => ({
                text: answer?.content,
                isCorrect: answer?.isCorrect,
                id: answer?.id,
                isDeleted: answer?.isDeleted,
              })),
              images: [],
              explain: question.explain,
              required: question.type === 'اجباري',
              id: question.id,
              answer: question.answer,
              stdAnswer: res.data.studentSolve.answers[index],
            })),
          );
        }
      } catch (error) {
        toast.error('حدث خطأ ما');
      }
    };
    if (currentTestResult.id) {
      fetchTestResult();
    }
  }, [currentTestResult]);
  console.log(dummyQuestions);

  return (
    <div>
      {showTestResult && (
        <>
          <div className="container mx-auto w-full rounded-lg p-4 md:w-[85%] lg:w-[80%]" ref={componentRef}>
            <div className="container mx-auto -mt-5 w-full rounded-lg p-4 text-center md:w-[85%] lg:w-[70%]">
              <div className="rounded-md bg-secondary-l py-20 text-white">
                <Heading as={'h1'}>{testDesc?.title ? testDesc.title : 'اختبار بدون عنوان'}</Heading>
              </div>
              <div className="my-4 flex justify-between font-almaria-bold text-xl">
                <div className="flex gap-4">
                  <div className="flex items-center gap-3">
                    <span>درجة</span>
                    <span>:</span>
                    <div className="bg-white px-10 py-2 text-secondary-l">
                      {currentTestResult.studentMark + currentTestResult.studentBounce}/{currentTestResult.quizMark}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>الوقت</span>
                    <span>:</span>
                    <div className="bg-white px-10 py-2 text-secondary-l">{currentTestResult.submitAnswerTime ? format(currentTestResult.submitAnswerTime, 'HH:MM') : '00:00'}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>الترتيب</span>
                    <span>:</span>
                    <div className="bg-white px-10 py-2 text-secondary-l">{currentTestResult.order}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TooltipProvider>
                    <Tooltip delayDuration={100} open={showPrint}>
                      <TooltipTrigger className="w-full" onMouseOver={setShowPrint} onMouseLeave={() => setShowPrint(false)}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-full justify-start gap-4"
                          onClick={() => {
                            setShowPrint(false);
                            setTimeout(() => {
                              handlePrint();
                            }, 200);
                          }}
                        >
                          <Print />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center" sideOffset={10}>
                        <p> طباعة</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <Button
                          onClick={() => {
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
                  </TooltipProvider> */}
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {dummyQuestions?.map((question, index) => (
                  <div key={question.id}>
                    <li className="w-full rounded-md bg-white px-3 py-5 text-black">
                      <div className="flex items-center justify-between">
                        <Heading as={'h3'}>
                          {' '}
                          <div className="flex gap-1">
                            <span className="ml-2 text-accent-l-700">{index + 1}.</span>
                            <div dangerouslySetInnerHTML={{ __html: question.text }} />
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
                                <div key={answer.text} className={`mb-3 flex gap-4 px-2 py-1 ${answer.isCorrect && 'bg-[#bae3cd]'} ${question.stdAnswer?.choiceId === answer.id && (question.stdAnswer.iscorrect ? 'bg-[#bae3cd]' : 'bg-[#fccfd0]')} `}>
                                  <input
                                    type="radio"
                                    name={question.id}
                                    className="h-5 w-5"
                                    checked={question.stdAnswer?.choiceId === answer.id}
                                    disabled
                                    //  onChange={(e) => handelAnswerCheck(e, i, index)}
                                  />
                                  <div className="flex w-full justify-between">
                                    <div dangerouslySetInnerHTML={{ __html: answer.text }} />
                                    <span>
                                      {question?.stdAnswer?.choiceId === answer.id && (question?.stdAnswer?.iscorrect ? <Check /> : <X />)}
                                      {answer?.isCorrect && !question?.stdAnswer.iscorrect && <Check />}
                                    </span>
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
                      <div className="flex gap-1">
                        <span className="font-almaria-bold">التفسير : </span>
                        <div dangerouslySetInnerHTML={{ __html: question.explain }} />
                      </div>
                    </p>
                  </div>
                ))}
              </ul>
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
              <img src="../../../public/imgs/res-bg.png" alt="res-bg" className="absolute left-0 top-0 h-full opacity-25" />
              <img src="../../../public/imgs/res-bg.png" alt="res-bg" className="absolute right-0 top-0 h-full opacity-25" />
              <Heading as={'h4'}>{testDesc?.title ? testDesc.title : 'اختبار بدون عنوان'}</Heading>
              <div className="flex w-[55%] justify-between font-almaria-light text-white">
                <div className="flex items-end gap-1">
                  <StudentsIcon className="ml-2" />
                  <span>{testDesc?.numStuedntsSolveQuiz} طالب</span>
                </div>
                <div className="flex items-end gap-1">
                  <UserRoundX className="ml-2" />
                  <span>{testDesc?.numStuedntsNotSolveQuiz} طلاب لم يشاركوا</span>
                </div>
                <div className="flex items-end gap-1">
                  <QuestionsIcon className="ml-2" />
                  <span>{testDesc?.numQuestions} سوال</span>
                </div>
                <div className="flex items-end gap-1">
                  <Bouns className="ml-2" />
                  <span>{testDesc?.bounce} بونص</span>
                </div>
                <div className="flex items-end gap-1">
                  <Flag className="ml-2" />
                  <span>{testDesc?.mark} درجة</span>
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
                    <Button size="icon" disabled={ansInx <= 0} variant="ghost" onClick={() => handleAnsNav('prev')}>
                      <CircleChevronRight className={ansInx > 0 ? 'text-secondary-l' : 'text-secondary-l/40'} />
                    </Button>
                    {testDesc.questionsDes?.slice(ansInx, ansInx + 6).map((ans, index) => (
                      <div style={{ userSelect: 'none' }} key={index} className="flex flex-col items-center justify-center gap-1">
                        <div>
                          <span className="font-sans">{ans?.type === 'اجباري' ? 'س' : 'ب'}</span>
                          <span>{index + 1 + ansInx}</span>
                        </div>
                        <span className="rounded-full bg-gray-500 px-3 text-sm text-white">{ans?.mark}</span>
                      </div>
                    ))}

                    <CircleChevronLeft className={ansInx + 6 < testDesc?.questionsDes?.length ? 'cursor-pointer text-secondary-l' : 'cursor-not-allowed text-secondary-l/40'} onClick={() => handleAnsNav('next')} />
                  </div>
                </div>
                {testRes
                  ?.sort((a, b) => b.studentMark + b.studentBounce - (a.studentMark + a.studentBounce))
                  ?.map((res, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        res.order = index + 1;
                        setShowTestResult(true);
                        setCurrentTestResult(res);
                      }}
                      className="mb-4 grid cursor-pointer grid-cols-11 items-center gap-4 rounded-xl bg-white px-4 py-3 text-center hover:bg-accent-l-900/70"
                    >
                      <div className="font-almaria">{format(res.submitAnswerTime, 'hh:mm')}</div>
                      <div className="col-span-2 line-clamp-1 font-almaria">{res.stuentName}</div>
                      <div>{index + 1}</div>
                      <div>
                        {Math.floor((res.studentMark / (res.quizMark === 0 ? 1 : res.quizMark)) * 100)}% <span className="font-almaria">({res.quizMark}</span> /{res.studentMark})
                      </div>

                      <div>
                        {Math.floor((res.studentBounce / (res.quizBounce === 0 ? 1 : res.quizBounce)) * 100)}% <span className="font-almaria">({res.quizBounce}</span> /{res.studentBounce})
                      </div>

                      <div>
                        {Math.floor(((res.studentMark + res.studentBounce) / (res.quizMark === 0 ? 1 : res.quizMark)) * 100)}% <span className="font-almaria">({res.quizMark}</span> /{res.studentMark + res.studentBounce})
                      </div>
                      <div></div>
                      <div className="col-span-3 flex w-full items-center justify-between font-cairo text-xl">
                        <div></div>
                        {res?.answers?.slice(ansInx, ansInx + 6)?.map((ans, index) => (ans.iscorrect ? <CorrectIcon key={index} /> : <InCorrectIcon key={index} />))}
                        <div></div>
                        {/* </div> */}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {type === types[1] && (
              <>
                <div className="mt-12 flex flex-col gap-3 text-center">
                  <div className="flex flex-col gap-3">
                    {testStats?.map((st, index) => (
                      <div key={index} className="rounded-lg bg-white px-8 py-6">
                        <div className="flex gap-2 font-almaria-bold text-xl">
                          <span>{index + 1}.</span>
                          <div>
                            <div dangerouslySetInnerHTML={{ __html: st.questionContent }} />
                            <p className="mt-4 text-start text-lg text-slate-500">{st.correctAnswerCount + st.incorrectAnswerCount} اجابة </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                          <Bichart
                            chartData={[
                              { q_type: 'correct', answers: st?.correctAnswerCount, fill: '#2cbf71' },
                              { q_type: 'incorrect', answers: st?.incorrectAnswerCount, fill: '#e0242d' },
                            ]}
                          />
                          <Barchart
                            chartData={
                              st?.choices?.map((ans, index) => ({ ans: (index + 1).toString(), votes: ans?.choiceSelectionCount, fill: ans?.isCorrect ? '#2cbf71' : '#e0242d' }))

                              // [
                              // { ans: '2', votes: 3, fill: '#e0242d' },
                              // { ans: '3', votes: 4, fill: '#e0242d' },
                              // { ans: '4', votes: 2, fill: '#e0242d' },
                              // { ans: '5', votes: 0, fill: '#e0242d' },
                              // ]
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {type === types[2] && (
              <>
                <div className="mt-12 flex flex-col gap-3 text-center">
                  <div className="rounded-lg bg-[#E0232E] py-3 font-almaria-bold text-white">اسم الطالب</div>
                  <div className="flex max-h-[40vh] flex-col gap-3 overflow-y-auto">
                    {studentsDidntTakeTest?.map((std, index) => (
                      <div key={index} className="rounded-lg bg-white py-3">
                        {std.name}
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
