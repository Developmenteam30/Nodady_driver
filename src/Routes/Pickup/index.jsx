import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native';
import Styles from './Pickup.styles';
import { useNavigate, useLocation } from 'react-router-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbsWithSearch';
import { AppContext } from '../../Context/App.context';
import axios from 'axios';
import { API_DOMAIN } from '../../Variables/globals.variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../../Context/Notification.context';
import moment from "moment";

const Pickup = () => {
  const navigate = useNavigate();
  const queryParams = useLocation();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchText, setSearchText] = useState(undefined);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [apiCallDone, setApiCallDone] = useState(false);




  useEffect(() => {
    getPickups();
    BackHandler.removeEventListener('hardwareBackPress');

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
      const res = await axios.get(`${API_DOMAIN}/api/v1/pickup-list`, {
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
    length: 150,
    offset: 150 * index,
    index,
  })

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <BreadCrumbs
        title="Pickup"
        showSearchIcon
        value={searchText}
        onChange={setSearchText}
        handleSearch={() => handleFilter()}
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
                  navigate(`/order/${item.id}`,{state:{index:index, page:'pickup'}});
                }}>
                <Text style={Styles.name}>{item.business_owner}</Text>
                <Text style={Styles.orderId}>Order Id</Text>
                <Text style={Styles.orderIdNumber}>{item.order_id}</Text>
                <Text style={Styles.createdAt}>
                  {moment(item.created_at).format("DD-MM-YYYY ,  hh:mm:ss")}
                  </Text>


              </TouchableOpacity>
            )}
            />
        </View>
        </>
      )}
      {/* </ScrollView> */}
    </>
  );
};

export default Pickup;
