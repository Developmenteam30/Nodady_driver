import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import Styles from './Profile.styles';
import Constants from '../../Variables/colors.variables';
import Button from '../../Components/Shared/Button';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import InputWithLabel from '../../Components/Shared/InputWithLabel';
import { AppContext } from '../../Context/App.context';
import { API_DOMAIN } from '../../Variables/globals.variables';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../../Context/Notification.context';
import { useRef } from 'react';
import { useNavigate } from 'react-router-native';

export default () => {
  const navigate = useNavigate();
  const notification = useContext(NotificationContext);
  const session = useContext(AppContext);
  const [name, setName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [number, setNumber] = useState(undefined);

  const handleSubmit = async () => {
    //api call
    if (!name) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Missing name',
      });
    }
    if (!lastName) {
      return notification.setNotificationObject({
        type: 'error',
        message: 'Missing last name',
      });
    }
    session.setIsLoading(true);
    const token = await AsyncStorage.getItem('authData');
    let data = {
      first_name: name?.trim(),
      last_name: lastName?.trim(),
      full_name: name?.trim() + lastName?.trim(),
    };
    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/update-internal-user-profile-detail`,
        data,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        getProfileDetails();
        notification.setNotificationObject({
          type: 'success',
          message: 'Profile updated successfully.',
        });
        setEditMode(false);
        session.setIsLoading(false);
      }
    } catch (error) {
      session.setIsLoading(false);
      if (error.response) {
        let firstError =
          Object.values(error.response.data) &&
          Object.values(error.response.data)[0] &&
          Object.values(error.response.data)[0][0];
        if (firstError) {
          return notification.setNotificationObject({
            type: 'error',
            message: firstError,
          });
        }
      }
      return notification.setNotificationObject({
        type: 'error',
        message: error,
      });
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [session, editMode]);

  const backAction = async () => {
    if (editMode) {
      setEditMode(false);
      return true;
    } else {
      navigate(-1);
      return true;
    }
  };

  const getProfileDetails = async () => {
    session.setIsLoading(true);
    const token = await AsyncStorage.getItem('authData');
    try {
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/get-internal-user-profile-detail`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data?.detail) {
        setName(res.data.detail.first_name);
        setEmail(res.data.detail.email);
        setLastName(res.data.detail.last_name);
        setNumber(res.data.detail.phone_number);
        session.setIsLoading(false);
      }
    } catch (error) {
      session.setIsLoading(false);
      if (error.response) {
        let firstError =
          Object.values(error.response.data) &&
          Object.values(error.response.data)[0] &&
          Object.values(error.response.data)[0][0];
        if (firstError) {
          return notification.setNotificationObject({
            type: 'error',
            message: firstError,
          });
        }
      }
      return notification.setNotificationObject({
        type: 'error',
        message: error,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={Styles.container}>
        <BreadCrumbs title="Profile" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Styles.section}>
          <View style={{ marginBottom: 30 }}>
            <View style={Styles.inputSection}>
              <InputWithLabel
                label="First Name"
                backgroundColor="white"
                value={name}
                onChange={setName}
                disabled={editMode}
              />
            </View>
            <View style={Styles.inputSection}>
              <InputWithLabel
                label="Last Name"
                backgroundColor="white"
                value={lastName}
                onChange={setLastName}
                disabled={editMode}
              />
            </View>
            <View style={Styles.inputSection}>
              <InputWithLabel
                label="Email"
                backgroundColor="white"
                value={email}
                onChange={setEmail}
                disabled={false}
              />
            </View>
            <View style={Styles.inputSection}>
              <InputWithLabel
                label="Contact Number"
                backgroundColor="white"
                value={number}
                isNumeric
                onChange={setNumber}
                disabled={false}
              />
            </View>
          </View>
          {editMode ? (
            <View style={Styles.buttonSection}>
              <View style={Styles.singleButtonSection}>
                <Button
                  text="CANCEL"
                  backgroundColor="white"
                  borderColor={Constants.primaryColor}
                  borderWidth={2}
                  color={Constants.primaryColor}
                  onPress={() => {
                    setEditMode(false);
                  }}
                />
              </View>
              <View style={Styles.singleButtonSection}>
                <Button
                  text="SAVE"
                  backgroundColor={Constants.primaryColor}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          ) : (
            <Button
              text="EDIT COMPANY INFO"
              backgroundColor="white"
              borderColor={Constants.primaryColor}
              borderWidth={2}
              color={Constants.primaryColor}
              onPress={() => setEditMode(true)}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
