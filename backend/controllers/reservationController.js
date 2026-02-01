const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Create email transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// @desc    Get all reservations (Admin only)
// @route   GET /api/reservations
// @access  Private/Admin
exports.getAllReservations = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.reservationDate = {};
      if (startDate) {
        filter.reservationDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.reservationDate.$lte = new Date(endDate);
      }
    }

    const reservations = await Reservation.find(filter).sort('-reservationDate');

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create reservation
// @route   POST /api/reservations
// @access  Public
exports.createReservation = async (req, res) => {
  try {
    const { customerName, email, phone, numberOfGuests, reservationDate, reservationTime, specialRequests } = req.body;

    const reservation = await Reservation.create({
      customerName,
      email,
      phone,
      numberOfGuests,
      reservationDate,
      reservationTime,
      specialRequests,
      userId: req.user ? req.user.id : null,
      status: 'pending',
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmation - KGN Chinese Corner',
      html: `
        <h2>Thank you for your reservation!</h2>
        <p><strong>Reservation Details:</strong></p>
        <ul>
          <li>Name: ${customerName}</li>
          <li>Date: ${new Date(reservationDate).toLocaleDateString()}</li>
          <li>Time: ${reservationTime}</li>
          <li>Guests: ${numberOfGuests}</li>
        </ul>
        <p>We will confirm your reservation shortly.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update reservation (Admin only)
// @route   PUT /api/reservations/:id
// @access  Private/Admin
exports.updateReservation = async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Send status update email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reservation.email,
      subject: `Reservation ${reservation.status.toUpperCase()} - KGN Chinese Corner`,
      html: `
        <h2>Your reservation has been ${reservation.status}!</h2>
        <p>Reservation for ${reservation.customerName}</p>
        <p>Date: ${new Date(reservation.reservationDate).toLocaleDateString()}</p>
        <p>Time: ${reservation.reservationTime}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) console.log('Email error:', error);
    });

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete reservation (Admin only)
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel reservation
// @route   PUT /api/reservations/:id/cancel
// @access  Private
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Send cancellation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reservation.email,
      subject: 'Reservation Cancelled - KGN Chinese Corner',
      html: `
        <h2>Your reservation has been cancelled</h2>
        <p>We hope to see you again soon!</p>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) console.log('Email error:', error);
    });

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled',
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
