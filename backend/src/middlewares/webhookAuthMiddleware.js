exports.verifyWebhookSecret = (req, res, next) => {
  const incomingSecret = req.headers['x-webhook-secret'];
  if (incomingSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(403).json({ message: 'Forbidden webhook' });
  }
  next();
};
