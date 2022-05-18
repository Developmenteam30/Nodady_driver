import React, { createContext, useContext, useRef, useState } from 'react';
import Loader from '../Components/Loader';
import { NotificationContext } from './Notification.context';
import { API_DOMAIN } from '../Variables/globals.variables';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const AppContext = createContext();

export default props => {
  const notification = useContext(NotificationContext);
  const isCurrentHomePage = useRef(true);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [companyName, setCompanyName] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState(undefined);
  const goPage = useRef(undefined);

  const checkPinCodeIsValid = async pincode => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authData');
      const res = await axios.post(
        `${API_DOMAIN}/api/v1/check-available-pincode`,
        {
          pincode: pincode,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(token).token}`,
          },
        },
      );
      if (res?.data) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
  const [forwardOrderDetails, setForwardOrderDetails] = useState({
    order_id: new Date().getTime(),
    order_type: 'forward',
    pickup_address_line_1: undefined,
    pickup_address_line_2: '',
    pickup_city: undefined,
    pickup_state: undefined,
    pickup_pincode: undefined,
    delivery_address_line_1: undefined,
    delivery_address_line_2: '',
    delivery_landmark: '',
    delivery_city: undefined,
    delivery_state: undefined,
    delivery_pincode: undefined,
    customer_first_name: undefined,
    customer_last_name: undefined,
    customer_phone_number: undefined,
    customer_alternate_phone_number: '',
    customer_email: undefined,
    payment_mode: undefined,
    product_description: undefined,
    product_price: undefined,
    sku: '',
    hsn: '',
    product_weight: undefined,
    product_length: undefined,
    product_breadth: undefined,
    product_height: undefined,
    order_price: undefined,
    save_customer_address: false,
  });

  return (
    <AppContext.Provider
      value={{
        isCurrentHomePage,
        phoneNumber,
        setPhoneNumber,
        isLoading,
        setIsLoading,
        signUpDetails,
        setSignUpDetails,
        checkPinCodeIsValid,
        forwardOrderDetails,
        setForwardOrderDetails,
        companyName,
        setCompanyName,
        goPage,
      }}>
      {isLoading && <Loader />}
      {props.children}
    </AppContext.Provider>
  );
};
