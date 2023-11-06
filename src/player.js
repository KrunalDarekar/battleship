function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const player = (name) => {
    const attack = (coordinates, enemyGameBoard) => {
        enemyGameBoard.receiveAttack(coordinates);
    }

    const randomAttack = (enemyGameBoard) => {
        while(true) {
            const y = getRandomInt(9)
            const x = getRandomInt(9)
            if(!(enemyGameBoard.grid[y][x].isAttacked)) {
                enemyGameBoard.receiveAttack([y,x])
                return [y,x];
            }
        }
    }

    return {
        name,
        attack,
        randomAttack
    }
}

export default player;