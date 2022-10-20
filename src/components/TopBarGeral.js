import React from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {colors} from '../commonStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MCicons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function TopBarGeral({navigation, homeButton, buttonRight}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Pressable onPress={() => navigation.goBack()} style={styles.round}>
          <FoundationIcons
            name="arrow-left"
            size={22}
            color={colors.background_secundary}
          />
        </Pressable>
        {homeButton ? (
          <Pressable style={styles.round}>
            <Ionicons
              name="ios-home"
              size={22}
              color={colors.background_secundary}
            />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.right}>
        {buttonRight ? (
          <>
            {buttonRight === 'logout' ? (
              <Pressable style={styles.logout}>
                <MCicons
                  name="logout"
                  size={40}
                  color={colors.background_primary_dark}
                />
              </Pressable>
            ) : buttonRight === 'search' ? (
              <Pressable style={styles.roundRight}>
                <EvilIcons name="search" size={30} color={colors.text} />
              </Pressable>
            ) : null}
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  round: {
    backgroundColor: colors.background_primary_dark,
    borderRadius: 120 / 2,
    width: 38,
    height: 38,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundRight: {
    backgroundColor: colors.background_primary_dark,
    borderRadius: 120 / 2,
    width: 38,
    height: 38,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
