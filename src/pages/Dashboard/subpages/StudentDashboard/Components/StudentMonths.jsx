import Heading from '@/UI-Global/Heading.jsx';
import HeadIcon from '../../../../../../public/Icons/head-icon-student.svg';
import BgIcon from '../../../../../../public/Icons/flow-months-student-bg.svg';
import Paid from '../../../../../../public/Icons/paied.svg';
import NotPaid from '../../../../../../public/Icons/notpaidMonth.svg';
import Done from '../../../../../../public/Icons/done.svg';
import False from '../../../../../../public/Icons/false.svg';
import HeadMonthsStudent from '@/pages/Dashboard/subpages/StudentDashboard/Components/HeadMonthsStudent.jsx';
import DropList from '@/UI-Global/DropList.jsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useStudent } from '@/Context/StudentDashboard/StudentProvider';
import { parseISODateString } from '@/lib/time';

function StudentMonths() {
  const [value, setValue] = useState('');
  const [showMore, setShowMore] = useState(false);
  const { studentAttendance: attendance } = useStudent();

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <BgIcon className={'absolute left-[10%] top-[15%]'} />
      <div className={'flex justify-center gap-12'}>
        <Heading as={'h3'} className={'text-center font-almaria-bold'}>
          متابعة الشهر الدراسي
        </Heading>
        <HeadIcon />
      </div>
      <div className={'mt-20 flex flex-col justify-between gap-16'}>
        <div>
          <HeadMonthsStudent title={'اختر الشهر'} />
          <div className={'mr-10'}>
            <DropList title={'اختر الشهر'} options={attendance.map((el) => `${el.monthName}  ${el.year}`)} value={value} setValue={setValue} optionsValue={attendance}>
              <span className={'text-[#666666]'}> الشهر</span>
              <span className={'h-full w-[2px] bg-[#D9D9D9]'}></span>
            </DropList>
          </div>
        </div>
        {value && (
          <>
            <div>
              <HeadMonthsStudent title={'دفع الشهر'} />
              <div className={'mr-10 flex w-2/5 items-center justify-center gap-10 rounded-[7px] bg-white py-4'}>
                {value.paied ? (
                  <>
                    <Paid />
                    <span className={'font-almaria-bold text-[18px]'}>الشهر مدفوع</span>
                  </>
                ) : (
                  <>
                    <NotPaid />
                    <span className={'font-almaria-bold text-[18px]'}>الشهر غير مدفوع</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className={'flex w-1/6 items-center justify-between'}>
                <HeadMonthsStudent title={'الحصص'} />
                {value.days.length ? (
                  <Button className={'bg-transparent p-0 font-almaria-bold text-[#0884A2] hover:bg-transparent'} onClick={handleShowMore}>
                    {showMore ? 'عرض اخر حصه فقط' : 'عرض المزيد'}
                  </Button>
                ) : null}
              </div>

              {showMore ? (
                <div className={'flex gap-40'}>
                  <span className={'self-end font-almaria-bold text-xl'}>الحضور</span>
                  <div className={'flex max-w-7xl overflow-x-auto rounded bg-white p-3'}>
                    {value.days?.map((item, index) => (
                      <div key={index} className={'flex h-24 min-w-24 flex-col items-center justify-between rounded border-[#D9D9D9] py-2 hover:bg-[#E4E8E9]'}>
                        <span className={'font-almaria-bold'}>{parseISODateString(item.date)}</span>
                        <span>{item.attended ? <Done /> : <False width={42} height={42} />}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={'mr-10 flex w-1/4 items-center gap-2'}>
                  {value.days.length ? (
                    <>
                      <div className={'ml-4 flex-1 rounded-[7px] bg-white py-4 text-center'}>{parseISODateString(value?.days.at(-1).date)}</div>
                      {value?.days.at(-1).attended ? (
                        <>
                          <Done />
                          <span className={'font-almaria-bold text-[18px]'}>تم الحضور</span>
                        </>
                      ) : (
                        <>
                          <False />
                          <span className={'font-almaria-bold text-[18px]'}>لم يتم الحضور</span>
                        </>
                      )}
                    </>
                  ) : (
                    <span className={'font-almaria-bold text-2xl'}>لا يوجد حصص</span>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default StudentMonths;
