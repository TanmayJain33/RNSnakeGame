import React from 'react';
import {View} from 'react-native';

export default function Head({position, size}: any) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#f00',
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
      }}
    />
  );
}
