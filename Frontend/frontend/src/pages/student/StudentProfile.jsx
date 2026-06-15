import "./Student.css";

function StudentProfile() {

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  return (

    <div className="student-container">

      <h1>
        Student Profile
      </h1>

      <div className="student-card">

        <h2>
          {username}
        </h2>

        <p>
          Role: {role}
        </p>

        <p>
          Academic Planning System
        </p>

      </div>

    </div>
  );
}

export default StudentProfile;