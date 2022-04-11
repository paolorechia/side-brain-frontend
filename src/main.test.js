
/**
 * @jest-environment jsdom
 */


test('test main exists', () => {
    document.body.innerHTML = 
    '<h1> Hello, World!</h1>' +
    '<div id="SUPER_ROOT"></div>'

    require('./main');

    let elements = document.getElementsByClassName("test-class")
    expect(elements).toBeTruthy()
});


