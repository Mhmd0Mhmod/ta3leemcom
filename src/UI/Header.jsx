import Registeration from "./Registeration.jsx";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import NavBarLinks from "./NavBarLinks.jsx";
import Toggle from "./Menu.jsx";
import { IoReorderThreeOutline } from "react-icons/io5";
import Menu from "./Menu.jsx";
import { useEffect, useState } from "react";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className={"flex items-center gap-4 whitespace-nowrap pl-10"}>
      <div className={"w-64 overflow-hidden"}>
        <Logo className={"w-full"} />
      </div>
      <NavBarLinks className={"hidden xl:flex xl:gap-8 2xl:gap-10"} />
      <Registeration className={"mr-auto flex"} />
      {windowWidth < 1280 && (
        <Menu>
          <Menu.Icon name={"navbarLinks"}>
            <IoReorderThreeOutline />
          </Menu.Icon>
          <Menu.List name={"navbarLinks"}>
            <div
              className={
                "fixed right-3/4 top-10 z-10 h-fit w-full rounded-lg bg-gray-200 p-4"
              }
            >
              <Menu.Icon name={"navbarLinks"}>
                <IoReorderThreeOutline />
              </Menu.Icon>
              <NavBarLinks className={"space-y-4 divide-y divide-gray-500"} />
            </div>
          </Menu.List>
        </Menu>
      )}
    </nav>
  );
}

export default Header;
