"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        router.push(`/admin/bookings`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    formContainer: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      margin: "20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      color: "#333",
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#666",
      fontSize: "0.9rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      color: "#555",
      fontSize: "0.9rem",
    },
    input: {
      padding: "0.8rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "border-color 0.2s",
      outline: "none",
      background: "#fff",
      color: "#000",
    },
    focusedInput: {
      borderColor: "#4A90E2",
    },
    button: {
      backgroundColor: "#4A90E2",
      color: "white",
      padding: "0.8rem",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    buttonHover: {
      backgroundColor: "#357ABD",
    },
    forgotPassword: {
      textAlign: "center",
      marginTop: "1rem",
    },
    link: {
      color: "#4A90E2",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Hello 👋👋👋</h1>
          <p style={styles.subtitle}>Please log in to your account</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              onFocus={(e) => (e.target.style.borderColor = "#4A90E2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
              onFocus={(e) => (e.target.style.borderColor = "#4A90E2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ABD")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4A90E2")}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
