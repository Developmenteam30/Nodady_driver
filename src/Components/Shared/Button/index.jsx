import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import Styles from './Button.styles';

const Button = ({
  onPress,
  text,
  backgroundColor,
  borderColor,
  color,
  borderWidth,
  icon,
  borderRadius,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...Styles.button,
        backgroundColor: backgroundColor,
        borderColor: borderColor ? borderColor : backgroundColor,
        borderWidth: borderColor ? borderWidth : 0,
        borderRadius: borderRadius ? borderRadius : 8,
      }}
      onPress={() => onPress()}>
      {icon && (
        <Image
          source={icon}
          style={{ width: 14, height: 14, marginRight: 8 }}
        />
      )}
      <Text style={{ ...Styles.buttonText, color: color ? color : '#FFFFFF' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
