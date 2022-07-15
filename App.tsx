import React, {useRef, useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from './src/helpers/Constants';
import Head from './src/components/Head/head';
import Tail from './src/components/Tail/tail';
import Food from './src/components/Food/food';
import GameLoop from './src/systems/GameLoop';

export default function App() {
  // Calculating the canvas/board/playing area size (15 * 15 grid)
  const BOARD_SIZE = Constants.GRID_SIZE * Constants.CELL_SIZE;
  // GameEngine ref
  const game_engine = useRef(null);
  // to check whther the game is running or not
  const [isGameRunning, setIsGameRunning] = useState(true);

  // function to ensure randomness of food position
  const randomPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // function for resetting the game by passing entites initial values and updating the game's running state
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
    // Canvas or playing area where game objects are displayed
    <View style={styles.canvas}>
      {/* GameEnigine component */}
      <GameEngine
        ref={game_engine}
        style={gameEngineStyles(BOARD_SIZE).gameEngineStyles}
        // to add an entity/object, we nedd to paas it in "entities" props
        entities={{
          head: {
            // initial position of snake's head
            position: [0, 0],
            // size of snake's head
            size: Constants.CELL_SIZE,
            // updateFrequency and nextMove are used to slow down the speed
            updateFrequency: 10,
            nextMove: 10,
            // xspeed and yspeed are movement and direction
            xspeed: 0,
            yspeed: 0,
            // renders the component
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
            // empty array initially which will store tail length when snake eats the food
            elements: [],
            renderer: <Tail />,
          },
        }}
        // to make a game loop, we need to add "systems" props which accepts array of functions
        systems={[GameLoop]}
        running={isGameRunning}
        //used to listen to game over event
        onEvent={(e: any) => {
          switch (e) {
            case 'game-over':
              Alert.alert('Game Over!');
              //stopping the game loop
              setIsGameRunning(false);
              return;
          }
        }}
      />
      {/* control buttons */}
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          {/* Move Up Button */}
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-up')}>
            <View style={styles.controlBtn}>
              <Text style={styles.controlText}>Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          {/* Move Left Button */}
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-left')}>
            <View style={styles.controlBtn}>
              <Text style={styles.controlText}>Left</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.controlBtn, {backgroundColor: undefined}]} />
          {/* Move Right Button */}
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-right')}>
            <View style={styles.controlBtn}>
              <Text style={styles.controlText}>Right</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          {/* Move Down Button */}
          <TouchableOpacity
            onPress={() => game_engine.current.dispatch('move-down')}>
            <View style={styles.controlBtn}>
              <Text style={styles.controlText}>Down</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        // Button for starting a new game and only appears when game is over
        <TouchableOpacity onPress={resetGame}>
          <Text style={styles.text}>Start New Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const gameEngineStyles = (BOARD_SIZE: any) =>
  StyleSheet.create({
    gameEngineStyles: {
      flex: 0,
      width: BOARD_SIZE,
      height: BOARD_SIZE,
      backgroundColor: '#fff',
    },
  });

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
  controlBtn: {
    backgroundColor: '#ff0',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {color: '#000', fontSize: 20, fontWeight: '700'},
  text: {
    color: '#fff',
    marginTop: 15,
    fontSize: 22,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
});
