import React, { useState } from 'react';
import Styles from './Input.styles';
import { View, Image, TouchableOpacity } from 'react-native';
import LineIcon from '../../../Assets/Images/line.png';
import Constants from '../../../Variables/colors.variables';
import OpenEye from '../../../Assets/Images/openEye.png';
import ClosedEye from '../../../Assets/Images/closedEye.png';
import { TextField } from 'rn-material-ui-textfield';
import SearchIcon from '../../../Assets/Images/search.png';

const Input = ({
  isNumeric,
  imgSource,
  value,
  onChange,
  label,
  isPassword,
  backgroundColor,
  fullWidth,
  handleSearch,
  showSearchIcon,
  min,
  max,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View
        style={{
          ...Styles.inputContainer,
          backgroundColor: backgroundColor
            ? backgroundColor
            : Constants.lightColor,
        }}>
        {imgSource && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={Styles.iconContainer}>
              <Image
                source={imgSource}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Image
              style={{ width: 2 }}
              source={LineIcon}
              resizeMode="contain"
            />
          </View>
        )}
        <TextField
          label={label}
          value={isNumeric ? value?.toString() : value}
          style={Styles.textInputStyles}
          containerStyle={{
            ...Styles.inputContainerStyles,
            left: fullWidth ? 10 : 80,
            right: isPassword ? 50 : 10,
          }}
          textColor={Constants.headingColor}
          labelTextStyle={Styles.textInput}
          lineType="none"
          onChangeText={val => {
            if (isNumeric) {
              onChange(val.replace(/[^0-9]/g, ''));
            } else {
              onChange(val);
            }
          }}
          minLength={min && min}
          maxLength={max && max}
          keyboardType={isNumeric && 'number-pad'}
          tintColor={Constants.activeInputColor}
          secureTextEntry={!!isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity
            style={{ alignItems: 'center', marginRight: 20 }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? OpenEye : ClosedEye}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {showSearchIcon && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginRight: 20,
              marginLeft: 'auto',
            }}
            onPress={() => handleSearch()}>
            <Image
              source={SearchIcon}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Input;
