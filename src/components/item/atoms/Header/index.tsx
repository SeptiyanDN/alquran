import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { defaultColors } from '../../../../themes';
import Text from '../Text';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
type HeaderProps = {
  title?: string;
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  const navigation = useNavigation();
  const statusBarHeight = getStatusBarHeight();

  const defaultOnBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: statusBarHeight }]}>
        <Pressable
          onPress={onBack ? onBack : defaultOnBack}
          style={styles.backButton}>
          <IconFeather
            name={'arrow-left'}
            size={24}
            color={defaultColors.text}
            style={styles.backButtonIcon}
          />
        </Pressable>
        <Text type="medium" size={23} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
  },
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 56,
    width: 56,
    justifyContent: 'center',
  },
  backButtonIcon: {
    marginLeft: 16,
  },
  title: {
    marginLeft: 16,
  },
});

export default Header;
