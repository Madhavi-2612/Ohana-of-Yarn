const express = require('express');
const router = express.Router();
const { generateWhatsAppURL } = require('../utils/whatsapp');

// POST /api/whatsapp/generate
router.post('/generate', (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    const url = generateWhatsAppURL(items, totalAmount);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
