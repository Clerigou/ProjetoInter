import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {colors} from '../commonStyles';

const FirstScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Primeira_tela_background.png')}
        style={styles.container_back_img}
        resizeMode={'stretch'}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/Icone_Segunda_Chance_PetLar.png')}
            resizeMode={'contain'}
            style={{width: '55%'}}
          />
        </View>

        <View style={styles.body}>
          <Image
            style={{borderWidth: 1, width: '75%'}}
            source={require('../../assets/images/Primeira_tela_IMG.png')}
            resizeMode={'contain'}
          />
        </View>

        <View style={styles.footer}>
          <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
            Dê uma segunda{'\n'}
            chance para o pet e {'\n'}
            para você!
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.botao_text}> Explore </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_back_img: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  footer: {
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  botao: {
    width: '40%',
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  botao_text: {
    color: 'white',
    fontSize: 26,
  },
});

export default FirstScreen;
