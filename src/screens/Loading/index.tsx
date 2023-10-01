import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { defaultColors } from '../../themes';

const LoadingScreen = () => {
  const renderStatusBar = useMemo(() => {
    return (
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      {renderStatusBar}
      <View style={styles.centerContent}>
        <View style={styles.contentWrapper}>
          <ActivityIndicator size="large" color={defaultColors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: wp('50%'), // 50% dari lebar layar
    height: hp('50%'), // 50% dari tinggi layar
    justifyContent: 'center', // Mengatur konten di tengah secara vertikal
    alignItems: 'center', // Mengatur konten di tengah secara horizontal
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: defaultColors.primary,
  },
});

export default LoadingScreen;
