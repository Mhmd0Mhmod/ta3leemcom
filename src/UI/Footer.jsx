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
    <div className="grid max-w-fit grid-rows-[1fr_auto] place-content-center gap-8 overflow-hidden bg-gray-100 p-4 text-center md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr]">
      <FooterColumn
        className={"col-span-2 mt-0 space-y-4 xl:col-span-1"}
        title={<Logo className="w-full" />}
        c
      >
        <FooterColumn.Description>
          نحن منصة تعليمية متكاملة تهدف إلى تسهيل العملية التعليمية من خلال
          تقديم أدوات فعالة للمعلمين، الطلاب، وأولياء الأمور.
        </FooterColumn.Description>
        <FooterColumn.List className="flex justify-center gap-10 !space-y-0">
          <Gmail />
          <Facebook />
          <Instagram />
          <LinkedIn />
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn
        title={"اتصل بنا"}
        className={"col-span-2 space-y-8 xl:col-span-1"}
      >
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
          <Link to="/subscriptions">الاشتراكات</Link>
          <Link to="/instructions">تعليمات</Link>
          <Link to="/services">الخدمات</Link>
          <Link to="/opinion">رأيك يهمنا</Link>
          <Link to="/contact">تواصل معنا</Link>
        </FooterColumn.List>
      </FooterColumn>
      <FooterColumn title={"خدماتنا"} className={"hidden xl:block"}>
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
      <FooterColumn
        title={"تحميل التطبيق"}
        className={"col-span-2 space-y-4 lg:col-span-1"}
      >
        <FooterColumn.Description>
          مسح الباركود لتحميل تطبيق أولياء الأمور
        </FooterColumn.Description>
        <DownloadAppQR className={"m-auto w-32"} />
      </FooterColumn>
      <p className="font-almaria-bold col-span-3 text-center">
        © 2024 جميع الحقوق محفوظة لمنصتنا التعليمية.
      </p>
    </div>
  );
}
