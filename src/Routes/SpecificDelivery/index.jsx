import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, StatusBar, BackHandler } from 'react-native';
import BreadCrumbs from '../../Components/Shared/BreadCrumbs';
import Styles from './SpecificDelivery.styles';
import { useNavigate, useParams, useLocation } from 'react-router-native';
import Button from '../../Components/Shared/Button';
import Constants from '../../Variables/colors.variables';
import CodIcon from '../../Assets/Images/cod.png';
import LocationIcon from '../../Assets/Images/location.png';
import WeightIcon from '../../Assets/Images/weight.png';
import DownArrow from '../../Assets/Images/Uparrow.png';

import { useContext } from 'react';
import { AppContext } from '../../Context/App.context';
import { NotificationContext } from '../../Context/Notification.context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DOMAIN } from '../../Variables/globals.variables';
import DownloadIcon from '../../Assets/Images/download.png';
import RNFetchBlob from 'rn-fetch-blob';
import ConfirmationModal from '../../Components/ConfirmationModal';
import moment from "moment";


const SpecificDelivery = () => {
  const params = useParams();
  const session = useContext(AppContext);
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  const [buttons, setButtons] = useState([]);
  const [apiCallMade, setApiCallMade] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelModal, setCancelModal] = useState(false);
  const { state } = useLocation();
const [index, setIndex] = useState(-1);
const [page,setPage]= useState('')

  useEffect(() => {
    getPickups();
    if(state){
      setIndex(state.index)
      setPage(state.page)
    }
  }, []);
  useEffect(() => {
    console.log('callin back')
    if (!state || !session) {
      return;
    }
    if(state && state.page =='delivery' || state && state.page =='pickup'){
    const back =  BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      back.remove();
    }else{
      return
    }
  }, []);

  const backAction = async () => {
    console.log('back button call', state)
    if (state && state.index>-1) {
      navigate({
        pathname:  '/'+ `${state.page}`,
        search: `${state.index}`
      })
      console.log(state, 'stt')
      return true;
    } else {
      // navigate(-1);
      console.log(state, 'stt2')

      return false;
    }
  };

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
        setApiCallMade(true);
        session.setForwardOrderDetails(res.data.detail);
        session.setIsLoading(false);
      }
    } catch (error) {
      session.setIsLoading(false);
      if (error.response.data.detail) {
        navigate(-1);
        return notification.setNotificationObject({
          type: 'error',
          message: error.response.data.detail,
        });
      }
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

  const handleSubmit = async () => {
    try {
      session.setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      if (!cancelNote) {
        return notification.setNotificationObject({
          type: 'error',
          message: 'Please enter cancel note.',
        });
      }
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/update-order`,
        {
          post_value: 'cancelled',
          order_id: params.id,
          cancel_note: cancelNote,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        setCancelModal(false);
        getPickups();
        session.setIsLoading(false);
        return notification.setNotificationObject({
          type: 'success',
          message: 'Status Changed',
        });
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

  const handleUpdate = async val => {
    try {
      if (val === 'completed') {
        navigate(`/otp-delivery/${params.id}`);
        return;
      }
      if (val === 'cancelled') {
        setCancelModal(true);
        return;
      }
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

  const download = () => {
    try {
      session.setIsLoading(true);
      const { config, fs } = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;

      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
          notification: true,
          path: DownloadDir + '/orders_' + Math.floor(new Date()) + '.pdf', // this is the path where your downloaded file will live in
          description: 'Downloading details.',
        },
      };
      config(options)
        .fetch(
          'GET',
          `${API_DOMAIN}/api/v1/rider-order-reciept?order_id=${session.forwardOrderDetails.id}`,
        )
        .then(res => {
          session.setIsLoading(false);
          notification.setNotificationObject({
            type: 'success',
            message: 'Orders details downloaded',
          });
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {apiCallMade && (
        <>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <BreadCrumbs
            path={page=='delivery' ? '/delivery':'/pickup'}
            index = {index}
            title={`Order ID: #${session.forwardOrderDetails.order_id}`}
          />
          {cancelModal && (
            <ConfirmationModal
              hideCancelBtn
              confirmButtonText={'DONE'}
              handleConfirm={() => handleSubmit()}
              text={'Why you want to cancel the order?'}
              showInput
              value={cancelNote}
              onChange={setCancelNote}
              handleClose={() => setCancelModal(false)}
            />
          )}
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={Styles.container}>
              <View style={Styles.cardSection}>
              <View style={Styles.card}>
                  <Image source={LocationIcon} />
                  <Text style={Styles.subHeading}>
                    {session.forwardOrderDetails.pickup_state}
                  </Text>
                  <Text style={Styles.subText}>
                    {session.forwardOrderDetails.pickup_pincode}
                  </Text>
                  <Image
                    source={DownArrow}
                    style={{
                      transform: [{ rotate: '180deg' }],
                      marginTop: 10,
                      width: 16,
                      height: 12,
                    }}
                  />
                  <Image
                    source={DownArrow}
                    style={{
                      transform: [{ rotate: '180deg' }],
                      marginBottom: 10,
                      width: 16,
                      height: 12,
                    }}
                  />
                  <Text style={Styles.subHeading}>
                    {session.forwardOrderDetails.delivery_state}
                  </Text>
                  <Text style={Styles.subText}>
                    {session.forwardOrderDetails.delivery_pincode}
                  </Text>
                </View>
                <View style={Styles.card}>
                  <Image source={CodIcon} />
                  <Text style={{ ...Styles.subHeading, marginTop: 30 }}>
                    {session.forwardOrderDetails?.payment_mode?.toUpperCase()}
                  </Text>
                  <Text style={Styles.subText}>
                    ₹{' '}
                    {session.forwardOrderDetails?.payment_mode?.toUpperCase() ===
                    'COD'
                      ? session.forwardOrderDetails?.product_price
                      : '0'}
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
              <View style={Styles.buttonSection}>
                <Button
                  text={'DOWNLOAD ORDER RECIEPT'}
                  onPress={() => download()}
                  color={Constants.primaryColor}
                  backgroundColor="white"
                  borderColor={Constants.primaryColor}
                  borderWidth={1}
                  icon={DownloadIcon}
                />
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
                  <View>
                    <Text style={Styles.subText}>Pickup Phone Number</Text>
                    <Text style={Styles.subTitle}>
                      {session.forwardOrderDetails.pickup_phone_number}
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
                      {moment(
                        session.forwardOrderDetails.created_at).format('DD-MM-YYYY, hh:mm:ss')}
                    </Text>
                  </View>
                  {/* <View style={{ width: '50%' }}>
                    <Text style={Styles.subText}>Total Product Price</Text>
                    <Text style={Styles.subTitle}>
                      Rs. {session.forwardOrderDetails.product_price}
                    </Text>
                  </View> */}
                </View>
                {/* <View style={Styles.rowSection}>
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
                </View> */}
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
      )}
    </>
  );
};

export default SpecificDelivery;
