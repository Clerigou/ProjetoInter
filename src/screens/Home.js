import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {colors} from '../commonStyles';

const Home = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <Text style={styles.textUser}>Oi, Gabriel</Text>
      <Text style={styles.textIntro}>Selecione uma {'\n'}atividade</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botao_text}>Cadastro Pets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botao_text}>Cadastros Usuários</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/Terceira_tela_IMG.png/')}
        style={styles.imageDogs}
      />

      <Image
        source={require('../../assets/images/Terceira_tela_Elemento.png/')}
        style={styles.elementBottomImage}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  textUser: {
    color: colors.input,
    fontSize: 28,
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: 28,
    fontWeight: 'bold',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: '70%',
    height: 70,
    borderRadius: 23,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  botao_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text,
  },
  imageDogs: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    backgroundColor: 'black',
  },
  elementBottomImage: {
    width: '120%',
    height: '20%',
    position: 'absolute',
    bottom: 0,
  },
});

{
  /* <TouchableOpacity onPress={() => navigation.navigate('CadastroPets')}>
 
</TouchableOpacity> */
}

export default Home;
