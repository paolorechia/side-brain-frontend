
/**
 * @jest-environment jsdom
 */

const { flashcardView, route, createFlashcardView, homeView } = require('./view');

const root = "SUPER_ROOT";

test('test home view', () => {
    document.body.innerHTML = 
    '<div id="SUPER_ROOT"></div>'

    const view = homeView()
    route(root, view)

    expect(document.querySelector(".home-div")).toBeTruthy()
    expect(document.querySelector(".home-message")).toBeTruthy()
})

test('test flashcard view', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    const flash = flashcardView({
        id: 2,
        name: "test name",
        category: "Is this real?"
    })
    route(root, flash)

    const div = document.querySelector(".flash-card-div")
    expect(div).toBeTruthy()

    expect(div.children[0].innerText).toBe(2)
    expect(div.children[1].innerText).toBe("test name")
    expect(div.children[2].innerText).toBe("Is this real?")
});


test('test flashcard create view', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    const view = createFlashcardView()
    route(root, view)

    const div = document.querySelector(".create-flash-card-div")
    expect(div).toBeTruthy()

    const cancel = document.querySelector(".create-flash-card-button-cancel")
    const confirm = document.querySelector(".create-flash-card-button-confirm")

    expect(cancel).toBeTruthy()
    expect(confirm).toBeTruthy()
})
