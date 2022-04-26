// why not just hard code an anchor tag in the HTML?
const backToPage = document.querySelector('.logosmol');

backToPage.style.cursor = 'pointer';

backToPage.addEventListener('click', () => {
    window.location = '../';
});