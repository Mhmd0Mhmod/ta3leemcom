import Heading from '@/UI-Global/Heading.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import { useState } from 'react';
import Button from '@/UI-Global/Button.jsx';
import { handleBack } from '@/lib/helpers.js';

function ForgetPasswordStep1({ setEmail, setActive }) {
  const [mail,setMail]=useState('');
  function handleSubmission(e) {
    e.preventDefault();
    setActive((active) => active + 1);
    setEmail(mail);
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
          <Button className={'border-none !bg-[#E4E6EB] !text-black'} onClick={handleBack}>الغاء</Button>
          <Button type={'Secondary'}>إرسال</Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPasswordStep1;