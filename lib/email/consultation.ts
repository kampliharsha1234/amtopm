import { sendEmail } from './index'

export type ConsultationData = {
  name: string
  email: string
  phone: string
  concern: string
  contactMethod?: string
  message?: string
}

export async function sendConsultationEmail(
  data: ConsultationData
) {
  return sendEmail({
    replyTo: data.email,

    subject: `New Free Consultation Request — ${data.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6;">

        <h2>New Free Consultation Request</h2>

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
          <strong>Phone</strong><br />
          ${escapeHtml(data.phone)}
        </p>

        <p>
          <strong>Skin Concern</strong><br />
          ${escapeHtml(data.concern)}
        </p>

        <p>
          <strong>Preferred Contact Method</strong><br />
          ${escapeHtml(data.contactMethod || 'Not specified')}
        </p>

        <p>
          <strong>Additional Information</strong><br />
          ${
            data.message
              ? escapeHtml(data.message).replace(/\n/g, '<br />')
              : 'None provided.'
          }
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