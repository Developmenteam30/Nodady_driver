import { StyleSheet, Dimensions } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: 12,
  },
  cameraStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width / 1.75,
    height: Dimensions.get('window').width / 1.75,
  },
  markerStyle: {
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 40,
    borderStyle: 'dashed',
    width: Dimensions.get('window').width / 1.75 + 100,
    height: Dimensions.get('window').width / 1.75 + 100,
  },
  inputSection: {
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 50,
  },
  buttonSection: {
    marginVertical: 24,
  },
});

export default Styles;
