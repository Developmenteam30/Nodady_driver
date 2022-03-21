import React, { useState } from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import InputWithLabel from '../../Components/Shared/InputWithLabel';
import Button from '../../Components/Shared/Button';
import Constants from '../../Variables/colors.variables';
import Styles from './BarCodeScanner.styles';

const ScanScreen = () => {
  const [awbNumber, setAwbNumber] = useState(undefined);

  const onSuccess = e => {
    setAwbNumber(e.data);
  };

  const handleSubmit = () => {};

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
              label={'Generate Manifest for AWB'}
              onChange={setAwbNumber}
              value={awbNumber}
              disabled={false}
            />
            <View style={Styles.buttonSection}>
              <Button
                onPress={() => handleSubmit()}
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
