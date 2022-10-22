import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../commonStyles';

export default function PetsCard({pets, handleZoomModal}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textCards}>Nome: {pets.nome}</Text>
      <Text style={styles.textCards}>Raça: {pets.raca}</Text>
      <Text style={styles.textCards}>Pelagem: {pets.pelagem}</Text>
      <Text style={styles.textCards}>Porte Fisico: {pets.porteFisico}</Text>
      <Text style={styles.textCards}>Data: {pets.data}</Text>
      <Text style={styles.textCards}>Sexo: {pets.sexo}</Text>
      <Text style={styles.textCards}>Idade: {pets.idade}</Text>
      <Text style={styles.textCards}>Doenças: {pets.doencas}</Text>
      <Text style={styles.textCards}>Vacinas: {pets.vacinas}</Text>
      <Text style={styles.textCards}>
        Observações:{' '}
        {pets.observacoes.length > 12
          ? `${pets.observacoes.slice(0, 12)}...`
          : pets.observacoes}
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
    width: 170,
    height: 250,
    backgroundColor: colors.background_primary_dark,
    borderRadius: 15,
    margin: 12,
    padding: 12,
  },
  textCards: {
    fontSize: 12,
  },
  zoomButton: {
    width: '80%',
    height: 30,
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});