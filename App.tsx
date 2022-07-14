import React, {useRef, useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from './src/helpers/Constants';
import Head from './src/components/Head/head';
import Tail from './src/components/Tail/tail';
import Food from './src/components/Food/food';
import GameLoop from './src/systems/GameLoop';

export default function App() {
  const BOARD_SIZE = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const game_engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetGame = () => {
    game_engine.current.swap({
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
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
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
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e: any) => {
          switch (e) {
            case 'game-over':
              Alert.alert('Game Over!');
              setIsGameRunning(false);
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-up')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-left')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, {backgroundColor: undefined}]} />
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-right')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-down')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text style={styles.text}>Start New Game</Text>
        </TouchableOpacity>
      )}
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
  controlContainer: {marginTop: 10},
  controllerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtn: {backgroundColor: '#ff0', width: 100, height: 100},
  text: {
    color: '#fff',
    marginTop: 15,
    fontSize: 22,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
});
