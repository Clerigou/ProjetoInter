import React, {useContext} from 'react';

import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../commonStyles';

import {AuthContext} from '../contexts/auth';

export default function CommonModal() {
  const {commonModal, setCommonModal, msg} = useContext(AuthContext);

  return (
    <Modal transparent={true} visible={commonModal}>
      <Pressable onPress={() => setCommonModal(false)} style={styles.modal}>
        <View style={styles.modal_container}>
          <View style={styles.error_titulo}>
            <Text style={styles.error_titulo_text}>{msg.titulo}</Text>
          </View>

          <View style={styles.error}>
            <Text style={styles.error_text}>{msg.msg}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonOk}>
              <Text style={styles.buttonOk_text}> Ok </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    width: '85%',
    backgroundColor: colors.background_secundary,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: scale(15),
    paddingBottom: scale(10),
  },
  error_titulo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.background_primary,
  },
  error_titulo_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error_text: {
    fontSize: 19,
    color: colors.background_primary_dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonOk: {
    width: '30%',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background_primary_dark,
  },
  buttonOk_text: {
    fontSize: 20,
    color: 'white',
  },
});
