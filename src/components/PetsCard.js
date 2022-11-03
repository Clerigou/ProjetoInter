import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../commonStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function PetsCard({pets, handleZoomModal}) {
  return (
    <View style={styles.container}>
      <View style={styles.textCards_container}>
        <Text style={styles.textCards}>Nome: {pets.name}</Text>
        <Text style={styles.textCards}>Data: {pets.data}</Text>
        <Text style={styles.textCards}>{pets.raca}</Text>
        <Text style={styles.textCards}>{pets.porte}</Text>
        <Text style={styles.textCards}>{pets.sexo}</Text>
        <Text style={styles.textCards}>{pets.idade}</Text>
        <Text style={styles.textCards}>{pets.pelagem}</Text>
        <Text style={styles.textCards}>{pets.doencas}</Text>
        <Text style={styles.textCards}>{pets.vacinas}</Text>
        <Text style={styles.textCards}>
          {pets.obs.length > 16 ? `${pets.obs.slice(0, 17)}...` : pets.obs}
        </Text>
      </View>

      <View style={styles.zoomButton_container}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => {
            handleZoomModal(pets);
          }}>
          <Text style={styles.zoomButton_text}>Zoom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: verticalScale(230),
    backgroundColor: colors.background_primary_dark,
    borderRadius: 25,
    marginBottom: verticalScale(30),
    marginRight: scale(15),
  },
  textCards_container: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: scale(10),
    paddingTop: verticalScale(10),
  },
  textCards: {
    fontSize: scale(15),
    color: colors.text,
    fontWeight: 'bold',
  },
  zoomButton_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  zoomButton: {
    width: '70%',
    height: verticalScale(30),
    backgroundColor: colors.background_primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  zoomButton_text: {
    fontSize: moderateScale(19),
    color: colors.input,
    fontWeight: 'bold',
  },
});
