import { StyleSheet, Dimensions } from 'react-native';

const Styles = StyleSheet.create({
  contentSection: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
});

export default Styles;
