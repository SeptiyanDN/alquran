import React from 'react';
import { View, StyleSheet } from 'react-native';
import { defaultColors } from '../../../../themes';
import { Text, Pressable } from '../../atoms/';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type ErrorProps = {
  message?: string;
  onPress?: () => void;
};

const Error: React.FC<ErrorProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text
        type={'regular'}
        size={20}
        color={defaultColors.text}
        align="center">
        Telah terjadi kesalahan. Silakan mencoba beberapa saat lagi.
      </Text>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: defaultColors.primary,
          width: wp(60),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          marginTop: 16,
          height: 48,
        }}>
        <Text
          type={'regular'}
          size={18}
          color={defaultColors.white}
          align="center">
          Coba Lagi
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: 16,
  },
  lottie: {
    width: wp(60),
    height: wp(60),
    marginBottom: 16,
  },
});

export default Error;
