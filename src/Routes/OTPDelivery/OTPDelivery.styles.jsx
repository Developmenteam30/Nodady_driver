import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  contentSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    flex: 1,
    borderTopRightRadius: 24,
  },
  outerSection: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: Constants.headingColor,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
    color: Constants.activeInputColor,
  },
  inputSection: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: Constants.lightColor,
    borderRadius: 30,
    width: 40,
    height: 40,
    padding: 0,
    color: Constants.primaryColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    justifyContent: 'center',
    marginBottom: 100,
  },
});

export default Styles;
