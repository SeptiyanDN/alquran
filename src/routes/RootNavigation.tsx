import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
import { RootStackParamList } from './_types';
import { fadeTransition } from './transitions';
import { LogBox } from 'react-native';


//Authenticated Stack
import Home from '../screens/Home';
//Bottom Tabs
import BottomTabs from './BottomTabs';

import Template from '../screens/Template';
import SplashScreen from 'react-native-splash-screen';



LogBox.ignoreLogs([
  'Possible Unhandled Promise Rejection',
  'virtualizedLists should never be nested',
  'Warning: This synthetic event is reused for performance reasons.',
]);

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabs'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Template"
        component={Template}
        options={{
          ...fadeTransition,
        }}
      />
    </Stack.Navigator>
  );
};


const RootNavigator = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1);
  }, []);
  return <AuthenticatedStack />;
};

export default RootNavigator;


