import Logout from "/public/Icons/logout.svg";
import Drop from "/public/Icons/drop2.svg";
import Triangle from "/public/Icons/tringle list.svg";
import SmallProfile from "/public/Icons/profile-unfill.svg";
import Menu, { useCloseMenu } from "../Context/Menu";
function UserName({ name, logout }) {
  const close = useCloseMenu();
  console.log(close);

  function handleLogout() {
    logout();
    close?.();
  }
  return (
    <div className="relative">
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
    </div>
  );
}
export default UserName;
