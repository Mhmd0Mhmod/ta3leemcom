import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import Heading from "./Heading";
import Button from "./Button";
import { useUpdateTeacherData } from "../Features/TeacherData/useUpdateTeacherData";
import toast from "react-hot-toast";

function UpdateTeacherData() {
  const { name, phone } = useAuthUser() || {};
  const splitName = name.split(" ").filter((n) => n.trim());

  const { updateData, isPending, error } = useUpdateTeacherData();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      teacherName: splitName,
      phone,
    },
  });
  const { errors } = formState;
  function onSubmit(data) {
    data.teacherName = data.teacherName.map((el) => el.trim()).join(" ");
    const toastId = toast.loading("جاري تحديث البعانات");
    updateData(data, {
      onSuccess: () => {
        toast.success("تم تحديث البيانات بنجاح");
        toast.dismiss(toastId);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 rounded-md border-2 p-4 md:w-3/4">
      <Heading as="h4">الاسم الكامل</Heading>
      <div className="flex w-3/4 flex-col justify-between gap-4 md:flex-row">
        <input type="text" {...register("teacherName[0]")} className="rounded-md border-2 bg-gray-200 p-2" />
        <input type="text" {...register("teacherName[1]")} className="rounded-md border-2 bg-gray-200 p-2" />
        <input type="text" {...register("teacherName[2]")} className="rounded-md border-2 bg-gray-200 p-2" />
      </div>
      <Heading as="h4">رقم الهاتف</Heading>
      <div>
        <input
          type="number"
          {...register("phone", {
            required: "هذا الحقل مطلوب",
            minLength: { value: 11, message: "يجب ان يكون الرقم 11 ارقام" },
            maxLength: { value: 11, message: "يجب ان يكون الرقم 11 ارقام" },
          })}
          className="w-3/4 rounded-md border-2 bg-gray-200 p-2"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      <div className="mr-auto w-fit">
        <Button type={"Secondary"}>حفظ التعديلات</Button>
      </div>
    </form>
  );
}
export default UpdateTeacherData;
