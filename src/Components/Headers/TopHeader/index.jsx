import React from 'react';
import { View, Image } from 'react-native';
import Styles from './TopHeader.styles';
import Logo from '../../../Assets/Images/whiteLogo.png';

const TopHeader = () => {
  return (
    <View style={Styles.headerSection}>
      <Image source={Logo} />
    </View>
  );
};
export default TopHeader;
