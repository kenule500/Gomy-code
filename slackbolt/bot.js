require('dotenv').config();
const { App } = require('@slack/bolt');

// DEBUG: Check if credentials are actually loading
console.log("Token Loaded:", process.env.SLACK_BOT_TOKEN ? "Yes (Starts with " + process.env.SLACK_BOT_TOKEN.slice(0, 9) + ")" : "NO - IT IS BLANK");
console.log("Secret Loaded:", process.env.SLACK_SIGNING_SECRET ? "Yes" : "NO - IT IS BLANK");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listen for the /hello command
app.command('/hello', async ({ command, ack, say }) => {
  // Acknowledge the command request
  await ack();
  // Respond with a message
  await say(`Hey <@${command.user_id}>!`);
});

// Log all messages from channels
app.message(async ({ message, logger }) => {
  logger.info('Received message:', message);
});

// Start your app
(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();