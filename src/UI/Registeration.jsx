import Button from "./Button.jsx";
import { IoArrowBackSharp } from "react-icons/io5";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Registeration({ className }) {
  const user = useAuthUser();
  const { role, name } = user ||{};
  return (
    <div className={`text-xl ${className}`}>
      {role ? (
        <span>{name}</span>
      ) : (
        <>
          <Button className={"bg-transparent text-primary"}>
            تسجيل الدخول
          </Button>
          <Button type="primary" className={"flex items-center"}>
            انضم الينا
            <IoArrowBackSharp />
          </Button>
        </>
      )}
    </div>
  );
}

export default Registeration;
