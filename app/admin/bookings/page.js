"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, onValue, remove } from "firebase/database";
import { app, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DateSubmissionForm from "@/app/_components/DateSubmissionForm";
// const bookingCountRef = ref(db, "bookings/");
const auth = getAuth(app);
const BookingsPage = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        router.push(`/admin`);
      }
    });
  }, []);

  // useEffect(() => {
  //   onValue(bookingCountRef, (snapshot) => {
  //     const arr = [];
  //     const values = snapshot.val();
  //     for (const key in values) {
  //       if (Object.prototype.hasOwnProperty.call(values, key)) {
  //         const element = values[key];
  //         arr.push({ ...element, id: key });
  //       }
  //     }
  //     setBookings(arr);
  //   });
  // }, []);

  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#fff",
      margin: "0 auto",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      color: "#333",
      margin: 0,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#f8f9fa",
      padding: "12px 15px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: "600",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "14px",
      color: "#555",
    },
    logoutButton: {
      backgroundColor: "#4A90E2",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    searchContainer: {
      marginBottom: "20px",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #dee2e6",
      borderRadius: "4px",
      width: "300px",
      fontSize: "14px",
    },
    noBookings: {
      textAlign: "center",
      padding: "20px",
      color: "#666",
    },
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const bookingRef = ref(db, "bookings/" + id);
      remove(bookingRef).then(async () => {
        setBookings(bookings.filter((booking) => booking.id !== id));
        const bookingData = bookings.find((booking) => booking.id === id);
        const date = new Date(
          bookingData.date.replace("00:00:00", `${bookingData.time}:00`)
        ).toLocaleString("en-NZ", {
          timeZone: "Pacific/Auckland",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
        const cancelData = {
          service: bookingData.service,
          date,
          name: bookingData.name,
          email: bookingData.email,
        };
        try {
          const response = await fetch("/api/cancel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cancelData),
          });

          const data = await response.json();

          if (response.ok) {
            setEmailSent(true);
          } else {
            throw new Error(data.message || "Failed to send cancel request");
          }
        } catch (error) {
          console.log("🚀 ~ handleSubmit ~ error:", error.message);
        }
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bookings Management</h1>
        <button
          style={styles.logoutButton}
          onClick={() => auth.signOut().then(() => router.push("/"))}
        >
          Log out
        </button>
      </div>

      {/* {bookings.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={styles.td}>{booking.name}</td>
                <td style={styles.td}>
                  {new Date(
                    booking.date.replace("00:00:00", `${booking.time}:00`)
                  ).toLocaleString("en-NZ", {
                    timeZone: "Pacific/Auckland",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </td>
                <td style={styles.td}>{booking.service}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(booking.id)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#c82333")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.noBookings}>No bookings found</div>
      )} */}

      <DateSubmissionForm />
    </div>
  );
};

export default BookingsPage;
