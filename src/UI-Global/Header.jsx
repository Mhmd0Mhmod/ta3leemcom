import { useLocation, Link, useSearchParams } from 'react-router-dom';
import Logo from '../../public/Icons/ta3leemComLogo.svg';
import Button from './Button.jsx';
import ArrowLeft from '../../public/Icons/leftArrow.svg';
import Drop from '../../public/Icons/drop2.svg';
import Profile from '../../public/Icons/blackProfile.svg';
import SmallProfile from '../../public/Icons/profile-unfill.svg';
import Logout from '../../public/Icons/logout.svg';

import { useState } from 'react';
import Triangle from '../../public/Icons/tringle list.svg';
import AsideDashboard from '@/pages/Dashboard/Components/AsideDashboard.jsx';
import StudentTests from '../../public/Icons/StudentTests.svg';
import StudentToppers from '../../public/Icons/StudentToppers.svg';
import Money from '../../public/Icons/StudentMonths.svg';
import Group from '../../public/Icons/group.svg';
import TestIcon from '../../public/Icons/test.svg';
import Details from '@/UI-Global/Details.jsx';
import Graduted from '../../public/Icons/graduted.svg';
import { LEVELS } from '@/config.js';
import Meeting from '../../public/Icons/meeting.svg';
import Menu from '../../public/Icons/menu.svg';
import DropDashBoardList from '../../public/Icons/DropNavBar.svg';

const currentUser = {
  role: 'student',
  name: 'Ahmed',
  id: 1,
};
export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchParam, setSearchParam] = useSearchParams();
  const [openTabsList, setOpenTabsList] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [showItems, setShowItems] = useState(true);
  const role = '';

  function handleOpenProfile() {
    setSearchParam({
      ...Object.fromEntries(searchParam.entries()),
      Profile: currentUser.id,
    });
  }

  function handleTabListOpen(e) {
    console.log(e.target.tagName);
    if (e.target.closest('li')) setOpenTabsList(false);
  }

  return (
    <nav
      className={'relative mb-3 ml-10 flex justify-between gap-4 font-almaria'}
    >
      {/* <img src={logo} alt={"Icon"} /> */}
      <ul className={'flex items-center justify-between gap-5 text-3xl'}>
        <Logo />
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/home' ? 'active' : ''
          }`}
        >
          <Link to="/home">الرئيسية</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/about' ? 'active' : ''
          }`}
        >
          <Link to="/about">عن</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/services' ? 'active' : ''
          }`}
        >
          <Link to="/services">الخدمات</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/instructions' ? 'active' : ''
          }`}
        >
          <Link to="/instructions">تعليمات</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/subscriptions' ? 'active' : ''
          }`}
        >
          <Link to="/subscriptions">الاشتركات</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/opinion' ? 'active' : ''
          }`}
        >
          <Link to="/opinion">رأيك</Link>
        </li>
        <li
          className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${
            currentPath === '/contact-with-us' ? 'active' : ''
          }`}
        >
          <Link to="/contact-with-us">تواصل معنا</Link>
        </li>
      </ul>

      {role && (
        <div className={'flex w-full items-center justify-between'}>
          <div className={'relative flex items-center gap-4'}>
            <div className={'h-10 w-[3px] bg-[#605E5E]'} />
            <button
              className={'flex items-center gap-[10px] text-2xl'}
              onClick={() => setOpenTabsList(!openTabsList)}
            >
              {role === 'student' && (
                <>
                  <span>الطالب</span>
                  <Drop
                    className={openTabsList ? '' : 'rotate-180 duration-300'}
                  />
                </>
              )}
              {role === 'teacher' && (
                <DropDashBoardList
                  className={`${openTabsList ? 'rotate-180' : ''} duration-200`}
                />
              )}
            </button>
            {openTabsList && (
              <div
                className={`absolute top-16 z-50 w-72 rounded bg-[#F5F7F9] px-4 py-2 ${showItems ? 'w-72' : 'w-fit'}`}
                onClick={handleTabListOpen}
              >
                {role === 'student' && (
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
                )}
                {role === 'teacher' && (
                  <>
                    <div
                      className={`flex ${showItems ? 'justify-end' : 'justify-center'}`}
                    >
                      <Menu
                        className={`w-9 ${showItems ? '' : 'rotate-Y-180'} transition duration-100`}
                        onClick={() => setShowItems((showItems) => !showItems)}
                      />
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
                          Details: (
                            <Details
                              className={'gap-[18px]'}
                              summary={'اضافة اختبار'}
                              Icon={TestIcon}
                              opend={showItems}
                              listItems={['اونلاين', 'اوفلاين']}
                              tabName={['online', 'offline']}
                              param={'test'}
                            />
                          ),
                        },
                        {
                          name: 'المراحل الدراسية',
                          tab: 'StudyLevels',
                          icon: Graduted,
                          Details: (
                            <Details
                              className={'gap-[18px]'}
                              summary={'المراحل الدراسية'}
                              Icon={Graduted}
                              opend={showItems}
                              listItems={LEVELS.levels.map((el) =>
                                el.split(' ').at(1),
                              )}
                              tabName={Object.keys(LEVELS).slice(1)}
                              param={'level'}
                            />
                          ),
                        },
                        { name: 'عقد اجتماع', tab: 'meeting', icon: Meeting },
                      ]}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className={'relative self-center'}>
            <Button
              className={
                'flex items-center gap-2 border-0 bg-transparent !text-[#605E5E]'
              }
              onClick={() => setOpenList((openList) => !openList)}
            >
              {currentUser.name}
              <Drop
                className={`${openList ? '' : 'rotate-180'} duration-300`}
              />
            </Button>
            {openList && (
              <ul
                className={
                  'absolute left-2 top-16 z-40 flex flex-col gap-4 rounded border bg-white p-2'
                }
              >
                <Triangle
                  className="absolute -top-5 left-5"
                  width={25}
                  height={25}
                />
                <li
                  className={
                    'flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#B4D3E0]'
                  }
                  onClick={handleOpenProfile}
                >
                  <SmallProfile />
                  <span>الملف الشخصي</span>
                </li>
                <li
                  className={
                    'flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#FFB2B3]'
                  }
                  onClick={() => setSearchParam({ mr: 'logout' })}
                >
                  <Logout />
                  <span>تسجيل الخروج</span>
                </li>
              </ul>
            )}
            {role === 'teacher' && <></>}
          </div>
        </div>
      )}
      {!role && (
        <div className={'flex items-center gap-[10px]'}>
          <Button
            type={'ghost'}
            className={'border-0'}
            onClick={() => setSearchParam({ mr: 'login' })}
          >
            تسجيل الدخول
          </Button>
          <Button
            type={'primary'}
            className={'flex items-center gap-2'}
            onClick={() => setSearchParam({ mr: 'signUp' })}
          >
            انضم إلينا
            <ArrowLeft className={'w-7'} />
          </Button>
        </div>
      )}
    </nav>
  );
}
