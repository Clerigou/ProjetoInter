import React, {useContext, useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  Image,
  Animated,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import ErrorModal from '../components/ErrorModal';

import {AuthContext} from '../contexts/auth';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [index, setIndex] = useState(null);
  const {user, setUser} = useContext(AuthContext);

  const passRef = useRef();

  const [inputTop] = useState(new Animated.ValueXY({x: -1000, y: 0}));
  const [inputBottom] = useState(new Animated.ValueXY({x: 1000, y: 0}));
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(inputTop.x, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(inputBottom.x, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function loginAnimation() {
    setLoading(false);
    Animated.parallel([
      Animated.timing(inputTop.x, {
        toValue: -1000,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(inputBottom.x, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    });
  }

  function showModal(index) {
    setIndex(index);
    setErrorModal(true);
  }

  async function logando() {
    Keyboard.dismiss();
    if (!email || !password) {
      setLoading(false);
      return showModal(0);

      Alert.alert('Email ou senha vazio', 'preencha todos os campos!');
    }
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('passando pelo primeiro then login');

        const user = await firestore()
          .collection('Users')
          .doc(`${email}`)
          .get()

          .then(res => {
            console.log('segundo then do login', res);

            setUser(res._data);
            loginAnimation();
          });
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
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Segunda_tela_background.png')}
        style={styles.container_back_img}
        resizeMode={'stretch'}>
        <ErrorModal
          errorModal={errorModal}
          setErrorModal={setErrorModal}
          index={index}
        />
        <TopBarGeral backButton={true} navigation={navigation} />
        <Animated.View style={styles.body}>
          <Animated.View style={[styles.titulo_container, {opacity: opacity}]}>
            <Text style={styles.titulo}> Acesse sua conta </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.input_container,
              {transform: [{translateX: inputTop.x}]},
            ]}>
            <TextInput
              style={styles.input}
              placeholder="EMAIL"
              placeholderTextColor={colors.text}
              fontSize={moderateScale(17)}
              keyboardType="email-address"
              onSubmitEditing={() => passRef.current.focus()}
              onChangeText={Text => {
                setEmail(Text);
              }}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.input_container,
              {transform: [{translateX: inputBottom.x}]},
            ]}>
            <TextInput
              style={styles.input}
              placeholder="SENHA"
              onChangeText={Text => {
                setPassword(Text);
              }}
              ref={passRef}
              placeholderTextColor={colors.text}
              fontSize={moderateScale(17)}
              keyboardType="default"
              secureTextEntry={true}
            />
          </Animated.View>
          <Animated.View style={[styles.button_container, {opacity: opacity}]}>
            <TouchableOpacity style={styles.esqueci_senha_button}>
              <Text style={styles.esqueci_senha_text}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.login_button} onPress={logando}>
              {loading ? (
                <ActivityIndicator size={'large'} color={colors.text} />
              ) : (
                <Text style={styles.login_button_text}> Entrar </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.img_container, {opacity: opacity}]}>
          <Image
            source={require('../../assets/images/Segunda_tela_IMG.png')}
            resizeMode={'cover'}
            style={styles.img_bottom}
          />
        </Animated.View>
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
    justifyContent: 'center',
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
  input_container: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 10,
    color: colors.text,
    backgroundColor: colors.input,
  },
  button_container: {
    width: '100%',
    alignItems: 'center',
  },
  esqueci_senha_button: {
    height: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(6),
  },
  esqueci_senha_text: {
    color: colors.TextInput,
    fontWeight: 'bold',
    fontSize: 18,
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
    height: '90%',
  },
});
