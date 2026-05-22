import { Request, Response } from 'express';
import Contact from '../models/Contact.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to Database first
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>', // Free tier default
          to: process.env.EMAIL_TO || 'abenilee740@gmail.com', // Your email
          replyTo: email, // So you can reply directly to the sender
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #2563eb;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Resend email failed:', emailError);
        // We don't fail the whole request if email fails, as it's already in the DB
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error sending message',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get all contact messages
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
