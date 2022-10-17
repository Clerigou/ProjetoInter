import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const FirstScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Primeira_tela_background.png')}
        style={styles.container_back_img}
        resizeMode={'stretch'}>
        <View style={styles.header}>
          <Image />
        </View>

        <View style={styles.body}>
          <Image
            style={{borderWidth: 1, width: '70%'}}
            source={require('../../assets/images/Primeira_tela_IMG.png')}
            resizeMode={'contain'}
          />
        </View>

        <View style={styles.footer}></View>
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  footer: {
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default FirstScreen;
