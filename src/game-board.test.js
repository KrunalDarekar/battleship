import { experiments } from "webpack";
import gameBoard from "./game-board";
import ship from "./ship";

// tests for placeShip()

test('placeShip() happy path x', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[1,5],'x');
    expect(board.grid[1][5].isOccupiedByAShip).toBe(true);
    expect(board.grid[1][6].isOccupiedByAShip).toBe(true);
    expect(board.grid[1][7].isOccupiedByAShip).toBe(true);
    expect(board.grid[1][5].ship).toBe(carrier);
    expect(board.grid[1][6].ship).toBe(carrier);
    expect(board.grid[1][7].ship).toBe(carrier);
    expect(board.grid[1][8].isOccupiedByAShip).toBe(false);
    expect(board.grid[0][0].isOccupiedByAShip).toBe(false);
})

test('placeShip() happy path y', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[1,5],'y');
    expect(board.grid[1][5].isOccupiedByAShip).toBe(true);
    expect(board.grid[2][5].isOccupiedByAShip).toBe(true);
    expect(board.grid[3][5].isOccupiedByAShip).toBe(true);
    expect(board.grid[1][5].ship).toBe(carrier);
    expect(board.grid[2][5].ship).toBe(carrier);
    expect(board.grid[3][5].ship).toBe(carrier);
    expect(board.grid[1][8].isOccupiedByAShip).toBe(false);
    expect(board.grid[0][0].isOccupiedByAShip).toBe(false);
})

test('placeShip() edge x', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[9,7],'x');
    expect(board.grid[9][7].isOccupiedByAShip).toBe(true);
    expect(board.grid[9][8].isOccupiedByAShip).toBe(true);
    expect(board.grid[9][9].isOccupiedByAShip).toBe(true);
    expect(board.grid[9][7].ship).toBe(carrier);
    expect(board.grid[9][8].ship).toBe(carrier);
    expect(board.grid[9][9].ship).toBe(carrier);
})

test('placeShip() edge y', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[7,9],'y');
    expect(board.grid[7][9].isOccupiedByAShip).toBe(true);
    expect(board.grid[8][9].isOccupiedByAShip).toBe(true);
    expect(board.grid[9][9].isOccupiedByAShip).toBe(true);
    expect(board.grid[7][9].ship).toBe(carrier);
    expect(board.grid[8][9].ship).toBe(carrier);
    expect(board.grid[9][9].ship).toBe(carrier);
})

test('placeShip() ship already placed here 1', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[1,5],'y');
    expect(board.placeShip(carrier,[1,5],'x')).toBe('ship already placed here')
    expect(board.grid[1][6].isOccupiedByAShip).toBe(false);
    expect(board.grid[1][7].isOccupiedByAShip).toBe(false);
})

test('placeShip() ship already placed here 2', () => {
    const carrier = ship(3);
    const board = gameBoard();
    board.placeShip(carrier,[1,5],'y');
    expect(board.placeShip(carrier,[2,5],'x')).toBe('ship already placed here')
    expect(board.grid[2][6].isOccupiedByAShip).toBe(false);
    expect(board.grid[2][7].isOccupiedByAShip).toBe(false);
})

test('placeShip() ship des not fit here x', () => {
    const carrier = ship(3);
    const board = gameBoard();
    expect(board.placeShip(carrier,[1,8],'x')).toBe('ship does not fit here')
    expect(board.grid[1][8].isOccupiedByAShip).toBe(false);
    expect(board.grid[1][9].isOccupiedByAShip).toBe(false);
})

test('placeShip() ship des not fit here y', () => {
    const carrier = ship(3);
    const board = gameBoard();
    expect(board.placeShip(carrier,[8,8],'y')).toBe('ship does not fit here')
    expect(board.grid[8][8].isOccupiedByAShip).toBe(false);
    expect(board.grid[8][8].isOccupiedByAShip).toBe(false);
})

// tests for receiveAttack() function

test('receiveAttack() happy path', () => {
    const board = gameBoard();
    board.receiveAttack([0,0]);
    expect(board.grid[0][0].isAttacked).toBe(true);
    expect(board.grid[1][1].isAttacked).toBe(false);
})

test('receiveAttack() already attacked', () => {
    const board = gameBoard();
    board.receiveAttack([1,1]);
    expect(board.receiveAttack([1,1])).toBe('coordinates already attacked')
})

// tests for haveAllShipsSunk() function

test('haveAllShipsSunk() happy path one', () => {
    const board = gameBoard();
    const submarine = ship(3);
    const carrier = ship(5);
    board.placeShip(carrier, [0,0], 'x');
    board.placeShip(submarine, [1,0], 'x');
    expect(board.haveAllShipsSunk()).toBe(false);
    board.receiveAttack([0,0]);
    board.receiveAttack([0,1]);
    board.receiveAttack([0,2]);
    board.receiveAttack([0,3]);
    board.receiveAttack([0,4]);
    expect(board.haveAllShipsSunk()).toBe(false);
    board.receiveAttack([1,0]);
    board.receiveAttack([1,1]);
    board.receiveAttack([1,2]);
    expect(board.haveAllShipsSunk()).toBe(true);
})
