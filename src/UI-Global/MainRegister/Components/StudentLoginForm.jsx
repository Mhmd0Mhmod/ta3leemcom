import React from "react";
import Exit from "../../../../public/Icons/exit.svg";
import Card from "../../../../public/Icons/card.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../Button.jsx";
import FormInput from "../../FormInput.jsx";
export default function StudentLoginForm() {
 const navigate = useNavigate();
 const [searchParam, setSearchParam] = useSearchParams();
 const location = useLocation();
 return (
  <>
   <div className="p-9  font-almaria relative">
    <Exit
     alt={"exitIcon"}
     className={"cursor-pointer"}
     onClick={(e) => {
      e.preventDefault();
      navigate(location.pathname);
     }}
    />

    <h2 className="font-almaria-bold text-center text-3xl mt-16">
     تسجيل الدخول
    </h2>

    <div>
     <form>
      <div className="flex flex-col justify-center h-[500px] gap-10">
       <label htmlFor="" className="text-xl text-[#A6A6A6]">
        كود االطالب
       </label>
       <FormInput
        type={"text"}
        placeholder={"       XX   XXX  XXX"}
        className={"w-[330px]"}
        Icon={Card}
       />
       <div>
        <input type="checkbox" className="me-2" />
        <label>تذكرني</label>
       </div>
       <div className="text-center">
        <Button
         type="Secondary"
         className={"py-4 px-[4rem] font-almaria-light"}
        >
         سجل الدخول
        </Button>
       </div>
      </div>
     </form>
    </div>

    <div className="absolute bottom-6 right-8  text-[#A6A6A6]">
     <button
      onClick={() => setSearchParam({ mr: "login", login: "teacher" })}
      className={"underline"}
     >
      تسجيل الدخول كمعلم
     </button>
    </div>
   </div>
  </>
 );
}