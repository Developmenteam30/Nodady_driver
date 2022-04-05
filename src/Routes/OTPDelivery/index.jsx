import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, Image, StatusBar } from 'react-native';
import Button from '../../Components/Shared/Button';
import Styles from './OTPDelivery.styles';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import Constants from '../../Variables/colors.variables';
import { useNavigate, useParams } from 'react-router-native';
import OTPImage from '../../Assets/Images/otpScreen.png';
import OTPTextInput from 'react-native-otp-textinput';
import { AppContext } from '../../Context/App.context';
import firebaseSetup from '../../../setup';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { NotificationContext } from '../../Context/Notification.context';
import { useRef } from 'react';
import { API_DOMAIN } from '../../Variables/globals.variables';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPDelivery = () => {
  const params = useParams();
  const clickedRef = useRef();
  const session = useContext(AppContext);
  const navigate = useNavigate();
  const notification = useContext(NotificationContext);
  const { auth } = firebaseSetup();
  const [otp, setOtp] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmApi = async () => {
    try {
      try {
        const token = await AsyncStorage.getItem('authData');
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/update-order`,
          {
            post_value: 'completed',
            order_id: params.id,
          },
          {
            headers: {
              authorization: `Bearer ${JSON.parse(token).token}`,
            },
          },
        );
        if (res?.data) {
          session.setIsLoading(false);
          setShowConfirmModal(true);
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
    } catch (error) {
      session.setIsLoading(false);
      if (error.response) {
        let firstError =
          Object.values(error.response.data) &&
          Object.values(error.response.data)[0] &&
          Object.values(error.response.data)[0][0];
        if (firstError.toLowerCase() === 'phone number already exists.') {
          navigate('/reset-password');
          return;
        }
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

  useEffect(() => {
    sendOTP();
  }, []);

  const sendOTP = async () => {
    const confirmation = await auth()
      .signInWithPhoneNumber(
        '+91' + session.forwardOrderDetails.customer_phone_number,
        true,
      )
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
    setConfirmation(confirmation);
  };

  useEffect(() => {
    if (confirmation) {
      let unsubscribe;
      const getUser = async () => {
        unsubscribe = auth().onAuthStateChanged(user => {
          if (
            user &&
            !clickedRef.current &&
            user?.phone_number ===
              '+91' + session.forwardOrderDetails.customer_phone_number
          ) {
            confirmApi();
          }
        });
      };
      getUser();
      return unsubscribe;
    }
  }, [confirmation]);

  const handleSubmit = async () => {
    if (!otp) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Missing OTP',
      });
    }
    if (otp.length !== 6) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'OTP length should be atleast 6',
      });
    }
    session.setIsLoading(true);
    try {
      if (confirmation) {
        try {
          await confirmation.confirm(otp);
          setConfirmation(undefined);
        } catch (err) {
          session.setIsLoading(false);
          return notification.setNotificationObject({
            type: 'error',
            message: 'Invalid OTP',
          });
        }
      }
      clickedRef.current = true;
      try {
        const token = await AsyncStorage.getItem('authData');
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/update-order`,
          {
            post_value: 'completed',
            order_id: params.id,
          },
          {
            headers: {
              authorization: `Bearer ${JSON.parse(token).token}`,
            },
          },
        );
        if (res?.data) {
          session.setIsLoading(false);
          setShowConfirmModal(true);
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
    } catch (err) {
      session.setIsLoading(false);
      return notification.setNotificationObject({
        type: 'error',
        message: err,
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {showConfirmModal && (
        <ConfirmationModal
          hideCancelBtn
          confirmButtonText={'DONE'}
          handleConfirm={() => navigate('/dashboard')}
          text={'Order Placed successfully'}
          showSuccess
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <BreadCrumbs />
        <View style={Styles.contentSection}>
          <Text style={Styles.heading}>OTP Verification</Text>
          <Text style={Styles.subTitle}>
            Please enter the OTP code sent to your mobile number
          </Text>
          <View style={Styles.imageSection}>
            <Image source={OTPImage} resizeMode="contain" />
          </View>
          <OTPTextInput
            tintColor={'white'}
            offTintColor={'white'}
            textInputStyle={Styles.input}
            keyboardType="number-pad"
            inputCount={6}
            handleTextChange={e => setOtp(e)}
          />
          <Button
            onPress={() => handleSubmit()}
            text={'VERIFY'}
            backgroundColor={Constants.primaryColor}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default OTPDelivery;
