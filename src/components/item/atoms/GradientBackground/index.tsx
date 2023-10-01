import React, { memo } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { defaultColors } from '../../../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { easeGradient } from 'react-native-easing-gradient';
import { hexToRGBA } from '../../../../utils/helpers';

const GradientBackground = () => {
  const { colors, locations } = easeGradient({
    colorStops: {
      0.01: {
        color: hexToRGBA(defaultColors.primary, 0.1),
      },
      1: {
        color: defaultColors.grayBackground,
      },
    },
  });

  return (
    <>
      <StatusBar translucent />
      <LinearGradient
        colors={colors}
        locations={locations}
        style={styles.gradient}
      />
    </>
  );
};

export default memo(GradientBackground);

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: 250,
    width: wp(200),
    marginLeft: wp(-120),
    transform: [{ rotate: '-45deg' }],
  },
});
