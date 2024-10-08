import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Heading from '../../UI-Global/Heading.jsx';
import Tab from '../../pages/Dashboard/Components/Tab.jsx';
import { constraints } from '../../config.js';
import OldButton from '../../UI-Global/Button.jsx';
import Editor from './TextEditor2.jsx';
import { Check, Edit, Plus, Trash2, X } from 'lucide-react';

import { Reorder } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';

import { Button } from '../../components/ui/button.jsx';

// import OnlineIcon from '../../../public/Icons/online_icon.svg';
import OnlineIcon from '../../../public/Icons/online_icon.svg';
import TimeIcon from '../../../public/Icons/time_icon.svg';
import TimeIcon2 from '../../../public/Icons/time_icon_2.svg';
import CalenderIcon from '../../../public/Icons/calender_icon_2.svg';
import CopyIcon from '../../../public/Icons/copy_icon_gray.svg';
import TrashIcon from '../../../public/Icons/trash_icon_gray.svg';
import BreadcrumbArrow from '../../../public/Icons/breadcrumb_arrow.svg';
import TestImage from '../../../public/imgs/test_image.svg';
import ShareIcon from '../../../public/Icons/share_icon.svg';
import ShareIcon2 from '../../../public/Icons/share_icon_2.svg';
import ArrowRounded from '../../../public/Icons/arrow_rounded.svg';
import GripIcon from '../../../public/Icons/grip_icon.svg';
import PickTime from '../../components/PickTime.jsx';
import { PopoverClose } from '@radix-ui/react-popover';
import { convertTo12HourFormat } from '@/lib/time.js';
import PickDuration from '../../components/PickDuration.jsx';
import { ShowTest } from './ShowTest.jsx';
import TestSent from '../../../public/Icons/test_sent_icon.svg';
import Trash from '../../../public/Icons/trash_icon_gray.svg';
import Print from '../../../public/Icons/print_icon.svg';
import { SolidLogo } from '../../UI-Global/SolidLogo.jsx';
import Backtolevels from '@/UI-Global/Backtolevels.jsx';
import { Input } from '@/components/ui/input.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { DeleteConfirmation } from '@/components/DeleteConfirmation.jsx';

