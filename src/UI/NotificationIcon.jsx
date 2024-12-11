import Menu from "../Context/Menu.jsx";
import NotificationSVG from "/public/Icons/notificationNavBar.svg";
import NotificationList from "./NotificationList.jsx";
import { useNotifications } from "../Features/Notifications/useNotifications.js";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as signalR from "@microsoft/signalr";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";
function NotificationIcon() {
  const token = useAuthHeader() || null;
  const queryClient = useQueryClient();
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://api.ta3lemcom.com/notificationHub`, {
        accessTokenFactory: () => token.slice(7),
        withCredentials: true,
      })
      .configureLogging(signalR.LogLevel.None)
      .build();
    connection
      .start()
      .then(() => {
        console.log("Connected to the SignalR hub! ");
        // Listen for incoming notifications
        connection.on("ReceiveNotification", (message) => {
          // console.log('Notification received:', message);
          toast.success(message);
          queryClient.refetchQueries(["notifications"]);
        });
        // Listen for incoming notifications
        connection.onclose((error) => {
          console.error("Connection closed:", error);
        });
      })
      .catch((error) => {
        console.error("Error establishing connection:", error);
      });
    return () => {
      connection.stop();
    };
  }, [token, queryClient]);
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
