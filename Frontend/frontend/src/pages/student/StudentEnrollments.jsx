import { useEffect, useState } from "react";

import apiClient from "../../api/apiClient";

function StudentEnrollments() {

  const [enrollments, setEnrollments] =
    useState([]);

  useEffect(() => {

    apiClient

      .get(
        "/enrollments/all"
      )

      .then((response) => {

        setEnrollments(response.data);
      });

  }, []);

  return (

    <div className="page-container">

      <h1>
        My Enrollments
      </h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Student</th>

            <th>Course</th>

          </tr>

        </thead>

        <tbody>

          {
            enrollments.map((enrollment) => (

              <tr key={enrollment.enrollmentId}>

                <td>
                  {enrollment.enrollmentId}
                </td>

                <td>
                  {
                    enrollment.student?.name
                  }
                </td>

                <td>
                  {
                    enrollment.course?.courseName
                  }
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default StudentEnrollments;
