import { StyleSheet } from 'react-native';
import Constants from '../../../Variables/colors.variables';

const Styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    alignItems: 'center',
    backgroundColor: Constants.primaryColor,
    padding: 24,
  },
});

export default Styles;
