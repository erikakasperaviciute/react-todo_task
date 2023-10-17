import React, { useState } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

function TodoPage() {
  const todosData = [];

  const [todos, setTodos] = useState(todosData);
  const [editTodo, setEditTodo] = useState(null);

  const newTodoHandler = (newTodo) => {
    if (editTodo) {
      setTodos((prevTodos) => {
        const editId = newTodo.id;
        const editIndex = todos.findIndex((todo) => todo.id === editId);
        const newState = [...prevTodos];
        newState[editIndex] = newTodo;
        return newState;
      });
      setEditTodo(null);
    } else {
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }
  };

  const editTodoHandler = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditTodo(todoToEdit);
  };

  const deleteTodoHandler = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const doneTodoHandler = (todoId) => {
    const clickedTodoIndex = todos.findIndex((todo) => todo.id === todoId);

    setTodos((prevState) => {
      const newState = [...prevState];
      const clickedTodo = newState[clickedTodoIndex];
      const updatedTodo = { ...clickedTodo };
      updatedTodo.done = !updatedTodo.done;
      newState[clickedTodoIndex] = updatedTodo;
      return newState;
    });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <TodoForm onNewTodo={newTodoHandler} editTodo={editTodo} />
      <h2>Things to do:</h2>
      <TodoList
        todos={sortedTodos}
        onDeleteTask={deleteTodoHandler}
        onEditTask={editTodoHandler}
        onTodoDone={doneTodoHandler}
      />
    </>
  );
}

export default TodoPage;
