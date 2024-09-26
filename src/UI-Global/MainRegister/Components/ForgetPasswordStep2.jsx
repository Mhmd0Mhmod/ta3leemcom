import { useState } from 'react';
import Heading from '@/UI-Global/Heading.jsx';
import Button from '@/UI-Global/Button.jsx';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp.jsx';
import { handleBack } from '@/lib/helpers.js';
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgetPasswordStep2({ email, setActive }) {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  async function handleSubmission(e) {
    e.preventDefault();
    if (!value || value?.length !== 6) {
      toast.error('يرجى إدخال الرمز بشكل صحيح');
      return;
    } else {
      setLoading(true);
      try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/check-reset-code', { email: email, resetCode: value });
        if (res.status === 200) {
          toast.success(res.data);
          setActive((active) => active + 1);
          setPin(value);
        }
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    }
  }
  async function handleResendCode() {
    try {
      setLoading(true);
      const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/forget-password', { email });
      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={'mt-10 space-y-10 font-almaria-light'}>
      <Heading as={'h1'} className={'font-almaria'}>
        التحقق من الرمز
      </Heading>
      <p className={'max-w-full text-[18px] !text-[#515151]'}>
        لقد أرسلنا رسالة للبريد الإلكتروني <span className={'mx-3 text-[#0884A2]'}>{email}</span>تحتوي علي رمز التحقق{' '}
      </p>
      <p className={'text-[18px] text-[#515151]'}>يرجى تفقّد بريدك الإلكتروني للعثور على الرسالة التي تحتوي على الرمز.</p>
      <form onSubmit={handleSubmission}>
        <div className={'ltr space-y-7'}>
          <InputOTP  maxLength={6} value={value} onChange={(value) => setValue(value)}>
            <InputOTPGroup className={'ltr w-full'}>
              <InputOTPSlot index={0} className={'w-1/3'} />
              <InputOTPSlot index={1} className={'w-1/3'} />
              <InputOTPSlot index={2} className={'w-1/3'} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className={'ltr w-full'}>
              <InputOTPSlot index={3} className={'w-1/3'} />
              <InputOTPSlot index={4} className={'w-1/3'} />
              <InputOTPSlot index={5} className={'w-1/3'} />
            </InputOTPGroup>
          </InputOTP>

          <button disabled={loading} type="button" onClick={handleResendCode} className={'text-end text-[#0884A2] hover:underline'}>
            ألم تتلق رمزًا؟
          </button>
        </div>
        <div className={'mt-10 flex justify-between font-almaria-light'}>
          <Button className={'border-none !bg-[#E4E6EB] !text-black'} onClick={handleBack}>
            الغاء
          </Button>
          <Button type={'Secondary'} disabled={loading}>
            {loading ? 'جاري التحقق...' : 'تحقق'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPasswordStep2;
