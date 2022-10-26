import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CellPhoneMask, MaskCPF} from '../global/mask';
import {colors} from '../commonStyles';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function UsersCard({user, handleZoomModal}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textCards}>
        Nome:{' '}
        {user.name.length > 12 ? `${user.name.slice(0, 12)}...` : user.name}
      </Text>
      <Text style={styles.textCards}>
        Nome:{' '}
        {user.endereco.length > 12
          ? `${user.endereco.slice(0, 12)}...`
          : user.endereco}
      </Text>
      <Text style={styles.textCards}>CEP: {user.cep}</Text>
      <Text style={styles.textCards}>Ano: {user.nascimento}</Text>
      <Text style={styles.textCards}>CPF: {MaskCPF(user.cpf.toString())}</Text>
      <Text style={styles.textCards}>Tel: {CellPhoneMask(user.telefone)}</Text>
      <Text style={styles.textCards}>
        Email:{' '}
        {user.email.length > 12 ? `${user.email.slice(0, 12)}...` : user.email}
      </Text>
      <TouchableOpacity
        style={styles.zoomButton}
        onPress={() => {
          handleZoomModal(user);
        }}>
        <Text>Zoom</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(135),
    height: verticalScale(160),
    backgroundColor: colors.background_primary_dark,
    borderRadius: 15,
    margin: moderateScale(12),
    padding: moderateScale(12),
  },
  textCards: {
    fontSize: scale(10),
  },
  zoomButton: {
    width: '70%',
    height: verticalScale(26),
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
});
