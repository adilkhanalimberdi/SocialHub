const actionWindow = document.getElementById("message-action-window");
const editWindow = document.getElementById("message-edit-window");
const effectDiv = document.getElementById("effect");

effectDiv.style.height = document.body.scrollHeight + 100 + "px";
// console.log(document.body.scrollHeight);

let currentMessage = null;

function showActionWindow(message) {
    actionWindow.style.display = "block";
    effectDiv.style.display = "block";

    currentMessage = message;
}

// Hiding windows
function hideActionWindow() {
    actionWindow.style.display = "none";
}

function hideEditWindow() {
    editWindow.style.display = "none";
}

function hideWindow() {
    effectDiv.style.display = "none";
    hideActionWindow()
    hideEditWindow();
}

// Buttons
let actionWindowBackButton = document.getElementById("action-window-back-button");
let editWindowBackButton = document.getElementById("edit-window-back-button");
let saveEditedMessageButton = document.getElementById("save-edited-message-button");
let deleteButton = document.getElementById("action-window-delete-button");
let editButton = document.getElementById("action-window-edit-button");


// Back buttons
actionWindowBackButton.onclick = () => {
    hideWindow();
}

editWindowBackButton.onclick = () => {
    hideWindow();
    showActionWindow();
}

// Delete button
deleteButton.onclick = () => {
    deleteMessage(currentMessage);
    hideWindow();
}

// Edit message buttons
editButton.onclick = () => {
    editWindow.style.display = "block";
    document.getElementById("edit-message").value = currentMessage.message;
    hideActionWindow();
}

saveEditedMessageButton.onclick = async () => {
    // console.log(currentMessage);
    const input = document.getElementById("edit-message");
    const value = input.value;

    if (value.trim() === "") {
        return;
    }

    currentMessage.message = value;
    const res = await fetch(`${MESSAGES_API_URL}/upd/${currentMessage.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: currentMessage.id,
            message: value.trim(),
            sentAt: new Date().toISOString(),
            chat: CURRENT_CHAT,
            sender: currentMessage.sender,
        })
    });
    // console.log(new Date());

    if (res.ok) {
        // alert("Message updated.");
        hideWindow();
    } else {
        alert("Error: " + await res.text());
    }

    input.value = "";
    await updateChat();
}