import Heading from '@/UI-Global/Heading.jsx';
import Exit from './Exit.jsx';
import EmailVerify from '/public/Icons/veify-email.svg';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import FormInput from '@/UI-Global/FormInput.jsx';
import { ErrorMessage } from '@/components/ui/validationMessages.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import { useSearchParams } from 'react-router-dom';
function VerifyEmail({ newSignUpEmail }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let userEmail = newSignUpEmail ? newSignUpEmail : searchParams.get('email') ? searchParams.get('email') : '';
  const [email, setEmail] = useState(userEmail);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleResendVerificationCode() {
    if (email) {
      try {
        setIsSubmitting(true);
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/resend-verification-code', { email });
        if (res.status === 200) {
          toast.success(res.data);
        }
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('حدث خطأ يرجى المحاولة مرة أخرى');
    }
  }
  return (
    <div className={'flex flex-col items-center gap-8 p-10 font-cairo'}>
      <span className={'self-start'}>
        <Exit />
      </span>
      <Heading as={'h1'} className={'mt-4 text-center'}>
        تأكيد البريد الإلكتروني{' '}
      </Heading>
      <div className={'mt-10 w-full'}>
        <EmailVerify alt={'verifyEmail'} className={'w-full'} />
      </div>
      {userEmail ? (
        <div className={'space-y-5 text-[#6D6C6C]'}>
          <p>
            لقد أرسلنا رسالة للبريد الإلكتروني <span className={'mx-3 text-[#0884A2]'}> {email} </span> للتأكيد من صحة عنوانك الإلكتروني.
          </p>
          <p>قبل أن تتمكن من تسجيل الدخول ، الرجاء الضغط على الرابط عبر البريد الالكتروني لإكمال التسجيل بنجاح</p>
        </div>
      ) : (
        <form className={'font-almari flex flex-col p-9'}>
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
            }}
          />
        </form>
      )}
      <hr className={'w-10/12'} />
      <div>
        <button disabled={isSubmitting} onClick={handleResendVerificationCode}>
          <span className={'ml-3 text-[#0884A2]'}>{isSubmitting ? 'جاري الارسال...' : 'ألم تتلق رسالة؟'}</span>
          قم اعادة ارسال تاكيد البريد الالكتروني
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
