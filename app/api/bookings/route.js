// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import ical from "ical-generator";
import nodemailer from "nodemailer";

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: 587,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

// Email template function
function generateEmailContent(booking) {
  return {
    subject: `Booking Confirmation - ${booking.service}`,
    text: `
      Dear ${booking.firstName},

      Thank you for your booking! Here are your booking details:

      Service: ${booking.service}
      Date: ${new Intl.DateTimeFormat("en-NZ", {
        dateStyle: "short",
      }).format(new Date(booking.date))}
      Time: ${booking.time}

      If you have any questions, please don't hesitate to reach out.

      Best regards,
      Zipang Automotive
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmation - ${booking.service}</h2>
        <p>Dear ${booking.firstName},</p>

        <p>Thank you for your booking! Here are your booking details:</p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date:</strong> ${new Intl.DateTimeFormat("en-NZ", {
            dateStyle: "short",
          }).format(new Date(booking.date))}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Location:</strong>8/74 Westpoint Drive. Hobsonville Auckland 0618</p>
        </div>

        <p>Best regards,<br>Zipang Automotive</p>
      </div>
    `,
  };
}

function convertTimeToDateString(dateString, timeString) {
  // Get the current date to combine with the time
  const now = new Date(dateString);

  // Parse the time string
  const [time, period] = timeString
    .replace("am", " am")
    .replace("pm", " pm")
    .split(" "); // Separates "10:30" and "am"
  let [hours, minutes] = time.split(":").map(Number); // Separates "10" and "30" and converts to numbers

  // Adjust hours for PM
  if (period.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }
  // Adjust hours for 12 AM (midnight)
  if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Set the hours and minutes on the current date object
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0); // Set seconds to 0 for consistency
  now.setMilliseconds(0); // Set milliseconds to 0 for consistency

  // Format the Date object into a desired string format
  // Example: "YYYY-MM-DDTHH:mm:ss.sssZ" (ISO 8601 format)
  const isoString = now.toISOString();

  // Example: "MM/DD/YYYY, HH:MM:SS AM/PM" (localized string)
  const localizedString = now.toLocaleString("en-NZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });

  return {
    dateObject: now,
    isoString: isoString,
    localizedString: localizedString,
  };
}

function generateICSFile(booking) {
  const calendar = ical({ name: "Booking with Zipang Automotive" });
  // const dateAndTime = booking.date.replace("00:00:00", `${booking.time}:00`);
  const startDate = convertTimeToDateString(
    booking.date,
    booking.time
  ).dateObject;
  const endDate = new Date(
    startDate.getTime() + (booking.duration || 60) * 60000
  );

  calendar.createEvent({
    start: startDate,
    end: endDate,
    summary: `${booking.service} with Zipang Automotive`,
    description: `${booking.service} booking for ${booking.firstName}`,
    location: "8/74 Westpoint Drive. Hobsonville Auckland 0618",
    timezone: "Pacific/Auckland", // Key point for NZ timezone
    organizer: {
      name: "Zipang Automotive",
      email: process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS,
    },
  });

  return calendar.toString();
}

// API route handler for booking
export async function POST(request) {
  try {
    const booking = await request.json();

    // Here you would typically validate the booking data
    // and save it to your database

    // Generate calendar invite
    const icsContent = generateICSFile(booking);

    // Generate and send email
    const emailContent = generateEmailContent(booking);

    const info = await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_EMAIL_FROM_NAME}" <${process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS}>`,
      to: booking.email,
      cc: process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: [
        {
          filename: "service-booking.ics",
          content: icsContent,
          contentType: "text/calendar",
        },
      ],
      alternatives: [
        {
          contentType: "text/calendar; method=REQUEST",
          content: icsContent,
        },
      ],
    });

    return NextResponse.json({
      message: "Booking confirmed and confirmation email sent",
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "Failed to process booking", error: error.message },
      { status: 500 }
    );
  }
}
