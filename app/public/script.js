var socket = io();

socket.on('chat message', (response) => {
    console.log(response)
    let user = response.tags.username;
    let message = response.message;
    addMessageElement(user, message);
})

const addMessageElement = (user, message) => {
    const newListItem = document.createElement("li");
    // const newMessage = document.createElement("text");
    // const userName = document.createElement("text");
    // userName.appendChild
    const newContent = document.createTextNode(`${user}: ${message}`);
    newListItem.appendChild(newContent);
    newListItem.classList.add("message")
    const container = document.getElementById("messages__container");
    container.appendChild(newListItem)
    let messages = document.getElementsByClassName("message");
    if (messages.length >= 10) {
        container.removeChild(messages[0]);
    }
}