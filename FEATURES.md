# Todo Application Features

## Overview

This project is a full-stack Todo Application developed as part of the Ziptrrip technical challenge.

The application consists of a React frontend and a Node.js + Express backend with MongoDB for data storage.

---

# Frontend Features

## 1. Todo List Page

The main page displays all the todos created by the user.

Features include:

- View all todos
- Create new todos
- Add title and description
- Set todo priority
- Set a due date
- Mark todos as completed
- Delete todos
- Search todos
- Filter todos by status
- View task statistics

---

## 2. Search Functionality

Users can search todos using the search input.

The search checks:

- Todo title
- Todo description

---

## 3. Todo Filtering

Todos can be filtered based on their completion status.

Available filters:

- All
- Pending
- Completed

---

## 4. Todo Statistics

The application displays:

- Total number of todos
- Completed todos
- Pending todos

---

## 5. Todo Priority

Each todo can have a priority level.

Available priorities:

- Low
- Medium
- High

---

## 6. Due Dates

Users can assign a due date to a todo.

The due date is displayed on:

- Todo list page
- Todo details page

---

# Todo Details Page

A separate page is available for viewing individual todo details.

The page receives the Todo ID through a query parameter.

Example:

`todo.html?id=TODO_ID`

The details page displays:

- Todo title
- Description
- Priority
- Completion status
- Due date
- Created date and time
- Last updated date and time

---

# Todo Editing

Users can edit an existing todo.

Editable fields include:

- Title
- Description
- Priority
- Due date

Changes are saved using the backend API.

---

# Backend Features

The backend is built using:

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# CRUD APIs

## Create Todo

Creates a new todo.

`POST /api/todos`

---

## Get All Todos

Retrieves all todos.

`GET /api/todos`

---

## Get Single Todo

Retrieves a specific todo using its ID.

`GET /api/todos/:id`

---

## Update Todo

Updates an existing todo.

`PUT /api/todos/:id`

---

## Delete Todo

Deletes a todo.

`DELETE /api/todos/:id`

---

# Additional Features

- Responsive interface
- Ocean-inspired UI design
- Interactive task cards
- Confirmation before deleting a todo
- Error handling for API requests
- Loading states
- Empty todo state
- Separate pages instead of a single-page application

---

# Data Storage

Todo data is stored in MongoDB.

Each todo contains:

- Title
- Description
- Completion status
- Priority
- Due date
- Created timestamp
- Updated timestamp