import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import "./Tasks.css";

const emptyTask = {
  title: "",
  description: "",
  studentId: "",
  courseId: "",
  priority: "Medium",
  status: "Pending",
  dueDate: ""
};

function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState(emptyTask);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  };

  const submitTask = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await apiClient.post("/tasks/add", task);
      alert("Task assigned successfully");
      navigate("/tasks");
    } catch (requestError) {
      const message =
        requestError.response?.data?.detail?.message ||
        requestError.response?.data?.detail?.detail?.message ||
        requestError.response?.data?.message ||
        "Task assignment failed. Login again as ADMIN or FACULTY.";

      setError(message);
    }
  };

  return (
    <div className="card">
      <h2>Add Task</h2>

      {error && <div className="task-error">{error}</div>}

      <form className="task-form" onSubmit={submitTask}>
        <input name="title" placeholder="Task title" value={task.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
        <input name="studentId" type="number" placeholder="Student ID" value={task.studentId} onChange={handleChange} required />
        <input name="courseId" type="number" placeholder="Course ID" value={task.courseId} onChange={handleChange} required />

        <select name="priority" value={task.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="status" value={task.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Blocked</option>
        </select>

        <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} required />

        <button className="btn" type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default AddTask;
