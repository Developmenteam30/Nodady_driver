import React from 'react';
import { TextInput, Text, View } from 'react-native';
import Styles from './InputWithLabel.styles';
import Constants from '../../../Variables/colors.variables';

const InputWithLabel = ({
  value,
  onChange,
  placeholder,
  isNumeric,
  label,
  min,
  max,
  disabled,
  borderColor,
  backgroundColor,
  fontSize,
  autoCapitalize,
}) => {
  return (
    <>
      {isNumeric ? (
        <View>
          {label && (
            <Text
              style={{ ...Styles.label, fontSize: fontSize ? fontSize : 12 }}>
              {label}
            </Text>
          )}
          <TextInput
            value={value && value.toString()}
            onChangeText={val => {
              onChange(val.replace(/[^0-9]/g, ''));
            }}
            maxLength={max}
            minLength={min}
            style={{
              ...Styles.textInput,
              backgroundColor: backgroundColor
                ? backgroundColor
                : Constants.lightColor,
              borderColor: borderColor ? borderColor : Constants.lightColor,
              borderWidth: borderColor ? 1 : 0,
            }}
            keyboardType="number-pad"
            editable={disabled}
            placeholder={placeholder}
          />
        </View>
      ) : (
        <View>
          {label && (
            <Text
              style={{ ...Styles.label, fontSize: fontSize ? fontSize : 12 }}>
              {label}
            </Text>
          )}
          <TextInput
            value={value}
            onChangeText={val => {
              onChange(val);
            }}
            autoCapitalize={autoCapitalize}
            editable={disabled}
            placeholder={placeholder}
            style={{
              ...Styles.textInput,
              backgroundColor: backgroundColor
                ? backgroundColor
                : Constants.lightColor,
              borderColor: borderColor ? borderColor : Constants.lightColor,
              borderWidth: borderColor ? 1 : 0,
            }}
          />
        </View>
      )}
    </>
  );
};

export default InputWithLabel;
