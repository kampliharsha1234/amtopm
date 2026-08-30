import { sendEmail } from './sendEmail'

type ConsultationData = {
name: string
phone: string
email: string
age: number
gender: string
problem: string
description: string
}

function escapeHtml(value: string) {
return value
.replace(/&/g, '&')
.replace(/</g, '<')
.replace(/>/g, '>')
.replace(/"/g, '"')
.replace(/'/g, ''
    
)
}

export async function sendConsultationEmails(data: ConsultationData) {
const contactEmail = process.env.CONTACT_EMAIL

if (!contactEmail) {
throw new Error('CONTACT_EMAIL is not configured.')
}

const name = escapeHtml(data.name)
const phone = escapeHtml(data.phone)
const email = escapeHtml(data.email)
const age = escapeHtml(String(data.age))
const gender = escapeHtml(data.gender)
const problem = escapeHtml(data.problem)
const description = escapeHtml(data.description).replace(/\n/g, '<br />')

// Email to amtopm
await sendEmail({
to: contactEmail,
subject: `New Consultation Request — ${data.name}`,
replyTo: data.email,
html: ` <!DOCTYPE html> <html> <body style="margin:0;padding:0;background:#F5F1E9;font-family:Arial,sans-serif;color:#171717;"> <div style="max-width:680px;margin:40px auto;background:#FBF8F3;border:1px solid #E8DFD3;">


        <div style="padding:32px;border-bottom:1px solid #E8DFD3;">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#E85D2C;">
            amtopm
          </div>

          <h1 style="margin:16px 0 0;font-size:28px;font-weight:500;">
            New Consultation Request
          </h1>
        </div>

        <div style="padding:32px;">

          <table style="width:100%;border-collapse:collapse;font-size:14px;">

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;width:35%;border-bottom:1px solid #E8DFD3;">
                Name
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${name}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;border-bottom:1px solid #E8DFD3;">
                Phone
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${phone}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;border-bottom:1px solid #E8DFD3;">
                Email
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${email}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;border-bottom:1px solid #E8DFD3;">
                Age
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${age}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;border-bottom:1px solid #E8DFD3;">
                Gender
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${gender}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;color:#6B6B6B;border-bottom:1px solid #E8DFD3;">
                Problem
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #E8DFD3;">
                ${problem}
              </td>
            </tr>

          </table>

          <div style="margin-top:28px;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6B6B;">
              Customer Description
            </div>

            <div style="margin-top:10px;padding:18px;background:#F5F1E9;border-left:3px solid #E85D2C;font-size:14px;line-height:1.7;">
              ${description}
            </div>
          </div>

        </div>

        <div style="padding:20px 32px;border-top:1px solid #E8DFD3;font-size:11px;color:#8A8A8A;">
          amtopm Consultation System
        </div>

      </div>
    </body>
  </html>
`,


})

// Confirmation email to customer
await sendEmail({
to: data.email,
subject: 'We received your amtopm consultation request',
html: ` <!DOCTYPE html> <html> <body style="margin:0;padding:0;background:#F5F1E9;font-family:Arial,sans-serif;color:#171717;"> <div style="max-width:600px;margin:40px auto;background:#FBF8F3;border:1px solid #E8DFD3;">


        <div style="padding:36px 32px;border-bottom:1px solid #E8DFD3;">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#E85D2C;">
            amtopm
          </div>
        </div>

        <div style="padding:40px 32px;">

          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E85D2C;">
            CONSULTATION
          </div>

          <h1 style="margin:14px 0 0;font-size:30px;font-weight:500;line-height:1.2;">
            We&apos;ve received your request.
          </h1>

          <p style="margin:20px 0 0;font-size:14px;line-height:1.8;color:#3D3D3D;">
            Hi ${name},
          </p>

          <p style="margin:12px 0 0;font-size:14px;line-height:1.8;color:#3D3D3D;">
            Thank you for reaching out to amtopm. We&apos;ve received your
            consultation details and will review your request.
          </p>

          <p style="margin:12px 0 0;font-size:14px;line-height:1.8;color:#3D3D3D;">
            Our team will get back to you using the contact details
            provided.
          </p>

          <div style="margin-top:30px;width:48px;height:2px;background:#E85D2C;"></div>

          <p style="margin:30px 0 0;font-size:12px;line-height:1.7;color:#8A8A8A;">
            This is an automated confirmation from amtopm.
          </p>

        </div>

        <div style="padding:20px 32px;border-top:1px solid #E8DFD3;font-size:11px;color:#8A8A8A;">
          AM · PM · EVERY DAY
        </div>

      </div>
    </body>
  </html>
`,


})
}
