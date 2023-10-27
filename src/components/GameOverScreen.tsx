// components/GameOverScreen.tsx
import * as React from 'react';
import { StackLayout, Button, Label } from '@nativescript/core';

export function GameOverScreen() {
  const playAgain = () => {
    // Logic to start a new game
  };

  const isNewHighScore = true; // Sample value

  return (
    <StackLayout>
      <Label text="Game Over" />
      <Button text="Play Again" onTap={playAgain} />
      {isNewHighScore && <Label text="New High Score!" />}
    </StackLayout>
  );
}
