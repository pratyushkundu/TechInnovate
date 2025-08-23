import sgMail from '@sendgrid/mail';
import type { Contact, Developer } from '@shared/schema';
import 'dotenv/config';

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
            from: 'em1381@hukitola.com', // Replace with your verified sender email
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
              <strong>Hukitola Solutions</strong><br>
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

export async function sendDeveloperNotification(developer: Developer): Promise<boolean> {

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const resumeUrl = `${baseUrl}/uploads/${developer.resume}`;
    if (!process.env.SENDGRID_API_KEY) {
        console.warn("SENDGRID_API_KEY not configured, skipping email notification");
        return false;
    }

    try {
        const msg = {
            to: "hukitola.dev@gmail.com", // Replace with your admin email
            from: "em1381@hukitola.com",  // Replace with your verified sender email
            subject: `New Developer Form Submission - ${developer.projectApplicationFor}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Developer Application
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${developer.firstName} ${developer.lastName}</p>
            <p><strong>Email:</strong> ${developer.email}</p>
            <p><strong>Phone:</strong> ${developer.phoneNo}</p>
            <p><strong>Submitted:</strong> ${new Date(developer.createdAt!).toLocaleString()}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Project Application</h3>
            <p><strong>Applied For:</strong> ${developer.projectApplicationFor}</p>
            <p><strong>Experience:</strong> ${developer.experience}</p>
            <p><strong>Expertise:</strong> ${developer.expertise}</p>
            <p><strong>Bidding Budget:</strong> ${developer.biddingBudget || "Not specified"}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Proposal</h3>
            <p style="white-space: pre-wrap;">${developer.proposalDescription}</p>
            <p><strong>Resume:</strong>  <a href="${resumeUrl}" target="_blank">View Resume</a></p>

          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e6f3ff; border-radius: 8px;">
            <p style="margin: 0; color: #0066cc;">
              <strong>Hukitola Solutions</strong><br>
              Professional IT Services & Technology Consulting
            </p>
          </div>
        </div>
      `,
        };

        await sgMail.send(msg);
        console.log("Developer notification email sent successfully via SendGrid");
        return true;
    } catch (error) {
        console.error("SendGrid email service error:", error);
        return false;
    }
}
