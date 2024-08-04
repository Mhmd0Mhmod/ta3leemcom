import exit from "../../public/login_imgs/exit.svg";
import Heading from "./ui/Heading.jsx";
import FormInput from "./ui/FormInput.jsx";
import profile from "../../public/login_imgs/profile.svg";
import phone from "../../public/login_imgs/call.svg";
import mail from "../../public/login_imgs/mail.svg";
import lock from "../../public/login_imgs/Vector.svg";
import Button from "./ui/Button.jsx";
import {Link} from "react-router-dom";

function SingUpForm() {
    return (
        <form className={"p-9 flex flex-col font-almaria" }>
            <div>
                <img src={exit} alt={"exitIcon"} className={"cursor-pointer"}/>
            </div>
            <Heading as={"h1"} className={"font-almaria-bold text-3xl text-black text-center"}>
                انشئ حسابك
            </Heading>

            <Heading as={"h4"} className={"text-secondary my-4 "}>
                الاسم الثلاثي
            </Heading>
            <div className={"flex justify-between"}>
                <FormInput type={"text"} name={"name"} placeholder={"الاسم الأول"} icon={profile}
                           className={'w-[70px] '}/>
                <FormInput type={"text"} name={"name"} placeholder={"الاسم الثاني"}
                           className={'w-[70px]'}/>
                <FormInput type={"text"} name={"name"} placeholder={"الاسم الثالث"}
                           className={'w-[70px]'}/>
            </div>
            <Heading as={"h4"} className={"text-secondary my-4"}>
                رقم الهاتف
            </Heading>
            <FormInput type={"Number"} name={"phone"} placeholder={"رقم الهاتف"} icon={phone}
                       className={'w-full'}/>
            <Heading as={"h4"} className={"text-secondary my-4"}>
                البريد الالكتروني
            </Heading>
            <FormInput type={"email"} name={"email"} placeholder={"البريد الالكتروني"} icon={mail}
                       className={'w-full'}/>
            <Heading as={"h4"} className={"text-secondary my-4"}>
                كلمة المرور
            </Heading>
            <FormInput type={"password"} name={"password"} placeholder={"كلمة المرور"} icon={lock}
                       className={'w-full'}/>
            <Heading as={"h4"} className={"text-secondary my-4 hidden"} id={"password-level"}>
                * كلمة المرور يجب ان تحتوي على 8 احرف على الاقل واحرف كبيرة وصغيرة وارقام ورموز
            </Heading>
            <Button type={"normal"} className={"w-full my-4 text-white bg-blue-600"}>تسجيل</Button>
            <Link className={"text-secondary underline text-accent-400"} to={"/login"}>لديك حساب
                بالفعل؟</Link>

        </form>
    );
}

export default SingUpForm;