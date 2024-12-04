import Heading from "./Heading.jsx";
import { X } from "lucide-react";
import { useCloseMenu } from "../Context/Menu.jsx";
import { useNotifications } from "../Features/Notifications/useNotifications.js";
import Loading from "./Loading.jsx";
import NotificationListItem from "./NotificationListItem.jsx";
import Readed from "/public/Icons/readed.svg";
import { Link } from "react-router-dom";

function NotificationList() {
  const close = useCloseMenu();
  const { notifications, isLoading, setAllRead, error } = useNotifications();

  const unreadNotificationCount = notifications?.filter((notification) => !notification.isReaded).length;
  return (
    <div className={"w-fit pb-4 text-base"}>
      <div className={"relative space-y-5 p-4"}>
        <X onClick={close} className={"absolute left-6 cursor-pointer text-gray-600"} />
        <Heading as={"h3"}>الاشعارات</Heading>
        <p className="text-gray-400">تابع أحدث التحديثات والأنشطة المتعلقة بحسابك من خلال الإشعارات</p>
      </div>
      <div className="flex gap-8 bg-gray-200 p-3">
        <Heading as={"h5"}>الكل</Heading>
        <Heading as={"h5"} className="text-gray-400">
          غير مقروء ({unreadNotificationCount})
        </Heading>
        <Heading as={"h5"} className="mr-auto flex cursor-pointer text-Secondary-500" onClick={setAllRead}>
          تحديد الكل كمقروء
          <Readed />
        </Heading>
      </div>
      {isLoading && <Loading />}
      {!isLoading && notifications.length === 0 && <p className="text-center text-gray-400">لا يوجد اشعارات</p>}
      {!isLoading && notifications.length > 0 && (
        <ul className={"space-y-4 divide-y-2"}>
          {notifications.slice(-5).map((notification) => (
            <NotificationListItem key={notification.notificationId} notification={notification} />
          ))}
        </ul>
      )}
      <Link to="/notifications" onClick={close} className={"block bg-gray-300 py-3 text-center text-gray-700"}>
        عرض الكل
      </Link>
    </div>
  );
}

export default NotificationList;
