import React, { useState, useEffect } from 'react';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import {
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import Styles from './Statistics.styles';
import { useContext } from 'react';
import { AppContext } from '../../Context/App.context';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DOMAIN } from '../../Variables/globals.variables';
import { useNavigate } from 'react-router-native';

const Statistics = () => {
  const navigate = useNavigate();
  const session = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const notification = useContext(NotificationContext);
  const [active, setActive] = useState('GENERAL');
  const [generalData, setGeneralData] = useState({
    total_number_of_pickup: 0,
    total_number_of_delivery: 0,
    not_paid_cod_amount: 0,
    salary: 0,
  });
  const [cod, setCod] = useState([]);
  const [client, setClient] = useState([]);
  const [notPaid, setNotPaid] = useState([]);
  const [possessive, setPossessive] = useState([]);
  const [apiCallMade, setApiCallMade] = useState(false);

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
        if (res.data.detail) {
          setErrorMessage(res.data.detail[0]);
        }
        setGeneralData(res.data);
        session.setIsLoading(false);
        setApiCallMade(true);
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
        setClient(res.data);
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
        setCod(res.data);
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

  const getNotPaid = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(`${API_DOMAIN}/api/v1/not-paid-cod-list`, {
        headers: {
          authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
      if (res?.data) {
        setNotPaid(res.data.detail);
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

  const getPossessive = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/current-possessed-parcel`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        setPossessive(res.data.detail);
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

  const items = [
    {
      label: 'General',
      value: 'GENERAL',
      onPress: () => {
        getStatistics();
        setActive('GENERAL');
      },
    },
    {
      label: 'Not Paid',
      value: 'NOT_PAID',
      onPress: () => {
        getNotPaid();
        setActive('NOT_PAID');
      },
    },
    {
      label: 'Possession',
      value: 'POSSESSIVE',
      onPress: () => {
        getPossessive();
        setActive('POSSESSIVE');
      },
    },
    {
      label: 'COD',
      value: 'COD',
      onPress: () => {
        getCOD();
        setActive('COD');
      },
    },
    {
      label: 'Client',
      value: 'CLIENT',
      onPress: () => {
        getClient();
        setActive('CLIENT');
      },
    },
  ];

  const getStatus = status => {
    let data = {
      open: 'Open',
      cancelled: 'Cancelled',
      pickup: 'Picked Up',
      head_office: 'Head Office',
      out_for_delivery: 'Out For Delivery',
      intransit: 'In Transit',
      completed: 'Completed',
      return_requested: 'Requested Returned',
      return_intransit: 'Returned In Transit',
      returned: 'Returned',
    };
    return data[status];
  };

  return (
    <>
      {apiCallMade && (
        <>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <BreadCrumbs title="Statistics" />
          <View style={Styles.buttonSection}>
            <FlatList
              horizontal
              data={items}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={
                      active === item.value ? Styles.active : Styles.inactive
                    }
                    onPress={() => {
                      item.onPress();
                    }}>
                    <Text
                      style={
                        active === item.value
                          ? Styles.activeButtonText
                          : Styles.inactiveButtonText
                      }>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              minHeight: Dimensions.get('window').height - 150,
              backgroundColor: 'red',
              flex:
                active === 'GENERAL'
                  ? 1
                  : active === 'CLIENT'
                  ? client.length > 0
                    ? 0
                    : 1
                  : active === 'COD'
                  ? cod.length > 0
                    ? 0
                    : 1
                  : active === 'NOT_PAID'
                  ? notPaid.length > 0
                    ? 0
                    : 1
                  : active === 'POSSESSIVE' && possessive.length > 0
                  ? 0
                  : 1,
            }}>
            <View style={Styles.container}>
              {active === 'GENERAL' && (
                <View
                  style={
                    errorMessage ? Styles.errorSection : Styles.generalSection
                  }>
                  {errorMessage ? (
                    <Text style={Styles.errorMessage}>{errorMessage}</Text>
                  ) : (
                    <>
                      <View style={Styles.generalCard1}>
                        <Text style={Styles.generalHeading}>
                          Total number of pickups
                        </Text>
                        <Text style={Styles.generalSubHeading}>
                          {generalData.total_number_of_pickup}
                        </Text>
                      </View>
                      <View style={Styles.generalCard2}>
                        <Text style={Styles.generalHeading}>
                          Total number of deliveries
                        </Text>
                        <Text style={Styles.generalSubHeading}>
                          {generalData.total_number_of_delivery}
                        </Text>
                      </View>
                      <View style={Styles.generalCard3}>
                        <Text style={Styles.generalHeading}>Pending COD</Text>
                        <Text style={Styles.generalSubHeading}>
                          ₹ {generalData.not_paid_cod_amount}
                        </Text>
                      </View>
                      <View style={Styles.generalCard2}>
                        <Text style={Styles.generalHeading}>Salary</Text>
                        <Text style={Styles.generalSubHeading}>
                          ₹ {generalData.salary}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              )}
              {active === 'COD' && (
                <View style={Styles.codSection}>
                  {cod.map((obj, ind) => {
                    return (
                      <View key={ind} style={Styles.codCard}>
                        <View style={Styles.codLeftSection}>
                          <Text style={Styles.codName}>
                            {obj.rider_name.substring(0, 1)}
                          </Text>
                        </View>
                        <View style={Styles.codRightCard}>
                          <Text style={Styles.codName}>{obj.rider_name}</Text>
                          <Text style={Styles.codAmount}>₹ {obj.cod}</Text>
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
                            {obj.user_full_name.substring(0, 1)}
                          </Text>
                        </View>
                        <View style={Styles.codRightCard}>
                          <Text style={Styles.codName}>
                            {obj.user_full_name}
                          </Text>
                          <Text style={Styles.codAmount}>₹ {obj.cod}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              {active === 'NOT_PAID' && (
                <View style={Styles.codSection}>
                  {notPaid.map((obj, ind) => {
                    return (
                      <View key={ind} style={Styles.codCard}>
                        <View style={Styles.codLeftSection}>
                          <Text style={Styles.codName}>
                            {obj.company_name.substring(0, 1)}
                          </Text>
                        </View>
                        <View style={Styles.codRightCard}>
                          <Text style={Styles.codName}>{obj.company_name}</Text>
                          <Text style={Styles.codAmount}>
                            ₹ {obj.initial_cod_amount}
                          </Text>
                          <Text style={Styles.orderID}>
                            {obj.long_order_id}
                          </Text>
                          <Text>{getStatus(obj.order_status)}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              {active === 'POSSESSIVE' && (
                <View style={Styles.codSection}>
                  {possessive.map((obj, ind) => {
                    return (
                      <TouchableOpacity
                        key={ind}
                        style={Styles.codCard}
                        onPress={() => navigate(`/order/${obj.order_id}`)}>
                        <View style={Styles.codLeftSection}>
                          <Text style={Styles.codName}>
                            {obj.company_name.substring(0, 1)}
                          </Text>
                        </View>
                        <View style={Styles.codRightCard}>
                          <Text style={Styles.codName}>{obj.company_name}</Text>
                          <Text style={Styles.orderID}>
                            {obj.long_order_id}
                          </Text>
                          <Text>{getStatus(obj.order_status)}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Statistics;
