
function div() {
    return document.createElement("div")
}

function attach(rootId, element) {
    let root = document.getElementById(rootId)
    root.appendChild(element)
}

export { div, attach }