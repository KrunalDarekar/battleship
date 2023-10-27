const ship = (length) => {
    let hits = 0;
    const hit = () => {
        if (hits < length) {
            hits++;
        return hits;
        } else {
            return 'ship already sunk'
        }
    }
    const isSunk = () => {
        if (hits < length) {
            return false;
        } else {
            return true;
        }
    }

    return {
        hit,
        isSunk,
        length
    }
}

export default ship;