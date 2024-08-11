import Heading from "./ui/Heading.jsx";
import Button from "./ui/Button.jsx";
import circles from "../../public/Icons/circles1.svg";
import {useNavigate, useSearchParams} from "react-router-dom";
import SingUpForm from "./SingUpForm.jsx";
import exit from "../../public/Icons/exit.svg";
import StudentLoginForm from "./StudentLoginForm.jsx";
import TeacherLoginForm from "./TeacherLoginForm.jsx";

export default function MainRegister() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const formType = searchParams.get("mr");
    const loginType = searchParams.get("login");
    if (!formType) return null;

    const handleButtonClick = (login) => {
        setSearchParams({mr: formType, login});
    };

    return (
        <>
            <div
                className={"z-20 fixed w-full h-full top-0 left-0 bg-[rgb(0,0,0,0.4)] flex items-center justify-center font-cairo"}
                id={"bg"}
                onClick={(e) => {
                    if (e.target.id === "bg") {
                        navigate("/");
                    }
                }}>
                {/* Right Form */}
                <div className={"grid grid-cols-2 bg-white  w-1/2 rounded-3xl"}>
                    {formType === "login" && !loginType && <div className={"p-9 flex flex-col font-almaria"}>
                        <div>
                            <img src={exit} alt={"exitIcon"} className={"cursor-pointer"} onClick={(e) => {
                                e.preventDefault();
                                navigate("/");
                            }}/>
                        </div>

                        <Button type={"normal"} onClick={(e) => {
                            e.preventDefault();
                            handleButtonClick("student")
                        }}>طالب</Button>
                        <Button type={"normal"} onClick={() => handleButtonClick("teacher")}>معلم</Button>

                    </div>}
                    {formType === "login" && loginType === "student" && <StudentLoginForm/>}
                    {formType === "login" && loginType === "teacher" && <TeacherLoginForm/>}
                    {formType === "signUp" && <SingUpForm/>}
                    {/*Left constant Content  */}
                    <div
                        className={"bg-sign-up&login w-full h-full bg-cover bg-center rounded-3xl flex justify-center items-center relative "}>
                        <div className={"flex flex-col text-white justify-around h-1/4 items-start  "}>
                            <Heading as={"h1"}>
                                تعليم كوم
                            </Heading>
                            <p>تجربة تعليمية ممتعة وسلسة لكافة مستخدمينا</p>
                            <Button type={"normal"}
                                    className={"w-fit text-white bg-blue-600 border-0 text-sm rounded-3xl"}>اعرف
                                المزيد</Button>
                        </div>
                        <div className={"w-96 absolute bottom-0 left-0"}>
                            <img src={circles} alt={"circles"} className={"w-full"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}