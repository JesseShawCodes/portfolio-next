import { Resend } from 'resend';
import ContactEmail from '../../emails/Contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO,
      subject: 'New message from your portfolio',
      react: <ContactEmail name={name} email={email} message={message} />,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
