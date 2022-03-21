import React, { useEffect } from 'react';
import Main from './src';
import { View, Alert, BackHandler } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  useEffect(() => {
    checkPermission();
    CheckConnectivity();
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {},

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  const CheckConnectivity = () => {
    NetInfo.addEventListener(networkState => {
      if (!networkState.isConnected) {
        Alert.alert(
          'Hold on!',
          'You are offline. Please connect to Internet.',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ],
        );
      }
    });
  };

  async function checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  async function getToken() {
    let formToken;
    // let formToken = await AsyncStorage.read('formToken');
    if (!formToken) {
      formToken = await messaging().getToken();

      if (formToken) {
        // await AsyncStorage.save('formToken', formToken);
      }
    }
  }

  async function requestPermission() {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <Main />
    </View>
  );
};

export default App;
