import Graduted from '../../../../../public/Icons/graduted.svg';
import Profile from '../../../../../public/Icons/blackProfile.svg';
import Group from '../../../../../public/Icons/group.svg';
import Meeting from '../../../../../public/Icons/meeting.svg';
import ThreeCirlce from '../../../../../public/Icons/threeCirlceDashboard.svg';
import Menu from '../../../../../public/Icons/menu.svg';
import ScrollTop from '../../../../../public/Icons/scroll_top_icon.svg';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Test from './Components/Test.jsx';
import Details from '../../../../UI-Global/Details.jsx';
import Students from './Components/Students.jsx';
import Months from './Components/Months.jsx';
import Toppers from '@/Features/toppers/ToppersGropus.jsx';
import AsideDashboard from '@/pages/Dashboard/Components/AsideDashboard.jsx';
import { Spinner } from '@/UI-Global/Spinner.jsx';
import { useTeacherDashboard } from '@/Context/TeacherDashboard/TeacherProvider';
// import AddStudent from '../../../../Features/student/AddStudent.jsx';
// import AddGroup from '../../../../Features/group/AddGroup.jsx';
// import Level from './Components/Level.jsx';

function TeacherDashboard() {
  const [opened, setOpened] = useState(true);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || null;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { mainLevels: MainLevels, loading } = useTeacherDashboard();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    document.getElementById('innerContent').scrollIntoView({ behavior: 'smooth' });
  };
  if (loading) return <Spinner />;
  return (
    <div className={'dashboard mb-4 flex gap-5 font-cairo'}>
      <div className={`rounded bg-gray-100 p-2.5 ${opened ? 'w-[320px]' : 'w-fit'} self-start`}>
        <div className={`flex ${opened ? 'justify-end' : 'justify-center'}`}>
          <Menu className={`w-9 ${opened ? '' : 'rotate-Y-180'} transition duration-100`} onClick={() => setOpened((open) => !open)} />
        </div>
        <AsideDashboard
          opened={opened}
          setOpened={setOpened}
          tabs={[
            { name: 'اضافة طالب', tab: 'addStudent', icon: Profile },
            { name: 'اضافة مجموعة', tab: 'addGroup', icon: Group },
            // {
            //   name: 'اضافة اختبار',
            //   tab: 'addTest',
            //   icon: TestIcon,
            //   Details: <Details route="addTest" className={'gap-[18px]'} summary={'اضافة اختبار'} Icon={TestIcon} opend={opened} listItems={[{ name: 'اونلاين' }, { name: 'اوفلاين' }]} tabName={['online', 'offline']} param={'test'} />,
            // },
            {
              name: 'المراحل الدراسية',
              tab: 'StudyLevels',
              icon: Graduted,
              Details: (
                <Details
                  route="level"
                  className={'gap-[18px]'}
                  summary={'المراحل الدراسية'}
                  Icon={Graduted}
                  opend={opened}
                  listItems={MainLevels.map((el) => {
                    return { ...el, name: `المرحلة ${el.name}ة` };
                  })}
                  tabName={MainLevels.map((level) => level.id)}
                  param={'level'}
                />
              ),
            },
            // { name: 'عقد اجتماع', tab: 'meeting', icon: Meeting },
          ]}
        />
      </div>
      <div className={'w-[1px] self-stretch bg-gray-100'}></div>
      <div className={'relative flex-grow self-stretch rounded bg-gray-100 p-10'}>
        <div id="innerContent" className={'absolute left-0 top-0 w-32'}>
          <ThreeCirlce />
        </div>
        {activeTab === 'test' && <Test />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'months' && <Months />}
        {activeTab === 'toppers' && <Toppers />}
        {activeTab === 'meeting' && <h1>عقد اجتماع</h1>}
        {!activeTab && <Outlet />}
        {showScrollTop && (
          <button onClick={scrollToTop} className="absolute bottom-12 left-12 transition-all duration-300 hover:-translate-y-1">
            <ScrollTop />
          </button>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
