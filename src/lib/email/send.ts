import { resend } from "@/lib/email/resend";
import { auditReadyEmail, intakeReceivedEmail } from "@/lib/email/templates";

const from = process.env.RESEND_FROM_EMAIL || "";
const supportEmail = process.env.SUPPORT_EMAIL || "";

export async function sendIntakeReceivedEmail(args: {
  to: string;
  productName: string | null;
  auditId: string;
  firstValueEvent: string;
  uploadRows: number;
}) {
  if (!process.env.RESEND_API_KEY || !from) return;

  const email = intakeReceivedEmail({
    productName: args.productName,
    auditId: args.auditId,
    firstValueEvent: args.firstValueEvent,
    uploadRows: args.uploadRows,
  });

  await resend.emails.send({
    from,
    to: [args.to],
    replyTo: supportEmail || undefined,
    subject: email.subject,
    html: email.html,
  });
}

export async function sendAuditReadyEmail(args: {
  to: string;
  productName: string | null;
  auditId: string;
  auditUrl: string;
}) {
  if (!process.env.RESEND_API_KEY || !from) return;

  const email = auditReadyEmail({
    productName: args.productName,
    auditId: args.auditId,
    auditUrl: args.auditUrl,
  });

  await resend.emails.send({
    from,
    to: [args.to],
    replyTo: supportEmail || undefined,
    subject: email.subject,
    html: email.html,
  });
}
