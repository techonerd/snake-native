import { RouteProp } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { FrameNavigationProp } from 'react-nativescript-navigation';

import { MainStackParamList } from '../NavigationParamList';
// import { Dialogs } from '@nativescript/core';

type HomeProps = {
  route: RouteProp<MainStackParamList, 'Home'>;
  navigation: FrameNavigationProp<MainStackParamList, 'Home'>;
};

export function HomePage({ navigation }: HomeProps) {
  const navigateToGame = () => {
    console.log('Navigating to Game Screen'); // Add this line
    navigation.navigate('Game');
  };
  return (
    <flexboxLayout style={styles.container}>
      <label text="Snake Game" style={styles.title} />
      <button
        onTap={() => navigation.navigate('Game', { message: 'Hello, world!' })}
        style={styles.button}
      >
        Start Game
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90EE90', // Brown color
    height: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '10%', // Push the text 10% below the top
    marginBottom: 20,
  },
  button: {
    fontSize: 24,
    color: 'white',
    backgroundColor: '#008CBA',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
});
