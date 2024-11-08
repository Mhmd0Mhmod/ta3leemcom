import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
import Arrow from "/public/Icons/arrow-back.svg";
import ForgetPassword from "./ForgetPassword.jsx";
import { useForm } from "react-hook-form";
import Mail from "/public/Icons/mail.svg";
import Lock from "/public/Icons/Vector.svg";
import { teacherLogin } from "../Stores/authStore.js";

import { useCloseModal } from "../Context/Modal.jsx";
import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserProvider.jsx";

function TeacherLogin() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { useLogin, setIsLogin } = useUserContext();
  const { mutate, isLoading } = useLogin(teacherLogin);
  const [forgetPassword, setForgetPassword] = useState(false);
  const close = useCloseModal();
  const { errors } = formState;
  if (forgetPassword)
    return (
      <>
        <Arrow className={"l absolute inset-y-4 right-[45%] h-10 w-10 cursor-pointer"} onClick={toggleForgetPassword} />
        <ForgetPassword />
      </>
    );

  function onSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        setIsLogin(true);
        toast.success("تم تسجيل الدخول بنجاح, مرحبا بك 👋");
        reset();
        close();
      },
    });
  }

  function toggleForgetPassword(e) {
    e.preventDefault();
    setForgetPassword((prev) => !prev);
  }

  return (
    <>
      <Heading as={"h2"} className={"mt-10 text-center"}>
        تسجيل الدخول
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4 text-gray-600">
        <Heading as={"h4"}>البريد الالكتروني</Heading>
        <div>
          <div className={"flex gap-10 rounded-md border-2 border-gray-400 p-2"}>
            <Mail className={"h-6 w-6"} />
            <input
              type="text"
              className="w-full focus:outline-0"
              {...register("email", {
                required: "البريد الالكتروني مطلوب",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "البريد الالكتروني غير صحيح",
                },
              })}
              placeholder={"example@example.com"}
            />
          </div>
          <span className="text-sm text-red-500">{errors?.email?.message}</span>
        </div>

        <Heading as={"h4"}>كلمة المرور</Heading>
        <div>
          <div className={"flex gap-10 rounded-md border-2 border-gray-400 p-2"}>
            <Lock className={"h-6 w-6"} />
            <input
              type="password"
              className="w-full focus:outline-0"
              {...register("password", {
                required: "كلمة المرور مطلوبة",
              })}
              placeholder={"********"}
            />
          </div>
          <span className="text-sm text-red-500">{errors?.password?.message}</span>
        </div>

        <Button type="blue" className={"disabled:cursor-not-allowed disabled:bg-blue-500"}>
          {isLoading ? "جاري التسجيل..." : "سجل الدخول"}
        </Button>
      </form>
      <div className="text-left">
        <Button type={"normal"} className={"text-gray-600 underline"} onClick={toggleForgetPassword}>
          نسيت كلمة المرور ؟
        </Button>
      </div>
    </>
  );
}

export default TeacherLogin;
