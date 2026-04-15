const express = require("express");
const bodyParser = require("body-parser");

const {
  handleGetRandom,
  handleCheckStatus,
  checkAuthHeader,
  handleUserInfo,
} = require("./nafath");

const { handlePasswordUpdateAction } = require("./passwordUpdateAction");
const { handleWebhookVerification, handleWebhookEvent } = require("./webhook");

const app = express();
const port = 3000;

app.use(bodyParser.json());

/*********************************** Routes *********************************************/

// Nafath authentication endpoints
app.post("/getRandom", handleGetRandom);
app.post("/checkStatus", handleCheckStatus);
app.get("/userInfo", checkAuthHeader, (req, res) => {
  handleUserInfo(req, res);
});

// Asgardeo password update action
app.post("/password-update-action", handlePasswordUpdateAction);

//Asgardeo Webhook
app.get("/webhook", handleWebhookVerification);
app.post("/webhook", handleWebhookEvent);

// Check Health
app.get("/health", (req, res) => {
  console.log("hello!!!");
  res.send("ok");
});
/*********************************** Server *********************************************/

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
