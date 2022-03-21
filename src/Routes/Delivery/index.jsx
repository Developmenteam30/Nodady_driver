import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import Styles from './Delivery.styles';
import { useNavigate } from 'react-router-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbsWithSearch';
import { AppContext } from '../../Context/App.context';
import axios from 'axios';
import { API_DOMAIN } from '../../Variables/globals.variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../../Context/Notification.context';

const Delivery = () => {
  const navigate = useNavigate();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchText, setSearchText] = useState(undefined);

  useEffect(() => {
    getPickups();
  }, []);

  const getPickups = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(`${API_DOMAIN}/api/v1/delivery-list`, {
        headers: {
          authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
      if (res?.data) {
        console.log(res.data.detail);
        setOrders(res.data.detail);
        setAllOrders(res.data.detail);
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

  const handleFilter = () => {
    setOrders(allOrders.filter(obj => obj.order_id === searchText));
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <BreadCrumbs
        title="Delivery"
        showSearchIcon
        value={searchText}
        onChange={setSearchText}
        handleSearch={() => {
          handleFilter();
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={Styles.contentSection}>
          {orders.map((obj, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={Styles.card}
                onPress={() => {
                  navigate(`/delivery/${obj.id}/order/${obj.order_id}`);
                }}>
                <Text style={Styles.name}>{obj.business_owner}</Text>
                <Text style={Styles.orderId}>Order Id</Text>
                <Text style={Styles.orderIdNumber}>{obj.order_id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Delivery;
