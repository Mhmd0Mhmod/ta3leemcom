import React, { useState } from 'react';
import Exit from '../../../../public/Icons/exit.svg';
import Card from '../../../../public/Icons/card.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../Button.jsx';
import FormInput from '../../FormInput.jsx';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function StudentLoginForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/student-login', { code: code.trim() });
      if (res.status === 200) {
        toast.success('تم تسجيل الدخول بنجاح');
        const { token, expiresOn, ...user } = res.data;
        signIn({
          auth: {
            token: res.data.token,
            // type: 'Bearer',
          },
          userState: user,
        });
        setSearchParams({});
      }
    } catch (error) {
      // toast.error('حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى');
      toast.error(error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="relative p-9 font-almaria">
        <Exit
          alt={'exitIcon'}
          className={'cursor-pointer'}
          onClick={(e) => {
            e.preventDefault();
            navigate(location.pathname);
          }}
        />

        <h2 className="mt-16 text-center font-almaria-bold text-3xl">تسجيل الدخول</h2>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex h-[500px] flex-col justify-center gap-10">
              <label htmlFor="" className="text-xl text-[#A6A6A6]">
                كود االطالب
              </label>
              <FormInput type={'text'} value={code} onChange={(e) => setCode(e.target.value)} placeholder={'       XX   XXX  XXX'} className={'w-[330px]'} Icon={Card} />
              <div>
                <input type="checkbox" className="me-2" />
                <label>تذكرني</label>
              </div>
              <div className="text-center">
                <Button disabled={isSubmitting} type="Secondary" className={'px-[4rem] py-4 font-almaria-light disabled:cursor-not-allowed disabled:bg-blue-500'}>
                  {isSubmitting ? 'جاري التسجيل...' : 'سجل الدخول'}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="absolute bottom-6 right-8 text-[#A6A6A6]">
          <button onClick={() => setSearchParams({ mr: 'login', login: 'teacher' })} className={'underline'}>
            تسجيل الدخول كمعلم
          </button>
        </div>
      </div>
    </>
  );
}
