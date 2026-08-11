import { resendAdapter } from "@payloadcms/email-resend";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

/**
 * Email transport, chosen from whichever credentials are present.
 *
 *   RESEND_API_KEY                  → Resend
 *   SMTP_HOST + SMTP_USER + SMTP_PASS → SMTP (Brevo, Postmark, anything)
 *   neither                         → undefined
 *
 * Returning undefined leaves Payload's default behaviour in place, which
 * writes the message to the server console. That is what you want locally;
 * it is emphatically not what you want in production, where a contact form
 * would silently go nowhere — so check the log line on first deploy.
 */
export function emailAdapter() {
  const from = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME || "Hause Interiors";

  if (process.env.RESEND_API_KEY) {
    if (!from) {
      console.warn("[email] RESEND_API_KEY set but EMAIL_FROM missing — falling back to console.");
      return undefined;
    }
    return resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: from,
      defaultFromName: fromName,
    });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    if (!from) {
      console.warn("[email] SMTP credentials set but EMAIL_FROM missing — falling back to console.");
      return undefined;
    }
    return nodemailerAdapter({
      defaultFromAddress: from,
      defaultFromName: fromName,
      transportOptions: {
        host: SMTP_HOST,
        // Brevo is 587 with STARTTLS; 465 is implicit TLS.
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      },
    });
  }

  return undefined;
}

/** Where enquiry notifications go. Falls back to the sender address. */
export function enquiryRecipient(): string | undefined {
  return process.env.ENQUIRY_NOTIFY_TO || process.env.EMAIL_FROM;
}
