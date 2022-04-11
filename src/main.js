import { store, uiStore } from "./store"
import { render } from "./render"

const ROOT_ID = "SUPER_ROOT"
const ROOT = document.getElementById(ROOT_ID)

function init() {
    store.subscribe(() => render(ROOT, store, uiStore))
    uiStore.subscribe(() => render(ROOT, store, uiStore))

    uiStore.dispatch({type: "reset"})
    // store.dispatch({type: "flashcard/add", card: {id: 1, name: "test", category: "dunno"}})
}

init()

export { store, uiStore }