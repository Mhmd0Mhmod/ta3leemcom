import LoginButton from "./LoginButton.jsx";
import SignupButton from "./SignupButton.jsx";
import UserName from "./UserName.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useSelector } from "react-redux";
import { isLogin } from "../Reducers/AuthReducer.js";
import NotificationIcon from "./NotificationIcon.jsx";

function Registration({ className }) {
  const isLogined = useSelector(isLogin);
  const { role } = useAuthUser() || {};

  return (
    <div className={`text-xl ${className}`}>
      {isLogined ? (
        <div className={"flex items-center"}>
          <UserName />
          {role === "Teacher" && <NotificationIcon />}
        </div>
      ) : (
        <>
          <LoginButton />
          <SignupButton id={"headerSignUp"} />
        </>
      )}
    </div>
  );
}

export default Registration;
