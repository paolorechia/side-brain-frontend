
/**
 * @jest-environment jsdom
 */

const { flashcardView } = require('./view');


test('test flashcard view', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    require('./view');

    flashcardView("SUPER_ROOT", {
        id: 2,
        name: "test name",
        category: "Is this real?"
    })

    const div = document.querySelector(".flash-card-div")
    expect(div).toBeTruthy()
    expect(div.children[0].innerText).toBe(2)
    expect(div.children[1].innerText).toBe("test name")
    expect(div.children[2].innerText).toBe("Is this real?")
});


