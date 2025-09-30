import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Confirmez votre adresse email - SantéConnect",
      html: `
        <h2>Bienvenue sur SantéConnect 👋</h2>
        <p>Merci de créer un compte. Pour finaliser votre inscription, veuillez confirmer votre adresse email :</p>
        <p><a href="${confirmUrl}" target="_blank">👉 Confirmer mon adresse email</a></p>
        <p>Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.</p>
      `,
    });
  } catch (error) {
    console.error("Erreur envoi email:", error);
  }
}
