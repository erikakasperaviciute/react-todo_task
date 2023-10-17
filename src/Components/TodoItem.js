function TodoItem(props) {
  const { onDeleteTask, onEditTask, onTodoDone } = props;
  const { id, creationDate, title, description, done, dueDate, updateDate } =
    props.data;

  if (!title || !dueDate) {
    return null;
  }

  const descriptionElement = description && <p>{description}</p>;

  const dueDateObj = new Date(dueDate);
  const currentDate = new Date();

  const timeLeft = dueDateObj - currentDate;

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return (
    <div className="todo-item">
      <h3>{title}</h3>
      {descriptionElement}
      <div>
        <p>Created: {creationDate}</p>
        {updateDate && <p>Edited: {updateDate}</p>}
        <p>Due to: {dueDateObj.toLocaleString("lt-LT")}</p>

        <div className="form-control">
          <input
            type="checkbox"
            id={`todo-${id}`}
            name="todo-done"
            checked={done}
            onChange={() => onTodoDone(id)}
          />
          <label htmlFor={`todo-${id}`}>
            {done ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Task completed ✅
              </span>
            ) : timeLeft > 0 ? (
              <span>
                Task is not completed yet. (Time left: {daysLeft} days and{" "}
                {hoursLeft} hours)
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Task is overdue ❗
              </span>
            )}
          </label>
        </div>
        <button className="button" onClick={() => onDeleteTask(id)}>
          Delete 🗑️
        </button>
        <button className="button" onClick={() => onEditTask(id)}>
          Edit ✏️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
