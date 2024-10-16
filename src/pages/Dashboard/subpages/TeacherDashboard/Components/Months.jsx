import HeadingLevelsPages from '../../../../../UI-Global/HeadingLevelsPages.jsx';
import AddMonthsButton from '../../../../../Features/months/AddMonthsButton.jsx';
import DropList from '../../../../../UI-Global/DropList.jsx';
import Trash from '/public/Icons/trash_icon.svg';
import { MonthsInArabic } from '../../../../../config.js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '/public/Icons/search_icon.svg';
import Heading from '../../../../../UI-Global/Heading.jsx';
import Paid from '../../../../../../public/Icons/paiddone.svg';
import NotPaid from '../../../../../../public/Icons/notPaid.svg';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table.jsx';
import StudentNotPaid from '../../../../../../public/Icons/notPaidCircle.svg';
import StudentPaid from '../../../../../../public/Icons/paidCircle.svg';
import { useTeacherDashboard } from '@/Context/TeacherDashboard/TeacherProvider.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import Plus from '/public/imgs/plus.svg';
import { Calendar } from '@/components/ui/calendar.jsx';
import Alert from '@/Features/student/Alert.jsx';
import RemoveGroupAlert from './RemoveGroupAlert.jsx';

function Months() {
  const [searchParams] = useSearchParams();
  const [studentSearch, setStudentSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [isMonthListOpen, setIsMonthListOpen] = useState(false);
  const [months, setMonths] = useState([]);
  const [allMonths, setAllMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [monthData, setMonthData] = useState();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dayDate, setDayDate] = useState();
  const [alertData, setAlertData] = useState({});
  const [daysData, setDaysData] = useState([]);
  const [absencesData, setAbsencesData] = useState([]);
  const [isMonthPayChanged, setIsMonthPayChanged] = useState(false);

  const { groupsOfSelectedlevel, selectYearIdFunc } = useTeacherDashboard();
  const groupsIds = searchParams.get('group')?.split('_').map(Number) || [];
  const currentGroups = groupsOfSelectedlevel.filter((group) => groupsIds.includes(group.groupId)) || [];
  const studentPaidCount = monthData?.monthStudents?.filter((student) => student.pay).length;
  const calendarMonth = MonthsInArabic.indexOf(months.find((el) => el.monthId === selectedMonth)?.monthName);
  const calendarYear = months.find((el) => el.monthId === selectedMonth)?.year;

  const [selectedGroup, setSelectedGroup] = useState(groupsIds[0]);

  useEffect(() => {
    if (groupsOfSelectedlevel.length === 0) {
      selectYearIdFunc(searchParams.get('subLevel'));
    }
    getMonths();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      getMonthData();
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedGroup) {
      setMonths(allMonths.filter((month) => month.groupId === selectedGroup));
      setSelectedMonth(null);
      setMonthData([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (studentSearch && monthData) {
      setStudents(monthData?.monthStudents?.filter((student) => student?.studentName.includes(studentSearch)));
    } else {
      setStudents(monthData?.monthStudents);
    }
  }, [studentSearch, monthData]);

  useEffect(() => {
    if (monthData) {
      setDaysData(monthData.days);
    }
  }, [monthData]);

  useEffect(() => {
    if (monthData) {
      const result = monthData.monthStudents?.some((std, idx) => std.pay !== students[idx].pay);
      setIsMonthPayChanged(result);
    }
  }, [students]);

  async function getMonths() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Month/GetAllMonthsOfGroups?ids=${groupsIds.join('&ids=')}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('_auth')}`,
        'Content-Type': 'application/json',
      },
    });
    const uniqueMonths = data.filter((month) => month.groupId === selectedGroup);
    setMonths(uniqueMonths);
    setSelectedMonth(uniqueMonths[uniqueMonths.length - 1].monthId);
    setAllMonths(data);
  }

  async function getMonthData() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Month/GetMonthData?monthId=${selectedMonth}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('_auth')}`,
        'Content-Type': 'application/json',
      },
    });
    setMonthData(data);
    setStudents(data.monthStudents);
    setDaysData(data.days);
  }

  const addDay = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/Day`,
        {
          date: dayDate,
          monthId: selectedMonth,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('_auth')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setMonthData((prev) => ({ ...prev, days: [...prev.days, data] }));
      setAlertData({
        title: 'تم اضافه اليوم بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } catch (error) {
      let message;
      if (error.response.data === 'You try to repeat day') {
        message = 'لقد تم اضافه هذا اليوم من قبل';
      }
      setAlertData({
        title: message || 'حدث خطأ ما',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } finally {
      setDayDate('');
      setOpenCalendar(false);
      setDate(new Date());
    }
  };

  const deleteDay = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Day?dayId=${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('_auth')}`,
          'Content-Type': 'application/json',
        },
      });
      setMonthData((prev) => ({ ...prev, days: prev.days.filter((day) => day.id !== id) }));
      setAlertData({
        title: ' تم حذف اليوم بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ ما',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    }
  };

  const deleteMonth = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Month?id=${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('_auth')}`,
          'Content-Type': 'application/json',
        },
      });
      setMonths((prev) => prev.filter((month) => month.monthId !== id));
      if (selectedMonth === id) {
        setSelectedMonth(null);
        setMonthData([]);
        setOpenCalendar(false);
      }
      setAlertData({
        title: ' تم حذف الشهر بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ ما',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    }
  };

  const toggleStudentPay = async (data) => {
    setStudents((prev) =>
      prev.map((student) => {
        return student.studentId === data.studentId ? { ...data, pay: !data.pay } : student;
      }),
    );
  };

  const toggleStudentAbsence = async (data, index) => {
    let studentIndex = absencesData?.findIndex((el) => el.dayId === data.dayId && el.studentId === data.studentId);
    if (studentIndex == -1) {
      setAbsencesData((prev) => [...prev, { ...data, attended: !data.attended }]);
    } else {
      absencesData.splice(studentIndex, 1);
    }

    const absences = daysData[index].studentAbsences;
    const newAbsences = absences.map((absence) => (absence.studentId === data.studentId ? { ...data, attended: !data.attended } : absence));
    setDaysData((prev) => prev.map((day) => (day.id === data.dayId ? { ...day, studentAbsences: newAbsences } : day)));
  };

  const saveChanges = async () => {
    const bodyData = {
      absenceStudents: absencesData,
      monthStudents: students,
    };
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/Month/SaveChanges`, bodyData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('_auth')}`,
          'Content-Type': 'application/json',
        },
      });
      getMonthData();
      setAbsencesData([]);
      setIsMonthPayChanged(false);
      setAlertData({
        title: 'تم حفظ التعديلات بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ ما',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    }
  };

  const clearChanges = () => {
    setStudents(monthData.monthStudents);
    setDaysData(monthData.days);
    setAbsencesData([]);
    setIsMonthPayChanged(false);
  };

  return (
    <div className="Months flex flex-col gap-6">
      <HeadingLevelsPages title="الاشهر" />
      <div className="flex items-center gap-40">
        <AddMonthsButton existMonths={months} selectedGroup={selectedGroup} setMonthsUpdate={setMonths} setAlertData={setAlertData} />
        <div className="flex gap-6">
          <DropList
            title="اختر الشهر"
            setValue={setSelectedMonth}
            value={selectedMonth}
            options={months.map((el) => `${el.monthName} - ${el.year}`)}
            optionsValue={months.map((month) => month.monthId)}
            optionsWithJSX={months.map((month) => (
              <div key={month.monthId} className="flex items-center justify-between gap-2 border-b hover:bg-blue-200">
                <div
                  className="flex flex-1 cursor-pointer justify-between px-3 py-2"
                  onClick={() => {
                    setSelectedMonth(month.monthId);
                    setIsMonthListOpen(false);
                  }}
                >
                  <span>{month.monthName}</span>
                  <span>{month.year}</span>
                </div>
                <RemoveGroupAlert title="تأكيد حذف الشهر" description={`ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بشهر "${month.monthName + ' ' + month.year}" نهائيًا. هل أنت متأكد؟`} handleDelete={() => deleteMonth(month.monthId)}>
                  <Trash className="m-1 mr-auto cursor-pointer duration-300 hover:scale-125" />
                </RemoveGroupAlert>
              </div>
            ))}
            open={isMonthListOpen}
            setOpen={setIsMonthListOpen}
            classNameButton="flex flex-row-reverse justify-around"
            classNameItem={'flex gap-5'}
            classNameUl={'max-h-[190px]  overflow-auto'}
          />
          <DropList
            title={'اختر المجموعه'}
            options={currentGroups.map((el) => el.groupName)}
            value={selectedGroup}
            setValue={setSelectedGroup}
            optionsValue={currentGroups.map((el) => el.groupId)}
            classNameButton="flex flex-row-reverse justify-around"
            classNameItem={'flex gap-5'}
            classNameUl={'max-h-[190px] overflow-auto'}
          />
        </div>
        <div className="mr-auto flex flex-col gap-4 text-lg">
          <div className="flex gap-4 rounded-lg bg-[#B4D3E0] px-6 py-4">
            <Paid />
            <span>
              <span className="font-almaria-bold">تم</span> الدفع :
            </span>
            <span className="font-almaria-bold">{studentPaidCount ?? '0'}</span>
          </div>
          <div className="flex gap-4 rounded-lg bg-[#B4D3E0] px-6 py-4">
            <NotPaid />
            <span>
              <span className="font-almaria-bold">لم</span> يتم الدفع :
            </span>
            <span className="font-almaria-bold">{monthData?.monthStudents ? monthData.monthStudents?.length - studentPaidCount : '0'}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-x-20 gap-y-10">
        <div className="mt-8">
          <div className="flex w-[30rem] gap-5 rounded-lg border-2 bg-white p-3">
            <Search />
            <input type="search" placeholder="اسم الطالب" className="w-full" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
          </div>
        </div>
        <Heading as={'h2'} className="mt-8 text-center font-almaria-bold">
          الحصص
        </Heading>
        <div className={'relative col-span-2 flex max-h-[50lvh]'}>
          {openCalendar && (
            <div className="top-30px absolute left-[95px] top-[45px] z-10 rounded-md bg-white p-6 shadow-2xl">
              <Calendar
                className="sticky top-0 rounded-md border bg-white"
                classNames={{ day_selected: 'bg-[#0884A2] text-white' }}
                mode="single"
                onSelect={setDate}
                showOutsideDays={false}
                selected={date}
                month={new Date(calendarYear, calendarMonth)}
                onMonthChange={() => {}}
                onDayClick={(day) => {
                  if (dayDate && new Date(dayDate).toDateString() === day.toDateString()) {
                    setDayDate('');
                    return;
                  }
                  let utcDate = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
                  setDayDate(utcDate.toISOString());
                }}
              />
              <div className="mt-3 flex items-center justify-between gap-2">
                <button className="w-full rounded-md border bg-white p-3" onClick={() => setOpenCalendar(false)}>
                  إلغاء
                </button>
                <button className="w-full rounded-md bg-[#0884A2] p-3 text-white disabled:cursor-no-drop disabled:opacity-60" onClick={addDay} disabled={!dayDate || !selectedMonth}>
                  إضافة
                </button>
              </div>
            </div>
          )}
          <Table className={'relative grid min-h-[450px] grid-cols-[1fr_2fr_auto] items-start gap-10 overflow-y-auto'}>
            <div className="absolute left-[93px] z-10">
              <button onClick={() => setOpenCalendar((prev) => !prev)} className="w-fit rounded-full p-0 text-3xl text-white disabled:cursor-no-drop" disabled={!selectedMonth}>
                <Plus className="rounded-full fill-white text-white" />
              </button>
            </div>
            <div className={'mt-5'}>
              <TableHeader className="block">
                <TableRow className="block rounded-2xl border-b-[#f3f4f6] hover:bg-[#A8A8A833]">
                  <th className={'w-full !text-start'}>اسم الطالب</th>
                  <th className={''}>الدفع</th>
                </TableRow>
              </TableHeader>
              <TableBody className="block">
                {students?.map((student, idx) => {
                  return (
                    <TableRow key={student.studentId} className="block border-b-[#f3f4f6] bg-white">
                      <TableCell className="!w-full whitespace-nowrap">
                        {idx + 1} . {student.studentName}
                      </TableCell>
                      <TableCell className="cursor-pointer" onClick={() => toggleStudentPay(student)}>
                        {student.pay ? <StudentPaid className="m-auto" /> : <StudentNotPaid className="m-auto" />}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </div>
            <div className={'rotateX-180 overflow-x-scroll'}>
              <div className={'rotateX-180'}>
                {daysData?.length > 0 && (
                  <>
                    <TableHeader className={'sticky top-0'}>
                      <th></th>
                      {daysData
                        ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((day, idx) => {
                          const dateOfDay = new Date(day.date).toLocaleDateString(['en-GB'], {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          });
                          return (
                            <th key={day.id} className={''}>
                              <div className="flex justify-center gap-4">
                                <span className="whitespace-nowrap">{dateOfDay}</span>
                                <RemoveGroupAlert title="تأكيد حذف اليوم" description={`ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بيوم "${dateOfDay}" نهائيًا. هل أنت متأكد؟`} handleDelete={() => deleteDay(day.id)}>
                                  <Trash className="cursor-pointer duration-300 hover:scale-125" />
                                </RemoveGroupAlert>
                              </div>
                            </th>
                          );
                        })}
                    </TableHeader>
                    <TableBody>
                      {students?.map((month, idx) => {
                        let allDaysForStudent = daysData?.map((day) => {
                          return day.studentAbsences.find((student) => student.studentId === month.studentId);
                        });

                        return (
                          <TableRow key={idx} className="rounded-2xl bg-white">
                            <TableCell className="sticky right-0 whitespace-nowrap bg-[#e7e6e6]">{idx + 1} .</TableCell>
                            {allDaysForStudent?.map((day, i) => (
                              <TableCell key={day.dayId}>{day.attended ? <StudentPaid className="m-auto cursor-pointer" onClick={() => toggleStudentAbsence(day, i)} /> : <StudentNotPaid className="m-auto cursor-pointer" onClick={() => toggleStudentAbsence(day, i)} />}</TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </>
                )}
              </div>
            </div>

            <div className={'mt-5'}>
              <TableHeader>
                <TableRow className="border-b-[#f3f4f6]">
                  <th className={''}> اجمالي : {monthData?.days?.length}</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((month, idx) => {
                  let allDaysForStudent = monthData?.days?.map((day) => day.studentAbsences.find((student) => student.studentId === month.studentId));
                  let totalAttends = allDaysForStudent?.filter((day) => day.attended).length;

                  return (
                    <TableRow key={idx} className="bg-[#0884A2] text-center text-xl text-white hover:bg-[#0884A2]">
                      <TableCell>
                        <p className="m-auto min-h-[31px] bg-[#0884A2] hover:bg-[#0884A2]">{totalAttends}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </div>
          </Table>
        </div>
        <Alert {...alertData} />
      </div>
      <div className={'relative mr-[-35px] mt-3 flex min-h-[56px] max-w-[95%] items-center justify-end gap-5'}>
        {(absencesData.length > 0 || isMonthPayChanged) && (
          <>
            <button className="rounded-lg border-2 bg-white px-6 py-4 text-black" onClick={clearChanges}>
              الغاء
            </button>
            <button className="rounded-lg bg-[#0884A2] px-6 py-4 text-white disabled:cursor-no-drop disabled:opacity-60" onClick={saveChanges}>
              حفظ
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Months;
