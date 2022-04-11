import { store, uiStore } from "./store"

test('Test store exists and starts empty', () => {
    expect(store).toBeTruthy()
    expect(store.getState().flashcards.length).toBe(0)
});

test('Add flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/create", card: {id: 1, name: "test"}})
    expect(store.getState().flashcards.length).toBe(1)
});

test('Remove flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/create", card: {id: 1, name: "test"}})
    store.dispatch({type: "flashcard/remove", card: {id: 1}})
    expect(store.getState().flashcards.length).toBe(0)
});

test('Update flashcard', () => {
    store.dispatch({type: "flashcard/clear"})
    store.dispatch({type: "flashcard/create", card: {id: 1, name: "test", category: "dunno"}})
    store.dispatch({type: "flashcard/update", card: {id: 1, name: "Wow"}})
    const state = store.getState()
    expect(state.flashcards.length).toBe(1)
    expect(state.flashcards[0].name).toBe("Wow")
    expect(state.flashcards[0].category).toBe("dunno")
});

test("UI Store reducer", () => {
    uiStore.dispatch({type: "reset"})
    expect(uiStore.getState().screen).toBe("home")

    uiStore.dispatch({type: "flashcard/create"})
    expect(uiStore.getState().screen).toBe("flashcard/create")

    uiStore.dispatch({type: "flashcard/list"})
    expect(uiStore.getState().screen).toBe("flashcard/list")

    uiStore.dispatch({type: "reset"})
    expect(uiStore.getState().screen).toBe("home")

})