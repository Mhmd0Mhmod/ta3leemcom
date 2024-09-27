import Button from '@/UI-Global/Button.jsx';
import Drop from '../../../../public/Icons/drop2.svg';
import Triangle from '../../../../public/Icons/tringle list.svg';
import SmallProfile from '../../../../public/Icons/profile-unfill.svg';
import Logout from '../../../../public/Icons/logout.svg';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
        Profile: currentUser.userId,
      });
  }
  return (
    <div className={'relative self-center'}>
      <Button className={'flex items-center gap-2 border-0 bg-transparent !text-[#605E5E]'} onClick={() => setOpenList((openList) => !openList)}>
        {currentUser.name}
        <Drop className={`${openList ? '' : 'rotate-180'} duration-300`} />
      </Button>
      {openList && (
        <ul className={'absolute left-2 top-16 z-40 flex flex-col gap-4 rounded border bg-white p-2'}>
          <Triangle className="absolute -top-5 left-5" width={25} height={25} />
          <li className={'flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#B4D3E0]'} onClick={handleOpenProfile}>
            <SmallProfile />
            <span>الملف الشخصي</span>
          </li>
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
