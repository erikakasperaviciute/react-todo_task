import TodoItem from "./TodoItem";
import React, { useState, useEffect } from "react";

function TodoList(props) {
  const { todos, onDeleteTask, onEditTask, onTodoDone } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (searchTerm) {
      const filtered = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos);
    }
  }, [searchTerm, todos]);

  return (
    <div className="todo-list">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredTodos.length === 0 ? (
        <p>There are no todos with your search term.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            data={todo}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onTodoDone={onTodoDone}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
