import { useForm } from "react-hook-form";
import Card from "/public/Icons/card.svg";
import Button from "./Button.jsx";

import { studentLogin } from "../Features/Registration/authHelpers.js";

import Heading from "./Heading.jsx";
import { useCloseModal } from "../Context/Modal.jsx";
import toast from "react-hot-toast";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";
import { useLogin } from "../Features/Registration/useLogin.js";
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "../Reducers/AuthReducer.js";

function StudentLogin() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { login, isLoading, error } = useLogin(studentLogin);
  const close = useCloseModal();
  const dispatch = useDispatch();
  function onSubmit(data) {
    const tostId = toast.loading("جاري تسجيل الدخول");
    login(data, {
      onSuccess: () => {
        toast.success("تم تسجيل الدخول بنجاح", { id: tostId });
        reset();
        close();
        dispatch(reduxLogin());
      },
    });
  }

  return (
    <>
      <Heading as={"h2"} className={"mt-10 text-center"}>
        تسجيل الدخول
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-10">
          <label htmlFor="" className="text-xl text-[#A6A6A6]">
            كود االطالب
          </label>
          <div className={"flex gap-10 rounded-md border-2 border-gray-400 p-2"}>
            <Card className={"h-6 w-6"} />
            <input
              type="text"
              className="w-full focus:outline-0"
              {...register("code", {
                required: "الكود مطلوب",
              })}
              placeholder={" XX   XXX  XXX"}
            />
          </div>
          <span className={"text-sm text-red-500"}>{errors?.code?.message}</span>
          <div className={"text-center"}>
            <Button type="blue" className={`w-3/5 rounded-md px-2 py-3 text-white disabled:cursor-not-allowed disabled:bg-blue-400`} disabled={isLoading}>
              {isLoading ? "جاري تسجيل الدخول" : "تسجيل الدخول"}
            </Button>
          </div>
        </div>
      </form>
      <ModalWithRoutes.Trigger to={"teacherLogin"}>
        <Button type="normal" className={"text-gray-600 underline"}>
          تسجيل الدخول كمعلم
        </Button>
      </ModalWithRoutes.Trigger>
    </>
  );
}

export default StudentLogin;
