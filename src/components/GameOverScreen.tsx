import * as React from 'react';
import { Color, Button, Label } from '@nativescript/core';

type GameOverScreenProps = {
  score: number;
  highScore: number;
  onRestart: () => void;
};

export function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score > highScore;

  return (
    <stackLayout style={styles.container}>
      <label text="Game Over!" style={styles.gameOverText} />
      <label text={`Score: ${score}`} style={styles.scoreText} />
      {isNewHighScore ? (
        <label text="New High Score!" style={styles.highScoreText} />
      ) : null}
      <button text="Restart" onTap={onRestart} style={styles.restartButton} />
    </stackLayout>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: new Color('#3c495e'),
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: new Color('white'),
  },
  scoreText: {
    fontSize: 20,
    color: new Color('white'),
  },
  highScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: new Color('yellow'), // Customize the color for the high score message
  },
  restartButton: {
    fontSize: 18,
    color: new Color('white'),
    backgroundColor: new Color('#65e765'),
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
};
