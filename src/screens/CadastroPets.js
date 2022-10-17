import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';

export default function CadastroPets() {
  const [imagemEscolhida, setImagemEscolhida] = useState([]);

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

  async function enviar() {
    const reference = storage().ref(`imagesteste/${imagemEscolhida.name}`);
    const pathToFile = imagemEscolhida.uri;
    await reference.putFile(pathToFile);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPicker} style={styles.button}>
        <Text> aaa </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={enviar} style={styles.button}>
        <Text>enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    width: '100%',
  },
});
