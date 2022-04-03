import { lazy } from 'react';
const SignIn = lazy(() => import('./SignIn'));
const Dashboard = lazy(() => import('./Dashboard'));
const PhoneNumberSignIn = lazy(() => import('./PhoneNumberSignIn'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const BarCodeScanner = lazy(() => import('./BarCodeScanner'));
const ChangePassword = lazy(() => import('./ChangePassword'));
const Pickup = lazy(() => import('./Pickup'));
const Delivery = lazy(() => import('./Delivery'));
const SpecificDelivery = lazy(() => import('./SpecificDelivery'));
const OTPDelivery = lazy(() => import('./OTPDelivery'));
const Statistics = lazy(() => import('./Statistics'));

export default {
  SignIn,
  Dashboard,
  ResetPassword,
  PhoneNumberSignIn,
  BarCodeScanner,
  Pickup,
  ChangePassword,
  Delivery,
  SpecificDelivery,
  OTPDelivery,
  Statistics,
};
