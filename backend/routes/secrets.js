const express = require('express');
const router = express.Router();
const Secret = require('../models/Secret');
const { ensureAuthenticated } = require('../config/auth');

// @desc    Get all secrets
// @route   GET /secrets
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const secrets = await Secret.find().sort({ date: 'desc' });
    res.json(secrets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @desc    Submit a secret
// @route   POST /secrets
router.post('/', ensureAuthenticated, async (req, res) => {
  const { secretText } = req.body;

  if (!secretText) {
    return res.status(400).json({ errors: [{ msg: 'Please add a secret' }] });
  }

  try {
    const newSecret = new Secret({
      text: secretText,
      user: req.user.id
    });

    const secret = await newSecret.save();
    res.status(201).json({ secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
