const printBoardWithShip = (gameBoard) => {
    const board = document.createElement('div');
    const gridArray = gameBoard.grid;
    gridArray.forEach( (element,y) => {
        element.forEach( (block,x) => {
            const boardElement = document.createElement('div');
            if (block.isOccupiedByAShip) {
                boardElement.classList.add('ship-here');
            }
            boardElement.dataset.y = y;
            boardElement.dataset.x = x;
            board.appendChild(boardElement);
        });
    });
    return board;
}

const printBoard = (gameBoard) => {
    const board = document.createElement('div');
    const gridArray = gameBoard.grid;
    gridArray.forEach( (element,y) => {
        element.forEach( (block,x) => {
            const boardElement = document.createElement('div');
            boardElement.dataset.y = y;
            boardElement.dataset.x = x;
            board.appendChild(boardElement);
        });
    });
    return board;
}

export {
    printBoardWithShip,
    printBoard
}