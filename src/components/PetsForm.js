import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import storage from '@react-native-firebase/storage';

import {colors} from '../commonStyles';

import Icon from 'react-native-vector-icons/FontAwesome';

import InputSelect from './InputSelect';

import firestore from '@react-native-firebase/firestore';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const pickerOptions = {
  width: 512,
  height: 512,
  cropping: true,
  cropperToolbarTitle: 'Ajustar Imagem',
  compressImageQuality: 0.8,
};

const dataSexo = [
  {
    item: 'Macho',
  },
  {
    item: 'Femea',
  },
];

const dataTipo = [
  {
    item: 'Gato',
  },
  {
    item: 'Cachorro',
  },
];

export default function PetsForm() {
  const [imagemEscolhida, setImagemEscolhida] = useState([]);
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [tipo, setTipo] = useState(null);
  const [pelagem, setPelagem] = useState('');
  const [porte, setPorte] = useState('');
  const [sexo, setSexo] = useState(null);
  const [idade, setIdade] = useState('');
  const [doencas, setDoencas] = useState('');
  const [vacinas, setVacinas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const date = new Date();

  function openGaleria() {
    ImagePicker.openPicker(pickerOptions)
      .then(images => {
        setImagemEscolhida({
          uri: images.path,
          type: images.mime,
          name: `IMG_${new Date().getTime()}.${images.path.split('/')[1]}`,
        });
      })
      .catch(err => console.warn('Erro ao tentar selecionar a foto ', err));
  }

  const openCamera = () => {
    ImagePicker.openCamera(pickerOptions)
      .then(images => {
        setImagemEscolhida({
          uri: images.path,
          type: images.mime,
          name: `IMG_${new Date().getTime()}.${images.path.split('/')[1]}`,
        });
      })
      .catch(err => console.warn('Erro ao tentar selecionar a foto ', err));
  };

  async function registerPet() {
    firestore()
      .collection('Pets')
      .doc(nome)
      .set({
        name: nome,
        raca: raca,
        pelagem: pelagem,
        porte: porte,
        sexo: sexo,
        tipo: tipo,
        idade: idade,
        data: date,
        doencas: doencas,
        vacinas: vacinas,
        obs: observacoes,
      })
      .then(() => {
        enviar();
        console.log('Pet Criado com sucesso');
      });
  }

  async function enviar() {
    const reference = storage().ref(`Pets/${nome}`);
    const pathToFile = imagemEscolhida.uri;
    await reference.putFile(pathToFile);
  }

  return (
    <View style={styles.container}>
      <Modal
        onRequestClose={() => {
          setVisible(false);
          setImagemEscolhida(null);
        }}
        animationType={'slide'}
        transparent={true}
        visible={visible}>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={styles.modal}>
          <View style={styles.modal_container}>
            <View style={styles.modal_image_container}>
              {imagemEscolhida === null ? (
                <Text style={styles.modal_image_text}>
                  Imagem {'\n'} nao {'\n'} selecionada
                </Text>
              ) : (
                <Image
                  source={{uri: imagemEscolhida.uri}}
                  style={styles.modal_image}
                  resizeMode="cover"
                />
              )}
            </View>
            <TouchableOpacity onPress={openCamera} style={styles.modal_button}>
              <Text style={styles.modal_button_text}> Tirar foto </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGaleria} style={styles.modal_button}>
              <Text style={styles.modal_button_text}> Abrir galeria </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.modal_button}>
              <Text style={styles.modal_button_text}> Ok</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.image_container}>
          <Icon name="camera" size={moderateScale(35)} color={colors.text} />
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
            placeholder="Raça"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setRaca(text)}
          />
          <TextInput
            style={styles.inputs_row}
            placeholder="Pelagem"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setPelagem(text)}
          />
        </View>
        <View style={styles.body_inputs_row}>
          <TextInput
            style={styles.inputs_row}
            placeholder="Porte Fisico"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setPorte(text)}
          />
          <TextInput
            style={styles.inputs_row}
            placeholder="Idade"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setIdade(text)}
          />
        </View>

        <View style={styles.body_inputs_row}>
          <InputSelect
            Label={'Sexo'}
            value={sexo}
            setValue={setSexo}
            data={dataSexo}
          />
          <InputSelect
            Label={'Tipo'}
            value={tipo}
            setValue={setTipo}
            data={dataTipo}
          />
        </View>

        <View style={styles.body_inputs_row}>
          <TextInput
            style={styles.inputs_row}
            placeholder="Doenças"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setDoencas(text)}
          />
          <TextInput
            style={styles.inputs_row}
            placeholder="Vacinas"
            fontSize={18}
            placeholderTextColor={colors.text}
            onChangeText={text => setVacinas(text)}
          />
        </View>

        <TextInput
          placeholder="Observaçoes"
          placeholderTextColor={colors.text}
          style={styles.input_big}
          onChangeText={text => setObservacoes(text)}
        />

        <Pressable onPress={registerPet} style={styles.button}>
          <Text style={styles.button_text}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image_container: {
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
    fontSize: 20,
    color: colors.text,
  },
  inputs_row: {
    width: '48%',
    height: verticalScale(46),
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    fontSize: 20,
    color: colors.text,
  },
  input_big: {
    width: '80%',
    height: verticalScale(90),
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: verticalScale(15),
    backgroundColor: colors.input,
    fontSize: 16,
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    width: '85%',
    backgroundColor: colors.background_secundary,
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modal_image_container: {
    borderWidth: 1,
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 240 / 2,
    backgroundColor: colors.background_primary_dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_image_text: {
    fontSize: 25,
    color: colors.text,
    textAlign: 'center',
  },
  modal_image: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 240 / 2,
  },
  modal_button: {
    borderWidth: 1,
    width: '70%',
    height: verticalScale(50),
    marginTop: verticalScale(20),
    borderRadius: 20,
    backgroundColor: colors.background_primary_dark,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal_button_text: {
    color: colors.text,
    fontSize: 25,
    fontWeight: 'bold',
  },
});