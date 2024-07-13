"use server";
import transporter from "@/lib/nodemailer";

export async function sendSignupUserEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  console.log(`Sending email to ${email} with token ${token}`);

  await transporter.sendMail({
    from: `"Auth.js Tutorial" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="text-align: center; color: #3b82f6;">Auth.js Tutorial</h2>

      <p>Hi there,</p>

      <p>Please use the link below to verify your email address and continue on Auth.js Tutorial. This link will expire in 15 minutes. If you don't think you should be receiving this email, you can safely ignore it.</p>

      <p style="text-align: center;">
        <a href="http://localhost:3000/auth/signup/verify-email?token=${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #3b82f6; text-decoration: none; border-radius: 5px;">Verify Email</a>
      </p>
      
      <br />

      <p>You received this email because you signed up for Auth.js Tutorial.</p>

      <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; 2024 Auth.js Tutorial. All rights reserved.</p>
    </div>
    `,
  });

  console.log(`Email sent to ${email} with token ${token}`);
}
