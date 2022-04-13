/* eslint-disable no-console */
import { 
    makeImageUrl,
    createEmployee,
    uploadImage,
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

    const image = data.get('image');
    let URL = null;
    if (image.name){
        const uploadedImage = await uploadImage(image);
        URL = makeImageUrl(uploadedImage.Key);
        
    }
    
    const employee = {
        name: employeeName,
        email: email,
        avatar_img: URL,
        business_code: bizCode
    };

    await createEmployee(employee);
    
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});
