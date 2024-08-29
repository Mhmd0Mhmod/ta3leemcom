// src/components/Header.jsx
import { useLocation, Link, useSearchParams } from "react-router-dom";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import Button from "./ui-local/Button.jsx";
import Icon from "./ui-local/Icon.jsx";
import { useState } from "react";
export default function Header() {
 const location = useLocation();
 const currentPath = location.pathname;
 const [searchParam, setSearchParam] = useSearchParams();

 return (
  <>
   <nav className={"relative flex justify-between font-almaria ml-10 mb-3"}>
    <div className={"flex"}>
     {/* <img src={logo} alt={"Icon"} /> */}
     <Logo width />
     <ul className={"flex items-center justify-between gap-5 text-3xl "}>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/home" ? "active" : ""
       }`}
      >
       <Link to="/home">الرئيسية</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/about" ? "active" : ""
       }`}
      >
       <Link to="/about">عن</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/services" ? "active" : ""
       }`}
      >
       <Link to="/services">الخدمات</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/instructions" ? "active" : ""
       }`}
      >
       <Link to="/instructions">تعليمات</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/subscriptions" ? "active" : ""
       }`}
      >
       <Link to="/subscriptions">الاشتركات</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/opinion" ? "active" : ""
       }`}
      >
       <Link to="/opinion">رأيك</Link>
      </li>
      <li
       className={`pb-2 hover:text-[#0884A2] duration-500 ${
        currentPath === "/contact-with-us" ? "active" : ""
       }`}
      >
       <Link to="/contact-with-us">تواصل معنا</Link>
      </li>
     </ul>
    </div>
    <div className={"flex items-center gap-[10px]"}>
     <Button
      type={"ghost"}
      className={"border-0 "}
      onClick={() => setSearchParam({ mr: "login" })}
     >
      تسجيل الدخول
     </Button>
     <Button
      type={"primary"}
      className={"flex items-center gap-2"}
      onClick={() => setSearchParam({ mr: "signUp" })}
     >
      انضم إلينا
      <Icon src={"../../public/Icons/leftArrow.svg"} className={"w-7"} />
     </Button>
    </div>
   </nav>
  </>
 );
}
