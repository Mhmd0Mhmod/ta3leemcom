import Heading from '@/UI-Global/Heading.jsx';
import Exit from './Exit.jsx';
import EmailVerify from '/public/Icons/veify-email.svg';
function VerifyEmail({ email }) {
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
      <div className={'space-y-5 text-[#6D6C6C]'}>
        <p>
          لقد أرسلنا رسالة للبريد الإلكتروني <span className={'mx-3 text-[#0884A2]'}> {email} </span> للتأكيد من صحة عنوانك الإلكتروني.
        </p>
        <p>قبل أن تتمكن من تسجيل الدخول ، الرجاء الضغط على الرابط عبر البريد الالكتروني لإكمال التسجيل بنجاح</p>
      </div>
      <hr className={'w-10/12'} />
      <div>
        <p>
          <span className={'ml-3 text-[#0884A2]'}>ألم تتلق رسالة؟</span>
          قم اعادة ارسال تاكيد البريد الالكتروني
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
