import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import { useForm } from "react-hook-form";
import Mail from "/public/Icons/mail.svg";
import Lock from "/public/Icons/Vector.svg";
import { teacherLogin } from "../Features/Registration/authHelpers.js";
import { useCloseModal } from "../Context/Modal.jsx";
import toast from "react-hot-toast";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";
import { useLogin } from "../Features/Registration/useLogin.js";
import { login as reduxLogin } from "/src/Reducers/AuthReducer.js";
import { useDispatch } from "react-redux";

function TeacherLogin() {
  const { register, handleSubmit, reset, formState } = useForm();
  const dispatch = useDispatch();

  const { login, isPending, error } = useLogin(teacherLogin);
  const close = useCloseModal();
  const { errors } = formState;
  const navigate = ModalWithRoutes.useNavigate();

  function onSubmit(data) {
    const toastId = toast.loading("جاري تسجيل الدخول");
    login(data, {
      onSuccess: () => {
        toast.success("تم تسجيل الدخول بنجاح", { id: toastId });
        reset();
        close();
        dispatch(reduxLogin());
      },
      onError: (error) => {
        toast.error(error.message, { id: toastId });
      },
    });
  }

  function navigateToForgetPassword() {
    close();
    navigate("forgetPassword");
  }

  return (
    <>
      <Heading as={"h2"} className={"mt-5 text-center"}>
        تسجيل الدخول
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-0 flex flex-col justify-center space-y-4 text-gray-600">
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

        <Button type="blue" disabled={isPending} className={"disabled:cursor-not-allowed disabled:bg-blue-500"}>
          {isPending ? "جاري التسجيل..." : "سجل الدخول"}
        </Button>
      </form>
      <div className="flex justify-between">
        <ModalWithRoutes.Trigger to={"forgetPassword"} className={"text-gray-600 underline"}>
          <Button type={"normal"} className={"text-gray-600 underline"} onClick={navigateToForgetPassword}>
            نسيت كلمة المرور ؟
          </Button>
        </ModalWithRoutes.Trigger>
        <ModalWithRoutes.Trigger to={"signup"} className={"text-gray-600 underline"}>
          <Button type={"normal"} className={"text-gray-600 underline"}>
            ليس لديك حساب ؟
          </Button>
        </ModalWithRoutes.Trigger>
      </div>
    </>
  );
}

export default TeacherLogin;
