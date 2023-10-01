import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GradientBackground } from '../../components';
import { defaultColors } from '../../themes';

const Inbox = () => {
  return (
    <View style={styles.container}>
      <GradientBackground />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: defaultColors.grayBackground },
});
