const ContactSubmission = require('../models/ContactSubmission');
const RestaurantSettings = require('../models/RestaurantSettings');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllSubmissions = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const submissions = await ContactSubmission.find(filter).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create contact submission
// @route   POST /api/contact
// @access  Public
exports.createSubmission = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - KGN Chinese Corner',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
      `,
    };

    transporter.sendMail(customerEmail, (error) => {
      if (error) console.log('Email error:', error);
    });

    // Send admin notification
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    transporter.sendMail(adminEmail, (error) => {
      if (error) console.log('Email error:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update submission (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateSubmission = async (req, res) => {
  try {
    const { status, response } = req.body;

    let submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      {
        status,
        response,
        respondedBy: req.user.id,
        respondedAt: status === 'responded' ? Date.now() : null,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Send response email if responding
    if (status === 'responded' && response) {
      const responseEmail = {
        from: process.env.EMAIL_USER,
        to: submission.email,
        subject: `Re: ${submission.subject} - KGN Chinese Corner`,
        html: `
          <h2>Response to your inquiry</h2>
          <p>Hi ${submission.name},</p>
          <p>${response}</p>
          <p>Best regards,<br>KGN Chinese Corner Team</p>
        `,
      };

      transporter.sendMail(responseEmail, (error) => {
        if (error) console.log('Email error:', error);
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get restaurant settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    let settings = await RestaurantSettings.findOne();

    if (!settings) {
      settings = await RestaurantSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update restaurant settings (Admin only)
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    let settings = await RestaurantSettings.findOne();

    if (!settings) {
      settings = await RestaurantSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
