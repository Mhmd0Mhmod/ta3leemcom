import Heading from "./Heading.jsx";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNewPassword } from "../Features/Registration/useNewPassword.js";
import Button from "./Button.jsx";
import toast from "react-hot-toast";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";

function NewPassword() {
  const queryClient = useQueryClient();
  const { email, resetCode } = queryClient.getQueryData(["forgetPassword"]);
  const navigate = ModalWithRoutes.useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();
  const { newPassword, isLoading } = useNewPassword();
  const onSubmit = (data) => {
    newPassword(
      { email, resetCode, newPassword: data.password },
      {
        onSuccess: () => {
          queryClient.setQueryData(["forgetPassword"], null);
          reset();
          toast.success("تم تغيير كلمة المرور بنجاح");
          navigate("teacherLogin");
        },
      },
    );
  };
  return (
    <div className={"font-almaria-light mt-10 space-y-10"}>
      <Heading as={"h1"} className={"font-almaria"}>
        قم باعادة كلمة المرور
      </Heading>
      <p className={"max-w-full text-[18px] !text-[#515151]"}>لاعادة تعيين كلمة المرور قم بادخال كلمة المرور الجديده.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-16"}>
        <div className={"space-y-7"}>
          <label htmlFor="" className={"text-xl text-[#A6A6A6]"}>
            كلمة المرور الجديدة
          </label>
          <input
            type={"password"}
            className={"w-full rounded-lg border-2 border-[#E5E5E5] p-2"}
            {...register("password", {
              required: "كلمة المرور مطلوبة",
              validate: (value) => {
                const isValidLength = value.length >= 8;
                const hasNumber = /\d/.test(value);
                const hasUpperCase = /[A-Z]+/.test(value);
                const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                return (
                  (isValidLength && hasNumber && hasUpperCase && hasSymbol) || "كلمة المرور يجب أن تكون 8 أحرف على الأقل، وتحتوي على رقم واحد على الأقل، حرف كبير واحد ورمز واحد"
                );
              },
            })}
          />
        </div>

        <Button disabled={isLoading} type={"blue"} className={"w-full disabled:bg-blue-400"}>
          {isLoading ? "جاري الارسال..." : "ارسال"}
        </Button>
      </form>
    </div>
  );
}

export default NewPassword;
