var socket = io();
let channelName;
let displayedMessages = [];

socket.on('chat message', (response) => {
    console.log(response)
    let user = response.tags.username;
    let message = response.message;
    addMessageElement(user, message);
})

const addMessageElement = (user, message) => {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(`${user}: ${message}`);
    newDiv.appendChild(newContent);
    newDiv.classList.add("message")
    const currentDiv = document.getElementById("messages__container");
    currentDiv.appendChild(newDiv)
    let messages = document.getElementsByClassName("message");
    if (messages.length > 10) {
        currentDiv.removeChild(messages[0]);
    }
}