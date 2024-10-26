import { useState } from 'react';
import NotificationList from './NotificationList';
import NotifiacitionIcon from '/public/Icons/notificationNavBar.svg';
import Exit from '/public/Icons/exit.svg';

import NotificationsProvider from '@/Context/Notifications/Notifications';
const Notifications = () => {
  const [open, setOpen] = useState(false);

  return (
    <NotificationsProvider>
      <div className="relative">
        <NotifiacitionIcon className={'mt-5 w-3/4 cursor-pointer'} onClick={() => setOpen(!open)} />
        {open && (
          <>
            <div className="relative">
              <NotificationList className={'absolute left-0 z-50 w-[551px] rounded-lg bg-white shadow-lg'} />
              <Exit className={'absolute left-4 top-4 z-50 w-6 cursor-pointer'} onClick={() => setOpen(!open)} />
            </div>
          </>
        )}
      </div>
    </NotificationsProvider>
  );
};

export default Notifications;
