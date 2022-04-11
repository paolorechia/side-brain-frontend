import { store } from "./store"

test('test store exists', () => {
    console.log(store)
    expect(store).toBeTruthy()
});