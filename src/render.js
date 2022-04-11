
import { attach, createFlashcardView, homeView, listFlashcardView } from "./view"

function render(root, store, uiStore) {
    // Clear state
    root.innerHTML = ""

    // Render screen
    const uiState = uiStore.getState()
    const home = homeView(store, uiStore)
    if (uiState.screen === 'home') {
        attach(root, home)
    } else if (uiState.screen === 'flashcard/list') {
        attach(root, listFlashcardView(store, uiStore))
    } else if (uiState.screen === 'flashcard/create') {
        attach(root, createFlashcardView(store, uiStore))
    } else {
        console.error("Oh no, page not found")
    }
}

export { render }