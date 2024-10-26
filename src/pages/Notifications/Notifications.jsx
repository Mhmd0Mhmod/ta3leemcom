import NotificationsProvider from '@/Context/Notifications/Notifications';
import NotificationsList from './Components/NotificationsList';

function Notifications() {
  return (
    <>
      <NotificationsProvider>
        <NotificationsList />
      </NotificationsProvider>
    </>
  );
}
export default Notifications;
