import Heading from '@/UI-Global/Heading.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import { useState } from 'react';
import Button from '@/UI-Global/Button.jsx';
import { handleBack } from '@/lib/helpers.js';
import toast from 'react-hot-toast';
import axios from 'axios';

function ForgetPasswordStep1({ setEmail, setActive }) {
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmission(e) {
    e.preventDefault();
    if (mail.trim()) {
      setLoading(true);
      try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/forget-password', { email: mail.trim() });
        if (res.status === 200) {
          toast.success(res.data);
          setActive((active) => active + 1);
          setEmail(mail.trim());
        }
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('الرجاء ادخال البريد الالكتروني');
    }
  }
  return (
    <div className={'mt-10 space-y-16 font-almaria-light'}>
      <Heading as={'h1'} className={'font-almaria'}>
        نسيت كلمة المرور؟
      </Heading>
      <p className={'text-[15px] !text-[#515151]'}>لاعادة تعيين كلمة مرورك قم بادخال بريدك الالكتروني.</p>
      <form onSubmit={handleSubmission}>
        <div className={'space-y-7'}>
          <label htmlFor="" className={'text-xl text-[#A6A6A6]'}>
            البريد الالكتروني
          </label>
          <FormInput type={'email'} name={'email'} placeholder={'example@example.com'} Icon={Mail} className={'w-full text-end'} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div className={'mt-10 flex justify-between font-almaria-light'}>
          <Button className={'border-none !bg-[#E4E6EB] !text-black'} onClick={handleBack}>
            الغاء
          </Button>
          <Button disabled={loading} type={'Secondary'}>
            {loading ? 'جاري الارسال...' : 'ارسال'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPasswordStep1;
