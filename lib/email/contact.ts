import { sendEmail } from './index'

export type ContactData = {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(
  data: ContactData
) {
  return sendEmail({
    replyTo: data.email,

    subject: `AM:PM Support Message — ${data.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6;">

        <h2>New AM:PM Support Message</h2>

        <hr style="border: none; border-top: 1px solid #E8DFD3;" />

        <p>
          <strong>Name</strong><br />
          ${escapeHtml(data.name)}
        </p>

        <p>
          <strong>Email</strong><br />
          ${escapeHtml(data.email)}
        </p>

        <p>
          <strong>Message</strong><br />
          ${escapeHtml(data.message).replace(/\n/g, '<br />')}
        </p>

      </div>
    `,
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}