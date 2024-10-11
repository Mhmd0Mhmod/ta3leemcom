import DropDashBoardList from '../../../../public/Icons/DropNavBar.svg';
import { useState } from 'react';
import Menu from '../../../../public/Icons/menu.svg';
import AsideDashboard from '@/pages/Dashboard/Components/AsideDashboard.jsx';
import Profile from '../../../../public/Icons/blackProfile.svg';
import Group from '../../../../public/Icons/group.svg';
import TestIcon from '../../../../public/Icons/test.svg';
import Details from '@/UI-Global/Details.jsx';
import Graduted from '../../../../public/Icons/graduted.svg';
import { constraints, LEVELS } from '@/config.js';
import Meeting from '../../../../public/Icons/meeting.svg';
import { useLevels } from '@/pages/Dashboard/Dashboard';

function TeacherNav() {
  const [openTabsList, setOpenTabsList] = useState(false);
  const [showItems, setShowItems] = useState(true);

  function handleTabListOpen(e) {
    if (e.target.closest('li')) setOpenTabsList(false);
  }
  // console.log(LEVELS.levels.map((el) => el.split(' ').at(1)));
  // console.log(Object.keys(LEVELS).slice(1));
  // let lvls = [];
  // for (const key in constraints) {
  //   lvls.push(constraints[key].text);
  // }
  // console.log(lvls);
  // console.log(Object.entries(constraints)[0][1]);
  // console.log(Object.keys(constraints));
  return (
    <div>
      <button className={'flex items-center gap-[10px] text-2xl'} onClick={() => setOpenTabsList(!openTabsList)}>
        <DropDashBoardList className={`${openTabsList ? 'rotate-180' : ''} duration-200`} />
      </button>
      {openTabsList && (
        <div className={`absolute top-16 z-50 w-72 rounded bg-[#F5F7F9] px-4 py-2 ${showItems ? 'w-72' : 'w-fit'}`} onClick={handleTabListOpen}>
          <div className={`flex ${showItems ? 'justify-end' : 'justify-center'}`}>
            <Menu className={`w-9 ${showItems ? '' : 'rotate-Y-180'} transition duration-100`} onClick={() => setShowItems((showItems) => !showItems)} />
          </div>
          <AsideDashboard
            opened={showItems}
            setOpened={setShowItems}
            tabs={[
              {
                name: 'اضافة طالب',
                tab: 'addStudent',
                icon: Profile,
              },
              { name: 'اضافة مجموعة', tab: 'addGroup', icon: Group },
              {
                name: 'اضافة اختبار',
                tab: 'addTest',
                icon: TestIcon,
                Details: <Details className={'gap-[18px]'} summary={'اضافة اختبار'} Icon={TestIcon} opend={showItems} listItems={['اونلاين', 'اوفلاين']} tabName={['online', 'offline']} param={'test'} />,
              },
              {
                name: 'المراحل الدراسية',
                tab: 'StudyLevels',
                icon: Graduted,
                // Details: (
                //   <Details
                //     route="level"
                //     className={'gap-[18px]'}
                //     summary={'المراحل الدراسية'}
                //     Icon={Graduted}
                //     opend={showItems}
                //     listItems={lvls.map((el) => {
                //       return { ...el, name: el };
                //     })}
                //     tabName={MainLevels.map((level) => level.id)}
                //     param={'level'}
                //   />
                // ),
                Details: <Details className={'gap-[18px]'} summary={'المراحل الدراسية'} Icon={Graduted} opend={showItems} listItems={LEVELS.levels.map((el) => el.split(' ').at(1))} tabName={Object.keys(LEVELS).slice(1)} param={'level'} />,
              },
              { name: 'عقد اجتماع', tab: 'meeting', icon: Meeting },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default TeacherNav;
