import Heading from '@/UI-Global/Heading.jsx';
import HeadIcon from '../../../../../../public/Icons/head-icon-student.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import Question from '../../../../../../public/Icons/question_icon.svg';
import Bouns from '../../../../../../public/Icons/bouns_icon.svg';
import Point from '../../../../../../public/Icons/flag_icon.svg';
import Search from '../../../../../../public/Icons/search_icon.svg';
import RemoveSearched from '../../../../../../public/Icons/removeSeach.svg';
import Table from '@/UI-Global/Table/Table.jsx';
import THead from '@/UI-Global/Table/THead.jsx';
import TR from '@/UI-Global/Table/TR.jsx';
import TH from '@/UI-Global/Table/TH.jsx';
import Sort from '../../../../../../public/Icons/sort.svg';
import TD from '@/UI-Global/Table/TD.jsx';
import TBody from '@/UI-Global/Table/TBody.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { getTests } from '@/Context/StudentDashboard/helpers';
import toast from 'react-hot-toast';
import { Spinner } from '@/UI-Global/Spinner';
import { durationToArabic, parseISODateString, parseISOTimeString } from '@/lib/time';
import { useNavigate } from 'react-router-dom';

function StudentTest() {
  const student = useAuthUser();
  const [loading, setLoading] = useState(false);
  const [endedTests, setEndedTests] = useState([]);
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const nav = useNavigate();

  const handelStartQuiz = (test) => {
    if (test.quizStatus === 'Started' && !test.studentQuizId && !test.isAttend && new Date(test.endDate) > new Date(Date.now())) nav(`/dashboard/tests/${test.quizId}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getTests(student.studentId)
      .then((data) => {
        setTests(data.filter((test) => test.quizStatus !== 'Ended' && test.quizStatus !== 'Solved' && test.quizStatus));
        setEndedTests(data.filter((test) => test.quizStatus === 'Ended' || test.quizStatus === 'Solved'));
      })
      .catch((err) => toast.error('حدث خطأ ما'))
      .finally(() => setLoading(false));
  }, [student.studentId]);
  if (loading) return <Spinner />;
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
          <div key={test.quizId} className={'flex items-center gap-4'}>
            <span className={'text-l font-almaria-bold'}>{idx + 1}.</span>
            <div className={'grid w-[90%] grid-cols-2 justify-between rounded bg-white px-5 py-10'}>
              <div className={'flex w-[70%] flex-col justify-between'}>
                <div className={'flex items-center justify-between'}>
                  <span className={'font-almaria-bold text-xl'}>{test?.title}</span>
                  {/* <span>
                    <div>quizId : {test.quizId}</div>
                    <div>studentQuizId : {String(test.studentQuizId)}</div>
                    <div>startDate : {test.startDate}</div>
                    <div>endDate : {test.endDate}</div>
                    <div>isAttend : {String(test.isAttend)}</div>
                    <div>quizStatus : {test.quizStatus}</div>
                    <div>solveStatus : {test.solveStatus}</div>
                  </span> */}
                  {test.quizStatus === 'Started' && (
                    <Button onClick={() => handelStartQuiz(test)} className={'bg-[#0884A2] hover:bg-[#0884A2]'}>
                      بدا الاختبار
                    </Button>
                  )}
                  {test.quizStatus.trim() === 'Not Started' && (
                    <Button disabled className={'bg-[#B2B2B2] hover:bg-[#B2B2B2]'}>
                      لم يبدأ بعد
                    </Button>
                  )}
                </div>
                <div className={'flex justify-between'}>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Question />
                    <span>{test.mandatoryQuestionCount}</span>
                    <span>سؤال</span>
                  </div>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Bouns />
                    {test.optionalQuestionCount ? (
                      <>
                        <span>{test.optionalQuestionCount}</span>
                        <span>بونص</span>
                      </>
                    ) : (
                      <span>لا يوجد بونص</span>
                    )}
                  </div>
                  <div className={'flex gap-2 text-[#878787]'}>
                    <Point />
                    <span>{test.totalMark}</span>
                    <span>درجة</span>
                  </div>
                </div>
              </div>
              <div className={'mr-auto flex flex-col gap-2 font-almaria-bold'}>
                <div className={'flex w-full items-center gap-10'}>
                  <span>تاريخ الاختبار</span>
                  <span className={'flex-grow items-center rounded bg-[#EFEFEF] px-4 py-2'}>{parseISODateString(test.startDate)}</span>
                </div>
                <div className={'flex w-full items-center gap-10'}>
                  <span>وقت الاخبار</span>
                  <span className={'ltr flex-grow items-center rounded bg-[#EFEFEF] px-4 py-2 text-right'}>{parseISOTimeString(test.startDate)}</span>
                </div>
                <div className={'flex w-full items-center gap-10'}>
                  <span>مدة الاختبار</span>
                  <span className={'flex-grow items-center rounded bg-[#EFEFEF] px-4 py-2'}>{durationToArabic(test.duration)}</span>
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
            الاختبارات المنتهية
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
                <TH>حاله الاختبار</TH>
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
              {endedTests?.map((test, idx) => (
                <TR key={test.quizId} className="mb-1 rounded bg-white">
                  <TD className="flex items-center justify-between">
                    <span>
                      <span>{idx + 1}.</span>
                      {test.title}
                    </span>
                    <Button className={'h-fit bg-[#0884A2] px-[10px] py-[5px] hover:bg-[#0884A2]'} onClick={() => nav(`/dashboard/tests/training-attempt/${test.quizId}`)}>
                      محاولة تدربية
                    </Button>
                  </TD>
                  <TD>
                    {test.solveStatus === 'Solved Late' && 'حل متأخر '}
                    {test.solveStatus === 'Not Solved' && 'لم يبم الحل  '}
                    {test.solveStatus === 'Solved' && 'حل في الموعد '}
                  </TD>
                  <TD>
                    {test.solveStatus !== 'Not Solved' ? (
                      <>
                        <span> {test.totalMark}</span>
                        <span className="font-almaria-bold"> / {test.studentMark} </span>
                      </>
                    ) : (
                      'لم يتم الحل'
                    )}
                  </TD>
                  <TD>اونلاين</TD>
                  <TD>{parseISODateString(test.startDate)}</TD>
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
