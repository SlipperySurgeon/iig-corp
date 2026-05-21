import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/links";

const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, organization, email, phone, message } = body;
  if (!name || !organization || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: `IIG Website <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      subject: `New Inquiry — ${organization}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Organization:</strong> ${escape(organization)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Phone:</strong> ${escape(phone || "Not provided")}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escape(message).replace(/\n/g, "<br />")}</p>
      `,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
