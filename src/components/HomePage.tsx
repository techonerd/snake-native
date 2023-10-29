import { RouteProp } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { FrameNavigationProp } from 'react-nativescript-navigation';

import { MainStackParamList } from '../NavigationParamList';

type HomeProps = {
  route: RouteProp<MainStackParamList, 'Home'>;
  navigation: FrameNavigationProp<MainStackParamList, 'Home'>;
};

export function HomePage({ navigation }: HomeProps) {
  return (
    <flexboxLayout style={styles.container}>
      <label text={"SNAKE GAME"} style={styles.title} />
      <button
        onTap={() => navigation.navigate('Game')}
        style={styles.button}
      >
        Start
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90EE90',
    height: '100%',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '10%',
    marginBottom: 20,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#008CBA',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
});
