export const sendEmail = async (options: { to: string; subject: string; text: string }) => {
    // This is a placeholder for an actual email service like Resend or Nodemailer.
    // For now, we log to the console to simulate sending an email.
    console.log(`[Email Sent] To: ${options.to}, Subject: ${options.subject}`);
    console.log(`Body: ${options.text}`);
};
