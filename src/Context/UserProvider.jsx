import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../Features/Registration/useUser.js";
import { useLogin } from "../Features/Registration/useLogin.js";
import { useLogout } from "../Features/Registration/useLogout.js";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const logout = useLogout();
  useEffect(() => {}, []);

  function handleUseLogout() {
    return function () {
      logout();
      setIsLogin(false);
    };
  }

  return (
    <UserContext.Provider
      value={{
        useUser,
        useLogin,
        setIsLogin,
        useLogout: handleUseLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
