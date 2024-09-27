import Exit from '@/UI-Global/MainRegister/Components/Exit.jsx';
import Button from '@/UI-Global/Button.jsx';

function LoginHome({handleButtonClick}) {
 return (
   (
     <div className={'flex flex-col p-9 font-almaria'}>
       <div>
         <Exit/>
       </div>

       <div className="ms-[1.875rem] flex flex-col gap-[1.875rem]">
         <div className="mt-8 flex">
           <h2 className="font-almaria-bold text-4xl">مرحبا بك </h2>
           {/* <img src={hi} alt="Hi" /> */}
         </div>
         <p className="w-[15.625rem] text-[#A6A6A6]">يرجى اختيار نوع الحساب الذي ترغب في تسجيل الدخول به</p>
       </div>

       <div className="flex h-full w-full content-center items-center">
         <div className="m-auto flex w-[70%] flex-col gap-20">
           <div>
             <Button
               className={'w-full rounded border border-[#0562CF] py-3 text-[#0462CF] hover:bg-[#0462CF] hover:text-white'}
               type={'outlineSecondary'}
               onClick={(e) => {
                 e.preventDefault();
                 handleButtonClick('student');
               }}
             >
               طالب
             </Button>
           </div>

           <div>
             <Button className={'w-full border border-[#0562CF] py-3 text-[#0462CF] hover:bg-[#0462CF] hover:text-white'} type={'outlineSecondary'} onClick={() => handleButtonClick('teacher')}>
               معلم
             </Button>
           </div>
         </div>
       </div>
     </div>
   ) );}

export default LoginHome;