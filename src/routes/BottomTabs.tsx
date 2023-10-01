/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Home from '../screens/Home';

import { Text } from '../components';
import IconFeather from 'react-native-vector-icons/Feather';
import { defaultColors } from '../themes';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const screenOptions = ({ route }: BottomTabScreenProps<any, any>) => ({
    headerShown: false,
    tabBarStyle: {
      height: 65,
    },
    tabBarIcon: ({
      focused,
      color,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName;
      let name;

    
        if (route.name === 'Home') {
          iconName = 'home';
          name = 'Beranda';
        } else if (route.name === 'Riwayat') {
          iconName = 'list';
          name = 'Riwayat';
        } else if (route.name === 'Favorit') {
          iconName = 'bookmark';
          name = 'Favorit';
        } else if (route.name === 'Information') {
          iconName = 'info';
          name = 'Info';
        }

      return (
        <View style={styles.tabContainer}>
          <IconFeather name={iconName} size={24} color={color} />
          <Text
            type={'regular'}
            size={15}
            style={[
              styles.tabIconText,
              { color: focused ? defaultColors.primary : 'gray' },
            ]}>
            {name}
          </Text>
        </View>
      );
    },
  });

  const tabBarOptions = {
    activeTintColor: defaultColors.primary,
    inactiveTintColor: 'gray',
    showLabel: false,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Riwayat" component={Home} />
      <Tab.Screen name="Favorit" component={Home} />
      <Tab.Screen name="Information" component={Home} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconCircleFocused: {
    borderWidth: 2,
    borderColor: 'white',
  },
  tabIconText: {
    marginTop: 5,
  },
  tabContainer: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosContainer: {
    height: 70,
    width: 70,
    top: -20,
    borderRadius: 70 / 2,
    backgroundColor: defaultColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt4: { marginTop: 4 },
});

export default BottomTabNavigator;
