import Button from '@/UI-Global/Button.jsx';
import Drop from '../../../../public/Icons/drop2.svg';
import Triangle from '../../../../public/Icons/tringle list.svg';
import SmallProfile from '../../../../public/Icons/profile-unfill.svg';
import Logout from '../../../../public/Icons/logout.svg';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '@/UI-Global/Modal/Modal';
import PersonalProfile from '@/UI-Global/Profile/Components/PersonalProfile';
import Profile from '@/UI-Global/Profile/TeacherProfile';

function ProfileAndLogoutList({ currentUser, logOut }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const [openList, setOpenList] = useState(false);

  function handleOpenProfile() {
    if (currentUser.role === 'Student')
      setSearchParam({
        ...Object.fromEntries(searchParam.entries()),
        Profile: currentUser.userId,
      });
    else
      setSearchParam({
        ...Object.fromEntries(searchParam.entries()),
        tab: 'PersonalProfile',
      });
  }
  return (
    <div className={'relative self-center'}>
      <Button className={'flex items-center gap-2 border-0 bg-transparent !text-[#605E5E]'} onClick={() => setOpenList((openList) => !openList)}>
        {currentUser.name.split(' ').slice(0, 2).join(' ')}
        <Drop className={`${openList ? '' : 'rotate-180'} duration-300`} />
      </Button>
      {openList && (
        <ul className={'absolute left-2 top-16 z-40 flex flex-col gap-4 rounded border bg-white p-2'}>
          <Triangle className="absolute -top-5 left-5" width={25} height={25} />
          <Modal>
            <Modal.Open name={currentUser.role === 'Student' ? 'studentProfile' : 'teacherProfile'}>
              <li className={'flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#B4D3E0]'}>
                <SmallProfile />
                <span>الملف الشخصي</span>
              </li>
            </Modal.Open>
            <Modal.Window name={currentUser.role === 'Student' ? 'studentProfile' : 'teacherProfile'}>
              <Profile />
            </Modal.Window>
          </Modal>
          <li onClick={logOut} className={'flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#FFB2B3]'}>
            <Logout />
            <span>تسجيل الخروج</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileAndLogoutList;
