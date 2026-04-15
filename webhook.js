// Webhook GET
function handleWebhookVerification(req, res) {
  const challenge = req.query["hub.challenge"];
  if (challenge) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(200);
  }
}

// Webhook POST
function handleWebhookEvent(req, res) {
  console.log("Event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
}

module.exports = { handleWebhookEvent, handleWebhookVerification };
