import * as React from 'react';
import {
  Color,
  Screen,
  Image,
  ImageSource,
  PanGestureEventData,
  SwipeGestureEventData,
} from '@nativescript/core';
import {  GameOverScreen,
} from './GameOverScreen';
export function GameScreen() {
  const availableWidth = Screen.mainScreen.widthDIPs;
  const availableHeight = Screen.mainScreen.heightDIPs;
  const gameAreaHeight = 0.8 * availableHeight; // 80% of the screen height
  const cellSize = Math.min(availableWidth, availableHeight) / 10;
  const numColumns = Math.floor(availableWidth / cellSize);
  const numRows = Math.floor(gameAreaHeight / cellSize);

  // Define initial game state
  const initialSnake = [
    { x: Math.floor(numColumns / 2), y: Math.floor(numRows / 2) },
    { x: Math.floor(numColumns / 2) - 1, y: Math.floor(numRows / 2) },
    { x: Math.floor(numColumns / 2) - 2, y: Math.floor(numRows / 2) },
  ];
  // const Image = require("tns-core-modules/ui/image").Image;

// Create an Image element
// const headImage = new Image();
// const bodyImage = new Image();
const headImageSource = ImageSource.fromResource('~/src/media/snake_head.png'); // Replace with the correct path
const bodyImageSource = ImageSource.fromResource('~/src/media/snake_body.png'); // Replace with the correct path
 
const headImage = new Image();
headImage.src = headImageSource;

const bodyImage = new Image();
bodyImage.src = bodyImageSource;

const resetGame = () => {
//     // const initialSnake = [
//     //   { x: Math.floor(numColumns / 2), y: Math.floor(numRows / 2) },
//     //   { x: Math.floor(numColumns / 2) - 1, y: Math.floor(numRows / 2) },
//     //   { x: Math.floor(numColumns / 2) - 2, y: Math.floor(numRows / 2) },
//     // ];

    setSnake(initialSnake);
    // setDirection('UP');
    setFood(generateFood(numColumns, numRows, initialSnake));
    setScore(0);
  };
// Set the source property to the image file using a relative path
// headImage.src = "~/media/snake_head.png";
// bodyImage.src = "~/media/snake_body.png";
  // const headImage = Image(src='~/media/snake_head.png'); // Use the ~ symbol to reference the app directory
  // const tailImage = new Image();
  
  // Set the source property for each image
  // tailImage.src = "~/media/snake_tail.png";

  const [highScore, setHighScore] = React.useState(0);
  
  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setGameOver(true);
  };

  const handleRestart = () => {
    resetGame();
    setGameOver(false);
  };
  // const tailImage = Image.fromResource('~/media/snake_tail.png');
  
  const initialDirection = 'UP';
  const initialFood = generateFood(numColumns, numRows, initialSnake);
  const initialScore = 0;

  const [snake, setSnake] = React.useState(initialSnake);
  const [direction, setDirection] = React.useState(initialDirection);
  const [food, setFood] = React.useState(initialFood);
  const [score, setScore] = React.useState(initialScore);
  const [gameOver, setGameOver] = React.useState(false);

  const handleSwipe = (args: SwipeGestureEventData) => {
    const swipeDirection = args.direction;
    const currentDirection = direction;
    console.log('args.direction', args.direction, currentDirection);
    // if (
    //   (swipeDirection === 1 && currentDirection === 'LEFT') ||
    //   (swipeDirection === 2 && currentDirection === 'RIGHT') ||
    //   (swipeDirection === 4 && currentDirection === 'DOWN') ||
    //   (swipeDirection === 8 && currentDirection === 'UP')
    // ) {return; }
    // Update snake direction based on swipe direction
    switch (swipeDirection) {
      case 1:
        console.log('Swipe Direction is RIGHT');
        setDirection('RIGHT');
        console.log('Direction after update:', direction);

        break;
      case 2:
        console.log('Swipe Direction is LEFT');
        setDirection('LEFT');
        console.log('Direction after update:', direction);

        break;
      case 4:
        console.log('Swipe Direction is UP');
        setDirection('UP');
        console.log('Direction after update:', direction);

        break;
      case 8:
        console.log('Swipe Direction is DOWN');
        setDirection('DOWN');
        console.log('Direction after update:', direction);

        break;
      }
    // }
  };
  // Attach touch event handlers
  const gridLayout = React.useRef(null);

  React.useEffect(() => {
    if (gridLayout.current) {
      const grid = gridLayout.current.nativeView;
      grid.on('swipe', handleSwipe);
    }
  }, []);

  // Function to move the snake based on the direction
  const moveSnake = () => {
    // Calculate the new position of the snake based on the direction
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
    
    console.log(direction);
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        // Game over
        handleGameOver();
        // setGameOver(true);
        return;
      }
    }
    // Teleport the snake from one edge to the opposite edge
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
    // Check for collisions with food
    if (head.x === food.x && head.y === food.y) {
      // Handle collision with food
      setScore(score + 1);
      console.log(score, 'ssssss');
      setFood(generateFood(numColumns, numRows, newSnake));
      newSnake.push({ ...newSnake[snake.length - 1] });
    } else {
      // Move the snake in the direction
      newSnake.unshift(head);
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Attach an interval to move the snake periodically
  React.useEffect(() => {
    const interval = setInterval(moveSnake, 200);

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction]);

  // Function to generate food at a random position
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

  // Render the game grid
  const renderGameGrid = () => {
    const gridItems = [];

    for (let row = 0; row < numRows; row++) {
      const rowItems = [];
      // Define the head and body emojis

      for (let col = 0; col < numColumns; col++) {
        const isSnakeSegment = snake.some(
          (segment) => segment.x === col && segment.y === row
        );
        const isFood = food.x === col && food.y === row;
        // console.log(`Max Column: ${numColumns}, Max Grid: ${numRows}`);
        const headEmoji = '🐍'; // You can change this to your preferred emoji
        const bodyEmoji = '◆'; // You can change this to your preferred emoji
        let cellContent = null;

        // Determine the cell's background color based on game state
        const foodEmoji = Math.random() < 0.5 ? '🐁' : '🐀';
        let cellBackgroundColor = 'transparent';
        if (isSnakeSegment) {
          const isHead = snake[0].x === col && snake[0].y === row;
          cellContent = (
            <label
              text={isHead ? headEmoji : bodyEmoji}
              style={{ fontSize: 24 }}
            ></label>
            // <image
            //   src={isHead ? headImage : bodyImage}
            //   width={cellSize}
            //   height={cellSize}
            // ></image>
          );
          // cellBackgroundColor = 'green';
        } else if (isFood) {
          cellContent = (
            <label text={foodEmoji} style={{ fontSize: 24 }}></label>
          );
          // cellBackgroundColor = 'red';
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
        // rowItems.push(<label key={cellKey} style={cellStyle} />);
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

  // Render the game screen
  return (
    <stackLayout ref={gridLayout} style={styles.container}>
            {gameOver ? (
        <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} />
      ) : (
        renderGameGrid()
      )}
      <flexboxLayout
        style={styles.bottomBar}
        // row="2"
        flexDirection="row"
        justifyContent="center"
      >
        <label text={`Score: ${score}`} style={styles.currentScore} />
      </flexboxLayout>
    </stackLayout>
  );
}

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: new Color('#3c495e'),
  },
  gameArea: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    backgroundColor: new Color('#65e765'),
    // padding: 10,
    // height: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentScore: {
    color: new Color('white'),
    fontSize: 20,
    flex: 1,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

