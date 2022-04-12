import { redirectIfLoggedIn } from './fetch-utils.js';

const getStartedBtn = document.querySelector('.startUsing');
const aboutUsBtn = document.querySelector('.aboutUsBtn');
// if user currently logged in, redirect
redirectIfLoggedIn();

getStartedBtn.addEventListener('click', () => {
    location.replace('./business');
});

aboutUsBtn.addEventListener('click', () => {
    location.replace('./about');
})
