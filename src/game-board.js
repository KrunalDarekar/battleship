import ship from "./ship"

const gameBoard = () => {
    const grid = []
    for (let i = 0; i <= 10; i++) {
        grid.push([])
    }
    grid.forEach(element => {
        for (let i = 0; i <= 10; i++) {
            element.push({
                isOccupiedByAShip: false,
                isAttacked: false,
                ship: null
            })
        }
    })

    const ships = [];

    const placeShip = (ship, coordinates, axis) => {
        if (axis === 'x') {
            if (coordinates[1] + ship.length <= 10) {
                for (let i = coordinates[1]; i < coordinates[1] + ship.length; i++) {
                    if(grid[coordinates[0]][i].isOccupiedByAShip) {
                        return 'ship already placed here'
                    }
                }    
                for (let i = coordinates[1]; i < coordinates[1] + ship.length; i++) {
                    grid[coordinates[0]][i].isOccupiedByAShip = true;
                    grid[coordinates[0]][i].ship = ship;
                }
                ships.push(ship);
            } else {
                return 'ship does not fit here'
            }
        } else {
            if (coordinates[0] + ship.length <= 10) {
                for (let i = coordinates[0]; i < coordinates[0] + ship.length; i++) {
                    if(grid[i][coordinates[1]].isOccupiedByAShip) {
                        return 'ship already placed here'
                    }
                }
                for (let i = coordinates[0]; i < coordinates[0] + ship.length; i++) {
                    grid[i][coordinates[1]].isOccupiedByAShip = true;
                    grid[i][coordinates[1]].ship = ship;
                }
                ships.push(ship);
            } else {
                return 'ship does not fit here'
            }
        }
    }

    const receiveAttack = (coordinates) => {
        if (grid[coordinates[0]][coordinates[1]].isAttacked) {
            return 'coordinates already attacked';
        }
        grid[coordinates[0]][coordinates[1]].isAttacked = true;
        if (grid[coordinates[0]][coordinates[1]].isOccupiedByAShip) {
            grid[coordinates[0]][coordinates[1]].ship.hit()
        }
    }

    const haveAllShipsSunk = () => {
        if(ships.length > 0) {
            for(let i = 0; i < ships.length; i++) {
                if(!(ships[i].isSunk())) {
                    return false;
                }
            }
            return true;
        } else return 'no ships on the board';
    }

    return {
        grid,
        placeShip,
        receiveAttack,
        haveAllShipsSunk,
    }
}

export default gameBoard;