import Menu from "../Context/Menu.jsx";
import NotificationSVG from "/public/Icons/notificationNavBar.svg";
import NotificationList from "./NotificationList.jsx";

function NotificationIcon() {
  return (
    <div className={"relative"}>
      <Menu.Trigger name={"notification"}>
        <NotificationSVG className={"h-16 w-fit"} />
      </Menu.Trigger>
      <Menu.List name={"notification"} className={"absolute left-0 z-[11] rounded-lg bg-white ring ring-gray-400"}>
        <NotificationList />
      </Menu.List>
    </div>
  );
}

export default NotificationIcon;
