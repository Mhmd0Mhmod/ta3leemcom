import { useSearchParams } from 'react-router-dom';
import Heading from '../../UI-Global/Heading.jsx';

import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import Plus from '../../../public/Icons/plus.svg';
import CalendarIcon from '../../../public/Icons/calender.svg';
import Arrow from '../../../public/Icons/breadcrumb_arrow.svg';
import ArrowFilled from '../../../public/Icons/arrow_list_icon.svg';
import { cn } from '@/lib/utils.js';
import { format, isAfter, isBefore, isToday, isYesterday, isThisWeek } from 'date-fns';
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
import toast from 'react-hot-toast';
import { DeleteConfirmation } from '@/components/DeleteConfirmation';

function Tests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addTestUl, setAddTestUl] = useState(false);
  const [filterByDateUl, setFilterByDateUl] = useState(false);
  const [filterByDateType, setFilterByDateType] = useState('');
  const [filterByTestTypeUl, setFilterByTestTypeUl] = useState(false);
  const [filterByTestType, setFilterByTestType] = useState('');
  const [TESTS, setTESTS] = useState(null);
  const [tests, setTests] = useState(null);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [TestToEdit, setTestToEdit] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const authHeader = useAuthHeader();

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

  const deleteTest = async () => {
    const testId = currentTest.id;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Quiz/DeleteQuiz?id=${testId}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      if (res.status === 200) {
        setTESTS((prev) => prev.filter((item) => item.id !== testId));
        setTests((prev) => prev.filter((item) => item.id !== testId));
        toast.success('تم حذف الاختبار');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/Quiz/GetAllQuizsByGroupsIds?${searchParams
          .get('group')
          ?.split('_')
          .map((i) => `GroupsIds=${i}`)
          .join('&')}`,
        {
          headers: { Authorization: authHeader },
        },
      );
      if (res.status === 200) {
        setTESTS(res.data);
        setTests(res.data);
      } else setTests([]);
    };
    fetchTests();
  }, [authHeader, searchParams]);
  // console.log(authHeader);
  useEffect(() => {
    if (dateFrom && dateTo && TESTS) {
      setTests(TESTS?.filter((test) => isAfter(test.startDate, dateFrom) && isBefore(test.startDate, dateTo)));
    }
  }, [dateFrom, dateTo]);

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
                      setTests(TESTS.filter((test) => isToday(test.startDate)));
                      setFilterByDateType('اليوم');
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
                      setTests(TESTS.filter((test) => isYesterday(test.startDate)));
                      setFilterByDateUl(false);
                      setFilterByDateType('امس');
                    }}
                    className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
                  >
                    امس
                  </button>
                  <button
                    disabled={!filterByDateUl}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTests(TESTS.filter((test) => isThisWeek(test.startDate)));
                      setFilterByDateType('اسبوع');
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
                      setFilterByDateUl(false);
                      setFilterByDateType('');
                      setTests(TESTS);
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
                    <TR key={test.id} className="group mb-1 cursor-pointer">
                      <DeleteConfirmation open={showDelete} setOpen={setShowDelete} onDelete={deleteTest} />

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
                        <button
                          className="mr-auto"
                          onClick={() => {
                            setCurrentTest(test);
                            setShowDelete(true);
                          }}
                        >
                          <TrashIcon className="h-5" />
                        </button>
                      </TD>
                      <TD className="border-l bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{test.type}</TD>
                      <TD className="rounded-bl-xl rounded-tl-xl bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{new Date(test.startDate).toLocaleDateString()}</TD>
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
