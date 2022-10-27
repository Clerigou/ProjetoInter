import {transform} from '@babel/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../contexts/auth';

import {CommonActions} from '@react-navigation/native';

const Home = ({navigation}) => {
  const {user, opacity} = useContext(AuthContext);
  const [selected, setSelected] = useState(0);
  const [boxOne] = useState(new Animated.ValueXY({x: 0, y: -1000}));
  const [boxTwo] = useState(new Animated.ValueXY({x: 0, y: -1000}));
  const [boxThree] = useState(new Animated.ValueXY({x: 0, y: -1000}));
  const [boxFour] = useState(new Animated.ValueXY({x: 0, y: -1000}));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(boxFour, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(boxThree, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(boxTwo, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(boxOne, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handlePress(rota) {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      switch (rota) {
        case 1:
          navigation.navigate('CadastroPets');
          break;
        case 2:
          navigation.navigate('CadastroUsers');
          break;
        case 3:
          navigation.navigate('CadastroPetsLista');
          break;
        case 4:
          navigation.navigate('CadastroUsuarioLista');
          break;

        default:
          console.log('error gigantesco');

          break;
      }
    });
  }

  const logOut = () => {
    Animated.parallel([
      Animated.timing(boxOne, {
        toValue: -1000,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(boxTwo, {
        toValue: -1000,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(boxThree, {
        toValue: -1000,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(boxFour, {
        toValue: -1000,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        });
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <StatusBar
        backgroundColor={colors.background_primary_dark}
        barStyle={'light-content'}
        hidden={true}
      />
      <TopBarGeral buttonRight={'logout'} logOut={logOut} />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textUser}>Oi, {user.name}</Text>
        <Text style={styles.textIntro}>Selecione uma {'\n'}atividade</Text>
      </View>
      {user.admin ? (
        <View style={styles.buttonContainer}>
          <Animated.View
            style={[
              styles.animated_view,
              {transform: [{translateY: boxOne.y}]},
              {opacity: selected === 1 ? 1 : opacity},
            ]}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                setSelected(1);
                handlePress(1);
              }}>
              <Text style={styles.botao_text}>Cadastro Pets</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.animated_view,
              {transform: [{translateY: boxTwo.y}]},
              {opacity: selected === 2 ? 1 : opacity},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setSelected(2);
                handlePress(2);
              }}
              style={styles.botao}>
              <Text style={styles.botao_text}>Cadastro Usuários</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.animated_view,
              {transform: [{translateY: boxThree.y}]},
              {opacity: selected === 3 ? 1 : opacity},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setSelected(3);
                handlePress(3);
              }}
              style={styles.botao}>
              <Text style={styles.botao_text}>Lista de Pets</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.animated_view,
              {transform: [{translateY: boxFour.y}]},
              {opacity: selected === 4 ? 1 : opacity},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setSelected(4);
                handlePress(4);
              }}
              style={styles.botao}>
              <Text style={styles.botao_text}>Lista de Usuários</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
        <View style={[styles.buttonContainer, {flex: 1}]}>
          <Animated.View
            style={[
              styles.animated_view,
              {transform: [{translateY: boxThree.y}]},
            ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroPetsLista')}
              style={styles.botao}>
              <Text style={styles.botao_text}>Lista de Pets</Text>
            </TouchableOpacity>
          </Animated.View>
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
    marginBottom: verticalScale(15),
    marginTop: verticalScale(5),
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  animated_view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: '60%',
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
