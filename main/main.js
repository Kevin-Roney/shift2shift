import { logout, createTodo, getEmployee } from '../fetch-utils.js';

const logoutButton = document.querySelector('#logout');

// checkAuth();

logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.href = '../';
});

const todosEl = document.querySelector('.todosContainer');
const shiftNotesEl = document.querySelector('.shiftNotesContainer');
const todosForm = document.querySelector('#todoListForm');

todosForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(todosForm);
    const todoObj = data.get('todo');
    const urgencyObj = data.get('urgency');
    const user = await getEmployee();
    const business_code = user.business_code;

    await createTodo({
        todo_name: todoObj,
        urgency: urgencyObj,
        business_code: business_code,
    });

    todosForm.reset();
});