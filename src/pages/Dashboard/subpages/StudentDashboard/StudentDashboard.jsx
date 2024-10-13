import AsideDashboard from '@/pages/Dashboard/Components/AsideDashboard.jsx';
import StudentTests from '../../../../../public/Icons/StudentTests.svg';
import StudentToppers from '../../../../../public/Icons/StudentToppers.svg';
import Money from '../../../../../public/Icons/StudentMonths.svg';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../../../../../public/Icons/menu.svg';

function StudentDashboard() {
  const [opened, setOpened] = useState(true);
  return (
    <div className={'dashboard mb-4 flex gap-5 font-almaria'}>
      <div className={`rounded bg-gray-100 p-2.5 ${opened ? 'w-[320px]' : 'w-fit'} self-start`}>
        <div className={`flex ${opened ? 'justify-end' : 'justify-center'}`}>
          <Menu className={`w-9 ${opened ? '' : 'rotate-Y-180'} transition duration-100`} onClick={() => setOpened((open) => !open)} />
        </div>
        <AsideDashboard
          opened={opened}
          tabs={[
            { name: 'الاختبارات', tab: 'tests', icon: StudentTests },
            { name: 'المتفوقون', tab: 'toppers', icon: StudentToppers },
            { name: 'الشهور', tab: 'months', icon: Money },
          ]}
        />
      </div>
      <div className={'w-[1px] self-stretch bg-gray-100'} />
      <div className={'relative flex-grow self-stretch rounded bg-gray-100 p-10'}>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboard;
