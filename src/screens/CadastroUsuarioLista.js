import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import UsersCard from '../components/UsersCard';
import ListEmpty from '../components/ListEmpty';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CadastroUsuarioLista = ({navigation}) => {
  const [zoomModal, setZoomModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleZoomModal = user => {
    setZoomModal(!zoomModal);
    setCurrentUser(user);
  };

  const Values = [
    {
      Nome: 'Gabriel Monteiro',
      Rua: 'R.Jorge Aragão, Nº10, Centro, Moreno- PE',
      CEP: '54100-320',
      Data: '10/01/2004',
      CPF: '138.934.255-43',
      Numero: '(81)98374-3234',
      Email: 'gabrielm@gmail.com',
    },
    {
      Nome: 'Gabrielx',
      Rua: 'R.Jorge Aragão, Nº10, Centro, Moreno- PE',
      CEP: '54100-320',
      Data: '10/01/2004',
      CPF: '138.934.255-43',
      Numero: '(81)98374-3234',
      Email: 'gabrielm@gmail.com',
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <StatusBar hidden />
      <TopBarGeral buttonRight={true} homeButton />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textIntro}>Cadastro de{'\n'}Usuários</Text>
        <Text style={styles.textUser}>Usuários</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={Values}
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
            Values.length === 0 && {flex: 1},
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
              <Text style={styles.modalText}>Nome: {currentUser.Nome}</Text>
              <Text style={styles.modalText}>Endereço: {currentUser.Rua}</Text>
              <Text style={styles.modalText}>CEP: {currentUser.CEP}</Text>
              <Text style={styles.modalText}>Data: {currentUser.Data}</Text>
              <Text style={styles.modalText}>CPF: {currentUser.CPF}</Text>
              <Text style={styles.modalText}>Número: {currentUser.Numero}</Text>
              <Text style={styles.modalText}>E-mail: {currentUser.Email}</Text>
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
