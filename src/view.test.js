
/**
 * @jest-environment jsdom
 */

const { render } = require("./render")
const { store, uiStore } = require('./store');
const { flashcardView, createFlashcardView, homeView, listFlashcardView } = require('./view');
const { route } = require("./easydom")

const root = "SUPER_ROOT";

beforeEach(() => {
    document.body.innerHTML = 
    '<div id="SUPER_ROOT"></div>'

    uiStore.dispatch({type: "home"})
    store.dispatch({type: "flashcard/clear"})

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
    const flash = flashcardView(store, uiStore, {
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

test('test flashcard view delete', () => {
    const card = {
        id: 2,
        name: "test name",
        category: "Is this real?"
    }
    const flash = flashcardView(store, uiStore, card)
    route(root, flash)
    store.dispatch({type: "flashcard/create", card: card})

    expect(store.getState().flashcards.length).toBe(1)
    const del = document.querySelector(".flash-card-button-delete")
    del.click()

    const cards = store.getState().flashcards
    expect(cards.length).toBe(0)
});

test('test flashcard list view', () => {
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
    const view = createFlashcardView()

    uiStore.dispatch({type: "flashcard/list"})
    const rootEl = document.getElementById("SUPER_ROOT")
    uiStore.dispatch({type: "flashcard/create"})
    render(rootEl, store, uiStore)

    expect(uiStore.getState().screen).toBe("flashcard/create")

    const div = document.querySelector(".create-flash-card-div")
    expect(div).toBeTruthy()

    const cancel = document.querySelector(".create-flash-card-button-cancel")
    const confirm = document.querySelector(".create-flash-card-button-confirm")

    expect(cancel).toBeTruthy()


    expect(confirm).toBeTruthy()

    cancel.click()
    expect(uiStore.getState().screen).toBe("flashcard/list")

    uiStore.dispatch({type: "flashcard/create"})

    document.getElementsByClassName("create-id-input")[0].value = "30"
    document.getElementsByClassName("create-name-input")[0].value = "Test name"
    document.getElementsByClassName("create-category-input")[0].value = "Test category"

    const confirm2 = document.querySelector(".create-flash-card-button-confirm")

    confirm2.click()
    expect(uiStore.getState().screen).toBe("flashcard/list")

    const cards = store.getState().flashcards
    expect(cards[0].id).toBe("30")
    expect(cards[0].name).toBe("Test name")
    expect(cards[0].category).toBe("Test category")
})
