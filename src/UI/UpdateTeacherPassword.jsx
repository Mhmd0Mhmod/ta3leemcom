import { useForm } from "react-hook-form";
import Button from "./Button";
import Heading from "./Heading";
import { useUpdatePassword } from "../Features/TeacherData/useUpdatePassword";
import toast from "react-hot-toast";

function UpdateTeacherPassword() {
  const { updatePassword, isPending, error } = useUpdatePassword();
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { errors } = formState;
  function onSubmit(data) {
    const { currentPassword, newPassword } = data;
    console.log(data);

    const toastId = toast.loading("جاري تحديث كلمه المرور");
    updatePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success("تم تحديث كلمه المرور بنجاح");
          toast.dismiss(toastId);
        },
        onError: (error) => {
          toast.error(error?.message || "حدث خطأ ما , يرجى المحاولة مرة أخرى");
          toast.dismiss(toastId);
        },
      },
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 rounded-md border-2 p-4 md:w-3/4">
      <Heading as="h4">كلمه المرور الحاليه</Heading>
      <input
        type="password"
        {...register("currentPassword", {
          required: "هذا الحقل مطلوب",
          minLength: { value: 8, message: "يجب ان تكون كلمه المرور 8 احرف على الاقل" },
        })}
        className="w-3/4 rounded-md border-2 bg-gray-200 p-2"
      />
      {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
      <Heading as="h4">كلمه المرور الجديده</Heading>
      <input
        type="password"
        {...register("newPassword", {
          required: "هذا الحقل مطلوب",
          minLength: { value: 8, message: "يجب ان تكون كلمه المرور 8 احرف على الاقل" },
        })}
        className="w-3/4 rounded-md border-2 bg-gray-200 p-2"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <Heading as="h4">تأكيد كلمه المرور</Heading>
      <input
        type="password"
        {...register("confirmPassword", {
          required: "هذا الحقل مطلوب",
          minLength: { value: 8, message: "يجب ان تكون كلمه المرور 8 احرف على الاقل" },
          validate: (value) => value === getValues("newPassword") || "كلمه المرور غير متطابقه",
        })}
        className="w-3/4 rounded-md border-2 bg-gray-200 p-2"
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      <div className="mr-auto w-fit">
        <Button type={"Secondary"}>حفظ التعديلات</Button>
      </div>
    </form>
  );
}
export default UpdateTeacherPassword;
