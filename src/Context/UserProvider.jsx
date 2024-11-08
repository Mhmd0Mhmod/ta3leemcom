import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../Hooks/useUser.js";
import { useLogin } from "../Hooks/useLogin.js";
import { useLogout } from "../Hooks/useLogout.js";

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
