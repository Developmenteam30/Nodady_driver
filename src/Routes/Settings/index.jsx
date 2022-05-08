import React from 'react';
import Styles from './Settings.styles';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import AccountIcon from '../../Assets/Images/account.png';
import SettingsIcon from '../../Assets/Images/settingsRed.png';
import Constants from '../../Variables/colors.variables';
import { Fragment } from 'react';

export default () => {
  const navigate = useNavigate();

  const menuOptions = [
    {
      icon: AccountIcon,
      name: 'Profile',
      click: () => {
        navigate('/profile');
      },
    },
    {
      icon: SettingsIcon,
      name: 'Change Password',
      click: () => {
        navigate('/change-password');
      },
    },
  ];

  return (
    <Fragment>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Constants.primaryColor }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={Constants.primaryColor}
          barStyle="light-content"
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={Styles.container}>
            <View style={Styles.mainContainer}>
              {menuOptions.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={Styles.menuSection}
                    onPress={() => item.click()}>
                    <View style={Styles.menuIcon}>
                      <Image
                        style={Styles.menuIconImage}
                        source={item.icon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={Styles.menuName}>{item.name}</Text>
                    {item.rightIcon && (
                      <View style={Styles.rightMenuIcon}>
                        <Image
                          source={item.rightIcon}
                          resizeMode="cover"
                          style={{ width: 8, height: 12 }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
