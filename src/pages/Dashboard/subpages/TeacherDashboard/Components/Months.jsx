import HeadingLevelsPages from '../../../../../UI-Global/HeadingLevelsPages.jsx';
import AddMonthsButton from '../../../../../Features/months/AddMonthsButton.jsx';
import DropList from '../../../../../UI-Global/DropList.jsx';
import Trash from '/public/Icons/trash_icon.svg';
import { AllStudent, FakeGroups, MonthsInArabic } from '../../../../../config.js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '/public/Icons/search_icon.svg';
import RemoveSearched from '/public/Icons/removeSeach.svg';
import Heading from '../../../../../UI-Global/Heading.jsx';
import Paid from '../../../../../../public/Icons/paiddone.svg';
import NotPaid from '../../../../../../public/Icons/notPaid.svg';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import StudentNotPaid from '../../../../../../public/Icons/notPaidCircle.svg';
import StudentPaid from '../../../../../../public/Icons/paidCircle.svg';

function Months() {
  const months = MonthsInArabic;
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const currentYear = new Date().getFullYear();
  const [searchParams] = useSearchParams();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const groups = searchParams.get('group')?.split('_') || [];
  const [studentSearch, setStudentSearch] = useState('');
  const [students, setStudents] = useState(AllStudent);

  useEffect(() => {
    if (selectedGroup) {
      setStudents(FakeGroups.find((group) => group.id === selectedGroup).students);
    } else {
      setStudents(AllStudent);
    }
  }, [selectedGroup]);
  useEffect(() => {
    if (studentSearch) {
      setStudents(AllStudent.filter((student) => student?.name.includes(studentSearch)));
    } else {
      setStudents(AllStudent);
    }
  }, [studentSearch]);

  function handleStudentSearch(e) {
    setStudentSearch(e.target.value);
  }

  return (
    <div className="Months flex flex-col gap-6">
      <HeadingLevelsPages title="الاشهر" />
      <div className="flex items-center gap-40">
        <AddMonthsButton />
        <div className="flex gap-6">
          <DropList
            title="اختر الشهر"
            setValue={setSelectedMonth}
            options={months.map((el) => `${el} - ${currentYear}`)}
            optionsWithJSX={months.map((month) => (
              <>
                <span>{month}</span>
                <span className={'mr-auto'}>{currentYear}</span>
                <Trash />
              </>
            ))}
            optionsValue={months}
            classNameButton="flex flex-row-reverse justify-around"
            classNameItem={'flex gap-5'}
            classNameUl={'max-h-[190px]  overflow-auto'}
          />
          <DropList title={'اختر المجموعه'} options={groups} setValue={setSelectedGroup} optionsValue={groups} classNameButton="flex flex-row-reverse justify-around" classNameItem={'flex gap-5'} classNameUl={'max-h-[190px] overflow-auto'} />
        </div>
        <div className="mr-auto flex flex-col gap-4 text-lg">
          <div className="flex gap-4 rounded-lg bg-[#B4D3E0] px-6 py-4">
            <Paid />
            <span>
              <span className="font-almaria-bold">تم</span> الدفع :
            </span>
            <span className="font-almaria-bold">{70}</span>
          </div>
          <div className="flex gap-4 rounded-lg bg-[#B4D3E0] px-6 py-4">
            <NotPaid />
            <span>
              <span className="font-almaria-bold">لم</span> يتم الدفع :
            </span>
            <span className="font-almaria-bold">{12}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-x-20 gap-y-10">
        <div className="mt-8">
          <div className="flex w-[30rem] gap-5 rounded-lg border-2 bg-white p-3">
            <Search />
            <input type="text" placeholder="اسم الطالب" className="w-full" value={studentSearch} onChange={handleStudentSearch} />
            {studentSearch && <RemoveSearched />}
          </div>
        </div>
        <Heading as={'h2'} className="mt-8 text-center font-almaria-bold">
          الحصص
        </Heading>
        <div className={'relative col-span-2 flex max-h-[50lvh]'}>
          <Table className={'grid grid-cols-[1fr_2fr_auto] gap-10 overflow-y-auto'}>
            <div className={'mt-5'}>
              <TableHeader>
                <TableRow className="rounded-2xl border-b-[#f3f4f6] hover:bg-[#A8A8A833]">
                  <th className={''}>اسم الطالب</th>
                  <th className={''}>الدفع</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={student.id} className="border-b-[#f3f4f6] bg-white">
                    <TableCell className="whitespace-nowrap">
                      {idx + 1} . {student.name}
                    </TableCell>
                    <TableCell>{student.paid ? <StudentPaid className="m-auto" /> : <StudentNotPaid className="m-auto" />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
            <div className={'rotateX-180 overflow-x-scroll'}>
              <div className={'rotateX-180'}>
                <TableHeader className={'sticky top-0'}>
                  <th></th>
                  {Array.from({ length: 11 }).map((number, idx) => (
                    <th key={idx} className={''}>
                      <div className="flex justify-center gap-4">
                        <span className="whitespace-nowrap">الحصه {idx + 1}</span>
                        <Trash />
                      </div>
                    </th>
                  ))}
                </TableHeader>
                <TableBody>
                  {students.map((student, idx) => (
                    <TableRow key={idx} className="rounded-2xl bg-white">
                      <TableCell className="sticky right-0 whitespace-nowrap bg-[#e7e6e6]">{idx + 1} .</TableCell>
                      {Array.from({ length: 11 }).map((month, idx) => (
                        <TableCell key={idx}>{student.paid ? <StudentPaid className="m-auto" /> : <StudentNotPaid className="m-auto" />}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </div>
            </div>

            <div className={'mt-5'}>
              <TableHeader>
                <TableRow className="border-b-[#f3f4f6]">
                  <th className={''}> اجمالي : 12</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={student.id} className="bg-[#0884A2] text-center text-xl text-white hover:bg-[#0884A2]">
                    <TableCell>
                      <p className="hover:bg-[#0884A2 m-auto min-h-[31px] bg-[#0884A2]">10</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
          </Table>
        </div>
      </div>
      <div className={'flex max-w-[95%] items-center justify-end gap-5'}>
        <button className="rounded-lg border-2 bg-white px-6 py-4 text-black">الغاء</button>
        <button className="rounded-lg bg-[#0884A2] px-6 py-4 text-white">حفظ</button>
      </div>
    </div>
  );
}

export default Months;
