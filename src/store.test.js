import { store } from "./store"

test('Test store exists and starts empty', () => {
    expect(store).toBeTruthy()
    expect(store.getState().flashcards.length).toBe(0)
});

test('Add flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/add", card: {id: 1, name: "test"}})
    expect(store.getState().flashcards.length).toBe(1)
});

test('Remove flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/add", card: {id: 1, name: "test"}})
    store.dispatch({type: "flashcard/remove", card: {id: 1}})
    expect(store.getState().flashcards.length).toBe(0)
});

test('Update flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/add", card: {id: 1, name: "test", category: "dunno"}})
    store.dispatch({type: "flashcard/update", card: {id: 1, name: "Wow"}})
    const state = store.getState()
    expect(state.flashcards.length).toBe(1)
    expect(state.flashcards[0].name).toBe("Wow")
    expect(state.flashcards[0].category).toBe("dunno")
});