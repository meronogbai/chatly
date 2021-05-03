const messageForm = document.getElementById('messageForm');
const messagesDiv = document.getElementById('messagesDiv');

const socket = io();
socket.on('message', message => {
  messagesDiv.innerHTML += `<h4>${message.name}</h4><p>${message.message}</p>`;
});

fetch('/messages')
  .then(response => response.json())
  .then(messages => {
    messages.forEach(message => {
      messagesDiv.innerHTML += `<h4>${message.name}</h4><p>${message.message}</p>`;
    });
  });

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const body = JSON.stringify({
    name: document.getElementById('name').value,
    message: document.getElementById('message').value,
  });
  fetch('/messages', {
    method: 'post',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});