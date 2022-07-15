import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from '../../helpers/Constants';

export default function Tail({elements, size}: any) {
  // added in the tail when snake eats the food
  const tailList = elements.map((el: any, idx: any) => (
    <View key={idx} style={styles(el, size).tailStyles} />
  ));
  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
      }}>
      {tailList}
    </View>
  );
}

const styles = (el: number[], size: number) =>
  StyleSheet.create({
    tailStyles: {
      width: size,
      height: size,
      backgroundColor: '#000',
      position: 'absolute',
      left: el[0] * size,
      top: el[1] * size,
    },
  });
