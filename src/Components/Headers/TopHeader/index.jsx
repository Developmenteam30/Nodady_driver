import React from 'react';
import { View, Image, Touchable, TouchableOpacity } from 'react-native';
import Styles from './TopHeader.styles';
import Logo from '../../../Assets/Images/whiteLogo.png';
import LogoutIcon from '../../../Assets/Images/logout.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseSetup from '../../../../setup';
import { useNavigate } from 'react-router-native';

const TopHeader = () => {
  const { auth } = firebaseSetup();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authData');
      if (auth().currentUser) {
        auth().signOut();
      }
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={Styles.headerSection}>
      <Image source={Logo} />
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          height: 50,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={LogoutIcon} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  );
};
export default TopHeader;
