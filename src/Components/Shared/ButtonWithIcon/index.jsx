import React from 'react';
import Styles from './ButtonWithIcon.styles';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import LineIcon from '../../../Assets/Images/line.png';

const ButtonWithIcon = ({ imgSource, onClick, label }) => {
  return (
    <>
      <TouchableOpacity style={Styles.inputContainer} onPress={onClick}>
        <View style={Styles.iconContainer}>
          <Image source={imgSource} resizeMode="contain" />
        </View>
        <Image source={LineIcon} resizeMode="contain" />
        <Text style={Styles.textInput}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonWithIcon;
