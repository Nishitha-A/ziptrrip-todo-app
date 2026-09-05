function TodoCard({
  todo,
  toggleCompleted,
  deleteTodo,
}) {
  const openTodoDetails = () => {
    window.location.href = `/todo.html?id=${todo._id}`;
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteTodo(todo._id);
  };

  const handleCheckbox = (event) => {
    event.stopPropagation();
    toggleCompleted(todo);
  };

  return (
    <div
      className={`ocean-todo-card ${
        todo.completed ? "completed-task" : ""
      }`}
      onClick={openTodoDetails}
    >
      <div className="task-left">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckbox}
        />

        <div className="task-content">
          <h3>{todo.title}</h3>

          {todo.description && (
            <p>{todo.description}</p>
          )}

          <div className="task-meta">
            <span
              className={`priority-tag ${
                todo.priority.toLowerCase()
              }`}
            >
              {todo.priority}
            </span>

            {todo.dueDate && (
              <span className="due-date">
                ▣ Due{" "}
                {new Date(
                  todo.dueDate
                ).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">

        <button
          className="view-button"
          onClick={(event) => {
            event.stopPropagation();
            openTodoDetails();
          }}
          title="View task"
        >
          ◉
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete task"
        >
          🗑
        </button>

      </div>
    </div>
  );
}

export default TodoCard;