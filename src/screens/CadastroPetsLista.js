import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import PetsCard from '../components/PetsCard';
import ListEmpty from '../components/ListEmpty';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import poodle from '../../assets/images/poodle.jpg';

const CadastroPetsLista = ({navigation}) => {
  const [currentpets, setCurrentPets] = useState({});
  const [zoomModal, setZoomModal] = useState(false);

  const handlePets = pets => {
    setZoomModal(!zoomModal);
    setCurrentPets(pets);
  };

  const Values = [
    {
      nome: 'Belinha',
      raca: 'Poodle',
      pelagem: 'Encaracolada',
      porteFisico: 'P',
      data: '14/10/2022',
      sexo: 'Fêmea',
      idade: '2',
      doencas: 'Nenhuma',
      vacinas: 'Raiva',
      observacoes: 'Dócil, gosta de brincar, come bem',
    },
    {
      nome: 'Belinha',
      raca: 'Poodle',
      pelagem: 'Encaracolada',
      porteFisico: 'P',
      data: '14/10/2022',
      sexo: 'Fêmea',
      idade: '2',
      doencas: 'Nenhuma',
      vacinas: 'Raiva',
      observacoes: 'Dócil, gosta de brincar, come bem',
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <StatusBar hidden />
      <TopBarGeral buttonRight homeButton />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textIntro}>Lista de{'\n'}Animais Resgatados</Text>
        <Text style={styles.textUser}>Pets</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={Values}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <PetsCard key={item} pets={item} handleZoomModal={handlePets} />
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
              <View style={styles.pictureContent}>
                <Image
                  style={styles.picture}
                  source={require('../../assets/images/poodle.jpg')}
                />
              </View>
              <Text style={styles.modalText}>Nome: {currentpets.nome}</Text>
              <Text style={styles.modalText}>Raca: {currentpets.raca}</Text>
              <Text style={styles.modalText}>
                Pelagem: {currentpets.pelagem}
              </Text>
              <Text style={styles.modalText}>
                Porte Fisico: {currentpets.porteFisico}
              </Text>
              <Text style={styles.modalText}>Data: {currentpets.data}</Text>
              <Text style={styles.modalText}>Sexo: {currentpets.sexo}</Text>
              <Text style={styles.modalText}>Idade: {currentpets.idade}</Text>
              <Text style={styles.modalText}>
                Doenças: {currentpets.doencas}
              </Text>
              <Text style={styles.modalText}>
                Vacinas: {currentpets.vacinas}
              </Text>
              <Text style={styles.modalText}>
                Observações:{' '}
                {currentpets.observacoes.length > 12
                  ? `${currentpets.observacoes.slice(0, 25)}...`
                  : currentpets.observacoes}
              </Text>
            </View>
            <TouchableOpacity style={styles.savePDF}>
              <Text>Salve em PDF</Text>
            </TouchableOpacity>
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
    height: '80%',
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
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  pictureContent: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  savePDF: {
    width: '80%',
    height: 40,
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
});

{
}

export default CadastroPetsLista;
