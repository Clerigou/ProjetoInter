import React, {useEffect, useState, useContext} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import storage from '@react-native-firebase/storage';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import PetsForm from '../components/PetsForm';

import {AuthContext} from '../contexts/auth';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function CadastroPets({navigation}) {
  const {opacity} = useContext(AuthContext);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function enviar() {
    const reference = storage().ref(`imagesteste/${imagemEscolhida.name}`);
    const pathToFile = imagemEscolhida.uri;
    await reference.putFile(pathToFile);
  }

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
        <View style={styles.header}>
          <Text style={styles.header_text}> Cadastro de {'\n'} Pets</Text>
        </View>
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
  header: {
    width: '100%',
    paddingLeft: scale(28),
  },
  header_text: {
    fontSize: moderateScale(32),
    color: colors.input,
    fontWeight: 'bold',
  },
});
