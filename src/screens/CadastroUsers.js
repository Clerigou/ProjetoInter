import {transform} from '@babel/core';
import React, {useEffect, useState, useContext, useRef} from 'react';

import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import {AuthContext} from '../contexts/auth';
import {TextInputMask} from 'react-native-masked-text';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function CadastroUsers({navigation}) {
  const {opacity} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const refDate = useRef();

  useEffect(() => {
    createSecondaryApp();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function createSecondaryApp() {
    const apps = firebase.apps;
    if (apps.length === 1) {
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
            admin: false,
          })
          .then(() => {
            console.log('User criado com sucesso!');
          });
      });
  }

  function HandleLogin() {
    const validar = validate();
    if (validar.status) {
      console.log(validar.msg);
    } else {
      console.log(validar.msg);
    }
  }

  function validate() {
    let msg = 'Sucesso na validação';
    let status = true;
    if (!nome || !cep || !cpf || !nascimento || !telefone || !nome || !senha) {
      status = false;
      msg = 'Preencha todos os campos';
    }

    if (!TestaCPF(cpf)) {
      status = false;
      msg = 'Cpf inválido';
    }

    if (!validateEmail(email)) {
      status = false;
      msg = 'Email inválido';
    }
    return {
      status: status,
      msg: msg,
    };
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function TestaCPF(cpf) {
    if (!cpf) return false;
    if (cpf < 14) return false;

    let TesteCpf =
      cpf.slice(0, 3) + cpf.slice(4, 7) + cpf.slice(8, 11) + cpf.slice(12, 14);

    var Soma;
    var Resto;
    Soma = 0;
    if (TesteCpf == '00000000000') return false;

    for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(TesteCpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(TesteCpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(TesteCpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(TesteCpf.substring(10, 11))) return false;
    return true;
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
              fontSize={18}
              onChangeText={text => setNome(text)}
            />
            <View style={styles.body_inputs_row}>
              <TextInputMask
                style={styles.inputs_row}
                placeholder="CEP"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCep(text)}
                type={'custom'}
                options={{
                  mask: '99999-999',
                }}
              />
              <TextInputMask
                style={styles.inputs_row}
                placeholder="Data de nasc"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setNascimento(text)}
                type={'datetime'}
                ref={refDate}
                options={{
                  format: 'DD/MM/YYYY',
                }}
              />
            </View>
            <View style={styles.body_inputs_row}>
              <TextInputMask
                style={styles.inputs_row}
                placeholder="CPF"
                type={'cpf'}
                value={cpf}
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                style={styles.inputs_row}
                value={telefone}
                placeholder="Telefone"
                fontSize={18}
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
              fontSize={18}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              fontSize={18}
              onChangeText={text => setSenha(text)}
            />

            <TouchableOpacity onPress={HandleLogin} style={styles.button}>
              <Text style={styles.button_text}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>Usuarios</Text>
          <View style={styles.footer_oval}></View>
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
    paddingLeft: scale(28),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(15),
  },
  header_text: {
    fontSize: moderateScale(32),
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
    marginBottom: verticalScale(15),
  },
  inputs: {
    width: '80%',
    height: verticalScale(50),
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: verticalScale(15),
    backgroundColor: colors.input,
    fontSize: 16,
  },
  inputs_row: {
    width: '48%',
    height: verticalScale(46),
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    fontSize: 16,
  },
  button: {
    width: '30%',
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.input,
  },
  button_text: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer_text: {
    zIndex: 1,
    transform: [{translateY: verticalScale(110)}],
    fontSize: 35,
    color: colors.text,
  },
  footer_oval: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(90),
    height: verticalScale(125),
    borderRadius: 120 / 2,
    backgroundColor: colors.background_primary_dark,
    transform: [{scaleX: scale(4)}, {translateY: verticalScale(50)}],
  },
});
