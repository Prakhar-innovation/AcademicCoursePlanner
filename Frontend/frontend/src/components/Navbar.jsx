// src/components/Navbar.jsx

import { Link, useNavigate }
from "react-router-dom";

import "../css/navbar.css";

function Navbar() {

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem("role");

  const username =
    localStorage.getItem("username");

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">

        Academic Planner

      </div>

      {/* NAV LINKS */}

      <div className="nav-links">

        {/* ADMIN LINKS */}

        {
          role?.toUpperCase()
          === "ADMIN" && (

          <>

            <Link to="/">
              Dashboard
            </Link>

            <Link to="/students">
              Students
            </Link>

            <Link to="/courses">
              Courses
            </Link>

            <Link to="/enrollments">
              Enrollments
            </Link>

            <Link to="/prerequisites">
              Prerequisites
            </Link>

          </>
        )}

        {/* STUDENT LINKS */}

        {
          role?.toUpperCase()
          === "STUDENT" && (

          <>

            <Link
              to="/student-dashboard"
            >
              Dashboard
            </Link>

            <Link
              to="/student-courses"
            >
              Courses
            </Link>

            <Link
              to="/student-enrollments"
            >
              Enrollments
            </Link>

            <Link
              to="/student-profile"
            >
              Profile
            </Link>

          </>
        )}

        {/* USERNAME */}

        <span className="username">

          {username}

        </span>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={logout}
        >

          Logout

        </button>

      </div>

    </nav>
  );
}

export default Navbar;