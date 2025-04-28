const button = document.getElementById('clickButton');
button.addEventListener('click', function() {
  alert("Button!");
});

// Real-time chat part
const socket = io();
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');

// Send message
function sendMessage() {
  const message = messageInput.value.trim();

  if (message !== '') {
    socket.emit('chat message', message);
    messageInput.value = '';
  }
}

// Button click
sendButton.addEventListener('click', sendMessage);

// Enter key
messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Receive messages
socket.on('chat message', function(msg) {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  
  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
});
