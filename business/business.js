/* eslint-disable no-console */

import { 
    createBusiness,
    createAdmin,
    signupUser,
    redirectIfLoggedIn,
    uploadImage,
    makeImageUrl } from '../fetch-utils.js';

const businessSignUpForm = document.querySelector('form');


businessSignUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(businessSignUpForm);
    const user = await signupUser(data.email, data.password);
    const code = Math.ceil(Math.random() * 99999);
    const bizName = data.get('bizName');
    const admin = data.get('adminName');
    const email = data.get('email');
    const password = data.get('password');
    await createBusiness({
        name: bizName,
        business_code: code
        
    });
    await signupUser(email, password);
    const image = data.get('image');
    const uploadedImage = await uploadImage(image);
    const URL = makeImageUrl(uploadedImage.Key);
    await createAdmin({
        name: admin,
        business_code: code,
        email: email,
        avatar_img: URL
    });
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
    businessSignUpForm.reset();
});
