import Registration from "./Registration.jsx";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import NavBarLinks from "./NavBarLinks.jsx";
import { IoReorderThreeOutline } from "react-icons/io5";
import Menu from "./Menu.jsx";

function Header() {
  return (
    <Menu>
      <nav className={"flex items-center gap-4 whitespace-nowrap xl:pl-10"}>
        <div className={"w-64 overflow-hidden"}>
          <Logo className={"w-full"} />
        </div>
        <NavBarLinks className={"hidden xl:flex xl:gap-8 2xl:gap-10"} />
        <Registration className={"mr-auto flex"} />

        {/*<div className={"xl:hidden"}>*/}
        {/*  <Menu.Trigger name={"navbarLinks"}>*/}
        {/*    <IoReorderThreeOutline />*/}
        {/*  </Menu.Trigger>*/}
        {/*  <Menu.List name={"navbarLinks"}>*/}
        {/*    <div className={"fixed right-3/4 top-0 z-10 h-screen w-full rounded-lg bg-gray-200 p-4"}>*/}
        {/*      <Menu.Trigger name={"navbarLinks"}>*/}
        {/*        <IoReorderThreeOutline />*/}
        {/*      </Menu.Trigger>*/}
        {/*      <NavBarLinks className={"space-y-8 divide-y-4 divide-gray-500"} />*/}
        {/*    </div>*/}
        {/*  </Menu.List>*/}
        {/*</div>*/}
      </nav>
    </Menu>
  );
}

export default Header;
