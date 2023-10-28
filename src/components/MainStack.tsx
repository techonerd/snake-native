import * as React from 'react';
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from 'react-nativescript-navigation';

import { HomePage } from './HomePage'; // Assuming your HomePage component is located in 'components'
import { GameScreen } from './Game';
import ErrorBoundary from './ErrorBoundary';
// import { ReopenPrompt } from './PlayAgain';
import { GameOverScreen } from './GameOverScreen';

const StackNavigator = stackNavigatorFactory();

/**
 * The main stack navigator for the whole app.
 */
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
