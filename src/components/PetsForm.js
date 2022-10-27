import React, {useContext, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';

//components
import InputSelect from './InputSelect';
import {colors} from '../commonStyles';
import CommonModal from './CommonModal';

//context
import {AuthContext} from '../contexts/auth';

//librarys
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import {TextInputMask} from 'react-native-masked-text';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

//firebase
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

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

export default function PetsForm() {
  const [imagemEscolhida, setImagemEscolhida] = useState(null);
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState();
  const [raca, setRaca] = useState('Não especificada');
  const [pelagem, setPelagem] = useState('Não especificada');
  const [porte, setPorte] = useState('Não especificado');
  const [sexo, setSexo] = useState();
  const [idade, setIdade] = useState('Não especificada');
  const [doencas, setDoencas] = useState();
  const [vacinas, setVacinas] = useState();
  const [data, setData] = useState();
  const [observacoes, setObservacoes] = useState('Sem observações');
  const [loading, setLoading] = useState(false);

  const {setCommonModal, setMsg} = useContext(AuthContext);

  function openGaleria() {
    ImagePicker.openPicker(pickerOptions)
      .then(images => {
        setImagemEscolhida({
          uri: images.path,
          type: images.mime,
          name: `IMG_${new Date().getTime()}.${images.path.split('/')[1]}`,
        });
      })
      .catch(err => console.log('Erro ao tentar selecionar a foto ', err));
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
      .catch(err => console.log('Erro ao tentar selecionar a foto ', err));
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
        idade: idade,
        data: data,
        doencas: doencas,
        vacinas: vacinas,
        obs: observacoes,
      })
      .then(() => {
        sendImage();
      });
  }

  async function sendImage() {
    const reference = storage().ref(`Pets/${nome}`);
    const pathToFile = imagemEscolhida.uri;
    await reference.putFile(pathToFile).then(() => {
      return showModal({
        titulo: 'Sucesso!',
        msg: 'Pet cadastrado com sucesso!',
      });
    });
  }

  function showModal(obj) {
    setMsg(obj);
    setCommonModal(true);
    setLoading(false);
  }
  const HandleRegister = () => {
    const validar = validate();
    if (validar.status) {
      registerPet();
    } else {
      return showModal({
        titulo: 'Erro!',
        msg: validar.msg,
      });
    }
  };

  function validate() {
    let msg = '';
    let status = true;
    if (!nome || !doencas || !vacinas || !data || !sexo) {
      status = false;
      msg =
        'Preencha todos os campos:\nNome, doença, vacinas, data e sexo não podem estar vazios!';
    }
    return {
      msg: msg,
      status: status,
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}> Cadastro de {'\n'} Pets</Text>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.image_container}>
          <Icon name="camera" size={moderateScale(32)} color={colors.text} />
        </TouchableOpacity>
      </View>
      <CommonModal />
      <Modal
        onRequestClose={() => {
          setVisible(false);
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
                <IconFeather
                  name="camera-off"
                  size={moderateScale(60)}
                  color={colors.background_primary_dark}
                />
              ) : (
                <Image
                  source={{uri: imagemEscolhida.uri}}
                  style={styles.modal_image}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontWeight: 'bold',
                  color: colors.background_primary_dark,
                  marginBottom: verticalScale(30),
                }}>
                {' '}
                Adicione uma foto para o pet:{' '}
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={openCamera}
                  style={styles.modal_button_option}>
                  <Icon
                    name="camera"
                    size={moderateScale(28)}
                    color={'white'}
                  />

                  <Text style={styles.modal_button_textOption}>
                    {' '}
                    Usar camera{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openGaleria}
                  style={styles.modal_button_option}>
                  <Icon
                    name="picture-o"
                    size={moderateScale(32)}
                    color={'white'}
                  />
                  <Text style={styles.modal_button_textOption}>
                    {' '}
                    Abrir galeria{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.modal_button}>
              <Text style={styles.modal_button_text}>Ok</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.body}>
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
          <TextInputMask
            style={styles.inputs_row}
            placeholder="Data"
            placeholderTextColor={colors.text}
            onChangeText={text => setNascimento(text)}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
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
          multiline={true}
          onChangeText={text => setObservacoes(text)}
        />

        <Pressable onPress={HandleRegister} style={styles.button}>
          {!loading ? (
            <Text style={styles.button_text}>Enviar</Text>
          ) : (
            <ActivityIndicator size={'large'} color={colors.text} />
          )}
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: scale(26),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },
  header_text: {
    fontSize: moderateScale(32),
    color: colors.input,
    fontWeight: 'bold',
    marginRight: scale(20),
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image_container: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 70 / 2,
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
    height: verticalScale(48),
    borderRadius: 35,
    paddingHorizontal: 10,
    marginBottom: verticalScale(15),
    backgroundColor: colors.input,
    fontSize: 20,
    color: colors.text,
  },
  inputs_row: {
    width: '48%',
    height: verticalScale(44),
    borderRadius: 35,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    fontSize: 20,
    color: colors.text,
  },
  input_big: {
    width: '80%',
    height: verticalScale(80),
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: verticalScale(15),
    backgroundColor: colors.input,
    fontSize: 16,
    color: colors.text,
    textAlign: 'left',
    textAlignVertical: 'top',
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
  },
  modal_image_container: {
    borderWidth: 8,
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 240 / 2,
    backgroundColor: colors.text,
    justifyContent: 'center',
    borderColor: colors.background_primary,
    alignItems: 'center',
  },
  modal_image: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 240 / 2,
  },
  modal_button: {
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
  modal_button_option: {
    width: scale(120),
    height: verticalScale(60),
    borderRadius: 20,
    backgroundColor: colors.background_primary_dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_button_textOption: {
    fontSize: moderateScale(18),
    color: 'white',
  },
});
