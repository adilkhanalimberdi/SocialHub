async function welcomeUser() {
    let element = document.getElementById("hello-message");

    fetch(`${API_URL}/id/${ID}`)
        .then(response => response.json())
        .then(async user => {
            element.textContent += `, ${user.name}!`;
            await init();
        });
}

async function loadUserInfo() {
    const res = await fetch(`${API_URL}/id/${ID}`);
    const user = await res.json();

    document.getElementById("name").value = user.name;
    document.getElementById("surname").value = user.surname;
    document.getElementById("age").value = user.age;
    document.getElementById("phone").value = user.phone;
    document.getElementById("email").value = user.email;
}

document.getElementById("edit-form").addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedUser = {
        name: formData.get("name"),
        surname: formData.get("surname"),
        age: formData.get("age"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_URL}/upd/${ID}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
        alert("User updated.");
    } else {
        alert("Error: " + await res.text());
    }
})

window.addEventListener("load", welcomeUser);
window.addEventListener("load", loadUserInfo);