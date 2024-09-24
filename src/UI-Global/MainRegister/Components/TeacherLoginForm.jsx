import React, { useState } from 'react';
import Exit from '../../../../public/Icons/exit.svg';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../Button.jsx';
import FormInput from '../../FormInput.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import Lock from '../../../../public/Icons/Vector.svg';
import Heading from '../../Heading.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ErrorMessage } from '@/components/ui/validationMessages';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export default function TeacherLoginForm() {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signIn = useSignIn();

  const validate = () => {
    let errors = {};
    // Validate email: must be in valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(email)) {
      errors.email = 'يجب أن يكون البريد الإلكتروني صحيحًا';
    }

    // Validate password: at least 8 characters, contains non-alphabetic, uppercase, and lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    if (!password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل، وتحتوي على أحرف كبيرة وصغيرة وغير أبجدية';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      try {
        setIsSubmitting(true);
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/login', {
          email,
          password,
        });
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative p-9 font-almaria">
        <Exit
          alt={'exitIcon'}
          className={'cursor-pointer'}
          onClick={(e) => {
            e.preventDefault();
            navigate(loaction.pathname);
          }}
        />

        <h2 className="mt-16 text-center font-almaria-bold text-3xl">تسجيل الدخول</h2>
        {/* ----------- */}
        <div className="flex h-[500px] flex-col justify-center">
          <div>
            <Heading as={'h4'} className={'my-4 text-[#A6A6A6]'}>
              البريد الالكتروني
            </Heading>
            <FormInput onChange={(e) => setEmail(e.target.value)} type={'email'} name={'email'} placeholder={'example@example.com'} Icon={Mail} className={'w-full text-end'} />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
          <div>
            <Heading as={'h4'} className={'my-4 text-[#A6A6A6]'}>
              كلمة المرور
            </Heading>
            <FormInput onChange={(e) => setPassword(e.target.value)} type={'password'} name={'password'} placeholder={'كلمة المرور'} Icon={Lock} className={'w-full'} />
            {errors.password && <ErrorMessage message={errors.password} />}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <input type="checkbox" className="me-2" />
              <label>تذكرني</label>
            </div>

            <p className="text-secondary-l">نسيت كلمة المرور ؟</p>
          </div>
          <div className="mt-8 text-center">
            <Button disabled={isSubmitting} type="Secondary" className={'px-[4rem] py-4 font-almaria-light disabled:cursor-not-allowed disabled:bg-blue-500'}>
              سجل الدخول
            </Button>
          </div>
        </div>
        {/* ------------- */}

        <div className="absolute bottom-6 right-8 text-[#A6A6A6]">
          <button onClick={() => setSearchParams({ mr: 'login', login: 'student' })} className={'underline'}>
            تسجيل الدخول كطالب
          </button>
        </div>
      </form>
    </>
  );
}
