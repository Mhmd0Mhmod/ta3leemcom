import LoginButton from "./LoginButton.jsx";
import SignupButton from "./SignupButton.jsx";
import UserName from "./UserName.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useSelector } from "react-redux";
import { isLogin } from "../Reducers/AuthReducer.js";

function Registration({ className }) {
  const { name } = useAuthUser() || {};
  const isLogined = useSelector(isLogin);

  return (
    <div className={`text-xl ${className}`}>
      {isLogined ? (
        <UserName name={name.split(" ").slice(0, 3).join(" ")} />
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
