import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  buttonSection: {
    padding: 24,
    width: '100%',
  },
  editButtonSection: {
    width: '50%',
    paddingHorizontal: 6,
    paddingBottom: 12,
  },
  allButtonSection: {
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  cardSection: {
    paddingHorizontal: 24,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 8,
    minHeight: 200,
    minWidth: Dimensions.get('window').width / 3 - 20,
    maxWidth: Dimensions.get('window').width / 3 - 20,
  },
  subHeading: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 18,
    color: Constants.headingColor,
    marginTop: 6,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: Constants.activeInputColor,
  },
  shipmentSection: {
    paddingHorizontal: 24,
    borderBottomColor: Constants.lightGrayColor,
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 12,
  },
  heading: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: Constants.headingColor,
    marginBottom: 10,
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Constants.primaryColor,
    marginLeft: 4,
  },
  inputSection: {
    width: '70%',
    marginHorizontal: 16,
  },
});

export default Styles;
