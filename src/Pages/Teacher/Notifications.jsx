import { useNotifications } from "../../Features/Notifications/useNotifications.js";
import Loading from "../../UI/Loading.jsx";
import NotificationListItem from "../../UI/NotificationListItem.jsx";
import { X } from "lucide-react";
import Heading from "../../UI/Heading.jsx";
import Readed from "../../../public/Icons/readed.svg";

function Notifications() {
  const { notifications, isLoading, setAllRead, error } = useNotifications();
  const unreadNotificationCount = notifications?.filter((notification) => !notification.isReaded).length;
  if (isLoading) return <Loading />;
  return (
    <div className={"py-3"}>
      <div className={"m-auto w-10/12 pb-5 shadow-md"}>
        <div className={"relative space-y-5 p-4"}>
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
        <ul>
          {notifications.map((notification) => (
            <NotificationListItem key={notification.notificationId} notification={notification} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
