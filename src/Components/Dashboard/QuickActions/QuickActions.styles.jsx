import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-SemiBold',
    color: Constants.headingColor,
    fontSize: 18,
    marginBottom: 12,
    marginTop: 16,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionCardAddOrder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Constants.lightColor,
    backgroundColor: '#BAF5BC',
    height: Dimensions.get('window').width / 2 - 50,
    padding: 12,
    width: Dimensions.get('window').width / 2 - 50,
  },
  actionCardQuickRecharge: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Constants.lightColor,
    backgroundColor: '#CECDFF',
    height: Dimensions.get('window').width / 2 - 50,
    padding: 12,
    width: Dimensions.get('window').width / 2 - 50,
  },
  actionCardCalculator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Constants.lightColor,
    backgroundColor: '#B6EEF2',
    height: Dimensions.get('window').width / 2 - 50,
    padding: 12,
    width: Dimensions.get('window').width / 2 - 50,
  },
  actionCardScanner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Constants.lightColor,
    backgroundColor: '#B8D5FF',
    height: Dimensions.get('window').width / 2 - 50,
    padding: 12,
    width: Dimensions.get('window').width / 2 - 50,
  },
  actionText: {
    color: Constants.headingColor,
    marginTop: 11,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  actionImage: {
    width: 55,
    height: 55,
  },
});

export default Styles;
