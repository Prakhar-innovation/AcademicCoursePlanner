import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import "./Tasks.css";

function TaskDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    highPriority: 0
  });

  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const [statsResponse, tasksResponse] = await Promise.all([
      apiClient.get("/tasks/stats"),
      apiClient.get("/tasks/all", {
        params: {
          limit: 5,
          sortBy: "createdAt",
          order: "desc"
        }
      })
    ]);

    setStats(statsResponse.data.stats || statsResponse.data?.stats || {});
    setRecentTasks(tasksResponse.data.tasks || []);
  };

  return (
    <div>
      <div className="task-header">
        <div>
          <h2>Task Dashboard</h2>
          <p>Assignment tracking across students, courses, priorities, and progress.</p>
        </div>

        <div className="task-actions">
          <Link className="btn" to="/tasks/add">Add Task</Link>
          <Link className="btn btn-secondary" to="/tasks">View Tasks</Link>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-box"><span>Total Tasks</span><strong>{stats.total || 0}</strong></div>
        <div className="metric-box"><span>Pending Tasks</span><strong>{stats.pending || 0}</strong></div>
        <div className="metric-box"><span>Completed Tasks</span><strong>{stats.completed || 0}</strong></div>
        <div className="metric-box"><span>High Priority</span><strong>{stats.highPriority || 0}</strong></div>
      </div>

      <div className="card">
        <h2>Recent Tasks</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Course</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>

          <tbody>
            {recentTasks.map((task) => (
              <tr key={task._id}>
                <td><Link to={`/tasks/${task._id}`}>{task.title}</Link></td>
                <td>{task.studentId}</td>
                <td>{task.courseId}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskDashboard;
