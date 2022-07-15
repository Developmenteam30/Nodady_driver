import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native';
import Styles from './Delivery.styles';
import { useNavigate, useLocation } from 'react-router-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbsWithSearch';
import { AppContext } from '../../Context/App.context';
import axios from 'axios';
import { API_DOMAIN } from '../../Variables/globals.variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../../Context/Notification.context';
import moment from "moment";

const Delivery = () => {
  const navigate = useNavigate();
  const queryParams = useLocation();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchText, setSearchText] = useState(undefined);
  const [apiCallDone, setApiCallDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)



  useEffect(() => {
    getPickups();
  }, []);

  
  useEffect(()=>{
    BackHandler.removeEventListener('hardwareBackPress', backAction);
  },[])
  const backAction = async () => {
    return false
  }
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
        setOrders(res.data.detail);
        if(queryParams.search && queryParams.search !=''){
          const index= queryParams.search.replace('?','');
          setCurrentIndex(index)
          }
        setAllOrders(res.data.detail);
        session.setIsLoading(false);
        setApiCallDone(true)
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
  const getItemLayout = (data, index) => ({
    length: 140,
    offset: 140 * index,
    index,
  })

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <BreadCrumbs
        title="Delivery"
        showSearchIcon
        value={searchText}
        onChange={setSearchText}
        path=''
        index={-1}
        handleSearch={() => {
          handleFilter();
        }}
      />
       {apiCallDone && (
        <>
        <View style={Styles.contentSection}>
        <FlatList
                    data={orders}
                    getItemLayout={getItemLayout}
                    initialScrollIndex={currentIndex}
                    renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={Styles.card}
                onPress={() => {
                  navigate(`/order/${item.id}`,{state:{index:index, page:'delivery'}});
                }}>
                <Text style={Styles.name}>
                  {item.customer_first_name + ' ' + item.customer_last_name}
                </Text>
                <Text style={Styles.orderId}>Order Id</Text>
                <Text style={Styles.orderIdNumber}>{item.order_id}</Text>
                <Text style={Styles.createdAt}>{moment(item.created_at).format('DD-MM-YYYY, hh:mm:ss')}</Text>

              </TouchableOpacity>
            )}
            />
        </View>
        </>
       )}
    </>
  );
};

export default Delivery;
