import Readed from '/public/Icons/readed.svg';
import NotificationListItem from './NotificationListItem';

import Heading from '@/UI-Global/Heading';
import { useNotifications } from '@/Context/Notifications/Notifications';
import { Link } from 'react-router-dom';
function NotificationList({ className }) {
  const { limitedNotifications, unreadNotificationCount, makeNotificationReaded } = useNotifications();
  console.log(limitedNotifications);

  return (
    <div className={className}>
      <div className="p-4">
        <Heading as={'h2'}>الاشعارات</Heading>
        <p className="text-gray-400">تابع أحدث التحديثات والأنشطة المتعلقة بحسابك من خلال الإشعارات</p>
      </div>
      <div className="flex gap-8 bg-[#F0F0F0] p-4">
        <Heading as={'h4'}>الكل</Heading>
        <Heading as={'h4'} className="text-gray-400">
          غير مقروء ({unreadNotificationCount})
        </Heading>
        <Heading as={'h4'} className="ml-0 mr-auto flex cursor-pointer text-[#0884A2]" onClick={makeNotificationReaded}>
          تحديد الكل كمقروء
          <Readed />
        </Heading>
      </div>
      <ul className="p-4">
        {limitedNotifications.map((day) => (
          <div className="mt-5" key={day.date}>
            <span className="text-gray-400">{day.date}</span>
            {day.notifications.map((notification) => (
              <NotificationListItem key={notification.notificationId} notification={notification} />
            ))}
          </div>
        ))}
      </ul>
      <Link to={'notifications'} className="mb-4 flex w-full justify-center bg-[#F0F0F0] p-2">
        عرض الكل
      </Link>
    </div>
  );
}
export default NotificationList;
