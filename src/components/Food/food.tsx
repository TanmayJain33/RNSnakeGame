import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function Food({position, size}: any) {
  return (
    <View>
      <Image
        style={styles(size, position).foodStyle}
        source={require('../../assets/images/apple.png')}
      />
    </View>
  );
}

const styles = (size: number, position: number[]) =>
  StyleSheet.create({
    foodStyle: {
      width: size,
      height: size,
      position: 'absolute',
      left: position[0] * size,
      top: position[1] * size,
    },
  });
