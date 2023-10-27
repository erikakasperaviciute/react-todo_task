import React, { useEffect, useState } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import { API_URL } from "./config";
import axios from "axios";

function TodoPage() {
  // const todosData = [];

  // const [todos, setTodos] = useState(todosData);

  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios(`${API_URL}/todos`);
      setTodos(data);
    };
    getTodos();
  }, []);

  const newTodoHandler = async (newTodo) => {
    if (editTodo) {
      console.log(editTodo);
      const { data } = await axios.put(
        `${API_URL}/todos/${editTodo.id}`,
        newTodo
      );
      console.log(editTodo.id);
      setTodos((prevTodos) => {
        const editId = editTodo.id;
        const editIndex = todos.findIndex((todo) => todo.id === editId);
        const newState = [...prevTodos];
        newState[editIndex] = data;
        return newState;
      });
      setEditTodo(null);
    } else {
      const { data } = await axios.post(`${API_URL}/todos`, newTodo);
      setTodos((prevTodos) => [data, ...prevTodos]);
    }
  };

  //   const newTodoHandler = (newTodo) => {
  //     if (editTodo) {
  //       setTodos((prevTodos) => {
  //         const updatedTodos = prevTodos.map((item) => {
  //           if (item.id === newTodo.id) {
  //             return newTodo;
  //           }
  //           return item;
  //         });
  //         return updatedTodos;
  //       });
  //       setEditTodo(null);
  //     } else {
  //       setTodos((prevTodos) => [newTodo, ...prevTodos]);
  //     }
  //   };

  const editTodoHandler = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditTodo(todoToEdit);
  };

  const deleteTodoHandler = (todoId) => {
    axios.delete(`${API_URL}/todos/${todoId}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const doneTodoHandler = async (todoId) => {
    const clickedTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    const clickedTodo = todos[clickedTodoIndex];

    if (clickedTodo) {
      const updatedTodo = { ...clickedTodo };
      updatedTodo.done = !updatedTodo.done;
      await axios.put(`${API_URL}/todos/${todoId}`, updatedTodo);
      setTodos((prevState) => {
        const newState = [...prevState];
        // const clickedTodo = newState[clickedTodoIndex];
        // const updatedTodo = { ...clickedTodo };
        // updatedTodo.done = !updatedTodo.done;
        newState[clickedTodoIndex] = updatedTodo;
        return newState;
      });
    }
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
