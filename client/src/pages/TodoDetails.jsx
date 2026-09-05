import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/todos";

function TodoDetails() {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("todoId");

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) {
        setError("No Todo ID was provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/${id}`);

        setTodo(response.data);

        setTitle(response.data.title || "");

        setDescription(
          response.data.description || ""
        );

        setPriority(
          response.data.priority || "Medium"
        );

        setDueDate(
          response.data.dueDate
            ? response.data.dueDate.split("T")[0]
            : ""
        );
      } catch (error) {
        console.error(
          "Error fetching todo:",
          error
        );

        setError("Todo not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  // Update Todo
  const updateTodo = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        {
          title,
          description,
          priority,
          dueDate: dueDate || null,
        }
      );

      setTodo(response.data);

      setIsEditing(false);

      alert("Todo updated successfully!");
    } catch (error) {
      console.error(
        "Error updating todo:",
        error
      );

      alert("Could not update todo.");
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="details-page">
        <div className="details-loading">
          Loading your task...
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="details-page">
        <div className="details-error-card">
          <h2>{error}</h2>

          <button
            className="back-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Todos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-wrapper">

        {/* Top Navigation */}
        <button
          className="back-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Back to Todos
        </button>

        {/* Main Card */}
        <div className="details-card">

          {!isEditing ? (
            <>
              {/* Header */}
              <div className="details-header">

                <div>
                  <p className="task-label">
                    TASK DETAILS
                  </p>

                  <h1>
                    {todo.title}
                  </h1>
                </div>

                <span
                  className={`details-priority ${todo.priority.toLowerCase()}`}
                >
                  {todo.priority} Priority
                </span>
              </div>

              {/* Description */}
              <div className="details-description">
                <h3>Description</h3>

                <p>
                  {todo.description ||
                    "No description provided for this task."}
                </p>
              </div>

              {/* Information Grid */}
              <div className="details-grid">

                <div className="info-box">
                  <span className="info-label">
                    STATUS
                  </span>

                  <strong
                    className={
                      todo.completed
                        ? "completed-text"
                        : "pending-text"
                    }
                  >
                    {todo.completed
                      ? "✓ Completed"
                      : "○ Pending"}
                  </strong>
                </div>

                <div className="info-box">
                  <span className="info-label">
                    DUE DATE
                  </span>

                  <strong>
                    {todo.dueDate
                      ? new Date(
                          todo.dueDate
                        ).toLocaleDateString()
                      : "No due date"}
                  </strong>
                </div>

                <div className="info-box">
                  <span className="info-label">
                    CREATED
                  </span>

                  <strong>
                    {new Date(
                      todo.createdAt
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div className="info-box">
                  <span className="info-label">
                    LAST UPDATED
                  </span>

                  <strong>
                    {new Date(
                      todo.updatedAt
                    ).toLocaleDateString()}
                  </strong>
                </div>

              </div>

              {/* Actions */}
              <div className="details-actions">

                <button
                  className="edit-button"
                  onClick={() =>
                    setIsEditing(true)
                  }
                >
                  ✏ Edit Task
                </button>

              </div>
            </>
          ) : (

            /* Edit Mode */
            <form
              className="edit-form"
              onSubmit={updateTodo}
            >

              <div className="edit-header">
                <div>
                  <p className="task-label">
                    EDIT TASK
                  </p>

                  <h1>
                    Update Your Todo
                  </h1>
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label>
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label>
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows="5"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="edit-grid">

                {/* Priority */}
                <div className="form-group">
                  <label>
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(event) =>
                      setPriority(
                        event.target.value
                      )
                    }
                  >
                    <option value="Low">
                      Low Priority
                    </option>

                    <option value="Medium">
                      Medium Priority
                    </option>

                    <option value="High">
                      High Priority
                    </option>
                  </select>
                </div>

                {/* Due Date */}
                <div className="form-group">
                  <label>
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(event) =>
                      setDueDate(
                        event.target.value
                      )
                    }
                  />
                </div>

              </div>

              {/* Form Buttons */}
              <div className="edit-actions">

                <button
                  type="submit"
                  className="save-button"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

export default TodoDetails;