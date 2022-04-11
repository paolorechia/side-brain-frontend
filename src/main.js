import { store } from "./store"
import { div, attach, flashcardView } from "./view"

const ROOT_ID = "SUPER_ROOT"

function render(element, store) {
    console.log("Rendering...", element)
    const state = store.getState()

    // Clear state
    document.getElementById(ROOT_ID).innerHTML = ""

    // Render flashcards
    state.flashcards.map(flashcard => {
        flashcardView(ROOT_ID, flashcard)
    })
}

function init() {
    let myDiv = div()
    myDiv.classList.add(".test-class")
    attach(ROOT_ID, myDiv)
    store.subscribe((el) => render(el, store))
    store.dispatch({type: "flashcard/add", card: {id: 1, name: "test", category: "dunno"}})
}

init()