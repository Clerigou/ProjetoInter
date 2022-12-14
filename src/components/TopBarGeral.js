import React from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../commonStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MCicons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const size = StatusBar.currentHeight / 2;

export default function TopBarGeral({
  navigation,
  backButton,
  buttonRight,
  logOut,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        {backButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.round}>
            <FoundationIcons
              name="arrow-left"
              size={26}
              color={colors.background_secundary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.right}>
        {buttonRight ? (
          <>
            {buttonRight === 'logout' ? (
              <TouchableOpacity onPress={logOut} style={styles.logout}>
                <MCicons
                  name="logout"
                  size={40}
                  color={colors.background_primary_dark}
                />
              </TouchableOpacity>
            ) : buttonRight === 'search' ? (
              <TouchableOpacity style={styles.roundRight}>
                <EvilIcons name="search" size={35} color={colors.text} />
              </TouchableOpacity>
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
    height: verticalScale(60),
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? size : 0,
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
    width: moderateScale(40),
    height: moderateScale(40),
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundRight: {
    backgroundColor: colors.background_primary_dark,
    borderRadius: 120 / 2,
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    width: scale(40),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
