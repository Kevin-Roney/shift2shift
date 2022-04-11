const SUPABASE_URL = 'https://exdgziiimtdbnzsutsww.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGd6aWlpbXRkYm56c3V0c3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2OTU0MDAsImV4cCI6MTk2NTI3MTQwMH0.fM3DfnuXPzI2L9V6lW_SYZhFULpz1Ymqoq1rkMg5g8E';

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

//function takes in from employee sign up form and generates employee information on supabase
export async function createEmployee(employee) {
    const response = await client
        .from('employees')
        .insert({
            name: employee.name,
            email: employee.email,
            avatar_img: employee.avatar_img,
            user_id: employee.user_id,
            business_code: employee.business_code,
            is_admin: false
        });

    return checkError(response);
}

//function allows user to chat in chat page
export async function sendChat(someMessage) {
    const response = await client
        .from('chats')
        .insert(someMessage)
        .single();

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
        location.replace('./business');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    // await createEmployee(employee);

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
