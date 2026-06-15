// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

// LOGIN & SIGNUP
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ADMIN PAGES
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Prerequisites from "./pages/Prerequisites";

// STUDENT PAGES
import StudentDashboard
from "./pages/student/StudentDashboard";

import StudentCourses
from "./pages/student/StudentCourses";

import StudentEnrollments
from "./pages/student/StudentEnrollments";

import StudentProfile
from "./pages/student/StudentProfile";

function App() {

  return (

    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <div className="main-container">

        <Routes>

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/enrollments"
            element={<Enrollments />}
          />

          <Route
            path="/prerequisites"
            element={<Prerequisites />}
          />

          {/* STUDENT ROUTES */}
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/student-courses"
            element={<StudentCourses />}
          />

          <Route
            path="/student-enrollments"
            element={<StudentEnrollments />}
          />

          <Route
            path="/student-profile"
            element={<StudentProfile />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;