import { useEffect, useState } from "react";

import axios from "axios";

function StudentCourses() {

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {

    axios

      .get(
        "http://localhost:8081/courses/all"
      )

      .then((response) => {

        setCourses(response.data);
      });

  }, []);

  return (

    <div className="page-container">

      <h1>
        My Courses
      </h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Course Code</th>

            <th>Name</th>

            <th>Credits</th>

          </tr>

        </thead>

        <tbody>

          {
            courses.map((course) => (

              <tr key={course.courseId}>

                <td>
                  {course.courseId}
                </td>

                <td>
                  {course.courseCode}
                </td>

                <td>
                  {course.courseName}
                </td>

                <td>
                  {course.credits}
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default StudentCourses;