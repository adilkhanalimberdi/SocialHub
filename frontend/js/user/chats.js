const chats_container = document.getElementById("chats");
const direct_container = document.getElementById("direct");
const action_title = document.getElementById("title");
const back_button = document.getElementById("back");


function displayChat(chat) {
    // console.log(chat);
    chats_container.style.display = "none";
    direct_container.style.display = "flex";
    action_title.style.justifyContent = "left";
    action_title.style.paddingLeft = "10px";
    back_button.style.display = "block";

    if (chat.user1.id === ID) {
        action_title.textContent = `${chat.user2.name} `;
        if (chat.user2.surname !== null) {
            action_title.textContent += chat.user2.surname;
        }
    } else {
        action_title.textContent = `${chat.user1.name} `;
        if (chat.user1.surname !== null) {
            action_title.textContent += chat.user1.surname;
        }
    }
}


async function loadChats() {
    chats_container.innerHTML = "";

    chats_container.style.display = "block";
    direct_container.style.display = "none";
    back_button.style.display = "none";
    action_title.textContent = "Chats: ";
    action_title.style.justifyContent = "center";

    fetch(`${CHATS_API_URL}/from-user/${ID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load chats.");
            }
            return response.json();
        })
        .then(chats => {
            // console.log(chats);

            let sortedChats = chats.sort((a, b) => {
                let lastA = a.messages.length
                    ? new Date(a.messages[a.messages.length - 1].sentAt)
                    : new Date(0);

                let lastB = b.messages.length
                    ? new Date(b.messages[b.messages.length - 1].sentAt)
                    : new Date(0);

                return lastB - lastA;
            });

            // console.log(sortedChats);

            sortedChats.forEach(chat => {
                let to = ``;

                if (chat.user1.id === ID) {
                    to = `${chat.user2.name} ${chat.user2.surname}`;
                } else {
                    to = `${chat.user1.name} ${chat.user1.surname}`;
                }

                const div = document.createElement("div");
                div.classList.add("chat");
                div.addEventListener("click", () => {
                    CURRENT_CHAT = chat;
                    displayChat(CURRENT_CHAT);
                    displayHistory(CURRENT_CHAT);
                });
                div.innerHTML += `<i class="fa-solid fa-user"></i>` + to;
                // div.textContent += to;
                chats_container.appendChild(div);
            })
        })
        .catch(error => {
            console.error("Failed to load chats:", error);
            chats_container.textContent = "Error loading chats.";
        })
}

window.addEventListener("load"  , loadChats);