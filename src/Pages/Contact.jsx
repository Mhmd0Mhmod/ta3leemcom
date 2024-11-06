import Heading from "../UI/Heading.jsx";
import Button from "../UI/Button.jsx";
import SendMessage from "/public/Icons/sendmessaage.svg";
import ContactUsPhoto from "/public/Icons/contactusphoto.svg";
import { useForm } from "react-hook-form";
import { useSubmitContact } from "../Features/Contact/useSubmitContact.js";
import toast from "react-hot-toast";

export default function ContactWithUs() {
  const { register, handleSubmit, formState, rest } = useForm();
  const { submitContact, isPending } = useSubmitContact();
  const { errors } = formState;
  const inputStyle =
    "h-12 p-2 border border-[#0884A24D] bg-[#0884A21A]  rounded-md ";
  const labelStyle = "flex flex-col gap-2 flex-grow text-[#6D757D] text-[20px]";
  function onSubmit(data) {
    submitContact(data, {
      onSuccess: () => {
        toast.success("تم ارسال الرسالة بنجاح");
        rest();
      },
      onError: () => {
        toast.error("حدث خطأ اثناء ارسال الرسالة");
      },
    });
  }

  return (
    <div className={"px-16 font-Almarai-bold"}>
      <Heading as={"h1"} className={"text-center"}>
        تواصل معنا
      </Heading>
      <p className={"my-16 text-2xl text-[#0884A2]"}>
        نحن هنا للمساعدة، تواصل معنا
      </p>
      <div className={"xl:flex xl:justify-between"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex w-full flex-col gap-5"}>
            <div className={"flex flex-col gap-5 xl:flex-row"}>
              <label className={labelStyle}>
                الاسم
                <input
                  type="text"
                  disabled={isPending}
                  className={inputStyle}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "الاسم مطلوب",
                    },
                  })}
                />
                <span className={"text-sm text-primary"}>
                  {errors?.name?.message}
                </span>
              </label>
              <label className={labelStyle}>
                البريد الالكتروني
                <input
                  type="email"
                  disabled={isPending}
                  className={inputStyle}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "البريد الالكتروني مطلوب",
                    },
                  })}
                />
                <span className={"text-sm text-primary"}>
                  {errors?.email?.message}
                </span>
              </label>
            </div>
            <label className={labelStyle}>
              الموضوع
              <input
                type="text"
                disabled={isPending}
                className={inputStyle}
                {...register("subject", {
                  required: {
                    value: true,
                    message: "الموضوع مطلوب",
                  },
                })}
              />
              <span className={"text-sm text-primary"}>
                {errors?.subject?.message}
              </span>
            </label>
            <label className={labelStyle}>
              الرسالة
              <textarea
                className={inputStyle + "h-40 resize-none"}
                {...register("message", {
                  required: {
                    value: true,
                    message: "الرسالة مطلوبة",
                  },
                })}
              />
              <span className={"text-sm text-primary"}>
                {errors?.message?.message}
              </span>
            </label>

            <Button
              type={"primary"}
              className={
                "flex items-center justify-center gap-5 self-center text-xl"
              }
            >
              إرسال الرسالة
              <SendMessage />
            </Button>
          </div>
        </form>
        <div className={"hidden w-full items-center justify-center xl:flex"}>
          <ContactUsPhoto />
        </div>
      </div>
    </div>
  );
}
