import sgMail from '@sendgrid/mail';
import type { Contact } from '@shared/schema';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendContactNotification(contact: Contact): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not configured, skipping email notification');
    return false;
  }

  try {
    const msg = {
      to: 'hukitola.dev@gmail.com', // Replace with your admin email
      from: 'pratyushkundu123@gmail.com', // Replace with your verified sender email
      subject: `New Contact Form Submission - ${contact.projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt!).toLocaleString()}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Project Details</h3>
            <p><strong>Project Type:</strong> ${contact.projectType}</p>
            <p><strong>Budget:</strong> ${contact.budget}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Description</h3>
            <p style="white-space: pre-wrap;">${contact.description}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e6f3ff; border-radius: 8px;">
            <p style="margin: 0; color: #0066cc;">
              <strong>TechFlow Solutions</strong><br>
              Professional IT Services & Technology Consulting
            </p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log('Contact notification email sent successfully via SendGrid');
    return true;
  } catch (error) {
    console.error('SendGrid email service error:', error);
    return false;
  }
}