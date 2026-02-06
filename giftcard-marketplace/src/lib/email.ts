import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "NovaCard <noreply@novacard.com>";

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
) {
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Reset your NovaCard password",
    html: `
      <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h2 style="color:#0f172a;font-size:22px;margin:0 0 12px">Password reset</h2>
        <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 24px">
          We received a request to reset your NovaCard account password.
          Click the button below to choose a new password. This link expires in 30 minutes.
        </p>
        <a href="${resetUrl}"
           style="display:inline-block;background:#0f172a;color:#fff;padding:12px 28px;border-radius:9999px;font-size:14px;font-weight:600;text-decoration:none">
          Reset password
        </a>
        <p style="color:#94a3b8;font-size:12px;margin:24px 0 0">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send password reset email");
  }
}
