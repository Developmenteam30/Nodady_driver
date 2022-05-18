import React, { useState } from 'react';
import { Text, View, Image, ScrollView, StatusBar } from 'react-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import Styles from './CustomerSupport.styles';
import { useNavigate, useParams } from 'react-router-native';
import Button from '../../Components/Shared/Button';
import Constants from '../../Variables/colors.variables';
import { useContext } from 'react';
import { AppContext } from '../../Context/App.context';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DOMAIN } from '../../Variables/globals.variables';
import Input from '../../Components/Shared/Input';

const SpecificDelivery = () => {
  const [value, setValue] = useState(undefined);
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const [apiCallMade, setApiCallMade] = useState(undefined);
  const [data, setData] = useState(undefined);

  const handleUpdate = async val => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/customer-support-check-parcel-status`,
        {
          order_id: value,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data?.detail) {
        console.log(res.data);
        setData(res.data.detail);
        setApiCallMade(true);
        session.setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
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
      <BreadCrumbs title={`Customer Support`} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={Styles.container}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={Styles.inputSection}>
              <Input
                value={value}
                onChange={setValue}
                fullWidth
                label={'Enter order id'}
              />
            </View>
            <View style={{ width: '20%' }}>
              <Button
                text={'Submit'}
                onPress={() => handleUpdate()}
                backgroundColor={Constants.primaryColor}></Button>
            </View>
          </View>
          {apiCallMade && (
            <>
              <View style={Styles.shipmentSection}>
                <Text style={Styles.heading}>Order Details</Text>
                <View
                  style={{
                    ...Styles.rowSection,
                    marginTop: 16,
                  }}>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Owner Name</Text>
                    <Text style={Styles.subTitle}>{data.owner_full_name}</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Product Price</Text>
                    <Text style={Styles.subTitle}>{data.product_price}</Text>
                  </View>
                </View>
                <View
                  style={{
                    ...Styles.rowSection,
                    marginVertical: 16,
                  }}>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Phone Number</Text>
                    <Text style={Styles.subTitle}>{data.phone_number}</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Product Description</Text>
                    <Text style={Styles.subTitle}>
                      {data.product_description}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...Styles.rowSection,
                    marginVertical: 16,
                  }}>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Customer Name</Text>
                    <Text style={Styles.subTitle}>
                      {data.customer_full_name}
                    </Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Customer Phone Number</Text>
                    <Text style={Styles.subTitle}>
                      {data.customer_phone_number}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...Styles.rowSection,
                    marginVertical: 16,
                  }}>
                  <View style={{ width: '100%' }}>
                    <Text style={Styles.subText}>Custmer Full Address</Text>
                    <Text style={Styles.subTitle}>
                      {data.customer_full_address}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={Styles.shipmentSection}>
                <Text style={Styles.heading}>Rider Details</Text>
                <View style={Styles.rowSection}>
                  <View
                    style={{
                      ...Styles.rowSection,
                      justifyContent: 'space-between',
                      width: '90%',
                    }}>
                    <View style={{ width: '45%' }}>
                      <Text style={Styles.subText}>Order ID</Text>
                      <Text style={Styles.subTitle}>{data.order_id}</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                      <Text style={Styles.subText}>Payment Method</Text>
                      <Text style={Styles.subTitle}>
                        {data?.payment_mode?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Styles.rowSection}>
                  <View
                    style={{
                      ...Styles.rowSection,
                      justifyContent: 'space-between',
                      width: '90%',
                      marginTop: 16,
                    }}>
                    <View style={{ width: '45%' }}>
                      <Text style={Styles.subText}>Rider Name</Text>
                      <Text style={Styles.subTitle}>{data.rider_name}</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                      <Text style={Styles.subText}>Status</Text>
                      <Text style={Styles.subTitle}>
                        {data?.status?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Styles.rowSection}>
                  <View
                    style={{
                      ...Styles.rowSection,
                      marginTop: 16,
                    }}>
                    <View style={{ width: '100%' }}>
                      <Text style={Styles.subText}>
                        Payment recieved to company
                      </Text>
                      <Text style={Styles.subTitle}>
                        {data.payment_recieved_to_company}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Styles.rowSection}>
                  <View
                    style={{
                      ...Styles.rowSection,
                      marginTop: 16,
                    }}>
                    <View style={{ width: '100%' }}>
                      <Text style={Styles.subText}>
                        Payment recieved to rider
                      </Text>
                      <Text style={Styles.subTitle}>
                        {data.payment_recieved_to_rider}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Styles.rowSection}>
                  <View
                    style={{
                      ...Styles.rowSection,
                      marginTop: 16,
                    }}>
                    <View style={{ width: '100%' }}>
                      <Text style={Styles.subText}>
                        Payment transfered to owner
                      </Text>
                      <Text style={Styles.subTitle}>
                        {data.payment_transfered_to_owner}
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
                    <Text style={Styles.subText}>Last updated on</Text>
                    <Text style={Styles.subTitle}>{data.last_update}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default SpecificDelivery;
