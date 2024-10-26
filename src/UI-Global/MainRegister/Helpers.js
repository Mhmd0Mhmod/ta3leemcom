import * as signalR from '@microsoft/signalr';

import Cookies from 'js-cookie';
const token = Cookies.get('_auth');
const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://ta3leemcom-api.runasp.net/notificationHub`, {
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }) // Replace with your backend URL
  .configureLogging(signalR.LogLevel.Information)
  .build();
export function openConnectionSignalR(setNotifications) {
  connection
    .start()
    .then(() => {
      console.log('Connected to the SignalR hub! ');
      // Listen for incoming notifications
      connection.on('ReceiveNotification', (message) => {
        console.log('Notification received:', message);
        setNotifications((prev) => [...prev, message]);
      });

      // Add additional logging to check if the event is being triggered
      connection.onclose((error) => {
        console.error('Connection closed:', error);
      });
    })
    .catch((err) => console.error('Connection failed: ', err));
}
export function closeConnectionSignalR() {
  connection.stop().then(() => console.log('Connection stopped.'));
}
