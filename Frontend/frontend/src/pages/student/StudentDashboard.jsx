import { useEffect, useState }
from "react";

import apiClient from "../../api/apiClient";

import "./Student.css";

function StudentDashboard() {

  const username =
    localStorage.getItem("username");

  const [enrollments,
         setEnrollments] =
    useState([]);

  useEffect(() => {

    apiClient

      .get(
        "/enrollments/all"
      )

      .then((response) => {

        setEnrollments(
          response.data
        );
      });

  }, []);

  // DASHBOARD STATS
  const totalCourses =
    enrollments.length;

  const activeCourses =
    enrollments.filter(
      (e) =>
        e.status === "ACTIVE"
    ).length;

  const currentSemester =
    enrollments.length > 0
      ? enrollments[0].semester
      : "-";

  return (

    <div className="student-container">

      <h1>
        Welcome Student
      </h1>

      <div className="student-card">

        <h2>
          {username}
        </h2>

        <p>
          Academic Planning Portal
        </p>

      </div>

      {/* STATS CARDS */}
      <div className="stats-container">

        <div className="stat-box">

          <h3>
            Total Courses
          </h3>

          <p>
            {totalCourses}
          </p>

        </div>

        <div className="stat-box">

          <h3>
            Active Courses
          </h3>

          <p>
            {activeCourses}
          </p>

        </div>

        <div className="stat-box">

          <h3>
            Current Semester
          </h3>

          <p>
            {currentSemester}
          </p>

        </div>

      </div>

      {/* COURSE TABLE */}
      <div className="courses-section">

        <h2>
          Enrolled Courses
        </h2>

        <table>

          <thead>

            <tr>

              <th>Course</th>

              <th>Semester</th>

              <th>Year</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {
              enrollments.map(
                (enrollment) => (

                <tr
                  key={
                    enrollment.enrollmentId
                  }
                >

                  <td>
                    {
                      enrollment.course
                      ?.courseName
                    }
                  </td>

                  <td>
                    {
                      enrollment.semester
                    }
                  </td>

                  <td>
                    {
                      enrollment.year
                    }
                  </td>

                  <td>
                    {
                      enrollment.status
                    }
                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentDashboard;
