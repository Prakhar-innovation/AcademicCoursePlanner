// src/pages/Courses.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const [courses, setCourses] = useState([]);

  const [courseData, setCourseData] = useState({
    courseCode: "",
    courseName: "",
    credits: "",
    department: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/courses/all"
      );

      setCourses(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const addCourse = async () => {

    try {

      await axios.post(
        "http://localhost:8000/courses/add",
        courseData
      );

      alert("Course Added Successfully");

      fetchCourses();

      setCourseData({
        courseCode: "",
        courseName: "",
        credits: "",
        department: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>

      <div className="card">

        <h2>Add Course</h2>

        <div className="form-group">

          <input
            type="text"
            placeholder="Course Code"
            name="courseCode"
            value={courseData.courseCode}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <input
            type="text"
            placeholder="Course Name"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <input
            type="number"
            placeholder="Credits"
            name="credits"
            value={courseData.credits}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <input
            type="text"
            placeholder="Department"
            name="department"
            value={courseData.department}
            onChange={handleChange}
          />

        </div>

        <button className="btn" onClick={addCourse}>
          Add Course
        </button>

      </div>

      <div className="card">

        <h2>Courses List</h2>

        <table className="table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Department</th>
            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr key={course.courseId}>

                <td>{course.courseId}</td>

                <td>{course.courseCode}</td>

                <td>{course.courseName}</td>

                <td>{course.credits}</td>

                <td>{course.department}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Courses;