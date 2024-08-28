import Heading from "./ui/Heading.jsx";
import Button from "./ui/Button.jsx";
import circles from "../../public/Icons/circles1.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SingUpForm from "./SingUpForm.jsx";
import exit from "../../public/Icons/exit.svg";
import StudentLoginForm from "./StudentLoginForm.jsx";
import TeacherLoginForm from "./TeacherLoginForm.jsx";
export default function MainRegister() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const formType = searchParams.get("mr");
  const loginType = searchParams.get("login");
  const loction = useLocation();
  if (!formType) return null;
  const handleButtonClick = (login) => {
    setSearchParams({ mr: formType, login });
  };

  return (
    <>
      <div
        className={"z-20 fixed w-full h-full top-0 left-0 bg-[rgb(0,0,0,0.4)] flex items-center justify-center font-cairo"}
        id={"bg"}
        onClick={(e) => {
          if (e.target.id === "bg") {
            navigate(loction.pathname);
          }
        }}
      >
        {/* Right Form */}
        <div className={"grid grid-cols-2 bg-white  w-1/2 rounded-3xl h-[45.908rem] "}>
          {formType === "login" && !loginType && (
            <div className={"p-9 flex flex-col font-almaria"}>
              <div>
                <img
                  src={exit}
                  alt={"exitIcon"}
                  className={"cursor-pointer"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(location.pathname);
                  }}
                />
              </div>

              <div className="ms-[1.875rem] flex flex-col gap-[1.875rem]">
                <div className="flex mt-8">
                  <h2 className="text-4xl font-almaria-bold">مرحبا بك </h2>
                  {/* <img src={hi} alt="Hi" /> */}
                </div>
                <p className="w-[15.625rem] text-[#A6A6A6]">يرجى اختيار نوع الحساب الذي ترغب في تسجيل الدخول به</p>
              </div>

              <div className="flex items-center content-center h-full  w-full">
                <div className="flex flex-col gap-20 m-auto w-[70%] ">
                  <div>
                    <Button
                      className={"rounded w-full py-3 border border-[#0562CF] text-[#0462CF] hover:bg-[#0462CF] hover:text-white"}
                      type={"outlineSecondary"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleButtonClick("student");
                      }}
                    >
                      طالب
                    </Button>
                  </div>

                  <div>
                    <Button
                      className={"w-full py-3 border border-[#0562CF] text-[#0462CF] hover:bg-[#0462CF] hover:text-white"}
                      type={"outlineSecondary"}
                      onClick={() => handleButtonClick("teacher")}
                    >
                      معلم
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formType === "login" && loginType === "student" && <StudentLoginForm />}
          {formType === "login" && loginType === "teacher" && <TeacherLoginForm />}
          {formType === "signUp" && <SingUpForm />}

          {/*Left constant Content  */}
          <div className={"bg-sign-up&login w-full h-full bg-cover bg-center rounded-3xl flex justify-center items-center relative "}>
            <div className={"flex flex-col text-white justify-around h-1/4 items-start  "}>
              <Heading as={"h1"}>تعليم كوم</Heading>
              <p>تجربة تعليمية ممتعة وسلسة لكافة مستخدمينا</p>
              <Button type={"normal"} className={"w-fit text-white bg-blue-600 border-0 text-sm rounded-3xl"}>
                اعرف المزيد
              </Button>
            </div>
            <div className={"w-96 absolute bottom-0 left-0"}>
              <img src={circles} alt={"circles"} className={"w-full"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
