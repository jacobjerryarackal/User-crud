
```md
# User CRUD Management App (React + Next.js + Node.js)

A simple CRUD (Create, Read, Update, Delete) web application to manage user data using a REST API.

This project contains:
- **Frontend:** Next.js (React + TypeScript) + Ant Design UI
- **Backend:** Node.js + Express API

---

## ✨ Features

### User Form Fields
- First Name (required)
- Last Name (required)
- Phone Number (required, validated)
- Email Address (required, validated)

### CRUD Operations
- Create a new user
- View all users in a list/table
- Update existing user
- Delete user

### Extra
- Form validation + required enforcement
- Loading states and error handling
- Clean UI using Ant Design

---

## 🧩 Project Structure

```

user-crud-app/
│
├── backend/        # Node.js + Express REST API
└── frontend/       # Next.js + React + TypeScript UI

````

---

## ⚙️ Setup Instructions

### 1 Clone the repository

```bash
git clone <your-repo-url>
cd user-crud-app
````

---

## 🚀 Running the Project (2 Terminals Required)

### ✅ Terminal 1: Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3001
```

---

### ✅ Terminal 2: Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints (Backend)

Base URL:

```
http://localhost:3001
```

Example endpoints:

* `GET /users` → Get all users
* `POST /users` → Create new user
* `PUT /users/:id` → Update user
* `DELETE /users/:id` → Delete user

---

## 🧠 Extensibility (How to Add New Fields Easily)

The user form is built using a **configuration-driven approach**.

To add a new field (Example: `Date of Birth` or `Address`):

1. Open the field configuration file (example):

   * `frontend/src/config/userFields.ts`

2. Add a new field object:

```ts
{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: true
}
```

3. The UI will automatically render the field in the form and include validation.

✅ No major UI rewrite needed
✅ Minimal changes required
✅ Works for future fields

---

## 📝 Assumptions / Design Decisions

* Backend is kept separate for clarity and scalability.
* Form validation is handled on the frontend for better UX.
* API integration includes loading + error states.
* UI uses Ant Design for fast and clean layout.

---

## 🌍 Deployment

Frontend can be deployed on:

* Vercel 
* Netlify

Backend can be deployed on:

* Render / Railway / Cyclic

---

## 👨‍💻 Author

Jacob Jerry Arackal

```


