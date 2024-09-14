import { useLocation, Link, useSearchParams } from "react-router-dom";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import Button from "./ui-local/Button.jsx";
import ArrowLeft from "../../public/Icons/leftArrow.svg";
import Drop from '../../public/Icons/drop2.svg'
import Profile from "../../public/Icons/profile-unfill.svg";
import Logout from "../../public/Icons/logout.svg";

import { useState } from "react";
import Triangle from "../../public/Icons/tringle list.svg";
const currentUser = {
    role: "student",
    name: "Ahmed",
}
export default function Header() {
 const location = useLocation();
 const currentPath = location.pathname;
 const [searchParam, setSearchParam] = useSearchParams();
 const tabs = searchParam.get("tabs")||null;
 const [tabsList, setTabsList] = useState(tabs);
 const [openList , setOpenList] = useState(false);
const role = "student";

 return (
  <>
   <nav className={"relative flex justify-between font-almaria ml-10 mb-3"}>
    <div className={"flex items-center gap-4"}>
     {/* <img src={logo} alt={"Icon"} /> */}
     <Logo />
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
         <div className={"w-[3px] h-10  bg-[#605E5E] "}/>
        <div className={"flex gap-[10px] items-center text-2xl"}>
             <span>الطالب</span>
            <Drop/>
        </div>
    </div>
    {role === "student" &&  <div className={"relative self-center"}>
        <Button
            className={"flex items-center gap-2 bg-transparent border-0 !text-[#605E5E]"}
            onClick={() =>setOpenList(openList=>!openList) }
        >
            {currentUser.name}
            <Drop className={`${openList ? "" : "rotate-180"} duration-300`}/>
        </Button>
        {openList && <ul className={"border absolute z-40 top-16 left-2 bg-white flex flex-col gap-4 rounded p-2 "}>
            <Triangle className="absolute -top-5 left-5" width={25} height={25} />
            <li className={"w-48 flex items-center gap-4 cursor-pointer text-xl p-1 rounded duration-300 hover:bg-[#B4D3E0]"}
                onClick={() => setSearchParam({profile: currentUser.name})}>
                <Profile/>
                <span>الملف الشخصي</span>
            </li>
            <li className={"w-48 flex items-center gap-4 cursor-pointer text-xl p-1 rounded duration-300 hover:bg-[#FFB2B3] "} onClick={() => setSearchParam({mr: "logout"})}>
                <Logout/>
            <span>تسجيل الخروج</span>
            </li>
        </ul>}
    </div>}
    {role === "teacher" &&  <></>}
    {!role && (
        <div className={"flex items-center gap-[10px]"}>
         <Button
             type={"ghost"}
             className={"border-0 "}
             onClick={() => setSearchParam({mr: "login"})}
         >
          تسجيل الدخول
         </Button>
         <Button
             type={"primary"}
             className={"flex items-center gap-2"}
             onClick={() => setSearchParam({mr: "signUp"})}
         >
          انضم إلينا
          <ArrowLeft className={"w-7"}/>
         </Button>
        </div>)}
   </nav>
  </>
 );
}
