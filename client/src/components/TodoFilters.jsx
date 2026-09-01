function TodoFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="ocean-filters">

      <div className="search-wrapper">

        <span>⌕</span>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>


      <div className="filter-buttons">

        <button
          className={
            filter === "All"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setFilter("All")
          }
        >
          All
        </button>


        <button
          className={
            filter === "Pending"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setFilter("Pending")
          }
        >
          ◷ Pending
        </button>


        <button
          className={
            filter === "Completed"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setFilter("Completed")
          }
        >
          ✓ Completed
        </button>

      </div>

    </div>
  );
}

export default TodoFilters;