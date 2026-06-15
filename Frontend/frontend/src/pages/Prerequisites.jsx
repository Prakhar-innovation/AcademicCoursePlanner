// src/pages/Prerequisites.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function Prerequisites() {

  const [prerequisites, setPrerequisites] = useState([]);

  const [courses, setCourses] = useState([]);

  const [prerequisiteData, setPrerequisiteData] = useState({
    courseId: "",
    prerequisiteCourseId: ""
  });

  useEffect(() => {

    fetchPrerequisites();
    fetchCourses();

  }, []);

  const fetchPrerequisites = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/prerequisites/all"
      );

      setPrerequisites(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {

    const response = await axios.get(
      "http://localhost:8000/courses/all"
    );

    setCourses(response.data);
  };

  const handleChange = (e) => {

    setPrerequisiteData({
      ...prerequisiteData,
      [e.target.name]: e.target.value
    });
  };

  const addPrerequisite = async () => {

    const payload = {

      course: {
        courseId: prerequisiteData.courseId
      },

      prerequisiteCourse: {
        courseId: prerequisiteData.prerequisiteCourseId
      }
    };

    try {

      await axios.post(
        "http://localhost:8000/prerequisites/add",
        payload
      );

      alert("Prerequisite Added Successfully");

      fetchPrerequisites();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>

      <div className="card">

        <h2>Add Prerequisite</h2>

        <div className="form-group">

          <select
            name="courseId"
            onChange={handleChange}
          >

            <option>Select Course</option>

            {courses.map((course) => (

              <option
                key={course.courseId}
                value={course.courseId}
              >
                {course.courseName}
              </option>

            ))}

          </select>

        </div>

        <div className="form-group">

          <select
            name="prerequisiteCourseId"
            onChange={handleChange}
          >

            <option>Select Prerequisite Course</option>

            {courses.map((course) => (

              <option
                key={course.courseId}
                value={course.courseId}
              >
                {course.courseName}
              </option>

            ))}

          </select>

        </div>

        <button className="btn" onClick={addPrerequisite}>
          Add Prerequisite
        </button>

      </div>

      <div className="card">

        <h2>Prerequisites List</h2>

        <table className="table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Prerequisite</th>
            </tr>

          </thead>

          <tbody>

            {prerequisites.map((item) => (

              <tr key={item.prerequisiteId}>

                <td>{item.prerequisiteId}</td>

                <td>{item.course?.courseName}</td>

                <td>{item.prerequisiteCourse?.courseName}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Prerequisites;