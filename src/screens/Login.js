import React, {useEffect, useState} from 'react';
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

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  function logando() {
    if (!email || !password) {
      return Alert.alert('Email ou senha vazio', 'preencha todos os campos!');
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        navigation.navigate('CadastroPets');
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
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />

      <View style={styles.header}>
        <View style={styles.imgContainer}>
          <Image />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyInputs}>
          <TextInput
            style={styles.input}
            placeholder="Login..."
            fontSize={15}
            keyboardType="email-address"
            onChangeText={Text => {
              setEmail(Text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha..."
            onChangeText={Text => {
              setPassword(Text);
            }}
            fontSize={15}
            keyboardType="default"
            secureTextEntry={true}
          />

          <Pressable onPress={logando}>
            <Text> botão aqui</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {},
  imgContainer: {},
  img: {},
  body: {},
  bodyInputs: {},
  input: {},
});
