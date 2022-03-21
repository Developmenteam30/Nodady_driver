import React from 'react';
import { Image, View } from 'react-native';
import Styles from './SplashScreen.styles';
import Logo from '../../Assets/Images/completeLogo.png';

const SplashScreen = () => {
  return (
    <View style={Styles.contentSection}>
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }}
      />
    </View>
  );
};

export default SplashScreen;
