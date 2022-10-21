import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../commonStyles';

export default function ListEmpty({message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: colors.background_primary_dark,
  },
});
