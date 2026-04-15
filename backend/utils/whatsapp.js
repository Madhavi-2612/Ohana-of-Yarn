const generateWhatsAppURL = (items, totalAmount, phone) => {
  const whatsappPhone = phone || process.env.WHATSAPP_PHONE || '919498431171';

  let message = '🧶 *New Order from Crochet Shop*\n\n';
  message += '📦 *Order Items:*\n';

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toFixed(2)}\n`;
  });

  message += `\n💰 *Total: ₹${totalAmount.toFixed(2)}*\n`;
  message += '\nPlease confirm my order. Thank you! 🙏';

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
};

module.exports = { generateWhatsAppURL };
