import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    marginHorizontal: 20,
    minWidth: Dimensions.get('window').width - 42,
    marginVertical: 'auto',
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  imageSection: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 4,
    color: Constants.headingColor,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 22,
  },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 44,
    borderRadius: 7,
    backgroundColor: Constants.primaryColor,
  },
  confirmButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: Constants.primaryColor,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 44,
    borderRadius: 7,
  },
  cancelButtonText: {
    color: Constants.primaryColor,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
});

export default Styles;
