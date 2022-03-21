import React, { createContext, useState } from 'react';
import Notification from '../Components/Notification';

export const NotificationContext = createContext(null);

export default ({ children }) => {
  const [notificationObject, setNotificationObject] = useState(undefined);

  return (
    <>
      <NotificationContext.Provider value={{ setNotificationObject }}>
        {children}
      </NotificationContext.Provider>
      <Notification
        notificationObject={notificationObject}
        setNotificationObject={setNotificationObject}></Notification>
    </>
  );
};
