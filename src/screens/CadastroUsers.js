import React, {useEffect, useState, useContext, useRef} from 'react';

import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//components
import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
//context
import {AuthContext} from '../contexts/auth';

//firebase
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//librarys
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {TextInputMask} from 'react-native-masked-text';
import CommonModal from '../components/CommonModal';
import {loadPartialConfig} from '@babel/core';

export default function CadastroUsers({navigation}) {
  const {opacity, setMsg, setCommonModal} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('cep');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('Endereço');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [cepValid, setCepValid] = useState(false);
  const refDate = useRef();

  useEffect(() => {
    const getEndereco = () => {
      fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => response.json())
        .then(json => {
          if (json.erro != true) {
            console.log(json.erro);
            setCepValid(true);
            setEndereco(
              `${json.logradouro}, ${json.bairro}, ${json.localidade}-${json.uf}`,
            );
          }
        });
    };
    if (cep.length > 7) {
      getEndereco();
    }
  }, [cep]);

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
            endereco: endereco,
            email: email,
            admin: false,
          })
          .then(() => {
            showModal({
              titulo: 'Sucesso!',
              msg: 'Usuário criado com sucesso!',
            });
          })
          .catch(error => {
            showModal({
              titulo: 'Error',
              msg: 'Erro ao criar usuário',
            });
          });
      })
      .catch(() => {
        showModal({
          titulo: 'Error',
          msg: 'Erro de conexão',
        });
      });
  }

  function showModal(obj) {
    setMsg(obj);
    setCommonModal(true);
    setLoading(false);
  }

  function HandleRegister() {
    const validar = validate();
    console.log(validar);

    if (validar.status) {
      createUser();
    } else {
      return showModal({
        titulo: 'Erro!',
        msg: validar.msg,
      });
    }
  }

  function validate() {
    let msg = '';
    let status = true;
    if (!nome) {
      status = false;
      msg = 'Nome nao pode ser vazio';
    }
    if (senha.length < 6) {
      status = false;
      msg = 'Senha muito curta, escolha uma senha entre 6 e 16 digitos';
    }
    if (telefone.length < 14) {
      status = false;
      msg = 'Telefone inválido';
    }

    if (!TestaCPF(cpf)) {
      status = false;
      msg = 'Cpf inválido';
    }

    if (!validateEmail(email)) {
      status = false;
      msg = 'Email inválido';
    }

    if (!validateData(nascimento)) {
      status = false;
      msg = 'Data inválida';
    }

    if (!cepValid) {
      status = false;
      msg = 'Cep inválido';
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

  function validateData(s) {
    if (s.length < 10) return false;
    var l = s.length;
    var j = 0;
    var dt = {0: '', 1: '', 2: ''};

    var n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (var i = 0; i < l; i++) {
      var c = s[i];
      if (c !== '/') dt[j] += c;
      else j++;
    }

    var d = +dt[0];
    var m = +dt[1];
    var y = +dt[2];

    n[2] += +(y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0));

    if (m < 1 || m > 12 || d < 1) {
      return false;
    } else if (d > n[m]) {
      return false;
    }

    return true;
  }

  function TestaCPF(cpf) {
    if (!cpf) return false;
    if (cpf.length < 14) return false;

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
        <CommonModal />
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
              onChangeText={text => setNome(text)}
            />
            <View style={styles.body_inputs_row}>
              <TextInputMask
                style={styles.inputs_row}
                placeholder="CEP"
                placeholderTextColor={colors.text}
                onChangeText={text => setCep(text)}
                type={'custom'}
                keyboardType="numeric"
                options={{
                  mask: '99999999',
                }}
              />
              <TextInputMask
                style={styles.inputs_row}
                placeholder="Data de nasc"
                placeholderTextColor={colors.text}
                onChangeText={text => setNascimento(text)}
                type={'datetime'}
                keyboardType="numeric"
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
                keyboardType="numeric"
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInputMask
                type={'custom'}
                options={{
                  mask: '(99)99999-9999',
                }}
                keyboardType={'phone-pad'}
                style={styles.inputs_row}
                value={telefone}
                placeholder="Telefone"
                placeholderTextColor={colors.text}
                onChangeText={text => setTelefone(text)}
              />
            </View>

            <TextInput
              placeholder="E-mail"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              keyboardType="visible-password"
              onChangeText={text => setSenha(text)}
            />
            <TextInput
              placeholder={endereco}
              placeholderTextColor={colors.text}
              multiline={true}
              style={styles.input_big}
              editable={false}
            />

            <TouchableOpacity onPress={HandleRegister} style={styles.button}>
              {!loading ? (
                <Text style={styles.button_text}>Enviar</Text>
              ) : (
                <ActivityIndicator size={'large'} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    height: verticalScale(48),
    borderRadius: 35,
    paddingHorizontal: 10,
    marginBottom: verticalScale(12),
    backgroundColor: colors.input,
    fontSize: 18,
    color: colors.text,
  },
  input_big: {
    width: '80%',
    height: verticalScale(80),
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: verticalScale(12),
    backgroundColor: colors.input,
    fontSize: 18,
    color: colors.text,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  inputs_row: {
    width: '48%',
    height: verticalScale(44),
    borderRadius: 35,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    fontSize: 18,
    color: colors.text,
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
