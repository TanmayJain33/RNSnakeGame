import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Head({position, size}: any) {
  return (
    <View style={styles(size, position).headStyle}>
      <View style={styles(size, position).pearlStyle} />
    </View>
  );
}

const styles = (size: number, position: number[]) =>
  StyleSheet.create({
    headStyle: {
      width: size,
      height: size,
      backgroundColor: '#006400',
      position: 'absolute',
      left: position[0] * size,
      top: position[1] * size,
    },
    pearlStyle: {
      marginLeft: 5,
      marginTop: 5,
      borderRadius: size / 2,
      width: size / 2,
      height: size / 2,
      backgroundColor: '#ffd700',
    },
  });
