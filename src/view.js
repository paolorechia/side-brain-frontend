
function div() {
    return document.createElement("div")
}
function button() {
    return document.createElement("button")
}

function flashcardView(root_id, flashcard) {
    const rootElement = document.getElementById(root_id)

    const div = document.createElement("div")
    div.classList.add("flash-card-div")

    const id = document.createElement("span")
    const name = document.createElement("span")
    const category = document.createElement("category")

    id.innerText = flashcard.id
    name.innerText = flashcard.name
    category.innerText = flashcard.category

    div.appendChild(id)
    div.appendChild(name)
    div.appendChild(category)

    rootElement.appendChild(div)
}


function attach(rootId, element) {
    let root = document.getElementById(rootId)
    root.appendChild(element)
}

export { div, attach, flashcardView }