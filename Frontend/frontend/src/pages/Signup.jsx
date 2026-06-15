import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("STUDENT");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:8081/auth/signup",

        {
          username,
          password,
          role
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert("Signup Failed");
    }
  };

  return (

    <div className="login-container">

      <form
        className="login-box"
        onSubmit={handleSignup}
      >

        <h1>
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option value="STUDENT">
            Student
          </option>

          <option value="ADMIN">
            Faculty/Admin
          </option>

        </select>

        <button type="submit">

          Signup

        </button>

        <p>

          Already have account?

          <span
            onClick={() =>
              navigate("/login")
            }
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px"
            }}
          >
            Login
          </span>

        </p>

      </form>

    </div>
  );
}

export default Signup;