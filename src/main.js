import { store } from "./store"
import { div, attach } from "./view"

const ROOT_ID = "SUPER_ROOT"

function render(store) {
    console.log(store.getState())
}

function init() {
    let myDiv = div()
    myDiv.classList.add(".test-class")
    attach(ROOT_ID, myDiv)
    store.subscribe(() => render)
}

init()