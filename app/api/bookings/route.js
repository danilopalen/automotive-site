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

function generateICSFile(booking) {
  // const dateAndTime = booking.date.replace("00:00:00", `${booking.time}:00`);
  // Parse the date (2025-06-23)
  const [year, month, day] = booking.date.split("-").map(Number);

  // Parse the time (02:30pm)
  const timeRegex = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i;
  const timeMatch = booking.time.toLowerCase().match(timeRegex);

  if (!timeMatch) {
    throw new Error('Invalid time format. Use format like "02:30pm"');
  }

  let hours = parseInt(timeMatch[1]);
  const minutes = parseInt(timeMatch[2]);
  const period = timeMatch[3];

  // Convert to 24-hour format
  if (period === "pm" && hours !== 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  // Create the date in New Zealand timezone
  const eventStart = new Date(year, month - 1, day, hours, minutes, 0);
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000); // 1 hour duration

  const calendar = ical({
    domain: "zipangautomotive.co.nz",
    name: "Booking with Zipang Automotive",
    // timezone: "Pacific/Auckland",
  });

  calendar.createEvent({
    start: eventStart,
    end: eventEnd,
    summary: `${booking.service} with Zipang Automotive`,
    description: `${booking.service} booking for ${booking.firstName}`,
    location: "8/74 Westpoint Drive. Hobsonville Auckland 0618",
    uid: `${Date.now()}@zipangautomotive.co.nz`,
    // timezone: "Pacific/Auckland", // Key point for NZ timezone
    organizer: {
      name: "Zipang Automotive",
      email: process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS,
    },
    url: "https://zipangautomotive.co.nz/",
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
