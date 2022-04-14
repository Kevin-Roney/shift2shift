/* eslint-disable no-console */

import { 
    createBusiness,
    createAdmin,
    signupUser,
    redirectIfLoggedIn, } from '../fetch-utils.js';

const businessSignUpForm = document.querySelector('form');


businessSignUpForm.addEventListener('submit', async (event) => {

    event.preventDefault();
    
    const data = new FormData(businessSignUpForm);
    const code = Math.ceil(Math.random() * 99999);
    const bizName = data.get('bizName');
    const admin = data.get('adminName');
    const email = data.get('email');
    const password = data.get('password');
    
    const user = await signupUser(email, password);
    await createBusiness({
        name: bizName,
        business_code: code
    });
    
    await createAdmin({
        name: admin,
        business_code: code,
        email: email,
    });
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
    businessSignUpForm.reset();
});

const backToPage = document.querySelector('.backto');

backToPage.addEventListener('click', () => {
    window.location = '../';
});