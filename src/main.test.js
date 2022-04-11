
/**
 * @jest-environment jsdom
 */


test('Test main exists', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    const main = require('./main');
    expect(main.uiStore.getState().screen).toBe("home")
});


