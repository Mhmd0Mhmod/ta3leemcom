import Heading from '../Heading.jsx';
import Button from '../Button.jsx';
import Circles from '../../../public/Icons/circles1.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SingUpForm from './Components/SingUpForm.jsx';
import Exit from './Components/Exit.jsx';
import StudentLoginForm from './Components/StudentLoginForm.jsx';
import TeacherLoginForm from './Components/TeacherLoginForm.jsx';
import LoginHome from '@/UI-Global/MainRegister/Components/LoginHome.jsx';
import VerifyEmail from '@/UI-Global/MainRegister/Components/VerifyEmail.jsx';

export default function MainRegister() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const formType = searchParams.get('mr');
  const loginType = searchParams.get('login');
  const loction = useLocation();
  if (!formType) return null;
  const handleButtonClick = (login) => {
    setSearchParams({ mr: formType, login });
  };

  return (
    <>
      <div
        className={'fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-[rgb(0,0,0,0.4)] font-cairo'}
        id={'bg'}
        onClick={(e) => {
          if (e.target.id === 'bg') {
            navigate(loction.pathname);
          }
        }}
      >
        {/* Right Form */}
        <div className={'grid min-h-[80lvh] min-w-[55%] max-w-96 grid-cols-1 overflow-hidden rounded-3xl bg-white lg:grid-cols-2'}>
          {formType === 'login' && !loginType && <LoginHome handleButtonClick={handleButtonClick} />}
          {formType === 'login' && loginType === 'student' && <StudentLoginForm />}
          {formType === 'login' && loginType === 'teacher' && <TeacherLoginForm />}
          {formType === 'signUp' && <SingUpForm />}
          {formType === 'verify' && (
            <p className="text-center text-5xl">
              verify you email
              <Button
                onClick={() => {
                  searchParams.set('mr', 'login');
                  searchParams.set('login', 'teacher');
                  setSearchParams(searchParams);
                }}
              >
                login
              </Button>
            </p>
          )}

          {/*Left constant Content  */}
          <div className={'relative hidden h-full w-full items-center justify-center rounded-3xl bg-sign-up&login bg-cover bg-center lg:flex'}>
            <div className={'flex h-1/4 flex-col items-start justify-around text-white'}>
              <Heading as={'h1'}>تعليم كوم</Heading>
              <p>تجربة تعليمية ممتعة وسلسة لكافة مستخدمينا</p>
              <Button type={'normal'} className={'w-fit rounded-3xl border-0 bg-blue-600 text-sm text-white'}>
                اعرف المزيد
              </Button>
            </div>
            <div className={'absolute bottom-0 left-0 w-96'}>
              <Circles alt={'circles'} className={'w-full'} />
            </div>
          </div>
        </div>
        {/*        <div className={"bg-white min-h-[80lvh] min-w-[55%] max-w-96  rounded-lg"}>

          <VerifyEmail email={"iammhdmhmod@gmail.com"}/>
        </div>*/}
      </div>
    </>
  );
}
