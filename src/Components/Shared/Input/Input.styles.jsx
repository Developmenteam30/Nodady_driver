import { StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  textInput: {
    fontSize: 12,
    color: Constants.activeInputColor,
    marginTop: -6,
  },
  textInputStyles: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Constants.headingColor,
  },
  inputContainerStyles: {
    position: 'absolute',
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: Constants.lightColor,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  iconContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
