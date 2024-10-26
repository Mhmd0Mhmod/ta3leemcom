import { useSearchParams } from 'react-router-dom';
import Logo from '../../../public/imgs/profileLogo.svg';
import Exit from '../../../public/Icons/exitt.svg';
import PersonalProfile from './Components/PersonalProfile.jsx';
import ProfileSubscription from './Components/ProfileSubscription.jsx';
import StudentProfile from './Components/StudentProfile.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import TeacherProfileSide from './Components/TeacherProfileSide.jsx';

import UpgradeSubscription from './Components/UpgradeSubscription.jsx';
import EditTeacherProfile from './Components/EditTeacherProfile.jsx';
function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = useAuthUser();
  const activeTab = searchParams.get('tab');
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'all' || e.target.id === 'exit') setSearchParams({});
  };
  return;
  return (
    <>
      <div className="fixed z-[989] m-0 h-full w-full bg-[rgb(0,0,0,0.4)]" id="all" onClick={handleButtonClick}>
        <div className="absolute right-[15.625rem] top-[6.25rem] z-[999] flex h-[49.75rem] w-[88.188rem] overflow-scroll rounded-xl border-2 bg-[white]">
          <div className="h-[100%]">
            <div className="flex h-[4.375rem] w-full items-center border-b-2 border-l-2 p-4">
              <Exit alt="exit" width={30} onClick={handleButtonClick} id="exit" />
            </div>
            <div className="h-[41.563rem] border-l-2">{auth.role === 'Teacher' && <TeacherProfileSide />}</div>
          </div>

          <div className="h-full w-[85%]">
            <div className="flex h-[4.375rem] w-full items-center justify-center border-b-2">
              <Logo alt="logo" width={135} />
            </div>
            {auth.role === 'Teacher' && activeTab === 'PersonalProfile' && <PersonalProfile teacher={auth} />}
            {auth.role === 'Teacher' && activeTab === 'Subscription' && <ProfileSubscription />}
            {auth.role === 'Teacher' && activeTab === 'UpgradeSubscription' && <UpgradeSubscription />}
            {auth.role === 'Teacher' && activeTab === 'EditTeacherProfile' && <EditTeacherProfile />}
            {auth.role === 'Student' && !activeTab && <StudentProfile />}
            {/*{auth.role === 'Teacher' && activeTab === 'Notification' && <NotificationSide />}*/}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
