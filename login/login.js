/* eslint-disable no-console */
import { 
    redirectIfLoggedIn,
    signInUser } from '../fetch-utils.js';

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const signUpEmail = data.get('email');
    const password = data.get('password');
    const user = await signInUser(signUpEmail, password);

    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});
