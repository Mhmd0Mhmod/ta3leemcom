import Exit from '../../../../public/Icons/exit.svg';
import Heading from '../../Heading.jsx';
import FormInput from '../../FormInput.jsx';
import Profile from '../../../../public/Icons/profile.svg';
import Phone from '../../../../public/Icons/call.svg';
import Mail from '../../../../public/Icons/mail.svg';
import Lock from '../../../../public/Icons/Vector.svg';
import Button from '../../Button.jsx';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ErrorMessage, PasswordStrength } from '@/components/ui/validationMessages';
import axios from 'axios';
import toast from 'react-hot-toast';

function SingUpForm({ setNewSignUpEmail }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState({ first: '', middle: '', last: '' });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locaiton = useLocation();

  const validate = () => {
    let errors = {};
    // Validate name fields
    if (!name.first || !name.middle || !name.last) {
      errors.name = 'الاسم الثلاثي مطلوب';
    }

    // Validate phone number: must start with 010, 011, 012, or 015 and be 11 digits
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    if (!phone) {
      errors.phone = 'رقم الهاتف مطلوب';
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'يجب أن يبدأ رقم الهاتف ب 010 أو 011 أو 012 أو 015 ويكون مكون من 11 رقمًا';
    }

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

    if (isValid && isValidPassword) {
      try {
        setIsSubmitting(true);
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/register', {
          name: name.first + ' ' + name.middle + ' ' + name.last,
          email,
          phoneNumber: phone,
          password,
          role: 'Teacher',
          userName: email.split('@')[0],
        });
        if (res.status === 200) {
          toast.success('تم التسجيل بنجاح');
          searchParams.set('mr', 'verify');
          setSearchParams(searchParams);
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
    <form onSubmit={handleSubmit} className={'font-almari flex flex-col p-9'}>
      <div>
        <Exit
          alt={'exitIcon'}
          className={'cursor-pointer'}
          onClick={(e) => {
            e.preventDefault();
            navigate(locaiton.pathname);
          }}
        />
      </div>
      <Heading as={'h1'} className={'text-center font-almaria-bold text-3xl text-black'}>
        انشئ حسابك
      </Heading>

      <Heading as={'h4'} className={'my-4 text-secondary-l'}>
        الاسم الثلاثي
      </Heading>
      <div className={'flex justify-between'}>
        <FormInput type={'text'} name={'name'} placeholder={'الاسم الأول'} Icon={Profile} className={'w-[70px]'} onChange={(e) => setName({ ...name, first: e.target.value })} />
        <FormInput type={'text'} name={'name'} placeholder={'الاسم الثاني'} className={'w-[70px]'} onChange={(e) => setName({ ...name, middle: e.target.value })} />
        <FormInput type={'text'} name={'name'} placeholder={'الاسم الثالث'} className={'w-[70px]'} onChange={(e) => setName({ ...name, last: e.target.value })} />
      </div>
      {errors.name && <ErrorMessage message={errors.name} />}
      <Heading as={'h4'} className={'my-4 text-secondary-l'}>
        رقم الهاتف
      </Heading>
      <FormInput type={'Number'} name={'phone'} placeholder={'رقم الهاتف'} Icon={Phone} className={'w-full'} onChange={(e) => setPhone(e.target.value)} />
      {errors.phone && <ErrorMessage message={errors.phone} />}
      <Heading as={'h4'} className={'my-4 text-secondary-l'}>
        البريد الالكتروني
      </Heading>
      <FormInput
        type={'email'}
        name={'email'}
        placeholder={'example@example.com'}
        Icon={Mail}
        className={'w-full text-end'}
        onChange={(e) => {
          setEmail(e.target.value);
          setNewSignUpEmail(e.target.value);
        }}
      />
      {errors.email && <ErrorMessage message={errors.email} />}
      <Heading as={'h4'} className={'my-4 text-secondary-l'}>
        كلمة المرور
      </Heading>
      <FormInput type={'password'} name={'password'} placeholder={'كلمة المرور'} Icon={Lock} className={'w-full'} onChange={(e) => setPassword(e.target.value)} />
      {errors.password && <ErrorMessage message={errors.password} />}
      {password && <PasswordStrength password={password} setIsValidPassword={setIsValidPassword} />}
      <Heading as={'h4'} className={'my-4 hidden text-secondary-l'} id={'password-level'}>
        * كلمة المرور يجب ان تحتوي على 8 احرف على الاقل واحرف كبيرة وصغيرة وارقام ورموز
      </Heading>
      <Button disabled={isSubmitting} type={'normal'} className={'my-4 w-full bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-blue-500'}>
        {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
      </Button>
      <div className="flex justify-between">
        <button
          className={'text-accent-l-400 text-secondary-l underline'}
          onClick={() => {
            searchParams.set('mr', 'login');
            searchParams.set('login', 'teacher');
            setSearchParams(searchParams);
          }}
        >
          لديك حساب بالفعل؟
        </button>
        <button
          className={'text-accent-l-400 text-secondary-l underline'}
          onClick={() => {
            setSearchParams({ mr: 'verify' });
          }}
        >
          تفعيل الحساب
        </button>
      </div>
    </form>
  );
}

export default SingUpForm;
