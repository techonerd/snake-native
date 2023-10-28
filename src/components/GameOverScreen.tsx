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
    width: '100%',
    height: '100%',
    backgroundColor: new Color('#3c495e'),
  },
  gameOverText: {
    fontSize: 36,  // Increase the font size for "Game Over"
    fontWeight: 'bold',
    color: new Color('white'),
  },
  scoreText: {
    fontSize: 24,  // Reduce the font size for the score
    color: new Color('white'),
  },
  highScoreText: {
    fontSize: 24,  // Reduce the font size for the high score message
    fontWeight: 'bold',
    color: new Color('yellow'), // Customize the color for the high score message
  },
  restartButton: {
    fontSize: 18,  // Reduce the font size for the button
    color: new Color('red'),
    backgroundColor: new Color('#65e765'),
    padding: 5,  // Reduce the padding for the button
    borderRadius: 5,
    marginTop: 10,  // Reduce the top margin
  },
};

