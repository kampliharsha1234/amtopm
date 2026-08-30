import { sendEmail } from './sendEmail'

type NewsletterData = {
email: string
}

export async function sendNewsletterEmail({ email }: NewsletterData) {
const contactEmail = process.env.CONTACT_EMAIL

if (!contactEmail) {
throw new Error('CONTACT_EMAIL is not configured.')
}

await sendEmail({
to: contactEmail,
subject: 'New amtopm Newsletter Subscription',
replyTo: email,
html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #171717;"> <h2 style="margin-bottom: 24px;">
New Newsletter Subscriber </h2>


    <p style="margin-bottom: 8px;">
      A new visitor has subscribed to the amtopm newsletter.
    </p>

    <div style="margin-top: 24px; padding: 20px; background: #F5F1E9; border-radius: 8px;">
      <p style="margin: 0 0 8px;">
        <strong>Email:</strong> ${email}
      </p>
    </div>

    <p style="margin-top: 24px; color: #6B6B6B; font-size: 13px;">
      This subscription was submitted through the amtopm website.
    </p>
  </div>
`,


})
}
