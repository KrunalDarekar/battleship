import player from "./player";
import gameBoard from "./game-board";

test('randomAttack() coordinates are between 0 to 9', () => {
    const enemyBoard = gameBoard();
    const player1 = player('player1');
    const coo1 = player1.randomAttack(enemyBoard);
    expect(coo1[0]).toBeLessThanOrEqual(9);
    expect(coo1[0]).toBeGreaterThanOrEqual(0);
    expect(coo1[1]).toBeLessThanOrEqual(9);
    expect(coo1[1]).toBeGreaterThanOrEqual(0);
})

test('randomAttack() coordinates are different every time', () => {
    const enemyBoard = gameBoard();
    const player1 = player('player1');
    const coo1 = player1.randomAttack(enemyBoard);
    const coo2 = player1.randomAttack(enemyBoard);
    const coo3 = player1.randomAttack(enemyBoard);

    if(coo1[0] === coo2[0]) {
        expect(coo1[1]).not.toBe(coo2[1])
    } else if (coo1[1] === coo2[1]) {
        expect(coo1[0]).not.toBe(coo2[0])
    } else {
        expect(coo1[0]).not.toBe(coo2[0])
        expect(coo1[1]).not.toBe(coo2[1])
    }

    if(coo1[0] === coo3[0]) {
        expect(coo1[1]).not.toBe(coo3[1])
    } else if (coo1[1] === coo3[1]) {
        expect(coo1[0]).not.toBe(coo3[0])
    } else {
        expect(coo1[0]).not.toBe(coo3[0])
        expect(coo1[1]).not.toBe(coo3[1])
    }

    if(coo2[0] === coo3[0]) {
        expect(coo2[1]).not.toBe(coo3[1])
    } else if (coo2[1] === coo3[1]) {
        expect(coo2[0]).not.toBe(coo3[0])
    } else {
        expect(coo2[0]).not.toBe(coo3[0])
        expect(coo2[1]).not.toBe(coo3[1])
    }
})
