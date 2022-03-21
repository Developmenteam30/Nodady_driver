import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  contentSection: {
    padding: 24,
    flex: 1,
    marginTop: 26,
  },
  outerSection: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: Constants.headingColor,
  },
  subTitleHeading: {
    color: Constants.primaryColor,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
    marginBottom: 32,
    color: Constants.activeInputColor,
  },
  inputFields: {
    marginBottom: 40,
  },
});

export default Styles;
