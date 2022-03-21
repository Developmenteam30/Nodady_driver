import React, { useEffect, useContext } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import Styles from './Dashboard.styles';
import TopHeader from '../../Components/Headers/TopHeader';
import QuickActions from '../../Components/Dashboard/QuickActions';
import { AppContext } from '../../Context/App.context';
import Constants from '../../Variables/colors.variables';

const Dashboard = () => {
  const session = useContext(AppContext);

  useEffect(() => {
    session.isCurrentHomePage.current = true;
    return () => {
      if (session.isCurrentHomePage.current) {
        session.isCurrentHomePage.current = false;
      }
    };
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={Constants.primaryColor}
        barStyle="light-content"
      />
      <TopHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.container}>
        <QuickActions />
      </ScrollView>
    </>
  );
};

export default Dashboard;
