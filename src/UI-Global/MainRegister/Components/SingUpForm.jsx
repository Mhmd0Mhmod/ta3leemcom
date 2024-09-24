import Exit from "../../../../public/Icons/exit.svg";
import Heading from "../../Heading.jsx";
import FormInput from "../../FormInput.jsx";
import Profile from "../../../../public/Icons/profile.svg";
import Phone from "../../../../public/Icons/call.svg";
import Mail from "../../../../public/Icons/mail.svg";
import Lock from "../../../../public/Icons/Vector.svg";
import Button from "../../Button.jsx";
import {
 Link,
 useLocation,
 useNavigate,
 useSearchParams,
} from "react-router-dom";

function SingUpForm() {
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const locaiton = useLocation();
 return (
  <form className={"p-9 flex flex-col font-almaria"}>
   <div>
    <Exit
     alt={"exitIcon"}
     className={"cursor-pointer"}
     onClick={(e) => {
      e.preventDefault();
      navigate(locaiton.pathname);
     }}
    />
   </div>
   <Heading
    as={"h1"}
    className={"font-almaria-bold text-3xl text-black text-center"}
   >
    انشئ حسابك
   </Heading>

   <Heading as={"h4"} className={"text-secondary-l my-4 "}>
    الاسم الثلاثي
   </Heading>
   <div className={"flex justify-between"}>
    <FormInput
     type={"text"}
     name={"name"}
     placeholder={"الاسم الأول"}
     Icon={Profile}
     className={"w-[70px] "}
    />
    <FormInput
     type={"text"}
     name={"name"}
     placeholder={"الاسم الثاني"}
     className={"w-[70px]"}
    />
    <FormInput
     type={"text"}
     name={"name"}
     placeholder={"الاسم الثالث"}
     className={"w-[70px]"}
    />
   </div>
   <Heading as={"h4"} className={"text-secondary-l my-4"}>
    رقم الهاتف
   </Heading>
   <FormInput
    type={"Number"}
    name={"phone"}
    placeholder={"رقم الهاتف"}
    Icon={Phone}
    className={"w-full"}
   />
   <Heading as={"h4"} className={"text-secondary-l my-4"}>
    البريد الالكتروني
   </Heading>
   <FormInput
    type={"email"}
    name={"email"}
    placeholder={"example@example.com"}
    Icon={Mail}
    className={"w-full text-end"}
   />
   <Heading as={"h4"} className={"text-secondary-l my-4"}>
    كلمة المرور
   </Heading>
   <FormInput
    type={"password"}
    name={"password"}
    placeholder={"كلمة المرور"}
    Icon={Lock}
    className={"w-full"}
   />
   <Heading
    as={"h4"}
    className={"text-secondary-l my-4 hidden"}
    id={"password-level"}
   >
    * كلمة المرور يجب ان تحتوي على 8 احرف على الاقل واحرف كبيرة وصغيرة وارقام
    ورموز
   </Heading>
   <Button type={"normal"} className={"w-full my-4 text-white bg-blue-600"}>
    تسجيل
   </Button>
   <Link
    className={"text-secondary-l underline text-accent-l-400"}
    to="/login"
   >
    لديك حساب بالفعل؟
   </Link>
  </form>
 );
}

export default SingUpForm;
