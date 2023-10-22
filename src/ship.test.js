import ship from "./ship";

test('hit() happy path one', () => {
    const newShip = ship(3);
    expect(newShip.hit()).toBe(1);
    expect(newShip.hit()).toBe(2);
    expect(newShip.hit()).toBe(3);
    expect(newShip.hit()).toBe('ship already sunk');
})

test('isSunk() happy path one', () => {
    const newShip = ship(2);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit()
    expect(newShip.isSunk()).toBe(false);
    newShip.hit()
    expect(newShip.isSunk()).toBe(true);
})

test('isSunk() happy path two', () => {
    const newShip = ship(5);
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.isSunk()).toBe(false);
    newShip.hit()
    newShip.hit()
    expect(newShip.isSunk()).toBe(true);
    newShip.hit()
    expect(newShip.isSunk()).toBe(true);
})