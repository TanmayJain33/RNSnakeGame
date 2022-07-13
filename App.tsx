import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from './src/helpers/Constants';

export default function App() {
  const BOARD_SIZE = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const game_engine = useRef(null);

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
