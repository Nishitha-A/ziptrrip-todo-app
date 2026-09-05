function TodoCard({
  todo,
  toggleCompleted,
  deleteTodo,
}) {
  const openTodoDetails = () => {
  window.location.href =
    `/?todoId=${encodeURIComponent(todo._id)}`;
};

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    toggleCompleted(todo);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteTodo(todo._id);
  };

  return (
    <div
      className={`ocean-todo-card ${
        todo.completed ? "completed-task" : ""
      }`}
      onClick={openTodoDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openTodoDetails();
        }
      }}
      title="Click to view and edit this task"
    >
      <div className="task-left">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          onClick={(event) =>
            event.stopPropagation()
          }
        />

        <div className="task-content">

          <h3>{todo.title}</h3>

          {todo.description && (
            <p>{todo.description}</p>
          )}

          <div className="task-meta">

            <span
              className={`priority-tag ${
                (
                  todo.priority || "Medium"
                ).toLowerCase()
              }`}
            >
              {todo.priority || "Medium"}
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
          title="View and edit task"
          type="button"
        >
          ◉
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete task"
          type="button"
        >
          🗑
        </button>

      </div>
    </div>
  );
}

export default TodoCard;