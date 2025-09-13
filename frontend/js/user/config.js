const API_URL = "http://localhost:8080/api/users";
const CHATS_API_URL = "http://localhost:8080/api/chats";
const MESSAGES_API_URL = "http://localhost:8080/api/messages";
const params = new URLSearchParams(window.location.search);
const ID = Number(params.get("id"));
let USER = null
let USERS = null
let CURRENT_CHAT = null

async function updateUser() {
    // USER.updatedAt = new Date();

    // console.log(USER.name, `${new Date(USER.updatedAt).getHours()}:${new Date(USER.updatedAt).getMinutes()}`);
    fetch(`${API_URL}/upd/${ID}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: USER.id,
            name: USER.name,
            surname: USER.surname,
            age: USER.age,
            email: USER.email,
            phone: USER.phone,
            updatedAt: new Date(),
        }),
    })
        .then(async response => {
            // console.log(response);
            await getUsers();
            // await loadUsers();
        })
}

function updateChat() {
    return fetch(`${CHATS_API_URL}/${CURRENT_CHAT.id}`)
        .then(response => response.json())
        .then(async updatedChat => {
            CURRENT_CHAT = updatedChat;
            await displayHistory(updatedChat);
        })
}

async function getUser() {
    const res = await fetch(`${API_URL}/id/${ID}`);
    USER = await res.json();

    await updateUser();
    // console.log(user);
}

async function getUsers() {
    const res = await fetch(`${API_URL}/all`, {});
    USERS = await res.json();
    ALL_USERS = USERS;
}


async function init() {
    await getUsers();
    await getUser();
}

window.addEventListener("load", init);

