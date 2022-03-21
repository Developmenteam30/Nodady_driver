import React, { useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Styles from './Notification.styles';
import NotifIcon from '../../Assets/Images/infoIcon.png';
import CloseIcon from '../../Assets/Images/whitecross.png';

export default props => {
  const handleClose = () => {
    props.setNotificationObject(undefined);
  };

  if (!props.notificationObject) {
    return null;
  }

  useEffect(() => {
    if (!props.notificationObject) {
      return;
    }
    setTimeout(() => {
      props.setNotificationObject(undefined);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        ...Styles.mainSection,
        backgroundColor:
          props.notificationObject.type === 'info'
            ? '#2196f3'
            : props.notificationObject.type === 'error'
            ? '#f44336'
            : '#4caf50',
      }}>
      <View style={Styles.notifIcon}>
        <Image source={NotifIcon} />
      </View>
      <Text style={Styles.notifMessage}>
        {props.notificationObject.message}
      </Text>
      <TouchableOpacity style={Styles.closeBtn} onPress={() => handleClose()}>
        <Image source={CloseIcon} style={{ width: 12, height: 12 }} />
      </TouchableOpacity>
    </View>
  );
};
