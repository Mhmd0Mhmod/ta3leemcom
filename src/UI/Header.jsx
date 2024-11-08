import Registration from "./Registration.jsx";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import NavBarLinks from "./NavBarLinks.jsx";
import Menu from "../Context/Menu.jsx";
import { useEffect, useState } from "react";
import { useCookies } from "../Hooks/useCookies.js";

function Header() {
  const { get } = useCookies();
  const [isLogin, setIsLogin] = useState(get("user") || false);

  return (
    <Menu>
      <nav className={"flex items-center gap-4 whitespace-nowrap xl:pl-10"}>
        <div className={"w-64 overflow-hidden"}>
          <Logo className={"w-full"} />
        </div>
        <NavBarLinks className={"hidden xl:flex xl:gap-8 2xl:gap-10"} />
        <Registration className={"mr-auto flex"} />
      </nav>
    </Menu>
  );
}

export default Header;
