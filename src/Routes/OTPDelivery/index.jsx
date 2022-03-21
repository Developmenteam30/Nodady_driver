import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, Image, StatusBar } from 'react-native';
import Button from '../../Components/Shared/Button';
import Styles from './OTPDelivery.styles';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import Constants from '../../Variables/colors.variables';
import { useNavigate } from 'react-router-native';
import OTPImage from '../../Assets/Images/otpScreen.png';
import OTPTextInput from 'react-native-otp-textinput';
import { AppContext } from '../../Context/App.context';
import firebaseSetup from '../../../setup';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { NotificationContext } from '../../Context/Notification.context';

const OTPDelivery = () => {
  const session = useContext(AppContext);
  const navigate = useNavigate();
  const notification = useContext(NotificationContext);
  const { auth } = firebaseSetup();
  const [otp, setOtp] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setShowConfirmModal(true);
  };

  const resendOTP = async () => {};

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
        <BreadCrumbs showTimer resendOTP={resendOTP} />
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
