import { useState } from 'react';
import Drop from '../../../../public/Icons/drop2.svg';
import AsideDashboard from '@/pages/Dashboard/Components/AsideDashboard.jsx';
import StudentTests from '../../../../public/Icons/StudentTests.svg';
import StudentToppers from '../../../../public/Icons/StudentToppers.svg';
import Money from '../../../../public/Icons/StudentMonths.svg';

function StudentNav() {
  const [openTabsList, setOpenTabsList] = useState(false);
  const [showItems, setShowItems] = useState(true);

  function handleTabListOpen(e) {
    console.log(e.target.tagName);
    if (e.target.closest('li')) setOpenTabsList(false);
  }
  return (
    <div>
      <button className={'flex items-center gap-[10px] text-2xl'} onClick={() => setOpenTabsList(!openTabsList)}>
        <span>الطالب</span>
        <Drop className={openTabsList ? '' : 'rotate-180 duration-300'} />
      </button>
      {openTabsList && (
        <div className={`absolute top-16 z-50 w-72 rounded bg-[#F5F7F9] px-4 py-2 ${showItems ? 'w-72' : 'w-fit'}`} onClick={handleTabListOpen}>
            <AsideDashboard
              opened={openTabsList}
              setOpened={setOpenTabsList}
              tabs={[
                { name: 'الاختبارات', tab: 'tests', icon: StudentTests },
                {
                  name: 'المتفوقون',
                  tab: 'toppers',
                  icon: StudentToppers,
                },
                { name: 'الشهور', tab: 'months', icon: Money },
              ]}
            />

        </div>
      )}
    </div>
  );
}

export default StudentNav;
