import React, {useState} from 'react';
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
} from 'react-native';
import storage from '@react-native-firebase/storage';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default function CadastroPets({navigation}) {
  const [imagemEscolhida, setImagemEscolhida] = useState([]);
  const [visible, setVisible] = useState(false);

  function openPicker() {
    ImagePicker.openPicker({
      width: 350,
      height: 450,
      cropping: true,
    })
      .then(images => {
        setImagemEscolhida({
          uri: images.path,
          type: images.mime,
          name: `IMG_${new Date().getTime()}.${images.path.split('/')[1]}`,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function createUser() {
    // Your secondary Firebase project credentials...
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
  }

  async function enviar() {
    const reference = storage().ref(`imagesteste/${imagemEscolhida.name}`);
    const pathToFile = imagemEscolhida.uri;
    await reference.putFile(pathToFile);
  }

  return (
    <View style={styles.container}>
      <Modal visible={visible}></Modal>
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
        <View
          style={{
            flex: 1,
            width: '100%',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.body}>
            <TouchableOpacity style={styles.image_container}>
              <Icon
                name="camera"
                size={moderateScale(35)}
                color={colors.text}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Nome"
              placeholderTextColor={colors.text}
              style={styles.inputs}
              fontSize={18}
              onChangeText={text => setNome(text)}
            />
            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="Ra;a"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCep(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Pelagem"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setNascimento(text)}
              />
            </View>
            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="Porte Fisico"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Data"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setTelefone(text)}
              />
            </View>

            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="Sexo"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Idade"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setTelefone(text)}
              />
            </View>

            <View style={styles.body_inputs_row}>
              <TextInput
                style={styles.inputs_row}
                placeholder="Doen;as"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setCpf(text)}
              />
              <TextInput
                style={styles.inputs_row}
                placeholder="Vacinas"
                fontSize={18}
                placeholderTextColor={colors.text}
                onChangeText={text => setTelefone(text)}
              />
            </View>

            <TextInput
              placeholder="Observa;oes"
              placeholderTextColor={colors.text}
              style={styles.input_big}
            />

            <Pressable onPress={createUser} style={styles.button}>
              <Text style={styles.button_text}>Enviar</Text>
            </Pressable>
          </View>
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
  image_container: {
    borderWidth: 1,
    width: '30%',
    height: verticalScale(50),
    borderRadius: 20,
    marginBottom: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background_primary_dark,
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
  input_big: {
    width: '80%',
    height: verticalScale(90),
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: verticalScale(15),
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
