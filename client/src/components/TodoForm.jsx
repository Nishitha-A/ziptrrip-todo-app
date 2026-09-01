import { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("Medium");
  const [dueDate, setDueDate] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    addTodo({
      title,
      description,
      priority,
      dueDate: dueDate || null,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form
      className="ocean-todo-form"
      onSubmit={handleSubmit}
    >

      <div className="form-heading">
        <span className="add-icon">
          +
        </span>

        <h2>Add a New Task</h2>
      </div>


      <input
        type="text"
        placeholder="What do you want to do?"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        className="task-title-input"
      />


      <div className="form-bottom-row">

        <input
          type="text"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />


        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="Low">
            🟢 Low
          </option>

          <option value="Medium">
            🟠 Medium
          </option>

          <option value="High">
            🔴 High
          </option>
        </select>


        <input
          type="date"
          value={dueDate}
          onChange={(event) =>
            setDueDate(event.target.value)
          }
        />


        <button type="submit">
          ➤ Add Task
        </button>

      </div>

    </form>
  );
}

export default TodoForm;