import React, { useState } from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import InputWithLabel from '../../Components/Shared/InputWithLabel';
import Button from '../../Components/Shared/Button';
import Constants from '../../Variables/colors.variables';
import Styles from './BarCodeScanner.styles';
import { useContext } from 'react';
import { NotificationContext } from '../../Context/Notification.context';
import { AppContext } from '../../Context/App.context';
import { API_DOMAIN } from '../../Variables/globals.variables';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';

const ScanScreen = () => {
  const notification = useContext(NotificationContext);
  const session = useContext(AppContext);
  const navigate = useNavigate();
  const [awbNumber, setAwbNumber] = useState(undefined);

  const onSuccess = e => {
    navigate(`/order/${e.data}`);
  };

  const getOrderId = async id => {
    session.setIsLoading(true);
    const token = await AsyncStorage.getItem('authData');
    try {
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/get-order-id?order_id=${awbNumber}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        navigate(`/order/${res.data.order_id}`);
        session.setIsLoading(false);
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
      <BreadCrumbs title={'Bar Code Scanner'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.container}>
        <View style={Styles.contentSection}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            cameraStyle={Styles.cameraStyle}
            markerStyle={Styles.markerStyle}
            showMarker={true}
          />
          <View style={Styles.inputSection}>
            <InputWithLabel
              label={'Generate Details for Order Id'}
              onChange={setAwbNumber}
              value={awbNumber}
            />
            <View style={Styles.buttonSection}>
              <Button
                onPress={() => getOrderId()}
                text={'Proceed'}
                backgroundColor={awbNumber ? Constants.primaryColor : '#b4b4b4'}
                color={'white'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ScanScreen;
