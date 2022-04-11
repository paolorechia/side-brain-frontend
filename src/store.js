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

let uiHistory = []

function dispatchUIUndo() {
  console.log("Undoing...")
  const last = uiHistory.pop()
  console.log(last)
  if (last) {
    uiStore.dispatch({type: last, isUndo: true})
  }
}

function uiEventsReducer(state = { screen: "home" }, action) {
  switch(action.type) {
    case 'flashcard/create': {
      if (!action.isUndo) {
        uiHistory.push(state.screen)
      }
      return { screen: "flashcard/create" }
    }
    case 'flashcard/list': {
      if (!action.isUndo) {
        uiHistory.push(state.screen)
      }
      return { screen: "flashcard/list" }
    }
    case 'home': {
      if (!action.isUndo) {
        uiHistory.push(state.screen)
      }
      return { screen: "home" }
    }
    default:
      return state
  }
}

let store = createStore(flashcardReducer)

let uiStore = createStore(uiEventsReducer)

uiStore.undo = dispatchUIUndo

export { store, uiStore, dispatchUIUndo };