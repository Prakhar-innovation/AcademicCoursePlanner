// FULL src/pages/Students.jsx

import { useEffect, useState } from "react";

import apiClient from "../api/apiClient";

function Students() {

  // ---------------- STATE ----------------

  const [students, setStudents] =
    useState([]);

  const [studentData,
         setStudentData] =
    useState({

      name: "",

      email: "",

      department: "",

      semester: ""
    });

  // ---------------- LOAD STUDENTS ----------------

  useEffect(() => {

    fetchStudents();

  }, []);

  // ---------------- FETCH STUDENTS ----------------

  const fetchStudents = async () => {

    try {

      const response =
        await apiClient.get(
          "/students/all"
        );

      console.log(response.data);

      if (
        Array.isArray(response.data)
      ) {

        setStudents(
          response.data
        );

      } else {

        setStudents([]);
      }

    } catch (error) {

      console.log(error);

      setStudents([]);
    }
  };

  // ---------------- HANDLE INPUT ----------------

  const handleChange = (e) => {

    setStudentData({

      ...studentData,

      [e.target.name]:
        e.target.value
    });
  };

  // ---------------- ADD STUDENT ----------------

  const addStudent = async () => {

    try {

      await apiClient.post(

        "/students/add",

        studentData
      );

      alert(
        "Student Added Successfully"
      );

      // reload students
      fetchStudents();

      // clear form
      setStudentData({

        name: "",

        email: "",

        department: "",

        semester: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Student"
      );
    }
  };

  // ---------------- UI ----------------

  return (

    <div>

      {/* ADD STUDENT FORM */}

      <div className="card">

        <h2>
          Add Student
        </h2>

        {/* NAME */}

        <div className="form-group">

          <input
            type="text"
            placeholder="Student Name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
          />

        </div>

        {/* EMAIL */}

        <div className="form-group">

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />

        </div>

        {/* DEPARTMENT */}

        <div className="form-group">

          <input
            type="text"
            placeholder="Department"
            name="department"
            value={studentData.department}
            onChange={handleChange}
          />

        </div>

        {/* SEMESTER */}

        <div className="form-group">

          <input
            type="number"
            placeholder="Semester"
            name="semester"
            value={studentData.semester}
            onChange={handleChange}
          />

        </div>

        {/* BUTTON */}

        <button
          className="btn"
          onClick={addStudent}
        >

          Add Student

        </button>

      </div>

      {/* STUDENTS TABLE */}

      <div className="card">

        <h2>
          Students List
        </h2>

        <table className="table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Department</th>

              <th>Semester</th>

            </tr>

          </thead>

          <tbody>

            {
              students &&
              students.length > 0 ? (

                students.map(
                  (student) => (

                  <tr
                    key={
                      student.studentId
                    }
                  >

                    <td>
                      {
                        student.studentId
                      }
                    </td>

                    <td>
                      {
                        student.name
                      }
                    </td>

                    <td>
                      {
                        student.email
                      }
                    </td>

                    <td>
                      {
                        student.department
                      }
                    </td>

                    <td>
                      {
                        student.semester
                      }
                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td colSpan="5">

                    No Students Found

                  </td>

                </tr>
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;
