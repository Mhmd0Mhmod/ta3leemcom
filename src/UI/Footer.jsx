import Logo from "/public/Icons/ta3leemComLogo.svg";
import Gmail from "/public/Icons/gmail.svg";
import Facebook from "/public/Icons/facebook.svg";
import Instagram from "/public/Icons/instagram.svg";
import LinkedIn from "/public/Icons/linkedIn.svg";
import FooterColumn from "./FooterColumn.jsx";
import Phone from "/public/Icons/phone.svg";
import ContactMail from "/public/Icons/conectMail.svg";
import DownloadAppQR from "/public/Icons/downloadAppQR.svg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div
      className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr] grid-rows-[1fr_auto] text-center
       max-w-fit overflow-hidden  gap-8 bg-gray-100 p-4 place-content-center">
      <FooterColumn className={"space-y-4 mt-0 col-span-2 xl:col-span-1"} title={<Logo className=" w-full" />} c>
        <FooterColumn.Description>
          نحن منصة تعليمية متكاملة تهدف إلى تسهيل العملية التعليمية من خلال
          تقديم أدوات فعالة للمعلمين، الطلاب، وأولياء الأمور.
        </FooterColumn.Description>
        <FooterColumn.List className="gap-10 flex space-y-0 justify-center">
          <Gmail />
          <Facebook />
          <Instagram />
          <LinkedIn />
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn title={"اتصل بنا"} className={"space-y-8 col-span-2 xl:col-span-1"}>
        <FooterColumn.List>
          <div className="flex gap-7">
            <Phone />
            <span>01000000000</span>
          </div>
          <div className="mt-5 flex gap-7">
            <ContactMail />
            <span>ta3leemcom@outlook.com</span>
          </div>
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn title={"تعليم كوم"} className={"hidden lg:block"}>
        <FooterColumn.List>
          <Link to="/about">عن</Link>
          <Link to='/subscriptions'>الاشتراكات</Link>
          <Link to='/instructions'>تعليمات</Link>
          <Link to='/services'>الخدمات</Link>
          <Link to='/opinion'>رأيك يهمنا</Link>
          <Link to='/contact'>تواصل معنا</Link>
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn title={"خدماتنا"} className={"hidden xl:block" }>
        <FooterColumn.List>
          <span>الطلاب</span>
          <span>المعلمون</span>
          <span>أولياء الأمور</span>
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn className={"hidden xl:block"}>
        <FooterColumn.List>
          <span>انضم إلينا</span>
          <span>تسجيل الدخول</span>
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn title={"تحميل التطبيق"} className={"space-y-4 col-span-2 lg:col-span-1"}>
        <FooterColumn.Description>
          مسح الباركود لتحميل تطبيق أولياء الأمور
        </FooterColumn.Description>
        <DownloadAppQR className={"w-32"}/>
      </FooterColumn>
      <p className="col-span-full text-center font-almaria-bold">© 2024 جميع الحقوق محفوظة لمنصتنا التعليمية.</p>
    </div>
  );
}
