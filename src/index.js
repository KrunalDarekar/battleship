import player from './player';
import gameBoard from './game-board';
import ship from './ship';
import { printBoardWithShip,printBoard } from './print-board';
import './index.css';

const boardDisplay = document.querySelector('.board-display')
const playerOneNameDisplay = document.querySelector('.player-one-name')
const playerTwoNameDisplay = document.querySelector('.player-two-name')
const gameMessage = document.querySelector('.game-msg')
const newGameBtn = document.querySelector('button')
const humanPlayer = player('human')
const computerPlayer = player('computer')

const humanGameBoard = gameBoard()
const computerGameBoard = gameBoard()

const carrier1 = ship(5)
const battleship1 = ship(4)
const destroyer1 = ship(3)
const submarine1 = ship(3)
const patrolBoat1 = ship(2)

const carrier2 = ship(5)
const battleship2 = ship(4)
const destroyer2 = ship(3)
const submarine2 = ship(3)
const patrolBoat2 = ship(2)

humanGameBoard.placeShip(carrier1, [0,0], 'x')
humanGameBoard.placeShip(battleship1, [2,0], 'x')
humanGameBoard.placeShip(destroyer1, [0,9], 'y')
humanGameBoard.placeShip(submarine1, [3,7], 'y')
humanGameBoard.placeShip(patrolBoat1, [9,2], 'x')

computerGameBoard.placeShip(carrier2, [0,0], 'x')
computerGameBoard.placeShip(battleship2, [2,0], 'x')
computerGameBoard.placeShip(destroyer2, [0,9], 'y')
computerGameBoard.placeShip(submarine2, [3,7], 'y')
computerGameBoard.placeShip(patrolBoat2, [9,2], 'x')

// const check = computerGameBoard.haveAllShipsSunk;
// alert(check);

// const humanGrid = printBoardWithShip(humanGameBoard)
// humanGrid.classList.add('human-player-board')
// boardDisplay.appendChild(humanGrid)

// const computerGrid = printBoard(computerGameBoard)
// computerGrid.classList.add('computer-player-board')
// boardDisplay.appendChild(computerGrid)

// document.addEventListener('DOMContentLoaded', () => {
//     const randomElement = document.querySelector('.computer-player-board > [data-y="3"][data-x="3"');
//     alert(randomElement);
//     randomElement.classList.add("ship-here")
// })

// computerGrid.addEventListener('click', (e) => {
//     const clickedItem = e.target
//     clickedItem.classList.add('ship-here')
//     alert(`${clickedItem.dataset.y},${clickedItem.dataset.x}`)

//     const randomElement = document.querySelector('[data-y="3"][data-x="3"');
//     randomElement.classList.add("ship-here")
// })

const newGame = (player1, gameBoard1, player2, gameBoard2) => {
    playerOneNameDisplay.textContent = player1.name
    playerTwoNameDisplay.textContent = player2.name
    
    const player1Grid = printBoardWithShip(gameBoard1)
    player1Grid.classList.add(`player1-board`)
    boardDisplay.appendChild(player1Grid)

    const player2Grid = printBoard(gameBoard2)
    player2Grid.classList.add('player2-board')
    boardDisplay.appendChild(player2Grid)

    let winner;
    let currPlayer = player1;
    const changePlayerTurn = () => {
        currPlayer == player1 ? currPlayer = player2 : currPlayer = player1
    }

    while(true){
        if (gameBoard1.haveAllShipsSunk()) {
            alert('player 2 won')
            winner = player2
            break
        } else if (gameBoard2.haveAllShipsSunk()) {
            alert('player 1 won')
            winner = player1
            break
        } else {
            if (currPlayer == player1) {
                gameMessage.textContent = `${player1.name}'s turn`
                player2Grid.addEventListener('click', (e) => {
                    const attackedBlock = e.target
                    const y = parseInt(attackedBlock.dataset.y, 10)
                    const x = parseInt(attackedBlock.dataset.x, 10)
                    if (!player2Grid[y][x].isAttacked){
                        attackedBlock.textContent = "•"
                        player1.attack([y,x], gameBoard2)
                        player2Grid[y][x].isAttacked = true
                        attackedBlock.classList.add('hit')
                        if(player2Grid[y][x].isOccupiedByAShip){
                            attackedBlock.classList.add('ship-here')
                        } else {
                            changePlayerTurn()
                        }
                    }
                })
            } else {
                gameMessage.textContent = `${player2.name}'s turn`
                const attackedCoordinates = player2.randomAttack(gameBoard1);
                const y = attackedCoordinates[0]
                const x = attackedCoordinates[1]
                const attackedElement = document.querySelector(`player1-board > [data-y="${y}"][data-x="${x}"]`)
                player1Grid[y][x].isAttacked = true
                attackedElement.classList.add('hit')
                attackedElement.textContent = "•"
                if(!player1Grid[y][x].isOccupiedByAShip){
                    changePlayerTurn()
                }
            }
        }
    }

    gameMessage.textContent = `${winner} is the winner`

}

newGameBtn.addEventListener('click', () => {
    newGame(humanPlayer, humanGameBoard, computerPlayer, computerGameBoard)
})

// newGame(humanPlayer, humanGameBoard, computerPlayer, computerGameBoard)