import { createStore } from 'redux'

function flashcardReducer(state = { flashcards: [] }, action) {
  switch (action.type) {
    case 'flashcard/create':
      return { flashcards: [...state.flashcards, action.card] }
    case 'flashcard/remove':
      return { flashcards: state.flashcards.filter(card => card.id !== action.card.id) }
    case 'flashcard/update':
      let flashcards = state.flashcards.map(card => {
        if (card.id === action.card.id) {
          return {
            ...card,
            ...action.card
          }
        }
        return card
      })
      return { flashcards: flashcards }
    case 'flashcard/clear':
      return { flashcards: []}
    default:
      return state
  }
}

function uiEventsReducer(state = { screen: "home" }, action) {
  console.log("UI Event Action:", action)
  switch(action.type) {
    case 'flashcard/create': {
      return { screen: "flashcard/create"}
    }
    case 'flashcard/list': {
      return { screen: "flashcard/list"}
    }
    case 'reset': {
      return { screen: "home"}
    }
    default:
      return state
  }
}

let store = createStore(flashcardReducer)

let uiStore = createStore(uiEventsReducer)

export { store, uiStore };