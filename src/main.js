import { store } from "./store"
import { div, attach } from "./view"

const ROOT_ID = "SUPER_ROOT"

function init() {
    store.dispatch({ type: 'counter/incremented' })
    // {value: 1}
    store.dispatch({ type: 'counter/incremented' })
    // {value: 2}
    store.dispatch({ type: 'counter/decremented' })
    // {value: 1}

    let myDiv = div()
    myDiv.classList.add(".test-class")
    attach(ROOT_ID, myDiv)
}

init()