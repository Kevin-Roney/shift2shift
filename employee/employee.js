/* eslint-disable no-console */
import { 
    createEmployee,
    redirectIfLoggedIn,
    signupUser } from '../fetch-utils.js';

const employeeSignUpForm = document.querySelector('form');

employeeSignUpForm.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    const data = new FormData(employeeSignUpForm);

    const bizCode = data.get('signupCode');
    const employeeName = data.get('employeeName');
    const email = data.get('email');
    const password = data.get('password');

    const user = await signupUser(email, password);

    
    const employee = {
        name: employeeName,
        email: email,
        avatar_img: null,
        business_code: bizCode
    };

    await createEmployee(employee);
    
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

const backToPage = document.querySelector('.backto');

backToPage.addEventListener('click', () => {
    window.location = '../';
});