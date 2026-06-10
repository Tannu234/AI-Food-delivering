# 🍔 Food Delivery App Backend

A backend API for a Food Delivery Application built with Node.js, Express.js, MongoDB, JWT Authentication, and Cloudinary.

## 🚀 Features

- User Authentication & Authorization
- JWT Token Based Login System
- Role Based Access Control
- Cloudinary Image Upload
- MongoDB Database Integration
- Global Error Handling
- Async Error Middleware
- Email Utility Support
- API Filtering & Search
- Secure Password Management

---

## 📁 Project Structure

```text
backend/
│
├── config/
│   ├── cloudinary.js
│   ├── config.env
│   └── database.js
│
├── controllers/
│   └── authController.js
│
├── middlewares/
│   ├── authorizeRoles.js
│   ├── catchAsyncErrors.js
│   └── errors.js
│
├── models/
│   └── user.js
│
├── routes/
│   └── auth.js
│
├── utils/
│   ├── apiFeatures.js
│   ├── email.js
│   ├── errorHandler.js
│   ├── seeder.js
│   └── sendToken.js
│
├── app.js
├── server.js
├── package.json
└── .gitignore
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cloudinary
- dotenv
- bcryptjs

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/food-delivery-app.git
```

Move into project directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `config.env` file inside the `config` folder:

```env
PORT=5000

DB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=99d
JWT_EXPIRE_TIME=99

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run the Project

```bash
npm start
```

Server will start on:

```text
http://localhost:5000
```

---

## 📌 API Features

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Role Based Authorization
- Image Upload with Cloudinary
- Error Handling Middleware

---
---


---

## 👩‍💻 Author

**Tamanna Baghel**

GitHub: https://github.com/Tannu234

## 👩‍💻 Author

**Tamanna Baghel**

GitHub: https://github.com/Tannu234
