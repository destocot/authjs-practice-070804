"use server";
import transporter from "@/lib/nodemailer";

export async function sendForgotPasswordEmail({
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
    subject: "Reset your password",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="text-align: center; color: #eab308;">Auth.js Tutorial</h2>

      <p>Hi there,</p>

      <p>Please use the link below to access the forgot password form on Auth.js Tutorial. This link will expire in 15 minutes. If you don't think you should be receiving this email, you can safely ignore it.</p>

      <p style="text-align: center;">
        <a href="http://localhost:3000/auth/signin/forgot-password?token=${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #eab308; text-decoration: none; border-radius: 5px;">Forgot Password Form</a>
      </p>
      
      <br />

      <p>You received this email because you sent a forgot password request for Auth.js Tutorial.</p>

      <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; 2024 Auth.js Tutorial. All rights reserved.</p>
    </div>
    `,
  });

  console.log(`Email sent to ${email} with token ${token}`);
}
