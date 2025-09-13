# SocialHub – Fullstack Social Networking Application

SocialHub is a fullstack web application that simulates a social network. Users can register, manage profiles, create and manage chats, and send, edit, or delete messages. The project was developed as a learning exercise to explore Java Spring Boot, REST APIs, PostgreSQL, and a custom JavaScript-based frontend.

## 🚀 Features

- 👤 **User Management** – create, update, delete, and search users
- 💬 **Messaging** – send, edit, and delete messages in chats
- 💡 **Chats** – create and manage chats between users
- 💄 **Database Integration** – PostgreSQL with Hibernate ORM
- 🌍 **REST API** – clear and extendable API structure
- 🗑️ **Environment Variables** – sensitive data stored securely in .env file

## 🛠️ Tech Stack

- **Backend:** Java 21, Spring Boot 3, Spring Data JPA, Hibernate
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Database:** PostgreSQL
- **Build Tool:** Maven
- **Other Tools:** IntelliJ IDEA, WebStorm

## 📦 API Endpoints

### 👤 User Endpoints

- `GET api/users/id/{id}` → Get user by ID
- `GET api/users/name/{name}` → Get user by name
- `GET api/users/all` → Get all users
- `POST api/users/add` → Add a new user
- `PUT api/users/upd/{id}` → Update a user
- `DELETE api/users/del/{id}` → Delete a user

### 💬 Message Endpoints

- `GET api/messages/{id}` → Get message by ID
- `GET api/messages/all` → Get all messages
- `POST api/messages/add` → Add a new message
- `PUT api/messages/upd/{id}` → Update a message
- `DELETE api/messages/del/{id}` → Delete a message

### 💡 Chat Endpoints

- `GET api/chats/{id}` → Get chat by ID
- `GET api/chats/all` → Get all chats
- `GET api/chats/from-user/{id}` → Get all chats of a user
- `POST api/chats/add` → Add a new chat
- `POST api/chats/add-message` → Add a new message to a chat
- `PUT api/chats/upd/{id}` → Update a chat
- `DELETE api/chats/del/{id}` → Delete a chat

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/SocialHub.git
cd SocialHub
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start at:
👉 http://localhost:8080

### 3. Frontend setup

Open the frontend/ folder in WebStorm (or any IDE)

Start the project by running index.html on your local server (e.g., WebStorm default: http://localhost:63343/frontend/html/index.html)

The frontend will automatically connect to the backend via REST API.

## 📖 Usage

- Open the application in your browser
- Browse all users or open a specific user’s profile
- Create and manage chats
- Send, edit, and delete messages in real-time

## 💾 Project Structure
```bash
SocialHub/
├── backend/               # Spring Boot backend
│   ├── src/main/java/...  # Controllers, Services, Entities
│   ├── src/main/resources # application.template.yaml
│   └── pom.xml            # Maven config
├── frontend/              # Static frontend
│   ├── css/               # Styles
│   ├── js/                # Scripts
│   └── html/              # HTML pages
└── .env                   # Environment variables (not pushed to Git)
```

🔥 This project was created as a learning exercise, but can be further improved with authentication, real-time features (WebSocket), and a modern frontend framework.

