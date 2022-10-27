import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CellPhoneMask, MaskCPF} from '../global/mask';
import {colors} from '../commonStyles';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function UsersCard({user, handleZoomModal}) {
  return (
    <View style={styles.container}>
      <View style={styles.textCards_container}>
        <Text style={styles.textCards}>
          {user.name.length > 15 ? `${user.name.slice(0, 15)}...` : user.name}
        </Text>
        <Text style={styles.textCards}>
          {user.endereco.length > 15
            ? `${user.endereco.slice(0, 15)}...`
            : user.endereco}
        </Text>
        <Text style={styles.textCards}>{user.cep}</Text>
        <Text style={styles.textCards}>{user.nascimento}</Text>
        <Text style={styles.textCards}>{user.cpf}</Text>
        <Text style={styles.textCards}>{user.telefone}</Text>
        <Text style={styles.textCards}>
          {user.email.length > 15
            ? `${user.email.slice(0, 15)}...`
            : user.email}
        </Text>
      </View>
      <View style={styles.zoomButton_container}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => {
            handleZoomModal(user);
          }}>
          <Text style={styles.zoomButton_text}>Zoom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(150),
    height: verticalScale(220),
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
    paddingTop: verticalScale(5),
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
