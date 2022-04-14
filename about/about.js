const backToPage = document.querySelector('.logosmol');

backToPage.style.cursor = 'pointer';

backToPage.addEventListener('click', () => {
    window.location = '../';
});