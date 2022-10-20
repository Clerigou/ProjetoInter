import {transform} from '@babel/core';
import React, {useEffect, useState} from 'react';

import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Pressable,
} from 'react-native';

import {colors} from '../commonStyles';
import getAuth from '@react-native-firebase/auth';
import TopBarGeral from '../components/TopBarGeral';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function CadastroUsers() {
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState();
  const [cpf, setCpf] = useState();
  const [nascimento, setNascimento] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  useEffect(() => {
    createSecondaryApp();
  }, []);

  async function createSecondaryApp() {
    const apps = firebase.apps;

    if (apps[0]._name === '[DEFAULT]') {
      const credentials = {
        clientId:
          '133998181481-1t2b9uku7vq759skano9o3ieng2l8tq8.apps.googleusercontent.com',
        appId: 'com.petlar',
        apiKey: 'AIzaSyB5vWTi-gqTlrVhzi9RYyYFGo7x3pnxjPs',
        databaseURL: 'https://segunda-chance-pet-lar.firebaseio.com/',
        storageBucket: 'segunda-chance-pet-lar.appspot.com',
        messagingSenderId: '133998181481',
        projectId: 'segunda-chance-pet-lar',
      };

      const config = {
        name: 'SECONDARY_APP',
      };

      await firebase.initializeApp(credentials, config);
    }
  }

  async function createUser() {
    // Your secondary Firebase project credentials...

    firebase
      .app('SECONDARY_APP')
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res, 'then do criar usar');
        firestore()
          .collection('Users')
          .doc(email)
          .set({
            name: nome,
            cep: cep,
            cpf: cpf,
            nascimento: nascimento,
            telefone: telefone,
            email: email,
          })
          .then(() => {
            console.log('User criado com sucesso!');
          });
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Segunda_tela_background.png')}
        style={styles.container_back_img}>
        <TopBarGeral homeButton={true} />
        <View style={styles.header}>
          <Text style={styles.header_text}> Cadastro de {'\n'} Usuarios</Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{
            flex: 1,
            borderColor: 'red',
            width: '100%',
          }}>
          <View style={styles.body}>
            <TextInput
              placeholder="Nome"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              onChangeText={text => setNome(text)}
            />
            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="CEP"
                placeholderTextColor={colors.text}
                onChangeText={text => setCep(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Data de nasc"
                placeholderTextColor={colors.text}
                onChangeText={text => setNascimento(text)}
              />
            </View>
            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="CPF"
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Telefone"
                placeholderTextColor={colors.text}
                onChangeText={text => setTelefone(text)}
              />
            </View>

            {/* <TextInput
              placeholder="Endereço"
              placeholderTextColor={colors.text}
              style={styles.inputs}
            /> */}
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              onChangeText={text => setSenha(text)}
            />

            <Pressable onPress={createUser} style={styles.button}>
              <Text style={styles.button_text}>Enviar</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{
              zIndex: 1,
              transform: [{translateY: 110}],
              fontSize: 35,
              color: colors.text,
            }}>
            Usuarios
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 90,
              height: 115,
              borderRadius: 120 / 2,
              backgroundColor: colors.background_primary_dark,
              transform: [{scaleX: 5}, {translateY: 50}],
            }}></View>
        </View>
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
    paddingLeft: 28,
    paddingTop: 2,
    paddingBottom: 15,
  },
  header_text: {
    fontSize: 30,
    color: colors.input,
    fontWeight: 'bold',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  body_inputs_row: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputs: {
    width: '80%',
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: colors.input,
    fontSize: 16,
  },
  inputs_row: {
    width: '48%',
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    fontSize: 16,
  },
  button: {
    width: '30%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.input,
  },
  button_text: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
