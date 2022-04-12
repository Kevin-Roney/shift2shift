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
    const uploadedImage = await uploadImage(image);
    const URL = makeImageUrl(uploadedImage.Key);

    await createEmployee({
        name: employeeName,
        email: email,
        avatar_img: URL,
        business_code: bizCode
    });
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});
