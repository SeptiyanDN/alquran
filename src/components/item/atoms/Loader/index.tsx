import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { defaultColors } from '../../../../themes';

const Loading = () => {
  return (
    <View style={styles.containerLoading}>
      <View style={styles.containerLottie}>
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          resizeMode={'cover'}
          source={require('../../../../assets/lottie/not-found.json')}
        />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  containerLoading: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  containerLottie: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    backgroundColor: defaultColors.white,
  },
  lottie: { height: 98, width: 98, top: -7, left: -7 },
});
