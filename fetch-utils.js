const SUPABASE_URL = 'https://exdgziiimtdbnzsutsww.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGd6aWlpbXRkYm56c3V0c3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2OTU0MDAsImV4cCI6MTk2NTI3MTQwMH0.fM3DfnuXPzI2L9V6lW_SYZhFULpz1Ymqoq1rkMg5g8E';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function makeImageUrl(imagekey) {
    return `${SUPABASE_URL}/storage/v1/object/public/${imagekey}`;
}
export async function uploadImage(myImageFile) {
    const response = await client
        .storage
        .from('avatars')
        .upload(myImageFile.name, myImageFile, {
            cacheControl: '3600',
            upsert: false
        });
    return checkError(response);
}

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
            avatar_img: employee.avatar_img,
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

export async function getEmployee() {
    const user = await getUser();
    const response = await client  
        .from('employees')
        .select('*')
        .match({ user_id: user.id })
        .single();
    
    return checkError(response);
}

// creates a single incomplete todo with the correct todo property for this user in supabase
export async function createTodo(todo) {
    const response = await client 
        .from('todos')
        .insert({
            todo_name: todo.todo_name,
            urgency: todo.urgency,
            is_complete: false,
            completed_by: null,
            business_code: todo.business_code,
        });
    return checkError(response);
}

// gets all todos for the specific business associated with that code
export async function getTodo(todo) {
    const response = await client 
        .from('todos')
        .select('*')
        .match({
            business_code: todo.business_code
        });
    return checkError(response);
}

// updating the todo to complete that matches the correct business code
export async function completeTodo(todo, user) {
    const response = await client 
        .from('todos')
        .update({ is_complete: true, completed_by: user })
        .match({ id: todo });

    return checkError(response);
}

export async function deleteTodo(todo) {
    const response = await client 
        .from('todos')
        .delete()
        .match({ id: todo });
    
    return checkError(response);
}

export async function createShiftNote(note){
    const response = await client
        .from('shiftNotes')
        .insert({
            note: note.note,
            business_code: note.business_code,
            sent_by: note.sent_by
        });
    return checkError(response);
}

export async function getShiftNotes(shift){
    const response = await client
        .from('shiftNotes')
        .select('*')
        .match({
            business_code: shift.business_code
        });

    return checkError(response);

}

//function allows user to chat in chat page
export async function sendChat(someMessage) {
    const response = await client
        .from('chats')
        .insert(someMessage)
        .match({
            business_code: someMessage.business_code
        })
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
        location.replace('../main');
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
