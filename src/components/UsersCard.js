import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../commonStyles';

export default function UsersCard({user, handleZoomModal}) {
  console.log(user.Nome.length);
  return (
    <View style={styles.container}>
      <Text style={styles.textCards}>
        {user.Nome.length > 12 ? `${user.Nome.slice(0, 12)}...` : user.Nome}
      </Text>
      <Text style={styles.textCards}>
        {user.Rua.length > 12 ? `${user.Rua.slice(0, 12)}...` : user.Rua}
      </Text>
      <Text style={styles.textCards}>{user.CEP}</Text>
      <Text style={styles.textCards}>{user.Data}</Text>
      <Text style={styles.textCards}>{user.CPF}</Text>
      <Text style={styles.textCards}>{user.Numero}</Text>
      <Text style={styles.textCards}>
        {user.Email.length > 12 ? `${user.Email.slice(0, 12)}...` : user.Rua}
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
    width: 160,
    height: 190,
    backgroundColor: colors.background_primary_dark,
    borderRadius: 15,
    margin: 12,
    padding: 12,
  },
  textCards: {
    fontSize: 12,
  },
  zoomButton: {
    width: '70%',
    height: 30,
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
