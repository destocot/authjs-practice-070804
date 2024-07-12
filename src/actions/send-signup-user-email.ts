"use server";
import transporter from "@/lib/nodemailer";

export async function sendSignupUserEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  try {
    console.log(`Sending email to ${email} with token ${token}`);

    await transporter.sendMail({
      from: `"Auth.js Tutorial" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
      to: email,
      subject: "Verify your email address",
      html: `
    <div>
    <p>Hi there,</p>
    <p>Please use the link below to verify your email address and continue on Auth.js Tutorial. This link will expire in 15 minutes. If you don't think you should be receiving this email, you can safely ignore it.</p>
    
    <a href="http://localhost:3000/auth/signup/verify-email?token=${token}">Verify Email</a>

    <br />
    <p>You received this email because you signed up for Auth.js Tutorial.</p>
    </div>
    `,
    });

    console.log(`Email sent to ${email} with token ${token}`);
  } catch (err) {
    console.error(err);
  }
}
