import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';

import {AuthContext} from '../contexts/auth';

const Home = ({navigation}) => {
  const {user} = useContext(AuthContext);
  console.log(user, 'user do home');

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <TopBarGeral buttonRight={'logout'} />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textUser}>Oi, {user.name}</Text>
        <Text style={styles.textIntro}>Selecione uma {'\n'}atividade</Text>
      </View>
      {user.admin ? (
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.botao}>
              <Text
                onPress={() => navigation.navigate('Pets')}
                style={styles.botao_text}>
                Lista de Pets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Users')}
              style={styles.botao}>
              <Text style={styles.botao_text}>Lista de Usuários</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.botao}>
              <Text
                onPress={() => navigation.navigate('CadastroPets')}
                style={styles.botao_text}>
                Cadastro Pets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroUsers')}
              style={styles.botao}>
              <Text style={styles.botao_text}>Cadastro Usuários</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.botao}>
            <Text
              onPress={() => navigation.navigate('Pets')}
              style={styles.botao_text}>
              Lista de Pets
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.image_container}>
        <Image
          source={require('../../assets/images/Terceira_tela_IMG.png/')}
          style={styles.imageDogs}
          resizeMode="contain"
        />

        <Image
          source={require('../../assets/images/Terceira_tela_Elemento.png/')}
          style={styles.elementBottomImage}
          resizeMode="stretch"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textUser: {
    color: colors.input,
    fontSize: 28,
  },
  containerTextIntro: {
    paddingLeft: scale(30),
    marginBottom: verticalScale(20),
    marginTop: verticalScale(20),
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: '90%',
    height: verticalScale(55),
    borderRadius: 20,
    paddingVertical: verticalScale(10),
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  botao_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text,
  },
  image_container: {
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  imageDogs: {
    width: '100%',
    height: '100%',
    transform: [{translateY: verticalScale(25)}],
  },
  elementBottomImage: {
    width: '100%',
    height: '45%',
    position: 'absolute',
    zIndex: 1,
  },
});

{
}

export default Home;
