import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import Input from '../Shared/Input';
import Styles from './ConfirmtionModal.styles';
import SuccessIcon from '../../Assets/Images/success.png';

const ConfirmationModal = ({
  handleClose,
  text,
  handleConfirm,
  confirmButtonText,
  cancelButtonText,
  fontSize,
  showInput,
  value,
  showSuccess,
  onChange,
  hideCancelBtn,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => handleClose()}>
      <TouchableOpacity
        style={Styles.modalContainer}
        onPress={() => handleClose()}>
        <View style={Styles.modalBody}>
          {showSuccess && (
            <View style={Styles.imageSection}>
              <Image source={SuccessIcon} />
            </View>
          )}
          <Text style={{ ...Styles.heading, fontSize: fontSize || 16 }}>
            {text}
          </Text>
          {showInput && (
            <View style={{ marginVertical: 8 }}>
              <Input
                label="Cancel Note"
                value={value}
                onChange={onChange}
                fullWidth
              />
            </View>
          )}
          <View style={Styles.buttonSection}>
            {!hideCancelBtn && (
              <TouchableOpacity
                onPress={() => handleClose()}
                style={Styles.cancelBtn}>
                <Text style={Styles.cancelButtonText}>
                  {cancelButtonText || 'Cancel'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handleConfirm()}
              style={Styles.confirmBtn}>
              <Text style={Styles.confirmButtonText}>{confirmButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;
