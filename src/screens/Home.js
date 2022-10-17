import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CadastroPets')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {},
});

export default Home;
