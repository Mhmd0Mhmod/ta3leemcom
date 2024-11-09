import { useUserContext } from "../Context/UserProvider.jsx";
import LoginButton from "./LoginButton.jsx";
import SignupButton from "./SignupButton.jsx";
import UserName from "./UserName.jsx";

function Registration({ className }) {
  const { useUser, useLogout } = useUserContext();
  const user = useUser();
  const logout = useLogout();
  const { role, name } = user || {};

  return (
    <div className={`text-xl ${className}`}>
      {role ? (
        <UserName name={name} logout={logout} />
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
