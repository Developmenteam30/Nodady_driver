import { StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Constants.lightColor,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: '100%',
    height: 50,
    backgroundColor: Constants.lightColor,
    color: Constants.headingColor,
  },
  label: {
    color: Constants.activeInputColor,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
});

export default Styles;
