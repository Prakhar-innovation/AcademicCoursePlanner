import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import "./Tasks.css";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const response = await apiClient.get(`/tasks/${id}`);
    const currentTask = response.data.task;

    setTask({
      ...currentTask,
      dueDate: currentTask.dueDate?.slice(0, 10)
    });
  };

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  };

  const submitUpdate = async (event) => {
    event.preventDefault();

    await apiClient.put(`/tasks/update/${id}`, task);
    alert("Task updated successfully");
    navigate(`/tasks/${id}`);
  };

  if (!task) {
    return <div className="card">Loading task...</div>;
  }

  return (
    <div className="card">
      <h2>Update Task</h2>

      <form className="task-form" onSubmit={submitUpdate}>
        <input name="title" value={task.title} onChange={handleChange} required />
        <textarea name="description" value={task.description} onChange={handleChange} required />
        <input name="studentId" type="number" value={task.studentId} onChange={handleChange} required />
        <input name="courseId" type="number" value={task.courseId} onChange={handleChange} required />

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

        <button className="btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateTask;
