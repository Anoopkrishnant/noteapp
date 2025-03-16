"use client";

import "@/app/login/Login.css";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    });

    if (response?.error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } else {
      router.push("/home"); 
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrap">
        <div className="login-left">
          <div className="logo">
            <Image src="/half-moon.png" alt="Logo" width={80} height={80} className="logo-img" />
            <h2>Keep Notes</h2>
            <p>India’s widely used notes app</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-box">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" name="email" placeholder=" " required />
                <label>Enter your email</label>
              </div>
              <div className="input-group">
                <input type="password" name="password" placeholder=" " required />
                <label>Enter your password</label>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="forgot-password">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
