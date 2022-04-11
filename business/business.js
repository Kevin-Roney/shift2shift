import { checkAuth, 
    createBusiness,
    createAdmin,
    signupUser,
    redirectIfLoggedIn } from '../fetch-utils.js';

// checkAuth();

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
    await createAdmin({
        name: admin,
        business_code: code,
        avatar: data.file,
        email: email,
    });
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
    businessSignUpForm.reset();
});
