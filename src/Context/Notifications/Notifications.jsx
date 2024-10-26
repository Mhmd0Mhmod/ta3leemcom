import { createContext, useContext, useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import * as signalR from '@microsoft/signalr';
import { getNotifications, setAllNotificationsAsRead } from '@/Features/Notifications/helpers';
import toast from 'react-hot-toast';
const notificationContext = createContext();
function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [limitedNotifications, setLimitedNotifications] = useState([]);
  const token = useAuthHeader();

  const { teacherId } = useAuthUser();
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://ta3leemcom-api.runasp.net/notificationHub`, {
        accessTokenFactory: () => token.slice(7),
        // withCredentials: true,
      }) // Replace with your backend URL
      .configureLogging(signalR.LogLevel.None)
      .build();
    connection
      .start()
      .then(() => {
        console.log('Connected to the SignalR hub! ');
        // Listen for incoming notifications
        connection.on('ReceiveNotification', (message) => {
          // console.log('Notification received:', message);
          // setNotifications((prev) => [...prev, message]);
          toast.success(message);
          fetchNotifications(token, teacherId).then((notifications) => {
            setNotifications(notifications);
            setLimitedNotifications(
              notifications?.reduce((acc, { date, notifications }) => {
                const remainingSlots = 5 - acc.reduce((sum, { notifications }) => sum + notifications.length, 0);
                if (remainingSlots > 0) {
                  acc.push({
                    date,
                    notifications: notifications.slice(0, remainingSlots),
                  });
                }
                return acc;
              }, []),
            );
          });
        });

        // Add additional logging to check if the event is being triggered
        connection.onclose((error) => {
          console.error('Connection closed:', error);
        });
      })
      .catch((err) => console.error('Connection failed: ', err));
    return () => {
      connection.stop().then(() => console.log('Connection stopped.'));
    };
  }, [token]);
  useEffect(() => {
    fetchNotifications(token, teacherId).then((notifications) => {
      setNotifications(notifications);
      setLimitedNotifications(
        notifications?.reduce((acc, { date, notifications }) => {
          const remainingSlots = 5 - acc.reduce((sum, { notifications }) => sum + notifications.length, 0);
          if (remainingSlots > 0) {
            acc.push({
              date,
              notifications: notifications.slice(0, remainingSlots),
            });
          }
          return acc;
        }, []),
      );
    });
  }, [token, teacherId]);

  const unreadNotificationCount = notifications?.reduce((count, { notifications }) => {
    return count + notifications.filter((notification) => !notification.isReaded).length;
  }, 0);
  const makeNotificationReaded = () => {
    setAllNotificationsAsRead(teacherId).then(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((day) => ({
          ...day,
          notifications: day.notifications.map((notification) => ({ ...notification, isReaded: true })),
        })),
      );
    });
  };

  return <notificationContext.Provider value={{ notifications, limitedNotifications, unreadNotificationCount, makeNotificationReaded }}>{children}</notificationContext.Provider>;
}
export const useNotifications = () => {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
export default NotificationsProvider;

async function fetchNotifications(token, teacherId) {
  let notifications = [];
  await getNotifications(token, teacherId).then((res) => {
    const formattedNotifications = Object.entries(
      res.data.reduce((acc, notification) => {
        const notificationDate = new Date(notification.dateTime);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        let dateKey;
        if (notificationDate.toDateString() === today.toDateString()) {
          dateKey = 'اليوم';
        } else if (notificationDate.toDateString() === yesterday.toDateString()) {
          dateKey = 'الامس';
        } else {
          dateKey = notificationDate.toLocaleDateString('en-GB');
        }

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(notification);
        return acc;
      }, {}),
    )
      .map(([date, notifications]) => ({ date, notifications: [...notifications].sort((a, b) => new Date(b.dateTimeu) - new Date(a.dateTime)) }))
      .sort((a, b) => new Date(b.notifications[0].dateTime) - new Date(a.notifications[0].dateTime));

    notifications = formattedNotifications;
  });
  return notifications;
}
