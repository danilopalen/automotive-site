import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";
import { writeBlockedDatesData } from "../firebase";
const blockedDatesRef = ref(db, "blockedDates/");

const DateSubmissionForm = () => {
  const [date, setDate] = useState("");
  const [submittedDates, setSubmittedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Simulate fetching data from a database on component mount
  useEffect(() => {
    fetchDates();
  }, []);

  // Simulated database function to fetch dates
  const fetchDates = () => {
    setLoading(true);

    onValue(blockedDatesRef, (snapshot) => {
      const arr = [];
      const values = snapshot.val();
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          const element = values[key];
          arr.push({ ...element, id: key });
        }
      }
      console.log("🚀 ~ onValue ~ arr:", arr);
      setSubmittedDates(arr);
      setLoading(false);
    });
  };

  // Simulated database function to save a new date
  const saveDate = (newDate) => {
    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      const newDateEntry = {
        id: submittedDates.length + 1,
        date: newDate,
      };

      const transaction_id = Date.now();
      writeBlockedDatesData(newDateEntry, transaction_id);

      //   setSubmittedDates([...submittedDates, newDateEntry]);
      setLoading(false);
      setSuccessMessage("Date successfully added to the database!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!date) {
      setError("Please select a date");
      return;
    }

    // Save the date to our simulated database
    saveDate(date);

    // Reset form
    setDate("");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // CSS styles
  // Function to delete a date
  const deleteDate = (id) => {
    if (window.confirm("Are you sure you want to delete this date?")) {
      setLoading(true);
      const blockedDateRef = ref(db, "blockedDates/" + id);
      remove(blockedDateRef).then(async () => {
        setSubmittedDates(submittedDates.filter((date) => date.id !== id));
        setLoading(false);
        setSuccessMessage("Date successfully deleted!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      });
    }
  };

  const styles = {
    container: {
      width: "100%",
      margin: "50px 0 0 0",
      backgroundColor: "#ffffff",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "24px",
      textAlign: "center",
      color: "#333333",
    },
    form: {
      marginBottom: "24px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "4px",
      color: "#555555",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #cccccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    error: {
      marginTop: "4px",
      fontSize: "14px",
      color: "#dc3545",
    },
    button: {
      width: "100%",
      backgroundColor: "#0066cc",
      color: "white",
      padding: "10px 16px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    buttonDisabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    },
    successMessage: {
      marginTop: "12px",
      padding: "8px",
      backgroundColor: "#d4edda",
      color: "#155724",
      borderRadius: "4px",
      fontSize: "14px",
      textAlign: "center",
    },
    sectionHeader: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#444444",
    },
    loadingText: {
      textAlign: "center",
      color: "#777777",
    },
    emptyText: {
      textAlign: "center",
      color: "#777777",
    },
    dateList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    scrollableContainer: {
      maxHeight: "300px",
      overflowY: "auto",
      border: "1px solid #eeeeee",
      borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    dateItem: {
      padding: "12px",
      borderBottom: "1px solid #eeeeee",
    },
    dateItemContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateLabel: {
      fontWeight: "500",
      color: "rgb(85, 85, 85)",
    },
    dateCreated: {
      fontSize: "14px",
      color: "#777777",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: "pointer",
      fontSize: "12px",
      marginLeft: "8px",
    },
    dateAndControls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ width: "400px" }}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="date" style={styles.label}>
              Select a Date to block
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Submitting..." : "Block Date"}
          </button>

          {successMessage && (
            <div style={styles.successMessage}>{successMessage}</div>
          )}
        </form>
      </div>
      <div>
        <h3 style={styles.sectionHeader}>Blocked Dates</h3>
        {loading && submittedDates.length === 0 ? (
          <p style={styles.loadingText}>Loading dates...</p>
        ) : submittedDates.length > 0 ? (
          <div style={styles.scrollableContainer}>
            <ul style={styles.dateList}>
              {submittedDates.map((item) => (
                <li key={item.id} style={styles.dateItem}>
                  <div style={styles.dateItemContent}>
                    <div style={styles.dateAndControls}>
                      <span style={styles.dateLabel}>
                        {formatDate(item.date)}
                      </span>
                      <div>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteDate(item.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={styles.emptyText}>No dates have been submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default DateSubmissionForm;
