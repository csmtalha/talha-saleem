import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message, recaptchaToken } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  // Verify reCAPTCHA
  if (!recaptchaToken) {
    return NextResponse.json({ error: "Please complete the reCAPTCHA." }, { status: 400 });
  }

  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const recaptchaData = await recaptchaRes.json();

  if (!recaptchaData.success) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const emailSubject = subject?.trim() || `New message from ${name}`;

  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error("SMTP verify failed:", verifyErr);
    return NextResponse.json({ error: "SMTP connection failed. Please try again later." }, { status: 500 });
  }

  try {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Portfolio] ${emailSubject}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #a855f7); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
            ${subject ? `<tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Subject</td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px;">
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message</p>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; color: #111827; line-height: 1.6;">
              ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>
        </div>
      </div>
    `,
  });

    return NextResponse.json({ success: true });
  } catch (sendErr) {
    console.error("sendMail failed:", sendErr);
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}
