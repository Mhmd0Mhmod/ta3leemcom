import React from "react";
import Profile from '../../../../public/imgs/Profile (2).svg'
import { Teacher } from "@/config.js";
export default function PersonalProfile() {
  const teacher = Teacher
  return (
    <>
      <div className="flex justify-between items-center mt-10 px-10">
        <div className="flex items-center gap-4">
          <Profile/>
          <div>
            <p className="font-cairo-bold text-lg">{teacher.name}</p>
            <p className="text-lg">{teacher.email}</p>
          </div>
        </div>
        <div>
          <button className="bg-[#0884A2] text-white w-[100px] h-[40px] ml-20 rounded-lg
          font-cairo-bold">تعديل</button>
        </div>
      </div>

      <div className="ms-10 mt-10">
        <div>
          <h2 className="font-cairo-bold text-xl">
          الاسم الكامل
          </h2>
          <div className="w-[65%] h-[40px] bg-[#EFEFEF] rounded-sm text-lg flex items-center p-6 mt-3">
            {teacher.name}
          </div>
        </div>

        <div className="flex mt-6 gap-16">
          <div>
            <h2 className="font-cairo-bold text-xl">
            رقم الهاتف
            </h2>
            <div className="bg-[#EFEFEF] h-[40px]  rounded-sm text-lg flex items-center p-6 mt-3 w-[320px]">
              {teacher.phone}
            </div>
          </div>
          <div>
            <h2 className="font-cairo-bold text-xl">
            البريد الالكتروني
            </h2>
            <div className="bg-[#EFEFEF] h-[40px] rounded-sm text-lg flex items-center p-6 mt-3 w-[365px]">
              {teacher.email}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
