import Heading from '@/UI-Global/Heading.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import Button from '@/UI-Global/Button.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import Lock from '../../../../public/Icons/Vector.svg';
import { useState } from 'react';

function ForgetPasswordStep3() {
 const [password , setPassword]=useState();
  function handleSubmission(e) {
    e.preventDefault();
  }
  return (
    <div className={'mt-10 space-y-10 font-almaria-light'}>
      <Heading as={'h1'} className={'font-almaria'}>
        قم باعادة كلمة المرور
      </Heading>
      <p className={'max-w-full text-[18px] !text-[#515151]'}>لاعادة تعيين كلمة المرور قم بادخال كلمة المرور الجديده.</p>
      <form onSubmit={handleSubmission} className={"space-y-16"}>
        <div className={'space-y-7'}>
          <label htmlFor="" className={'text-xl text-[#A6A6A6]'}>
            كلمة المرور الجديدة
          </label>
         <FormInput type={'password'} name={'password'} placeholder={'كلمة المرور'} Icon={Lock} className={'w-full'} onChange={(e) => setPassword(e.target.value)} />
        </div>

          <Button type={'Secondary'} className={"w-full"}>تأكيد</Button>
      </form>
    </div>
  );
}

export default ForgetPasswordStep3;
