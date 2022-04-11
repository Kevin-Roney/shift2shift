const SUPABASE_URL = '';
const SUPABASE_KEY = '';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//Takes business name input from signup form and inserts name and random generated code into businesses table on supabase
export async function createBusiness(business) {
    const response = await client
        .from('businesses')
        .insert({
            name: business.name,
            business_code: business.business_code
        });
    
    return checkError(response);
}

//takes businesses signup information and generates admin to employee table
export async function createAdmin(employee) {
    const response = await client
        .from('employees')
        .insert({
            name: employee.name,
            business_code: employee.business_code,
            shift: 3,
            is_admin: true,
            avatar: employee.avatar_img,
            email: employee.email,
            user_id: employee.user_id
        });

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
