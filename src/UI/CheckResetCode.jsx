import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import { useCheckCode } from "../Features/Registration/useCheckCode.js";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

function CheckResetCode({ setActive }) {
  const { checkCode, isLoading } = useCheckCode();
  const queryClient = useQueryClient();
  const { email } = queryClient.getQueryData(["forgetPassword"]);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const handleBack = () => setActive((pre) => pre - 1);
  const onSubmit = (data) => {
    const { resetCode } = data;
    checkCode(
      { resetCode, email },
      {
        onSuccess: () => {
          setActive(3);
          queryClient.setQueryData(["forgetPassword"], { resetCode, email });
        },
      },
    );
  };
  return (
    <div className={"mt-10 space-y-10 font-Almarai-light"}>
      <Heading>التحقق من الرمز</Heading>
      <p className={"w-full text-lg text-gray-600"}>
        لقد أرسلنا رسالة للبريد الإلكتروني <span className={"mx-3 text-blue-500"}>{email}</span>تحتوي علي رمز التحقق
      </p>
      <p className={"text-lg text-gray-700"}>يرجى تفقّد بريدك الإلكتروني للعثور على الرسالة التي تحتوي على الرمز.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-8"}>
        <input
          type={"text"}
          className={"w-full rounded-lg border-2 border-gray-300 p-2"}
          placeholder={"ادخل الكود"}
          {...register("resetCode", {
            required: "الرمز مطلوب",
            minLength: {
              value: 6,
              message: "الرمز يجب ان يكون 6 ارقام",
            },
            maxLength: {
              value: 6,
              message: "الرمز يجب ان يكون 6 ارقام",
            },
          })}
        />
        <span className={"text-sm text-primary"}>{errors?.resetCode?.message}</span>
        <div className={"flex gap-10 font-Almarai-light"}>
          <Button type={"blue"} disabled={isLoading} className={"w-full"}>
            {isLoading ? "جاري التحقق..." : "تحقق"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckResetCode;
