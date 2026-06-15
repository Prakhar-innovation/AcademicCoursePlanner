// src/pages/Login.jsx

import { useState } from "react";

import apiClient from "../api/apiClient";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await apiClient.post(
        "/auth/login",
        {
          username,
          password
        }
      );

      // STORE JWT TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // STORE ROLE
      localStorage.setItem(
        "role",
        response.data.role
      );

      // STORE USERNAME
      localStorage.setItem(
        "username",
        username
      );

      alert("Login Successful");

      // ROLE BASED REDIRECT
      if (response.data.role === "STUDENT") {

        navigate("/student-dashboard");

      } else {

        navigate("/tasks-dashboard");
      }

    } catch (error) {

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="login-container">

      <form
        className="login-box"
        onSubmit={handleLogin}
      >

        <h1>
          Academic Planner Login
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

        <button type="submit">

          Login

        </button>

        <p>

          Don't have account?

          <span
            onClick={() =>
              navigate("/signup")
            }
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px"
            }}
          >
            Signup
          </span>

        </p>

      </form>

    </div>
  );
}

export default Login;
