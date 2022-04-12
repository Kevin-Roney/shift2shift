import { logout, checkAuth } from '../fetch-utils.js';

const logoutButton = document.querySelector('#logout');

checkAuth();

logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.href = '../';
});