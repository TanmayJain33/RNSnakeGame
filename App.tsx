import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from './src/helpers/Constants';
import Head from './src/components/Head/head';
import Tail from './src/components/Tail/tail';
import Food from './src/components/Food/food';

export default function App() {
  const BOARD_SIZE = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const game_engine = useRef(null);

  const randomPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <View style={styles.canvas}>
      <GameEngine
        ref={game_engine}
        style={{
          flex: 0,
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          backgroundColor: '#fff',
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              randomPosition(0, Constants.GRID_SIZE - 1),
              randomPosition(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
