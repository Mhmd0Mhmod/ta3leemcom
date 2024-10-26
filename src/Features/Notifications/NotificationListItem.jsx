import UnReaded from '/public/Icons/farosDot.svg';
import UnReadedAdminNotif from '/public/Icons/adminNotification.svg';
import ReadedAdminNotif from '/public/Icons/readedAdminNotification.svg';
function NotificationListItem({ notification }) {
  const format = new Date(notification.dateTime).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const formattedDate = format?.split(',').slice(0, -1);
  const formattedTime = format?.split(',').at(-1);

  return (
    <li className="ltr flex border-b-2 p-4">
      <div className="mr-auto">
        {!notification.isReaded && notification.notificationType === 'Server' && <UnReaded />}
        {!notification.isReaded && notification.notificationType === 'Admin' && <UnReadedAdminNotif />}
        {notification.isReaded && notification.notificationType === 'Admin' && <ReadedAdminNotif />}
      </div>
      <div className="w-10/12">
        <p>{notification.message}</p>
        <div className="flex justify-between text-gray-400">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </li>
  );
}
export default NotificationListItem;
