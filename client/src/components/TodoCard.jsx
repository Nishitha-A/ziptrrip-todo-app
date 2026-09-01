function TodoCard({
  todo,
  toggleCompleted,
  deleteTodo,
}) {

  const openTodoDetails = () => {
    window.location.href =
      `/todo.html?id=${todo._id}`;
  };

  const handleDelete = (event) => {
    event.stopPropagation();

    deleteTodo(todo._id);
  };

  return (
    <div
      className={`ocean-todo-card ${
        todo.completed
          ? "completed-task"
          : ""
      }`}
    >

      <div className="task-left">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            toggleCompleted(todo)
          }
        />


        <div
          className="task-content"
          onClick={openTodoDetails}
        >

          <h3>{todo.title}</h3>

          {todo.description && (
            <p>
              {todo.description}
            </p>
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
          onClick={openTodoDetails}
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