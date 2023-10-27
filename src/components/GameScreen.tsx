import * as React from 'react';
import { Color } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import { MainStackParamList } from '../NavigationParamList';
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { GameScreen as Game } from './Game';

type GameProps = {
  route: RouteProp<MainStackParamList, 'Game'>;
  navigation: FrameNavigationProp<MainStackParamList, 'Game'>;
};

export function GameScreen({ navigation, route }: GameProps) {
  const [snakeLength, setSnakeLength] = React.useState(3);
  const [foodLocation, setFoodLocation] = React.useState({ x: 2, y: 3 });
  const [score, setScore] = React.useState(0);

  const startGame = () => {
    setSnakeLength(3);
    setScore(0);
    const newFoodLocation = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
    setFoodLocation(newFoodLocation);
  };

  const styles = {
    container: {
      backgroundColor: new Color('#3c495e'),
      width: '100%',
      height: '100%',
    },
    topBar: {
      backgroundColor: new Color('#65e765'),
      padding: 10,
      height: '8%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    gameArea: {
      backgroundColor: new Color('#90EE90'),
      height: '86%', // Adjusted to 80% of the screen height
    },

    pauseButton: {
      color: new Color('white'),
      backgroundColor: new Color('red'),
      padding: 10,
      fontSize: 24,
      borderRadius: 5,
      marginRight: 10,
    },
    highScore: {
      color: new Color('white'),
      fontSize: 20,
      flex: 1,
    },

    faqIcon: {
      // Style for your FAQ icon
    },
  };

  return (
    <gridLayout
      style={styles.container}
      columns="*"
      rows="auto, 80*, auto"
      backgroundColor="#3c495e"
      width="100%"
      height="100%"
    >
      <flexboxLayout
        style={styles.topBar}
        flexDirection="row"
        justifyContent="space-between"
      >
        <button text="Pause" style={styles.pauseButton} />
        <label text="High Score: 0" style={styles.highScore} />
        <button text="FAQ" style={styles.faqIcon} />
      </flexboxLayout>

      <stackLayout style={styles.gameArea} row="1">
        <Game />
      </stackLayout>
    </gridLayout>
  );
}
