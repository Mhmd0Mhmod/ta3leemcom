import { useState } from "react";
import TeacherLogin from "./TeacherLogin.jsx";
import StudentLogin from "./StudentLogin.jsx";
import Button from "./Button.jsx";
import Heading from "./Heading.jsx";

function LoginOptions() {
  const [role, setRole] = useState(null);
  if (role) {
    return <div className={"w-1/2 space-y-20 p-8"}>{role === "Student" ? <StudentLogin /> : <TeacherLogin />}</div>;
  }

  return (
    <div className={"w-1/2 space-y-20 p-8"}>
      <div className="flex flex-col gap-10">
        <div className="mt-8 flex">
          <Heading as={"h1"}>مرحبا بك 👋</Heading>
        </div>
        <p className="w-64 text-gray-500">يرجى اختيار نوع الحساب الذي ترغب في تسجيل الدخول به</p>
      </div>
      <div className="flex content-center">
        <div className="m-auto flex w-3/4 flex-col gap-20">
          <Button onClick={() => setRole("Student")} type={"outlineBlue"}>
            طالب
          </Button>
          <Button onClick={() => setRole("Teacher")} type={"outlineBlue"}>
            معلم
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginOptions;
