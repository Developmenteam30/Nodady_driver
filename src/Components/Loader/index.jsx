import React from 'react';
import Styles from './Loader.styles';
import Constants from '../../Variables/colors.variables';
import { View, ActivityIndicator, StatusBar } from 'react-native';

const Loader = () => {
  return (
    <>
      <StatusBar backgroundColor="#00000033" barStyle="light-content" />
      <View style={Styles.loading}>
        <ActivityIndicator size={60} animating color={Constants.primaryColor} />
      </View>
    </>
  );
};

export default Loader;
