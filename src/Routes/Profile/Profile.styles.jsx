import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.appBackgroundColor,
  },
  section: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: Constants.appBackgroundColor,
    paddingHorizontal: 30,
  },
  deadWeightInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  postFix: {
    marginLeft: 'auto',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  singleButtonSection: {
    width: '48%',
  },
  buttonSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cameraSection: {
    backgroundColor: Constants.primaryColor,
    width: 44,
    height: 44,
    alignItems: 'center',
    borderRadius: 22,
    justifyContent: 'center',
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 5,
    top: 55,
  },
  inputSection: {
    marginVertical: 12,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageSection: {
    borderRadius: 50,
    backgroundColor: 'white',
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userSection: {
    borderRadius: 50,
    backgroundColor: 'white',
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 40,
    color: Constants.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 100,
  },
});

export default Styles;
