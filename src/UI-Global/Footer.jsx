import Heading from './Heading.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import Logo from '/public/Icons/logo.svg';
export default function Footer() {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <div className="bg-[#D9D9D94D] p-5">
      <div className="flex gap-36">
        <div className="flex w-[22%] flex-col justify-center gap-7">
          <div className="w-64">
            <Logo className="h-fit w-full" />
          </div>
          <p className="text-[16px]">نحن منصة تعليمية متكاملة تهدف إلى تسهيل العملية التعليمية من خلال تقديم أدوات فعالة للمعلمين، الطلاب، وأولياء الأمور.</p>
          <div className="flex justify-center gap-10">
            <img className={'cursor-pointer'} src="Icons/gmail.svg" alt="twitter" />
            <img className={'cursor-pointer'} src="Icons/facebook.svg" alt="facebook" />
            <img className={'cursor-pointer'} src="Icons/instagram.svg" alt="instagram" />
            <img className={'cursor-pointer'} src="Icons/linkedIn.svg" alt="linkedin" />
          </div>
        </div>
        <div className="flex flex-1 justify-between pt-10">
          <div>
            <Heading as={'h2'} className="font-almaria-bold text-[24px]">
              اتصل بنا
            </Heading>
            <ul className="mt-12 text-[#605E5E]">
              <li className="flex gap-7">
                <img src="Icons/phone.svg" alt="phone" />
                <span>01000000000</span>
              </li>
              <li className="mt-5 flex gap-7">
                <img src="Icons/conectMail.svg" alt="mail" />
                <span>ta3leemcom@outlook.com</span>
              </li>
            </ul>
          </div>
          <div>
            <Heading as={'h2'} className="font-almaria-bold text-[24px]">
              تعليم كوم
            </Heading>
            <ul className="mt-10 flex flex-col gap-5 text-[#605E5E]">
              <li>
                <Link to={'about'}>عن</Link>
              </li>
              <li>
                <Link to={'subscriptions'}>الاشتراكات</Link>
              </li>
              <li>
                <Link to={'opinion'}>رأيك يهمنا</Link>
              </li>
              <li>
                <Link to={'contact-with-us'}>تواصل معنا</Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading as={'h2'} className="font-almaria-bold text-[24px]">
              خدماتنا
            </Heading>
            <ul className="mt-10 flex flex-col gap-5 text-[#605E5E]">
              <li>الطلاب</li>
              <li>المعلمون</li>
              <li>أولياء الأمور</li>
            </ul>
          </div>
          <div>
            <ul className="mt-24 flex cursor-pointer flex-col gap-5 text-[#605E5E]">
              <li onClick={() => setSearchParam({ mr: 'signUp' })}>انضم إلينا</li>
              <li onClick={() => setSearchParam({ mr: 'login' })}>تسجيل الدخول</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <Heading as={'h2'} className="font-almaria-bold text-[24px]">
            تحميل التطبيق
          </Heading>
          <p>مسح الباركود لتحميل تطبيق أولياء الأمور</p>
          <div className="w-64">
            <img src="Icons/downloadAppQR.svg" alt="downloadAppQR" />
          </div>
        </div>
      </div>
      <p className="mt-10 text-center font-almaria-bold">© 2024 جميع الحقوق محفوظة لمنصتنا التعليمية.</p>
    </div>
  );
}
