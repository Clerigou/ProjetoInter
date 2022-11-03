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
  Modal,
} from 'react-native';

import {CellPhoneMask, CEPMask} from '../global/mask';
import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import UsersCard from '../components/UsersCard';
import ListEmpty from '../components/ListEmpty';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../contexts/auth';
import CommonModal from '../components/CommonModal';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const CadastroUsuarioLista = ({navigation}) => {
  const [zoomModal, setZoomModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {opacity, user, setCommonModal, setMsg} = useContext(AuthContext);

  const handleZoomModal = user => {
    setZoomModal(!zoomModal);
    setCurrentUser(user);
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

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

  function showModal(obj) {
    setMsg(obj);
    setCommonModal(true);
  }
  const excluirUser = () => {
    setModal(false);
    setZoomModal(false);
    setLoading(true);

    firestore()
      .collection('Users')
      .doc(`${currentUser.email}`)
      .delete()
      .then(() => {
        setLoading(false);

        showModal({
          titulo: 'Sucesso',
          msg: 'Usuário excluído com sucesso!',
        });
      });
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../../assets/images/Segunda_tela_background.png')}
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size={'large'} color={'white'} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <CommonModal />
      <Modal visible={modal} transparent={true}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '80%',
              height: verticalScale(200),
              backgroundColor: colors.input,
              paddingHorizontal: scale(20),
              paddingVertical: verticalScale(15),
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(24),
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Tem certeza que deseja excluir este Usuário?
            </Text>
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={excluirUser}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: verticalScale(30),
                  width: scale(100),
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: colors.background_primary,
                    fontWeight: 'bold',
                    fontSize: moderateScale(16),
                  }}>
                  Sim, excluir
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: verticalScale(30),
                  width: scale(100),
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: colors.background_primary,
                    fontWeight: 'bold',
                    fontSize: moderateScale(16),
                  }}>
                  Não, cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar hidden />
      <TopBarGeral backButton navigation={navigation} />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textIntro}>Lista de{'\n'}Usuários</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={data}
          style={{
            paddingHorizontal: scale(10),
            paddingTop: scale(8),
          }}
          keyExtractor={(item, index) => index.toString()}
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
            {
              paddingBottom: 60,
            },
            data.length === 0 && {
              flex: 1,
            },
          ]}
        />
      </View>
      {zoomModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalZoom}>
            <View
              style={{
                width: '100%',
                height: verticalScale(40),
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {user.admin ? (
                <TouchableOpacity
                  onPress={() => setModal(true)}
                  style={styles.closeIcon}>
                  <MaterialIcons
                    name="account-remove"
                    size={moderateScale(42)}
                    color={colors.background_primary}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}

              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  setZoomModal(false);
                }}>
                <MaterialIcons
                  name="close-circle"
                  color={colors.background_primary}
                  size={moderateScale(35)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentValues}>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>Nome:</Text>{' '}
                {currentUser.name}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>Endereço:</Text>{' '}
                {currentUser.endereco}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>CEP:</Text>{' '}
                {CEPMask(currentUser.cep)}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>Data:</Text>{' '}
                {currentUser.nascimento}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>CPF:</Text> {currentUser.cpf}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>Número:</Text>{' '}
                {CellPhoneMask(currentUser.telefone)}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.textZoomModal}>E-mail:</Text>{' '}
                {currentUser.email}
              </Text>
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
    fontSize: scale(24),
  },
  containerTextIntro: {
    paddingLeft: moderateScale(30),
    marginTop: verticalScale(20),
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: scale(26),
    fontWeight: 'bold',
  },
  textZoomModal: {
    color: colors.background_primary_dark,
    fontSize: moderateScale(23),
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%',
    flex: 1,
    padding: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'center',
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
    height: verticalScale(400),
    backgroundColor: colors.background_secundary,
    padding: moderateScale(24),
    borderRadius: 24,
  },
  closeIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalText: {
    fontSize: moderateScale(19),
    color: 'black',
    fontWeight: 'bold',
  },
  contentValues: {
    alignSelf: 'center',
    marginTop: moderateScale(30),
  },
});

{
}

export default CadastroUsuarioLista;
