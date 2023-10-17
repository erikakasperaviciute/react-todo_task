import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";

function TodoForm(props) {
  const { onNewTodo, editTodo } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setDone(editTodo.done);
      setDueDate(editTodo.dueDate);
    }
  }, [editTodo]);

  const newTodoHandler = (e) => {
    e.preventDefault();

    const newTodo = {
      id: editTodo ? editTodo.id : uuid(),
      creationDate: editTodo
        ? editTodo.creationDate
        : new Date().toLocaleString("lt-LT"),
      title,
      description,
      done,
      dueDate,
      updateDate: editTodo ? new Date().toLocaleString("lt-LT") : null,
    };

    setTitle("");
    setDescription("");
    setDone(false);
    setDueDate("");

    onNewTodo(newTodo);
  };

  const titleInputHandler = (e) => setTitle(e.target.value);
  const descriptionInputHandler = (e) => setDescription(e.target.value);
  const doneInputHandler = () => setDone((prevState) => !prevState);
  const dueDateInputHandler = (e) => setDueDate(e.target.value);

  return (
    <form onSubmit={newTodoHandler}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={titleInputHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={descriptionInputHandler}
        />
      </div>
      <div className="form-control">
        <input
          id="done"
          type="checkbox"
          checked={done}
          onChange={doneInputHandler}
        />
        <label htmlFor="done">Done</label>
      </div>
      <div className="form-control">
        <label htmlFor="dueDate">Due date:</label>
        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          value={dueDate}
          onChange={dueDateInputHandler}
        />
      </div>
      <button type="submit">
        {editTodo ? "Save edited task" : "Add new task"}
      </button>
    </form>
  );
}

export default TodoForm;
