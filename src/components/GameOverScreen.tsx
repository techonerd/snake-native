import * as React from 'react';
import { Color } from '@nativescript/core';

type GameOverScreenProps = {
  score: number;
  highScore: number;
  onRestart: () => void;
};

export function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score > highScore;

  return (
    <flexboxLayout row='1' style={styles.container}>
      <label text="Game Over!" style={styles.gameOverText} />
      <label text={`Score: ${score}`} style={styles.scoreText} />
      <button text="Restart" onTap={onRestart} style={styles.restartButton} />
    </flexboxLayout>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: new Color('#3c495e'),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gameOverText: {
    position: 'relative',
    fontSize: 42,
    fontWeight: 'bold',
    color: new Color('white'),
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 24,
    color: new Color('white'),
    textAlign: 'center',
  },
  restartButton: {
    fontSize: 24,
    color: new Color('white'),
    backgroundColor: new Color('#65e765'),
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
};

