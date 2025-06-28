// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import ical from "ical-generator";
import nodemailer from "nodemailer";
import moment from "moment-timezone";

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
      Location: 8/74 Westpoint Drive. Hobsonville Auckland 0618
      Email: ${booking.email}
      Phone number: ${booking.phone}
      Vehicle make: ${booking.make}
      Vehicle model: ${booking.model}
      Vehicle registration: ${booking.rego}
      Notes: ${booking.notes}


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
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone number:</strong> ${booking.phone}</p>
          <p><strong>Vehicle make:</strong> ${booking.make}</p>
          <p><strong>Vehicle model:</strong> ${booking.model}</p>
          <p><strong>Vehicle registration:</strong> ${booking.rego}</p>
          <p><strong>Notes:</strong> ${booking.notes || ""}</p>
        </div>

        <p>Best regards,<br>Zipang Automotive</p>
      </div>
    `,
  };
}
// Function to add event with correct Auckland time
function addAucklandEvent(options) {
  const { date, startTime, endTime, duration = 1 } = options;

  // Parse time in format like "09:30am" or "02:00pm"
  function parseTime(timeStr) {
    const match = timeStr.toLowerCase().match(/^(\d{1,2}):(\d{2})(am|pm)$/);

    if (!match) {
      throw new Error(
        `Invalid time format: ${timeStr}. Expected format: 09:30am or 02:00pm`
      );
    }

    let [, hoursStr, minutesStr, period] = match;
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    // Convert to 24-hour format
    if (period === "pm" && hours !== 12) {
      hours += 12;
    } else if (period === "am" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  const startTimeParsed = parseTime(startTime);
  const [year, month, day] = date.split("-").map(Number);

  // Create dates as Auckland local time
  // This approach treats the input as local Auckland time
  const startDate = new Date(
    year,
    month - 1,
    day,
    startTimeParsed.hours,
    startTimeParsed.minutes,
    0,
    0
  );
  const endDate = new Date(
    year,
    month - 1,
    day,
    startTimeParsed.hours + duration,
    startTimeParsed.minutes,
    0,
    0
  );

  return {
    eventStart: moment(startDate).tz("Pacific/Auckland").toDate(),
    eventEnd: moment(endDate).tz("Pacific/Auckland").toDate(),
  };
}

function generateICSFile(booking) {
  const { eventStart, eventEnd } = addAucklandEvent({
    date: booking.date,
    startTime: booking.time,
  });

  const calendar = ical({
    domain: "zipangautomotive.co.nz",
    name: "Booking with Zipang Automotive",
    timezone: "Pacific/Auckland",
    method: "PUBLISH",
    prodId: {
      company: "Zipang Automotive",
      product: "Booking",
    },
  });

  calendar.createEvent({
    start: eventStart,
    end: eventEnd,
    summary: `${booking.service} with Zipang Automotive`,
    description: `${booking.service} booking for ${booking.firstName}`,
    location: "8/74 Westpoint Drive. Hobsonville Auckland 0618",
    uid: `${Date.now()}@zipangautomotive.co.nz`,
    timezone: "Pacific/Auckland", // Key point for NZ timezone,
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
