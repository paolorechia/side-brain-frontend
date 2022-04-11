
/**
 * @jest-environment jsdom
 */

const { render } = require("./render")
const { store, uiStore } = require('./store');
const { flashcardView, route, createFlashcardView, homeView, listFlashcardView } = require('./view');

const root = "SUPER_ROOT";

beforeEach(() => {
    document.body.innerHTML = 
    '<div id="SUPER_ROOT"></div>'

    uiStore.dispatch({type: "reset"})
    store.dispatch({type: "clear"})

    const rootEl = document.getElementById("SUPER_ROOT")
    render(rootEl, store, uiStore)
})

test('test home view', () => {
    const view = homeView()
    route(root, view)

    expect(document.querySelector(".home-div")).toBeTruthy()
    expect(document.querySelector(".home-message")).toBeTruthy()

    const nextButton = document.querySelector(".home-next-button")
    expect(nextButton).toBeTruthy()
    nextButton.click()

    const rootEl = document.getElementById("SUPER_ROOT")

    render(rootEl, store, uiStore)
    expect(uiStore.getState().screen).toBe("flashcard/list")
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

test('test flashcard list view', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    store.dispatch({type: "clear"})
    store.dispatch({type: "flashcard/create", 
        card: {
            id: 2,
            name: "test name",
            category: "Is this real?"
        }
    })
    expect(store.getState().flashcards.length).toBe(1)
    const listView = listFlashcardView(store, uiStore)
    route(root, listView)

    const list = document.querySelector(".flash-card-list-div")
    expect(list).toBeTruthy()

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
