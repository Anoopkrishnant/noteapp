"use client";

import React, { useState } from "react";
import Image from "next/image";
import "@/app/register/Register.css";
import {toast} from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Registration successful!");
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrap">
        {/* Left Side */}
        <div className="register-left">
          <div className="logo">
            <Image
              src="/half-moon.png"
              alt="Logo"
              width={80}
              height={80}
              className="logo-img"
            />
            <h2>Keep Notes</h2>
            <p>India’s widely used notes app</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="register-right">
          <div className="register-box">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Username</label>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Email</label>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Password</label>
              </div>

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;