import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type SendEmailOptions = {
to: string | string[]
subject: string
html: string
replyTo?: string
}

export function normalizeSender(sender: string) {
return sender
.replace(/am\s*:\s*pm/gi, 'amtopm')
.replace(/amtopm/gi, 'amtopm')
}

export async function sendEmail({
to,
subject,
html,
replyTo,
}: SendEmailOptions) {
const from = process.env.RESEND_FROM_EMAIL

if (!from) {
throw new Error('RESEND_FROM_EMAIL is not configured.')
}

if (!process.env.RESEND_API_KEY) {
throw new Error('RESEND_API_KEY is not configured.')
}

const { data, error } = await resend.emails.send({
from: normalizeSender(from),
to,
subject,
html,
...(replyTo ? { replyTo } : {}),
})

if (error) {
console.error('Resend error:', error)
throw new Error(error.message)
}

return data
}
