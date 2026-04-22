// Webhook GET
function handleWebhookVerification(req, res) {
  console.log("---- Incoming GET /webhook ----");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Query:", JSON.stringify(req.query, null, 2));

  const challenge = req.query["hub.challenge"];
  console.log("hub.challenge received:", challenge);
  if (challenge) {
    res.status(200).send(challenge);
  } else {
    console.log("Bad request. hub challange is missing")
    res.sendStatus(400);
  }
}

// Webhook POST
function handleWebhookEvent(req, res) {
   console.log("---- Incoming POST /webhook ----");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
}

module.exports = { handleWebhookEvent, handleWebhookVerification };
 