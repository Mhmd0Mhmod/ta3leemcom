import { useSearchParams } from 'react-router-dom';
import Logo from '/public/imgs/profileLogo.svg';
import Exit from '/public/Icons/exitt.svg';
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

  return (
    <div>
      {auth.role === 'Teacher' && (!activeTab || activeTab === 'PersonalProfile') && <PersonalProfile teacher={auth} />}
      {auth.role === 'Teacher' && activeTab === 'Subscription' && <ProfileSubscription />}
      {auth.role === 'Teacher' && activeTab === 'UpgradeSubscription' && <UpgradeSubscription />}
      {auth.role === 'Teacher' && activeTab === 'EditTeacherProfile' && <EditTeacherProfile />}
      {auth.role === 'Student' && !activeTab && <StudentProfile />}
      {/*{auth.role === 'Teacher' && activeTab === 'Notification' && <NotificationSide />}*/}
    </div>
  );
}
export default Profile;
