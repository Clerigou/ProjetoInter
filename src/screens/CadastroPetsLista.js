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

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const CadastroPetsLista = ({navigation}) => {
  const [currentpets, setCurrentPets] = useState({});
  const [zoomModal, setZoomModal] = useState(false);

  const handlePets = pets => {
    setZoomModal(!zoomModal);
    setCurrentPets(pets);
  };

  const data = [
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
    //     {
    //       nome: 'Costela',
    //       raca: 'Routiva',
    //       pelagem: 'Encaracolada',
    //       porteFisico: 'P',
    //       data: '14/10/2022',
    //       sexo: 'Fêmea',
    //       idade: '2',
    //       doencas: 'Nenhuma',
    //       vacinas: 'Raiva',
    //       observacoes: 'Dócil, gosta de brincar, come bem',
    //     },
  ];

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
              <address>
                <p>${data.raca}</p>
                <p>${data.address}</p>
                <p>${data.phone}</p>
              </address>
            </header>
            <article>
              <h1>Recipient</h1>
              <address>
                <p>${data.company}<br>c/o ${data.name}</p>
              </address>
              <table class="meta">
                <tr>
                  <th><span>Invoice #</span></th>
                  <td><span>101138</span></td>
                </tr>
                <tr>
                  <th><span>Date</span></th>
                  <td><span>${new Date()}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Due</span></th>
                  <td><span id="prefix">$</span><span>${data.amount}</span></td>
                </tr>
              </table>
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>Description</span></th>
                    <th><span>Rate</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Price</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>Front End Consultation</span></td>
                    <td><span>Experience Review</span></td>
                    <td><span data-prefix>$</span><span>${data.amt}</span></td>
                    <td><span>4</span></td>
                    <td><span data-prefix>$</span><span>${data.amt}</span></td>
                  </tr>
                </tbody>
              </table>
              <table class="balance">
                <tr>
                  <th><span>Total</span></th>
                  <td><span data-prefix>$</span><span>${data.amt}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Paid</span></th>
                  <td><span data-prefix>$</span><span>0.00</span></td>
                </tr>
                <tr>
                  <th><span>Balance Due</span></th>
                  <td><span data-prefix>$</span><span>${data.amount}</span></td>
                </tr>
              </table>
            </article>
            <aside>
              <h1><span>Additional Notes</span></h1>
              <div>
                <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
              </div>
            </aside>
          </body>
        </html>
      `;

  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  };

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
          data={data}
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
            data.length === 0 && {flex: 1},
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
            <TouchableOpacity
              style={styles.savePDF}
              onPress={() => createPDF()}>
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
