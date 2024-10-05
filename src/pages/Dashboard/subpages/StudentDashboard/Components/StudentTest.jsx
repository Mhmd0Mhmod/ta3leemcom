import Heading from '@/UI-Global/Heading.jsx';
import HeadIcon from '../../../../../../public/Icons/head-icon-student.svg';
import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import Question from '../../../../../../public/Icons/question_icon.svg';
import Bouns from '../../../../../../public/Icons/bouns_icon.svg';
import Point from '../../../../../../public/Icons/flag_icon.svg';
import Search from '../../../../../../public/Icons/search_icon.svg';
import RemoveSearched from '../../../../../../public/Icons/removeSeach.svg';
import Table from '@/UI-Global/Table/Table.jsx';
import { ShowTest } from '../../../../../Features/test/ShowTest.jsx';
import THead from '@/UI-Global/Table/THead.jsx';
import TR from '@/UI-Global/Table/TR.jsx';
import TH from '@/UI-Global/Table/TH.jsx';
import Sort from '../../../../../../public/Icons/sort.svg';
import TD from '@/UI-Global/Table/TD.jsx';
import TBody from '@/UI-Global/Table/TBody.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function StudentTest() {
  console.log(useAuthUser());
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={`student__tests`}>
      <div className={'flex items-center'}>
        <Heading as={'h3'} className={'font-almaria-bold'}>
          الاختبارات الحالية{' '}
        </Heading>
        <HeadIcon />
      </div>
      <div className={'mr-10 mt-10 flex max-h-[30rem] flex-col gap-16 overflow-y-auto'}>
        {tests.map((test, idx) => (
          <div key={test.id} className={'flex items-center gap-4'}>
            <span className={'text-l font-almaria-bold'}>{idx + 1}.</span>
            <div className={'grid w-[90%] grid-cols-2 justify-between rounded bg-white px-5 py-10'}>
              <div className={'flex w-[70%] flex-col justify-between'}>
                <div className={'flex items-center justify-between'}>
                  <span className={'font-almaria-bold text-xl'}>{test.name}</span>
                  <Button className={'bg-[#0884A2] hover:bg-[#0884A2]'}>بدا الاختبار</Button>
                </div>
                <div className={'flex justify-between'}>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Question />
                    <span>{1}</span>
                    <span>سؤال</span>
                  </div>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Bouns />
                    <span>{1}</span>
                    <span>بونص</span>
                  </div>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Point />
                    <span>{1}</span>
                    <span>درجة</span>
                  </div>
                </div>
              </div>
              <div className={'mr-auto flex flex-col gap-2 font-almaria-bold'}>
                <div className={'flex items-center gap-10'}>
                  <span>تاريخ الاختبار</span>
                  <span className={'rounded bg-[#EFEFEF] px-4 py-2'}>{test.date}</span>
                </div>
                <div className={'flex items-center gap-10'}>
                  <span>وقت الاخبار</span>
                  <span className={'rounded bg-[#EFEFEF] px-4 py-2'}>{test.date}</span>
                </div>
                <div className={'flex items-center gap-10'}>
                  <span>مدة الاختبار</span>
                  <span className={'rounded bg-[#EFEFEF] px-4 py-2'}>{test.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className={'my-8 w-11/12'} />
      <div>
        <div className={'mb-8 flex items-center'}>
          <Heading as={'h3'} className={'font-almaria-bold'}>
            الاختبارات المنتهية{' '}
          </Heading>
          <HeadIcon />
        </div>
        <div>
          <div className="flex w-[30rem] gap-5 rounded-lg border-2 bg-white p-3">
            <Search />
            <input type="text" placeholder="اسم الاختبار" className="w-full" value={search} onChange={handleSearch} />
            {search && <RemoveSearched />}
          </div>
          <Table className="mt-4">
            <THead className="my-2">
              <TR className="rounded bg-[#D9D9D9]">
                <TH>اسم الاختبار</TH>
                <TH>الدرجة</TH>
                <TH>
                  <span>نوع الاختبار</span>
                  <Sort />
                </TH>
                <TH>
                  <span>التاريخ</span>
                  <Sort />
                </TH>
              </TR>
            </THead>
            <TBody className="max-h-64 overflow-y-auto">
              {tests.map((test, idx) => (
                <TR key={test.id} className="mb-1 rounded bg-white">
                  <TD className="flex items-center justify-between">
                    <span>
                      <span>{idx + 1}.</span>
                      {test.name}
                    </span>
                    <Button className={'h-fit bg-[#0884A2] px-[10px] py-[5px] hover:bg-[#0884A2]'}>محاولة تدربية</Button>
                  </TD>
                  <TD>
                    <span className="font-almaria-bold"> 10 </span>/ 10
                  </TD>
                  <TD>اونلاين</TD>
                  <TD>2023-10-01</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StudentTest;
