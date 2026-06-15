import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import "./Tasks.css";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const response = await apiClient.get(`/tasks/${id}`);
    setTask(response.data.task);
  };

  if (!task) {
    return <div className="card">Loading task...</div>;
  }

  return (
    <div className="card task-details">
      <div className="task-header">
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>

        <Link className="btn" to={`/tasks/update/${task._id}`}>Update</Link>
      </div>

      <div className="detail-grid">
        <div><span>Student ID</span><strong>{task.studentId}</strong></div>
        <div><span>Course ID</span><strong>{task.courseId}</strong></div>
        <div><span>Assigned By</span><strong>{task.assignedBy}</strong></div>
        <div><span>Priority</span><strong>{task.priority}</strong></div>
        <div><span>Status</span><strong>{task.status}</strong></div>
        <div><span>Due Date</span><strong>{new Date(task.dueDate).toLocaleDateString()}</strong></div>
        <div><span>Created</span><strong>{new Date(task.createdAt).toLocaleString()}</strong></div>
        <div><span>Updated</span><strong>{new Date(task.updatedAt).toLocaleString()}</strong></div>
      </div>
    </div>
  );
}

export default TaskDetails;
