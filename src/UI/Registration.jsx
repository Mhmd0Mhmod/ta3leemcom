import Button from "./Button.jsx";
import { IoArrowBackSharp } from "react-icons/io5";
import Menu, { useCloseMenu } from "../Context/Menu.jsx";
import Logout from "/public/Icons/logout.svg";
import Drop from "/public/Icons/drop2.svg";
import Triangle from "/public/Icons/tringle list.svg";
import SmallProfile from "/public/Icons/profile-unfill.svg";
import Modal from "../Context/Modal.jsx";
import LoginOptions from "./LoginOptions.jsx";
import ModalRightStyle from "./ModalRightStyle.jsx";
import { useUserContext } from "../Context/UserProvider.jsx";

function Registration({ className }) {
  const { useUser, useLogout } = useUserContext();
  const user = useUser();
  const logout = useLogout();
  const close = useCloseMenu();
  const { role, name } = user || {};
  function handleLogout() {
    logout();
    close();
  }
  return (
    <div className={`text-xl ${className}`}>
      {role ? (
        <div className={"relative"}>
          <>
            <Menu.Trigger name={"userMenu"}>
              <div className={"flex items-center gap-2 text-xl"}>
                <span>{name}</span>
                <Drop />
              </div>
            </Menu.Trigger>
            <Menu.List name={"userMenu"} className={"relative"}>
              <ul className={"absolute left-2 top-2 z-40 flex flex-col gap-4 rounded border bg-white p-2"}>
                <Triangle className="absolute -top-5 left-2 w-20" />
                <li className={"flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#B4D3E0]"}>
                  <SmallProfile />
                  <span>الملف الشخصي</span>
                </li>
                <li onClick={handleLogout} className={"flex w-48 cursor-pointer items-center gap-4 rounded p-1 text-xl duration-300 hover:bg-[#FFB2B3]"}>
                  <Logout />
                  <span>تسجيل الخروج</span>
                </li>
              </ul>
            </Menu.List>
          </>
        </div>
      ) : (
        <Modal>
          <Modal.Trigger id={"login"}>
            <Button className={"bg-transparent text-primary"} onClick={() => {}}>
              تسجيل الدخول
            </Button>
          </Modal.Trigger>
          <Modal.Content id={"login"}>
            <div className={"flex h-full w-full"}>
              <LoginOptions />
              <ModalRightStyle />
            </div>
          </Modal.Content>
          <Button type="primary" className={"flex items-center"}>
            انضم الينا
            <IoArrowBackSharp />
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Registration;
