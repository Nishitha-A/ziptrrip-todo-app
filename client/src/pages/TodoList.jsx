import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import TodoFilters from "../components/TodoFilters";
const API_URL = "/api/todos";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Could not fetch todos. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);

      setTodos((previousTodos) => [
        response.data,
        ...previousTodos,
      ]);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Could not add todo.");
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const response = await axios.put(
        `${API_URL}/${todo._id}`,
        {
          completed: !todo.completed,
        }
      );

      setTodos((previousTodos) =>
        previousTodos.map((item) =>
          item._id === todo._id
            ? response.data
            : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Could not update todo.");
    }
  };

  const deleteTodo = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setTodos((previousTodos) =>
        previousTodos.filter(
          (todo) => todo._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Could not delete todo.");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const title = todo.title || "";
    const description = todo.description || "";

    const matchesSearch =
      title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && todo.completed) ||
      (filter === "Pending" && !todo.completed);

    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingCount =
    todos.length - completedCount;

  const progress =
    todos.length === 0
      ? 0
      : Math.round(
          (completedCount / todos.length) * 100
        );

  return (
    <div className="ocean-app">

      {/* NAVBAR */}

      <nav className="ocean-navbar">

        <div className="logo">
          <span className="logo-wave">🌊</span>
          <span>OceanTodo</span>
        </div>

        <div className="nav-links">
          <a href="/">⌂ Home</a>
          <a href="#tasks">☷ My Tasks</a>
          <a href="#overview">▥ Analytics</a>
        </div>

        <div className="nav-right">
          <span>☀ Stay Productive</span>
          <div className="profile-circle">
            N
          </div>
        </div>

      </nav>


      {/* MAIN DASHBOARD */}

      <main className="dashboard-container">

        {/* LEFT SIDE */}

        <section className="dashboard-left">

          {/* HERO */}

          <div className="hero-section">

            <div className="hero-text">
              <h1>
                Small Steps,
                <br />
                <span>Big Waves</span> 🌊
              </h1>

              <p>
                Turn your tasks into progress.
                Stay organized, focused and make
                every day count.
              </p>
            </div>

            <div className="quote-card">
              <p>
                “A calm ocean never made
                a skilled sailor.”
              </p>

              <span>〰</span>

              <small>
                Keep going...
              </small>
            </div>

          </div>


          {/* ADD TODO */}

          <TodoForm addTodo={addTodo} />


          {/* FILTERS */}

          <TodoFilters
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />


          {/* TASK LIST */}

          <section
            className="todo-section"
            id="tasks"
          >

            <div className="section-title">
              <h2>My Tasks</h2>

              <span>
                {filteredTodos.length} task
                {filteredTodos.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {loading ? (
              <div className="loading-card">
                🌊 Loading your tasks...
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="empty-message">
                <div className="empty-icon">
                  🌊
                </div>

                <h3>No tasks found</h3>

                <p>
                  Create a new task and start
                  making waves!
                </p>
              </div>
            ) : (
              <div className="todo-list">

                {filteredTodos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo}
                    toggleCompleted={
                      toggleCompleted
                    }
                    deleteTodo={
                      deleteTodo
                    }
                  />
                ))}

              </div>
            )}

          </section>

        </section>


        {/* RIGHT SIDEBAR */}

        <aside
          className="dashboard-right"
          id="overview"
        >

          {/* OVERVIEW */}

          <div className="sidebar-card overview-card">

            <div className="card-heading">
              <h2>▥ Task Overview</h2>
            </div>

            <div className="overview-grid">

              <div className="overview-box total-box">
                <span className="overview-icon">
                  ☷
                </span>

                <div>
                  <strong>
                    {todos.length}
                  </strong>

                  <p>Total Tasks</p>
                </div>
              </div>


              <div className="overview-box completed-box">
                <span className="overview-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    {completedCount}
                  </strong>

                  <p>Completed</p>
                </div>
              </div>


              <div className="overview-box pending-box">
                <span className="overview-icon">
                  ◷
                </span>

                <div>
                  <strong>
                    {pendingCount}
                  </strong>

                  <p>Pending</p>
                </div>
              </div>


              <div className="overview-box progress-box">

                <div className="progress-circle">
                  <span>
                    {progress}%
                  </span>
                </div>

                <p>Progress</p>

              </div>

            </div>

          </div>


          {/* MOTIVATION */}

          <div className="sidebar-card motivation-card">

            <h2>
              ✨ You're Doing Great!
            </h2>

            <p>
              Keep pushing forward. Every task
              brings you closer to your goals.
            </p>

            <div className="wave-decoration">
              🌊 🐋
            </div>

          </div>


          {/* QUICK LINKS */}

          <div className="sidebar-card quick-links">

            <h2>⚡ Quick Links</h2>

            <button
              onClick={() =>
                setFilter("All")
              }
            >
              ☷ All Tasks
            </button>

            <button
              onClick={() =>
                setFilter("Pending")
              }
            >
              ◷ Pending Tasks
            </button>

            <button
              onClick={() =>
                setFilter("Completed")
              }
            >
              ✓ Completed Tasks
            </button>

          </div>


          {/* BOTTOM CARD */}

          <div className="ocean-message">

            <h2>
              Good Things
              <br />
              Take Time
            </h2>

            <p>
              🌊 Be patient. Progress is
              progress.
            </p>

          </div>

        </aside>

      </main>

    </div>
  );
}

export default TodoList;