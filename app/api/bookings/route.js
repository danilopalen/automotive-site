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
      Date: ${new Date(booking.date).toLocaleDateString()}
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
          <p><strong>Date:</strong> ${new Date(
            booking.date
          ).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
        </div>

        <p>Best regards,<br>Zipang Automotive</p>
      </div>
    `,
  };
}

function generateICSFile(booking) {
  const calendar = ical({ name: "Lesson Booking" });
  const dateAndTime = booking.date.replace("00:00:00", `${booking.time}:00`);
  const startDate = new Date(`${dateAndTime}`);
  const endDate = new Date(
    startDate.getTime() + (booking.duration || 60) * 60000
  );

  calendar.createEvent({
    start: startDate,
    end: endDate,
    summary: `${booking.service} with Yuta`,
    description: `Lesson booking for ${booking.name}`,
    location: booking.location,
    timezone: "Pacific/Auckland", // Key point for NZ timezone
    organizer: {
      name: "Learning Center",
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
          filename: "lesson-booking.ics",
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
