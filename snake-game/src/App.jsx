import { useState, useEffect, useCallback } from 'react'

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 0, y: 0 }
const GAME_SPEED = 150

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    }
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setIsPlaying(false)
    setFood(generateFood())
  }

  const startGame = () => {
    resetGame()
    setIsPlaying(true)
    setDirection({ x: 0, y: -1 })
  }

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying) return
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 })
        break
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 })
        break
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 })
        break
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 })
        break
      default:
        break
    }
  }, [direction, isPlaying])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const moveSnake = () => {
      const newSnake = [...snake]
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        return
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [snake, direction, food, gameOver, isPlaying, generateFood])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Snake Game</h1>
      <div style={styles.score}>Score: {score}</div>
      
      <div style={styles.board}>
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE
          const y = Math.floor(index / BOARD_SIZE)
          const isSnake = snake.some(segment => segment.x === x && segment.y === y)
          const isHead = snake[0]?.x === x && snake[0]?.y === y
          const isFood = food.x === x && food.y === y

          return (
            <div
              key={index}
              style={{
                ...styles.cell,
                backgroundColor: isHead ? '#22c55e' : isSnake ? '#4ade80' : isFood ? '#ef4444' : '#1f2937'
              }}
            />
          )
        })}
      </div>

      {!isPlaying && !gameOver && (
        <button style={styles.button} onClick={startGame}>
          Start Game
        </button>
      )}

      {gameOver && (
        <div style={styles.gameOver}>
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button style={styles.button} onClick={startGame}>
            Play Again
          </button>
        </div>
      )}

      <div style={styles.controls}>
        <p>Use Arrow Keys to control the snake</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  title: {
    fontSize: '48px',
    marginBottom: '10px',
    color: '#22c55e'
  },
  score: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
    gap: '1px',
    backgroundColor: '#374151',
    border: '4px solid #22c55e',
    borderRadius: '8px',
    padding: '4px'
  },
  cell: {
    width: '20px',
    height: '20px',
    borderRadius: '4px'
  },
  button: {
    marginTop: '20px',
    padding: '12px 32px',
    fontSize: '18px',
    backgroundColor: '#22c55e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  gameOver: {
    textAlign: 'center',
    marginTop: '20px'
  },
  controls: {
    marginTop: '20px',
    color: '#9ca3af'
  }
}

export default App