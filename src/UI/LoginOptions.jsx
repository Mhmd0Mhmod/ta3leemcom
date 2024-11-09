import { useState } from "react";
import TeacherLogin from "./TeacherLogin.jsx";
import StudentLogin from "./StudentLogin.jsx";
import Button from "./Button.jsx";
import Heading from "./Heading.jsx";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";

function LoginOptions() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="mt-8 flex">
          <Heading as={"h1"}>مرحبا بك 👋</Heading>
        </div>
        <p className="w-64 text-gray-500">يرجى اختيار نوع الحساب الذي ترغب في تسجيل الدخول به</p>
      </div>
      <div className="flex content-center">
        <div className="m-auto flex w-3/4 flex-col gap-20">
          <ModalWithRoutes.Trigger to={"studentLogin"}>
            <Button type={"outlineBlue"}>طالب</Button>
          </ModalWithRoutes.Trigger>
          <ModalWithRoutes.Trigger to={"teacherLogin"}>
            <Button type={"outlineBlue"}>معلم</Button>
          </ModalWithRoutes.Trigger>
        </div>
      </div>
    </>
  );
}

export default LoginOptions;
