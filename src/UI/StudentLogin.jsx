import { useForm } from "react-hook-form";
import Card from "/public/Icons/card.svg";
import Button from "./Button.jsx";

import { studentLogin } from "../Stores/authStore.js";

import Heading from "./Heading.jsx";
import { useCloseModal } from "../Context/Modal.jsx";
import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserProvider.jsx";

function StudentLogin() {
  const { register, handleSubmit, reset } = useForm();
  const { useLogin, setIsLogin } = useUserContext();
  const { mutate, isLoading, error } = useLogin(studentLogin);
  const close = useCloseModal();
  function onSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("تم تسجيل الدخول بنجاح, مرحبا بك 👋");
        reset();
        setIsLogin(true);
        close();
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
            <input type="text" className="w-full focus:outline-0" {...register("code")} placeholder={" XX   XXX  XXX"} />
          </div>
          <div className={"text-center"}>
            <Button type="blue" className={`w-3/5 rounded-md px-2 py-3 text-white disabled:cursor-not-allowed disabled:bg-blue-400`} disabled={isLoading}>
              {isLoading ? "جاري تسجيل الدخول" : "تسجيل الدخول"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default StudentLogin;
