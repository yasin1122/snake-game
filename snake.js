document.addEventListener('DOMContentLoaded', () => {
  // Get the game board element
  const gameBoard = document.getElementById('game-board')

  // Get the control buttons
  const upButton = document.getElementById('up-button')
  const leftButton = document.getElementById('left-button')
  const rightButton = document.getElementById('right-button')
  const downButton = document.getElementById('down-button')
  const resetButton = document.getElementById('reset-button')

  // Get the score element
  const scoreElement = document.getElementById('score-value')

  // Define the size of each cell and the board size
  const cellSize = 20
  const boardSize = 20

  // Initialize the snake with a single segment at the center of the board
  let snake = [{ x: 10, y: 10 }]

  // Initialize the food at a random position on the board
  let food = { x: 5, y: 5 }

  // Initialize the movement direction of the snake
  let dx = 0
  let dy = 0

  // Variable to hold the interval ID for the game loop
  let intervalId

  // Variable to keep track of the score
  let score = 0

  // Function to create a cell element at the specified coordinates with a given id
  function createCell(x, y, id) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    cell.id = id
    cell.style.left = `${x * cellSize}px`
    cell.style.top = `${y * cellSize}px`
    return cell
  }

  // Function to draw the snake on the game board
  function drawSnake() {
    snake.forEach((segment, index) => {
      // Set the id of the cell element to 'snake-head' for the first segment
      const cellId = index === 0 ? 'snake-head' : ''
      const cell = createCell(segment.x, segment.y, cellId)
      gameBoard.appendChild(cell)
    })
  }

  // Function to draw the food on the game board
  function drawFood() {
    const cell = createCell(food.x, food.y, 'food')
    gameBoard.appendChild(cell)
  }

  // Function to clear the game board by removing all child elements
  function clearBoard() {
    while (gameBoard.firstChild) {
      gameBoard.firstChild.remove()
    }
  }

  // Function to update the snake's position
  function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(head)
    if (head.x === food.x && head.y === food.y) {
      // If the snake's head reaches the food, generate new food
      generateFood()
      score++
      scoreElement.textContent = score
    } else {
      // If the snake did not eat the food, remove the last segment
      snake.pop()
    }
  }

  // Function to generate random coordinates for the food within the board
  function generateFood() {
    const maxX = boardSize - 1
    const maxY = boardSize - 1
    food.x = Math.floor(Math.random() * maxX)
    food.y = Math.floor(Math.random() * maxY)
  }

  // Function to check for collision with the board boundaries or the snake's body
  function checkCollision() {
    const head = snake[0]
    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize ||
      snake.some(
        (segment, index) =>
          index !== 0 && segment.x === head.x && segment.y === head.y
      )
    ) {
      // If collision occurs, stop the game and show an alert message
      clearInterval(intervalId)
      alert('Game over!')
    }
  }

  // Function to handle the key press event and update the snake's direction
  function handleKeyPress(event) {
    const key = event.key
    if (key === 'ArrowUp' && dy !== 1) {
      dx = 0
      dy = -1
    } else if (key === 'ArrowDown' && dy !== -1) {
      dx = 0
      dy = 1
    } else if (key === 'ArrowLeft' && dx !== 1) {
      dx = -1
      dy = 0
    } else if (key === 'ArrowRight' && dx !== -1) {
      dx = 1
      dy = 0
    }
  }

  // Function to handle button click events and update the snake's direction
  function handleButtonClick(direction) {
    if (direction === 'up' && dy !== 1) {
      dx = 0
      dy = -1
    } else if (direction === 'down' && dy !== -1) {
      dx = 0
      dy = 1
    } else if (direction === 'left' && dx !== 1) {
      dx = -1
      dy = 0
    } else if (direction === 'right' && dx !== -1) {
      dx = 1
      dy = 0
    }
  }

  // Function to reset the game
  function resetGame() {
    clearInterval(intervalId)
    snake = [{ x: 10, y: 10 }]
    dx = 0
    dy = 0
    score = 0
    scoreElement.textContent = score
    clearBoard()
    drawSnake()
    drawFood()
    startGame()
  }

  // Function to start the game
  function startGame() {
    // Add event listeners for keydown and button clicks
    document.addEventListener('keydown', handleKeyPress)
    upButton.addEventListener('click', () => handleButtonClick('up'))
    leftButton.addEventListener('click', () => handleButtonClick('left'))
    rightButton.addEventListener('click', () => handleButtonClick('right'))
    downButton.addEventListener('click', () => handleButtonClick('down'))
    resetButton.addEventListener('click', resetGame)

    // Start the game loop with a specified interval
    intervalId = setInterval(() => {
      clearBoard()
      updateSnake()
      checkCollision()
      drawSnake()
      drawFood()
    }, 200) // Update the game every 200 milliseconds
  }

  // Call the startGame function to begin the game
  startGame()
})
