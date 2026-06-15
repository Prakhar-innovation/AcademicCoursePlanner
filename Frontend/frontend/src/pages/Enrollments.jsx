// FULL src/pages/Enrollments.jsx

import { useEffect, useState } from "react";

import axios from "axios";

function Enrollments() {

  // ---------------- STATES ----------------

  const [enrollments,
         setEnrollments] =
    useState([]);

  const [students,
         setStudents] =
    useState([]);

  const [courses,
         setCourses] =
    useState([]);

  const [enrollmentData,
         setEnrollmentData] =
    useState({

      studentId: "",

      courseId: "",

      semester: "",

      year: "",

      status: ""
    });

  // ---------------- LOAD DATA ----------------

  useEffect(() => {

    fetchEnrollments();

    fetchStudents();

    fetchCourses();

  }, []);

  // ---------------- FETCH ENROLLMENTS ----------------

  const fetchEnrollments = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/enrollments/all"
        );

      setEnrollments(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // ---------------- FETCH STUDENTS ----------------

  const fetchStudents = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/students/all"
        );

      console.log(
        "Students:",
        response.data
      );

      setStudents(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // ---------------- FETCH COURSES ----------------

  const fetchCourses = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/courses/all"
        );

      console.log(
        "Courses:",
        response.data
      );

      setCourses(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // ---------------- HANDLE INPUT ----------------

  const handleChange = (e) => {

    setEnrollmentData({

      ...enrollmentData,

      [e.target.name]:
        e.target.value
    });
  };

  // ---------------- ADD ENROLLMENT ----------------

  const addEnrollment = async () => {

    const payload = {

      student: {

        studentId:
          enrollmentData.studentId
      },

      course: {

        courseId:
          enrollmentData.courseId
      },

      semester:
        enrollmentData.semester,

      year:
        enrollmentData.year,

      status:
        enrollmentData.status
    };

    console.log(payload);

    try {

      await axios.post(

        "http://localhost:8000/enrollments/add",

        payload
      );

      alert(
        "Enrollment Added Successfully"
      );

      fetchEnrollments();

      // CLEAR FORM

      setEnrollmentData({

        studentId: "",

        courseId: "",

        semester: "",

        year: "",

        status: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Enrollment"
      );
    }
  };

  // ---------------- UI ----------------

  return (

    <div>

      {/* ADD ENROLLMENT */}

      <div className="card">

        <h2>
          Add Enrollment
        </h2>

        {/* STUDENT */}

        <div className="form-group">

          <select
            name="studentId"
            value={
              enrollmentData.studentId
            }
            onChange={handleChange}
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (

              <option
                key={
                  student.studentId
                }
                value={
                  student.studentId
                }
              >

                {student.name}

              </option>

            ))}

          </select>

        </div>

        {/* COURSE */}

        <div className="form-group">

          <select
            name="courseId"
            value={
              enrollmentData.courseId
            }
            onChange={handleChange}
          >

            <option value="">
              Select Course
            </option>

            {courses.map(
              (course) => (

              <option
                key={
                  course.courseId
                }
                value={
                  course.courseId
                }
              >

                {course.courseName}

              </option>

            ))}

          </select>

        </div>

        {/* SEMESTER */}

        <div className="form-group">

          <input
            type="number"
            placeholder="Semester"
            name="semester"
            value={
              enrollmentData.semester
            }
            onChange={handleChange}
          />

        </div>

        {/* YEAR */}

        <div className="form-group">

          <input
            type="number"
            placeholder="Year"
            name="year"
            value={
              enrollmentData.year
            }
            onChange={handleChange}
          />

        </div>

        {/* STATUS */}

        <div className="form-group">

          <input
            type="text"
            placeholder="Status"
            name="status"
            value={
              enrollmentData.status
            }
            onChange={handleChange}
          />

        </div>

        {/* BUTTON */}

        <button
          className="btn"
          onClick={addEnrollment}
        >

          Add Enrollment

        </button>

      </div>

      {/* ENROLLMENT TABLE */}

      <div className="card">

        <h2>
          Enrollment List
        </h2>

        <table className="table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Student</th>

              <th>Course</th>

              <th>Semester</th>

              <th>Year</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {enrollments.length > 0 ? (

              enrollments.map(
                (enrollment) => (

                <tr
                  key={
                    enrollment.enrollmentId
                  }
                >

                  <td>
                    {
                      enrollment.enrollmentId
                    }
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

            ) : (

              <tr>

                <td colSpan="6">

                  No Enrollments Found

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Enrollments;