import React from 'react';

import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '../commonStyles';

export default function ErrorModal({errorModal, setErrorModal, index}) {
  const msg = ['Email ou senha vazio \n preencha todos os campos!', 'blabla'];
  return (
    <Modal transparent={true} visible={errorModal}>
      <Pressable onPress={() => setErrorModal(false)} style={styles.modal}>
        <View style={styles.modal_container}>
          <View style={styles.error_titulo}>
            <Text style={styles.error_titulo_text}> Erro! </Text>
          </View>
          <View style={styles.error}>
            <Text style={styles.error_text}>{msg[index]}</Text>
          </View>
          <View style={styles.buttonOk}>
            <Text> Ok </Text>
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
    height: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: scale(20),
  },
  error_titulo: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.background_primary_dark,
  },
  error_titulo_text: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    marginTop: scale(20),
  },
  error_text: {
    fontSize: 19,
    color: colors.background_primary_dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonOk: {
    width: '100%',
    height: '25%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background_primary_dark,
  },
});
