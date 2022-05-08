import { Dimensions, StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: Constants.appBackgroundColor,
    flex: 1,
    height: Dimensions.get('window').height,
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 9,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: Constants.primaryColor,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white',
  },
  userSection: {
    borderRadius: 33,
    backgroundColor: Constants.appBackgroundColor,
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  imageSection: {
    borderRadius: 33,
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.primaryColor,
    padding: 24,
  },
  email: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    flex: 1,
    flexWrap: 'wrap',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 110,
  },
  profileBtn: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginRight: 12,
    marginLeft: 12,
  },
  icon: {
    marginRight: 8,
  },
  menuSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: Constants.appBackgroundColor,
    borderBottomWidth: 2,
  },
  menuName: {
    marginLeft: 17,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    justifyContent: 'center',
    color: Constants.headingColor,
  },
  menuIcon: {
    width: 26,
    height: 26,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconImage: {
    width: 16,
    height: 20,
  },
  rightMenuIcon: {
    marginLeft: 'auto',
    width: 26,
    height: 26,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
