import React, { useContext, useState } from 'react';
import { Text, View, ScrollView, StatusBar } from 'react-native';
import Button from '../../Components/Shared/Button';
import Styles from './PhoneNumberSignIn.styles';
import Constants from '../../Variables/colors.variables';
import Input from '../../Components/Shared/Input';
import { AppContext } from '../../Context/App.context';
import firebaseSetup from '../../../setup';
import OTP from '../OTP';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import MobileIcon from '../../Assets/Images/mobile.png';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import { API_DOMAIN } from '../../Variables/globals.variables';

const PhoneNumberSignIn = () => {
  const { auth } = firebaseSetup();
  const notification = useContext(NotificationContext);
  const session = useContext(AppContext);
  const [confirm, setConfirm] = useState(undefined);

  const handleSubmit = async () => {
    if (!session.phoneNumber) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Missing Phone Number',
      });
    }
    if (session.phoneNumber.length !== 10) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Invalid Phone Number',
      });
    }
    session.setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/check-rider-manager-phone-number`,
        {
          phone_number: session.phoneNumber,
        },
      );
      if (res?.data) {
        const confirmation = await auth()
          .signInWithPhoneNumber('+91' + session.phoneNumber, true)
          .catch(err => {
            if (err.code === 'auth/too-many-requests') {
              session.setIsLoading(false);
              return notification.setNotificationObject({
                type: 'error',
                message:
                  'Too many requests for this number. Please try again in 24 hours.',
              });
            }
            session.setIsLoading(false);
            return notification.setNotificationObject({
              type: 'error',
              message: JSON.stringify(err),
            });
          });
        setConfirm(confirmation);
        session.setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        let firstError =
          Object.values(error.response.data) &&
          Object.values(error.response.data)[0] &&
          Object.values(error.response.data)[0][0];
        if (firstError === 'phone number not found.') {
          session.setIsLoading(false);
          return notification.setNotificationObject({
            type: 'error',
            message: firstError,
          });
        } else if (firstError) {
          session.setIsLoading(false);
          return notification.setNotificationObject({
            type: 'error',
            message: firstError,
          });
        }
      }
      session.setIsLoading(false);
      return notification.setNotificationObject({
        type: 'error',
        message: JSON.stringify(error),
      });
    }
  };

  if (confirm) {
    return <OTP confirm={confirm} />;
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.outerSection}>
        <BreadCrumbs />
        <View style={Styles.contentSection}>
          <Text style={Styles.heading}>Enter your Mobile Number</Text>
          <Text style={Styles.subTitle}>
            Enter your registered mobile number to receive{' '}
            <Text style={Styles.subTitleHeading}>OTP</Text> for login
          </Text>
          <View style={Styles.inputFields}>
            <Input
              label="Mobile Number"
              onChange={session.setPhoneNumber}
              value={session.phoneNumber}
              imgSource={MobileIcon}
              isNumeric
              min={10}
              max={10}
            />
          </View>
          <Button
            onPress={() => handleSubmit()}
            text={'SEND OTP'}
            backgroundColor={'white'}
            borderColor={Constants.primaryColor}
            color={Constants.primaryColor}
            borderWidth={1}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PhoneNumberSignIn;
