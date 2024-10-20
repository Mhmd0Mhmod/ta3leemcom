import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';

import Readed from '/public/Icons/readed.svg';
import NotificationListItem from './NotificationListItem';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { getNotifications } from '@/Features/Notifications/helpers.js';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Heading from '@/UI-Global/Heading';
function NotificationList({ className }) {
  const [notifications, setNotifications] = useState([
    {
      text: 'اشعار جديد',
      id: 1,
    },
  ]);
  const token = useAuthHeader();
  const { teacherId } = useAuthUser();
  // useEffect(() => {
  //   // Create connection to the SignalR hub
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(`${import.meta.env.VITE_API_URL}/Notification/GetAllNotificationOfTeacher?TeacherId=${teacherId}`, {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }) // Replace with your backend URL
  //     .configureLogging(signalR.LogLevel.Information)
  //     .build();

  //   // Start the connection
  //   connection
  //     .start()
  //     .then(() => {
  //       console.log('Connected to the SignalR hub!');

  //       // Listen for incoming notifications
  //       connection.on('ReceiveNotification', (message) => {
  //         setNotifications((prev) => [...prev, message]);
  //       });
  //     })
  //     .catch((err) => console.error('Connection failed: ', err));

  //   return () => {
  //     connection.stop(); // Cleanup connection on unmount
  //   };
  // }, [token, teacherId]);
  // useEffect(() => {
  //   getNotifications(token, teacherId).then((res) => console.log(res));
  // }, [token, teacherId]);

  return (
    <div className={className}>
      <div className="p-4">
        <Heading as={'h2'}>الاشعارات</Heading>
        <p className="text-gray-400">تابع أحدث التحديثات والأنشطة المتعلقة بحسابك من خلال الإشعارات</p>
      </div>
      <div className="flex gap-8 bg-[#F0F0F0] p-4">
        <Heading as={'h4'}>الكل</Heading>
        <Heading as={'h4'} className="text-gray-400">
          غير مقروء
        </Heading>
        <Heading as={'h4'} className="ml-0 mr-auto flex text-[#0884A2]">
          تحديد الكل كمقروء
          <Readed />
        </Heading>
      </div>
      <ul>
        {notifications.map((notification) => (
          <NotificationListItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
}
export default NotificationList;
