import React from "react";
import exit from "../../public/Icons/exit.svg";
import Card from "../../public/Icons/card.svg";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "./ui/Button.jsx";
import FormInput from "./ui/FormInput.jsx";
import mail from "../../public/Icons/mail.svg";
import lock from "../../public/Icons/Vector.svg";
import Heading from "./ui/Heading.jsx";

export default function TeacherLoginForm() {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <>
      <div className="p-9  font-almaria relative">
        <img
          src={exit}
          alt={"exitIcon"}
          className={"cursor-pointer"}
          onClick={(e) => {
            e.preventDefault();
            navigate(loaction.pathname);
          }}
        />

        <h2 className="font-almaria-bold text-center text-3xl mt-16">تسجيل الدخول</h2>
        {/* ----------- */}
        <div className="flex flex-col justify-center h-[500px]">
          <div>
            <Heading as={"h4"} className={"my-4 text-[#A6A6A6]"}>
              البريد الالكتروني
            </Heading>
            <FormInput type={"email"} name={"email"} placeholder={"example@example.com"} icon={mail} className={"w-full text-end"} />
          </div>
          <div>
            <Heading as={"h4"} className={"my-4 text-[#A6A6A6]"}>
              كلمة المرور
            </Heading>
            <FormInput type={"password"} name={"password"} placeholder={"كلمة المرور"} icon={lock} className={"w-full"} />
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <input type="checkbox" className="me-2" />
              <label>تذكرني</label>
            </div>

            <p className="text-secondary">نسيت كلمة المرور ؟</p>
          </div>
          <div className="text-center mt-8">
            <Button type="Secondary" className={"py-4 px-[4rem] font-almaria-light"}>
              سجل الدخول
            </Button>
          </div>
        </div>
        {/* ------------- */}

        <div className="absolute bottom-6 right-8  text-[#A6A6A6]">
          <button onClick={() => setSearchParam({ mr: "login", login: "student" })} className={"underline"}>
            تسجيل الدخول كطالب
          </button>
        </div>
      </div>
    </>
  );
}
