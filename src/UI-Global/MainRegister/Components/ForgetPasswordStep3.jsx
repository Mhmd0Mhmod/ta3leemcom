import Heading from '@/UI-Global/Heading.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import Button from '@/UI-Global/Button.jsx';
import Mail from '../../../../public/Icons/mail.svg';
import Lock from '../../../../public/Icons/Vector.svg';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PasswordStrength } from '@/components/ui/validationMessages';
import { useSearchParams } from 'react-router-dom';

function ForgetPasswordStep3({ email }) {
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isValidPassword, setIsValidPassword] = useState(false);
  async function handleSubmission(e) {
    e.preventDefault();
    if (password && email && isValidPassword) {
      setLoading(true);
      try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/Authentication/reset-password', { email, newPassword: password });
        if (res.status === 200) {
          toast.success(res.data);
          searchParams.delete('forgetPassword');
          setSearchParams(searchParams);
        }
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('حدث خطأ يرجي المحاولة مره اخري');
    }
  }
  return (
    <div className={'mt-10 space-y-10 font-almaria-light'}>
      <Heading as={'h1'} className={'font-almaria'}>
        قم باعادة كلمة المرور
      </Heading>
      <p className={'max-w-full text-[18px] !text-[#515151]'}>لاعادة تعيين كلمة المرور قم بادخال كلمة المرور الجديده.</p>
      <form onSubmit={handleSubmission} className={'space-y-16'}>
        <div className={'space-y-7'}>
          <label htmlFor="" className={'text-xl text-[#A6A6A6]'}>
            كلمة المرور الجديدة
          </label>
          <FormInput type={'password'} name={'password'} placeholder={'كلمة المرور'} Icon={Lock} className={'w-full'} onChange={(e) => setPassword(e.target.value)} />
          {password && <PasswordStrength password={password} setIsValidPassword={setIsValidPassword} />}
        </div>

        <Button disabled={loading || !isValidPassword} type={'Secondary'} className={'w-full disabled:bg-blue-400'}>
          {loading ? 'جاري الارسال...' : 'ارسال'}
        </Button>
      </form>
    </div>
  );
}

export default ForgetPasswordStep3;
