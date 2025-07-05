# 📚 Library Management System

A minimalist, responsive Library Management System built using React, TypeScript, Redux Toolkit (RTK Query), and Tailwind CSS. Users can manage books and borrowing records with ease.

---

### 🚀 Live API Base URL

https://library-api-pied.vercel.app/api


---

## 🖼️ Features

### 📘 Book Management
- View all books in a responsive table
- Add new books with form validation
- Edit existing book details
- Delete books with confirmation
- Borrow books with quantity & due date
- Auto-update availability when copies reach 0

### 📥 Borrow Summary
- View total borrowed quantity per book
- Aggregated summary view via backend API

### 🧭 Routing (via React Router DOM)

| Route               | Description                      |
|---------------------|----------------------------------|
| `/books`            | View all books                   |
| `/create-book`      | Add a new book                   |
| `/books/:id`        | View single book details         |
| `/edit-book/:id`    | Edit a book                      |
| `/borrow/:bookId`   | Borrow a specific book           |
| `/borrow-summary`   | View borrow summary              |

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React + TypeScript                   |
| UI           | Tailwind CSS                         |
| Routing      | React Router DOM                     |
| State Mgmt   | Redux Toolkit + RTK Query            |
| Backend API  | Express + MongoDB (hosted on Vercel) |

---

---

## 🧪 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- npm or yarn

---

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/library-management.git

# 2. Navigate to the project folder
cd library-management

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev


