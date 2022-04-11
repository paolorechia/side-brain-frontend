import { div, button, paragraph, input, attach } from "./easydom"

function homeView(store, uiStore) {
    const d = div(["home-div"])
    const p = paragraph("Welcome!", ["home-message"])

    const next = button("Next", ["home-next-button"])
    attach(d, p)
    attach(d, next)

    next.addEventListener("click", function() {
        uiStore.dispatch({type: "flashcard/list"})
    })

    return d
}


function listFlashcardView(store, uiStore) {
    console.log("Rendering list")
    // Render flashcards
    const state = store.getState()
    const d = div(["flash-card-list-div"])

    state.flashcards.map(flashcard => {
        attach(d, flashcardView(flashcard))
    })

    // Render static part
    const bottom = div(["bottom-wrapper"])
    const create = button("Create flashcard", ["create-button"])

    attach(d, bottom)
    attach(bottom, create)

    create.addEventListener("click", function() {
        uiStore.dispatch({type: "flashcard/create"})
    })

    return d
}

function flashcardView(flashcard) {        
    const d = div(["flash-card-div"])

    const id = document.createElement("span")
    const name = document.createElement("span")
    const category = document.createElement("span")

    id.innerText = flashcard.id
    name.innerText = flashcard.name
    category.innerText = flashcard.category

    attach(d, id)
    attach(d, name)
    attach(d, category)

    return d
}

function createFlashcardView(store, uiStore) {
    const div = document.createElement("div")

    div.classList.add("create-flash-card-div")

    const id = input("ID", ["create-id-input"])
    const name = input("Name", ["create-name-input"])
    const category = input("Category", ["create-category-input"])

    const cancel = button("Cancel", ["create-flash-card-button-cancel"])

    cancel.addEventListener("click", function() {
        uiStore.undo()
    })

    const confirm = button("Confirm", ["create-flash-card-button-confirm"])
    confirm.addEventListener("click", function() {
        console.log("Confirm!")
        store.dispatch({type: "flashcard/create", card: {
            id: id.value,
            name: name.value,
            category: category.value
        }})
        uiStore.dispatch({type: "flashcard/list"})
    })

    attach(div, id)
    attach(div, name)
    attach(div, category)
    attach(div, cancel)
    attach(div, confirm)

    return div
}


export { flashcardView, createFlashcardView, homeView, listFlashcardView }