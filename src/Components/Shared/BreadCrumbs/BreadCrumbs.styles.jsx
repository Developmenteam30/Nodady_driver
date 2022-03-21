import { StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginHorizontal: 24,
    width: 40,
    height: 40,
  },
  leftArrow: {
    width: 23,
    height: 14,
  },
  rightButton: {
    marginTop: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  timer: {
    marginTop: 24,
    marginHorizontal: 24,
    color: Constants.primaryColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  resendButton: {
    marginTop: 24,
    marginHorizontal: 24,
    width: '30%',
  },
  signUpButton: {
    marginTop: 12,
    marginHorizontal: 24,
    width: '50%',
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 12,
    color: Constants.headingColor,
  },
});

export default Styles;
