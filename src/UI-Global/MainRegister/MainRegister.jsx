import Heading from '../Heading.jsx';
import Button from '../Button.jsx';
import Circles from '../../../public/Icons/circles1.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SingUpForm from './Components/SingUpForm.jsx';
import Exit from '../../../public/Icons/exit.svg';
import StudentLoginForm from './Components/StudentLoginForm.jsx';
import TeacherLoginForm from './Components/TeacherLoginForm.jsx';

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
        <div className={'grid min-h-[60vh] min-w-[70vw] grid-cols-2 rounded-3xl bg-white'}>
          {formType === 'login' && !loginType && (
            <div className={'flex flex-col p-9 font-almaria'}>
              <div>
                <Exit
                  alt={'exitIcon'}
                  className={'cursor-pointer'}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(loction.pathname);
                  }}
                />
              </div>

              <div className="ms-[1.875rem] flex flex-col gap-[1.875rem]">
                <div className="mt-8 flex">
                  <h2 className="font-almaria-bold text-4xl">مرحبا بك </h2>
                  {/* <img src={hi} alt="Hi" /> */}
                </div>
                <p className="w-[15.625rem] text-[#A6A6A6]">يرجى اختيار نوع الحساب الذي ترغب في تسجيل الدخول به</p>
              </div>

              <div className="flex h-full w-full content-center items-center">
                <div className="m-auto flex w-[70%] flex-col gap-20">
                  <div>
                    <Button
                      className={'w-full rounded border border-[#0562CF] py-3 text-[#0462CF] hover:bg-[#0462CF] hover:text-white'}
                      type={'outlineSecondary'}
                      onClick={(e) => {
                        e.preventDefault();
                        handleButtonClick('student');
                      }}
                    >
                      طالب
                    </Button>
                  </div>

                  <div>
                    <Button className={'w-full border border-[#0562CF] py-3 text-[#0462CF] hover:bg-[#0462CF] hover:text-white'} type={'outlineSecondary'} onClick={() => handleButtonClick('teacher')}>
                      معلم
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formType === 'login' && loginType === 'student' && <StudentLoginForm />}
          {formType === 'login' && loginType === 'teacher' && <TeacherLoginForm />}
          {formType === 'signUp' && <SingUpForm />}

          {/*Left constant Content  */}
          <div className={'relative flex h-full w-full items-center justify-center rounded-3xl bg-sign-up&login bg-cover bg-center'}>
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
      </div>
    </>
  );
}
