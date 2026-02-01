const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Helper function to generate order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now();
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const orders = await Order.find(filter).sort('-createdAt').populate('items.menuItemId');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/user/my
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItemId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, items, orderType, deliveryAddress, notes } = req.body;

    let subtotal = 0;
    const orderItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
      }

      subtotal += menuItem.price * item.quantity;
      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || '',
      });
    }

    const tax = subtotal * 0.05; // 5% tax
    const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
    const total = subtotal + tax + deliveryFee;

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      userId: req.user ? req.user.id : null,
      customerName,
      customerEmail,
      customerPhone,
      items: orderItems,
      subtotal,
      tax,
      deliveryFee,
      total,
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
      notes,
      status: 'pending',
      paymentStatus: 'pending',
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process payment
// @route   POST /api/orders/:id/payment
// @access  Private
exports.processPayment = async (req, res) => {
  try {
    const { stripeToken } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create Stripe payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Convert to cents
      currency: 'usd',
      source: stripeToken,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    if (paymentIntent.status === 'succeeded') {
      order.paymentStatus = 'completed';
      order.stripePaymentId = paymentIntent.id;
      order.status = 'confirmed';
      await order.save();

      res.status(200).json({
        success: true,
        message: 'Payment successful',
        data: order,
      });
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      res.status(400).json({
        message: 'Payment failed',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;

    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
