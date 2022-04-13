import { logout, createTodo, getEmployee, getTodo, completeTodo, deleteTodo, getShiftNotes, createShiftNote, checkAuth } from '../fetch-utils.js';
import { renderShiftNote, renderTodo } from '../render-utils.js';
const logoutButton = document.querySelector('#logout');

checkAuth();

const todosEl = document.querySelector('.todosContainer');
const shiftNotesEl = document.querySelector('.shiftNotesContainer');
const todosForm = document.querySelector('#todoListForm');
const shiftNotesForm = document.querySelector('#shiftNotesForm');

logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.href = '../';
});

window.addEventListener('load', async () => {
    await fetchAndDisplay();
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
    await fetchAndDisplay();
});

shiftNotesForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    const user = await getEmployee();
    const business_code = user.business_code;
    const data = new FormData(shiftNotesForm);
    const shiftNoteObj = data.get('shiftNotes');

    await createShiftNote({
        note: shiftNoteObj,
        business_code: business_code,
        sent_by: user.name
    });

    shiftNotesForm.reset();
    await fetchAndDisplay();
});

async function fetchAndDisplay() {

    //Todos Fetch and Display
    todosEl.textContent = '';
    const user = await getEmployee();
    const business_code = user.business_code;
    const todos = await getTodo({ business_code });

    for (let todo of todos) {
        const todoEl = await renderTodo(todo);

        if (todo.urgency === 1){
            todoEl.classList.add('low-urgency');
        } else if (todo.urgency === 2) {
            todoEl.classList.add('medium-urgency');
        } else {
            todoEl.classList.add('high-urgency');
        }
        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id, user.name);
            await fetchAndDisplay();
        });

        if (user.is_admin) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteTodo(todo.id);
                await fetchAndDisplay();
            });

            todoEl.append(deleteButton);
        }

        todosEl.append(todoEl);
    }

    //Shift Notes Fetch and Display
    shiftNotesEl.textContent = '';
    const shiftNotes = await getShiftNotes({ business_code });

    for (let shiftNote of shiftNotes) {
        const shiftNoteEl = await renderShiftNote(shiftNote);
        shiftNotesEl.append(shiftNoteEl);
    }
}