import { useState } from "react";
import ForgetPasswordForm from "./ForgetPasswordForm.jsx";
import CheckResetCode from "./CheckResetCode.jsx";
import NewPassword from "./NewPassword.jsx";

function ForgetPassword() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div>
        <div className={"mx-auto flex items-center justify-around"}>
          {[1, 2, 3].map((idx) => (
            <div key={idx} className={`border- rounded-full border p-1 ${active === idx ? "border-red-500" : ""}`}>
              <div className={`h-8 w-8 rounded-full ${active === idx ? "bg-red-500" : ""}`}></div>
            </div>
          ))}
        </div>
        <div className={"flex justify-between"}>
          {["البريد الالكتروني", "رمز التحقق", "كلمة المرور الجديده"].map((step) => (
            <span key={step} className={"font-almaria-bold w-32 text-center text-[15px]"}>
              {step}
            </span>
          ))}
        </div>
        {active === 1 && <ForgetPasswordForm setActive={setActive} />}
        {active === 2 && <CheckResetCode setActive={setActive} />}
        {active === 3 && <NewPassword />}
      </div>
    </div>
  );
}

export default ForgetPassword;
