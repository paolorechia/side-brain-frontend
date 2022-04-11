import { createStore } from 'redux'

function counterReducer(state = { flashcards: [] }, action) {
  switch (action.type) {
    case 'flashcard/add':
      const flashcards = [...state.flashcards, action.card];
      return { flashcards: flashcards }
    default:
      return state
  }
}

let store = createStore(counterReducer)

export { store };