import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../../../public/imgs/profileLogo.svg';
import Exit from '../../../public/Icons/exitt.svg';
import PersonalProfile from '@/UI-Global/Profile/Components/PersonalProfile.jsx';
import ProfileSubscription from '@/UI-Global/Profile/Components/ProfileSubscription.jsx';
import NotificationSide from '@/UI-Global/Profile/Components/NotificationSide.jsx';
import StudentProfile from '@/UI-Global/Profile/Components/StudentProfile.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import TeacherProfileSide from '@/UI-Global/Profile/Components/TeacherProfileSide.jsx';
import { handleBack } from '@/lib/helpers.js';

import UpgradeSubscription from './UpgradeSubscription';
import EditTeacherProfile from './EditTeacherProfile';
function Profile({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = useAuthUser();
  const activeTab = searchParams.get('tab');
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'all' || e.target.id === 'exit') handleBack();
  };

  if (!searchParams.get('Profile')) return;
  return (
    <>
      <div className="fixed z-[989] m-0 h-full w-full bg-[rgb(0,0,0,0.4)]" id="all" onClick={handleButtonClick}>
        <div className="absolute right-[15.625rem] top-[6.25rem] z-[999] flex h-[49.75rem] w-[88.188rem] overflow-scroll rounded-xl border-2 bg-[white]">
          <div className="h-[100%]">
            <div className="flex h-[4.375rem] w-full items-center border-b-2 border-l-2 p-4">
              <Exit alt="exit" width={30} onClick={handleButtonClick} id="exit" />
            </div>
            <div className="h-[41.563rem] border-l-2">{auth.role === 'Teacher' && <TeacherProfileSide />}</div>
            <div className="h-[41.563rem] border-l-2">{children}</div>
          </div>

          <div className="h-full w-[85%]">
            <div className="flex h-[4.375rem] w-full items-center justify-center border-b-2">
              <Logo alt="logo" width={135} />
            </div>
            {activeTab === 'PersonalProfile' && <PersonalProfile />}
            {activeTab === 'Subscription' && <ProfileSubscription />}
            {activeTab === 'Notification' && <NotificationSide />}
            {!activeTab && <StudentProfile />}
            {activeTab === 'UpgradeSubscription' && <UpgradeSubscription />}
            {activeTab === 'EditTeacherProfile' && <EditTeacherProfile />}
            {auth.role === 'Teacher' && activeTab === 'PersonalProfile' && <PersonalProfile />}
            {auth.role === 'Teacher' && activeTab === 'Subscription' && <ProfileSubscription />}
            {auth.role === 'Teacher' && activeTab === 'Notification' && <NotificationSide />}
            {auth.role === 'Student' && !activeTab && <StudentProfile />}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
