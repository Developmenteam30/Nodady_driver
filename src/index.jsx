import React, { Suspense } from 'react';
import NavigationRoutes from './Routes';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { View } from 'react-native';
import AppContextProvider from './Context/App.context';
import Wrapper from './Wrapper';
import NotificationContextProvider from './Context/Notification.context';

const Main = () => {
  return (
    <NotificationContextProvider>
      <AppContextProvider>
        <Suspense fallback={<View></View>}>
          <NativeRouter>
            <Wrapper />
            <Routes>
              <Route exact path="/" element={<NavigationRoutes.SignIn />} />
              <Route
                exact
                path="/signin"
                element={<NavigationRoutes.SignIn />}
              />
              <Route
                exact
                path="/profile"
                element={<NavigationRoutes.Profile />}
              />
              <Route
                exact
                path="/settings"
                element={<NavigationRoutes.Settings />}
              />
              <Route
                exact
                path="/statistics"
                element={<NavigationRoutes.Statistics />}
              />
              <Route
                path="/order/:id"
                element={<NavigationRoutes.SpecificDelivery />}
              />
              <Route
                exact
                path="/change-password"
                element={<NavigationRoutes.ChangePassword />}
              />
              <Route
                path="/otp-delivery/:id"
                element={<NavigationRoutes.OTPDelivery />}
              />
              <Route path="/pickup" element={<NavigationRoutes.Pickup />} />
              <Route path="/delivery" element={<NavigationRoutes.Delivery />} />
              <Route
                exact
                path="/barcode-scanner"
                element={<NavigationRoutes.BarCodeScanner />}
              />
              <Route
                exact
                path="/forgot-password"
                element={<NavigationRoutes.ForgotPassword />}
              />
              <Route
                exact
                path="/customer-support"
                element={<NavigationRoutes.CustomerSupport />}
              />
              <Route
                exact
                path="/phonenumber-signin"
                element={<NavigationRoutes.PhoneNumberSignIn />}
              />
              <Route
                exact
                path="/dashboard"
                element={<NavigationRoutes.Dashboard />}
              />
            </Routes>
          </NativeRouter>
        </Suspense>
      </AppContextProvider>
    </NotificationContextProvider>
  );
};

export default Main;
