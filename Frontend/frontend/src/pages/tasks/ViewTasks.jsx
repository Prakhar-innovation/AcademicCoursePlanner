import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import "./Tasks.css";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sortBy: "createdAt",
    order: "desc",
    page: 1,
    limit: 10
  });

  const role = localStorage.getItem("role")?.toUpperCase();
  const canManage = role === "ADMIN" || role === "FACULTY";

  const params = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== "")
    );
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [params]);

  const fetchTasks = async () => {
    const response = await apiClient.get("/tasks/all", { params });
    setTasks(response.data.tasks || []);
    setPagination(response.data.pagination || { page: 1, pages: 1, total: 0 });
  };

  const changeFilter = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
      page: 1
    });
  };

  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    await apiClient.delete(`/tasks/delete/${id}`);
    fetchTasks();
  };

  const setPage = (page) => {
    setFilters({
      ...filters,
      page
    });
  };

  return (
    <div>
      <div className="task-header">
        <div>
          <h2>View Tasks</h2>
          <p>Search, filter, sort, and monitor assignment progress.</p>
        </div>

        {canManage && <Link className="btn" to="/tasks/add">Add Task</Link>}
      </div>

      <div className="task-filters">
        <input name="search" placeholder="Search tasks" value={filters.search} onChange={changeFilter} />

        <select name="status" value={filters.status} onChange={changeFilter}>
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Blocked</option>
        </select>

        <select name="priority" value={filters.priority} onChange={changeFilter}>
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={changeFilter}>
          <option value="createdAt">Created</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>

        <select name="order" value={filters.order} onChange={changeFilter}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Course</th>
              <th>Assigned By</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.studentId}</td>
                <td>{task.courseId}</td>
                <td>{task.assignedBy}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="task-row-actions">
                  <Link to={`/tasks/${task._id}`}>Details</Link>
                  <Link to={`/tasks/update/${task._id}`}>Update</Link>
                  {canManage && <button onClick={() => deleteTask(task._id)}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button disabled={pagination.page <= 1} onClick={() => setPage(pagination.page - 1)}>Previous</button>
          <span>Page {pagination.page} of {pagination.pages} | {pagination.total} tasks</span>
          <button disabled={pagination.page >= pagination.pages} onClick={() => setPage(pagination.page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ViewTasks;
