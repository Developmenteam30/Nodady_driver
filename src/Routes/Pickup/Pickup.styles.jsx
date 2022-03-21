import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  contentSection: {
    padding: 24,
    flex: 1,
    backgroundColor: Constants.appBackgroundColor,
  },
  outerSection: {
    flex: 1,
  },
  inputFields: {
    marginVertical: 10,
  },
  buttonSection: {
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 6,
    padding: 20,
  },
  name: {
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    color: Constants.headingColor,
  },
  orderId: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    color: Constants.activeInputColor,
  },
  orderIdNumber: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    color: Constants.primaryColor,
  },
});

export default Styles;
