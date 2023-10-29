import * as React from 'react';
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from 'react-nativescript-navigation';

import ErrorBoundary from './ErrorBoundary';
import { HomePage } from './HomePage';
import { GameScreen } from './Game';
import { GameOverScreen } from './GameOverScreen';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
  <BaseNavigationContainer>
    <ErrorBoundary>
      <StackNavigator.Navigator initialRouteName="Screen Home">
        <StackNavigator.Screen name="Home" component={HomePage} />
        <StackNavigator.Screen name="Game" component={GameScreen} />
        <StackNavigator.Screen name="GameOver" component={GameOverScreen} />
      </StackNavigator.Navigator>
    </ErrorBoundary>
  </BaseNavigationContainer>
);
