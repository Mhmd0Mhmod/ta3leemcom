import React from "react";
import { Teacher } from "@/config.js";
import Profile from "../../../../public/imgs/Profile (2).svg";
import Heading from "./ui-local/Heading";
import FormInput from "./ui-local/FormInput";
import Back from "../../../../public/Icons/arrow_back.svg";
import { Link, useNavigate } from "react-router-dom";
export default function EditTeacherProfile() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const teacher = Teacher;
  return (
    <>
      <Back
        className={"absolute left-8 top-4 cursor-pointer"}
        onClick={goBack}
      />
      <div className="flex items-center gap-4 mt-8 ms-8">
        <Profile />
        <div>
          <p className="font-cairo-bold text-lg">{teacher.name}</p>
          <p className="text-lg text-[#808080]">{teacher.email}</p>
        </div>
      </div>
      <div className="mt-8 ms-8 border-2 border-[#E7E7E7] py-4 w-[90%] rounded-md">
        <Heading
          as={"h2"}
          className={"font-almaria-bold border-b-2 border-[#E7E7E7] pb-3 ps-4"}
        >
          تعديل الملف الشخصي
        </Heading>
        <div>
          <Heading as={"h3"} className={"font-almaria-bold ps-4 mt-4"}>
            الاسم الكامل
          </Heading>
          <div className={"flex gap-10 ms-4 mt-6 w-[70%]"}>
            <div className="w-[22%] h-[60px] border-2 border-[#B5B5B5] rounded-lg text-2xl text-[#B5B5B5] flex items-center justify-center">
              ابراهيم
            </div>
            <div className="w-[22%] h-[60px] border-2 border-[#B5B5B5] rounded-lg text-2xl text-[#B5B5B5] flex items-center justify-center">
              محمد
            </div>
            <div className="w-[22%] h-[60px] border-2 border-[#B5B5B5] rounded-lg text-2xl text-[#B5B5B5] flex items-center justify-center">
              مشرف
            </div>
          </div>
          <div className="ms-4 mt-4">
            <Heading as={"h3"} className={"font-almaria-bold mt-6"}>
              رقم الهاتف
            </Heading>
            <div className="mt-4 pe-2 w-[55%] h-[60px] border-2 border-[#B5B5B5] rounded-lg text-2xl text-[#B5B5B5] flex items-center justify-end">
              {teacher.phone}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-[#0884A2] text-white font-almaria-bold w-[15%] h-[60px] mx-6 mt-6 rounded-lg text-xl">
              حفظ التغير
            </button>
          </div>
        </div>
      </div>
      {/* ------------------------ */}
      <div className="mt-8 ms-8 border-2 border-[#E7E7E7] py-4 w-[90%] rounded-md">
        <Heading
          as={"h2"}
          className={"font-almaria-bold border-b-2 border-[#E7E7E7] pb-3 ps-4"}
        >
          تغير كلمة السر
        </Heading>
        <div>
          <Heading as={"h4"} className={"m-4 font-almaria-bold"}>
            كلمة السر الحالية
          </Heading>
          <div className="w-[70%] mt-2 ms-4">
            <FormInput
              type={"password"}
              name={"password"}
              placeholder={"كلمة المرور"}
              className={"w-full"}
            />
            <div className="flex justify-end mt-2 underline	text-[#0884A2]">
              <Link>نسيت كلمة المرور ؟</Link>
            </div>
          </div>
        </div>
        <div>
          <Heading as={"h4"} className={"m-4 font-almaria-bold"}>
            كلمة السر الجديدة
          </Heading>
          <div className="w-[70%] mt-2 ms-4">
            <FormInput
              type={"password"}
              name={"password"}
              placeholder={"كلمة المرور"}
              className={"w-full"}
            />
          </div>
        </div>
        <div>
          <Heading as={"h4"} className={"m-4 font-almaria-bold"}>
            تاكيد كلمة السر الجديدة
          </Heading>
          <div className="w-[70%] mt-2 ms-4">
            <FormInput
              type={"password"}
              name={"password"}
              placeholder={"كلمة المرور"}
              className={"w-full"}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#0884A2] text-white font-almaria-bold w-[15%] h-[60px] mx-6 mt-6 rounded-lg text-xl">
            تغير كلمة السر
          </button>
        </div>
      </div>
    </>
  );
}
