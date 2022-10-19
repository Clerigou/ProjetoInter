import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  Alert,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';

import {AuthContext} from '../contexts/auth';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {}, []);

  function logando() {
    if (!email || !password) {
      return Alert.alert('Email ou senha vazio', 'preencha todos os campos!');
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        setUser(res);
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Email incorreto', 'Email invalido!');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Login Incorreto', 'Email ou senha incorreto!');
        }
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usúario não encontrado',
            'Úsuario não encontrado, verifique se o email foi digitado corretamente!',
          );
        }
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Segunda_tela_background.png')}
        style={styles.container_back_img}
        resizeMode={'stretch'}>
        <TopBarGeral navigation={navigation} />
        <View style={styles.body}>
          <View style={styles.titulo_container}>
            <Text style={styles.titulo}> Acesse sua conta </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor={colors.text}
            fontSize={15}
            keyboardType="email-address"
            onChangeText={Text => {
              setEmail(Text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="SENHA"
            onChangeText={Text => {
              setPassword(Text);
            }}
            placeholderTextColor={colors.text}
            fontSize={15}
            keyboardType="default"
            secureTextEntry={true}
          />
          <Pressable style={styles.esqueci_senha_button}>
            <Text style={styles.esqueci_senha_text}> Esqueci minha senha</Text>
          </Pressable>

          <Pressable style={styles.login_button} onPress={logando}>
            <Text style={styles.login_button_text}> Entrar </Text>
          </Pressable>
        </View>
        <View style={styles.img_container}>
          <Image
            source={require('../../assets/images/Segunda_tela_IMG.png')}
            resizeMode={'cover'}
            style={styles.img_bottom}
          />
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
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titulo_container: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.input,
  },
  input: {
    width: '70%',
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: colors.input,
  },
  esqueci_senha_button: {
    transform: [{translateX: 55}],
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  esqueci_senha_text: {
    color: colors.TextInput,
    fontWeight: 'bold',
    fontSize: 15,
  },
  login_button: {
    backgroundColor: colors.input,
    width: '35%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  login_button_text: {
    fontSize: 20,
    color: colors.text,
    fontWeight: 'bold',
  },
  img_container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  img_bottom: {
    width: '100%',
    height: '80%',
  },
});
