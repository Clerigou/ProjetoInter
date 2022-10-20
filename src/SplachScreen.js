import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters';

export function WithSplashScreen({children, isAppReady}) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const WAITING = 'waiting animation';
const STARTING_ANIMATION = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;

  const pawOne = useRef(new Animated.Value(0)).current;
  const pawTwo = useRef(new Animated.Value(0)).current;
  const pawThree = useRef(new Animated.Value(0)).current;
  const pawFour = useRef(new Animated.Value(0)).current;
  const pawSix = useRef(new Animated.Value(0)).current;
  const pawFive = useRef(new Animated.Value(0)).current;
  const pawFinalSize = useRef(new Animated.Value(0)).current;

  const imagem = require('../assets/images/Pata.png');

  const [state, setState] = useState(WAITING);

  function two() {
    Animated.timing(pawTwo, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(three);
  }

  function three() {
    Animated.timing(pawThree, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(four);
  }
  function four() {
    Animated.timing(pawFour, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(five);
  }
  function five() {
    Animated.timing(pawSix, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(six);
  }
  function six() {
    Animated.timing(pawFive, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(fadeout);
  }
  function fadeout() {
    Animated.parallel([
      Animated.timing(pawOne, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pawTwo, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pawThree, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pawFour, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pawSix, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(pawFinalSize, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: false,
      }),
    ]).start(lastFunction);
  }

  function lastFunction() {
    Animated.spring(pawFinalSize, {
      toValue: 2,
      tension: 100,
      friction: 7,
      useNativeDriver: false,
    }).start(() => {
      setState(WAIT_FOR_APP_TO_BE_READY);
    });
  }

  useEffect(() => {
    if (state === STARTING_ANIMATION) {
      Animated.timing(pawOne, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(two);
    }
  }, [pawOne, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[styles.container, {opacity: containerOpacity}]}>
      <View style={styles.container_um}></View>

      <Animated.View style={styles.container_dois}>
        <Animated.Image
          style={[styles.pawSix, {opacity: pawSix}]}
          source={imagem}
        />
        <Animated.Image
          style={[
            styles.pawFive,
            {opacity: pawFive},
            {
              width: pawFinalSize.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [70, 200, moderateScale(1000)],
              }),
            },
            {
              height: pawFinalSize.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [70, 200, moderateScale(1000)],
              }),
            },
            {transform: [{translateY: verticalScale(-180)}]},
          ]}
          source={imagem}
        />
        <Animated.Image
          style={[styles.pawFour, {opacity: pawFour}]}
          source={imagem}
        />
      </Animated.View>
      <View style={styles.container_tres}>
        <Animated.Image
          style={[styles.pawThree, {opacity: pawThree}]}
          source={imagem}
        />
        <Animated.Image
          style={[styles.pawTwo, {opacity: pawTwo}]}
          source={imagem}
        />
        <Animated.Image
          style={[styles.pawOne, {opacity: pawOne}]}
          onLoad={() => {
            setState(STARTING_ANIMATION);
          }}
          source={imagem}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2096be',
  },
  container_um: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container_dois: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container_tres: {
    width: '100%',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pawOne: {
    width: 70,
    height: 70,
    transform: [{translateX: 90}],
  },
  pawTwo: {
    width: 70,
    height: 70,
    transform: [{translateX: -90}],
  },
  pawThree: {
    width: 70,
    height: 70,
    transform: [{translateX: 90}],
  },
  pawFour: {
    width: 70,
    height: 70,
    transform: [{translateX: -90}],
  },
  pawSix: {
    width: 70,
    height: 70,
    transform: [{translateX: 90}],
  },
});
