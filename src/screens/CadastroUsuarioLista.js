import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';

import {CellPhoneMask, MaskCPF, CEPMask} from '../global/mask';
import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import UsersCard from '../components/UsersCard';
import ListEmpty from '../components/ListEmpty';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../contexts/auth';

const CadastroUsuarioLista = ({navigation}) => {
  const [zoomModal, setZoomModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {opacity} = useContext(AuthContext);

  const handleZoomModal = user => {
    setZoomModal(!zoomModal);
    setCurrentUser(user);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <StatusBar hidden />
      <TopBarGeral backButton />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textIntro}>Cadastro de{'\n'}Usuários</Text>
        <Text style={styles.textUser}>Usuários</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <UsersCard
              key={item}
              user={item}
              handleZoomModal={handleZoomModal}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message={'Não há usuários cadastrados'} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {paddingBottom: 100},
            data.length === 0 && {
              flex: 1,
            },
          ]}
        />
      </View>
      {zoomModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalZoom}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setZoomModal(false)}>
              <MaterialIcons name="close-circle" size={29} />
            </TouchableOpacity>
            <View style={styles.contentValues}>
              <Text style={styles.modalText}>Nome: {currentUser.name}</Text>
              <Text style={styles.modalText}>
                CEP: {CEPMask(currentUser.cep.toString())}
              </Text>
              <Text style={styles.modalText}>
                Data: {currentUser.nascimento}
              </Text>
              <Text style={styles.modalText}>
                CPF: {MaskCPF(currentUser.cpf.toString())}
              </Text>
              <Text style={styles.modalText}>
                Número: {CellPhoneMask(currentUser.telefone)}
              </Text>
              <Text style={styles.modalText}>E-mail: {currentUser.email}</Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textUser: {
    color: colors.input,
    fontSize: 26,
  },
  containerTextIntro: {
    paddingLeft: 30,
    marginTop: 20,
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: 28,
    fontWeight: 'bold',
  },

  cardContainer: {
    width: '100%',
    height: '70%',
    padding: 10,
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalZoom: {
    width: '90%',
    height: '60%',
    backgroundColor: colors.background_secundary,
    padding: 24,
    borderRadius: 24,
  },
  closeIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
  },
  contentValues: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

{
}

export default CadastroUsuarioLista;
