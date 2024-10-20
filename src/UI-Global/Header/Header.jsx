import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../Button.jsx';
import ArrowLeft from '../../../public/Icons/leftArrow.svg';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import toast from 'react-hot-toast';
import NavLinks from '@/UI-Global/Header/Components/NavLinks.jsx';
import StudentNav from '@/UI-Global/Header/Components/StudentNav.jsx';
import TeacherNav from '@/UI-Global/Header/Components/TeacherNav.jsx';
import ProfileAndLogoutList from '@/UI-Global/Header/Components/ProfileAndLogoutList.jsx';
import Notifications from '@/Features/Notifications/Notifications.jsx';

export default function Header() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const signOut = useSignOut();
  const auth = useAuthUser();
  useEffect(() => {
    if (auth) {
      setCurrentUser(auth);
      setRole(auth.role);
    }
  }, [auth]);
  function logOut() {
    signOut();
    setCurrentUser({});
    setRole('');
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/home');
  }
  return (
    <nav className={'relative mb-3 ml-10 flex justify-between gap-4 font-almaria'}>
      <NavLinks />
      {role && (
        <div className={'flex w-full items-center justify-between'}>
          <div className={'relative flex items-center gap-4'}>
            <div className={'h-10 w-[3px] bg-[#605E5E]'} />
            {role === 'Student' && <StudentNav />}
            {role === 'Teacher' && <TeacherNav />}
          </div>
          <div className={"flex items-center"}>
          <ProfileAndLogoutList currentUser={currentUser} logOut={logOut} />
            {role === 'Teacher' && <Notifications />}
          </div>
        </div>
      )}
      {!role && (
        <div className={'flex items-center gap-[10px]'}>
          <Button type={'ghost'} className={'border-0'} onClick={() => setSearchParam({ mr: 'login' })}>
            تسجيل الدخول
          </Button>
          <Button type={'primary'} className={'flex items-center gap-2'} onClick={() => setSearchParam({ mr: 'signUp' })}>
            انضم إلينا
            <ArrowLeft className={'w-7'} />
          </Button>
        </div>
      )}
    </nav>
  );
}
