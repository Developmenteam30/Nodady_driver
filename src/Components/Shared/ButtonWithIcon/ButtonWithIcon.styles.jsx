import { StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  textInput: {
    paddingLeft: 20,
    paddingVertical: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'transparent',
    color: Constants.headingColor,
  },
  inputContainer: {
    backgroundColor: Constants.lightColor,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  iconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
