import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useForgetPasswordForm } from "../Features/Registration/useForgetPasswordForm.js";
import { useQueryClient } from "@tanstack/react-query";

function ForgetPasswordForm({ setActive }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { forgetPassword, isLoading } = useForgetPasswordForm();
  const queryClient = useQueryClient();
  function onSubmit(data) {
    forgetPassword(data.email, {
      onSuccess: () => {
        setActive(2);
        queryClient.setQueryData(["forgetPassword"], data);
      },
    });
  }

  return (
    <div className={"mt-10 space-y-16 font-Almarai-light"}>
      <Heading as={"h1"}>نسيت كلمة المرور؟</Heading>
      <p className={"text-lg text-gray-700"}>لاعادة تعيين كلمة مرورك قم بادخال بريدك الالكتروني.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5"}>
        <label htmlFor="email" className={"text-xl text-gray-500"}>
          البريد الالكتروني
        </label>
        <input
          type={"email"}
          className={"w-full rounded-lg border-2 border-gray-300 p-2"}
          {...register("email", {
            required: "البريد الالكتروني مطلوب",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "البريد الالكتروني غير صحيح",
            },
          })}
        />

        <Button disabled={isLoading} type={"blue"} className={"w-full"}>
          {isLoading ? "جاري الارسال..." : "ارسال"}
        </Button>
      </form>
    </div>
  );
}

export default ForgetPasswordForm;
