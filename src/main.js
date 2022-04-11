import { store, uiStore } from "./store"
import { attach, createFlashcardView, homeView, listFlashcardView } from "./view"

const ROOT_ID = "SUPER_ROOT"
const ROOT = document.getElementById(ROOT_ID)

function render(store, uiStore) {
    console.log("Rendering...")
    // Clear state
    ROOT.innerHTML = ""

    // Render screen
    const uiState = uiStore.getState()
    const home = homeView(store, uiStore)
    console.log("Home", home)

    console.log("Routing...", uiState.screen)
    if (uiState.screen === 'home') {
        console.log("Got home")
        attach(ROOT, home)
    } else if (uiState.screen === 'flashcard/list') {
        console.log("Got list")
        attach(ROOT, listFlashcardView(store, uiStore))
    } else if (uiState.screen === 'flashcard/create') {
        console.log("Got create")
        attach(ROOT, createFlashcardView(store, uiStore))
    } else {
        console.error("Oh no, page not found")
    }
}


function init() {
    store.subscribe(() => render(store, store))
    uiStore.subscribe(() => render(store, uiStore))

    uiStore.dispatch({type: "reset"})
    // store.dispatch({type: "flashcard/add", card: {id: 1, name: "test", category: "dunno"}})
}

init()

export { store, uiStore }