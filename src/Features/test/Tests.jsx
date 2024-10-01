import { useSearchParams } from 'react-router-dom';
import Heading from '../../UI-Global/Heading.jsx';
import { constraints } from '../../config.js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import Plus from '../../../public/Icons/plus.svg';
import CalendarIcon from '../../../public/Icons/calender.svg';
import Arrow from '../../../public/Icons/breadcrumb_arrow.svg';
import ArrowFilled from '../../../public/Icons/arrow_list_icon.svg';
import { cn } from '@/lib/utils.js';
import { format } from 'date-fns';
import Table from '@/UI-Global/Table/Table.jsx';
import THead from '@/UI-Global/Table/THead.jsx';
import TR from '@/UI-Global/Table/TR.jsx';
import TH from '@/UI-Global/Table/TH.jsx';
import TBody from '@/UI-Global/Table/TBody.jsx';
import TD from '@/UI-Global/Table/TD.jsx';
import AddOnlineTest from './AddOnlineTest.jsx';

import TrashIcon from '../../../public/Icons/trash_icon.svg';
import EditIcon from '../../../public/Icons/edit_icon.svg';
import AddOfflineTest from './AddOfflineTest.jsx';
import OnlineTestData from './OnlineTestData.jsx';
import OfflineTestData from './OfflineTestData.jsx';
import { X } from 'lucide-react';
import SearchIcon from '../../../public/Icons/search_icon.svg';
import Backtolevels from '@/UI-Global/Backtolevels.jsx';
import Breadcrumb from '@/UI-Global/Breadcrumb.jsx';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const TESTS = [
  {
    title: 'Math Test',
    type: 'اوفلاين',
    date: '8/18/2024',
    timeStart: { hour: 9, minute: 30, mode: 'AM' },
    timeDuration: { hour: 1, minute: 15, mode: 'AM', day: 0 },
    questions: [
      {
        text: 'ما هو أكبر كوكب في المجموعة الشمسية؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'المشتري', isCorrect: true, id: '1' },
          { text: 'المريخ', isCorrect: false, id: '2' },
          { text: 'الأرض', isCorrect: false, id: '3' },
          { text: 'الزهرة', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'المشتري هو أكبر كوكب في المجموعة الشمسية.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Science Project',
    type: 'اونلاين',
    date: '8/17/2024',
    timeStart: { hour: 11, minute: 0, mode: 'AM' },
    timeDuration: { hour: 2, minute: 0, mode: 'PM', day: 0 },
    questions: [
      {
        text: 'ما هو العنصر الأكثر انتشارًا في الكون؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'الهيدروجين', isCorrect: true, id: '1' },
          { text: 'الأكسجين', isCorrect: false, id: '2' },
          { text: 'الكربون', isCorrect: false, id: '3' },
          { text: 'الهيليوم', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'الهيدروجين هو العنصر الأكثر انتشارًا في الكون.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'History Exam',
    type: 'اوفلاين',
    date: '8/16/2024',
    timeStart: { hour: 2, minute: 0, mode: 'PM' },
    timeDuration: { hour: 1, minute: 30, mode: 'PM', day: 0 },
    questions: [
      {
        text: 'من هو أول رئيس للولايات المتحدة الأمريكية؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'جورج واشنطن', isCorrect: true, id: '1' },
          { text: 'أبراهام لنكولن', isCorrect: false, id: '2' },
          { text: 'توماس جيفرسون', isCorrect: false, id: '3' },
          { text: 'جيمس ماديسون', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'جورج واشنطن هو أول رئيس للولايات المتحدة الأمريكية.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'English Essay',
    type: 'اونلاين',
    date: '8/15/2024',
    timeStart: { hour: 10, minute: 30, mode: 'AM' },
    timeDuration: { hour: 1, minute: 45, mode: 'AM', day: 0 },
    questions: [
      {
        text: "Which of the following is a synonym for 'happy'?",
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'Sad', isCorrect: false, id: '1' },
          { text: 'Joyful', isCorrect: true, id: '2' },
          { text: 'Angry', isCorrect: false, id: '3' },
          { text: 'Tired', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: "'Joyful' is a synonym for 'happy'.",
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Physics Lab',
    type: 'اوفلاين',
    date: '8/14/2024',
    timeStart: { hour: 8, minute: 0, mode: 'AM' },
    timeDuration: { hour: 2, minute: 0, mode: 'AM', day: 0 },
    questions: [
      {
        text: 'ما هو قانون نيوتن الثالث؟',
        bouns: 0,
        deg: 1,
        answers: [
          {
            text: 'القوة تساوي الكتلة مضروبة في التسارع',
            isCorrect: false,
            id: '1',
          },
          {
            text: 'لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه',
            isCorrect: true,
            id: '2',
          },
          { text: 'القوة الناتجة تساوي صفر', isCorrect: false, id: '3' },
          {
            text: 'الجسم يبقى في حالة سكون ما لم تؤثر عليه قوة خارجية',
            isCorrect: false,
            id: '4',
          },
        ],
        images: [],
        explain: 'قانون نيوتن الثالث ينص على أن لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Chemistry Quiz',
    type: 'اونلاين',
    date: '8/13/2024',
    timeStart: { hour: 1, minute: 0, mode: 'PM' },
    timeDuration: { hour: 1, minute: 0, mode: 'PM', day: 0 },
    questions: [
      {
        text: 'ما هو رمز الصوديوم في الجدول الدوري؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'Na', isCorrect: true, id: '1' },
          { text: 'Cl', isCorrect: false, id: '2' },
          { text: 'K', isCorrect: false, id: '3' },
          { text: 'Mg', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'رمز الصوديوم في الجدول الدوري هو Na.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Geography Presentation',
    type: 'اوفلاين',
    date: '8/12/2024',
    timeStart: { hour: 10, minute: 0, mode: 'AM' },
    timeDuration: { hour: 1, minute: 30, mode: 'AM', day: 0 },
    questions: [
      {
        text: 'ما هي أكبر قارة من حيث المساحة؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'آسيا', isCorrect: true, id: '1' },
          { text: 'أفريقيا', isCorrect: false, id: '2' },
          { text: 'أوروبا', isCorrect: false, id: '3' },
          { text: 'أمريكا الشمالية', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'آسيا هي أكبر قارة من حيث المساحة.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Art Project',
    type: 'اونلاين',
    date: '8/11/2024',
    timeStart: { hour: 3, minute: 0, mode: 'PM' },
    timeDuration: { hour: 2, minute: 0, mode: 'PM', day: 0 },
    questions: [
      {
        text: 'Who painted the Mona Lisa?',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'Leonardo da Vinci', isCorrect: true, id: '1' },
          { text: 'Vincent van Gogh', isCorrect: false, id: '2' },
          { text: 'Pablo Picasso', isCorrect: false, id: '3' },
          { text: 'Claude Monet', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'Leonardo da Vinci painted the Mona Lisa.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Computer Science Test',
    type: 'اوفلاين',
    date: '2024-10-30',
    timeStart: { hour: 8, minute: 45, mode: 'AM' },
    timeDuration: { hour: 2, minute: 0, mode: 'AM', day: 0 },
    questions: [
      {
        text: 'ما هي لغة البرمجة التي تم تطويرها بواسطة جيمس جوسلينج؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'Python', isCorrect: false, id: '1' },
          { text: 'Java', isCorrect: true, id: '2' },
          { text: 'C++', isCorrect: false, id: '3' },
          { text: 'Ruby', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'لغة Java تم تطويرها بواسطة جيمس جوسلينج.',
        required: true,
        id: '1',
      },
    ],
  },
  {
    title: 'Biology Lab',
    type: 'اونلاين',
    date: '2024-09-15',
    timeStart: { hour: 10, minute: 15, mode: 'AM' },
    timeDuration: { hour: 1, minute: 30, mode: 'AM', day: 0 },
    questions: [
      {
        text: 'ما هي الوحدة الأساسية للحياة؟',
        bouns: 0,
        deg: 1,
        answers: [
          { text: 'الخلية', isCorrect: true, id: '1' },
          { text: 'الجزيء', isCorrect: false, id: '2' },
          { text: 'الأنسجة', isCorrect: false, id: '3' },
          { text: 'الأعضاء', isCorrect: false, id: '4' },
        ],
        images: [],
        explain: 'الخلية هي الوحدة الأساسية للحياة.',
        required: true,
        id: '1',
      },
    ],
  },
];

function Tests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addTestUl, setAddTestUl] = useState(false);
  const [filterByDateUl, setFilterByDateUl] = useState(false);
  const [filterByDateType, setFilterByDateType] = useState('');
  const [filterByTestTypeUl, setFilterByTestTypeUl] = useState(false);
  const [filterByTestType, setFilterByTestType] = useState('');
  const [tests, setTests] = useState(null);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [TestToEdit, setTestToEdit] = useState(null);

  const authHeader = useAuthHeader();

  const formatDate = (date) => {
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const today = new Date();

  // Yesterday's date
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // A week ago
  const aWeekAgo = new Date();
  aWeekAgo.setDate(today.getDate() - 7);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const regex = new RegExp(
      searchValue
        .split(' ')
        .map((word) => `(?=.*${word})`)
        .join(''),
      'i',
    );

    setTests(TESTS.filter((test) => regex.test(test.title)));
  };

  // console.log(authHeader);
  const fetchTests = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetAllQuizsByGroupsIds?GroupsIds=${searchParams.get('group')}`, {
      headers: { Authorization: authHeader },
    });
    if (res.status === 200) {
      setTests(res.data);
    }
    setTests([]);
  };
  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <>
      {showEditModal && !showDataModal && TestToEdit.type === 'اونلاين' && <AddOnlineTest test={TestToEdit} />}
      {showEditModal && !showDataModal && TestToEdit.type === 'اوفلاين' && <AddOfflineTest test={TestToEdit} />}
      {showDataModal && currentTest.type === 'اونلاين' && <OnlineTestData test={currentTest} />}
      {showDataModal && currentTest.type === 'اوفلاين' && <OfflineTestData test={currentTest} />}
      {!showEditModal && !showDataModal && (
        <div className="px-12">
          <Backtolevels />
          <Heading as={'h1'} className={'my-6 font-almaria-bold text-black'}>
            الاختبارات
          </Heading>
          <hr className="w-[70%]" />

          <Breadcrumb page={'الاختبارات'} />
          <Button variant="ghost" size="lg" className={'relative flex gap-4 bg-secondary-l px-4 py-7 font-almaria text-2xl text-white hover:bg-secondary-l hover:text-white'} onClick={() => setAddTestUl((prev) => !prev)}>
            <Plus />
            <span>اضافة اختبار</span>
            <div className={`absolute -left-36 top-0 mt-4 w-32 text-black opacity-0 transition-all duration-300 ${addTestUl ? 'opacity-100' : 'pointer-events-none'}`}>
              <ul
                onClick={(event) => event.stopPropagation()} // Prevent click event from propagating
                className="flex flex-col gap-1 font-almaria text-lg"
              >
                <li className="rounded-xl border bg-white px-2 py-1 duration-300 hover:bg-gray-300">
                  <button
                    className="h-full w-full text-start"
                    onClick={() => {
                      searchParams.set('test', 'online');
                      setSearchParams(searchParams);
                    }}
                  >
                    اونلاين
                  </button>
                </li>
                <li className="rounded-xl border bg-white px-2 py-1 duration-300 hover:bg-gray-300">
                  <button
                    className="h-full w-full text-start"
                    onClick={() => {
                      searchParams.set('test', 'offline');
                      setSearchParams(searchParams);
                    }}
                  >
                    اوفلاين
                  </button>
                </li>
              </ul>
            </div>
          </Button>
          <div className="mb-6 mt-16 flex items-center gap-4 font-almaria-bold">
            <div className="flex w-[30rem] gap-5 rounded-lg border-2 border-accent-l-50 bg-white p-3">
              {search ? (
                <X
                  onClick={() => {
                    setSearch('');
                    setTests(TESTS);
                  }}
                  className="cursor-pointer"
                />
              ) : (
                <SearchIcon />
              )}
              <input type="text" placeholder="اسم الاختبار" className="w-full" value={search} onChange={handleSearch} />
            </div>
            {/* <Button
       type="ghost"
       size="lg"
       className={
        " bg-accent-l-900 text-black hover:bg-accent-l-900  font-almaria-light text-lg  py-6 "
       }
      >
       بحث
      </Button> */}

            <Button type="ghost" className={'relative bg-accent-l-900 py-6 font-almaria text-xl text-black hover:bg-accent-l-900'} onClick={() => setFilterByDateUl((prev) => !prev)}>
              <div className="flex items-center gap-2 font-almaria-light text-lg !text-black">
                <CalendarIcon />
                <span> {filterByDateType ? filterByDateType : 'تصفية بالتاريخ'}</span>
                <Arrow className={`${filterByDateUl ? 'rotate-90 transition-all duration-300' : '-rotate-90 transition-all duration-300'} `} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`absolute bottom-20 left-0 mt-4 rounded-[7px] border border-[#b4d3e0] bg-white text-black opacity-0 transition-all duration-300 ${filterByDateUl ? 'opacity-100' : 'pointer-events-none'}`}
              >
                <div className="relative flex flex-col gap-2 p-4 text-start font-almaria text-lg">
                  <ArrowFilled className="absolute -bottom-12 left-0 h-16 w-16" />
                  <div
                    className="mb-4 flex gap-8"
                    onClick={(e) => e.stopPropagation()} // Prevent click event from propagating
                  >
                    <div>
                      <p className="mb-2">من</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'outline'} className={cn('justify-start rounded-sm border-secondary-l pl-4 pr-1 text-left text-xl font-normal', !dateFrom && 'text-muted-foreground')}>
                            <CalendarIcon className="ml-2" />
                            {dateFrom ? format(dateFrom, 'dd/MM/yyyy') : <span>Pick a dateFrom</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <p className="mb-2">الي</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'outline'} className={cn('justify-start rounded-sm border-secondary-l pl-4 pr-1 text-left text-xl font-normal', !dateTo && 'text-muted-foreground')}>
                            <CalendarIcon className="ml-2" />
                            {dateTo ? format(dateTo, 'dd/MM/yyyy') : <span>Pick a dateTo</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <button
                    disabled={!filterByDateUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => test.date === formatDate(today)));
                      setFilterByDateUl(false);
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    اليوم
                  </button>
                  <button
                    disabled={!filterByDateUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => test.date >= formatDate(yesterday)));
                      setFilterByDateType('اليوم');
                      setFilterByDateUl(false);
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    امس
                  </button>
                  <button
                    disabled={!filterByDateUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => test.date >= formatDate(aWeekAgo)));
                      setFilterByDateType('امس');
                      setFilterByDateUl(false);
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    اسبوع
                  </button>
                  <button
                    className="mt-2 w-fit text-start text-secondary-l underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilterByDateType('اسبوع');
                      setFilterByDateUl(false);
                      setFilterByDateType('');
                    }}
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </Button>
            <Button type="ghost" className={'relative bg-accent-l-900 py-6 font-almaria text-lg text-black hover:bg-accent-l-900'} onClick={() => setFilterByTestTypeUl((prev) => !prev)}>
              <div className="flex items-center gap-2 font-almaria-light text-lg !text-black">
                <span>{filterByTestType ? filterByTestType : 'تصفية بنوع الاختبار'}</span>
                <Arrow className={`${filterByTestTypeUl ? 'rotate-90 transition-all duration-300' : '-rotate-90 transition-all duration-300'} `} />
              </div>
              <div className={`absolute bottom-20 left-0 mt-4 rounded-[7px] border border-[#b4d3e0] bg-white text-black opacity-0 transition-all duration-300 ${filterByTestTypeUl ? 'opacity-100' : 'pointer-events-none'}`}>
                <div onClick={(e) => e.stopPropagation()} className="relative flex w-56 flex-col gap-2 p-4 text-start font-almaria text-lg">
                  <ArrowFilled className="absolute -bottom-12 left-0 h-16 w-16" />

                  <button
                    disabled={!filterByTestTypeUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => test.type === 'اونلاين'));
                      setFilterByTestTypeUl(false);
                      setFilterByTestType('اونلاين');
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    اونلاين
                  </button>
                  <button
                    disabled={!filterByTestTypeUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => test.type === 'اوفلاين'));

                      setFilterByTestType('اوفلاين');
                      setFilterByTestTypeUl(false);
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    اوفلاين
                  </button>
                  <button
                    className="mt-2 w-fit text-start text-secondary-l underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS);
                      setFilterByTestType('');
                      setFilterByTestTypeUl(false);
                    }}
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </Button>

            <button
              className="text-secondary-l"
              onClick={() => {
                setTests(TESTS);
                setSearch('');
                setFilterByDateUl(false);
                setFilterByTestTypeUl(false);
                setFilterByDateType('');
                setFilterByTestType('');
              }}
            >
              إلغاء الكل
            </button>
          </div>
          <div className="my-12">
            <Table className="bg-accent-1000 min-w-full border-collapse border-spacing-2 rounded-lg text-center">
              <THead className="pl-4 pr-2">
                <TR className="mb-3 rounded-xl bg-accent-l-1000">
                  <TH className="bg-accent-1000 rounded-tr-lg border-l border-[#D9D9D9] px-6 py-3 text-center text-black">اسم الاختبار</TH>
                  <TH className="bg-accent-1000 border-l border-[#D9D9D9] px-6 py-3 text-center text-black">نوع الاختبار</TH>
                  <TH className="bg-accent-1000 rounded-tl-lg px-6 py-3 text-center text-black">التاريخ</TH>
                </TR>
              </THead>
              <TBody className="max-h-[500px] overflow-y-scroll px-2">
                {tests?.length > 0 ? (
                  tests?.map((test) => (
                    <TR key={test.title} className="group mb-1 cursor-pointer">
                      <TD className="flex gap-4 rounded-br-xl rounded-tr-xl border-l bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">
                        <button
                          onClick={() => {
                            setTestToEdit(test);
                            setShowEditModal(true);
                          }}
                        >
                          <EditIcon className="h-5" />
                        </button>
                        <span
                          onClick={() => {
                            setCurrentTest(test);
                            setShowDataModal(true);
                          }}
                        >
                          {test.title}
                        </span>
                        <button className="mr-auto" onClick={() => setTests(tests.filter((item) => item.title !== test.title))}>
                          <TrashIcon className="h-5" />
                        </button>
                      </TD>
                      <TD className="border-l bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{test.type}</TD>
                      <TD className="rounded-bl-xl rounded-tl-xl bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{test.date}</TD>
                    </TR>
                  ))
                ) : (
                  <p> لا يوجد اختبارت </p>
                )}
              </TBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

export default Tests;
