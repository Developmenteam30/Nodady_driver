import React, { useState, useEffect } from 'react';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import {
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Styles from './Statistics.styles';
import { useContext } from 'react';
import { AppContext } from '../../Context/App.context';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DOMAIN } from '../../Variables/globals.variables';

const Statistics = () => {
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const [active, setActive] = useState('GENERAL');
  const [generalData, setGeneralData] = useState({
    total_cash_on_delivery_amount: 0,
    total_number_of_deliveries: 0,
    total_number_of_pickups_and_deliveries: 0,
  });
  const [cod, setCod] = useState([]);
  const [client, setClient] = useState([]);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(`${API_DOMAIN}/api/v1/statistics-general`, {
        headers: {
          authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
      if (res?.data) {
        setGeneralData(res.data);
        session.setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
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

  const getClient = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(`${API_DOMAIN}/api/v1/statistics-client`, {
        headers: {
          authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
      if (res?.data) {
        console.log(res.data);
        session.setIsLoading(false);
      }
    } catch (error) {
      session.setIsLoading(false);
      return notification.setNotificationObject({
        type: 'error',
        message: error?.response?.data?.detail,
      });
    }
  };

  const getCOD = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(`${API_DOMAIN}/api/v1/statistics-cod`, {
        headers: {
          authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
      if (res?.data) {
        console.log(res.data);
        session.setIsLoading(false);
      }
    } catch (error) {
      session.setIsLoading(false);
      return notification.setNotificationObject({
        type: 'error',
        message: error?.response?.data?.detail,
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <BreadCrumbs title="Statistics" />
      <View style={Styles.buttonSection}>
        <TouchableOpacity
          style={active === 'GENERAL' ? Styles.active : Styles.inactive}
          onPress={() => {
            getStatistics();
            setActive('GENERAL');
          }}>
          <Text
            style={
              active === 'GENERAL'
                ? Styles.activeButtonText
                : Styles.inactiveButtonText
            }>
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={active === 'COD' ? Styles.active : Styles.inactive}
          onPress={() => {
            getCOD();
            setActive('COD');
          }}>
          <Text
            style={
              active === 'COD'
                ? Styles.activeButtonText
                : Styles.inactiveButtonText
            }>
            COD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={active === 'CLIENT' ? Styles.active : Styles.inactive}
          onPress={() => {
            getClient();
            setActive('CLIENT');
          }}>
          <Text
            style={
              active === 'CLIENT'
                ? Styles.activeButtonText
                : Styles.inactiveButtonText
            }>
            Client
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex:
            active === 'GENERAL'
              ? 1
              : active === 'CLIENT'
              ? client.length > 0
                ? 0
                : 1
              : cod.length > 0
              ? 0
              : 1,
        }}>
        <View style={Styles.container}>
          {active === 'GENERAL' && (
            <View style={Styles.generalSection}>
              <View style={Styles.generalCard1}>
                <Text style={Styles.generalHeading}>
                  Total number of pickups and deliveries
                </Text>
                <Text style={Styles.generalSubHeading}>
                  {generalData.total_number_of_pickups_and_deliveries}
                </Text>
              </View>
              <View style={Styles.generalCard2}>
                <Text style={Styles.generalHeading}>
                  Total number of deliveries
                </Text>
                <Text style={Styles.generalSubHeading}>
                  {generalData.total_number_of_deliveries}
                </Text>
              </View>
              <View style={Styles.generalCard3}>
                <Text style={Styles.generalHeading}>
                  Total Cash on delivery amount
                </Text>
                <Text style={Styles.generalSubHeading}>
                  ₹ {generalData.total_cash_on_delivery_amount}
                </Text>
              </View>
            </View>
          )}
          {active === 'COD' && (
            <View style={Styles.codSection}>
              {cod.map((obj, ind) => {
                return (
                  <View key={ind} style={Styles.codCard}>
                    <View style={Styles.codLeftSection}>
                      <Text style={Styles.codName}>
                        {obj.name.substring(0, 1)}
                      </Text>
                    </View>

                    <View style={Styles.codRightCard}>
                      <Text style={Styles.codName}>{obj.name}</Text>
                      <Text style={Styles.codAmount}>₹ {obj.amount}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {active === 'CLIENT' && (
            <View style={Styles.codSection}>
              {client.map((obj, ind) => {
                return (
                  <View key={ind} style={Styles.codCard}>
                    <View style={Styles.codLeftSection}>
                      <Text style={Styles.codName}>
                        {obj.name.substring(0, 1)}
                      </Text>
                    </View>

                    <View style={Styles.codRightCard}>
                      <Text style={Styles.codName}>{obj.name}</Text>
                      <Text style={Styles.codAmount}>₹ {obj.amount}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Statistics;
