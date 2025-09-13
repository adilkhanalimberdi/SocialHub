const history_container = document.getElementById("history");

function formatTime(date) {
    let res = "";
    let check = false;
    let count = 0;

    for (let index in date) {
        if (date[index] === ":") {
            count++;
        }
        if (count === 2) {
            check = false;
        }
        if (check) res += date[index];
        if (date[index] === "T") {
            check = true;
        }
    }

    // console.log(res);
    return res;
}

function deleteMessage(message) {
    // console.log(message);
    fetch(`${MESSAGES_API_URL}/del/${message.id}`, {
        method: "DELETE",
    })
        .then(async response => {
            await updateChat();
        })
}

async function displayHistory(chat) {
    // console.log(chat);
    history_container.innerHTML = "";

    chat.messages.sort((a, b) => a.id - b.id);

    chat.messages.forEach(message => {
        // console.log(message);

        let div = document.createElement("div");
        let content = document.createElement("div");
        let time = document.createElement("div");
        let text = message.message;
        let container = document.createElement("div");
        container.classList.add("message-container");

        if (message.sender.id === ID) {
            content.classList.add("sent");
            time.classList.add("sent-time");
            content.addEventListener("click", event => {
                // let ans = confirm("Do you want to delete this message?");
                // if (ans) {
                //     deleteMessage(message);
                //     console.log(message);
                // }

                showActionWindow(message);
            });
        } else {
            content.classList.add("received");
            time.classList.add("received-time");
        }

        time.textContent = formatTime(message.sentAt);
        content.textContent = text;

        content.appendChild(time);
        container.appendChild(content);
        // container.appendChild(time);
        div.appendChild(container);
        history_container.appendChild(div);

         // console.log(message.sender.id);
    });

    history_container.scrollTop = history_container.scrollHeight;
}