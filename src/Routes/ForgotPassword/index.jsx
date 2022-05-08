import React, { useContext, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import Button from '../../Components/Shared/Button';
import Styles from './ForgotPassword.styles';
import Constants from '../../Variables/colors.variables';
import { useNavigate } from 'react-router-native';
import Input from '../../Components/Shared/Input';
import LockIcon from '../../Assets/Images/lock.png';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import { AppContext } from '../../Context/App.context';
import { API_DOMAIN } from '../../Variables/globals.variables';
import axios from 'axios';
import { NotificationContext } from '../../Context/Notification.context';

const ResetPassword = () => {
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  const session = useContext(AppContext);
  const [newPassword, setNewPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const handleSubmit = async () => {
    if (!newPassword) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter new password',
      });
    }
    if (!confirmPassword) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter confirm password',
      });
    }
    if (newPassword.length < 8) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Please enter password of min 8 digits',
      });
    }
    if (newPassword.search(/[a-z]/) < 0) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your password must contain at least one lowercase letter.',
      });
    }
    if (newPassword.search(/[A-Z]/) < 0) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your password must contain at least one uppercase letter.',
      });
    }
    if (newPassword.search(/[0-9]/) < 0) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your password must contain at least one digit.',
      });
    }
    if (newPassword.search(/[!@#$%^&*]/) < 0) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your password must contain at least special character.',
      });
    }
    if (!(newPassword.search(/[_]/) < 0)) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your password must not contain _.',
      });
    }
    if (newPassword !== confirmPassword) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Your passwords do not match.',
      });
    }
    //reset password api call
    session.setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/forgot-password-rider-manager`,
        {
          phone_number: session.phoneNumber,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
      );
      if (res?.data) {
        navigate('/signin');
        notification.setNotificationObject({
          type: 'success',
          message: 'Password Changed successfully',
        });
        session.setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
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
        <BreadCrumbs title="Forgot Password" />
        <View style={Styles.contentSection}>
          <View style={Styles.inputFields}>
            <Input
              label="New Password"
              imgSource={LockIcon}
              onChange={setNewPassword}
              value={newPassword}
              isPassword
            />
          </View>
          <View style={Styles.inputFields}>
            <Input
              imgSource={LockIcon}
              label="Confirm Password"
              onChange={setConfirmPassword}
              value={confirmPassword}
              isPassword
            />
          </View>
          <View style={Styles.buttonSection}>
            <Button
              onPress={() => handleSubmit()}
              text={'UPDATE PASSWORD'}
              backgroundColor={Constants.primaryColor}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ResetPassword;
