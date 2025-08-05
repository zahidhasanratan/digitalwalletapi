# 💳 Digital Wallet API

A secure, modular, and role-based backend API for a digital wallet system — inspired by platforms like **Bkash** or **Nagad**. Built with **Express.js** and **MongoDB**, this system supports three roles: **Admin**, **User**, and **Agent**, each with specific capabilities for wallet and transaction management.

---

## 🚀 Project Overview

This API allows:

- **Users** to register, log in, and manage their wallets (add money, withdraw, send money, view transaction history).
- **Agents** to perform cash-in and cash-out operations for any user.
- **Admins** to view users, agents, wallets, transactions, block/unblock wallets, and approve/suspend agents.

Key features:

- 🔐 JWT-based Authentication
- 🎭 Role-based Authorization Middleware
- 🏦 Wallet Auto-Creation with ৳50 Initial Balance
- 🔁 Transaction Logging
- 📦 RESTful API Structure
- 🧱 Clean Modular Code Structure

---

## ⚙️ Setup & Environment Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/digital-wallet-api.git
cd digital-wallet-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project_directory
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

---

## 📘 API Endpoint Summary

### ✅ Auth Routes (`/api/auth`)

| Method | Endpoint    | Description                  |
| ------ | ----------- | ---------------------------- |
| POST   | `/register` | Register as user/agent/admin |
| POST   | `/login`    | Login and receive JWT token  |

---

### 👤 User Routes (`/api/users`)

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | `/me`    | Get current user profile |

---

### 💰 Wallet Routes (`/api/wallet`)

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/deposit`  | Add money to own wallet    |
| POST   | `/withdraw` | Withdraw money             |
| POST   | `/transfer` | Send money to another user |
| GET    | `/balance`  | View wallet balance        |

---

### 🔁 Transaction Routes (`/api/transactions`)

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/my-transactions` | View user's own transaction history |

---

### 🤝 Agent Routes (`/api/agent`)

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| POST   | `/cash-in`  | Add money to any user's wallet    |
| POST   | `/cash-out` | Withdraw money from user's wallet |

---

### 🛡️ Admin Routes (`/api/admin`)

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| GET    | `/users`                     | View all users        |
| GET    | `/agents`                    | View all agents       |
| GET    | `/wallets`                   | View all wallets      |
| GET    | `/transactions`              | View all transactions |
| PATCH  | `/wallets/block/:walletId`   | Block a wallet        |
| PATCH  | `/wallets/unblock/:walletId` | Unblock a wallet      |
| PATCH  | `/agents/approve/:agentId`   | Approve an agent      |
| PATCH  | `/agents/suspend/:agentId`   | Suspend an agent      |

---

## 🗂️ Folder Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── wallet/
│   ├── transaction/
│   ├── agent/
│   └── admin/
├── middlewares/
├── config/
├── app.ts
├── server.ts
```

---

## 🧪 Testing

Use **Postman** to test all routes with proper JWT tokens based on role (`admin`, `user`, or `agent`).

---

## 🧑‍💻 Author

**Zahid Hasan**  
Backend Developer
