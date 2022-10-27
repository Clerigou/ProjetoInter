import React, {useEffect, useState, useContext} from 'react';
import {ImageBackground, View, StyleSheet, Animated} from 'react-native';

import TopBarGeral from '../components/TopBarGeral';
import PetsForm from '../components/PetsForm';

import {AuthContext} from '../contexts/auth';

export default function CadastroPets({navigation}) {
  const {opacity} = useContext(AuthContext);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Segunda_tela_background.png')}
        style={styles.container_back_img}>
        <TopBarGeral
          navigation={navigation}
          backButton={true}
          homeButton={true}
        />

        <PetsForm />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_back_img: {
    width: '100%',
    flex: 1,
  },
});
