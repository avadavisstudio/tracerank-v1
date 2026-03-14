export function intakeReceivedEmail(args: {
  productName: string | null;
  auditId: string;
  firstValueEvent: string;
  uploadRows: number;
}) {
  const productName = args.productName || "Untitled Product";

  return {
    subject: `TraceRank intake received — ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h1 style="font-size: 22px; margin-bottom: 16px;">TraceRank intake received</h1>
        <p>Your paid audit intake has been received and stored.</p>

        <p><strong>Audit ID:</strong> ${args.auditId}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>First value event:</strong> ${args.firstValueEvent}</p>
        <p><strong>Rows uploaded:</strong> ${args.uploadRows}</p>

        <p>You will receive a follow-up email when the audit result is ready.</p>
      </div>
    `,
  };
}

export function auditReadyEmail(args: {
  productName: string | null;
  auditId: string;
  auditUrl: string;
}) {
  const productName = args.productName || "Untitled Product";

  return {
    subject: `TraceRank audit ready — ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h1 style="font-size: 22px; margin-bottom: 16px;">Your TraceRank audit is ready</h1>
        <p>Your audit has been processed and is now available.</p>

        <p><strong>Audit ID:</strong> ${args.auditId}</p>
        <p><strong>Product:</strong> ${productName}</p>

        <p>
          <a href="${args.auditUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:999px;">
            View audit
          </a>
        </p>
      </div>
    `,
  };
}
