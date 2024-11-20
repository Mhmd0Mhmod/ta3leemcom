import Registration from "./Registration.jsx";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import NavBarLinks from "./NavBarLinks.jsx";
import Menu from "../Context/Menu.jsx";
import { Provider } from "react-redux";
import { store } from "../Stores/ReduxStore.js";

function Header() {
  return (
    <Provider store={store}>
      <Menu>
        <nav className={"flex items-center gap-4 whitespace-nowrap xl:pl-10"}>
          <div className={"w-64 overflow-hidden"}>
            <Logo className={"w-full"} />
          </div>
          <NavBarLinks className={"hidden xl:flex xl:gap-8 2xl:gap-10"} />
          <Registration className={"mr-auto flex"} />
        </nav>
      </Menu>
    </Provider>
  );
}

export default Header;
