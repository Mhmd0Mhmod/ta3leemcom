import { useState } from 'react';
import ForgetPasswordStep1 from '@/UI-Global/MainRegister/Components/ForgetPasswordStep1.jsx';
import ForgetPasswordStep2 from '@/UI-Global/MainRegister/Components/ForgetPasswordStep2.jsx';
import ForgetPasswordStep3 from '@/UI-Global/MainRegister/Components/ForgetPasswordStep3.jsx';

function ThreeStepsNewPassword() {
  const [active, setActive] = useState(1);
  const [email, setEmail] = useState('');

  return (
    <div>
      <div className={'mx-auto flex w-9/12 items-center justify-between font-almaria'}>
        {[1, 2, 3].map((idx) => (
          <div key={idx}>
            <div key={idx} className={`min-h-[37px] min-w-[37px] rounded-full border border-[#D9D9D9] p-[2px] ${active === idx ? 'border-[#F54547]' : ''}`}>
              <div className={`h-[31px] w-[31px] rounded-full ${active === idx ? 'bg-[#F54547]' : ''}`}></div>
            </div>

            {idx !== 3 && <hr className={'w-full'} />}
          </div>
        ))}
      </div>
      <div className={'flex justify-between'}>
        {['البريد الالكتروني', 'رمز التحقق', 'كلمة المرور الجديده'].map((step) => (
          <span key={step} className={'w-32 text-center font-almaria-bold text-[15px]'}>
            {step}
          </span>
        ))}
      </div>
      {active === 1 && <ForgetPasswordStep1 setEmail={setEmail} setActive={setActive} />}
      {active === 2 && <ForgetPasswordStep2 email={email} setActive={setActive} />}
      {active === 3 && <ForgetPasswordStep3 email={email} />}
    </div>
  );
}

export default ThreeStepsNewPassword;
