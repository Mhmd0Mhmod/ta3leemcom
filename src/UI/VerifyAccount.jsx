import Heading from "./Heading.jsx";
import EmailVerify from "/public/Icons/veify-email.svg";
import { useQueryClient } from "@tanstack/react-query";
function VerifyAccount() {
  const clientQuery = useQueryClient();
  const email = clientQuery.getQueryData(["user"])?.email;
  return (
    <div className={"flex flex-col items-center gap-8 p-10 font-cairo"}>
      <Heading as={"h1"} className={"mt-4 text-center"}>
        تأكيد البريد الإلكتروني{" "}
      </Heading>
      <div className={"mt-10 w-full"}>
        <EmailVerify alt={"verifyEmail"} className={"w-full"} />
      </div>

      <div className={"space-y-5 text-[#6D6C6C]"}>
        <p>
          لقد أرسلنا رسالة للبريد الإلكتروني <span className={"mx-3 text-[#0884A2]"}> {email} </span> للتأكيد من صحة عنوانك الإلكتروني.
        </p>
        <p>قبل أن تتمكن من تسجيل الدخول ، الرجاء الضغط على الرابط عبر البريد الالكتروني لإكمال التسجيل بنجاح</p>
      </div>
    </div>
  );
}

export default VerifyAccount;
