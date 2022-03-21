import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Button from '../../Components/Shared/Button';
import Styles from './SignIn.styles';
import Constants from '../../Variables/colors.variables';
import { useNavigate } from 'react-router-native';
import Input from '../../Components/Shared/Input';
import LockIcon from '../../Assets/Images/lock.png';
import MobileIcon from '../../Assets/Images/mobile.png';
import axios from 'axios';
import { API_DOMAIN } from '../../Variables/globals.variables';
import { AppContext } from '../../Context/App.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../../Context/Notification.context';

const SignIn = () => {
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  const session = useContext(AppContext);
  const [password, setPassword] = useState(undefined);

  const handleSubmit = async () => {
    if (!password) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter password',
      });
    }
    if (!session.phoneNumber) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter phone number',
      });
    }
    if (session.phoneNumber.length !== 10) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter valid phone number',
      });
    }
    session.setIsLoading(true);
    try {
      const res = await axios.post(`${API_DOMAIN}/api/v1/login-internal-user`, {
        phone_number: session.phoneNumber,
        password: password,
      });
      if (res?.data?.token) {
        await AsyncStorage.setItem(
          'authData',
          JSON.stringify({
            token: res.data.token,
            userId: res.data.user_id,
          }),
        );
        await AsyncStorage.setItem('loginData', JSON.stringify(res.data));
        session.setProfileDetails(res.data);
        session.setIsLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      session.setIsLoading(false);
      if (error.response) {
        let firstError =
          Object.values(error.response.data) &&
          Object.values(error.response.data)[0] &&
          Object.values(error.response.data)[0][0];
        if (firstError) {
          return notification.setNotificationObject({
            type: 'error',
            message: firstError,
          });
        }
      }
      return notification.setNotificationObject({
        type: 'error',
        message: error,
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.outerSection}>
        <View style={Styles.contentSection}>
          <Text style={Styles.heading}>Login</Text>
          <View>
            <View style={Styles.inputFields}>
              <Input
                label="Mobile Number"
                onChange={session.setPhoneNumber}
                value={session.phoneNumber}
                imgSource={MobileIcon}
                isNumeric
              />
            </View>
            <View style={Styles.inputFields}>
              <Input
                imgSource={LockIcon}
                label="Password"
                onChange={setPassword}
                value={password}
                isPassword
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                session.goPage.current = 'FORGOT_PASSWORD';
                navigate('/phonenumber-signin');
              }}>
              <Text style={Styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={() => handleSubmit()}
              text={'SIGN IN'}
              backgroundColor={Constants.primaryColor}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
