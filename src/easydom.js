export function paragraph(text, cssClasses) {
    const p = document.createElement("p")
    p.innerText = text
    cssClasses.map(cls => {
        p.classList.add(cls)
    })
    return p
}

export function div(cssClasses) {
    const d = document.createElement("div")
    cssClasses.map(cls => {
        d.classList.add(cls)
    })
    return d
}

export function button(text, cssClasses) {
    const button = document.createElement("button")
    button.innerText = text
    cssClasses.map(cls => {
        button.classList.add(cls)
    })
    return button
}

export function input(placeholder, cssClasses) {
    const input = document.createElement("input")
    input.placeholder = placeholder
    cssClasses.map(cls => {
        input.classList.add(cls)
    })
    return input
}

export function route(rootId, element) {
    let root = document.getElementById(rootId)
    root.appendChild(element)
}

export function attach(parent, child) {
    parent.appendChild(child)
}
