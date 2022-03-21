import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, StatusBar } from 'react-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import Styles from './SpecificDelivery.styles';
import { useNavigate, useParams } from 'react-router-native';
import Button from '../../Components/Shared/Button';
import Constants from '../../Variables/colors.variables';
import CodIcon from '../../Assets/Images/cod.png';
import LocationIcon from '../../Assets/Images/location.png';
import WeightIcon from '../../Assets/Images/weight.png';
import { useContext } from 'react';
import { AppContext } from '../../Context/App.context';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DOMAIN } from '../../Variables/globals.variables';

const SpecificDelivery = () => {
  const params = useParams();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    getPickups();
  }, []);

  const getPickups = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/order-detail/${params.id}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        setButtons(res.data.detail.button);
        session.setForwardOrderDetails(res.data.detail);
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

  const handleUpdate = async val => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/update-order`,
        {
          post_value: val,
          order_id: params.id,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        getPickups();
        session.setIsLoading(false);
        return notification.setNotificationObject({
          type: 'success',
          message: 'Status Changed',
        });
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
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <BreadCrumbs title={`Order ID: #${params.orderId}`} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={Styles.container}>
          <View style={Styles.cardSection}>
            <View style={Styles.card}>
              <Image source={LocationIcon} />
              <Text style={{ ...Styles.subHeading, marginTop: 30 }}>
                {session.forwardOrderDetails.delivery_state}
              </Text>
              <Text style={Styles.subText}>
                {session.forwardOrderDetails.delivery_pincode}
              </Text>
            </View>
            <View style={Styles.card}>
              <Image source={CodIcon} />
              <Text style={Styles.subHeading}>
                {session.forwardOrderDetails?.payment_mode?.toUpperCase()}
              </Text>
              <Text style={Styles.subText}></Text>
              <View style={{ marginTop: 15 }} />
              <View style={{ marginBottom: 15 }} />
              <Text style={Styles.subHeading}>Order Value</Text>
              <Text style={{ ...Styles.subHeading, marginTop: 0 }}>
                ₹ {session.forwardOrderDetails?.order_price}
              </Text>
            </View>
            <View style={Styles.card}>
              <Image source={WeightIcon} />
              <Text style={Styles.subHeading}>Applicable{'\n'} Weight</Text>
              <View style={{ marginTop: 15 }} />
              <View style={{ marginBottom: 15 }} />
              <Text style={Styles.subHeading}>
                {session.forwardOrderDetails.product_weight} KG
              </Text>
              <Text style={Styles.subText}>Entered Weight</Text>
            </View>
          </View>
          <View style={Styles.shipmentSection}>
            <Text style={Styles.heading}>Shipment Details</Text>
            <View style={Styles.rowSection}>
              <View>
                <Text style={Styles.subText}>Pickup Address</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.pickup_address_line_1}{' '}
                  {session.forwardOrderDetails.pickup_address_line_2}
                </Text>
              </View>
            </View>
            <View style={{ ...Styles.rowSection, marginTop: 16 }}>
              <View>
                <Text style={Styles.subText}>Delivery Address</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.delivery_address_line_1}{' '}
                  {session.forwardOrderDetails.delivery_address_line_2}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...Styles.rowSection,
                marginTop: 16,
              }}>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Customer Name</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.customer_first_name}{' '}
                  {session.forwardOrderDetails.customer_last_name}
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Reseller Name</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.reseller_name}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...Styles.rowSection,
                marginVertical: 16,
              }}>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Customer Email</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.customer_email}
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Customer Phone</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.customer_phone_number}
                </Text>
              </View>
            </View>
          </View>
          <View style={Styles.shipmentSection}>
            <Text style={Styles.heading}>Order Details</Text>
            <View style={Styles.rowSection}>
              <View
                style={{
                  ...Styles.rowSection,
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <View style={{ width: '45%' }}>
                  <Text style={Styles.subText}>Order ID</Text>
                  <Text style={Styles.subTitle}>
                    {session.forwardOrderDetails.order_id}
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={Styles.subText}>Payment Method</Text>
                  <Text style={Styles.subTitle}>
                    {session.forwardOrderDetails?.payment_mode?.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                ...Styles.rowSection,
                marginTop: 16,
              }}>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Order Created on</Text>
                <Text style={Styles.subTitle}>
                  {new Date(
                    session.forwardOrderDetails.created_at,
                  ).toLocaleDateString()}
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={Styles.subText}>Total Product Price</Text>
                <Text style={Styles.subTitle}>
                  Rs. {session.forwardOrderDetails.order_price}
                </Text>
              </View>
            </View>
            <View style={Styles.rowSection}>
              <View
                style={{
                  ...Styles.rowSection,
                  marginTop: 16,
                  width: '90%',
                }}>
                <View style={{ width: '45%' }}>
                  <Text style={Styles.subText}>SKU</Text>
                  <Text style={Styles.subTitle}>
                    {session.forwardOrderDetails.sku || '-'}
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={Styles.subText}>HSN</Text>
                  <Text style={Styles.subTitle}>
                    {session.forwardOrderDetails.hsn || '-'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                ...Styles.rowSection,
                marginVertical: 16,
                width: '90%',
              }}>
              <View style={{ width: '45%' }}>
                <Text style={Styles.subText}>Unit Price</Text>
                <Text style={Styles.subTitle}>
                  Rs. {session.forwardOrderDetails.product_price}
                </Text>
              </View>
              <View style={{ width: '45%' }}>
                <Text style={Styles.subText}>Quantity</Text>
                <Text style={Styles.subTitle}>
                  {session.forwardOrderDetails.quantity}
                </Text>
              </View>
            </View>
            <View style={Styles.allButtonSection}>
              {buttons.map((obj, i) => {
                return (
                  <View key={i} style={Styles.editButtonSection}>
                    <Button
                      text={obj.name}
                      onPress={() => {
                        handleUpdate(obj.post_value);
                      }}
                      color={obj.status ? 'white' : Constants.primaryColor}
                      backgroundColor={
                        obj.status ? Constants.primaryColor : 'white'
                      }
                      borderColor={Constants.primaryColor}
                      borderWidth={1}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SpecificDelivery;
