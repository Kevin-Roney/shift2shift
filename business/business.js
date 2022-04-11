import { checkAuth, 
    logout, 
    createBusiness,
    createAdmin,
    signupUser,
    redirectIfLoggedIn } from '../fetch-utils.js';

// checkAuth();

const logoutButton = document.getElementById('logout');
const businessSignUpForm = document.querySelector('form');


logoutButton.addEventListener('click', () => {
    logout();
});

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
    console.log(code);
    businessSignUpForm.reset();
});
