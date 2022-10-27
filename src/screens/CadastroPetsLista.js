import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

import {colors} from '../commonStyles';
import TopBarGeral from '../components/TopBarGeral';
import PetsCard from '../components/PetsCard';
import ListEmpty from '../components/ListEmpty';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../contexts/auth';
import storage from '@react-native-firebase/storage';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const CadastroPetsLista = ({navigation}) => {
  const [currentpets, setCurrentPets] = useState({});
  const [zoomModal, setZoomModal] = useState(false);
  const [savePDF, setSavePDF] = useState(true);
  const [pdfName, setPdfName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {opacity} = useContext(AuthContext);
  const [zoomLoading, setZoomLoading] = useState(true);
  const [url, setUrl] = useState();

  async function getUrl(pet) {
    console.log('chamou url');

    const url = await storage()
      .ref(`Pets/${pet.name}`)
      .getDownloadURL()

      .then(res => {
        setUrl(res);
        setZoomLoading(false);
      });
  }

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const subscriber = firestore()
      .collection('Pets')
      .onSnapshot(querySnapshot => {
        const pets = [];

        querySnapshot.forEach(documentSnapshot => {
          pets.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(pets);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handlePets = pets => {
    setZoomModal(!zoomModal);
    setCurrentPets(pets);
    setSavePDF(true);
    getUrl(pets);
  };

  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: `${pdfName}`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  };

  const onSetPDFName = () => {
    createPDF();
    setZoomModal(!zoomModal);
  };

  const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Pets Lar</title>
            <style>
              ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Pets Lar</h1>
            </header>
              <h1>Registro de Pets</h1>
            <table width="650">
            <tr bgcolor="grey">
                <th width="100">Nome</th>
                <th width="100">Raça</th>
                <th width="100">Pelagem</th>
                <th width="100">Porte Físico</th>
                <th width="100">Tipo</th>
                <th width="100">Sexo</th>
            </tr>
            <tr bgcolor="lightgrey" align="center">
            <td>${currentpets.name}</td>
            <td>${currentpets.raca}</td>
            <td>${currentpets.pelagem}</td>
            <td>${currentpets.porte}</td>
            <td>${currentpets.tipo}</td>
            <td>${currentpets.sexo}</td>
            </tr>
            </table>
            <table width="650">
            <tr bgcolor="grey">
            <th width="100">Idade</th>
            <th width="200">Vacinas</th>
            <th width="320">Observações</th>
            </tr>
            <tr bgcolor="lightgrey" align="center">
            <td>${currentpets.idade}</td>
            <td>${currentpets.vacinas}</td>
            <td>${currentpets.obs}</td>
            </tr>
            </table>
          </body>
        </html>
      `;

  return (
    <ImageBackground
      source={require('../../assets/images/Segunda_tela_background.png')}
      style={styles.container}>
      <StatusBar hidden />
      <TopBarGeral backButton navigation={navigation} />
      <View style={styles.containerTextIntro}>
        <Text style={styles.textIntro}>Lista de{'\n'}Animais Resgatados</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={data}
          style={{
            paddingHorizontal: scale(10),
            paddingTop: scale(8),
          }}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <PetsCard
              key={item}
              pets={item}
              handleZoomModal={handlePets}
              zoomSelected
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message={'Não há usuários cadastrados'} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {paddingBottom: 60},
            data.length === 0 && {flex: 1},
          ]}
        />
      </View>
      {zoomModal && (
        <View style={styles.modalContainer}>
          {!zoomLoading ? (
            <View style={styles.modalZoom}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  setZoomModal(false);
                  setZoomLoading(true);
                }}>
                <MaterialIcons name="close-circle" size={29} />
              </TouchableOpacity>
              <View style={styles.contentValues}>
                <View style={styles.pictureContent}>
                  <Image style={styles.picture} source={{uri: url}} />
                </View>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Nome:</Text>{' '}
                  {currentpets.name}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Raça:</Text>{' '}
                  {currentpets.raca}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Pelagem:</Text>{' '}
                  {currentpets.pelagem}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Porte Físico:</Text>{' '}
                  {currentpets.porte}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Data:</Text>{' '}
                  {currentpets.data}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Sexo:</Text>{' '}
                  {currentpets.sexo}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Idade:</Text>{' '}
                  {currentpets.idade}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Vacinas:</Text>{' '}
                  {currentpets.vacinas}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.textZoomModal}>Observações:</Text>{' '}
                  {currentpets.obs.length > 20
                    ? `${currentpets.obs.slice(0, 25)}...`
                    : currentpets.obs}
                </Text>
              </View>
              {savePDF && (
                <TouchableOpacity
                  style={styles.savePDF}
                  onPress={() => {
                    setSavePDF(false);
                  }}>
                  <Text>Salve em PDF</Text>
                </TouchableOpacity>
              )}
              {!savePDF && (
                <KeyboardAvoidingView behavior="padding">
                  <View style={styles.savePDF}>
                    <TextInput
                      style={{marginLeft: 5}}
                      placeholder="Digite o nome do PDF"
                      onChangeText={text => setPdfName(text)}
                    />
                    <TouchableOpacity>
                      <MaterialIcons
                        name="check"
                        size={scale(24)}
                        color={'#6ffc03'}
                        onPress={() => {
                          onSetPDFName();
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              )}
            </View>
          ) : (
            <View style={styles.modalZoom}>
              <ActivityIndicator />
            </View>
          )}
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
    fontSize: scale(22),
  },
  containerTextIntro: {
    paddingLeft: scale(30),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  textIntro: {
    color: colors.background_primary_dark,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  textZoomModal: {
    color: colors.background_primary_dark,
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%',
    height: verticalScale(480),
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
    height: verticalScale(550),
    backgroundColor: colors.background_secundary,
    padding: moderateScale(24),
    borderRadius: 24,
  },
  closeIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalText: {
    fontSize: scale(18),
    color: 'black',
    fontWeight: 'bold',
  },
  contentValues: {
    flex: 1,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    justifyContent: 'flex-end',
  },
  pictureContent: {
    width: scale(150),
    height: scale(150),
    borderRadius: moderateScale(80),
    backgroundColor: colors.background_primary_dark,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  picture: {
    width: scale(135),
    height: scale(135),
    borderRadius: moderateScale(70),
  },
  savePDF: {
    width: '80%',
    height: scale(38),
    backgroundColor: colors.background_primary,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: moderateScale(15),
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

{
}

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;

export default CadastroPetsLista;
