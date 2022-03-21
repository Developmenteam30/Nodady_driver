import React, { useRef, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomModal = ({ handleClose, Component, height, maxHeight }) => {
  const refRBSheet = useRef();

  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <RBSheet
      ref={refRBSheet}
      onClose={() => handleClose()}
      animationType="slide"
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 12,
          flex: 1,
          maxHeight: maxHeight && maxHeight,
          minHeight: height ? height : Dimensions.get('window').height / 3,
        },
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Component />
      </ScrollView>
    </RBSheet>
  );
};

export default BottomModal;
