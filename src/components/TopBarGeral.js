import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../commonStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MCicons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TopBarGeral({homeButton, buttonRight}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.round}>
          <FoundationIcons
            name="arrow-left"
            size={22}
            color={colors.background_secundary}
          />
        </View>
        {homeButton ? (
          <View style={styles.round}>
            <Ionicons
              name="ios-home"
              size={22}
              color={colors.background_secundary}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.right}>
        {/* {buttonRight === 'logout' ? ( */}
        <View style={styles.logout}>
          <MCicons
            name="logout"
            size={40}
            color={colors.background_primary_dark}
          />
        </View>
        {/* ) : null} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    borderWidth: 1,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    borderWidth: 1,
  },
  round: {
    backgroundColor: colors.background_primary_dark,
    borderRadius: 120 / 2,
    width: 40,
    height: 40,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
