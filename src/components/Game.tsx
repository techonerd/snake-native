import * as React from 'react';
import {
  Color,
  Screen,
  SwipeGestureEventData,
} from '@nativescript/core';
import {  GameOverScreen } from './GameOverScreen';
import { RouteProp } from '@react-navigation/core';
import { MainStackParamList } from '../NavigationParamList';
import { FrameNavigationProp } from 'react-nativescript-navigation';

type GameProps = {
  route: RouteProp<MainStackParamList, 'Game'>;
  navigation: FrameNavigationProp<MainStackParamList, 'Game'>;
};

const availableWidth = Screen.mainScreen.widthDIPs;
const availableHeight = Screen.mainScreen.heightDIPs;
const gameAreaHeight = 0.8 * availableHeight; // 80% of the screen height
const cellSize = Math.min(availableWidth, availableHeight) / 10;
const numColumns = Math.floor(availableWidth / cellSize);
const numRows = Math.floor(gameAreaHeight / cellSize);
const remainingHeight = gameAreaHeight - numRows * cellSize;
const topMargin = remainingHeight / 2; 
const bottomMargin = remainingHeight / 2;

export function GameScreen({ navigation, route }: GameProps) {
  // Define initial game state
  const initialSnake = [
    { x: Math.floor(numColumns / 2), y: Math.floor(numRows / 2) },
    { x: Math.floor(numColumns / 2) - 1, y: Math.floor(numRows / 2) },
    { x: Math.floor(numColumns / 2) - 2, y: Math.floor(numRows / 2) },
  ];
  const directions = ['UP', 'DOWN', 'RIGHT'];
  const initialDirection = directions[Math.floor(Math.random() * directions.length)];

const resetGame = () => {
    setSnake(initialSnake);
    setDirection(initialDirection);
    setFood(generateFood(numColumns, numRows, initialSnake));
    setScore(0);
  };

  const [highScore, setHighScore] = React.useState(0);
  
  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setGameOver(true);
  };

  const handleRestart = () => {
    setGameOver(false);
    resetGame();
  };


  const initialFood = generateFood(numColumns, numRows, initialSnake);
  const initialScore = 0;

  const [snake, setSnake] = React.useState(initialSnake);
  const [direction, setDirection] = React.useState(initialDirection);
  const [food, setFood] = React.useState(initialFood);
  const [score, setScore] = React.useState(initialScore);
  const [gameOver, setGameOver] = React.useState(false);

  const directionRef = React.useRef(direction);


  React.useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const handleSwipe = (args: SwipeGestureEventData) => {
    const swipeDirection = args.direction;
    let newDirection;
    switch (swipeDirection) {
      case 1:
        newDirection = 'RIGHT';
        break;
      case 2:
        newDirection = 'LEFT';
        break;
      case 4:
        newDirection = 'UP';
        break;
      case 8:
        newDirection = 'DOWN';
        break;
      default:
        return;
    }
     if (
       (newDirection === 'UP' && directionRef.current === 'DOWN') ||
       (newDirection === 'DOWN' && directionRef.current === 'UP') ||
       (newDirection === 'LEFT' && directionRef.current === 'RIGHT') ||
       (newDirection === 'RIGHT' && directionRef.current === 'LEFT')
       ) {
         return; // Ignore swipes in the opposite direction
        }
        
        // Update the snake's direction
        setDirection(newDirection);
  };

  const gridLayout = React.useRef(null);
  
  React.useEffect(() => {
    if (gridLayout.current) {
      const grid = gridLayout.current.nativeView;
      grid.on('swipe', handleSwipe);
    }
  }, []);

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }
    
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        handleGameOver();
        return;
      }
    }
    if (head.x < 0) {
      head.x = numColumns - 1;
    } else if (head.x >= numColumns) {
      head.x = 0;
    }

    if (head.y < 0) {
      head.y = numRows - 1;
    } else if (head.y >= numRows) {
      head.y = 0;
    }
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(generateFood(numColumns, numRows, newSnake));
      newSnake.push({ ...newSnake[snake.length - 1] });
    } else {
      newSnake.unshift(head);
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  React.useEffect(() => {
    const interval = setInterval(moveSnake, 250);
    return () => {
      clearInterval(interval);
    };
  }, [snake, direction]);

  function generateFood(numColumns, numRows, snake) {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * numColumns),
        y: Math.floor(Math.random() * numRows),
      };
    } while (
      snake.some((segment) => segment.x === food.x && segment.y === food.y)
    );
    return food;
  }
  const diamondStyle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: cellSize / 2,
    borderRightWidth: cellSize / 2,
    borderBottomWidth: cellSize,
    borderTopWidth: cellSize,
    borderLeftColor: 'transparent',
    borderRightColor: 'red',
    borderBottomColor: 'transparent',
    borderTopColor: '#90EE90',
  };
  
  
  const renderGameGrid = () => {
    const gridItems = [];
    for (let row = 0; row < numRows; row++) {
      const rowItems = [];
      for (let col = 0; col < numColumns; col++) {
        const isSnakeSegment = snake.some(
          (segment) => segment.x === col && segment.y === row
        );
        const isFood = food.x === col && food.y === row;
        let cellContent = null;
        
        const foodEmoji = Math.random() < 0.5 ? '🐁' : '🐀';
        let cellBackgroundColor = 'transparent';
        if (isSnakeSegment) {
          const isHead = snake[0].x === col && snake[0].y === row;
          if (isHead){
            cellContent = (
              <label
              style={{
                borderRadius: '50px 50px 50px 50px',
                background: '#90EE90',
                width: cellSize, height: cellSize,
              }}
            ></label>
          );
            // cellBackgroundColor = '#90EE90';
          } else {
            cellContent = (
          //     <label
          //     style={{
          //       borderRadius: '50px 50px 50px 50px',
          //       background: '#90EE90',
          //       width: cellSize, height: cellSize,
          //     }}
          //   ></label>
          // );
          <label style={diamondStyle}>
          </label>
          );
        } 
        
        } else if (isFood) {
          cellContent = (
            <label text={foodEmoji} style={{ fontSize: 24 }}></label>
          );
        }

        const cellStyle = {
          width: cellSize,
          height: cellSize,
          backgroundColor: new Color(cellBackgroundColor),
          borderWidth: 1,
          borderColor: new Color('lightgray'),
        };

        const cellKey = `cell-${row}-${col}`;
        rowItems.push(
          <stackLayout key={cellKey} style={cellStyle}>
            {cellContent}
          </stackLayout>
        );
      }
      const rowKey = `row-${row}`;

      gridItems.push(
        <flexboxLayout key={rowKey} flexDirection="row">
          {rowItems}
        </flexboxLayout>
      );
    }
    
    return <stackLayout style={styles.gameArea}>{gridItems}</stackLayout>;
  };
  
  const gridStyle = {
    marginTop: topMargin,
    marginBottom: bottomMargin,
    backgroundColor: new Color('#3c495e'),
  };
  return (
    <gridLayout rows="auto, *, auto"  style={{ backgroundColor: 'black' }}>
  <flexboxLayout row="0" style={styles.topBar}>
    {/* <button text="Pause" style={styles.pauseButton} /> */}

    <i class="fa-solid fa-question fa-lg" style="color: #ffffff;"></i>
    <label text={`High Score: ${highScore}`} style={styles.highScore} />
    <button text="FAQ" style={styles.faqIcon} />
  </flexboxLayout>
  <stackLayout ref={gridLayout} row="1" style={{ ...styles.gameArea, ...gridStyle }}>
    {gameOver ? (
      <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} />
    ) : (
      renderGameGrid()
    )}
  </stackLayout>
  <flexboxLayout row="2" style={styles.bottomBar}>
    <label text={`Score: ${score}`} style={styles.currentScore} />
  </flexboxLayout>
</gridLayout>

  );
}

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: new Color('#3c495e'),
  },
  topBar: {
    backgroundColor: new Color('#3c495e'),
    padding: 10,
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameArea: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: new Color('#3c495e'),
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
    flex: 1, // Takes up available space to push the other items to the right
    textAlign: 'center', // Center-align the text
  },
  faqIcon: {
    // Style for your FAQ icon
  },
  bottomBar: {
    backgroundColor: new Color('#3c495e'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 'auto',
    justifyContent: 'space-between',
  },
  currentScore: {
    color: new Color('white'),
    fontSize: 20,
    flex: 1,
    textAlign: 'center', 
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new Color('#3c495e'),
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};
