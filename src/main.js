import { store, uiStore } from "./stores/store"
import { render } from "./render"

const ROOT_ID = "SUPER_ROOT"
const ROOT = document.getElementById(ROOT_ID)

function init() {
    store.subscribe(() => render(ROOT, store, uiStore))
    uiStore.subscribe(() => render(ROOT, store, uiStore))

    uiStore.dispatch({type: "reset"})
}

init()

export { store, uiStore }