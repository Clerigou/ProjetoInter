import React, {useState} from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {colors} from '../commonStyles';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';

export default function InputSelect({Label, value, setValue, data}) {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShow(!show)} style={styles.pressable}>
        <Text style={styles.label}>{value === null ? Label : value}</Text>
      </Pressable>
      {show && (
        <View
          style={{
            backgroundColor: colors.text,
          }}>
          <FlatList
            data={data}
            style={{height: scale(70)}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setValue(item.item);

                  setShow(false);
                }}
                style={{
                  height: scale(35),
                  width: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: colors.input,
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontSize: 22, color: colors.input}}>
                  {item.item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: verticalScale(46),
    borderRadius: 20,
    backgroundColor: colors.input,
    zIndex: 1,
  },
  pressable: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: colors.text,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    width: '70%',
    backgroundColor: colors.background_secundary,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
