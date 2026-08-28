import { sendEmail } from './index'

export type NewsletterData = {
  email: string
}

export async function sendNewsletterEmail(
  data: NewsletterData
) {
  return sendEmail({
    replyTo: data.email,

    subject: 'New AM:PM Newsletter Subscriber',

    html: `
      <div style="font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6;">

        <h2>New Newsletter Subscriber</h2>

        <hr style="border: none; border-top: 1px solid #E8DFD3;" />

        <p>
          <strong>Email</strong><br />
          ${escapeHtml(data.email)}
        </p>

        <p>
          A new subscriber joined through the AM:PM website.
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