/* eslint-disable no-console */
import {
    checkAuth,
    sendChat,
    client,
    logout,
    getEmployee
} from '../fetch-utils.js';
const logoutButton = document.querySelector('#logout');

checkAuth();

const allChatsEl = document.querySelector('#all-chats');
const formEl = document.querySelector('form');

const mainButton = document.querySelector('#main'); 

mainButton.addEventListener('click', async () => {
    window.location.href = '../main/';
});

logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.href = '../';
});

function playAOL() {
    var audio = new Audio('../assets/imrcv.wav');
    audio.volume = 0.5;
    audio.play();
}

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
            
            playAOL();  

            return employeeJoinedEl;
        })

        .subscribe();
});

const backToPage = document.querySelector('.logosmol');

backToPage.style.cursor = 'pointer';

backToPage.addEventListener('click', () => {
    window.location = '../';
});