import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  contentSection: {
    padding: 24,
    flex: 1,
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
    marginBottom: 42,
  },
  inputFields: {
    marginVertical: 10,
  },
  buttonSection: {
    marginTop: 20,
  },
});

export default Styles;
