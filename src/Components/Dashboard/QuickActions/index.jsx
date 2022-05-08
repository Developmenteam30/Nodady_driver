import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Styles from './QuickActions.styles';
import { useNavigate } from 'react-router-native';
import rechargeImg from '../../../Assets/Images/delivery.png';
import barcodeImg from '../../../Assets/Images/barcode.png';
import statisticsImg from '../../../Assets/Images/statistics.png';
import addOrderImg from '../../../Assets/Images/pickup.png';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <Text style={Styles.heading}>Dashboard</Text>
      <View style={Styles.actionsSection}>
        <TouchableOpacity
          style={Styles.actionCardAddOrder}
          onPress={() => navigate('/pickup')}>
          <Image source={addOrderImg} style={Styles.actionImage} />
          <Text style={Styles.actionText}>Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.actionCardQuickRecharge}
          onPress={() => navigate('/delivery')}>
          <Image source={rechargeImg} style={Styles.actionImage} />
          <Text style={Styles.actionText}>Delivery</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.actionsSection}>
        <TouchableOpacity
          style={Styles.actionCardCalculator}
          onPress={() => navigate('/barcode-scanner')}>
          <Image source={barcodeImg} style={Styles.actionImage} />
          <Text style={Styles.actionText}>Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.actionCardScanner}
          onPress={() => navigate('/statistics')}>
          <Image source={statisticsImg} style={Styles.actionImage} />
          <Text style={Styles.actionText}>Statistics</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.actionsSection}>
        <TouchableOpacity
          style={Styles.actionCardCustomer}
          onPress={() => navigate('/customer-support')}>
          <Image source={barcodeImg} style={Styles.actionImage} />
          <Text style={Styles.actionText}>Customer Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.noCard}></TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickActions;
