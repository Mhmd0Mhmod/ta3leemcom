import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import ModalWithRoutes from "../Context/ModalWithRoutes.jsx";
import { useForm } from "react-hook-form";
import { useSignup } from "../Features/Registration/useSignup.js";

function SignupForm() {
  const navigate = ModalWithRoutes.useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signup, isLoading: isSubmitting, error } = useSignup();

  function onSubmit(data) {
    const bodyData = {
      name: data.firstName + " " + data.secondName + " " + data.thirdName,
      email: data.email,
      password: data.password,
      Role: "Teacher",
      PhoneNumber: data.phone,
      userName: data.email.split("@")[0],
    };
    signup(bodyData, {
      onSuccess: () => {
        navigate("teacherLogin");
        reset();
      },
    });
  }

  return (
    <>
      <Heading className={"text-center"}>انشئ حسابك</Heading>
      <form className={"!mt-4 flex h-4/6 flex-col justify-between space-y-2"} onSubmit={handleSubmit(onSubmit)}>
        <Heading as={"h4"} className={"text-Secondary-100"}>
          الاسم الثلاثي
        </Heading>
        <div className={"flex justify-between gap-4"}>
          <div className={"flex flex-col"}>
            <input
              type={"text"}
              className={"w-full rounded border-2 text-2xl"}
              {...register("firstName", {
                required: "الاسم الاول مطلوب",
              })}
            />
            <span className={"text-sm text-primary"}>{errors?.firstName?.message}</span>
          </div>

          <div className={"flex flex-col"}>
            <input
              type={"text"}
              className={"w-full rounded border-2 text-2xl"}
              {...register("secondName", {
                required: "الاسم الثاني مطلوب",
              })}
            />
            <span className={"text-sm text-primary"}>{errors?.secondName?.message}</span>
          </div>
          <div className={"flex flex-col"}>
            <input
              type={"text"}
              className={"w-full rounded border-2 text-2xl"}
              {...register("thirdName", {
                required: "الاسم الثالث مطلوب",
              })}
            />
            <span className={"text-sm text-primary"}>{errors?.thirdName?.message}</span>
          </div>
        </div>
        <Heading as={"h4"} className={"text-Secondary-100"}>
          رقم الهاتف
        </Heading>
        <div className={"flex flex-col"}>
          <input
            type={"tel"}
            className={"rounded border-2 text-2xl"}
            {...register("phone", {
              required: "رقم الهاتف مطلوب",
            })}
          />

          <span className={"text-sm text-primary"}>{errors?.phone?.message}</span>
        </div>
        <Heading as={"h4"} className={"text-Secondary-100"}>
          البريد الالكتروني
        </Heading>

        <div className={"flex flex-col"}>
          <input
            type={"email"}
            className={"rounded border-2 text-2xl"}
            {...register("email", {
              required: "البريد الالكتروني مطلوب",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "البريد الالكتروني غير صحيح",
              },
            })}
          />
          <span className={"text-sm text-primary"}>{errors?.email?.message}</span>
        </div>
        <Heading as={"h4"} className={"text-Secondary-100"}>
          كلمة المرور
        </Heading>
        <div className={"flex flex-col"}>
          <input
            type={"password"}
            className={"rounded border-2 text-2xl"}
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
          <span className={"text-sm text-primary"}>{errors?.password?.message}</span>
        </div>
        <Button type={"blue"} disabled={isSubmitting} className={"disabled:cursor-not-allowed disabled:bg-blue-500"}>
          {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
        </Button>
      </form>
      <div className="flex justify-between">
        <ModalWithRoutes.Trigger to={"loginOptions"}>
          <Button type={"normal"} className={"text-gray-600 underline"}>
            هل لديك حساب بالفعل ؟
          </Button>
        </ModalWithRoutes.Trigger>
      </div>
    </>
  );
}

export default SignupForm;