// const QUESTIONS = [
//   {
//     text: 'ما هو أكبر كوكب في المجموعة الشمسية؟',
//     bouns: 0,
//     deg: 1,
//     answers: [
//       { text: 'المشتري', isCorrect: true, id: '1' },
//       { text: 'المريخ', isCorrect: false, id: '2' },
//     ],
//     images: [],
//     explain: 'المشتري هو أكبر كوكب في المجموعة الشمسية.',
//     required: true,
//     id: '1',
//   },
//   {
//     text: 'ما هي عاصمة فرنسا؟',
//     bouns: 1,
//     deg: 0,
//     answers: [
//       { text: 'باريس', isCorrect: true, id: '1' },
//       { text: 'برلين', isCorrect: false, id: '2' },
//     ],
//     images: [],
//     explain: 'باريس هي عاصمة فرنسا.',
//     required: false,
//     id: '2',
//   },
//   {
//     text: 'ما هو الحيوان الأسرع في العالم؟',
//     bouns: 0,
//     deg: 1,
//     answers: [
//       { text: 'الفهد', isCorrect: true, id: '1' },
//       { text: 'الأسد', isCorrect: false, id: '2' },
//     ],
//     images: [],
//     explain: 'الفهد هو الحيوان الأسرع في العالم.',
//     required: true,
//     id: '3',
//   },
//   //  {
//   //   text: "ما هو الحيوان الأسرع في العالم 2؟",
//   //   bouns: 0,
//   //   deg: 1,
//   //   answers: [
//   //    { text: "الفهد", isCorrect: true, id: "1" },
//   //    { text: "الأسد", isCorrect: false, id: "2" },
//   //    { text: "الثعلب", isCorrect: false, id: "3" },
//   //    { text: "القطة", isCorrect: false, id: "4" },
//   //   ],
//   //   images: [
//   //    "../../public/imgs/test_image.svg",
//   //    "../../public/imgs/video.svg",
//   //    "../../public/imgs/home-bg-1.png",
//   //    "../../public/imgs/home-bg-2.png",
//   //   ],
//   //   explain: "الفهد هو الحيوان الأسرع في العالم.",
//   //   required: true,
//   //   id: "4",
//   //  },
// ];
export const DEFAULT_QUESTION = {
  text: '',
  bouns: 1,
  deg: 0,
  answers: [
    { text: '', isCorrect: false, isDeleted: false, id: '1' },
    { text: '', isCorrect: false, isDeleted: false, id: '2' },
  ],
  images: [],
  explain: '',
  required: false,
  id: '',
};
const TESTDATA = {
  title: '',
  mark: 0,
  startDate: new Date(),
  type: 'اونلاين',
  teacherId: 0,
  groupsIds: [],
  bounce: 0,
  questions: [],
  timeStart: {
    hours: 5,
    minute: 30,
    mode: 'PM',
  },
  timeDuration: {
    hours: 1,
    minute: 30,
    mode: 'PM',
    days: 0,
  },
};
const MINS = [
  { value: 0, label: '00' },
  { value: 5, label: '05' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 35, label: '35' },
  { value: 40, label: '40' },
  { value: 45, label: '45' },
  { value: 50, label: '50' },
  { value: 55, label: '55' },
];
const HOURS = [
  { value: 1, label: '01' },
  { value: 2, label: '02' },
  { value: 3, label: '03' },
  { value: 4, label: '04' },
  { value: 5, label: '05' },
  { value: 6, label: '06' },
  { value: 7, label: '07' },
  { value: 8, label: '08' },
  { value: 9, label: '09' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
];

function AddOnlineTest({ test }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [QUESTIONS, SetQUESTIONS] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(DEFAULT_QUESTION);
  const [title, setTitle] = useState(test?.title || '');
  const [onEdit, setOnEdit] = useState(false);
  const [onEditIndex, setOnEditIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [openModel, setOpenModel] = useState(false);
  const [showTestAlert, setShowTestAlert] = useState(false);
  const [showTestRes, setShowTestRes] = useState(false);
  const [showTestDeletion, setShowTestDeletion] = useState(false);
  const navigate = useNavigate();
  const [dummyQuestions, setDummyQuestions] = useState([]);

  const [timeStart, setTimeStart] = useState(
    test?.timeStart || {
      hour: 1,
      minute: 15,
      mode: 'AM',
    },
  );
  const [timeDuration, setTimeDuration] = useState(
    test?.timeDuration || {
      hour: 1,
      minute: 15,
      mode: 'AM',
      day: 0,
    },
  );
  let timeStartString = convertTo12HourFormat(timeStart.hour, timeStart.minute);
  let timeDurationString = convertTo12HourFormat(timeDuration.hour, timeDuration.minute, timeDuration.day);

  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const backToLevel = () => {
    navigate(`/dashboard/level?level=${searchParams.get('level')}`);
  };
  const setAsOfflineTest = () => {
    searchParams.set('test', 'offline');
    setSearchParams(searchParams);
  };

  const tabs_1 = [
    {
      text: constraints[searchParams.get('level')].content[searchParams.get('subLevel')],
      path: '../../../public/Icons/level_icon.svg',
    },
    {
      text: searchParams.get('group').split('_').length,
      path: '../../../public/Icons/group_icon.svg',
    },
    { text: '12 طالب', path: '../../../public/Icons/students_icon.svg' },
    { text: questions.length, path: '../../../public/Icons/question_icon.svg' },
    { text: '20 درجة', path: '../../../public/Icons/flag_icon.svg' },
    {
      text: questions.reduce((acc, el) => acc + el.bouns, 0),
      path: '../../../public/Icons/bouns_icon.svg',
    },
  ];

  const handelIncrease = (index) => {
    if (typeof index === 'number') {
      if (questions[index].required) {
        setQuestions((prev) => prev.map((question, i) => (i === index ? { ...question, deg: question.deg + 1 } : question)));
      } else {
        setQuestions((prev) => prev.map((question, i) => (i === index ? { ...question, bouns: question.bouns + 1 } : question)));
      }
    } else {
      setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns + 1 }));
    }
  };
  const handelDecrease = (index) => {
    if (typeof index === 'number') {
      if (questions[index].required && questions[index].deg > 0) {
        setQuestions((prev) => prev.map((question, i) => (i === index ? { ...question, deg: question.deg - 1 } : question)));
      } else if (!questions[index].required && questions[index].bouns > 0) {
        setQuestions((prev) => prev.map((question, i) => (i === index ? { ...question, bouns: question.bouns - 1 } : question)));
      }
    } else {
      if (currentQuestion.bouns > 0) setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns - 1 }));
    }
  };

  const addQuestion = () => {
    currentQuestion.id = questions.length + 1;
    currentQuestion.deg = currentQuestion.required ? currentQuestion.deg : 0;
    setQuestions((prev) => [...prev, currentQuestion]);
    setCurrentQuestion(DEFAULT_QUESTION);
  };

  const editQuestion = () => {
    setQuestions((prev) => prev.map((question, i) => (i === onEditIndex ? currentQuestion : question)));
    setOnEdit(false);
    document.getElementById(`q-${currentQuestion.id}`).scrollIntoView({
      behavior: 'smooth',
      //  block: "end",
    });
    setCurrentQuestion(DEFAULT_QUESTION);
  };
  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };
  const edit = (index) => {
    document.querySelector('#editSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setOnEdit(true);
    setOnEditIndex(index);
    setCurrentQuestion(questions[index]);
    // console.log(questions[index]);
  };
  // console.log('currentQuestion', currentQuestion);

  const handleReorder = (newAnswers, questionIndex) => {
    if (typeof questionIndex === 'number') {
      setQuestions((prevQuestions) => prevQuestions.map((question, index) => (index === questionIndex ? { ...question, answers: newAnswers } : question)));
    } else {
      setCurrentQuestion((prev) => ({
        ...prev,
        answers: newAnswers,
      }));
    }
  };

  const [editors, setEditors] = useState(['', '', '', '', '']);

  const handleEditorChange = (newEditors) => {
    setEditors(newEditors);
  };

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

  const handelSaveQuiz = async () => {
    if (!title || !questions.length || !date || !authUser || !authUser.teacherId || !searchParams.get('group')) {
      return toast.error('الرجاء ملء جميع الحقول');
    }
    let testData = { ...TESTDATA };
    testData.title = title;
    testData.mark = questions.reduce((acc, q) => acc + q.deg, 0);
    testData.startDate = date;
    testData.type = 'اونلاين';
    testData.teacherId = authUser.teacherId;
    testData.groupsIds = searchParams
      .get('group')
      ?.split('_')
      .map((i) => +i);

    testData.bounce = questions.reduce((acc, q) => acc + q.bouns, 0);
    testData.questions = questions.map((q) => {
      return {
        content: q.text,
        mark: q.required ? q.deg : q.bouns,
        explain: q.explain,
        type: q.required ? ' اجباري ' : 'اخنياري',
        // bouns: q.bouns ? q.bouns : 0,
        Choices: q.answers.map((a) => {
          return {
            content: a.text,
            isCorrect: a.isCorrect,
            isDeleted: a.isDeleted,
          };
        }),
      };
    });
    testData.timeStart = {
      hours: timeStart.hour,
      minute: timeStart.minute,
      mode: timeStart.mode,
    };
    testData.timeDuration = {
      hours: timeDuration.hour,
      minute: timeDuration.minute,
      mode: timeDuration.mode,
      days: timeDuration.day,
    };
    // console.log(testData);
    try {
      let res;
      if (test && new Date(Date.now()) < new Date(test?.startDate)) {
        testData.id = test.id;
        testData.questions = testData.questions.map((q, i) => {
          return {
            ...q,
            id: questions[i].id,
            choices: q.Choices.map((a, j) => {
              return { ...a, id: questions[i].answers[j].id };
            }),
          };
        });
        console.log('testData', testData);

        res = await axios.put(`${import.meta.env.VITE_API_URL}/Quiz/UpdateOnlineQuizBeforeStart`, testData, { headers: { Authorization: authHeader } });

        if (res.status === 200) {
          backToLevel();
        }
      } else if (test && new Date(Date.now()) >= new Date(test?.startDate)) {
        console.log('comming soon');
      } else {
        res = await axios.post(`${import.meta.env.VITE_API_URL}/Quiz/AddOnlineQuiz`, testData, {
          headers: {
            Authorization: authHeader,
          },
        });
      }
      if (res.status === 200) {
        toast.success(test ? 'تم التعديل بنجاح' : 'تم الاضافة بنجاح');
      }
    } catch (error) {
      // toast.error('حدث خطأ ما');
      toast.error(error.message);
    }
  };

  let trueRatio;
  if (showTestRes) {
    const totalRequired = questions.filter((q) => q.required).length;
    const totalCorrect = dummyQuestions.reduce((acc, q, index) => {
      return acc + q.answers.filter((a, i) => a.isCorrect && questions[index].answers[i].isCorrect).length;
    }, 0);
    trueRatio = `${totalRequired} / ${totalCorrect}`;
  }

  const handleDeleteTest = async () => {
    if (test) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Quiz/DeleteQuiz?id=${test.id}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        console.log(res);
        if (res.status === 200) {
          toast.success('تم الحذف بنجاح');
          setShowTestDeletion(false);
          navigate('/dashboard/level?level=1&subLevel=1');
        }
      } catch (error) {
        toast.error('حدث خطأ ما');
      }
    } else {
      setQuestions([]);
      setTitle('');
      setDate(new Date());
      setTimeStart({
        hour: 1,
        minute: 15,
        mode: 'AM',
      });
      setTimeDuration({
        hour: 1,
        minute: 15,
        mode: 'AM',
        day: 0,
      });
      setDummyQuestions([]);
    }
    setShowTestDeletion(false);
  };

  useEffect(() => {
    if (test) {
      const fetchTestWithId = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetQuizById?QuizId=${test.id}`, { headers: { Authorization: authHeader } });
          console.log(res.data);
          if (res.status === 200) {
            const data = res.data;
            setQuestions(
              data.questionsOfQuizzes.map((q) => {
                return {
                  text: q.content,
                  bouns: q.type === 'اختياري' ? q.mark : 0,
                  deg: q.type !== 'اختياري' ? q.mark : 0,
                  answers: q.choices.map((a) => {
                    return {
                      text: a.content,
                      isCorrect: a.isCorrect,
                      id: a.id,
                      isDeleted: a.isDeleted,
                    };
                  }),
                  images: [],
                  explain: q.explain,
                  required: q.type !== 'اختياري',
                  id: q.id,
                };
              }),
            );
            setDummyQuestions(
              data.questionsOfQuizzes.map((q) => {
                return {
                  text: q.content,
                  bouns: q.type === 'bounce' ? q.mark : 0,
                  deg: q.type === 'required' ? q.mark : 0,
                  answers: q.choices.map((a) => {
                    return {
                      text: a.content,
                      isCorrect: false,
                      id: a.id,
                    };
                  }),
                  images: [],
                  explain: q.explain,
                  required: q.type !== 'اخنياري',
                  id: q.id,
                };
              }),
            );
            setTitle(data.title);
            setDate(new Date(data.startDate));
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
          }
        } catch (error) {
          toast.error(error?.response?.data);
          // toast.error(error.message);
        }
      };
      fetchTestWithId();
    }
  }, [test, authHeader]);

  return (
    <>
      {showTestRes && (
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
                      {timeStartString.hour}:{timeStartString.minute}{' '}
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
          <div className="flex flex-col items-center py-32">
            <TestSent className="mx-auto" />
            <Heading as={'h2'} className={'my-6 font-almaria-bold text-black'}>
              لقد تم إرسال إجاباتك بنجاح.
            </Heading>
            <p className="mb-8 mt-4 text-lg">شكراً لك على إرسال إجاباتك. </p>
            <div className="flex items-center gap-3 font-almaria-bold text-secondary-l">
              <Button
                onClick={() => {
                  setShowTestRes(true);
                  setShowTestAlert(false);
                }}
                variant="outline"
                className="border-secondary-l px-10 py-7 text-xl hover:text-secondary-l"
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
                    })),
                  );
                }}
                variant="ghost"
                className="px-10 py-7 text-xl hover:text-secondary-l"
              >
                إرسال رد آخر
              </Button>
            </div>
          </div>
          <div>
            <SolidLogo />
            <p className="mt-2">
              إذا كان لديك أي استفسارات ، لا تتردد في{' '}
              <Link className="text-secondary-l underline" to={'/contact-with-us'}>
                التواصل معنا
              </Link>
              . نتمنى لك التوفيق!
            </p>
          </div>
        </>
      )}
      {!showTestAlert && !showTestRes && (
        <div className="px-12 py-16">
          <DeleteConfirmation open={showTestDeletion} setOpen={setShowTestDeletion} onDelete={handleDeleteTest} />
          <Backtolevels />
          <Heading as={'h1'} className={'my-6 font-almaria-bold text-black'}>
            اختبار جديد
          </Heading>
          <hr className="w-[70%]" />
          <div className="mb-12 mt-4 flex gap-2 font-almaria-light">
            <button className="flex gap-1" onClick={() => setSearchParams({ tab: 'level' })}>
              <span>المراحل الدراسية</span>
              <BreadcrumbArrow />
            </button>
            <button className="flex gap-1" onClick={() => setSearchParams({ tab: 'level', level: searchParams.get('level') })}>
              <span>{constraints[searchParams.get('level')].text}</span>
              <BreadcrumbArrow />
            </button>
            <button className="flex gap-1">
              <span>{constraints[searchParams.get('level')].content[+searchParams.get('subLevel')]}</span>
              <BreadcrumbArrow />
            </button>
            <button className="flex gap-1">
              <span>{searchParams.get('group')?.replaceAll('_', ' / ')}</span>
              <BreadcrumbArrow />
            </button>
            <div className="flex gap-1">
              <span>الاختبارات</span>
              <BreadcrumbArrow />
            </div>
            <div className="flex gap-1 font-almaria-bold">
              <span>اضافة اختبار</span>
            </div>
          </div>
          <div className="mx-auto w-full p-4 md:w-[85%] lg:w-[70%]">
            <div className="rounded-lg bg-white p-4">
              <div className="mb-6 flex items-center justify-between">
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
                        <Button variant="outline" size="icon" onClick={setShowTestDeletion}>
                          <TrashIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center" sideOffset={10}>
                        <p>حذف</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="my-4 flex">
                <div className="mr-8">
                  <TestImage />{' '}
                </div>
                <div className="ml-8 flex-grow">
                  <div className="mr-6 flex flex-grow items-center gap-3">
                    <div className="flex-grow">
                      {/* <Heading as={'h3'} className={'mb-12 font-almaria-bold'}>
                      </Heading> */}
                      <Input className="mb-10 max-w-56 border-none" placeholder="عنوان الاختبار" value={title} onChange={(e) => setTitle(e.target.value)} />
                      <div className="grid max-w-[500px] grid-cols-3 gap-4">
                        {tabs_1.map((item, index) => (
                          <Tab key={index} type={'ghost'} text={item.text} path={item.path} />
                        ))}
                      </div>
                    </div>
                    <div className="my-auto flex flex-col gap-3">
                      <Popover>
                        <PopoverTrigger>
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger className="w-full">
                                <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
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
                        <PopoverContent side={'right'} align="start" alignOffset={10} sideOffset={10} className="m-0 w-fit rounded-lg border-0 p-0 shadow-none">
                          <Button variant="outline" className="pl-10" onClick={setAsOfflineTest}>
                            اوفلاين
                          </Button>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger>
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger className="w-full">
                                <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
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
                        </PopoverTrigger>
                        <PopoverContent className="w-[96]">
                          <PickTime PopoverClose={PopoverClose} timeStartString={timeStartString} timeStart={timeStart} setTimeStart={setTimeStart} MINS={MINS} HOURS={HOURS} />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger>
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger className="w-full">
                                <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
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
                          <PickDuration PopoverClose={PopoverClose} timeDurationString={timeDurationString} timeDuration={timeDuration} setTimeDuration={setTimeDuration} MINS={MINS} HOURS={HOURS} />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger>
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger className="w-full">
                                <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
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
                        <PopoverContent className="ltr p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            footer={
                              <PopoverClose className="mt-2 w-full">
                                <Button variant="outline" className="w-full">
                                  حفظ
                                </Button>
                              </PopoverClose>
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between gap-4">
                    <div className="flex gap-6">
                      {test && (
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
                      )}
                    </div>
                    <div className="flex gap-6">
                      <OldButton type={'outline'} icon={<ShareIcon2 />}>
                        مشاركة مع المجموعة
                      </OldButton>
                      <OldButton type={'outline'} icon={<ShareIcon />} onClick={handelSaveQuiz}>
                        {test ? 'تعديل' : 'اضافة'}
                      </OldButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8" id="editSection">
              <Editor editors={editors} onChange={handleEditorChange} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} questions={questions} setQuestions={setQuestions} />

              <div className="mb-6 flex gap-3">
                <Button
                  variant="ghost"
                  className={'my-4 gap-2 bg-secondary-l pl-6 pr-2 font-almaria text-lg text-white hover:bg-secondary-l hover:text-white'}
                  onClick={() => {
                    onEdit ? editQuestion() : addQuestion();
                  }}
                >
                  <Plus />
                  <span>{onEdit ? 'نطبيق التعديل' : 'اضافة جديد'}</span>
                </Button>
                {onEdit && (
                  <Button
                    variant="outline"
                    className={'my-4 gap-0 border border-accent-l-1000 bg-white'}
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
                    className="rounded-lg bg-white px-3 pb-8 pt-4"
                  >
                    <div className="flex w-full items-center">
                      <span>{index + 1}.</span>
                      <div className="mr-2 flex-grow font-almaria-bold text-lg" dangerouslySetInnerHTML={{ __html: question?.text }} />
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-lg bg-accent-l-1100 px-4 py-2">
                          <div className="flex flex-col justify-between gap-1">
                            <button className="transition-all duration-300 hover:scale-110" onClick={() => handelIncrease(index)}>
                              <ArrowRounded />
                            </button>
                            <button className="transition-all duration-300 hover:scale-110" onClick={() => handelDecrease(index)}>
                              <ArrowRounded className="rotate-180" />
                            </button>
                          </div>
                          <span className="mr-1">{question.required ? question.deg : question.bouns}</span>
                        </div>
                        <span className="mr-1">{question.required ? 'درجة' : 'بونص'}</span>
                      </div>
                    </div>
                    <Reorder.Group
                      values={question.answers}
                      //  dragConstraints={parentRef}
                      onReorder={(newAnswers) => {
                        // Call function to update state with new answers order
                        handleReorder(newAnswers, index);
                      }}
                      className="mr-12 mt-3 flex flex-col gap-3 overflow-clip"
                    >
                      <div className="grid grid-cols-12">
                        <div className="col-span-6 flex flex-col gap-4">
                          {question.answers.map(
                            (answer) =>
                              !answer.isDeleted && (
                                <Reorder.Item key={answer.text} value={answer} className="flex w-full items-center gap-3 font-almaria-bold">
                                  <input type="radio" className="h-5 w-5" name={answer.text} checked={answer.isCorrect} onChange={() => {}} disabled />
                                  <div className="w-full">
                                    <div className="flex w-full items-center gap-2">
                                      <div className="min-w-[25%]" dangerouslySetInnerHTML={{ __html: answer.text }}></div>
                                      <GripIcon />
                                    </div>
                                  </div>
                                </Reorder.Item>
                              ),
                          )}
                        </div>
                        <div className="col-span-6 grid grid-cols-4">
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
                        <GripIcon className="rotate-90 cursor-pointer transition-all duration-300 hover:scale-110" />
                        <button type="button" className="col-span-10 mt-4 flex items-center gap-1" onClick={() => edit(index)}>
                          <Edit className="h-5 text-secondary-l" />
                          <span className="font-almaria-bold text-secondary-l">تعديل</span>
                        </button>
                        <button type="button" className="col-span-10 mt-4 flex items-end gap-1 text-primary-l" onClick={() => deleteQuestion(index)}>
                          <Trash2 />
                          <span className="font-almaria-bold text-primary-l">حذف</span>
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
