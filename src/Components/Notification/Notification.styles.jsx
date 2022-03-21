import { StyleSheet } from 'react-native';
import Constants from '../../Variables/colors.variables';

const Styles = StyleSheet.create({
  mainSection: {
    top: 8,
    left: 8,
    right: 8,
    zIndex: 2,
    position: 'absolute',
    opacity: 1,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  notifIcon: {
    flexDirection: 'row',
    opacity: 0.9,
    paddingVertical: 7,
    marginRight: 12,
  },
  notifMessage: {
    paddingVertical: 8,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    marginRight: 12,
    flex: 1,
  },
  closeBtn: {
    marginLeft: 'auto',
    marginRight: 8,
  },
});

export default Styles;
