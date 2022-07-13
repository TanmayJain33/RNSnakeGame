import React from 'react';
import {View} from 'react-native';

export default function Food({position, size}: any) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#0f0',
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 50,
      }}
    />
  );
}
