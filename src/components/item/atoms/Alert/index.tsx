import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useAlert} from './AlertContext';

const Alert: React.FC = () => {
  const {message, hide} = useAlert();

  if (!message) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View style={{backgroundColor: 'white', padding: 20, borderRadius: 5}}>
        <Text>{message}</Text>
        <Pressable
          onPress={hide}
          style={{
            marginTop: 10,
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Alert;
