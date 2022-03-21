import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  contentSection: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  outerSection: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 22,
    color: Constants.headingColor,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#c8c8c8',
    borderRadius: 4,
    padding: 12,
    width: '100%',
  },
  footerText: {
    color: Constants.headingColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  footerLinkText: {
    color: Constants.primaryColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  forgotPasswordText: {
    color: Constants.primaryColor,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
    marginTop: 5,
  },
  orSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  line: {
    flex: 1,
    borderRadius: 5,
    height: 1,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  orText: {
    width: 40,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Constants.activeInputColor,
    opacity: 0.33,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  elseSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  inputFields: {
    marginVertical: 10,
  },
});

export default Styles;
