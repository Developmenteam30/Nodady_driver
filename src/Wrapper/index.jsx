import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { BackHandler, Alert } from 'react-native';
import { AppContext } from '../Context/App.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { NotificationContext } from '../Context/Notification.context';

const Wrapper = () => {
  const navigate = useNavigate();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);

  const backAction = () => {
    if (session.isCurrentHomePage.current) {
      Alert.alert('Hold on!', `Are you sure you want to exit the app?`, [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      session.goPage.current = undefined;
      session.setIsLoading(false);
      navigate(-1);
    }
    return true;
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authData');
      if (jsonValue) {
        const userInfo = jsonValue !== null ? JSON.parse(jsonValue) : null;
        if (userInfo.token) {
          navigate('/dashboard');
          SplashScreen.hide();
        } else {
          navigate('/signin');
          SplashScreen.hide();
        }
      } else {
        navigate('/signin');
        SplashScreen.hide();
      }
    } catch (e) {
      SplashScreen.hide();
      return notification.setNotificationObject({
        type: 'error',
        message: e.message,
      });
    }
  };

  useEffect(() => {
    getUserData();
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
  }, []);

  const refreshAuthLogic = async failedRequest => {
    await AsyncStorage.removeItem('authData');
    navigate('/signin');
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [session]);

  return <></>;
};

export default Wrapper;
