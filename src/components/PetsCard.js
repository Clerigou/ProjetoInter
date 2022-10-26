import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../commonStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function PetsCard({pets, handleZoomModal}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textCards}>Nome: {pets.name}</Text>
      <Text style={styles.textCards}>Raça: {pets.raca}</Text>
      <Text style={styles.textCards}>Pelagem: {pets.pelagem}</Text>
      <Text style={styles.textCards}>Porte Fisico: {pets.porte}</Text>
      <Text style={styles.textCards}>Tipo: {pets.tipo}</Text>
      <Text style={styles.textCards}>Sexo: {pets.sexo}</Text>
      <Text style={styles.textCards}>Idade: {pets.idade}</Text>
      <Text style={styles.textCards}>Doenças: {pets.doencas}</Text>
      <Text style={styles.textCards}>Vacinas: {pets.vacinas}</Text>
      <Text style={styles.textCards}>
        Observações:{' '}
        {pets.obs.length > 12
          ? `${pets.observacoes.slice(0, 12)}...`
          : pets.obs}
      </Text>
      <TouchableOpacity
        style={styles.zoomButton}
        onPress={() => {
          handleZoomModal(pets);
        }}>
        <Text>Zoom</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: verticalScale(230),
    backgroundColor: colors.background_primary_dark,
    borderRadius: 15,
    margin: moderateScale(12),
    padding: moderateScale(12),
  },
  textCards: {
    fontSize: scale(11),
  },
  zoomButton: {
    width: '80%',
    height: verticalScale(30),
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(12),
  },
});
