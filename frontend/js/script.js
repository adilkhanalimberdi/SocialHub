const API_URL = "http://localhost:8080/api/users";

const users_container = document.getElementById("users");

function displayUsers(users) {
    users_container.innerHTML = "";
    let count = 1;

    users = users.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // users.forEach((user) => {
    //     console.log(user.name, `${new Date(user.updatedAt).getHours()}:${new Date(user.updatedAt).getMinutes()}`);
    // })

    users.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.addEventListener("click", () => {
            window.location.href = `account.html?id=${user.id}`;
        });
        div.textContent = `${count}. ${user.name} `;
        if (user.surname !== null) {
            div.textContent += `${user.surname} `;
        }
        if (user.age > 0) {
            div.textContent += `(${user.age}) `;
        }
        if (user.email !== null) {
            div.textContent += `- ${user.email}`;
        }
        users_container.appendChild(div);
        count++;
    });
}

async function loadUsers() {

    // displayUsers(ALL_USERS);
    fetch(`${API_URL}/all`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(users => displayUsers(users))
        .catch(error => {
            console.error("Failed to load users: ", error);
            users_container.textContent = "Error loading users";
        })
}

window.addEventListener("DOMContentLoaded", loadUsers);