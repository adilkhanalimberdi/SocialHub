function sendMessage(chat) {
    let input = document.getElementById('message-input');
    let value = input.value;

    if (value.trim() === "") {
        return;
    }

    fetch(`${CHATS_API_URL}/add-message`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            message: value,
            userId: USER.id,
            chatId: chat.id
        })
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to add message.");
            return response.text();
        })
        .then(async () => {
            await updateChat();
            input.value = "";
        })
        .catch(error => {
            console.error("Failed to add message: ", error);
        })
}

document.getElementById("send").addEventListener("click", () => sendMessage(CURRENT_CHAT));
document.getElementById("back").addEventListener("click", () => loadChats());

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        sendMessage(CURRENT_CHAT);
    }
})