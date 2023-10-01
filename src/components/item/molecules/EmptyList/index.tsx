import React from 'react';
import { View, StyleSheet } from 'react-native';
import { defaultColors } from '../../../../themes';
import { Text } from '../../atoms/';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';

type EmptyListProps = {
  message?: string;
};

const EmptyList: React.FC<EmptyListProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../../../../assets/lottie/not-found.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text
        type={'regular'}
        size={20}
        color={defaultColors.text}
        align="center">
        {message}
      </Text>
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

export default EmptyList;
