import UnReaded from "/public/Icons/farosDot.svg";
import UnReadedAdminNotif from "/public/Icons/adminNotification.svg";
import ReadedAdminNotif from "/public/Icons/readedAdminNotification.svg";
import { Link } from "react-router-dom";

function NotificationListItem({ notification }) {
  const formatDate = new Date(notification.dateTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formatTime = new Date(notification.dateTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <li className={"whitespace-break-spaces rounded-lg bg-white px-4 py-2"}>
      <Link to={notification.notificationType === "Server" ? `/TDashboard/test/${notification.quizId}/results` : ""}>
        <div className={"flex items-center justify-between"}>
          <p className={"w-full text-gray-600"}>{notification.message}</p>
          {!notification.isReaded && notification.notificationType === "Server" && <UnReaded />}
          {!notification.isReaded && notification.notificationType === "Admin" && <UnReadedAdminNotif />}
          {notification.isReaded && notification.notificationType === "Admin" && <ReadedAdminNotif />}
        </div>
        <div className={"flex items-center justify-between"}>
          <p className={"text-gray-400"}>{formatTime}</p>
          <p className={"text-gray-400"}>{formatDate}</p>
        </div>
      </Link>
    </li>
  );
}

export default NotificationListItem;
