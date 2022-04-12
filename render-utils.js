export function renderTodo(todo) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    
    div.classList.add('todo');
    h3.textContent = todo.todo_name;
    div.append(h3);

    if (todo.is_complete === true) {
        const todoEl = document.createElement('div');
        const avatar = document.createElement('img');
        const pTag = document.createElement('p');

        avatar.classList.add('avatar');
        todoEl.classList.add('complete');
        pTag.textContent = `${todo.completed_by} completed this task!`;
        if (todo.avatar !== null) {
            avatar.src = `${todo.avatar}`;
            todoEl.append(pTag, avatar);
        } else {
            todoEl.append(pTag);
        }
        div.append(todoEl);
    }
    return div;
}