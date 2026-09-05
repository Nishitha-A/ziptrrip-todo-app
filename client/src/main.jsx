import React from "react";
import ReactDOM from "react-dom/client";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";
import "./styles.css";

const params = new URLSearchParams(window.location.search);
const todoId = params.get("todoId");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {todoId ? <TodoDetails /> : <TodoList />}
  </React.StrictMode>
);