import UnReaded from '/public/Icons/farosDot.svg';
import UnReadedAdminNotif from '/public/Icons/adminNotification.svg';
import ReadedAdminNotif from '/public/Icons/readedAdminNotification.svg';
import { Link } from 'react-router-dom';
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
  const validateNotif = (e) => {
    if (notification.notificationType !== 'Server') {
      e.preventDefault();
      return;
    }
  };
  return (
    <li>
      <Link to={`/dashboard/testData/${notification.quizId}`} onClick={validateNotif} className="ltr flex w-full border-b-2 p-4">
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
      </Link>
    </li>
  );
}
export default NotificationListItem;
