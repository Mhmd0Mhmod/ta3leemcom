import { useState } from 'react';
import Heading from '@/UI-Global/Heading.jsx';
import Button from '@/UI-Global/Button.jsx';
import { InputOTP , InputOTPGroup,InputOTPSlot  } from '@/components/ui/input-otp.jsx';
import { handleBack } from '@/lib/helpers.js';
function ForgetPasswordStep2({email,setPin ,setActive}) {
  const [value,setValue]=useState();
 function handleSubmission(e){
  e.preventDefault();
  setActive(active=>active+1);
  setPin(value);
 }
 return (
   <div className={"space-y-10 mt-10 font-almaria-light"}>
    <Heading as={'h1'} className={"font-almaria"}>التحقق من الرمز</Heading>
    <p className={"!text-[#515151] text-[18px] max-w-full"}>
     لقد أرسلنا رسالة للبريد الإلكتروني <span className={'mx-3 text-[#0884A2]'}>{email}</span>تحتوي علي رمز التحقق    </p>
      <p className={"text-[#515151] text-[18px]"}>
       يرجى تفقّد بريدك الإلكتروني للعثور على الرسالة التي تحتوي على الرمز.
      </p>
    <form onSubmit={handleSubmission}>
      <div className={"space-y-7"}>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className={"w-full ltr"}>
              <InputOTPSlot index={0} className={"w-1/6"} />
              <InputOTPSlot index={1} className={"w-1/6"}/>
              <InputOTPSlot index={2} className={"w-1/6"}/>
              <InputOTPSlot index={3} className={"w-1/6"}/>
              <InputOTPSlot index={4} className={"w-1/6"}/>
              <InputOTPSlot index={5} className={"w-1/6"}/>
            </InputOTPGroup>
          </InputOTP>

        <p className={"text-end text-[#0884A2]"}>ألم تتلق رمزًا؟</p>
      </div>
      <div className={"flex justify-between mt-10 font-almaria-light"}>
        <Button className={"!bg-[#E4E6EB] !text-black border-none"} onClick={handleBack}>الغاء</Button>
        <Button type={"Secondary"}>إرسال</Button>
      </div>
    </form>
   </div>
 );
}

export default ForgetPasswordStep2;