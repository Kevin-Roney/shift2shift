import { logout, createTodo, getEmployee, getTodo, completeTodo } from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';
const logoutButton = document.querySelector('#logout');

// checkAuth();

logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.href = '../';
});

const todosEl = document.querySelector('.todosContainer');
const shiftNotesEl = document.querySelector('.shiftNotesContainer');
const todosForm = document.querySelector('#todoListForm');

window.addEventListener('load', async () => {
    await fetchAndDisplayTodos();
});
todosForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = await getEmployee();
    const business_code = user.business_code;
    const data = new FormData(todosForm);
    const todoObj = data.get('todo');
    const urgencyObj = data.get('urgency');

    await createTodo({
        todo_name: todoObj,
        urgency: urgencyObj,
        business_code: business_code,
    });

    todosForm.reset();
    await fetchAndDisplayTodos();
});

async function fetchAndDisplayTodos() {
    todosEl.textContent = '';
    const user = await getEmployee();
    const business_code = user.business_code;
    const todos = await getTodo({ business_code }); 
    console.log(todos);
    for (let todo of todos) {
        const todoEl = await renderTodo(todo);
        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id, user.name);
            await fetchAndDisplayTodos();
        });
        todosEl.append(todoEl);
    }
}