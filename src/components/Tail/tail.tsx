import React from 'react';
import {View} from 'react-native';
import Constants from '../../helpers/Constants';

export default function Tail({elements, size}: any) {
  const tailList = elements.map((el: any, idx: any) => (
    <View
      key={idx}
      style={{
        width: size,
        height: size,
        backgroundColor: '#f00',
        position: 'absolute',
        left: el[0] * size,
        top: el[1] * size,
      }}
    />
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
