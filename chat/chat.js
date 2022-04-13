/* eslint-disable no-console */
import {
    checkAuth,
    sendChat,
    client,
    getEmployee
} from '../fetch-utils.js';

checkAuth();

const allChatsEl = document.querySelector('#all-chats');
const formEl = document.querySelector('form');




formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(formEl);
    const user = await getEmployee();

    await sendChat({
        sender_email: user.email,
        text: data.get('message'),
        user_id: user.user_id,
        business_code: user.business_code
    });

    formEl.reset();
});

window.addEventListener('load', async () => {
    const user = await getEmployee();
    await client
        .from('chats')
        .on('INSERT', payload => {

            const chatItemOuterEl = document.createElement('div');
            const chatMessageEl = document.createElement('p');
            const chatSenderEl = document.createElement('p');

            const employeeJoinedEl = document.createElement('p');
            employeeJoinedEl.classList.add('employee-joined');
            employeeJoinedEl.textContent = `${user.email} joined chat`;

            chatSenderEl.classList.add('sender');

            if (payload.new.sender_email === user.email) {
                chatSenderEl.classList.add('is-me');
            }

            chatItemOuterEl.classList.add('chat-message');

            chatSenderEl.textContent = payload.new.sender_email;
            chatMessageEl.textContent = payload.new.text;

            chatItemOuterEl.append(chatMessageEl, chatSenderEl);
            allChatsEl.append(chatItemOuterEl);

            return employeeJoinedEl;
        })

        .subscribe();
});