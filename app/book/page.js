"use client";
import React, { useState } from "react";
import logo from "../../public/photos/zipangautomotive.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: "WOF",
      name: "WOF",
      price: "$50 + GST",
    },
    {
      id: "Service",
      name: "Service",
      price: "TBA",
    },
    {
      id: "Full Service",
      name: "Full Service",
      price: "TBA",
    },
    {
      id: "Repair",
      name: "Repair",
      price: "TBA",
    },
    {
      id: "Tyre Replacement",
      name: "Tyre Replacement",
      price: "TBA",
    },
    {
      id: "Puncture Repair",
      name: "Puncture Repair",
      price: "TBA",
    },
    {
      id: "Diagnosis",
      name: "Diagnosis",
      price: "TBA",
    },
  ];

  const timeSlots = [
    "08:30am",
    "09:30am",
    "10:30am",
    "11:30am",
    "12:30pm",
    "01:30pm",
    "02:30pm",
    "03:30pm",
    "04:30pm",
    "05:30pm",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Booking submitted:", formData);
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("🚀 ~ handleSubmit ~ email sent:");
        } else {
          throw new Error(data.message || "Failed to process booking");
        }
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Booking Confirmed!</h2>
          <p style={styles.successMessage}>
            {`Thank you for your booking. We'll send you a confirmation email
            shortly.`}
          </p>
          <div style={styles.bookingDetails}>
            <h3>Booking Details:</h3>
            <p>
              <strong>Service:</strong>{" "}
              {services.find((s) => s.id === formData.service)?.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(formData.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="bookingCard" style={styles.bookingCard}>
        <div style={styles.header}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "rgba(35, 31, 32, 1)",
              marginBottom: "1rem",
              fontFamily: "Oswald",
            }}
          >
            BOOKING
          </h2>
        </div>

        <div style={styles.form}>
          {/* Service Selection */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Select Service</h3>
            <div style={styles.serviceGrid}>
              {services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    ...styles.serviceCard,
                    ...(formData.service === service.id
                      ? styles.serviceCardSelected
                      : {}),
                  }}
                  onClick={() =>
                    handleInputChange({
                      target: { name: "service", value: service.id },
                    })
                  }
                >
                  <h4 style={styles.serviceName}>{service.name}</h4>
                  <p style={styles.servicePrice}>{service.price}</p>
                </div>
              ))}
            </div>
            {errors.service && (
              <span style={styles.errorText}>{errors.service}</span>
            )}
          </div>

          {/* Date & Time Selection */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Preferred Date & Time</h3>
            <div style={styles.dateTimeRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  style={{
                    ...styles.input,
                    ...(errors.date ? styles.inputError : {}),
                  }}
                />
                {errors.date && (
                  <span style={styles.errorText}>{errors.date}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.time ? styles.inputError : {}),
                  }}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <span style={styles.errorText}>{errors.time}</span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.nameRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.firstName ? styles.inputError : {}),
                  }}
                />
                {errors.firstName && (
                  <span style={styles.errorText}>{errors.firstName}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.lastName ? styles.inputError : {}),
                  }}
                />
                {errors.lastName && (
                  <span style={styles.errorText}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
              />
              {errors.email && (
                <span style={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  ...styles.input,
                  ...(errors.phone ? styles.inputError : {}),
                }}
              />
              {errors.phone && (
                <span style={styles.errorText}>{errors.phone}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Additional Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                style={styles.textarea}
                placeholder="Any specific requirements or questions..."
              />
            </div>
          </div>

          <button type="button" style={styles.submitBtn} onClick={handleSubmit}>
            SEND
          </button>
        </div>
      </div>
      <style>
        {`
        ::-webkit-calendar-picker-indicator {
            filter: invert(1)
            brightness(50%)
            sepia(100%)
            saturate(10000%)
            hue-rotate(180deg)
        }

        @media (max-width: 768px) {
          .bookingCard {
            padding: 0 !important
          }
        }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    background: "#EEEEEE",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
  },
  bookingCard: {
    padding: "40px",
    maxWidth: "800px",
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    color: "#231F20",
    margin: "0 0 10px 0",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#231F20",
    margin: 0,
    fontWeight: "600",
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  serviceCard: {
    border: "2px solid #fff",
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  serviceCardSelected: {
    border: "2px solid #231F20",
    transform: "translateY(-2px)",
  },
  serviceName: {
    fontSize: "18px",
    color: "#231F20",
    margin: "0 0 8px 0",
    fontWeight: "600",
  },
  serviceDuration: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 8px 0",
  },
  servicePrice: {
    fontSize: "16px",
    color: "rgb(35, 31, 32)",
    margin: 0,
    fontWeight: "600",
  },
  dateTimeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  nameRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  label: {
    fontSize: "14px",
    color: "#231F20",
    fontWeight: "500",
  },
  input: {
    padding: "12px 16px",
    border: "none",
    fontFamily: "Inter",
    fontSize: "16px",
    transition: "border-color 0.2s ease",
    outline: "none",
    background: "#fff",
    color: "#231F20",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  textarea: {
    padding: "12px 16px",
    border: "none",
    fontSize: "16px",
    transition: "border-color 0.2s ease",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    background: "#fff",
    color: "#231F20",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "14px",
  },
  submitBtn: {
    fontFamily: "Oswald",
    backgroundColor: "#231F20",
    color: "#fff",
    border: "none",
    padding: "16px 32px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "20px",
  },
  successCard: {
    backgroundColor: "#EEEEE",
    padding: "60px 40px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    color: "white",
    margin: "0 auto 24px auto",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: "28px",
    color: "#231F20",
    margin: "0 0 16px 0",
    fontWeight: "700",
    color: "rgba(35, 31, 32, 1)",
    fontFamily: "Oswald",
  },
  successMessage: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 32px 0",
    fontFamily: "Inter",
    lineHeight: "1.5",
  },
  bookingDetails: {
    backgroundColor: "#EEEE",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    textAlign: "left",
    fontFamily: "Inter",
    color: "#231F20",
  },
  newBookingBtn: {
    backgroundColor: "#231F20",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
